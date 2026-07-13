import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout, PageHero, Reveal } from "@/components/site/SiteLayout";
import { Calendar, User, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/blog")({
  head: () => ({
    meta: [
      { title: "Blog | Team Bangladesh" },
      { name: "description", content: "Stories, news, and updates from the ground." },
    ],
  }),
  component: Blog,
});

const POSTS = [
  {
    id: 1,
    title: "100,000 Trees Planted in Northern Districts",
    excerpt: "Our massive afforestation campaign reached a new milestone as volunteers completed planting across Rajshahi and Rangpur divisions.",
    image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&q=80",
    date: "Aug 15, 2026",
    author: "Tanvir Hasan",
    category: "Environment",
  },
  {
    id: 2,
    title: "New Animal Shelter Opened in Dhaka",
    excerpt: "Providing a safe haven for stray animals. The shelter is equipped with an emergency medical center and dedicated rescue vehicles.",
    image: "https://images.unsplash.com/photo-1548767797-d8c844163c4c?w=800&q=80",
    date: "Aug 12, 2026",
    author: "Mahfuza Akter",
    category: "Animal Welfare",
  },
  {
    id: 3,
    title: "Empowering Rural Women through Skill Workshops",
    excerpt: "A look into our recent handicraft and IT skill workshops held in remote areas to empower women economically.",
    image: "https://images.unsplash.com/photo-1614283233556-f35b0c801ef1?w=800&q=80",
    date: "Aug 05, 2026",
    author: "Sultana Ahmed",
    category: "Community",
  },
  {
    id: 4,
    title: "Flood Relief Distribution Complete",
    excerpt: "Our volunteers worked day and night to distribute dry food, medicine, and clean water to flood-affected regions in Sylhet.",
    image: "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=800&q=80",
    date: "Jul 28, 2026",
    author: "Nazmul Bari",
    category: "Relief",
  },
];

function Blog() {
  return (
    <SiteLayout>
      <PageHero
        eyebrow="Stories from the field"
        title="Our Blog"
        subtitle="Read the latest news, updates, and inspiring stories from our volunteers across the nation."
        image="https://images.unsplash.com/photo-1455390582262-044cdead27d8?w=1920&q=80"
      />
      
      <section className="mx-auto max-w-7xl px-5 py-24">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Featured Post */}
          <Reveal className="md:col-span-2 lg:col-span-3 mb-8">
            <Link to="/#" className="group block overflow-hidden rounded-[2rem] bg-card border border-border shadow-lg hover:shadow-xl transition-all">
              <div className="flex flex-col md:flex-row h-full">
                <div className="md:w-1/2 overflow-hidden aspect-video md:aspect-auto h-full">
                  <img src={POSTS[0].image} alt={POSTS[0].title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                </div>
                <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
                  <div className="inline-flex items-center gap-2 rounded-full bg-leaf/15 text-leaf px-4 py-1.5 text-xs font-semibold uppercase tracking-wider w-fit mb-6">
                    {POSTS[0].category}
                  </div>
                  <h3 className="text-3xl md:text-4xl font-bold group-hover:text-leaf transition-colors">{POSTS[0].title}</h3>
                  <p className="mt-4 text-muted-foreground text-lg line-clamp-3 leading-relaxed">{POSTS[0].excerpt}</p>
                  
                  <div className="mt-8 flex items-center gap-6 text-sm text-muted-foreground">
                    <span className="flex items-center gap-2"><Calendar className="h-4 w-4" /> {POSTS[0].date}</span>
                    <span className="flex items-center gap-2"><User className="h-4 w-4" /> {POSTS[0].author}</span>
                  </div>
                </div>
              </div>
            </Link>
          </Reveal>

          {/* Other Posts */}
          {POSTS.slice(1).map((post, i) => (
            <Reveal key={post.id} delay={i * 0.1} className="h-full">
              <Link to="/#" className="group flex flex-col h-full overflow-hidden rounded-3xl bg-card border border-border hover:shadow-lg transition-all hover:-translate-y-1">
                <div className="aspect-[4/3] overflow-hidden relative">
                  <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute top-4 left-4 bg-ink/80 backdrop-blur text-white text-xs font-bold uppercase px-3 py-1.5 rounded-full">
                    {post.category}
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="text-xl font-bold group-hover:text-leaf transition-colors line-clamp-2">{post.title}</h3>
                  <p className="mt-3 text-muted-foreground text-sm line-clamp-3 flex-1">{post.excerpt}</p>
                  
                  <div className="mt-6 pt-6 border-t border-border flex items-center justify-between">
                    <div className="flex items-center gap-3 text-xs text-muted-foreground font-medium">
                      <span className="flex items-center gap-1.5"><Calendar className="h-3.5 w-3.5" /> {post.date}</span>
                    </div>
                    <div className="h-8 w-8 rounded-full gradient-leaf text-white flex items-center justify-center group-hover:translate-x-1 transition-transform">
                      <ArrowRight className="h-4 w-4" />
                    </div>
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
        
        <div className="mt-16 flex justify-center">
          <button className="rounded-full border border-border bg-card px-8 py-3 font-semibold hover:bg-muted transition-colors shadow-sm">
            Load More Stories
          </button>
        </div>
      </section>
    </SiteLayout>
  );
}
