"use client";

import { useState, useEffect, useRef, type ReactNode, type RefObject } from "react";

const C = {
  navy0: "#03070f",navy1: "#060d1f",navy2: "#080f22",navy3: "#0a1628",navy4: "#0d1f3c",
  blue: "#3b82f6",blueL: "#60a5fa",blueXL: "#93c5fd",
  white: "#ffffff",muted: "rgba(255,255,255,0.45)",faint: "rgba(255,255,255,0.04)",
};

const SERVICES = [
  { num:"01",emoji:"🎨",title:"Graphic Design",desc:"From logos to full brand identities — stunning visuals that capture attention and communicate your story with clarity and power.",tags:["Logo Design","Illustrations","Social Media","Infographics"] },
  { num:"02",emoji:"💻",title:"Web Design & Dev",desc:"Responsive, fast, and visually stunning websites built with React & Next.js that connect deeply with your audience across all devices.",tags:["UI/UX Design","Frontend Dev","Backend Dev","E-Commerce","CMS"] },
  { num:"03",emoji:"🚀",title:"Brand Strategy",desc:"Build a strong brand foundation with strategic positioning, cohesive design systems, and consistent messaging that resonates and endures.",tags:["Brand Identity","Style Guides","Positioning","Naming"] },
  { num:"04",emoji:"🖨️",title:"Print & Packaging",desc:"Elevating brands through thoughtful prints and purposeful packaging — turning design stories into beautiful, tangible print realities.",tags:["Business Cards","Posters","Wedding Cards","Packaging","Brochures"] },
];

const PROJECTS = [
  { img:"/images/project1.png",cat:"Branding",catIcon:"🎨",title:"LEON BRAND CO.",desc:"Modern logo and full visual identity for a premium lifestyle brand." },
  { img:"/images/project2.png",cat:"Web Design/Dev",catIcon:"🖥️",title:"DEVs / FIGMA UI KIT",desc:"Responsive web design & dev for a creative tech startup." },
  { img:"/images/project3.png",cat:"UI/UX",catIcon:"🌐",title:"E-COMMERCE DESIGNS/DEV",desc:"End-to-end e-commerce design, frontend & backend build." },
  { img:"/images/project4.jpg",cat:"Print",catIcon:"🖨️",title:"LEON PACKAGING",desc:"Premium packaging design — business cards, brochures, banners." },
  { img:"/images/project5.jpg",cat:"Social Media",catIcon:"📱",title:"SOCIALS' CAMPAIGN",desc:"Vibrant advertising poster series for social media launch." },
  { img:"/images/project6.jpg",cat:"Brand Strategy",catIcon:"🚀",title:"LEON REBRAND",desc:"Full rebrand with positioning strategy and new visual identity." },
];

const PROCESS = [
  { num:"01",title:"Discover",desc:"Deep dive into your brand, goals, audience, and competitive landscape." },
  { num:"02",title:"Strategise",desc:"Build a creative direction and strategic framework that guides every decision." },
  { num:"03",title:"Design/Dev",desc:"Craft exceptional visuals that bring the strategy to life with precision and flair." },
  { num:"04",title:"Deliver",desc:"Refined, production-ready files with full support and zero-compromise quality." },
];

const VALUES = [
  { sym:"✦",title:"Precision",desc:"Every pixel, every letter, every choice made with intention and craft." },
  { sym:"◈",title:"Creativity",desc:"Original thinking that transforms ordinary briefs into extraordinary outcomes." },
  { sym:"◎",title:"Impact",desc:"Design/Dev that doesn't just look good — it works hard for your business." },
];

const SKILLS = [
  { label:"Graphic Design",pct:95 },
  { label:"Web Design & Dev",pct:90 },
  { label:"Brand Identity",pct:92 },
  { label:"Print & Packaging",pct:88 },
];

const BUDGET_OPTIONS = ["Under KES 1,000","KES 1,000 – 10,000","KES 10,000 – 20,000","KES 20,000 – 50,000","KES 50,000 – 100,000","KES 100,000+","Let's discuss"];

const SOCIALS = [
  { label:"FB",href:"https://facebook.com" },{ label:"IG",href:"https://instagram.com" },
  { label:"X",href:"https://twitter.com" },{ label:"IN",href:"https://linkedin.com" },
  { label:"BE",href:"https://behance.net" },{ label:"DR",href:"https://dribbble.com" },
];

const NAV = ["Home","About","Services","Portfolio","Contact"];

// FIX: typed form state interface
interface FormState {
  name: string;
  email: string;
  services: string[];
  budget: string;
  message: string;
}

function useInView(t = 0.12): [RefObject<HTMLElement | null>, boolean] {
  const r = useRef<HTMLElement>(null);
  const [v, setV] = useState(false);
  useEffect(() => {
    const o = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setV(true);
    }, { threshold: t });
    if (r.current) o.observe(r.current);
    return () => o.disconnect();
  }, [t]);
  return [r, v];
}

function useMouse() {
  const [p, setP] = useState({ x: 0, y: 0 });
  useEffect(() => {
    // FIX: typed MouseEvent parameter
    const f = (e: MouseEvent) => setP({ x: (e.clientX / window.innerWidth - .5) * 30, y: (e.clientY / window.innerHeight - .5) * 30 });
    window.addEventListener("mousemove", f);
    return () => window.removeEventListener("mousemove", f);
  }, []);
  return p;
}


const LOGO_PNG = "/images/LEON-logo.png"; // ← replace with your actual image path or base64

function Logo({ size = 44, spin = false, src = LOGO_PNG }) {
  const [failed, setFailed] = useState(false);

  if (!failed && src) {
    return (
      <img
        src={src}
        alt="LEON logo"
        width={size}
        height={size}
        onError={() => setFailed(true)}
        style={{
          width: size,
          height: size,
          objectFit: "contain",
          ...(spin ? { animation: "leon-spin 18s linear infinite" } : {}),
        }}
      />
    );
  }

  // Fallback SVG
  return (
    <svg width={size} height={size} viewBox="0 0 200 200" fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={spin ? { animation: "leon-spin 18s linear infinite" } : {}}>
      <defs>
        <linearGradient id="lg-main" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#b8d4e8"/>
          <stop offset="40%" stopColor="#7ab0cc"/>
          <stop offset="100%" stopColor="#3a6a8a"/>
        </linearGradient>
        <linearGradient id="lg-dark" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#4a7a9a"/>
          <stop offset="100%" stopColor="#1a3a50"/>
        </linearGradient>
        <linearGradient id="lg-mid" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#8ab8d0"/>
          <stop offset="100%" stopColor="#2a5a78"/>
        </linearGradient>
      </defs>
      <polygon points="100,28 148,80 100,172 52,80" fill="url(#lg-main)" opacity="0.92"/>
      <polygon points="100,28 52,80 100,118" fill="url(#lg-dark)" opacity="0.88"/>
      <polygon points="100,28 148,80 100,118" fill="url(#lg-mid)" opacity="0.78"/>
      <polygon points="100,58 124,88 100,110 76,88" fill="url(#lg-main)" opacity="0.7"/>
      <polygon points="100,58 76,88 100,96" fill="url(#lg-dark)" opacity="0.9"/>
      <polygon points="100,58 124,88 100,96" fill="url(#lg-mid)" opacity="0.75"/>
      <polygon points="100,130 120,108 100,172 80,108" fill="url(#lg-dark)" opacity="0.65"/>
    </svg>
  );
}

// FIX: typed children prop
function SLabel({ children }: { children: ReactNode }) {
  return <div style={{ color: C.blue, fontSize: 10, letterSpacing: "0.38em", fontWeight: 700, marginBottom: 14 }}>✦ {children}</div>;
}

// FIX: typed Navbar props
function Navbar({ active, go }: { active: string; go: (section: string) => void }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const f = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", f);
    return () => window.removeEventListener("scroll", f);
  }, []);
  return (
    <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 200, background: scrolled ? "rgba(3,7,15,0.96)" : "transparent", backdropFilter: scrolled ? "blur(16px)" : "none", borderBottom: scrolled ? `1px solid rgba(59,130,246,0.12)` : "none", transition: "all 0.45s ease", padding: "0 5%" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: 70 }}>
        <button onClick={() => go("Home")} style={{ background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 11, padding: 0 }}>
          <Logo size={38} />
          <div style={{ textAlign: "left" }}>
            <div style={{ color: C.white, fontWeight: 900, fontSize: 17, letterSpacing: "0.14em", lineHeight: 1 }}>LEON</div>
            <div style={{ color: C.blue, fontSize: 8, letterSpacing: "0.18em", lineHeight: 1.4, marginTop: 1 }}>GRAPHICS DESIGN &amp; BRANDING</div>
          </div>
        </button>
        <div style={{ display: "flex", alignItems: "center", gap: 30 }}>
          {NAV.map(n => (
            <button key={n} onClick={() => go(n)} style={{ background: "none", border: "none", cursor: "pointer", padding: "2px 0", color: active === n ? C.blue : "rgba(255,255,255,0.65)", fontSize: 10.5, letterSpacing: "0.2em", fontWeight: 700, borderBottom: active === n ? `1px solid ${C.blue}` : "1px solid transparent", transition: "all 0.2s" }}>{n.toUpperCase()}</button>
          ))}
          <button onClick={() => go("Contact")} style={{ background: C.blue, border: "none", color: C.white, padding: "9px 22px", fontSize: 10, letterSpacing: "0.22em", fontWeight: 800, cursor: "pointer", clipPath: "polygon(10px 0%,100% 0%,calc(100% - 10px) 100%,0% 100%)" }}>GET A QUOTE</button>
        </div>
      </div>
    </nav>
  );
}

// FIX: typed Hero props
function Hero({ go }: { go: (section: string) => void }) {
  const [inn, setInn] = useState(false);
  const mouse = useMouse();
  useEffect(() => { setTimeout(() => setInn(true), 80); }, []);
  const fu = (d: number, x: React.CSSProperties = {}): React.CSSProperties => ({ opacity: inn ? 1 : 0, transform: inn ? "translateY(0)" : "translateY(28px)", transition: `opacity 0.85s ease ${d}s,transform 0.85s ease ${d}s`, ...x });
  return (
    <section style={{ minHeight: "100vh", display: "flex", alignItems: "center", background: `linear-gradient(150deg,${C.navy0} 0%,${C.navy1} 55%,${C.navy4} 100%)`, position: "relative", overflow: "hidden", padding: "0 5%" }}>
      <div style={{ position: "absolute", inset: 0, opacity: 0.055, backgroundImage: `linear-gradient(rgba(59,130,246,.6) 1px,transparent 1px),linear-gradient(90deg,rgba(59,130,246,.6) 1px,transparent 1px)`, backgroundSize: "64px 64px", transform: `translate(${mouse.x * .25}px,${mouse.y * .25}px)`, transition: "transform 0.12s linear" }} />
      <div style={{ position: "absolute", top: "42%", left: "45%", transform: "translate(-50%,-50%)", width: 680, height: 680, borderRadius: "50%", background: `radial-gradient(circle,rgba(59,130,246,.1) 0%,transparent 68%)`, pointerEvents: "none" }} />
      {[...Array(5)].map((_, i) => (
        <div key={i} style={{ position: "absolute", top: `${8 + i * 18}%`, left: `${2 + i * 20}%`, opacity: 0.04 + i * .007, animation: `floatX-${i % 3} ${5 + i * 1.4}s ease-in-out infinite`, transform: `rotate(${i * 36}deg)`, pointerEvents: "none" }}>
          <Logo size={50 + i * 28} />
        </div>
      ))}
      <div style={{ position: "relative", zIndex: 2, maxWidth: 780, transform: `translate(${-mouse.x * .04}px,${-mouse.y * .04}px)`, transition: "transform 0.18s ease" }}>
        <div style={{ ...fu(0.1), display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(59,130,246,.1)", border: `1px solid rgba(59,130,246,.3)`, padding: "7px 18px", marginBottom: 30, clipPath: "polygon(10px 0%,100% 0%,calc(100% - 10px) 100%,0% 100%)" }}>
          <span style={{ color: C.blue, fontSize: 9.5, letterSpacing: "0.28em", fontWeight: 700 }}>✦ NAIROBI, KENYA · EST. 2024</span>
        </div>
        <div style={fu(0.2)}>
          <h1 style={{ margin: 0, fontWeight: 900, letterSpacing: "-0.02em", lineHeight: 1.02 }}>
            <span style={{ display: "block", fontSize: "clamp(54px,7.5vw,96px)", color: C.white }}>Creative</span>
            <span style={{ display: "block", fontSize: "clamp(54px,7.5vw,96px)", color: C.white }}><em style={{ fontStyle: "normal", color: C.blue }}>by</em> design.</span>
            <span style={{ display: "block", fontSize: "clamp(22px,3vw,40px)", color: "rgba(255,255,255,.6)", fontWeight: 400, letterSpacing: "0.18em", marginTop: 10 }}>Iconic by nature.</span>
          </h1>
        </div>
        <p style={{ ...fu(0.38), color: C.muted, fontSize: 15, lineHeight: 1.85, maxWidth: 540, marginTop: 26, letterSpacing: "0.03em" }}>
          Transforming visions into visual masterpieces — branding, web design, development &amp; beyond. Crafting seamless experiences that connect brands with their audience.
        </p>
        <div style={{ ...fu(0.52), display: "flex", gap: 16, marginTop: 42, flexWrap: "wrap" }}>
          <button onClick={() => go("Portfolio")} style={{ background: C.blue, color: C.white, border: "none", padding: "15px 34px", fontSize: 11, letterSpacing: "0.22em", fontWeight: 800, cursor: "pointer", clipPath: "polygon(12px 0%,100% 0%,calc(100% - 12px) 100%,0% 100%)" }}>VIEW PORTFOLIO</button>
          <button onClick={() => go("Contact")} style={{ background: "transparent", color: C.white, border: "1px solid rgba(255,255,255,.22)", padding: "15px 34px", fontSize: 11, letterSpacing: "0.22em", fontWeight: 700, cursor: "pointer", clipPath: "polygon(12px 0%,100% 0%,calc(100% - 12px) 100%,0% 100%)" }}>GET IN TOUCH</button>
        </div>
        <div style={{ ...fu(0.68), display: "flex", gap: 48, marginTop: 60, flexWrap: "wrap" }}>
          {[["25+", "Projects Delivered"], ["20+", "Happy Clients"], ["2+", "Years Experience"]].map(([n, l]) => (
            <div key={l}>
              <div style={{ color: C.blue, fontSize: 30, fontWeight: 900, letterSpacing: "-0.02em", lineHeight: 1 }}>{n}</div>
              <div style={{ color: "rgba(255,255,255,.35)", fontSize: 9, letterSpacing: "0.2em", marginTop: 4 }}>{l.toUpperCase()}</div>
            </div>
          ))}
        </div>
      </div>
      <div style={{ position: "absolute", right: "3%", top: "50%", transform: "translateY(-50%)", opacity: inn ? 0.11 : 0, transition: "opacity 1.3s ease 0.6s", animation: "leon-spin 22s linear infinite", pointerEvents: "none" }}>
        <Logo size={420} />
      </div>
      <div style={{ position: "absolute", bottom: 30, right: "5%", display: "flex", flexDirection: "column", alignItems: "center", gap: 6, ...fu(1.1) }}>
        <div style={{ width: 1, height: 48, background: `linear-gradient(${C.blue},transparent)` }} />
        <span style={{ color: "rgba(255,255,255,.2)", fontSize: 9, letterSpacing: "0.25em", writingMode: "vertical-rl" }}>SCROLL</span>
      </div>
    </section>
  );
}

function About() {
  // FIX: cast ref from useInView to HTMLElement for section
  const [ref, v] = useInView();
  return (
    <section ref={ref as RefObject<HTMLElement>} id="about" style={{ background: C.navy2, padding: "110px 5%", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", right: -80, top: "50%", transform: "translateY(-50%)", width: 480, height: 480, borderRadius: "50%", background: `radial-gradient(circle,rgba(59,130,246,.06) 0%,transparent 68%)`, pointerEvents: "none" }} />
      <div style={{ maxWidth: 1120, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }}>
        <div style={{ opacity: v ? 1 : 0, transform: v ? "translateX(0)" : "translateX(-44px)", transition: "all 0.95s ease" }}>
          <SLabel>OUR STORY</SLabel>
          <h2 style={{ color: C.white, fontSize: "clamp(34px,4vw,54px)", fontWeight: 900, margin: "0 0 8px", lineHeight: 1.08 }}>
            The <em style={{ fontStyle: "normal", color: C.blue }}>Creative</em> Force<br />Behind LEON
          </h2>
          <div style={{ width: 52, height: 2, background: C.blue, marginBottom: 28 }} />
          <p style={{ color: C.muted, lineHeight: 1.92, fontSize: 13.5, letterSpacing: "0.025em", marginBottom: 16 }}>
            At LEON Graphics Design &amp; Branding, every project starts with a deep understanding of your story. Great design/dev is more than aesthetics — it's a bridge between your brand and the people you serve.
          </p>
          <p style={{ color: C.muted, lineHeight: 1.92, fontSize: 13.5, letterSpacing: "0.025em" }}>
            Blending creativity and technology to bring brands to life — with a passion for visual excellence and innovation. Est. 2024, Nairobi.
          </p>
          <div style={{ marginTop: 36, display: "flex", flexDirection: "column", gap: 18 }}>
            {SKILLS.map((s, i) => (
              <div key={s.label} style={{ opacity: v ? 1 : 0, transition: `opacity 0.5s ease ${0.15 + i * .1}s` }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                  <span style={{ color: "rgba(255,255,255,.65)", fontSize: 11, letterSpacing: "0.15em" }}>{s.label.toUpperCase()}</span>
                  <span style={{ color: C.blue, fontSize: 11, fontWeight: 700 }}>{s.pct}%</span>
                </div>
                <div style={{ height: 2, background: "rgba(255,255,255,.07)", position: "relative" }}>
                  <div style={{ position: "absolute", top: 0, left: 0, height: "100%", width: v ? `${s.pct}%` : "0%", background: `linear-gradient(90deg,${C.blue},${C.blueXL})`, transition: `width 1.2s ease ${0.4 + i * .12}s` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div style={{ opacity: v ? 1 : 0, transform: v ? "translateX(0)" : "translateX(44px)", transition: "all 0.95s ease 0.2s" }}>
          <div style={{ position: "relative" }}>
            <div style={{ width: "100%", aspectRatio: "1", maxWidth: 440, margin: "0 auto", background: `linear-gradient(135deg,rgba(59,130,246,.14),rgba(8,15,34,.9))`, border: `1px solid rgba(59,130,246,.18)`, display: "flex", alignItems: "center", justifyContent: "center", position: "relative", overflow: "hidden" }}>
              {/* FIX: cast e.target to HTMLImageElement for .style and .parentNode access */}
              <img src="/images/logon.png" alt="LEON Design Studio" style={{ width: "72%", objectFit: "contain", opacity: 0.92 }}
                onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
              <div style={{ position: "absolute", inset: 0, backgroundImage: "repeating-linear-gradient(45deg,rgba(59,130,246,.03) 0px,rgba(59,130,246,.03) 1px,transparent 1px,transparent 22px)" }} />
            </div>
            <div style={{ position: "absolute", bottom: -18, right: -18, background: C.blue, padding: "18px 26px", zIndex: 2 }}>
              <div style={{ color: C.white, fontSize: 26, fontWeight: 900, lineHeight: 1 }}>2+</div>
              <div style={{ color: "rgba(255,255,255,.7)", fontSize: 8.5, letterSpacing: "0.22em" }}>YEARS EXP.</div>
            </div>
            <div style={{ position: "absolute", top: -18, left: -18, background: C.navy0, border: `1px solid rgba(59,130,246,.25)`, padding: "14px 20px", zIndex: 2 }}>
              <div style={{ color: C.blue, fontSize: 20, fontWeight: 900, lineHeight: 1 }}>25+</div>
              <div style={{ color: "rgba(255,255,255,.5)", fontSize: 8, letterSpacing: "0.2em" }}>PROJECTS</div>
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12, marginTop: 36 }}>
            {VALUES.map((val, i) => (
              <div key={val.title} style={{ background: C.faint, border: `1px solid rgba(59,130,246,.1)`, padding: "20px 16px", textAlign: "center", opacity: v ? 1 : 0, transition: `opacity 0.5s ease ${0.5 + i * .1}s` }}>
                <div style={{ fontSize: 20, marginBottom: 8, color: C.blue }}>{val.sym}</div>
                <div style={{ color: C.white, fontSize: 10.5, fontWeight: 800, letterSpacing: "0.12em" }}>{val.title.toUpperCase()}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div style={{ maxWidth: 1120, margin: "72px auto 0", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
        {[
          { num: "01", title: "Our Mission", body: "To deliver stunning, high-quality designs/devs that connect brands with their audience — ensuring every project reflects creativity, strategy, and excellence." },
          { num: "02", title: "Our Vision", body: "To become a leading creative hub that transforms businesses through powerful design, innovation, and digital experiences that endure." },
        ].map((card, i) => (
          <div key={card.title} style={{ background: C.faint, border: `1px solid rgba(59,130,246,.1)`, padding: "36px 32px", opacity: v ? 1 : 0, transform: v ? "translateY(0)" : "translateY(30px)", transition: `all 0.7s ease ${0.6 + i * .12}s`, position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg,transparent,${C.blue},transparent)` }} />
            <div style={{ color: "rgba(59,130,246,.12)", fontSize: 72, fontWeight: 900, lineHeight: 1, position: "absolute", bottom: 12, right: 20 }}>{card.num}</div>
            <div style={{ color: C.blue, fontSize: 9, letterSpacing: "0.3em", marginBottom: 10 }}>{card.num}</div>
            <h3 style={{ color: C.white, fontSize: 20, fontWeight: 800, margin: "0 0 14px" }}>{card.title}</h3>
            <p style={{ color: C.muted, fontSize: 13.5, lineHeight: 1.85, margin: 0 }}>{card.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

// FIX: typed Services props
function Services({ go }: { go: (section: string) => void }) {
  const [ref, v] = useInView();
  return (
    <section ref={ref as RefObject<HTMLElement>} id="services" style={{ background: C.navy1, padding: "110px 5%" }}>
      <div style={{ maxWidth: 1120, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 72 }}>
          <SLabel>WHAT WE DO</SLabel>
          <h2 style={{ color: C.white, fontSize: "clamp(34px,4vw,54px)", fontWeight: 900, margin: "0 0 16px" }}>Creative <em style={{ fontStyle: "normal", color: C.blue }}>Services</em> Built to Elevate</h2>
          <p style={{ color: C.muted, fontSize: 14, maxWidth: 540, margin: "0 auto", lineHeight: 1.8 }}>We combine design expertise with strategy and technology to craft powerful visual identities and digital experiences.</p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))", gap: 24 }}>
          {SERVICES.map((s, i) => (
            <div key={s.title} style={{ background: "rgba(255,255,255,.022)", border: `1px solid rgba(59,130,246,.1)`, padding: "44px 30px", position: "relative", overflow: "hidden", opacity: v ? 1 : 0, transform: v ? "translateY(0)" : "translateY(40px)", transition: `all 0.7s ease ${i * .11}s` }}>
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg,transparent,${C.blue},transparent)` }} />
              <div style={{ color: "rgba(59,130,246,.1)", fontSize: 76, fontWeight: 900, lineHeight: 1, position: "absolute", bottom: 10, right: 14 }}>{s.num}</div>
              <div style={{ fontSize: 34, marginBottom: 22 }}>{s.emoji}</div>
              <h3 style={{ color: C.white, fontSize: 18, fontWeight: 800, margin: "0 0 14px", letterSpacing: "0.04em" }}>{s.title}</h3>
              <p style={{ color: C.muted, fontSize: 13, lineHeight: 1.85, margin: "0 0 20px" }}>{s.desc}</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                {s.tags.map(t => (
                  <span key={t} style={{ background: "rgba(59,130,246,.09)", border: `1px solid rgba(59,130,246,.2)`, color: C.blueXL, fontSize: 9, padding: "4px 10px", letterSpacing: "0.14em" }}>{t}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 88 }}>
          <h3 style={{ color: C.white, fontSize: 12, fontWeight: 800, textAlign: "center", letterSpacing: "0.3em", marginBottom: 56 }}>OUR PROCESS</h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 0, position: "relative" }}>
            <div style={{ position: "absolute", top: 27, left: "12%", right: "12%", height: 1, background: `linear-gradient(90deg,transparent,rgba(59,130,246,.3),rgba(59,130,246,.3),transparent)` }} />
            {PROCESS.map((p, i) => (
              <div key={p.title} style={{ textAlign: "center", padding: "0 20px", opacity: v ? 1 : 0, transition: `opacity 0.6s ease ${0.5 + i * .12}s` }}>
                <div style={{ width: 54, height: 54, borderRadius: "50%", background: `linear-gradient(135deg,rgba(59,130,246,.15),rgba(59,130,246,.04))`, border: `1px solid rgba(59,130,246,.35)`, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px", color: C.blue, fontSize: 12, fontWeight: 800, letterSpacing: "0.1em" }}>{p.num}</div>
                <div style={{ color: C.white, fontSize: 13, fontWeight: 700, marginBottom: 10, letterSpacing: "0.08em" }}>{p.title}</div>
                <p style={{ color: C.muted, fontSize: 12, lineHeight: 1.75, margin: 0 }}>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
        <div style={{ marginTop: 72, background: `linear-gradient(135deg,rgba(59,130,246,.12),rgba(59,130,246,.03))`, border: `1px solid rgba(59,130,246,.2)`, padding: "48px 40px", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 24, opacity: v ? 1 : 0, transition: "opacity 0.7s ease 0.8s" }}>
          <div>
            <div style={{ color: C.white, fontSize: 22, fontWeight: 800, marginBottom: 8 }}>READY TO START YOUR PROJECT?</div>
            <p style={{ color: C.muted, fontSize: 13.5, margin: 0 }}>Every great brand begins with a conversation. Tell us about your vision — no obligation, just ideas.</p>
          </div>
          <button onClick={() => go("Contact")} style={{ background: C.blue, color: C.white, border: "none", padding: "14px 32px", fontSize: 11, letterSpacing: "0.22em", fontWeight: 800, cursor: "pointer", clipPath: "polygon(10px 0%,100% 0%,calc(100% - 10px) 100%,0% 100%)", whiteSpace: "nowrap" }}>GET A FREE QUOTE</button>
        </div>
      </div>
    </section>
  );
}

// FIX: typed Portfolio props
function Portfolio({ go }: { go: (section: string) => void }) {
  const [ref, v] = useInView();
  const [filter, setFilter] = useState("All Work");
  // FIX: typed hover state as number | null
  const [hov, setHov] = useState<number | null>(null);
  const filtered = filter === "All Work" ? PROJECTS : PROJECTS.filter(p => p.cat === filter || p.cat.toLowerCase().includes(filter.toLowerCase().split(" ")[0]));
  return (
    <section ref={ref as RefObject<HTMLElement>} id="portfolio" style={{ background: C.navy2, padding: "110px 5%" }}>
      <div style={{ maxWidth: 1120, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <SLabel>SELECTED WORKS</SLabel>
          <h2 style={{ color: C.white, fontSize: "clamp(34px,4vw,54px)", fontWeight: 900, margin: "0 0 16px" }}>Creative <em style={{ fontStyle: "normal", color: C.blue }}>Works</em> That Speak</h2>
          <p style={{ color: C.muted, fontSize: 14, maxWidth: 520, margin: "0 auto", lineHeight: 1.8 }}>Explore completed projects showcasing creativity, detail, and craftsmanship in every design/dev.</p>
        </div>
        <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap", marginBottom: 48 }}>
          {["All Work", "Branding", "Web Design/Dev", "Print", "Social Media"].map(f => (
            <button key={f} onClick={() => setFilter(f)} style={{ background: filter === f ? C.blue : "transparent", border: `1px solid ${filter === f ? C.blue : "rgba(59,130,246,.22)"}`, color: filter === f ? C.white : C.blueXL, padding: "8px 20px", fontSize: 9.5, letterSpacing: "0.2em", fontWeight: 700, cursor: "pointer", transition: "all 0.22s" }}>{f.toUpperCase()}</button>
          ))}
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(320px,1fr))", gap: 20 }}>
          {filtered.map((p, i) => (
            <div key={p.title} onMouseEnter={() => setHov(i)} onMouseLeave={() => setHov(null)} style={{ position: "relative", overflow: "hidden", cursor: "pointer", border: `1px solid ${hov === i ? "rgba(59,130,246,.4)" : "rgba(59,130,246,.08)"}`, opacity: v ? 1 : 0, transform: v ? "translateY(0)" : "translateY(36px)", transition: `all 0.65s ease ${i * .09}s` }}>
              <div style={{ aspectRatio: "16/10", overflow: "hidden", background: C.navy3 }}>
                {/* FIX: cast e.target to HTMLImageElement; cast parentNode to HTMLElement for .style */}
                <img src={p.img} alt={p.title} style={{ width: "100%", height: "100%", objectFit: "cover", transform: hov === i ? "scale(1.06)" : "scale(1)", transition: "transform 0.5s ease" }}
                  onError={(e) => {
                    const img = e.target as HTMLImageElement;
                    const parent = img.parentNode as HTMLElement;
                    if (parent) parent.style.background = `linear-gradient(135deg,${C.navy3},${C.navy4})`;
                    img.style.display = "none";
                  }} />
              </div>
              <div style={{ position: "absolute", inset: 0, background: `linear-gradient(to top,rgba(3,7,15,.95) 0%,rgba(3,7,15,.45) 50%,transparent 100%)`, opacity: hov === i ? 1 : 0.45, transition: "opacity 0.35s" }} />
              <div style={{ position: "absolute", top: 14, left: 14, background: "rgba(59,130,246,.18)", border: `1px solid rgba(59,130,246,.35)`, color: C.blueXL, fontSize: 9, padding: "4px 12px", letterSpacing: "0.18em", fontWeight: 700 }}>{p.catIcon} {p.cat.toUpperCase()}</div>
              <div style={{ position: "absolute", top: 14, right: 14, color: hov === i ? C.blue : "rgba(255,255,255,.2)", fontSize: 18, transform: hov === i ? "translate(3px,-3px)" : "none", transition: "all 0.3s" }}>↗</div>
              <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "20px 22px" }}>
                <h3 style={{ color: C.white, fontSize: 15, fontWeight: 800, margin: "0 0 6px", letterSpacing: "0.06em" }}>{p.title}</h3>
                <p style={{ color: "rgba(255,255,255,.55)", fontSize: 12, margin: 0, lineHeight: 1.6, opacity: hov === i ? 1 : 0, transform: hov === i ? "translateY(0)" : "translateY(8px)", transition: "all 0.3s" }}>{p.desc}</p>
              </div>
            </div>
          ))}
        </div>
        <div style={{ textAlign: "center", marginTop: 64 }}>
          <p style={{ color: C.muted, fontSize: 13, marginBottom: 24, letterSpacing: "0.1em" }}>YOUR PROJECT COULD BE NEXT</p>
          <button onClick={() => go("Contact")} style={{ background: "transparent", border: `1px solid rgba(59,130,246,.35)`, color: C.blue, padding: "14px 36px", fontSize: 11, letterSpacing: "0.22em", fontWeight: 800, cursor: "pointer", clipPath: "polygon(10px 0%,100% 0%,calc(100% - 10px) 100%,0% 100%)" }}>START A PROJECT ↗</button>
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const [ref, v] = useInView();
  // FIX: explicit FormState type so services is string[], not never[]
  const [form, setForm] = useState<FormState>({ name: "", email: "", services: [], budget: "", message: "" });
  const [sent, setSent] = useState(false);

  // FIX: typed parameter s as string
  const toggleSvc = (s: string) => setForm(f => ({
    ...f,
    services: f.services.includes(s) ? f.services.filter(x => x !== s) : [...f.services, s]
  }));

  // FIX: boxSizing cast as const to satisfy CSSProperties
  const inp: React.CSSProperties = {
    background: "rgba(255,255,255,.04)",
    border: `1px solid rgba(59,130,246,.18)`,
    color: C.white,
    padding: "13px 16px",
    fontSize: 13,
    outline: "none",
    letterSpacing: "0.04em",
    width: "100%",
    boxSizing: "border-box" as const,
    fontFamily: "inherit"
  };

  return (
    <section ref={ref as RefObject<HTMLElement>} id="contact" style={{ background: `linear-gradient(180deg,${C.navy1},${C.navy3})`, padding: "110px 5%", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", left: "50%", top: "40%", transform: "translate(-50%,-50%)", width: 700, height: 700, borderRadius: "50%", background: `radial-gradient(circle,rgba(59,130,246,.06) 0%,transparent 62%)`, pointerEvents: "none" }} />
      <div style={{ maxWidth: 1100, margin: "0 auto", position: "relative", zIndex: 1 }}>
        <div style={{ textAlign: "center", marginBottom: 72 }}>
          <SLabel>LET'S TALK</SLabel>
          <h2 style={{ color: C.white, fontSize: "clamp(34px,4vw,54px)", fontWeight: 900, margin: "0 0 16px" }}>Get In <em style={{ fontStyle: "normal", color: C.blue }}>Touch</em> &amp; Let's Build</h2>
          <p style={{ color: C.muted, fontSize: 14, maxWidth: 520, margin: "0 auto", lineHeight: 1.8 }}>We'd love to hear from you. Let's bring your ideas to life together — tell us about your project and we'll craft something extraordinary.</p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.5fr", gap: 56, opacity: v ? 1 : 0, transition: "opacity 0.9s ease" }}>
          <div>
            <div style={{ color: C.white, fontSize: 11, fontWeight: 700, letterSpacing: "0.22em", marginBottom: 28 }}>REACH US DIRECTLY</div>
            {[
              { icon: "📞", label: "Phone", val: "+254 719 628 766" },
              { icon: "✉️", label: "Email", val: "leonkuyia@gmail.com" },
              { icon: "📍", label: "Location", val: "Nairobi, Kenya" },
              { icon: "🕐", label: "Hours", val: "Mon – Fri · 9:00 AM – 5:30 PM EAT" },
            ].map(row => (
              <div key={row.label} style={{ display: "flex", gap: 16, alignItems: "flex-start", padding: "18px 0", borderBottom: `1px solid rgba(255,255,255,.05)` }}>
                <div style={{ width: 40, height: 40, background: "rgba(59,130,246,.1)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 15, flexShrink: 0 }}>{row.icon}</div>
                <div>
                  <div style={{ color: "rgba(255,255,255,.3)", fontSize: 9.5, letterSpacing: "0.22em", marginBottom: 4 }}>{row.label.toUpperCase()}</div>
                  <div style={{ color: "rgba(255,255,255,.75)", fontSize: 13 }}>{row.val}</div>
                </div>
              </div>
            ))}
            <div style={{ marginTop: 32 }}>
              <div style={{ color: "rgba(255,255,255,.3)", fontSize: 9.5, letterSpacing: "0.22em", marginBottom: 16 }}>FOLLOW ALONG</div>
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                {SOCIALS.map(s => (
                  <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" style={{ width: 36, height: 36, border: `1px solid rgba(59,130,246,.3)`, display: "flex", alignItems: "center", justifyContent: "center", color: C.blue, fontSize: 9.5, fontWeight: 700, textDecoration: "none" }}>{s.label}</a>
                ))}
              </div>
            </div>
          </div>
          {sent ? (
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 20, minHeight: 400, border: `1px solid rgba(59,130,246,.15)`, padding: 48, textAlign: "center" }}>
              <Logo size={64} />
              <div style={{ color: C.blue, fontSize: 22, fontWeight: 800, letterSpacing: "0.1em" }}>MESSAGE SENT!</div>
              <p style={{ color: C.muted, fontSize: 14, lineHeight: 1.8, margin: 0 }}>Thank you for reaching out. We'll get back to you within 24 hours.</p>
              <div style={{ color: "rgba(255,255,255,.2)", fontSize: 11, letterSpacing: "0.2em" }}>✦ CRAFTED WITH ELEGANCE IN NAIROBI</div>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                <input placeholder="Your Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} style={inp} />
                <input placeholder="Email Address" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} style={inp} />
              </div>
              <div>
                <div style={{ color: "rgba(255,255,255,.3)", fontSize: 9.5, letterSpacing: "0.22em", marginBottom: 10 }}>I'M INTERESTED IN</div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {["Graphic Design", "Web Design", "Web Dev", "Branding", "Print & Packaging", "Other"].map(s => (
                    <button key={s} onClick={() => toggleSvc(s)} style={{ background: form.services.includes(s) ? C.blue : "transparent", border: `1px solid ${form.services.includes(s) ? C.blue : "rgba(59,130,246,.25)"}`, color: form.services.includes(s) ? C.white : C.blueXL, padding: "7px 14px", fontSize: 9.5, letterSpacing: "0.14em", fontWeight: 700, cursor: "pointer", transition: "all 0.2s" }}>{s.toUpperCase()}</button>
                  ))}
                </div>
              </div>
              {/* FIX: added aria-label for accessibility */}
              <select aria-label="Estimated Budget" value={form.budget} onChange={e => setForm({ ...form, budget: e.target.value })} style={{ ...inp, appearance: "none" as const, cursor: "pointer" }}>
                <option value="" disabled>Estimated Budget</option>
                {BUDGET_OPTIONS.map(b => <option key={b} value={b}>{b}</option>)}
              </select>
              <textarea placeholder="Tell us about your project..." rows={5} value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} style={{ ...inp, resize: "none" as const }} />
              <button onClick={() => setSent(true)} style={{ background: C.blue, color: C.white, border: "none", padding: "15px", fontSize: 11, letterSpacing: "0.25em", fontWeight: 800, cursor: "pointer", clipPath: "polygon(12px 0%,100% 0%,calc(100% - 12px) 100%,0% 100%)" }}>SEND MESSAGE ✦</button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

// FIX: typed Footer props
function Footer({ go }: { go: (section: string) => void }) {
  return (
    <footer style={{ background: C.navy0, borderTop: `1px solid rgba(59,130,246,.1)` }}>
      <div style={{ maxWidth: 1120, margin: "0 auto", padding: "64px 5% 32px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: 48, marginBottom: 56 }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 18 }}>
              <Logo size={40} />
              <div>
                <div style={{ color: C.white, fontWeight: 900, fontSize: 17, letterSpacing: "0.14em" }}>LEON</div>
                <div style={{ color: C.blue, fontSize: 7.5, letterSpacing: "0.18em" }}>GRAPHICS DESIGN &amp; BRANDING</div>
              </div>
            </div>
            <p style={{ color: C.muted, fontSize: 12.5, lineHeight: 1.85, maxWidth: 280 }}>Crafting Seamless Web Experiences &amp; Compelling Visual Designs/Devs. Est. 2024 · Nairobi, Kenya.</p>
            <p style={{ color: "rgba(255,255,255,.2)", fontSize: 12, marginTop: 16, fontStyle: "italic" }}>Crafted with Elegance ✦ in Nairobi</p>
          </div>
          <div>
            <div style={{ color: C.white, fontSize: 10, letterSpacing: "0.25em", fontWeight: 700, marginBottom: 20 }}>NAVIGATION</div>
            {NAV.map(n => (
              <div key={n} style={{ marginBottom: 12 }}>
                <button onClick={() => go(n)} style={{ background: "none", border: "none", color: C.muted, fontSize: 12.5, cursor: "pointer", padding: 0, letterSpacing: "0.05em" }}>{n}</button>
              </div>
            ))}
          </div>
          <div>
            <div style={{ color: C.white, fontSize: 10, letterSpacing: "0.25em", fontWeight: 700, marginBottom: 20 }}>SERVICES</div>
            {["Graphic Design", "Web Design", "Web Dev", "Branding", "Print & Packaging"].map(s => (
              <div key={s} style={{ color: C.muted, fontSize: 12.5, marginBottom: 12 }}>{s}</div>
            ))}
          </div>
          <div>
            <div style={{ color: C.white, fontSize: 10, letterSpacing: "0.25em", fontWeight: 700, marginBottom: 20 }}>CONTACT</div>
            {["+254 719 628 766", "leonkuyia@gmail.com", "Nairobi, Kenya"].map(v => (
              <div key={v} style={{ color: C.muted, fontSize: 12, marginBottom: 12, lineHeight: 1.5 }}>{v}</div>
            ))}
            <div style={{ display: "flex", gap: 8, marginTop: 20, flexWrap: "wrap" }}>
              {SOCIALS.map(s => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" style={{ width: 30, height: 30, border: `1px solid rgba(59,130,246,.25)`, display: "flex", alignItems: "center", justifyContent: "center", color: C.blue, fontSize: 9, fontWeight: 700, textDecoration: "none" }}>{s.label}</a>
              ))}
            </div>
          </div>
        </div>
        <div style={{ borderTop: `1px solid rgba(255,255,255,.06)`, paddingTop: 28, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
          <span style={{ color: "rgba(255,255,255,.22)", fontSize: 11, letterSpacing: "0.12em" }}>© 2025 LEON Graphics Design and Branding · All Rights Reserved</span>
          <a href="https://leon-graphics-design-branding.vercel.app/" target="_blank" rel="noopener noreferrer" style={{ color: C.blue, fontSize: 11, letterSpacing: "0.08em", textDecoration: "none" }}>leon-graphics-design-branding.vercel.app ↗</a>
        </div>
      </div>
    </footer>
  );
}

// FIX: typed section keys
const SECTION_IDS: Record<string, string> = { Home: "hero", About: "about", Services: "services", Portfolio: "portfolio", Contact: "contact" };

export default function App() {
  const [active, setActive] = useState("Home");
  const go = (section: string) => {
    setActive(section);
    const el = document.getElementById(SECTION_IDS[section]);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(() => {
    const fn = () => {
      const entries = Object.entries(SECTION_IDS);
      for (let i = entries.length - 1; i >= 0; i--) {
        const el = document.getElementById(entries[i][1]);
        if (el && window.scrollY >= el.offsetTop - 130) { setActive(entries[i][0]); break; }
      }
    };
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);
  return (
    <>
      <style>{`
        *{box-sizing:border-box;margin:0;padding:0;}
        body{font-family:'Segoe UI',system-ui,sans-serif;background:${C.navy1};color:${C.white};}
        @keyframes leon-spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
        @keyframes floatX-0{0%,100%{transform:translateY(0) rotate(0deg)}50%{transform:translateY(-22px) rotate(6deg)}}
        @keyframes floatX-1{0%,100%{transform:translateY(0) rotate(12deg)}50%{transform:translateY(-16px) rotate(18deg)}}
        @keyframes floatX-2{0%,100%{transform:translateY(-12px) rotate(22deg)}50%{transform:translateY(12px) rotate(28deg)}}
        input::placeholder,textarea::placeholder{color:rgba(255,255,255,.22);}
        select option{background:${C.navy2};color:${C.white};}
        ::-webkit-scrollbar{width:4px;}
        ::-webkit-scrollbar-track{background:${C.navy0};}
        ::-webkit-scrollbar-thumb{background:#1d4ed8;border-radius:2px;}
      `}</style>
      <Navbar active={active} go={go} />
      <div id="hero"><Hero go={go} /></div>
      <About />
      <Services go={go} />
      <Portfolio go={go} />
      <Contact />
      <Footer go={go} />
    </>
  );
}
