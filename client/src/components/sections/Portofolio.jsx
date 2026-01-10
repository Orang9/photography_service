export default function Portofolio() {
  return (
    <section className="py-24 bg-[#E8D4C3] px-12">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-light mb-4">Our Latest Works</h2>
        <p className="text-gray-500 max-w-xl mx-auto italic text-sm">
          Take a look at some of my favorite moments captured. From big events
          to small details, we do it all.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {/* Column 1 */}
        <div className="space-y-12">
          <div className="space-y-4">
            <div className="bg-gray-200 aspect-3/4 overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1000"
                className="w-full h-full object-cover"
                alt="Portfolio"
              />
            </div>
            <div className="shadow border-b-2 pr-4 pb-4">
              <h4 className="font-medium">Product Title</h4>
              <p className="text-xs text-gray-500 leading-relaxed">
                Detailed description about the photoshoot, the lighting, and the
                artistic direction taken for this specific project.
              </p>
            </div>
          </div>
          <div className="space-y-4">
            <div className="bg-gray-200 aspect-square overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1520854221256-17451cc331bf?q=80&w=1000"
                className="w-full h-full object-cover"
                alt="Portfolio"
              />
            </div>
            <div className="shadow border-b-2 pr-4 pb-4">
              <h4 className="font-medium">Floral Studies</h4>
              <p className="text-xs text-gray-500 leading-relaxed">
                Capturing the delicate nature of flora in high contrast
                environments.
              </p>
            </div>
          </div>
        </div>

        {/* Column 2 - Higher Center */}
        <div className="space-y-12 md:-mt-12">
          <div className="space-y-4">
            <div className="bg-gray-200 aspect-2/3 overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1000"
                className="w-full h-full object-cover"
                alt="Portfolio"
              />
            </div>
            <div className="shadow border-b-2 pr-4 pb-4">
              <h4 className="font-medium">Editorial Portrait</h4>
              <p className="text-xs text-gray-500 leading-relaxed">
                Fashion photography focused on modern silhouettes and urban
                landscapes.
              </p>
            </div>
          </div>
          <div className="space-y-4">
            <div className="bg-gray-200 aspect-4/3 overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=1000"
                className="w-full h-full object-cover"
                alt="Portfolio"
              />
            </div>
            <div className="shadow border-b-2 pr-4 pb-4">
              <h4 className="font-medium">Human Connection</h4>
              <p className="text-xs text-gray-500 leading-relaxed">
                Candid moments that show the raw emotion of human interaction.
              </p>
            </div>
          </div>
        </div>

        {/* Column 3 */}
        <div className="space-y-12">
          <div className="space-y-4">
            <div className="bg-gray-200 aspect-square overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1000"
                className="w-full h-full object-cover"
                alt="Portfolio"
              />
            </div>
            <div className="border-b-2 pb-4">
              <h4 className="font-medium">Architecture</h4>
              <p className="text-xs text-gray-500 leading-relaxed">
                Lines, shadows, and geometry in the modern concrete jungle.
              </p>
            </div>
          </div>
          <div className="space-y-4">
            <div className="bg-gray-200 aspect-3/4 overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1000"
                className="w-full h-full object-cover"
                alt="Portfolio"
              />
            </div>
            <div className="border-b-2 pb-4">
              <h4 className="font-medium">Movement</h4>
              <p className="text-xs text-gray-500 leading-relaxed">
                The art of motion captured through long exposure and steady
                hands.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
