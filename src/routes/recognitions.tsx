import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout, PageHero, Reveal } from "@/components/site/SiteLayout";
import { Award, Star } from "lucide-react";

export const Route = createFileRoute("/recognitions")({
  head: () => ({
    meta: [
      { title: "Monthly Recognitions | Team Bangladesh" },
      { name: "description", content: "Celebrating our best members and local initiatives." },
    ],
  }),
  component: Recognitions,
});

const CATEGORIES = [
  "Green Lover of this month",
  "Green School of this month",
  "Animal Lover of this month",
  "Best Student of this month",
  "Best Teacher of this month",
  "Best Social Worker of this month",
  "Best Mother of this month",
  "Best Father of this month",
  "Green Club / Society",
  "Great Volunteer",
  "Great Leader",
  "Best District Committee",
  "Best Thana Committee",
];

function Recognitions() {
  return (
    <SiteLayout>
      <PageHero
        eyebrow="Celebrating Excellence"
        title="Monthly Recognitions"
        subtitle="Every month we recognize the exceptional individuals, clubs, and committees who go above and beyond for their communities."
        image="https://images.unsplash.com/photo-1542281286-9e0a16bb7366?w=1920&q=80"
        stats={[]}
      />
      
      <section className="mx-auto max-w-7xl px-5 py-24">
        <Reveal>
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold">Our Award Categories</h2>
          </div>
        </Reveal>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CATEGORIES.map((cat, i) => (
            <Reveal key={i} delay={i * 0.05}>
              <div className="p-6 rounded-2xl bg-card border border-border flex flex-col items-center text-center hover:bg-leaf/5 hover:border-leaf/30 transition-all cursor-pointer group">
                <div className="h-12 w-12 rounded-full bg-amber-glow/20 text-amber-glow flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Award className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-bold group-hover:text-leaf transition-colors">{cat}</h3>
                <p className="text-sm text-muted-foreground mt-2">Recognizing outstanding contributions.</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </SiteLayout>
  );
}
