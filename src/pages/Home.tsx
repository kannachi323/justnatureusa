import { useEffect, useState, useRef } from "react";
import { FiChevronDown, FiArrowRight } from "react-icons/fi";
import { LuLeaf, LuSparkles, LuHeart, LuTruck } from "react-icons/lu";

import { fetchItemsV2 } from "../utils/db";

type HomeImage = {
  src: string;
  id: number;
  [key: string]: unknown;
};

function useInView(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [threshold]);

  return { ref, isInView };
}

function AnimatedSection({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const { ref, isInView } = useInView(0.1);

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${className}`}
      style={{
        transitionDelay: `${delay}ms`,
        opacity: isInView ? 1 : 0,
        transform: isInView ? "translateY(0)" : "translateY(40px)",
      }}
    >
      {children}
    </div>
  );
}

export default function Home() {
  const [homeImages, setHomeImages] = useState<HomeImage[]>();
  const [imageIdx, setImageIdx] = useState<number>(0);

  useEffect(() => {
    fetchItemsV2("home", setHomeImages);
  }, []);

  useEffect(() => {
    if (!homeImages || homeImages.length === 0) return;

    const interval = setInterval(() => {
      setImageIdx((prevIdx) =>
        prevIdx === homeImages.length - 1 ? 0 : prevIdx + 1
      );
    }, 6000);

    return () => clearInterval(interval);
  }, [homeImages]);

  const scrollToContent = () => {
    window.scrollTo({
      top: window.innerHeight - 80,
      behavior: "smooth",
    });
  };

  if (!homeImages || homeImages.length === 0) {
    return (
      <div className="h-screen flex items-center justify-center bg-[#fefbfa]">
        <div className="animate-pulse flex flex-col items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-[#e3bc9e]/30"></div>
          <div className="h-4 w-32 bg-[#e3bc9e]/30 rounded"></div>
        </div>
      </div>
    );
  }

  const features = [
    {
      icon: LuLeaf,
      title: "Sustainably Grown",
      description:
        "Our orchids are carefully cultivated using eco-friendly practices from Taiwan's finest nurseries.",
    },
    {
      icon: LuSparkles,
      title: "Premium Quality",
      description:
        "Each arrangement is handcrafted with 20+ years of expertise to ensure lasting beauty.",
    },
    {
      icon: LuHeart,
      title: "Custom Designs",
      description:
        "We create personalized arrangements that perfectly match your vision and space.",
    },
    {
      icon: LuTruck,
      title: "Careful Delivery",
      description:
        "Professional handling ensures your orchids arrive in perfect condition.",
    },
  ];

  return (
    <div className="w-full min-h-full overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative w-full h-[calc(100vh-80px)] md:h-[calc(100vh-100px)] overflow-hidden">
        {/* Background Images */}
        {homeImages.map((img, idx) => (
          <img
            key={idx}
            src={img.src}
            alt={`Orchid arrangement ${idx + 1}`}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${
              imageIdx === idx ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
            style={{ objectPosition: "center 30%" }}
          />
        ))}

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/50 z-20" />

        {/* Hero Content */}
        <div className="absolute inset-0 z-30 flex flex-col items-center justify-center text-center px-6">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light text-white mb-4 md:mb-6 tracking-wide">
            Elegant Orchids
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-white/90 mb-8 md:mb-10 max-w-2xl font-light">
            Premium orchid arrangements crafted with care from Taiwan's finest blooms
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="/shop"
              className="px-8 py-3 bg-white text-[#4a3f35] rounded-full font-medium hover:bg-[#f8f4f1] transition-all duration-300 hover:scale-105 shadow-lg"
            >
              Shop Collection
            </a>
            <a
              href="/gallery"
              className="px-8 py-3 bg-transparent border-2 border-white text-white rounded-full font-medium hover:bg-white/10 transition-all duration-300"
            >
              View Gallery
            </a>
          </div>
        </div>

        {/* Carousel Indicators */}
        <div className="absolute bottom-24 md:bottom-20 left-1/2 -translate-x-1/2 flex gap-2 z-30">
          {homeImages.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setImageIdx(idx)}
              className={`w-2 h-2 md:w-2.5 md:h-2.5 rounded-full transition-all duration-500 ${
                imageIdx === idx
                  ? "bg-white w-6 md:w-8"
                  : "bg-white/50 hover:bg-white/70"
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>

        {/* Scroll Indicator */}
        <button
          onClick={scrollToContent}
          className="absolute bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 z-30 text-white animate-bounce cursor-pointer hover:text-white/80 transition-colors"
          aria-label="Scroll to content"
        >
          <FiChevronDown className="text-3xl md:text-4xl" />
        </button>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24 px-6 bg-[#fefbfa]">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection>
            <h2 className="text-3xl md:text-4xl lg:text-5xl text-center text-[#4a3f35] mb-4 font-light">
              Why Choose Us
            </h2>
            <p className="text-center text-[#9e7a5f] mb-12 md:mb-16 max-w-2xl mx-auto text-lg">
              Bringing nature's elegance into your space with exceptional quality and service
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {features.map((feature, idx) => (
              <AnimatedSection key={feature.title} delay={idx * 100}>
                <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 h-full">
                  <div className="w-14 h-14 rounded-full bg-[#e3bc9e]/20 flex items-center justify-center mb-5">
                    <feature.icon className="text-2xl text-[#ccab8f]" />
                  </div>
                  <h3 className="text-xl text-[#4a3f35] mb-3 font-medium">
                    {feature.title}
                  </h3>
                  <p className="text-[#9e7a5f] leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section with Parallax */}
      <section className="relative py-24 md:py-32 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-fixed"
          style={{ backgroundImage: "url('/flower_farm.jpeg')" }}
        />
        <div className="absolute inset-0 bg-[#4a3f35]/70" />

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <AnimatedSection>
            <h2 className="text-3xl md:text-4xl lg:text-5xl text-white mb-6 font-light">
              Our Story
            </h2>
            <p className="text-lg md:text-xl text-white/90 leading-relaxed mb-8">
              For over two decades, we've been passionate about bringing the beauty of
              Taiwan's finest orchids to homes and businesses across America. Each
              arrangement tells a story of dedication, artistry, and the timeless
              elegance that only nature can provide.
            </p>
            <a
              href="/info"
              className="inline-flex items-center gap-2 text-white border-b-2 border-white/50 hover:border-white pb-1 transition-colors"
            >
              Learn more about us
              <FiArrowRight />
            </a>
          </AnimatedSection>
        </div>
      </section>

      {/* Showcase Section */}
      <section className="py-16 md:py-24 px-6 bg-[#f8f8f3]">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection>
            <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12">
              <div>
                <h2 className="text-3xl md:text-4xl lg:text-5xl text-[#4a3f35] mb-4 font-light">
                  Featured Arrangements
                </h2>
                <p className="text-[#9e7a5f] text-lg max-w-xl">
                  Discover our most popular orchid creations, each handcrafted with care
                </p>
              </div>
              <a
                href="/shop"
                className="mt-6 md:mt-0 inline-flex items-center gap-2 text-[#ccab8f] hover:text-[#4a3f35] transition-colors font-medium"
              >
                View all products
                <FiArrowRight />
              </a>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            <AnimatedSection delay={0}>
              <div className="group cursor-pointer">
                <div className="relative overflow-hidden rounded-2xl mb-4 aspect-[4/5]">
                  <img
                    src="/2.jpeg"
                    alt="Orchid arrangement"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                </div>
                <h3 className="text-xl text-[#4a3f35] mb-2">Classic Elegance</h3>
                <p className="text-[#9e7a5f]">Timeless white phalaenopsis arrangement</p>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={150}>
              <div className="group cursor-pointer">
                <div className="relative overflow-hidden rounded-2xl mb-4 aspect-[4/5]">
                  <img
                    src="/3.jpg"
                    alt="Orchid arrangement"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                </div>
                <h3 className="text-xl text-[#4a3f35] mb-2">Garden Collection</h3>
                <p className="text-[#9e7a5f]">Multi-stem arrangement with natural accents</p>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={300}>
              <div className="group cursor-pointer">
                <div className="relative overflow-hidden rounded-2xl mb-4 aspect-[4/5]">
                  <img
                    src="/4.jpg"
                    alt="Orchid arrangement"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                </div>
                <h3 className="text-xl text-[#4a3f35] mb-2">Modern Statement</h3>
                <p className="text-[#9e7a5f]">Contemporary design for any space</p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Testimonial/Quote Section */}
      <section className="py-16 md:py-24 px-6 bg-[#fefbfa]">
        <AnimatedSection>
          <div className="max-w-3xl mx-auto text-center">
            <div className="text-6xl text-[#e3bc9e] mb-6">"</div>
            <blockquote className="text-2xl md:text-3xl text-[#4a3f35] font-light leading-relaxed mb-8">
              The orchids from Just Nature have transformed our office space. The quality
              and care that goes into each arrangement is truly exceptional.
            </blockquote>
            <div className="flex items-center justify-center gap-4">
              <div className="w-12 h-12 rounded-full bg-[#e3bc9e]/30"></div>
              <div className="text-left">
                <p className="text-[#4a3f35] font-medium">Sarah M.</p>
                <p className="text-[#9e7a5f] text-sm">Interior Designer</p>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 px-6 bg-[#4a3f35]">
        <AnimatedSection>
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl lg:text-5xl text-white mb-6 font-light">
              It's not just nature...
            </h2>
            <p className="text-4xl md:text-5xl lg:text-6xl text-[#a3d94b] font-light mb-8">
              it's Just Nature
            </p>
            <p className="text-white/80 text-lg mb-10 max-w-2xl mx-auto">
              Ready to bring the elegance of premium orchids into your home or business?
              Explore our collection or get in touch for a custom arrangement.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/shop"
                className="px-8 py-3 bg-[#a3d94b] text-[#4a3f35] rounded-full font-medium hover:bg-[#b8e65f] transition-all duration-300 hover:scale-105"
              >
                Browse Shop
              </a>
              <a
                href="/info"
                className="px-8 py-3 bg-transparent border-2 border-white/50 text-white rounded-full font-medium hover:bg-white/10 hover:border-white transition-all duration-300"
              >
                Contact Us
              </a>
            </div>
          </div>
        </AnimatedSection>
      </section>
    </div>
  );
}
