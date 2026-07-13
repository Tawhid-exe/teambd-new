import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout, PageHero, Reveal } from "@/components/site/SiteLayout";
import { CoverflowCarousel, type CarouselItem } from "@/components/CoverflowCarousel";

export const Route = createFileRoute("/photo-gallery")({
  head: () => ({
    meta: [
      { title: "Photo Gallery | Team Bangladesh" },
      { name: "description", content: "Moments from our various campaigns and activities." },
    ],
  }),
  component: PhotoGallery,
});

const PHOTOS: CarouselItem[] = [
  { id: "p1", type: "image", src: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=1200&q=80", alt: "Tree Plantation" },
  { id: "p2", type: "image", src: "https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?w=1200&q=80", alt: "Community Outreach" },
  { id: "p3", type: "image", src: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=1200&q=80", alt: "Children Education" },
  { id: "p4", type: "image", src: "https://images.unsplash.com/photo-1593113589914-075568e09159?w=1200&q=80", alt: "Animal Rescue" },
  { id: "p5", type: "image", src: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=1200&q=80", alt: "Clean City Campaign" },
  { id: "p6", type: "image", src: "https://images.unsplash.com/photo-1528183429752-a97d0bf99b5a?w=1200&q=80", alt: "Nature" },
];

function PhotoGallery() {
  return (
    <SiteLayout>
      <PageHero
        eyebrow="Our Journey"
        title="Photo Gallery"
        subtitle="Explore the impactful moments our volunteers have created across Bangladesh."
        image="https://images.unsplash.com/photo-1452421822248-d4c2b47f0c81?w=1920&q=80"
      />
      
      <section className="mx-auto max-w-[1400px] px-5 py-24">
        <Reveal>
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold">Moments of Impact</h2>
            <p className="text-muted-foreground text-lg mt-4">A visual story of our commitment to a greener, kinder nation.</p>
          </div>
        </Reveal>
        
        <Reveal delay={0.2}>
          <CoverflowCarousel items={PHOTOS} />
        </Reveal>
      </section>
    </SiteLayout>
  );
}
