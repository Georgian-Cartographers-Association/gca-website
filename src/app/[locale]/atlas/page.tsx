"use client";

import { useState } from "react";
import { Download, ExternalLink, Map, Layers } from "lucide-react";

const maps = [
  { id: 1, title: "საქართველოს ადმინისტრაციული რუკა", year: 2024, type: "ადმინისტრაციული", format: "PDF / GeoJSON", description: "ქვეყნის ადმინისტრაციული დაყოფა — მხარეები, რაიონები, მუნიციპალიტეტები." },
  { id: 2, title: "ტოპოგრაფიული ატლასი 1:50 000", year: 2023, type: "ტოპოგრაფიული", format: "PDF", description: "სრული ტოპოგრაფიული ატლასი, სიმაღლეებისა და რელიეფის ჩვენებით." },
  { id: 3, title: "მდინარეების და ტბების რუკა", year: 2024, type: "ჰიდროგრაფიული", format: "PDF / Shapefile", description: "საქართველოს წყალსატევები, მდინარეების სისტემები და ირიგაციის ქსელი." },
  { id: 4, title: "ეკოლოგიური ზონების ატლასი", year: 2022, type: "ეკოლოგიური", format: "PDF", description: "დაცული ტერიტორიები, ეროვნული პარკები, ბუნებრივი ეკოსისტემები." },
  { id: 5, title: "გეოლოგიური რუკა", year: 2021, type: "გეოლოგიური", format: "PDF / Shapefile", description: "კლდოვანი ფენები, ნიადაგის სახეები, სეისმური ზონები." },
  { id: 6, title: "ისტორიული კარტოგრაფია — XIX საუკუნე", year: 2020, type: "ისტორიული", format: "PDF", description: "ციფრიზებული ისტორიული რუკები XIX საუკუნის საქართველოს შესახებ." },
];

const types = ["ყველა", "ადმინისტრაციული", "ტოპოგრაფიული", "ჰიდროგრაფიული", "ეკოლოგიური", "გეოლოგიული", "ისტორიული"];

export default function AtlasPage() {
  const [activeType, setActiveType] = useState("ყველა");

  const filtered = activeType === "ყველა" ? maps : maps.filter((m) => m.type === activeType);

  return (
    <div>
      <section className="bg-[#0a2342] text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-[#c8a951] text-sm font-semibold uppercase tracking-widest mb-3">ციფრული ატლასი</p>
          <h1 className="text-4xl md:text-5xl font-bold font-serif mb-4">ინტერაქტიული რუკები</h1>
          <p className="text-white/70 text-lg max-w-xl">საქართველოს კარტოგრაფიული მემკვიდრეობა — ციფრულ ფორმატში.</p>
        </div>
      </section>

      {/* Interactive map placeholder */}
      <section className="bg-[#0a2342]/5 border-b border-[#0a2342]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="h-96 bg-[#0a2342]/10 rounded-lg flex flex-col items-center justify-center border-2 border-dashed border-[#0a2342]/20">
            <Map size={48} className="text-[#0a2342]/30 mb-4" />
            <p className="text-[#0a2342]/50 font-semibold">ინტერაქტიული რუკა</p>
            <p className="text-[#0a2342]/40 text-sm mt-1">Leaflet.js / Mapbox ინტეგრაცია — მალე</p>
          </div>
        </div>
      </section>

      {/* Map catalog */}
      <section className="py-16 bg-[#f8f5ef]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-8">
            <div>
              <p className="text-[#c8a951] text-sm font-semibold uppercase tracking-widest mb-2">კატალოგი</p>
              <h2 className="text-3xl font-bold text-[#0a2342] font-serif">ატლასები და რუკები</h2>
            </div>
            <div className="flex items-center gap-2 text-[#0a2342]/50 text-sm">
              <Layers size={16} />
              {filtered.length} რუკა
            </div>
          </div>

          {/* Type filter */}
          <div className="flex flex-wrap gap-2 mb-8">
            {types.map((t) => (
              <button
                key={t}
                onClick={() => setActiveType(t)}
                className={`px-4 py-2 rounded-full text-sm border transition-colors ${
                  activeType === t
                    ? "bg-[#0a2342] text-white border-[#0a2342]"
                    : "border-[#0a2342]/20 text-[#0a2342] hover:bg-[#0a2342]/10"
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((map) => (
              <div key={map.id} className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-[#0a2342]/5">
                <div className="h-36 bg-[#0a2342]/5 flex items-center justify-center">
                  <Map size={40} className="text-[#0a2342]/20" />
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xs bg-[#c8a951]/20 text-[#0a2342] px-2 py-0.5 rounded">{map.type}</span>
                    <span className="text-xs text-[#0a2342]/40">{map.year}</span>
                  </div>
                  <h3 className="font-bold text-[#0a2342] font-serif mb-2">{map.title}</h3>
                  <p className="text-xs text-[#0a2342]/60 mb-4 leading-relaxed">{map.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-[#0a2342]/40 font-mono">{map.format}</span>
                    <div className="flex gap-2">
                      <button className="flex items-center gap-1 text-xs text-[#0a2342]/60 hover:text-[#0a2342] transition-colors">
                        <ExternalLink size={13} /> ნახვა
                      </button>
                      <button className="flex items-center gap-1 text-xs text-[#c8a951] font-semibold hover:underline">
                        <Download size={13} /> ჩამოტვირთვა
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
