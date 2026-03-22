import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowUpRight, Github } from "lucide-react";
import Link from "next/link";
import { unstable_noStore as noStore } from "next/cache";

const HERO_MESSAGES = [
  {
    message: '"It\'s just a private Ollama server"',
    description: "Now serving requests from 47 countries",
  },
  {
    message: '"I didn’t add auth because it’s internal"',
    description: "Your GPU becomes a public API",
  },
  {
    message: '"It’s not exposed to the internet"',
    description: "It is.",
  },
  {
    message: "\"I'll add auth later\"",
    description: "later = after someone else finds it",
  },
  {
    message: '"Who would even find this?"',
    description: "everyone",
  },
] as const;

export const HeroSection = () => {
  noStore();
  const selectedMessage =
    HERO_MESSAGES[Math.floor(Math.random() * HERO_MESSAGES.length)];

  return (
    <section className="container w-full" style={{ marginTop: "100px" }}>
      <div className="grid place-items-center lg:max-w-screen-xl gap-8 mx-auto py-20 md:py-32">
        <div className="text-center space-y-8">
          <Badge
            variant="secondary"
            className="flex items-center gap-2 px-4 py-2 text-base font-medium rounded-full shadow-sm bg-gradient-to-r from-primary/10 via-primary/5 to-muted-foreground/10 border border-primary/30 mb-3 mx-auto w-max"
          >
            <span className="pl-2 pr-1 text-primary tracking-wide">
              New model!
            </span>
          </Badge>

          <div className="max-w-screen-md mx-auto text-center text-4xl md:text-6xl">
            <h1 className="mb-2">
              {selectedMessage.message}
            </h1>
            <p className="max-w-screen-sm mx-auto text-xl text-muted-foreground">
              {selectedMessage.description}
            </p>
          </div>

          <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Button
              size="lg"
              className="group/arrow h-14 w-full max-w-xs rounded-2xl border border-transparent bg-gradient-to-r from-foreground via-foreground to-muted-foreground px-7 text-base font-semibold text-background shadow-[0_24px_50px_-28px_rgba(0,0,0,0.7)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_32px_70px_-32px_rgba(0,0,0,0.85)]"
            >
              Get Started
              <ArrowRight className="ml-2 size-5 transition-transform duration-300 group-hover/arrow:translate-x-1" />
            </Button>

            <Button
              asChild
              variant="secondary"
              size="lg"
              className="group/link h-14 w-full max-w-xs rounded-2xl border border-border/70 bg-background/80 px-7 text-base font-semibold text-foreground shadow-[0_18px_45px_-32px_rgba(0,0,0,0.55)] backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-foreground/15 hover:bg-muted/60 hover:shadow-[0_28px_60px_-36px_rgba(0,0,0,0.65)]"
            >
              <Link
                href="https://github.com/theblackboxofai"
                target="_blank"
                className="inline-flex items-center justify-center"
              >
                <Github className="mr-2 size-5" />
                Our GitHub
                <ArrowUpRight className="ml-2 size-4 transition-transform duration-300 group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
