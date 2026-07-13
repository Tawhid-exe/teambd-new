import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout, PageHero, Reveal } from "@/components/site/SiteLayout";
import { CoverflowCarousel, type CarouselItem } from "@/components/CoverflowCarousel";

export const Route = createFileRoute("/video-gallery")({
  head: () => ({
    meta: [
      { title: "Video Gallery | Team Bangladesh" },
      { name: "description", content: "Videos from our various campaigns and activities." },
    ],
  }),
  component: VideoGallery,
});

const VIDEOS: CarouselItem[] = [
  // Using some placeholder video URLs that work for demo purposes
  { id: "v1", type: "video", src: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4", alt: "Campaign 1" },
  { id: "v2", type: "video", src: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4", alt: "Campaign 2" },
  { id: "v3", type: "video", src: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4", alt: "Campaign 3" },
  { id: "v4", type: "video", src: "https://storage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4", alt: "Campaign 4" },
];

function VideoGallery() {
  return (
    <SiteLayout>
      <PageHero
        eyebrow="Watch Our Impact"
        title="Video Gallery"
        subtitle="See our volunteers in action and hear the stories from the field."
        image="https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=1920&q=80"
      />
      
      <section className="mx-auto max-w-[1400px] px-5 py-24">
        <Reveal>
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold">Action on the Ground</h2>
            <p className="text-muted-foreground text-lg mt-4">Documenting real changes, real people, and real impact.</p>
          </div>
        </Reveal>
        
        <Reveal delay={0.2}>
          <CoverflowCarousel items={VIDEOS} />
        </Reveal>
      </section>
    </SiteLayout>
  );
}
