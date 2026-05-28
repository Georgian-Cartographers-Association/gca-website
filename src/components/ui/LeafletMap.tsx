"use client";

import { useEffect } from "react";

const GMAPS_URL =
  "https://www.google.com/maps/place/Ivane+Javakhishvili+Tbilisi+State+University/@41.7098684,44.7784941,141m/data=!3m1!1e3!4m6!3m5!1s0x40440cd30294b88b:0x9cfe7a9b37f34a36!8m2!3d41.7099824!4d44.7779992!16zL20vMDI3ZmRf?entry=ttu&g_ep=EgoyMDI2MDUxMC4wIKXMDSoASAFQAw%3D%3D";

const LAT = 41.7099824;
const LNG = 44.7779992;
const ZOOM = 17;

export default function LeafletMap() {
  useEffect(() => {
    // Leaflet must run client-side only
    import("leaflet").then((L) => {
      const leaflet = L.default ?? L;

      // Avoid double-init on hot reload
      const container = document.getElementById("leaflet-map") as HTMLElement & {
        _leaflet_id?: number;
      };
      if (!container || container._leaflet_id) return;

      const icon = leaflet.icon({
        iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
        iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
        shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41],
        shadowAnchor: [12, 41],
      });

      const map = leaflet.map("leaflet-map", {
        center: [LAT, LNG],
        zoom: ZOOM,
        scrollWheelZoom: false,
      });

      leaflet
        .tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
          maxZoom: 19,
        })
        .addTo(map);

      leaflet
        .marker([LAT, LNG], { icon })
        .addTo(map)
        .bindTooltip(
          `<div style="font-family:Georgia,serif;line-height:1.5">
            <strong style="color:#0a2342;font-size:13px">საქართველოს კარტოგრაფთა ასოციაცია</strong><br/>
            <span style="font-size:11px;color:#555">I. Chavchavadze Ave. 3, Tbilisi 0128</span>
          </div>`,
          { permanent: true, direction: "top", offset: [0, -44] }
        );
    });
  }, []);

  return (
    <div className="rounded-lg overflow-hidden border border-[#0a2342]/10 mt-4">
      {/* Leaflet CSS */}
      <link
        rel="stylesheet"
        href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
      />

      {/* Map container */}
      <div id="leaflet-map" style={{ height: "260px", width: "100%" }} />

      {/* Google Maps button */}
      <a
        href={GMAPS_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center gap-2 bg-[#0a2342] text-white text-sm font-semibold py-3 hover:bg-[#0a2342]/80 transition-colors"
      >
        🗺️ Google Maps-ზე ნახვა
      </a>
    </div>
  );
}
