"use client";

import { useRouter } from "next/navigation";
import { tierTopicIds } from "@/lib/progressHelpers";

export default function TierWheel({ tiers, currentTierId, progress, size = 400 }) {
  const router = useRouter();
  const others = tiers.filter((t) => t.id !== currentTierId);
  const current = tiers.find((t) => t.id === currentTierId) || tiers[0];
  const radius = size * 0.36;
  const center = size / 2;
  const nodeSize = 78;

  function go(tier) {
    router.push(`/tier/${tier.id}`);
  }

  function stats(tier) {
    const ids = tierTopicIds(tier);
    const done = ids.filter((id) => progress.completedTopics.includes(id)).length;
    const pct = ids.length > 0 ? Math.round((done / ids.length) * 100) : 0;
    const earnedUnlock = progress.unlockedTiers.includes(tier.id);
    return { done, total: ids.length, pct, earnedUnlock };
  }

  const currentStats = stats(current);

  return (
    <div className="tier-wheel" style={{ width: size, height: size }}>
      <div className="tier-wheel-orbit" style={{ width: radius * 2, height: radius * 2 }} />
      {others.map((tier, i) => {
        const angle = (i / others.length) * 2 * Math.PI - Math.PI / 2;
        const x = center + radius * Math.cos(angle) - nodeSize / 2;
        const y = center + radius * Math.sin(angle) - nodeSize / 2;
        const s = stats(tier);
        return (
          <button
            key={tier.id}
            className={`tier-node ${s.earnedUnlock ? "tier-node-earned" : "tier-node-dim"}`}
            style={{ left: x, top: y, width: nodeSize, height: nodeSize }}
            onClick={() => go(tier)}
            title={`${tier.name} — ${s.done}/${s.total}${s.earnedUnlock ? "" : " (not yet earned)"}`}
          >
            <span className="tier-node-icon">{tier.icon}</span>
            <span className="tier-node-label">{tier.name}</span>
            <div className="tier-node-ring" style={{ "--pct": `${s.pct}%` }} />
          </button>
        );
      })}
      <button
        className="tier-node tier-node-current"
        style={{
          left: center - nodeSize * 0.72,
          top: center - nodeSize * 0.72,
          width: nodeSize * 1.44,
          height: nodeSize * 1.44,
        }}
        onClick={() => go(current)}
        title={`${current.name} — ${currentStats.done}/${currentStats.total}`}
      >
        <span className="tier-node-icon" style={{ fontSize: 26 }}>{current.icon}</span>
        <span className="tier-node-label">{current.name}</span>
        <div className="tier-node-ring" style={{ "--pct": `${currentStats.pct}%` }} />
      </button>
    </div>
  );
}
