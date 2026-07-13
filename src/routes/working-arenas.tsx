import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout, PageHero, Reveal } from "@/components/site/SiteLayout";
import { Map, Leaf, Heart, BookOpen, Users, Trees, GraduationCap, PawPrint, Stethoscope, Building2, Zap, CloudRain, Droplets, HandCoins } from "lucide-react";

export const Route = createFileRoute("/working-arenas")({
  head: () => ({
    meta: [
      { title: "Working Arenas | Team Bangladesh" },
      { name: "description", content: "The areas where we make an impact." },
    ],
  }),
  component: WorkingArenas,
});

const AREAS = [
  { icon: Users, title: "Inclusive Development", desc: "Social, Educational, Environmental, Health..." },
  { icon: Trees, title: "Tree Plantation", desc: "Biodiversity conservation and mass plantation across Bangladesh." },
  { icon: GraduationCap, title: "Educational Development", desc: "Implicit Learning based most effective education - developed by Dr Muhit A Rana" },
  { icon: PawPrint, title: "Care for Homeless Paws", desc: "Ensuring welfare, rescue, and care for street and wild animals." },
  { icon: Stethoscope, title: "Free Mega Medical Campaign", desc: "Providing essential free medical services to underprivileged communities." },
  { icon: Building2, title: "Green City - Clean City", desc: "Clean city initiatives for better, pollution-free urban life." },
  { icon: Zap, title: "Renewable Energy Solutions", desc: "Solar energy is a sustainable solution to power our lives without harming the planet" },
  { icon: CloudRain, title: "Climate Change", desc: "Disaster management and climate resilience building." },
  { icon: Droplets, title: "Rainwater Harvesting", desc: "Saving rainwater today for safe drinking tomorrow" },
  { icon: HandCoins, title: "Talent Beyond Poverty", desc: "Opening doors of opportunity for deserving poorer learners." },
];

function WorkingArenas() {
  return (
    <SiteLayout>
      <PageHero
        eyebrow="Where We Act"
        title="Our Working Arenas"
        subtitle="From environmental conservation to social welfare, our volunteers are actively engaged across multiple domains."
        image="https://images.unsplash.com/photo-1502427618956-62137021eb3e?w=1920&q=80"
        stats={[]}
      />
      
      <section className="mx-auto max-w-7xl px-5 py-24">
        <Reveal>
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold">Key Areas of Focus</h2>
          </div>
        </Reveal>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {AREAS.map((area, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <div className="p-8 rounded-3xl bg-card border border-border h-full flex flex-col justify-center items-start hover:-translate-y-2 transition-transform">
                <div className="h-14 w-14 rounded-xl gradient-leaf text-white flex items-center justify-center mb-6">
                  <area.icon className="h-7 w-7" />
                </div>
                <h3 className="text-2xl font-bold mb-3">{area.title}</h3>
                <p className="text-muted-foreground text-lg">{area.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </SiteLayout>
  );
}
