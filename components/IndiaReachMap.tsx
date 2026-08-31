"use client";

/**
 * IndiaReachMap — Maa Sheetla Agency
 * ------------------------------------------------------------------
 * Trade-route map from Surat origin to 12 primary counter cities:
 * Delhi, Varanasi, Muzaffarnagar, Meerut, Indore, Bhopal, Raipur,
 * Ranchi, Dhanbad, Ludhiana, Jaipur, Patna + Surat (Gujarat).
 */

import { useEffect, useMemo, useRef, useState } from "react";
import {
  VIEW_BOX,
  NATION_PATH,
  INDIA_STATES,
  ISLET_MARKERS,
  ACTIVE_STATE_IDS,
  projectPoint,
} from "./india-geometry";

export interface ReachNode {
  id: string;
  name: string;
  region: string;
  coords: [number, number];
  stateId: string;
  counters?: number;
  since?: number;
  anchor?: "start" | "end";
  curve?: number;
  labelOffsetY?: number;
}

export interface IndiaReachMapProps {
  origin?: ReachNode;
  nodes?: ReachNode[];
  activeId?: string | null;
  onActiveChange?: (id: string | null) => void;
  className?: string;
}

export const DEFAULT_ORIGIN: ReachNode = {
  id: "surat",
  name: "Surat",
  region: "Gujarat · Head Office & Looms",
  coords: [72.8311, 21.1702],
  stateId: "gujarat",
  anchor: "end",
  labelOffsetY: 16,
};

export const ALL_REACH_NODES: ReachNode[] = [
  { id: "delhi",         name: "Delhi",         region: "Delhi NCR",      coords: [77.2090, 28.6139], stateId: "delhi",          counters: 85, since: 2013, anchor: "end",   curve: 0.14, labelOffsetY: -6 },
  { id: "ludhiana",      name: "Ludhiana",      region: "Punjab",         coords: [75.8573, 30.9010], stateId: "punjab",         counters: 40, since: 2016, anchor: "end",   curve: 0.08, labelOffsetY: -4 },
  { id: "jaipur",        name: "Jaipur",        region: "Rajasthan",      coords: [75.7873, 26.9124], stateId: "rajasthan",      counters: 45, since: 2014, anchor: "end",   curve: 0.09, labelOffsetY: 0 },
  { id: "muzaffarnagar", name: "Muzaffarnagar", region: "Uttar Pradesh",  coords: [77.7060, 29.4727], stateId: "uttar-pradesh",  counters: 25, since: 2015, anchor: "start", curve: 0.19, labelOffsetY: -12 },
  { id: "meerut",        name: "Meerut",        region: "Uttar Pradesh",  coords: [77.7064, 28.9845], stateId: "uttar-pradesh",  counters: 30, since: 2013, anchor: "start", curve: 0.12, labelOffsetY: 10 },
  { id: "varanasi",      name: "Varanasi",      region: "Uttar Pradesh",  coords: [82.9739, 25.3176], stateId: "uttar-pradesh",  counters: 55, since: 2012, anchor: "start", curve: 0.18, labelOffsetY: 2 },
  { id: "patna",         name: "Patna",         region: "Bihar",          coords: [85.1376, 25.5941], stateId: "bihar",          counters: 50, since: 2015, anchor: "start", curve: 0.22, labelOffsetY: -6 },
  { id: "ranchi",        name: "Ranchi",        region: "Jharkhand",      coords: [85.3096, 23.3441], stateId: "jharkhand",      counters: 35, since: 2016, anchor: "start", curve: 0.11, labelOffsetY: 10 },
  { id: "dhanbad",       name: "Dhanbad",       region: "Jharkhand",      coords: [86.4304, 23.7957], stateId: "jharkhand",      counters: 25, since: 2018, anchor: "start", curve: 0.16, labelOffsetY: -10 },
  { id: "indore",        name: "Indore",        region: "Madhya Pradesh", coords: [75.8577, 22.7196], stateId: "madhya-pradesh", counters: 45, since: 2013, anchor: "end",   curve: -0.06, labelOffsetY: 14 },
  { id: "bhopal",        name: "Bhopal",        region: "Madhya Pradesh", coords: [77.4126, 23.2599], stateId: "madhya-pradesh", counters: 40, since: 2014, anchor: "start", curve: 0.04, labelOffsetY: 0 },
  { id: "raipur",        name: "Raipur",        region: "Chhattisgarh",   coords: [81.6296, 21.2514], stateId: "chhattisgarh",   counters: 35, since: 2017, anchor: "start", curve: -0.08, labelOffsetY: 14 },
];

function threadPath(a: [number, number], b: [number, number], curve: number) {
  const [x1, y1] = a;
  const [x2, y2] = b;
  const dx = x2 - x1;
  const dy = y2 - y1;
  const len = Math.hypot(dx, dy) || 1;
  const cx = (x1 + x2) / 2 + (-dy / len) * len * curve;
  const cy = (y1 + y2) / 2 + (dx / len) * len * curve;
  return `M${x1.toFixed(1)},${y1.toFixed(1)} Q${cx.toFixed(1)},${cy.toFixed(1)} ${x2.toFixed(1)},${y2.toFixed(1)}`;
}

export default function IndiaReachMap({
  origin = DEFAULT_ORIGIN,
  nodes = ALL_REACH_NODES,
  activeId,
  onActiveChange,
  className = "",
}: IndiaReachMapProps) {
  const [internalActive, setInternalActive] = useState<string | null>(null);
  const [visible, setVisible] = useState(false);
  const [reduced, setReduced] = useState(false);

  const rootRef = useRef<SVGSVGElement | null>(null);
  const nationRef = useRef<SVGPathElement | null>(null);
  const threadRefs = useRef<Record<string, SVGPathElement | null>>({});

  const active = activeId !== undefined ? activeId : internalActive;
  const setActive = (id: string | null) => {
    if (activeId === undefined) setInternalActive(id);
    onActiveChange?.(id);
  };

  const originPt = useMemo(() => projectPoint(...origin.coords), [origin]);

  const routes = useMemo(
    () =>
      nodes.map((n) => {
        const pt = projectPoint(...n.coords);
        return { node: n, pt, d: threadPath(originPt, pt, n.curve ?? 0.15) };
      }),
    [nodes, originPt]
  );

  const litState =
    active === origin.id
      ? origin.stateId
      : routes.find((r) => r.node.id === active)?.node.stateId ?? null;

  useEffect(() => {
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!visible || reduced) return;

    const nation = nationRef.current;
    if (nation) {
      const L = nation.getTotalLength();
      nation.style.strokeDasharray = `${L}`;
      nation.animate([{ strokeDashoffset: L }, { strokeDashoffset: 0 }], {
        duration: 2200,
        easing: "cubic-bezier(.4,0,.2,1)",
        fill: "forwards",
      });
    }

    routes.forEach((r, i) => {
      const p = threadRefs.current[r.node.id];
      if (!p) return;
      const L = p.getTotalLength();
      p.style.strokeDasharray = `${L}`;
      p.animate([{ strokeDashoffset: L }, { strokeDashoffset: 0 }], {
        duration: 1500,
        delay: 500 + i * 110,
        easing: "cubic-bezier(.33,1,.68,1)",
        fill: "forwards",
      });
    });
  }, [visible, reduced, routes]);

  const uid = "reach";

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <svg
        ref={rootRef}
        viewBox={`0 0 ${VIEW_BOX.w} ${VIEW_BOX.h}`}
        className="block h-auto w-full"
        role="img"
        aria-label={`Trade routes from ${origin.name} to ${nodes.map((n) => n.name).join(", ")}`}
      >
        <defs>
          <linearGradient id={`${uid}-weft`} x1="0" y1="1" x2="1" y2="0">
            <stop offset="0%" stopColor="#E4611A" />
            <stop offset="60%" stopColor="#F2A03D" />
            <stop offset="100%" stopColor="#FFD9A0" />
          </linearGradient>
          <filter id={`${uid}-glow`} x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="2.4" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* State Polygons */}
        <g>
          {INDIA_STATES.map((s) => {
            const lit = litState === s.id;
            const supplied = ACTIVE_STATE_IDS.has(s.id);
            return (
              <path
                key={s.id}
                d={s.d}
                fill={lit ? "#3A2317" : supplied ? "#241A19" : "#161219"}
                stroke={
                  lit
                    ? "rgba(242,160,61,.65)"
                    : supplied
                    ? "rgba(242,160,61,.28)"
                    : "rgba(243,235,224,.085)"
                }
                strokeWidth={0.6}
                vectorEffect="non-scaling-stroke"
                style={{ transition: "fill .3s ease, stroke .3s ease" }}
              >
                <title>{s.name}</title>
              </path>
            );
          })}
        </g>

        {/* Small Island Markers */}
        <g>
          {ISLET_MARKERS.map(([x, y], i) => (
            <circle key={i} cx={x} cy={y} r={1.6} fill="rgba(243,235,224,.22)" />
          ))}
        </g>

        {/* National Boundary Line */}
        <path
          ref={nationRef}
          d={NATION_PATH}
          fill="none"
          stroke="rgba(243,235,224,.30)"
          strokeWidth={1.1}
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
        />

        {/* Weft Threads and Animated Shuttles */}
        <g>
          {routes.map((r, i) => {
            const on = active === r.node.id;
            return (
              <g key={r.node.id}>
                <path d={r.d} fill="none" stroke="rgba(243,235,224,.08)" strokeWidth={0.75} strokeDasharray="2 5" />
                <path
                  id={`${uid}-thread-${r.node.id}`}
                  ref={(el) => {
                    threadRefs.current[r.node.id] = el;
                  }}
                  d={r.d}
                  fill="none"
                  stroke={`url(#${uid}-weft)`}
                  strokeWidth={on ? 3 : 1.35}
                  strokeLinecap="round"
                  opacity={on ? 1 : 0.75}
                  filter={`url(#${uid}-glow)`}
                  style={{ transition: "stroke-width .25s ease, opacity .25s ease" }}
                />
                {!reduced && visible && (
                  <circle r={2.2} fill="#FFD9A0" opacity={0}>
                    <animateMotion
                      dur={`${3.2 + (i % 4) * 0.4}s`}
                      begin={`${1.8 + i * 0.18}s`}
                      repeatCount="indefinite"
                      calcMode="spline"
                      keyPoints="0;1"
                      keyTimes="0;1"
                      keySplines=".45 0 .55 1"
                    >
                      <mpath href={`#${uid}-thread-${r.node.id}`} />
                    </animateMotion>
                    <animate
                      attributeName="opacity"
                      values="0;1;1;0"
                      dur={`${3.2 + (i % 4) * 0.4}s`}
                      begin={`${1.8 + i * 0.18}s`}
                      repeatCount="indefinite"
                    />
                  </circle>
                )}
              </g>
            );
          })}
        </g>

        {/* Origin Node (Surat) */}
        <NodeMark
          pt={originPt}
          node={origin}
          isOrigin
          active={active === origin.id}
          animate={!reduced && visible}
          onEnter={() => setActive(origin.id)}
          onLeave={() => setActive(null)}
        />

        {/* Destination Nodes */}
        {routes.map((r) => (
          <NodeMark
            key={r.node.id}
            pt={r.pt}
            node={r.node}
            active={active === r.node.id}
            animate={!reduced && visible}
            onEnter={() => setActive(r.node.id)}
            onLeave={() => setActive(null)}
          />
        ))}
      </svg>
    </div>
  );
}

function NodeMark({
  pt,
  node,
  isOrigin = false,
  active,
  animate,
  onEnter,
  onLeave,
}: {
  pt: [number, number];
  node: ReachNode;
  isOrigin?: boolean;
  active: boolean;
  animate: boolean;
  onEnter: () => void;
  onLeave: () => void;
}) {
  const [x, y] = pt;
  const anchor = node.anchor ?? "start";
  const dx = anchor === "end" ? -10 : 10;
  const dy = node.labelOffsetY ?? 0;
  const mono = "var(--font-mono, ui-monospace, monospace)";

  return (
    <g
      tabIndex={0}
      role="button"
      aria-label={`${node.name}, ${node.region}`}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      onFocus={onEnter}
      onBlur={onLeave}
      style={{ cursor: "pointer", outline: "none" }}
    >
      {isOrigin &&
        animate &&
        [0, 1].map((k) => (
          <circle key={k} cx={x} cy={y} r={5} fill="none" stroke="#E4611A" strokeWidth={1}>
            <animate attributeName="r" values="5;24" dur="3s" begin={`${k * 1.5}s`} repeatCount="indefinite" />
            <animate attributeName="opacity" values=".75;0" dur="3s" begin={`${k * 1.5}s`} repeatCount="indefinite" />
          </circle>
        ))}

      {Math.abs(dy) > 10 && (
        <line
          x1={x + (anchor === "end" ? -4 : 4)}
          y1={y}
          x2={x + dx}
          y2={y + dy}
          stroke="rgba(242,160,61,.4)"
          strokeWidth={0.7}
        />
      )}

      <circle cx={x} cy={y} r={18} fill="transparent" />
      <circle
        cx={x}
        cy={y}
        r={10}
        fill="none"
        stroke="#F2A03D"
        strokeWidth={1}
        opacity={active ? 0.75 : 0}
        style={{ transition: "opacity .25s ease" }}
      />
      <circle
        cx={x}
        cy={y}
        r={isOrigin ? 5.5 : 3.8}
        fill={isOrigin ? "#E4611A" : active ? "#FFD9A0" : "#F2A03D"}
        style={{ transition: "fill .25s ease" }}
      />

      <text
        x={x + dx}
        y={y + dy + 4}
        textAnchor={anchor}
        fill={active || isOrigin ? "#FFD9A0" : "#F3EBE0"}
        style={{
          fontFamily: mono,
          fontSize: 10.5,
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          pointerEvents: "none",
          transition: "fill .25s ease",
        }}
      >
        {node.name}
      </text>
      <text
        x={x + dx}
        y={y + dy + 15}
        textAnchor={anchor}
        fill="#8E8079"
        style={{ fontFamily: mono, fontSize: 8.5, letterSpacing: "0.08em", pointerEvents: "none" }}
      >
        {isOrigin ? "HEAD OFFICE" : node.region.split("·")[0].trim()}
      </text>
    </g>
  );
}
