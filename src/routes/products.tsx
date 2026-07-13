import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout, PageHero, Reveal } from "@/components/site/SiteLayout";
import { ShoppingBag, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/products")({
  head: () => ({
    meta: [
      { title: "Products | Team Bangladesh" },
      { name: "description", content: "Support our cause by purchasing Team Bangladesh merchandise." },
    ],
  }),
  component: Products,
});

const MERCH = [
  {
    id: 1,
    name: "Classic Green Tee",
    price: "৳ 450",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80",
    desc: "100% cotton t-shirt with the Team Bangladesh logo. All proceeds go to tree plantation.",
  },
  {
    id: 2,
    name: "Eco-Friendly Tote Bag",
    price: "৳ 250",
    image: "https://images.unsplash.com/photo-1544816155-12df9643f363?w=800&q=80",
    desc: "Durable canvas bag perfect for groceries, helping you reduce plastic use.",
  },
  {
    id: 3,
    name: "Volunteer Cap",
    price: "৳ 300",
    image: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=800&q=80",
    desc: "Breathable cotton cap worn by our field volunteers.",
  },
  {
    id: 4,
    name: "Reusable Water Bottle",
    price: "৳ 600",
    image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=800&q=80",
    desc: "Stainless steel water bottle to keep you hydrated and cut down on single-use plastic.",
  },
];

function Products() {
  return (
    <SiteLayout>
      <PageHero
        eyebrow="Shop for a Cause"
        title="Our Products"
        subtitle="Wear your support. Every purchase directly funds our environmental and social welfare projects."
        image="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1920&q=80"
      />
      
      <section className="mx-auto max-w-7xl px-5 py-24">
        <Reveal>
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold">Official Merchandise</h2>
            <p className="text-muted-foreground text-lg mt-4">100% of the profits go directly to our field campaigns.</p>
          </div>
        </Reveal>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {MERCH.map((item, i) => (
            <Reveal key={item.id} delay={i * 0.1} className="h-full">
              <div className="group rounded-3xl overflow-hidden bg-card border border-border flex flex-col h-full hover:shadow-xl hover:shadow-leaf/10 transition-all hover:-translate-y-1">
                <div className="aspect-[4/5] overflow-hidden relative bg-muted/30">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 mix-blend-multiply" />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur text-ink font-bold px-3 py-1.5 rounded-full shadow-sm text-sm">
                    {item.price}
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="text-xl font-bold group-hover:text-leaf transition-colors">{item.name}</h3>
                  <p className="text-muted-foreground text-sm mt-3 flex-1">{item.desc}</p>
                  
                  <button className="mt-6 w-full flex items-center justify-center gap-2 rounded-full border border-leaf text-leaf hover:bg-leaf hover:text-white px-4 py-2.5 font-semibold transition-colors">
                    <ShoppingBag className="h-4 w-4" /> Order Now
                  </button>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
        
        <Reveal delay={0.4} className="mt-20">
          <div className="rounded-[2rem] gradient-leaf p-10 md:p-14 text-white text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 h-64 w-64 rounded-full bg-white/10 blur-3xl -translate-y-1/2 translate-x-1/3" />
            <div className="relative z-10 max-w-2xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold">Want to order in bulk for your team?</h2>
              <p className="text-white/80 mt-4 text-lg">We provide custom organization-branded eco-merchandise for corporate partners.</p>
              <a href="/#contact" className="mt-8 inline-flex items-center gap-2 rounded-full bg-white text-ink px-8 py-3.5 font-bold uppercase tracking-wider hover:bg-amber-glow transition-colors">
                Contact Us <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </Reveal>
      </section>
    </SiteLayout>
  );
}
