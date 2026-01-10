import hero_image from "../../assets/images/hero/hero-image.jpg";

export default function Hero() {
  return (
    <header className="relative h-[80vh] w-full overflow-hidden">
      {/* Background Image Placeholder */}
      <div className="absolute inset-0 bg-gray-400">
        <img
          src={hero_image}
          alt="Wedding Hero"
          className="w-full h-full object-cover opacity-80"
        />
        <div className="absolute inset-0 bg-black/20"></div>
      </div>
      <div className="relative z-10 flex flex-col justify-center h-full px-12 max-w-4xl text-white">
        <p className="uppercase tracking-[0.3em] text-sm mb-4">Our Mission</p>
        <h1 className="text-4xl md:text-6xl font-light leading-tight">
          At aynfaal, we specialize in capturing the beauty of your most
          important events. We ensure every detail is preserved.
        </h1>
      </div>
    </header>
  );
}
