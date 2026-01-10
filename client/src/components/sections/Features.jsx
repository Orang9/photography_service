export default function Features() {
  return (
    <section className="py-20 bg-[#13273F] text-white">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 text-center">
          {[
            { title: "Profesional", desc: "Tim fotografer berpengalaman" },
            {
              title: "Harga Terjangkau",
              desc: "Paket hemat untuk semua kalangan",
            },
            { title: "Fleksibel", desc: "Waktu & lokasi sesuai request" },
            { title: "Jabodetabek", desc: "Siap datang ke lokasi Anda" },
          ].map((feature, idx) => (
            <div key={idx}>
              <h3 className="text-xl font-heading font-bold mb-2">
                {feature.title}
              </h3>
              <p className="text-[#E8D4C3]">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
