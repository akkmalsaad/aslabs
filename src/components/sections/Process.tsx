import { ScrollFade } from "@/components/motion/ScrollFade";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionIntro } from "@/components/ui/SectionIntro";
import { stagger } from "@/lib/motion";
import { processSteps } from "@/lib/process";

const pad = (n: number) => String(n).padStart(2, "0");

// "How I work": a quiet, numbered process list. Rows only fade up once; the motion-heavy
// treatment belongs to the services cards above.
export function Process() {
  return (
    <Section id="process" theme="light" aria-labelledby="process-heading" className="py-(--space-section)">
      <Container>
        <SectionIntro
          display
          centered
          eyebrow="How I work"
          headingId="process-heading"
          lines={["From first sketch", "to shipped product."]}
        />

        {/* From lg the list drops the margin-column offset and centres on the page as one
            block; inside it the number, title and description columns stay left-aligned. */}
        <ol className="mt-[calc(var(--space-block)*0.6)] border-t border-line md:ml-[calc(25%+0.5rem)] lg:mx-auto lg:max-w-[64rem]">
          {processSteps.map((step, i) => (
            <li key={step.title} className="border-b border-line">
              <ScrollFade
                delay={i * stagger}
                y={12}
                className="grid grid-cols-[2.5rem_minmax(0,1fr)] items-baseline gap-x-4 gap-y-2 py-6 sm:grid-cols-[3.5rem_minmax(0,1fr)] sm:py-8 lg:grid-cols-[3.5rem_minmax(0,5fr)_minmax(0,7fr)] lg:gap-x-8"
              >
                {/* The <ol> already conveys order to assistive tech. */}
                <span aria-hidden className="font-mono text-xs text-muted">
                  {pad(i + 1)}
                </span>
                <h3 className="text-[clamp(1.25rem,1.1rem+0.6vw,1.625rem)] leading-tight font-normal tracking-[-0.01em]">
                  {step.title}
                </h3>
                <p className="col-start-2 text-muted lg:col-start-3">{step.summary}</p>
              </ScrollFade>
            </li>
          ))}
        </ol>
      </Container>
    </Section>
  );
}
