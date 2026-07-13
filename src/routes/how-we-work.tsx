import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout, PageHero, Reveal } from "@/components/site/SiteLayout";
import { Check, Target, Zap } from "lucide-react";

export const Route = createFileRoute("/how-we-work")({
  head: () => ({
    meta: [
      { title: "How We Work | Team Bangladesh" },
      { name: "description", content: "Our process and how we implement change." },
    ],
  }),
  component: HowWeWork,
});

function HowWeWork() {
  return (
    <SiteLayout>
      <PageHero
        eyebrow="Our Process"
        title="How We Work"
        subtitle="We translate our vision into actionable steps on the ground through organized collaboration and dedicated volunteer work."
        image="https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=1920&q=80"
        stats={[]}
      />
      
      <section className="mx-auto max-w-7xl px-5 py-24">
        <Reveal>
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold">A systematic approach to impact.</h2>
          </div>
        </Reveal>
        
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { title: "Identify", desc: "We find local challenges related to the environment, education, and community well-being.", icon: Target },
            { title: "Organize", desc: "Our Thana and District committees mobilize volunteers and resources to tackle the challenge.", icon: Zap },
            { title: "Execute", desc: "We act with integrity and unity, executing sustainable solutions on the ground.", icon: Check }
          ].map((step, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <div className="p-8 rounded-3xl bg-card border border-border h-full hover:-translate-y-2 transition-all">
                <div className="h-14 w-14 rounded-full gradient-leaf text-white flex items-center justify-center mb-6">
                  <step.icon className="h-7 w-7" />
                </div>
                <h3 className="text-2xl font-bold mb-4">{step.title}</h3>
                <p className="text-muted-foreground text-lg leading-relaxed">{step.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </SiteLayout>
  );
}
