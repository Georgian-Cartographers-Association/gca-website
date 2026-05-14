import { MapPin, Mail, Phone, Clock } from "lucide-react";
import LeafletMap from "@/components/ui/LeafletMap";

export default function ContactPage() {
  return (
    <div>
      <section className="bg-[#0a2342] text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-[#c8a951] text-sm font-semibold uppercase tracking-widest mb-3">კონტაქტი</p>
          <h1 className="text-4xl md:text-5xl font-bold font-serif mb-4">დაგვიკავშირდი</h1>
          <p className="text-white/70 text-lg max-w-xl">კითხვები, წინადადებები ან გაწევრიანება — გვიწერეთ.</p>
        </div>
      </section>

      <section className="py-16 bg-[#f8f5ef]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-[#0a2342] font-serif mb-8">საკონტაქტო ინფორმაცია</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">

            {/* მისამართი */}
            <div className="flex items-start gap-4 p-5 bg-white rounded-lg border border-[#0a2342]/10">
              <div className="w-10 h-10 bg-[#c8a951]/20 rounded-lg flex items-center justify-center flex-shrink-0">
                <MapPin size={20} className="text-[#c8a951]" />
              </div>
              <div>
                <p className="text-xs text-[#0a2342]/50 uppercase tracking-wider mb-1">მისამართი</p>
                <p className="text-[#0a2342] text-sm font-medium leading-relaxed">
                  I. Chavchavadze Ave. 3<br />
                  Tbilisi 0128, საქართველო
                </p>
              </div>
            </div>

            {/* ელ. ფოსტა */}
            <div className="flex items-start gap-4 p-5 bg-white rounded-lg border border-[#0a2342]/10">
              <div className="w-10 h-10 bg-[#c8a951]/20 rounded-lg flex items-center justify-center flex-shrink-0">
                <Mail size={20} className="text-[#c8a951]" />
              </div>
              <div>
                <p className="text-xs text-[#0a2342]/50 uppercase tracking-wider mb-1">ელ. ფოსტა</p>
                <a
                  href="mailto:geocartographersassoc@gmail.com"
                  className="text-[#0a2342] text-sm font-medium hover:text-[#c8a951] transition-colors"
                >
                  geocartographersassoc@gmail.com
                </a>
              </div>
            </div>

            {/* ტელეფონი — საბა */}
            <div className="flex items-start gap-4 p-5 bg-white rounded-lg border border-[#0a2342]/10">
              <div className="w-10 h-10 bg-[#c8a951]/20 rounded-lg flex items-center justify-center flex-shrink-0">
                <Phone size={20} className="text-[#c8a951]" />
              </div>
              <div>
                <p className="text-xs text-[#0a2342]/50 uppercase tracking-wider mb-1">საბა მოდებაძე</p>
                <a
                  href="tel:+995579711715"
                  className="text-[#0a2342] text-sm font-medium hover:text-[#c8a951] transition-colors"
                >
                  579 711 715
                </a>
              </div>
            </div>

            {/* ტელეფონი — გოჩა */}
            <div className="flex items-start gap-4 p-5 bg-white rounded-lg border border-[#0a2342]/10">
              <div className="w-10 h-10 bg-[#c8a951]/20 rounded-lg flex items-center justify-center flex-shrink-0">
                <Phone size={20} className="text-[#c8a951]" />
              </div>
              <div>
                <p className="text-xs text-[#0a2342]/50 uppercase tracking-wider mb-1">გოჩა გუძუაძე</p>
                <a
                  href="tel:+995577554429"
                  className="text-[#0a2342] text-sm font-medium hover:text-[#c8a951] transition-colors"
                >
                  577 554 429
                </a>
              </div>
            </div>

            {/* სამუშაო საათები */}
            <div className="flex items-start gap-4 p-5 bg-white rounded-lg border border-[#0a2342]/10 sm:col-span-2">
              <div className="w-10 h-10 bg-[#c8a951]/20 rounded-lg flex items-center justify-center flex-shrink-0">
                <Clock size={20} className="text-[#c8a951]" />
              </div>
              <div>
                <p className="text-xs text-[#0a2342]/50 uppercase tracking-wider mb-1">სამუშაო საათები</p>
                <p className="text-[#0a2342] text-sm font-medium">ორშ–პარ: 10:00 – 18:00</p>
              </div>
            </div>

          </div>

          {/* რუკა */}
          <LeafletMap />
        </div>
      </section>
    </div>
  );
}
