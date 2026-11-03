import { ProjectStack } from "@/components/projects/ProjectStack";
import { ServiceCard } from "@/components/services/ServiceCard";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionIntro } from "@/components/ui/SectionIntro";
import { inclusionsNote, servicesIntro, showcaseServices } from "@/lib/showcase";

// Dark slab that rises after the hero; holds the sticky services stack.
export function SelectedWork() {
  return (
    <Section
      id="work"
      theme="dark"
      navId="work"
      aria-labelledby="work-heading"
      className="rounded-(--slab-radius)"
    >
      {/* Desktop: tighter intro. The first card's sticky slot already adds --nav-zone above
          the card, so only a small bottom pad is needed here. */}
      <Container className="pt-(--space-section) pb-(--space-block) lg:pt-[calc(var(--space-section)*0.7)] lg:pb-4">
        <SectionIntro
          display
          centerHeading
          eyebrow="Services"
          lede={servicesIntro}
          headingId="work-heading"
          lines={["Digital services built", "around your business."]}
        />
      </Container>

      <ProjectStack label="Services" itemLabel="Service">
        {showcaseServices.map((service, i) => (
          <ServiceCard key={service.slug} service={service} index={i} />
        ))}
      </ProjectStack>

      <Container className="pt-(--space-block)">
        <p className="mx-auto max-w-2xl text-center text-sm text-pretty text-muted">{inclusionsNote}</p>
      </Container>

      <div aria-hidden className="h-(--space-block)" />
    </Section>
  );
}
