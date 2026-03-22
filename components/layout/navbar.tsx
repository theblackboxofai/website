"use client";
import { ArrowUpRight, ChevronsDown, Github, Menu } from "lucide-react";
import Image from "next/image";
import React from "react";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { Separator } from "../ui/separator";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "../ui/navigation-menu";
import { Button } from "../ui/button";
import Link from "next/link";

interface RouteProps {
  href: string;
  label: string;
}

interface FeatureProps {
  title: string;
  description: string;
}

const routeList: RouteProps[] = [
  {
    href: "#faq",
    label: "FAQ",
  },
];

const featureList: (FeatureProps & { url: string })[] = [
  {
    title: "Find exposed Ollama endpoints",
    description: "Surface public inference servers before someone else does.",
    url: "https://ollama.com/docs/endpoint-discovery"
  },
  {
    title: "Track what is actually reachable",
    description:
      "Separate internal assumptions from internet-facing reality.",
    url: "https://blackbox.ai/docs/reachability-tracking"
  },
  {
    title: "Pressure-test weak defaults",
    description:
      "Catch missing auth, open ports, and risky deployments early.",
    url: "https://blackbox.ai/docs/pressure-test-defaults"
  },
];

export const Navbar = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  return (
    <header className="sticky top-4 z-40 mx-auto flex w-[92%] max-w-screen-xl items-center justify-between rounded-2xl border border-border/70 bg-background/80 px-3 py-2 shadow-[0_18px_50px_-24px_rgba(0,0,0,0.35)] backdrop-blur-xl supports-[backdrop-filter]:bg-background/65">
      <Link href="/" className="flex items-center gap-3">
        <div className="flex flex-col leading-none">
          <span className="text-lg font-semibold uppercase tracking-[0.24em] text-white">
            Black Box
          </span>
        </div>
      </Link>
      {/* <!-- Mobile --> */}
      <div className="flex items-center lg:hidden">
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              aria-label="Open navigation menu"
              className="rounded-xl border border-border/70 bg-background/70 shadow-sm"
            >
              <Menu
                onClick={() => setIsOpen(!isOpen)}
                className="size-5 cursor-pointer lg:hidden"
              />
            </Button>
          </SheetTrigger>

          <SheetContent
            side="left"
            className="flex flex-col justify-between rounded-tr-2xl rounded-br-2xl border-border/70 bg-card"
          >
            <div>
              <SheetHeader className="mb-4 ml-4">
                <SheetTitle className="flex items-center">
                  <Link href="/" className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-border/70 bg-gradient-to-br from-foreground via-foreground to-muted-foreground text-background">
                      <ChevronsDown className="size-5" />
                    </div>
                    <div className="flex flex-col text-left leading-none">
                      <span className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">
                        Black Box
                      </span>
                    </div>
                  </Link>
                </SheetTitle>
              </SheetHeader>

              <div className="flex flex-col gap-2">
                {routeList.map(({ href, label }) => (
                  <Button
                    key={href}
                    onClick={() => setIsOpen(false)}
                    asChild
                    variant="ghost"
                    className="justify-start rounded-xl border border-transparent px-4 py-6 text-base hover:border-border/70 hover:bg-muted/60"
                  >
                    <Link href={href}>{label}</Link>
                  </Button>
                ))}
              </div>
            </div>

            <SheetFooter className="flex-col sm:flex-col justify-start items-start">
              <Separator className="mb-2" />

            </SheetFooter>
          </SheetContent>
        </Sheet>
      </div>

      {/* <!-- Desktop --> */}
      <NavigationMenu className="mx-auto hidden lg:block">
        <NavigationMenuList className="gap-1 rounded-2xl border border-border/70 bg-muted/35 p-1">
          <NavigationMenuItem>
            <NavigationMenuTrigger className="h-10 rounded-xl bg-transparent px-4 text-sm font-medium text-muted-foreground hover:bg-background hover:text-foreground data-[state=open]:bg-background data-[state=open]:text-foreground">
              Blog
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <div className="grid w-[640px] grid-cols-[1.1fr_1fr] gap-4 overflow-visible rounded-2xl bg-popover p-4">
                <Link
                  href="https://example.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="peer/panel group/panel relative z-10 block w-full origin-left overflow-hidden rounded-2xl border border-border/70 bg-foreground p-6 text-background shadow-[0_24px_60px_-36px_rgba(0,0,0,0.7)] transition-[width,transform,box-shadow] duration-300 ease-out hover:z-20 hover:w-[calc(100%+140px)] hover:-translate-x-1 hover:shadow-[0_40px_100px_-34px_rgba(0,0,0,0.82)]"
                >
                  <div className="absolute inset-0">
                    <Image
                      src="/ollama.png"
                      alt="Ollama interface preview"
                      fill
                      className="object-cover object-center opacity-75 transition-transform duration-500 ease-out group-hover/panel:scale-105 group-hover/panel:translate-x-2"
                      sizes="420px"
                    />
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.18),transparent_34%)]" />
                    <div className="absolute inset-0 bg-gradient-to-r from-foreground via-foreground/90 via-42% to-foreground/35" />
                    <div className="absolute inset-0 bg-gradient-to-t from-foreground/55 via-transparent to-transparent" />
                  </div>
                  <div className="relative flex h-full flex-col justify-between gap-8">
                    <div className="max-w-[240px] space-y-3">
                      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-background/70">
                        Black Box
                      </p>
                      <h3 className="text-4xl font-semibold leading-tight">
                        Introducing Blackbox
                      </h3>

                    </div>
                    <div className="inline-flex w-fit items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-sm text-background/85">
                      Read more
                      <ArrowUpRight className="size-4" />
                    </div>
                  </div>
                </Link>
                <ul className="relative flex flex-col gap-2 transition-transform duration-300 ease-out peer-hover/panel:translate-x-32">
                  {featureList.map(({ title, description, url }) => (
                    <li key={title}>
                      <a
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block rounded-xl border border-transparent p-3 text-sm transition-colors hover:border-border/70 hover:bg-muted/50"
                        style={{ textDecoration: 'none' }}
                      >
                        <p className="mb-1 font-semibold leading-none text-foreground">
                          {title}
                        </p>
                        <p className="line-clamp-2 text-muted-foreground">
                          {description}
                        </p>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </NavigationMenuContent>
          </NavigationMenuItem>

          <NavigationMenuItem>
            {routeList.map(({ href, label }) => (
              <NavigationMenuLink key={href} asChild>
                <Link
                  href={href}
                  className="rounded-xl px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-background hover:text-foreground"
                >
                  {label}
                </Link>
              </NavigationMenuLink>
            ))}
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>

      <div className="hidden items-center gap-2 lg:flex">

        <Button
          asChild
          size="sm"
          variant="ghost"
          className="rounded-xl border border-border/70 px-3"
        >
          <Link
            aria-label="View on GitHub"
            href="https://github.com/theblackboxofai"
            target="_blank"
          >
            <Github className="size-5" />
          </Link>
        </Button>
      </div>
    </header>
  );
};
