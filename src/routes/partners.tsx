import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout, PageHero, Reveal } from "@/components/site/SiteLayout";
import { Handshake } from "lucide-react";

export const Route = createFileRoute("/partners")({
  head: () => ({
    meta: [
      { title: "Our Partners | Team Bangladesh" },
      { name: "description", content: "Organizations supporting our mission." },
    ],
  }),
  component: Partners,
});

const PARTNERS = [
  "CEED",
  "Fatih Mediclinic",
  "Imperial jurists",
  "elements Banani",
  "Rivaaj"
];

function Partners() {
  return (
    <SiteLayout>
      <PageHero
        eyebrow="Collaborative Impact"
        title="Our Partners"
        subtitle="We work alongside incredible organizations that share our vision for a better Bangladesh."
        image="https://images.unsplash.com/photo-1552664730-d307ca884978?w=1920&q=80"
        stats={[]}
      />
      
      <section className="mx-auto max-w-5xl px-5 py-24">
        <Reveal>
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold">Trusted Allies</h2>
            <p className="text-lg text-muted-foreground mt-4">Together with our partners, we amplify our efforts to drive positive change across the nation.</p>
          </div>
        </Reveal>
        
        <div className="flex flex-wrap justify-center gap-6">
          {PARTNERS.map((partner, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <div className="p-8 rounded-2xl bg-card border border-border shadow-sm flex items-center justify-center gap-3 hover:bg-leaf/5 hover:border-leaf/30 transition-all cursor-default">
                <Handshake className="h-6 w-6 text-amber-glow" />
                <span className="text-2xl font-bold text-foreground">{partner}</span>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </SiteLayout>
  );
}
