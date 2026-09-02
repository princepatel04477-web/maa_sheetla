"use client";

/**
 * IndiaReachMap — Maa Sheetla Agency
 * ------------------------------------------------------------------
 * Direct Surat powerloom dispatch network across 70+ verified trade cities:
 * Uttar Pradesh, Bihar, Jharkhand, Delhi NCR, Haryana, Rajasthan,
 * West Bengal, Madhya Pradesh, Punjab, Chhattisgarh, Uttarakhand, J&K, Andhra Pradesh.
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
  stateId: string;
  coords: [number, number];
  hub: string;
  isPrimary?: boolean;
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
  hub: "Surat HQ, Ring Road Market & Looms Floor",
  isPrimary: true,
  anchor: "end",
  labelOffsetY: 16,
};

export const ALL_REACH_NODES: ReachNode[] = [
  // --- PRIMARY HUBS ---
  { id: "delhi", name: "Delhi NCR", region: "Delhi NCR", stateId: "delhi", coords: [77.2090, 28.6139], hub: "Chandni Chowk & Karol Bagh", isPrimary: true, since: 2013, anchor: "end", curve: 0.14, labelOffsetY: -6 },
  { id: "kanpur", name: "Kanpur", region: "Uttar Pradesh", stateId: "uttar-pradesh", coords: [80.3319, 26.4499], hub: "General Ganj & Naughara Market", isPrimary: true, since: 2009, anchor: "start", curve: 0.12, labelOffsetY: -8 },
  { id: "lucknow", name: "Lucknow", region: "Uttar Pradesh", stateId: "uttar-pradesh", coords: [80.9462, 26.8467], hub: "Aminabad & Chowk Bazaar", isPrimary: true, since: 2011, anchor: "start", curve: 0.14, labelOffsetY: -12 },
  { id: "varanasi", name: "Varanasi", region: "Uttar Pradesh", stateId: "uttar-pradesh", coords: [82.9739, 25.3176], hub: "Kunj Gali & Chowk Silk Market", isPrimary: true, since: 2012, anchor: "start", curve: 0.18, labelOffsetY: 2 },
  { id: "patna", name: "Patna", region: "Bihar", stateId: "bihar", coords: [85.1376, 25.5941], hub: "Hathwa Market & Machharhatta", isPrimary: true, since: 2015, anchor: "start", curve: 0.22, labelOffsetY: -6 },
  { id: "gorakhpur", name: "Gorakhpur", region: "Uttar Pradesh", stateId: "uttar-pradesh", coords: [83.3732, 26.7606], hub: "Golghar & Urdu Bazaar", isPrimary: true, since: 2013, anchor: "start", curve: 0.20, labelOffsetY: -14 },
  { id: "jaipur", name: "Jaipur", region: "Rajasthan", stateId: "rajasthan", coords: [75.7873, 26.9124], hub: "Johari & Purohit Ji Ka Katla", isPrimary: true, since: 2014, anchor: "end", curve: 0.09, labelOffsetY: 0 },
  { id: "kolkata", name: "Kolkata", region: "West Bengal", stateId: "west-bengal", coords: [88.3639, 22.5726], hub: "Burrabazar & Howrah AC Market", isPrimary: true, since: 2016, anchor: "start", curve: 0.18, labelOffsetY: 4 },
  { id: "ranchi", name: "Ranchi", region: "Jharkhand", stateId: "jharkhand", coords: [85.3096, 23.3441], hub: "Upper Bazaar & Main Road", isPrimary: true, since: 2016, anchor: "start", curve: 0.11, labelOffsetY: 10 },
  { id: "dhanbad", name: "Dhanbad", region: "Jharkhand", stateId: "jharkhand", coords: [86.4304, 23.7957], hub: "Purana Bazaar & Bank More", isPrimary: true, since: 2018, anchor: "start", curve: 0.16, labelOffsetY: -10 },
  { id: "ludhiana", name: "Ludhiana", region: "Punjab", stateId: "punjab", coords: [75.8573, 30.9010], hub: "Chaura Bazaar & Ghumar Mandi", isPrimary: true, since: 2016, anchor: "end", curve: 0.08, labelOffsetY: -4 },
  { id: "indore", name: "Indore", region: "Madhya Pradesh", stateId: "madhya-pradesh", coords: [75.8577, 22.7196], hub: "MT Cloth Market & Rajwada", isPrimary: true, since: 2013, anchor: "end", curve: -0.06, labelOffsetY: 14 },
  { id: "bhopal", name: "Bhopal", region: "Madhya Pradesh", stateId: "madhya-pradesh", coords: [77.4126, 23.2599], hub: "New Market & Chowk", isPrimary: true, since: 2014, anchor: "start", curve: 0.04, labelOffsetY: 0 },
  { id: "raipur", name: "Raipur", region: "Chhattisgarh", stateId: "chhattisgarh", coords: [81.6296, 21.2514], hub: "Pandri Cloth Market", isPrimary: true, since: 2017, anchor: "start", curve: -0.08, labelOffsetY: 14 },
  { id: "meerut", name: "Meerut", region: "Uttar Pradesh", stateId: "uttar-pradesh", coords: [77.7064, 28.9845], hub: "Abu Lane & Valley Bazaar", isPrimary: true, since: 2013, anchor: "start", curve: 0.12, labelOffsetY: 10 },
  { id: "muzaffarnagar", name: "Muzaffarnagar", region: "Uttar Pradesh", stateId: "uttar-pradesh", coords: [77.7060, 29.4727], hub: "Bhagat Singh Market & Roorkee Rd", isPrimary: true, since: 2015, anchor: "start", curve: 0.19, labelOffsetY: -12 },
  { id: "bareilly", name: "Bareilly", region: "Uttar Pradesh", stateId: "uttar-pradesh", coords: [79.4304, 28.3670], hub: "Kutubkhana & Zari Market", isPrimary: true, since: 2014, anchor: "start", curve: 0.14, labelOffsetY: -6 },
  { id: "allahabad", name: "Allahabad", region: "Uttar Pradesh", stateId: "uttar-pradesh", coords: [81.8463, 25.4358], hub: "Civil Lines & Katra Bazaar", isPrimary: true, since: 2012, anchor: "end", curve: 0.16, labelOffsetY: 6 },
  { id: "muzaffarpur", name: "Muzaffarpur", region: "Bihar", stateId: "bihar", coords: [85.3910, 26.1209], hub: "Sutapatti & Saraiyaganj", isPrimary: true, since: 2016, anchor: "start", curve: 0.24, labelOffsetY: -8 },
  { id: "saharanpur", name: "Saharanpur", region: "Uttar Pradesh", stateId: "uttar-pradesh", coords: [77.5410, 29.9679], hub: "Nehru Market & Court Road", isPrimary: true, since: 2015, anchor: "end", curve: 0.16, labelOffsetY: -10 },
  { id: "jammu", name: "Jammu", region: "Jammu & Kashmir", stateId: "jammu-and-kashmir", coords: [74.8570, 32.7266], hub: "Raghunath Bazaar & City Chowk", isPrimary: true, since: 2017, anchor: "end", curve: 0.05, labelOffsetY: -6 },

  // --- UTTAR PRADESH TRADE CORRIDORS ---
  { id: "akbarpur", name: "Akbarpur", region: "Uttar Pradesh", stateId: "uttar-pradesh", coords: [82.5348, 26.4339], hub: "Ambedkar Nagar Textile Hub", since: 2015 },
  { id: "azamgarh", name: "Azamgarh", region: "Uttar Pradesh", stateId: "uttar-pradesh", coords: [83.1859, 26.0738], hub: "Chowk & Mubarakpur Handloom Belt", since: 2014 },
  { id: "babhnan", name: "Babhnan", region: "Uttar Pradesh", stateId: "uttar-pradesh", coords: [82.4700, 26.9667], hub: "Sugar Belt Cloth Counter", since: 2017 },
  { id: "bhadohi", name: "Bhadohi", region: "Uttar Pradesh", stateId: "uttar-pradesh", coords: [82.5714, 25.3956], hub: "Station Road & Main Bazaar", since: 2013 },
  { id: "bahraich", name: "Bahraich", region: "Uttar Pradesh", stateId: "uttar-pradesh", coords: [81.5977, 27.5705], hub: "Chowk & Ghantaghar Market", since: 2015 },
  { id: "baliya", name: "Ballia", region: "Uttar Pradesh", stateId: "uttar-pradesh", coords: [84.1489, 25.7583], hub: "Chowk Bazaar & Cinema Road", since: 2016 },
  { id: "balrampur", name: "Balrampur", region: "Uttar Pradesh", stateId: "uttar-pradesh", coords: [82.1798, 27.4300], hub: "Veer Vinay Chowk", since: 2016 },
  { id: "barabanki", name: "Barabanki", region: "Uttar Pradesh", stateId: "uttar-pradesh", coords: [81.1895, 26.9272], hub: "Dhanokhar & Zaidpur Weave Belt", since: 2014 },
  { id: "barhalganj", name: "Barhalganj", region: "Uttar Pradesh", stateId: "uttar-pradesh", coords: [83.5042, 26.2825], hub: "Saryu River Trade Counter", since: 2018 },
  { id: "bashkhari", name: "Bashkhari", region: "Uttar Pradesh", stateId: "uttar-pradesh", coords: [82.7212, 26.4719], hub: "Eastern UP Weave Counter", since: 2017 },
  { id: "basti", name: "Basti", region: "Uttar Pradesh", stateId: "uttar-pradesh", coords: [82.7483, 26.7995], hub: "Company Bagh & Gandhi Nagar", since: 2014 },
  { id: "belthara", name: "Belthara Road", region: "Uttar Pradesh", stateId: "uttar-pradesh", coords: [83.8647, 26.1558], hub: "Railway Station Bazaar", since: 2017 },
  { id: "colonelganj", name: "Colonelganj", region: "Uttar Pradesh", stateId: "uttar-pradesh", coords: [81.7000, 27.1333], hub: "Mandi Samiti & Main Market", since: 2016 },
  { id: "dalmau", name: "Dalmau", region: "Uttar Pradesh", stateId: "uttar-pradesh", coords: [81.0333, 26.0667], hub: "Ganga Ghat Wholesale Corridor", since: 2018 },
  { id: "faizabad", name: "Faizabad (Ayodhya)", region: "Uttar Pradesh", stateId: "uttar-pradesh", coords: [82.1409, 26.7730], hub: "Rikabganj & Chowk", since: 2013 },
  { id: "gilaula", name: "Gilaula", region: "Uttar Pradesh", stateId: "uttar-pradesh", coords: [81.9360, 27.6400], hub: "Shravasti Trade Counter", since: 2019 },
  { id: "gonda", name: "Gonda", region: "Uttar Pradesh", stateId: "uttar-pradesh", coords: [81.9619, 27.1306], hub: "Utraula Road & Chowk Bazaar", since: 2014 },
  { id: "gosaiganj", name: "Gosaiganj (Ayodhya)", region: "Uttar Pradesh", stateId: "uttar-pradesh", coords: [82.3789, 26.5778], hub: "Ambedkar Nagar Link Counter", since: 2016 },
  { id: "gosaiganj-lucknow", name: "Gosaiganj (Lucknow)", region: "Uttar Pradesh", stateId: "uttar-pradesh", coords: [81.1219, 26.7719], hub: "Sultanpur Road Trade Hub", since: 2017 },
  { id: "ikauna", name: "Ikauna", region: "Uttar Pradesh", stateId: "uttar-pradesh", coords: [81.9697, 27.5456], hub: "Shravasti Regional Counter", since: 2018 },
  { id: "itiyathok", name: "Itiyathok", region: "Uttar Pradesh", stateId: "uttar-pradesh", coords: [82.0461, 27.2917], hub: "North Gonda Trade Route", since: 2019 },
  { id: "jalalabad", name: "Jalalabad", region: "Uttar Pradesh", stateId: "uttar-pradesh", coords: [79.6644, 27.7275], hub: "Shahjahanpur Sector Counter", since: 2018 },
  { id: "jalalpur", name: "Jalalpur", region: "Uttar Pradesh", stateId: "uttar-pradesh", coords: [82.7417, 26.3156], hub: "Surhurpur Road Cloth Market", since: 2016 },
  { id: "jaunpur", name: "Jaunpur", region: "Uttar Pradesh", stateId: "uttar-pradesh", coords: [82.6837, 25.7464], hub: "Shahi Bridge & Olandganj", since: 2014 },
  { id: "kaptanganj", name: "Kaptanganj", region: "Uttar Pradesh", stateId: "uttar-pradesh", coords: [83.7167, 26.9333], hub: "Kushinagar Sugar Belt Hub", since: 2017 },
  { id: "katra-bazar", name: "Katra Bazar", region: "Uttar Pradesh", stateId: "uttar-pradesh", coords: [81.8167, 27.2000], hub: "Gonda Sector Hub", since: 2018 },
  { id: "khalilabad", name: "Khalilabad", region: "Uttar Pradesh", stateId: "uttar-pradesh", coords: [83.0719, 26.7797], hub: "Bardan & Handloom Market", since: 2014 },
  { id: "lakhimpur-kheri", name: "Lakhimpur Kheri", region: "Uttar Pradesh", stateId: "uttar-pradesh", coords: [80.7777, 27.9481], hub: "Main Market & Station Road", since: 2015 },
  { id: "meerganj", name: "Meerganj", region: "Uttar Pradesh", stateId: "uttar-pradesh", coords: [79.2167, 28.5500], hub: "Bareilly Regional Route", since: 2018 },
  { id: "mohammadabad", name: "Mohammadabad", region: "Uttar Pradesh", stateId: "uttar-pradesh", coords: [83.7539, 25.6178], hub: "Ghazipur Trade Sector", since: 2017 },
  { id: "nanpara", name: "Nanpara", region: "Uttar Pradesh", stateId: "uttar-pradesh", coords: [81.5000, 27.8667], hub: "Bahraich Border Counter", since: 2018 },
  { id: "nawabganj", name: "Nawabganj", region: "Uttar Pradesh", stateId: "uttar-pradesh", coords: [79.6333, 28.5333], hub: "Bareilly Sector Counter", since: 2017 },
  { id: "paraspur", name: "Paraspur", region: "Uttar Pradesh", stateId: "uttar-pradesh", coords: [81.8000, 27.0500], hub: "Gonda South Counter", since: 2018 },
  { id: "phoolpur", name: "Phoolpur", region: "Uttar Pradesh", stateId: "uttar-pradesh", coords: [82.0833, 25.5500], hub: "Prayagraj Rural Corridor", since: 2016 },
  { id: "rai-barelly", name: "Rae Bareli", region: "Uttar Pradesh", stateId: "uttar-pradesh", coords: [81.2409, 26.2236], hub: "Super Market & Kachehri Rd", since: 2014 },
  { id: "rudauli", name: "Rudauli", region: "Uttar Pradesh", stateId: "uttar-pradesh", coords: [81.7500, 26.7500], hub: "Ayodhya Highway Counter", since: 2017 },
  { id: "sandila", name: "Sandila", region: "Uttar Pradesh", stateId: "uttar-pradesh", coords: [80.5000, 27.0833], hub: "Hardoi Link Counter", since: 2018 },
  { id: "shahjahanpur", name: "Shahjahanpur", region: "Uttar Pradesh", stateId: "uttar-pradesh", coords: [79.9122, 27.8804], hub: "Bahadurganj & Sadar Bazaar", since: 2015 },
  { id: "sitapur", name: "Sitapur", region: "Uttar Pradesh", stateId: "uttar-pradesh", coords: [80.6833, 27.5667], hub: "Lalbagh & Eye Hospital Road", since: 2015 },
  { id: "sultanpur", name: "Sultanpur", region: "Uttar Pradesh", stateId: "uttar-pradesh", coords: [82.0727, 26.2648], hub: "Chowk & Golaghat Market", since: 2014 },
  { id: "unnao", name: "Unnao", region: "Uttar Pradesh", stateId: "uttar-pradesh", coords: [80.4879, 26.5393], hub: "Chhota Chauraha Market", since: 2014 },
  { id: "uttraula", name: "Utraula", region: "Uttar Pradesh", stateId: "uttar-pradesh", coords: [82.4167, 27.3167], hub: "Balrampur Road Bazaar", since: 2017 },

  // --- BIHAR TRADE CORRIDORS ---
  { id: "arrah", name: "Arrah", region: "Bihar", stateId: "bihar", coords: [84.6637, 25.5541], hub: "Gopali Chowk & Sheoganj", since: 2016 },
  { id: "aurangabad-bihar", name: "Aurangabad", region: "Bihar", stateId: "bihar", coords: [84.3756, 24.7539], hub: "Ramesh Chowk Market", since: 2017 },
  { id: "bagaha", name: "Bagaha", region: "Bihar", stateId: "bihar", coords: [84.0911, 27.0989], hub: "Gandak Trade Counter", since: 2018 },
  { id: "bihar-sharif", name: "Bihar Sharif", region: "Bihar", stateId: "bihar", coords: [85.5186, 25.1982], hub: "Pulpar & Ramchandrapur", since: 2015 },
  { id: "kishanganj", name: "Kishanganj", region: "Bihar", stateId: "bihar", coords: [87.9408, 26.1042], hub: "Churipatti & Gandhi Chowk", since: 2017 },
  { id: "lakhisarai", name: "Lakhisarai", region: "Bihar", stateId: "bihar", coords: [86.0947, 25.1764], hub: "Purani Bazaar Cloth Market", since: 2017 },

  // --- JHARKHAND TRADE CORRIDORS ---
  { id: "daltonganj", name: "Daltonganj", region: "Jharkhand", stateId: "jharkhand", coords: [84.0718, 24.0416], hub: "Shahpur & Main Road Market", since: 2017 },
  { id: "garhwa", name: "Garhwa", region: "Jharkhand", stateId: "jharkhand", coords: [83.8117, 24.1614], hub: "Garhwa Town Market", since: 2018 },
  { id: "deoghar", name: "Deoghar", region: "Jharkhand", stateId: "jharkhand", coords: [86.6947, 24.4854], hub: "Tower Chowk Market", since: 2016 },
  { id: "kirkend-bazar", name: "Kirkend Bazar", region: "Jharkhand", stateId: "jharkhand", coords: [86.3833, 23.7667], hub: "Kendua Dhanbad Corridor", since: 2018 },

  // --- HARYANA & NCR ---
  { id: "gurgaon", name: "Gurgaon", region: "Haryana", stateId: "haryana", coords: [77.0266, 28.4595], hub: "DLF & Sector 14 Wholesale", since: 2015 },
  { id: "panipat", name: "Panipat", region: "Haryana", stateId: "haryana", coords: [76.9635, 29.3909], hub: "GT Road Textile Market", since: 2014 },
  { id: "ambala", name: "Ambala", region: "Haryana", stateId: "haryana", coords: [76.7767, 30.3782], hub: "Cloth Market Ambala City", since: 2015 },

  // --- UTTARAKHAND & SOUTH ---
  { id: "jwalapur", name: "Jwalapur (Haridwar)", region: "Uttarakhand", stateId: "uttarakhand", coords: [78.1256, 29.9328], hub: "Railway Bazaar Jwalapur", since: 2017 },
  { id: "vijaynagaram", name: "Vizianagaram", region: "Andhra Pradesh", stateId: "andhra-pradesh", coords: [83.4163, 18.1067], hub: "Main Road & Balaji Market", since: 2018 },
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
  const [hoveredState, setHoveredState] = useState<string | null>(null);
  const [visible, setVisible] = useState(false);
  const [reduced, setReduced] = useState(false);

  const rootRef = useRef<SVGSVGElement | null>(null);
  const nationRef = useRef<SVGPathElement | null>(null);

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
        return { node: n, pt, d: threadPath(originPt, pt, n.curve ?? 0.12) };
      }),
    [nodes, originPt]
  );

  const activeRoute = useMemo(
    () => routes.find((r) => r.node.id === active) ?? null,
    [routes, active]
  );

  const litState =
    hoveredState ??
    (active === origin.id
      ? origin.stateId
      : activeRoute?.node.stateId ?? null);

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

  const uid = "reach";

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={{ contain: "layout style paint", transform: "translateZ(0)" }}
    >
      <svg
        ref={rootRef}
        viewBox={`0 0 ${VIEW_BOX.w} ${VIEW_BOX.h}`}
        className="block h-auto w-full gpu-layer"
        role="img"
        aria-label="Interactive India Trade Route Network"
      >
        <defs>
          <linearGradient id={`${uid}-weft`} x1="0" y1="1" x2="1" y2="0">
            <stop offset="0%" stopColor="#8B2628" />
            <stop offset="60%" stopColor="#A67C26" />
            <stop offset="100%" stopColor="#C2953B" />
          </linearGradient>
          <filter id={`${uid}-glow`} x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="1.8" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id={`${uid}-card-shadow`} x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#1C1917" floodOpacity="0.15" />
          </filter>
        </defs>

        {/* State Polygons with Distinct High-Contrast Highlighting */}
        <g>
          {INDIA_STATES.map((s) => {
            const isLit = litState === s.id;
            const isSupplied = ACTIVE_STATE_IDS.has(s.id);
            return (
              <path
                key={s.id}
                d={s.d}
                fill={
                  isLit
                    ? "rgba(194,149,59,0.38)"
                    : isSupplied
                    ? "rgba(166,124,38,0.14)"
                    : "rgba(28,25,23,0.03)"
                }
                stroke={
                  isLit
                    ? "#8B2628"
                    : isSupplied
                    ? "rgba(166,124,38,0.65)"
                    : "rgba(28,25,23,0.18)"
                }
                strokeWidth={isLit ? 1.8 : isSupplied ? 0.9 : 0.5}
                strokeLinejoin="round"
                vectorEffect="non-scaling-stroke"
                onMouseEnter={() => isSupplied && setHoveredState(s.id)}
                onMouseLeave={() => setHoveredState(null)}
                style={{
                  cursor: isSupplied ? "pointer" : "default",
                  transition: "fill .25s ease, stroke .25s ease, stroke-width .25s ease",
                }}
              >
                <title>{`${s.name}${isSupplied ? " · Active Trade Corridor" : ""}`}</title>
              </path>
            );
          })}
        </g>

        {/* Small Island Markers */}
        <g>
          {ISLET_MARKERS.map(([x, y], i) => (
            <circle key={i} cx={x} cy={y} r={1.6} fill="rgba(28,25,23,.25)" />
          ))}
        </g>

        {/* National Boundary Line */}
        <path
          ref={nationRef}
          d={NATION_PATH}
          fill="none"
          stroke="rgba(28,25,23,.35)"
          strokeWidth={1.1}
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
        />

        {/* Background Subtle Route Lines */}
        <g>
          {routes.map((r) => {
            const on = active === r.node.id;
            if (on) return null;
            return (
              <path
                key={`bg-mesh-${r.node.id}`}
                d={r.d}
                fill="none"
                stroke="rgba(166,124,38,.14)"
                strokeWidth={r.node.isPrimary ? 0.75 : 0.4}
                strokeDasharray="2 4"
              />
            );
          })}
        </g>

        {/* Active Route Highlight Thread with Motion Shuttle */}
        {activeRoute && (
          <g>
            <path
              d={activeRoute.d}
              fill="none"
              stroke={`url(#${uid}-weft)`}
              strokeWidth={2.8}
              strokeLinecap="round"
              filter={`url(#${uid}-glow)`}
            />
            {!reduced && visible && (
              <circle r={3} fill="#8B2628">
                <animateMotion
                  dur="2.2s"
                  repeatCount="indefinite"
                  calcMode="spline"
                  keyPoints="0;1"
                  keyTimes="0;1"
                  keySplines=".45 0 .55 1"
                  path={activeRoute.d}
                />
              </circle>
            )}
          </g>
        )}

        {/* Secondary Trade Node Dots */}
        <g>
          {routes
            .filter((r) => !r.node.isPrimary)
            .map((r) => {
              const on = active === r.node.id;
              const [x, y] = r.pt;
              return (
                <g
                  key={r.node.id}
                  role="button"
                  tabIndex={0}
                  aria-label={`${r.node.name}, ${r.node.region}`}
                  onMouseEnter={() => setActive(r.node.id)}
                  onMouseLeave={() => setActive(null)}
                  onClick={() => setActive(r.node.id)}
                  style={{ cursor: "pointer" }}
                >
                  <circle cx={x} cy={y} r={26} fill="transparent" />
                  <circle
                    cx={x}
                    cy={y}
                    r={on ? 5.5 : 2.5}
                    fill={on ? "#8B2628" : "#A67C26"}
                    opacity={on ? 1 : 0.75}
                    stroke={on ? "#FFFFFF" : "none"}
                    strokeWidth={on ? 1.5 : 0}
                    style={{ transition: "all .2s ease" }}
                  />
                </g>
              );
            })}
        </g>

        {/* Primary Trade Node Labels */}
        <g>
          {routes
            .filter((r) => r.node.isPrimary)
            .map((r) => (
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
        </g>

        {/* Origin Node (Surat HQ) */}
        <NodeMark
          pt={originPt}
          node={origin}
          isOrigin
          active={active === origin.id}
          animate={!reduced && visible}
          onEnter={() => setActive(origin.id)}
          onLeave={() => setActive(null)}
        />

        {/* Floating Callout Badge for Selected Secondary City */}
        {activeRoute && !activeRoute.node.isPrimary && (
          <ActiveNodeCallout
            pt={activeRoute.pt}
            node={activeRoute.node}
            uid={uid}
          />
        )}
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
          <circle key={k} cx={x} cy={y} r={5} fill="none" stroke="#8B2628" strokeWidth={1}>
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
          stroke="rgba(166,124,38,.5)"
          strokeWidth={0.8}
        />
      )}

      <circle cx={x} cy={y} r={30} fill="transparent" />
      <circle
        cx={x}
        cy={y}
        r={10}
        fill="none"
        stroke="#A67C26"
        strokeWidth={1}
        opacity={active ? 0.75 : 0}
        style={{ transition: "opacity .25s ease" }}
      />
      <circle
        cx={x}
        cy={y}
        r={isOrigin ? 5.5 : 3.8}
        fill={isOrigin ? "#8B2628" : active ? "#8B2628" : "#A67C26"}
        style={{ transition: "fill .25s ease" }}
      />

      <text
        x={x + dx}
        y={y + dy + 3}
        textAnchor={anchor}
        fill={active || isOrigin ? "#8B2628" : "#1C1917"}
        style={{
          fontFamily: mono,
          fontSize: 10,
          fontWeight: active || isOrigin ? 600 : 500,
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          pointerEvents: "none",
          transition: "fill .25s ease",
        }}
      >
        {node.name}
      </text>
    </g>
  );
}

function ActiveNodeCallout({
  pt,
  node,
  uid,
}: {
  pt: [number, number];
  node: ReachNode;
  uid: string;
}) {
  const [x, y] = pt;
  const mono = "var(--font-mono, ui-monospace, monospace)";
  const cardW = 150;
  const cardH = 38;
  const cardX = Math.min(Math.max(x - cardW / 2, 20), VIEW_BOX.w - cardW - 20);
  const cardY = y - cardH - 10;

  return (
    <g style={{ pointerEvents: "none" }}>
      <line
        x1={x}
        y1={y}
        x2={cardX + cardW / 2}
        y2={cardY + cardH}
        stroke="#8B2628"
        strokeWidth={1}
        strokeDasharray="2 2"
      />
      <circle cx={x} cy={y} r={6} fill="none" stroke="#8B2628" strokeWidth={1.5} />
      <circle cx={x} cy={y} r={3} fill="#8B2628" />

      <rect
        x={cardX}
        y={cardY}
        width={cardW}
        height={cardH}
        rx={3}
        fill="#FFFFFF"
        stroke="#A67C26"
        strokeWidth={1}
        filter={`url(#${uid}-card-shadow)`}
      />
      <text
        x={cardX + 10}
        y={cardY + 16}
        fill="#1C1917"
        style={{ fontFamily: mono, fontSize: 10.5, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em" }}
      >
        {node.name}
      </text>
      <text
        x={cardX + 10}
        y={cardY + 28}
        fill="#8B2628"
        style={{ fontFamily: mono, fontSize: 8, fontWeight: 500 }}
      >
        {node.hub.length > 25 ? node.hub.slice(0, 25) + "..." : node.hub}
      </text>
    </g>
  );
}
