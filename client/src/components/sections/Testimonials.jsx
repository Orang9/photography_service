export default function Testimonials() {
  return (
    <section className="py-20 bg-[#E8D4C3] px-10">
      <h2 className="text-4xl font-bold text-center mb-16">
        What They Say About Us?
      </h2>
      <div className="grid md:grid-cols-3 gap-10 max-w-7xl mx-auto">
        {[
          { name: "Ammar", univ: "USNI", text: "Photo nya Bagus bangeeeet" },
          {
            name: "Rahma",
            univ: "USNI",
            text: "The Best hasil nya, next bakal ku rekomendasikan ke yang lain ya",
          },
          {
            name: "QIA",
            univ: "UBakrie",
            text: "Nanti lamaran harus ke sini lagi booking nya",
          },
        ].map((testi, idx) => (
          <div key={idx} className="space-y-4">
            <p className="italic text-lg">"{testi.text}"</p>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gray-300 rounded-full"></div>
              <div>
                <p className="font-bold">{testi.name}</p>
                <p className="text-xs text-gray-500">{testi.univ}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
