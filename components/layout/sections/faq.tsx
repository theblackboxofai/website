import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface FAQProps {
  question: string;
  answer: string;
  value: string;
}

const FAQList: FAQProps[] = [
  {
    question: "Is Black Box free?",
    answer: "Yes, our API is 100% free to use with or without an account.",
    value: "item-1",
  },
  {
    question: "How do we provide free inference?",
    answer:
      "We clearly state that we use public Ollama servers logged into paid accounts to run cloud model inference for free.",
    value: "item-2",
  },
  {
    question:
      "Do we train models on your data or share it with third parties?",
    answer:
      "We collect and may train on data provided through our API, with filtering for sensitive or confidential content.",
    value: "item-3",
  }
];

export const FAQSection = () => {
  return (
    <section id="faq" className="container py-24 sm:py-32">
      <div className="mx-auto max-w-3xl">
        <div className="mb-10 space-y-3 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-muted-foreground">
            FAQ
          </p>
          <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
            Common questions
          </h2>
          <p className="mx-auto max-w-2xl text-sm leading-6 text-muted-foreground md:text-base">
            Straight answers on pricing, infrastructure, and how request data is handled.
          </p>
        </div>

        <Accordion type="single" collapsible className="space-y-3">
          {FAQList.map(({ question, answer, value }, index) => (
            <div key={value} className="flex items-start gap-4">
              <span className="mt-5 hidden text-xs font-semibold tracking-[0.2em] text-muted-foreground md:block">
                {String(index + 1).padStart(2, "0")}
              </span>
              <AccordionItem
                value={value}
                className="my-0 w-full overflow-hidden rounded-2xl border border-border/80 bg-background px-0 shadow-none transition-colors duration-200 data-[state=open]:bg-muted/30"
              >
                <AccordionTrigger className="px-5 py-5 text-left text-base font-medium leading-6 no-underline hover:no-underline md:px-6">
                  <div className="flex items-start gap-3">
                    <span className="mt-1 text-xs font-semibold tracking-[0.2em] text-muted-foreground md:hidden">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span>{question}</span>
                  </div>
                </AccordionTrigger>

                <AccordionContent className="px-5 pb-5 pt-0 text-[15px] leading-7 text-muted-foreground md:px-6">
                  {answer}
                </AccordionContent>
              </AccordionItem>
            </div>
          ))}
        </Accordion>
      </div>
    </section>
  );
};
