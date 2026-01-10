import { Link } from "react-router-dom";

export default function Services() {
  return (
    <section className="py-24 px-12 max-w-7xl mx-auto">
      <h2 className="text-4xl font-light mb-12">Services</h2>
      <div className="border-t border-black/10">
        {[
          { title: "Graduation Photography", price: "$100" },
          { title: "Product Photography", price: "$150" },
          { title: "Wedding Photography", price: "$500" },
        ].map((service, idx) => (
          <div
            key={idx}
            className="flex justify-between items-center py-8 border-b border-black/10 group cursor-pointer"
          >
            <span className="text-2xl font-light group-hover:pl-4 transition-all duration-300">
              {service.title}
            </span>
            <div className="flex items-center gap-8">
              <span className="text-gray-400 italic">{service.price}</span>
              <Link to="/login">
                <button className="bg-[#1A1A1A] text-white px-8 py-2 text-sm uppercase tracking-widest hover:bg-gray-800 transition">
                  Book Now
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
