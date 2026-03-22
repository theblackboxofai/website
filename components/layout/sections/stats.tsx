const DEFAULT_STATS_API_URL =
  "https://api-production-fbfe.up.railway.app/v1/stats";

interface ModelStat {
  id: string;
  server_count: number;
}

interface RequestHistoryWindow {
  request_count: number;
  attempt_count: number;
  success_count: number;
  failure_count: number;
  prompt_tokens: number;
  completion_tokens: number;
  total_tokens: number;
}

interface StatsResponse {
  object: "stats";
  models: {
    object: string;
    data: ModelStat[];
  };
  request_history: {
    last_24_hours: RequestHistoryWindow;
    last_7_days: RequestHistoryWindow;
    last_28_days: RequestHistoryWindow;
  };
}

interface DisplayStat {
  eyebrow: string;
  label: string;
  value: string;
  detail: string;
  longValue?: boolean;
}

const integerFormatter = new Intl.NumberFormat("en-US");
const compactFormatter = new Intl.NumberFormat("en-US", {
  notation: "compact",
  maximumFractionDigits: 1,
});

function formatInteger(value: number) {
  return integerFormatter.format(value);
}

function formatCompact(value: number) {
  return compactFormatter.format(value);
}

function getStatsApiUrl() {
  return process.env.STATS_API_URL ?? DEFAULT_STATS_API_URL;
}

function formatPercent(value: number) {
  return `${value.toFixed(value >= 99 ? 1 : 0)}%`;
}

function isFiniteNumber(value: unknown): value is number {
  return typeof value === "number" && Number.isFinite(value);
}

function isRequestHistoryWindow(
  value: unknown
): value is RequestHistoryWindow {
  if (!value || typeof value !== "object") {
    return false;
  }

  const record = value as Record<string, unknown>;

  return (
    isFiniteNumber(record.request_count) &&
    isFiniteNumber(record.attempt_count) &&
    isFiniteNumber(record.success_count) &&
    isFiniteNumber(record.failure_count) &&
    isFiniteNumber(record.prompt_tokens) &&
    isFiniteNumber(record.completion_tokens) &&
    isFiniteNumber(record.total_tokens)
  );
}

function isStatsResponse(value: unknown): value is StatsResponse {
  if (!value || typeof value !== "object") {
    return false;
  }

  const record = value as Record<string, unknown>;
  const models = record.models as
    | { data?: Array<Record<string, unknown>> }
    | undefined;
  const requestHistory = record.request_history as
    | Record<string, unknown>
    | undefined;

  return (
    record.object === "stats" &&
    Array.isArray(models?.data) &&
    models.data.every(
      (model) =>
        typeof model.id === "string" && isFiniteNumber(model.server_count)
    ) &&
    isRequestHistoryWindow(requestHistory?.last_24_hours) &&
    isRequestHistoryWindow(requestHistory?.last_7_days) &&
    isRequestHistoryWindow(requestHistory?.last_28_days)
  );
}

function getModelName(modelId: string) {
  return modelId.split("/").pop() ?? modelId;
}

function aggregateModels(models: ModelStat[]) {
  const counts = new Map<string, number>();

  for (const model of models) {
    counts.set(model.id, (counts.get(model.id) ?? 0) + model.server_count);
  }

  return Array.from(counts.entries()).map(([id, serverCount]) => ({
    id,
    serverCount,
  }));
}

async function getStats(): Promise<DisplayStat[] | null> {
  try {
    const response = await fetch(getStatsApiUrl(), {
      next: { revalidate: 300 },
    });

    if (!response.ok) {
      return null;
    }

    const data = await response.json();

    if (!isStatsResponse(data)) {
      return null;
    }

    const models = aggregateModels(data.models.data);
    const totalServers = models.reduce(
      (total, model) => total + model.serverCount,
      0
    );
    const topModel = models.reduce(
      (currentTop, model) =>
        !currentTop || model.serverCount > currentTop.serverCount
          ? model
          : currentTop,
      null as { id: string; serverCount: number } | null
    );
    const requests24Hours = data.request_history.last_24_hours;
    const successBase =
      requests24Hours.attempt_count || requests24Hours.request_count;
    const successRate =
      successBase > 0
        ? (requests24Hours.success_count / successBase) * 100
        : null;

    return [
      {
        eyebrow: "Network",
        label: "Active servers",
        value: formatInteger(totalServers),
        detail: `${formatInteger(models.length)} unique models are currently online`,
      },
      {
        eyebrow: "Top model",
        label: "Top model",
        value: topModel?.id ? getModelName(topModel.id) : "Unavailable",
        detail: topModel
          ? `${formatInteger(topModel.serverCount)} active servers`
          : "No model data returned by the stats endpoint.",
        longValue: true,
      },
      {
        eyebrow: "Last 24 hours",
        label: "Requests",
        value: formatCompact(requests24Hours.request_count),
        detail: `${formatInteger(requests24Hours.success_count)} succeeded in the last 24 hours`,
      },
      {
        eyebrow: "Reliability",
        label: "Success rate",
        value: successRate ? formatPercent(successRate) : "N/A",
        detail:
          successRate !== null
            ? `${formatInteger(requests24Hours.failure_count)} failed requests in the same window`
            : `${formatInteger(
                data.request_history.last_28_days.total_tokens
              )} total tokens processed over 28 days`,
      },
    ];
  } catch {
    return null;
  }
}

export const StatsSection = async () => {
  const stats = await getStats();
  const displayStats = stats ?? fallbackStats;
  const usingFallback = stats === null;

  return (
    <section id="stats" className="container py-12 md:py-20">
      <div className="overflow-hidden rounded-[2rem] border border-secondary bg-background">
        <div className="grid gap-6 border-b border-secondary px-6 py-8 md:grid-cols-[minmax(0,1fr)_auto] md:px-8 md:py-10">
          <div className="max-w-2xl space-y-3">
            <p className="text-[13px] font-semibold uppercase tracking-[0.28em] text-muted-foreground">
              Our current status
            </p>
            <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
              The routing layer, at a glance.
            </h2>
            <p className="text-sm leading-6 text-muted-foreground md:text-base">
              Live capacity, request volume, and delivery health pulled from the
              Black Box API.
            </p>
          </div>
        </div>

        <div className="grid gap-px bg-secondary lg:grid-cols-2 xl:grid-cols-4">
          {displayStats.map((stat, index) => (
            <StatCard
              key={stat.label}
              stat={stat}
              index={index + 1}
              featured={index === 0}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

function StatCard({
  stat,
  index = 1,
  featured = false,
}: {
  stat: DisplayStat;
  index?: number;
  featured?: boolean;
}) {
  return (
    <div className={featured ? "bg-muted/35" : "bg-background"}>
      <div className="flex min-h-[240px] flex-col justify-between px-6 py-7 md:px-7 md:py-8">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-3">
            <p className="text-[13px] font-semibold uppercase tracking-[0.28em] text-muted-foreground">
              {stat.eyebrow}
            </p>
            <p className="text-sm text-muted-foreground">{stat.label}</p>
          </div>
          <span className="text-[11px] font-semibold uppercase tracking-[0.24em] text-muted-foreground">
            {String(index).padStart(2, "0")}
          </span>
        </div>

        <div className="space-y-4">
          <div
            className={
              stat.longValue
                ? "max-w-sm break-words text-[clamp(2rem,4vw,3rem)] font-semibold leading-[1.05] tracking-tight"
                : "text-4xl font-semibold tracking-tight sm:text-5xl"
            }
          >
            {stat.value}
          </div>
          <p className="max-w-xs text-sm leading-6 text-muted-foreground">
            {stat.detail}
          </p>
        </div>
      </div>
    </div>
  );
}

const fallbackStats: DisplayStat[] = [
  {
    eyebrow: "Network",
    label: "Active servers",
    value: "48",
    detail: "Distributed across 12 models while the live endpoint is unavailable.",
  },
  {
    eyebrow: "Top model",
    label: "Top model",
    value: "llama-3.3-70b-instruct",
    detail: "The busiest route in the current fallback snapshot.",
    longValue: true,
  },
  {
    eyebrow: "Last 24 hours",
    label: "Requests",
    value: "18.2K",
    detail: "Recent traffic volume served across the network.",
  },
  {
    eyebrow: "Reliability",
    label: "Success rate",
    value: "99.2%",
    detail: "Healthy delivery in the fallback snapshot.",
  },
];
