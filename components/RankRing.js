"use client";

export default function RankRing({ rank, xpIntoRank, xpForNextRank, size = 84 }) {
  const stroke = size * 0.09;
  const radius = size / 2 - stroke;
  const circumference = 2 * Math.PI * radius;
  const pct = xpForNextRank > 0 ? Math.min(1, xpIntoRank / xpForNextRank) : 0;
  const offset = circumference * (1 - pct);
  const center = size / 2;

  return (
    <svg width={size} height={size} className="rank-ring" viewBox={`0 0 ${size} ${size}`}>
      <circle
        cx={center}
        cy={center}
        r={radius}
        fill="none"
        stroke="var(--border)"
        strokeWidth={stroke}
      />
      <circle
        cx={center}
        cy={center}
        r={radius}
        fill="none"
        stroke="url(#rank-ring-gradient)"
        strokeWidth={stroke}
        strokeLinecap="round"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        transform={`rotate(-90 ${center} ${center})`}
        className="rank-ring-fill"
      />
      <defs>
        <linearGradient id="rank-ring-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="var(--gold)" />
          <stop offset="100%" stopColor="var(--gold-bright)" />
        </linearGradient>
      </defs>
      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="central"
        className="rank-ring-number"
      >
        {rank}
      </text>
    </svg>
  );
}
