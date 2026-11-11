// A stylized (not to scale) map of the GTA for the service area section.

type Place = { name: string; x: number; y: number; dx?: number; dy?: number; anchor?: "start" | "middle" | "end" };

const PLACES: Place[] = [
  { name: "North York", x: 300, y: 172 },
  { name: "Scarborough", x: 384, y: 196, dx: 0, dy: 18, anchor: "middle" },
  { name: "Etobicoke", x: 236, y: 222, anchor: "end" },
  { name: "Mississauga", x: 182, y: 240, anchor: "end" },
  { name: "Oakville", x: 112, y: 282, anchor: "end" },
  { name: "Brampton", x: 160, y: 160, anchor: "end" },
  { name: "Vaughan", x: 250, y: 128, anchor: "end" },
  { name: "Richmond Hill", x: 312, y: 96 },
  { name: "Markham", x: 384, y: 130 },
  { name: "Pickering", x: 448, y: 188, dx: 0, dy: 18, anchor: "middle" },
  { name: "Ajax", x: 492, y: 178, dx: 0, dy: -10, anchor: "middle" },
  { name: "Whitby", x: 546, y: 168, dx: 0, dy: 18, anchor: "middle" },
];

const SHORE = "M0 340C80 320 140 300 200 268S280 248 310 246 400 228 460 212 560 196 600 190";

export function GtaMap() {
  return (
    <svg viewBox="0 0 600 420" className="h-auto w-full" role="img" aria-labelledby="gta-map-title">
      <title id="gta-map-title">Map of the Greater Toronto Area showing the cities Apex Protection Services covers</title>
      <defs>
        <linearGradient id="lake" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#1A2847" />
          <stop offset="1" stopColor="#0B1324" />
        </linearGradient>
        <radialGradient id="coverage" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#F6B23C" stopOpacity="0.22" />
          <stop offset="1" stopColor="#F6B23C" stopOpacity="0" />
        </radialGradient>
        <pattern id="dots" width="14" height="14" patternUnits="userSpaceOnUse">
          <circle cx="1" cy="1" r="1" fill="#fff" fillOpacity="0.07" />
        </pattern>
      </defs>

      <rect width="600" height="420" fill="url(#dots)" />
      <ellipse cx="320" cy="190" rx="300" ry="170" fill="url(#coverage)" />

      {/* highways */}
      <g fill="none" stroke="#fff" strokeOpacity="0.14" strokeWidth="2" strokeLinecap="round">
        <path d="M20 205C150 190 250 180 330 182S480 175 600 160" />
        <path d="M40 140C200 118 350 108 600 110" strokeDasharray="6 6" />
        <path d="M262 186 250 30" />
        <path d="M335 182 348 30" />
        <path d="M0 318C100 298 180 262 296 246" />
      </g>

      {/* Lake Ontario */}
      <path d={`${SHORE}V420H0Z`} fill="url(#lake)" />
      <path d={SHORE} fill="none" stroke="#F6B23C" strokeOpacity="0.55" strokeWidth="1.5" />
      <g stroke="#fff" strokeOpacity="0.06">
        <path d="M60 360h90M210 330h70M380 300h110M120 392h120M330 372h90M470 260h80" />
      </g>
      <text x="380" y="352" fill="#A3ADBF" fillOpacity="0.6" fontSize="12" letterSpacing="4" fontStyle="italic">
        LAKE ONTARIO
      </text>

      {/* cities */}
      <g fontSize="12.5" fill="#A3ADBF">
        {PLACES.map((p) => (
          <g key={p.name}>
            <circle cx={p.x} cy={p.y} r="3.5" fill="#F6B23C" fillOpacity="0.85" />
            <text x={p.x + (p.dx ?? (p.anchor === "end" ? -9 : 9))} y={p.y + (p.dy ?? 4)} textAnchor={p.anchor ?? "start"}>
              {p.name}
            </text>
          </g>
        ))}
      </g>

      {/* Toronto HQ */}
      <circle cx="300" cy="236" r="22" fill="#F6B23C" fillOpacity="0.12">
        <animate attributeName="r" values="10;30;10" dur="3s" repeatCount="indefinite" />
        <animate attributeName="fill-opacity" values="0.3;0;0.3" dur="3s" repeatCount="indefinite" />
      </circle>
      <circle cx="300" cy="236" r="7" fill="#F6B23C" stroke="#070B14" strokeWidth="2" />
      <text x="312" y="232" fontSize="15" fontWeight="700" fill="#fff">
        Toronto
      </text>
    </svg>
  );
}
