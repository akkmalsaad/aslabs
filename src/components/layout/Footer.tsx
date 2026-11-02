import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { contact, site } from "@/lib/site";
import logoMark from "../../../assets/logo/as-labs-mark-white-accent.svg";
import { CurrentYear } from "./CurrentYear";

const linkClass = "transition-colors duration-(--dur-micro) hover:text-fg";

// Continues the dark contact slab and carries the supporting business details
// (address, registration) so they appear once on the page.
export function Footer() {
  return (
    <footer data-nav-theme="dark" className="theme-dark">
      <Container className="pb-[calc(var(--dock-zone)+1rem)] text-sm text-muted">
        <div className="grid gap-x-8 gap-y-10 border-t border-line pt-12 sm:grid-cols-2 lg:grid-cols-12">
          <div className="flex items-center gap-3 text-fg sm:col-span-2 lg:col-span-3 lg:items-start">
            {/* Brand rule: the mark is never smaller than 24px tall. */}
            <Image src={logoMark} alt="" unoptimized className="h-6 w-auto shrink-0" />
            <span className="font-medium">{site.name}</span>
          </div>

          <div className="lg:col-span-3">
            <p className="eyebrow mb-3">Studio</p>
            <address className="not-italic">
              {contact.address.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </address>
          </div>

          <div className="lg:col-span-3">
            <p className="eyebrow mb-3">Get in touch</p>
            <ul className="flex flex-col gap-1">
              <li>
                <a href={`mailto:${contact.email}`} className={linkClass}>
                  {contact.email}
                </a>
              </li>
              <li>
                <a href={contact.whatsapp.href} target="_blank" rel="noopener noreferrer" className={linkClass}>
                  WhatsApp {contact.whatsapp.display}
                </a>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-3">
            <p className="eyebrow mb-3">Business</p>
            <p>{site.name}</p>
            <p>SSM Registration No. {contact.registration}</p>
          </div>
        </div>

        <div className="mt-12 flex items-center justify-between gap-6 border-t border-line pt-6 text-xs text-subtle">
          <p>
            © <CurrentYear /> {site.name}
          </p>
          <a href="#top" className={`group inline-flex items-center gap-2 ${linkClass}`}>
            Back to top
            <span aria-hidden className="transition-transform duration-(--dur-micro) ease-out group-hover:-translate-y-0.5">
              ↑
            </span>
          </a>
        </div>
      </Container>
    </footer>
  );
}
