import portofolio_image1 from "../../assets/images/portofolio/portofolio-image1.jpg";
import portofolio_image2 from "../../assets/images/portofolio/portofolio-image2.jpg";
import portofolio_image3 from "../../assets/images/portofolio/portofolio-image3.jpg";
import portofolio_image4 from "../../assets/images/portofolio/portofolio-image4.jpg";
import portofolio_image5 from "../../assets/images/portofolio/portofolio-image5.jpg";
import portofolio_image6 from "../../assets/images/portofolio/portofolio-image6.jpg";

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
        <div className="space-y-12">
          <div className="space-y-4">
            <div className="bg-gray-200 aspect-3/4 overflow-hidden">
              <img
                src={portofolio_image1}
                className="w-full h-full object-cover"
                alt="Portfolio"
              />
            </div>
            <div className="shadow border-b-2 pr-4 pb-4">
              <h4 className="font-medium">Joyful Moments at Bakrie</h4>
              <p className="text-xs text-gray-500 leading-relaxed">
                Menangkap ekspresi lega dan tawa lepas pasca kelulusan. Sesi
                outdoor yang fresh dengan tone warna cerah khas Aynfaal.
              </p>
            </div>
          </div>
          <div className="space-y-4">
            <div className="bg-gray-200 aspect-square overflow-hidden">
              <img
                src={portofolio_image2}
                className="w-full h-full object-cover"
                alt="Portfolio"
              />
            </div>
            <div className="shadow border-b-2 pr-4 pb-4">
              <h4 className="font-medium">Elegant Graduation Portrait</h4>
              <p className="text-xs text-gray-500 leading-relaxed">
                Tampil anggun di hari istimewa. Perpaduan pose natural dan
                lighting lembut untuk menonjolkan aura kebahagiaan wisudawati.
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-12 md:-mt-12">
          <div className="space-y-4">
            <div className="bg-gray-200 aspect-2/3 overflow-hidden">
              <img
                src={portofolio_image3}
                className="w-full h-full object-cover"
                alt="Portfolio"
              />
            </div>
            <div className="shadow border-b-2 pr-4 pb-4">
              <h4 className="font-medium">Timeless Pride</h4>
              <p className="text-xs text-gray-500 leading-relaxed">
                Sebuah potret kebanggaan alumni USNI. Komposisi klasik yang
                memastikan kenangan wisuda tetap relevan dilihat bertahun-tahun
                lagi.
              </p>
            </div>
          </div>
          <div className="space-y-4">
            <div className="bg-gray-200 aspect-4/3 overflow-hidden">
              <img
                src={portofolio_image4}
                className="w-full h-full object-cover"
                alt="Portfolio"
              />
            </div>
            <div className="shadow border-b-2 pr-4 pb-4">
              <h4 className="font-medium">Bold & Classic</h4>
              <p className="text-xs text-gray-500 leading-relaxed">
                Sesi wisuda maskulin dan berwibawa. Fokus pada detail toga dan
                ekspresi percaya diri menyambut masa depan.
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-12">
          <div className="space-y-4">
            <div className="bg-gray-200 aspect-square overflow-hidden">
              <img
                src={portofolio_image5}
                className="w-full h-full object-cover"
                alt="Portfolio"
              />
            </div>
            <div className="border-b-2 pb-4">
              <h4 className="font-medium">Intimate Sacred Vows</h4>
              <p className="text-xs text-gray-500 leading-relaxed">
                Momen sakral penyatuan janji suci. Diabadikan dengan pendekatan
                candid untuk menangkap emosi haru dan tatapan penuh cinta.
              </p>
            </div>
          </div>
          <div className="space-y-4">
            <div className="bg-gray-200 aspect-3/4 overflow-hidden">
              <img
                src={portofolio_image6}
                className="w-full h-full object-cover"
                alt="Portfolio"
              />
            </div>
            <div className="border-b-2 pb-4">
              <h4 className="font-medium">A New Beginning</h4>
              <p className="text-xs text-gray-500 leading-relaxed">
                Tawa bahagia pasangan baru. Dokumentasi resepsi yang hangat,
                menangkap chemistry natural tanpa pose yang kaku.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
