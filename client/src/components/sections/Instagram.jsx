export default function Instagram() {
  return (
    <section className="py-24 px-12 text-center">
      <h2 className="text-2xl font-light mb-12 uppercase tracking-widest">
        Follow Us
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-6xl mx-auto mb-12">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="aspect-square bg-gray-200 overflow-hidden group"
          >
            <img
              src={`https://picsum.photos/600/600?random=${i}`}
              className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
              alt="Instagram"
            />
          </div>
        ))}
      </div>
      <a
        className="border border-black px-12 py-3 text-xs uppercase tracking-widest hover:bg-black hover:text-white transition"
        href="https://www.instagram.com/aynfaal/"
        target="_blank"
      >
        View Instagram
      </a>
    </section>
  );
}
