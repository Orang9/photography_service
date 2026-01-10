import { ArrowRight } from "lucide-react";

export default function Bio() {
  return (
    <section className="py-24 px-12 max-w-7xl mx-auto flex flex-col md:flex-row gap-16 items-center">
      <div className="md:w-1/2 space-y-6">
        <h2 className="text-4xl font-light">Our Photography Expertise</h2>
        <p className="text-gray-600 leading-relaxed">
          aynfaal offers a variety of photography services including weddings,
          graduations, studio events, and product photography. Our experience
          helps us capture authentic emotions, creating a narrative of every
          occasion.
        </p>
        <div className="pt-8">
          <p className="text-xs text-gray-400 mb-4 uppercase tracking-widest">
            Experience matters
          </p>
        </div>
      </div>
      <div className="md:w-1/2">
        <div className="bg-white p-8 shadow-2xl rotate-2">
          <img
            src="https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=1000"
            className="w-full h-auto"
            alt="Camera Gear"
          />
        </div>
      </div>
    </section>
  );
}
