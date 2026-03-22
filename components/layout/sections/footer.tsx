import { Separator } from "@/components/ui/separator";
import { ChevronsDownIcon } from "lucide-react";
import Link from "next/link";

export const FooterSection = () => {
  const year = new Date().getFullYear();

  return (
    <footer id="footer" className="container py-24 sm:py-32">
      <div className="rounded-2xl border border-border/70 bg-card p-8 shadow-sm sm:p-10">
        <div className="grid grid-cols-1 gap-x-10 gap-y-8 sm:grid-cols-2 md:grid-cols-[minmax(0,1.4fr)_repeat(3,minmax(0,0.7fr))]">
          <div className="sm:col-span-2 md:col-span-1">
            <Link href="/" className="block font-bold">
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <div className="flex flex-col leading-none">
                    <span className="text-lg font-semibold uppercase tracking-[0.24em] text-white">
                      Black Box
                    </span>
                  </div>
                </div>
                
              </div>
            </Link>
            
          </div>

          <div className="flex flex-col gap-3">
            <h3 className="text-lg font-bold tracking-tight">Contact</h3>
            <div>
              <Link
                href="https://github.com/theblackboxofai"
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                Discord
              </Link>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <h3 className="text-lg font-bold tracking-tight">Help</h3>
            <div>
              <Link
                href="/docs"
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                Docs
              </Link>
            </div>
            <div>
              <Link
                href="/docs"
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                Contact Us
              </Link>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <h3 className="text-lg font-bold tracking-tight">Socials</h3>
            <div>
              <Link
                href="#"
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                Github
              </Link>
            </div>
          </div>
        </div>

        <Separator className="my-6" />
        <section className="flex flex-col gap-2 text-sm text-muted-foreground md:flex-row md:items-center md:justify-between">
          <h3>
            &copy; {year} Black Box.
          </h3>
        </section>
      </div>
    </footer>
  );
};
