"use client";
import PageBanner from "@/components/media/PageBanner";

import dynamic from "next/dynamic";
const backgroundVideo = "/live-streaming/coverpage.mp4";
const fallbackImage = "/live-streaming/audio_equipment.jpg";

// Dynamic imports with SSR enabled
const Banner = dynamic(() => import("@live/components/live-streaming/Banner"), {
  ssr: true,
});
const About = dynamic(() => import("@live/components/live-streaming/About"), {
  ssr: true,
});
const Services = dynamic(() => import("@live/components/live-streaming/Services"), {
  ssr: true,
});
const Equipment = dynamic(
  () => import("@live/components/live-streaming/Equipment"),
  {
    ssr: true,
  }
);
const Pricing = dynamic(() => import("@live/components/live-streaming/Pricing"), {
  ssr: true,
});
const LiveStreamDemo = dynamic(
  () => import("@live/components/live-streaming/LiveStreamDemo"),
  {
    ssr: true,
  }
);
const RecentWorks = dynamic(
  () => import("@live/components/live-streaming/RecentWorks"),
  {
    ssr: true,
  }
);
const Testimonials = dynamic(
  () => import("@live/components/live-streaming/Testimonials"),
  {
    ssr: true,
  }
);
const FAQ2 = dynamic(() => import("@live/components/live-streaming/FAQ2"), {
  ssr: true,
});
const CallToAction = dynamic(
  () => import("@live/components/live-streaming/CallToAction"),
  {
    ssr: true,
  }
);

export default function LiveStreamingPage() {
  const title = "Experience Live Streaming Like Never Before";
  const description =
    "Broadcast your events in high-definition to a global audience with PK Photography—your trusted partner in seamless live streaming.";
  return (
    <main>
      <PageBanner slot="live-streaming-banner" />
      <Banner
        fallbackImage={fallbackImage}
        backgroundVideo={backgroundVideo}
        title={title}
        description={description}
      />
      <About />
      <Services />
      <Equipment />
      <Pricing serviceName="live-streaming" />
      <LiveStreamDemo />
      <RecentWorks />
      <Testimonials />
      <FAQ2 />
      <CallToAction />
    </main>
  );
}
