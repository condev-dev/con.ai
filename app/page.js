"use client";

import { useState, useRef, useEffect, useCallback, useMemo } from "react";
import "./index.css";

const CREATOR_NAME = "Con Dev";
const APP_NAME = "Con Ai";


const MAX_INPUT = 600;


const LS_BRAND = "conai:brand";
const LS_HANDLE = "conai:handle";
const LS_PLATFORMS = "conai:platforms";
const LS_THEME = "conai:theme";


const PlatformIcon = {
  
  instagram: (p) => (
    <svg
      viewBox="0 0 24 24"
      width="14"
      height="14"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.9"
      {...p}
    >
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" stroke="none" />
    </svg>
  ),
  
  youtube: (p) => (
    <svg
      viewBox="0 0 24 24"
      width="14"
      height="14"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.9"
      strokeLinejoin="round"
      {...p}
    >
      <rect x="2.5" y="5.5" width="19" height="13" rx="4" />
      <path
        d="M10.4 9.6 15 12l-4.6 2.4V9.6Z"
        fill="currentColor"
        stroke="none"
      />
    </svg>
  ),
  
  linkedin: (p) => (
    <svg
      viewBox="0 0 24 24"
      width="14"
      height="14"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.9"
      strokeLinecap="round"
      {...p}
    >
      <rect x="3.5" y="3.5" width="17" height="17" rx="4" />
      <path d="M8 11v6M8 7.9v.1" />
      <path d="M12.5 17v-3.4a2.1 2.1 0 0 1 4.2 0V17" />
    </svg>
  ),
  
  threads: (p) => (
    <svg
      viewBox="0 0 24 24"
      width="14"
      height="14"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.9"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...p}
    >
      <path d="M16.5 5.6A6.6 6.6 0 0 0 12 4c-4.2 0-7 3.2-7 8s2.8 8 7 8c3.4 0 5.6-1.9 5.6-4.3 0-2.2-1.8-3.6-4.4-3.6-1.9 0-3.2.9-3.2 2.2 0 1 .8 1.7 1.9 1.7 1.7 0 2.8-1.4 2.8-3.7 0-2.1-1.2-3.5-3.1-3.5" />
    </svg>
  ),
  
  facebook: (p) => (
    <svg
      viewBox="0 0 24 24"
      width="14"
      height="14"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.9"
      strokeLinecap="round"
      {...p}
    >
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
      <path d="M14.6 8.2h-1.2a1.8 1.8 0 0 0-1.8 1.8v7.5M10 12.4h4" />
    </svg>
  ),
  
  aparat: (p) => (
    <svg
      viewBox="0 0 24 24"
      width="14"
      height="14"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.9"
      strokeLinejoin="round"
      {...p}
    >
      <path
        d="M12 3.2c3 0 4.4-1 5.7.3s.3 2.7.3 5.7.9 4.4-.3 5.7c0 0-2.7.3-5.7.3s-4.4.9-5.7-.3-.3-2.7-.3-5.7-.9-4.4.3-5.7S9 3.2 12 3.2Z"
        transform="translate(0 2)"
      />
      <path
        d="M10.7 10.7 14.4 13l-3.7 2.3v-4.6Z"
        fill="currentColor"
        stroke="none"
      />
    </svg>
  ),
};

const PLATFORMS = [
  {
    id: "instagram",
    label: "اینستاگرام",
    dot: "#f472b6",
    Icon: PlatformIcon.instagram,
  },
  {
    id: "youtube",
    label: "یوتیوب",
    dot: "#fb7185",
    Icon: PlatformIcon.youtube,
  },
  {
    id: "linkedin",
    label: "لینکدین",
    dot: "#6c9fff",
    Icon: PlatformIcon.linkedin,
  },
  { id: "threads", label: "تردز", dot: "#9ca3af", Icon: PlatformIcon.threads },
  {
    id: "facebook",
    label: "فیسبوک",
    dot: "#67a2ff",
    Icon: PlatformIcon.facebook,
  },
  { id: "aparat", label: "آپارات", dot: "#f45e8c", Icon: PlatformIcon.aparat },
];

const PLATFORM_MAP = Object.fromEntries(PLATFORMS.map((p) => [p.id, p]));


const TITLE_HINTS = [
  { id: "instagram", keys: ["اینستاگرام", "instagram"] },
  { id: "youtube", keys: ["یوتیوب", "youtube", "شورتس"] },
  { id: "linkedin", keys: ["لینکدین", "linkedin"] },
  { id: "threads", keys: ["تردز", "threads"] },
  { id: "facebook", keys: ["فیسبوک", "facebook"] },
  { id: "aparat", keys: ["آپارات", "aparat"] },
];


const Icon = {
  spark: (props) => (
    <svg
      viewBox="0 0 24 24"
      width="18"
      height="18"
      fill="none"
      aria-hidden="true"
      {...props}
      style={{ marginTop: "-2.6px", marginRight: "-.6px;" }}
    >
      <path
        d="M12 2.5c.4 3.9 1.6 6.3 3.3 8s4.1 2.9 8 3.3v.4c-3.9.4-6.3 1.6-8 3.3s-2.9 4.1-3.3 8h-.4c-.4-3.9-1.6-6.3-3.3-8s-4.1-2.9-8-3.3v-.4c3.9-.4 6.3-1.6 8-3.3s2.9-4.1 3.3-8h.4Z"
        fill="url(#sparkGrad)"
      />
      <defs>
        <linearGradient id="sparkGrad" x1="2" y1="2" x2="22" y2="22">
          <stop offset="0" stopColor="#6c9fff" />
          <stop offset="0.5" stopColor="#a78bfa" />
          <stop offset="1" stopColor="#f472b6" />
        </linearGradient>
      </defs>
    </svg>
  ),
  send: (props) => (
    <svg
      viewBox="0 0 24 24"
      width="20"
      height="20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.9"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path d="M4.4 11.5 20 4.5l-7 15.6-2.3-6.3-6.3-2.3Z" />
      <path d="M10.7 13.8 20 4.5" />
    </svg>
  ),
  stop: (props) => (
    <svg
      viewBox="0 0 24 24"
      width="18"
      height="18"
      fill="currentColor"
      aria-hidden="true"
      {...props}
    >
      <rect x="6" y="6" width="12" height="12" rx="3" />
    </svg>
  ),
  tune: (props) => (
    <svg
      viewBox="0 0 24 24"
      width="19"
      height="19"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      aria-hidden="true"
      {...props}
    >
      <path d="M4 7h9M17 7h3M4 17h3M11 17h9" />
      <circle cx="15" cy="7" r="2.4" />
      <circle cx="9" cy="17" r="2.4" />
    </svg>
  ),
  copy: (props) => (
    <svg
      viewBox="0 0 24 24"
      width="16"
      height="16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <rect x="9" y="9" width="11" height="11" rx="2.5" />
      <path d="M5 15V6.5A2.5 2.5 0 0 1 7.5 4H15" />
    </svg>
  ),
  check: (props) => (
    <svg
      viewBox="0 0 24 24"
      width="16"
      height="16"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path d="m5 12.5 4.5 4.5L19 7.5" />
    </svg>
  ),
  retry: (props) => (
    <svg
      viewBox="0 0 24 24"
      width="15"
      height="15"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.9"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path d="M20 11a8 8 0 1 0-2.3 6.3" />
      <path d="M20 5v6h-6" />
    </svg>
  ),
  warn: (props) => (
    <svg
      viewBox="0 0 24 24"
      width="14"
      height="14"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.9"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7.5v5.5M12 16.5h.01" />
    </svg>
  ),
  info: (props) => (
    <svg
      viewBox="0 0 24 24"
      width="16"
      height="16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.9"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M12 16.5V11M12 7.6h.01" />
    </svg>
  ),
  user: (props) => (
    <svg
      viewBox="0 0 24 24"
      width="17"
      height="17"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      aria-hidden="true"
      {...props}
    >
      <circle cx="12" cy="8.5" r="3.6" />
      <path d="M4.8 19.4c1.6-3 4.2-4.5 7.2-4.5s5.6 1.5 7.2 4.5" />
    </svg>
  ),
  megaphone: (props) => (
    <svg
      viewBox="0 0 24 24"
      width="18"
      height="18"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path d="M4 10v4a1.5 1.5 0 0 0 1.5 1.5H8l8 4.5v-16L8 8.5H5.5A1.5 1.5 0 0 0 4 10Z" />
      <path d="M19 10.5a3 3 0 0 1 0 3" />
    </svg>
  ),
  clapper: (props) => (
    <svg
      viewBox="0 0 24 24"
      width="18"
      height="18"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <rect x="3.5" y="8.5" width="17" height="11" rx="2" />
      <path d="m4 8.5 2.2-4 4 1-2.2 4M12 6.5l4-1 2.2 4" />
    </svg>
  ),
  bulb: (props) => (
    <svg
      viewBox="0 0 24 24"
      width="18"
      height="18"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path d="M9.5 18.5h5M10 21h4M12 3.5a6 6 0 0 0-3.5 10.9c.8.6 1.3 1.2 1.5 2.1h4c.2-.9.7-1.5 1.5-2.1A6 6 0 0 0 12 3.5Z" />
    </svg>
  ),
  plus: (props) => (
    <svg
      viewBox="0 0 24 24"
      width="17"
      height="17"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      aria-hidden="true"
      {...props}
    >
      <path d="M12 5.5v13M5.5 12h13" />
    </svg>
  ),
  close: (props) => (
    <svg
      viewBox="0 0 24 24"
      width="17"
      height="17"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      aria-hidden="true"
      {...props}
    >
      <path d="m6.5 6.5 11 11M17.5 6.5l-11 11" />
    </svg>
  ),
  sun: (props) => (
    <svg
      viewBox="0 0 24 24"
      width="18"
      height="18"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      aria-hidden="true"
      {...props}
    >
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2.8v2.1M12 19.1v2.1M4.5 4.5l1.5 1.5M18 18l1.5 1.5M2.8 12h2.1M19.1 12h2.1M4.5 19.5 6 18M18 6l1.5-1.5" />
    </svg>
  ),
  moon: (props) => (
    <svg
      viewBox="0 0 24 24"
      width="18"
      height="18"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path d="M20 14.2A8.4 8.4 0 0 1 9.8 4a8.4 8.4 0 1 0 10.2 10.2Z" />
    </svg>
  ),
};


function EmptyArt() {
  return (
    <svg
      className="hero__art"
      viewBox="0 0 160 160"
      fill="none"
      role="img"
      aria-label="نشان انتزاعی Con Ai"
    >
      <defs>
        <linearGradient id="artA" x1="20" y1="18" x2="140" y2="146">
          <stop offset="0" stopColor="#6c9fff" />
          <stop offset="0.5" stopColor="#a78bfa" />
          <stop offset="1" stopColor="#f472b6" />
        </linearGradient>
        <linearGradient id="artB" x1="140" y1="20" x2="30" y2="140">
          <stop offset="0" stopColor="#f472b6" stopOpacity="0.85" />
          <stop offset="1" stopColor="#6c9fff" stopOpacity="0.2" />
        </linearGradient>
      </defs>
      {}
      <circle
        cx="80"
        cy="80"
        r="62"
        stroke="url(#artB)"
        strokeWidth="1.5"
        strokeDasharray="3 9"
        opacity="0.75"
      />
      {}
      <path
        d="M28 96c14-46 52-64 104-52"
        stroke="url(#artA)"
        strokeWidth="3"
        strokeLinecap="round"
        opacity="0.9"
      />
      <path
        d="M132 66c-14 46-52 64-104 52"
        stroke="url(#artA)"
        strokeWidth="3"
        strokeLinecap="round"
        opacity="0.45"
      />
      {}
      <path
        d="M80 55c2.6 18.4 7.4 23.2 26 26-18.6 2.8-23.4 7.6-26 26-2.6-18.4-7.4-23.2-26-26 18.6-2.8 23.4-7.6 26-26Z"
        fill="url(#artA)"
      />
      <circle cx="126" cy="42" r="4" fill="#f472b6" opacity="0.85" />
      <circle cx="36" cy="118" r="3" fill="#6c9fff" opacity="0.8" />
    </svg>
  );
}

const SUGGESTIONS = [
  { text: "معرفی محصول جدیدمون", icon: <Icon.megaphone />, accent: "#6c9fff" },
  { text: "پشت صحنه ی یه روز کاری", icon: <Icon.clapper />, accent: "#a78bfa" },
  { text: "یه نکته آموزشی سریع", icon: <Icon.bulb />, accent: "#f472b6" },
];

function ShimmerLines() {
  return (
    <div className="shimmer" aria-hidden="true">
      <div className="shimmer__line" style={{ width: "92%" }} />
      <div
        className="shimmer__line"
        style={{ width: "76%", animationDelay: "0.15s" }}
      />
      <div
        className="shimmer__line"
        style={{ width: "55%", animationDelay: "0.3s" }}
      />
    </div>
  );
}


function BootSkeleton() {
  return (
    <div className="skeleton" aria-hidden="true">
      <div className="sk-block sk-block--art" />
      <div className="sk-block sk-block--title" />
      <div className="sk-block sk-block--sub" />
      <div className="sk-grid">
        <div className="sk-block sk-block--card" />
        <div className="sk-block sk-block--card" />
        <div className="sk-block sk-block--card" />
      </div>
    </div>
  );
}


function parseBlocks(text) {
  const lines = text.split("\n");
  const blocks = [];
  let current = null;

  const isHeader = (l) => {
    const t = l.trim();
    return t.startsWith("📍") || t.startsWith("🎵");
  };

  for (const line of lines) {
    if (isHeader(line)) {
      if (current) blocks.push(current);
      current = { title: line.trim(), lines: [] };
    } else if (current) {
      current.lines.push(line);
    } else {
      
      if (!blocks.length || blocks[0].title !== null) {
        blocks.unshift({ title: null, lines: [] });
      }
      blocks[0].lines.push(line);
    }
  }
  if (current) blocks.push(current);
  return blocks;
}


function guessPlatform(title) {
  if (!title) return null;
  const t = title.toLowerCase();
  const hit = TITLE_HINTS.find((h) =>
    h.keys.some((k) => t.includes(k.toLowerCase())),
  );
  return hit ? PLATFORM_MAP[hit.id] : null;
}


function renderLines(lines) {
  return lines.map((line, i) => {
    const parts = line.split(/(#[^\s#]+)/g);
    return (
      <div key={i} className="out-line">
        {parts.map((p, j) =>
          p.startsWith("#") ? (
            <span key={j} className="out-hashtag">
              {p}
            </span>
          ) : (
            <span key={j}>{p}</span>
          ),
        )}
        {line === "" && <br />}
      </div>
    );
  });
}


function ToastLayer({ toasts, onAction }) {
  return (
    <div className="toast-layer" role="region" aria-label="پیام های سیستم">
      {toasts.map((t) => (
        <div
          key={t.id}
          className={`toast toast--${t.kind}${t.leaving ? " toast--out" : ""}`}
          role={t.kind === "error" ? "alert" : "status"}
          aria-live={t.kind === "error" ? "assertive" : "polite"}
        >
          <span className="toast__icon">
            {t.kind === "error" ? (
              <Icon.warn width="16" height="16" />
            ) : t.kind === "success" ? (
              <Icon.check />
            ) : (
              <Icon.info />
            )}
          </span>
          <span className="toast__text">{t.text}</span>
          {t.actionLabel && (
            <button className="toast__action" onClick={() => onAction(t)}>
              {t.actionLabel}
            </button>
          )}
        </div>
      ))}
    </div>
  );
}

export default function Home() {
  const [brand, setBrand] = useState("");
  const [handle, setHandle] = useState("");
  const [selected, setSelected] = useState(["instagram"]);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [copiedId, setCopiedId] = useState(null);
  const [pending, setPending] = useState(null);
  const [theme, setTheme] = useState("dark");
  const [hydrated, setHydrated] = useState(false);
  const [toasts, setToasts] = useState([]);

  const scrollRef = useRef(null);
  const inputRef = useRef(null);
  const abortRef = useRef(null);
  const nearBottomRef = useRef(true);
  const modalRef = useRef(null);
  const lastFocusRef = useRef(null);
  const toastTimers = useRef(new Map());

  
  useEffect(() => {
    try {
      const b = localStorage.getItem(LS_BRAND);
      const h = localStorage.getItem(LS_HANDLE);
      const p = localStorage.getItem(LS_PLATFORMS);
      const t = localStorage.getItem(LS_THEME);
      if (b) setBrand(b);
      if (h) setHandle(h);
      if (p) {
        const parsed = JSON.parse(p);
        const valid = Array.isArray(parsed)
          ? parsed.filter((x) => PLATFORM_MAP[x])
          : [];
        if (valid.length) setSelected(valid);
      }
      if (t === "light" || t === "dark") setTheme(t);
      else if (window.matchMedia?.("(prefers-color-scheme: light)").matches)
        setTheme("light");
    } catch {
      
    }
    setHydrated(true);
  }, []);

  
  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(LS_BRAND, brand);
      localStorage.setItem(LS_HANDLE, handle);
      localStorage.setItem(LS_PLATFORMS, JSON.stringify(selected));
    } catch {}
  }, [brand, handle, selected, hydrated]);

  
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    if (!hydrated) return;
    try {
      localStorage.setItem(LS_THEME, theme);
    } catch {}
  }, [theme, hydrated]);

  
  const dismissToast = useCallback((id) => {
    setToasts((prev) =>
      prev.map((t) => (t.id === id ? { ...t, leaving: true } : t)),
    );
    setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), 260);
  }, []);

  const pushToast = useCallback(
    (text, kind = "info", opts = {}) => {
      const id = `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
      setToasts((prev) => [...prev.slice(-2), { id, text, kind, ...opts }]);
      const timer = setTimeout(() => dismissToast(id), opts.duration ?? 4200);
      toastTimers.current.set(id, timer);
      return id;
    },
    [dismissToast],
  );

  useEffect(() => {
    const timers = toastTimers.current;
    return () => timers.forEach((t) => clearTimeout(t));
  }, []);

  
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const onScroll = () => {
      nearBottomRef.current =
        el.scrollHeight - el.scrollTop - el.clientHeight < 140;
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (scrollRef.current && nearBottomRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages]);

  
  const autoGrow = (el) => {
    el.style.height = "auto";
    el.style.height = Math.min(el.scrollHeight, 180) + "px";
  };

  const togglePlatform = (id) =>
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id],
    );

  const ready = input.trim() && selected.length > 0 && !loading;

  
  const runCompletion = async (id, topic, platforms) => {
    setLoading(true);
    const controller = new AbortController();
    abortRef.current = controller;

    try {
      const res = await fetch("/api/completion", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          brand: brand.trim(),
          handle: handle.trim() || brand.trim(),
          topic,
          platforms,
          creator: CREATOR_NAME,
        }),
        signal: controller.signal,
      });
      if (!res.body) throw new Error("no-body");
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value);
        setMessages((prev) =>
          prev.map((m) =>
            m.id === id ? { ...m, output: m.output + chunk } : m,
          ),
        );
      }
    } catch (err) {
      if (err?.name === "AbortError") {
        setMessages((prev) =>
          prev.map((m) =>
            m.id === id ? { ...m, output: m.output || "متوقف شد." } : m,
          ),
        );
      } else {
        setMessages((prev) =>
          prev.map((m) =>
            m.id === id
              ? {
                  ...m,
                  output: m.output || "یه مشکلی پیش اومد.",
                  error: !m.output,
                }
              : m,
          ),
        );
        
        pushToast("ارتباط با سرور برقرار نشد. اینترنت رو چک کن.", "error", {
          actionLabel: "تلاش دوباره",
          retry: { id, topic, platforms },
          duration: 6000,
        });
      }
    } finally {
      setLoading(false);
      abortRef.current = null;
      setMessages((prev) =>
        prev.map((m) => (m.id === id ? { ...m, streaming: false } : m)),
      );
    }
  };

  const startMessage = (topic, platforms) => {
    const id = Date.now();
    setMessages((prev) => [
      ...prev,
      { id, topic, platforms, output: "", streaming: true, error: false },
    ]);
    runCompletion(id, topic, platforms);
    requestAnimationFrame(() => inputRef.current?.focus());
  };

  const handleSend = (overrideText) => {
    const text = (overrideText ?? input).trim();
    if (!text || selected.length === 0 || loading) return;

    if (!brand.trim()) {
      setPending({ text, platforms: [...selected] });
      openSettings();
      return;
    }

    setInput("");
    if (inputRef.current) inputRef.current.style.height = "auto";
    startMessage(text, [...selected]);
  };

  const confirmBrand = () => {
    if (!brand.trim()) return;
    closeSettings();
    if (pending) {
      setInput("");
      startMessage(pending.text, pending.platforms);
      setPending(null);
    } else {
      pushToast("تنظیمات برند ذخیره شد.", "success");
    }
  };

  const stopGenerating = () => abortRef.current?.abort();

  const retryMessage = (m) => {
    setMessages((prev) =>
      prev.map((x) =>
        x.id === m.id ? { ...x, output: "", streaming: true, error: false } : x,
      ),
    );
    runCompletion(m.id, m.topic, m.platforms);
  };

  
  const newChat = () => {
    if (loading) abortRef.current?.abort();
    setMessages([]);
    setInput("");
    setPending(null);
    nearBottomRef.current = true;
    if (inputRef.current) {
      inputRef.current.style.height = "auto";
      requestAnimationFrame(() => inputRef.current?.focus());
    }
    pushToast("گفت وگوی جدید شروع شد.", "success", { duration: 2200 });
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey && !e.nativeEvent.isComposing) {
      e.preventDefault();
      handleSend();
    }
  };

  
  const copyText = useCallback(
    async (key, text) => {
      try {
        if (navigator.clipboard?.writeText) {
          await navigator.clipboard.writeText(text);
        } else {
          const ta = document.createElement("textarea");
          ta.value = text;
          ta.setAttribute("readonly", "");
          ta.style.position = "fixed";
          ta.style.opacity = "0";
          document.body.appendChild(ta);
          ta.select();
          document.execCommand("copy");
          document.body.removeChild(ta);
        }
        setCopiedId(key);
        setTimeout(() => setCopiedId((c) => (c === key ? null : c)), 2000);
      } catch {
        pushToast("کپی نشد، دستی انتخاب کن.", "error");
      }
    },
    [pushToast],
  );

  
  const openSettings = () => {
    lastFocusRef.current = document.activeElement;
    setSettingsOpen(true);
  };

  const closeSettings = useCallback(() => {
    setSettingsOpen(false);
    setPending(null);
    
    requestAnimationFrame(() => lastFocusRef.current?.focus?.());
  }, []);

  useEffect(() => {
    if (!settingsOpen) return;

    const node = modalRef.current;
    const focusables = () =>
      Array.from(
        node?.querySelectorAll(
          'button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ) ?? [],
      ).filter((el) => el.offsetParent !== null);

    
    requestAnimationFrame(() => {
      const list = focusables();
      (list.find((el) => el.tagName === "INPUT") ?? list[0])?.focus();
    });

    const onKey = (e) => {
      if (e.key === "Escape") {
        e.preventDefault();
        closeSettings();
        return;
      }
      if (e.key !== "Tab") return;
      
      const list = focusables();
      if (list.length === 0) return;
      const first = list[0];
      const last = list[list.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [settingsOpen, closeSettings]);

  
  const newChatRef = useRef(newChat);
  newChatRef.current = newChat;

  useEffect(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        newChatRef.current();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const onToastAction = (t) => {
    dismissToast(t.id);
    if (t.retry) {
      const { id, topic, platforms } = t.retry;
      setMessages((prev) =>
        prev.map((x) =>
          x.id === id ? { ...x, output: "", streaming: true, error: false } : x,
        ),
      );
      runCompletion(id, topic, platforms);
    }
  };

  const counterClass = useMemo(() => {
    const ratio = input.length / MAX_INPUT;
    if (input.length >= MAX_INPUT) return "counter counter--max";
    if (ratio > 0.85) return "counter counter--near";
    return "counter";
  }, [input.length]);

  return (
    <div className="app" dir="rtl">
      {}
      <div className="aurora" aria-hidden="true">
        <div className="aurora__grid" />
        <div className="aurora__blob aurora__blob--1" />
        <div className="aurora__blob aurora__blob--2" />
        <div className="aurora__blob aurora__blob--3" />
      </div>

      {}
      <header className="topbar">
        <div className="topbar__inner">
          <div className="brand">
            <div className="brand__logo">
              <Icon.spark />
            </div>
            <div>
              <div className="brand__name">{APP_NAME}</div>
              <div className="brand__tag">
                دستیار تولید محتوای شبکه های اجتماعی
              </div>
            </div>
          </div>

          <div className="topbar__actions">
            <button
              className="ghost-btn"
              onClick={newChat}
              disabled={messages.length === 0 && !input}
              aria-label="شروع گفت وگوی جدید"
              title="گفت وگوی جدید (Ctrl + K)"
            >
              <Icon.plus />
              <span className="ghost-btn__label">گفت وگوی جدید</span>
            </button>

            <span className="topbar__divider" aria-hidden="true" />

            <button
              className="icon-btn"
              onClick={() => setTheme((t) => (t === "dark" ? "light" : "dark"))}
              aria-label={
                theme === "dark" ? "تغییر به تم روشن" : "تغییر به تم تیره"
              }
              title={theme === "dark" ? "تم روشن" : "تم تیره"}
              aria-pressed={theme === "light"}
            >
              {theme === "dark" ? <Icon.sun /> : <Icon.moon />}
            </button>

            <button
              className="icon-btn"
              onClick={openSettings}
              aria-label="باز کردن تنظیمات برند"
              aria-haspopup="dialog"
              title="تنظیمات برند"
            >
              <Icon.tune />
            </button>
          </div>
        </div>
      </header>

      {}
      <main className="chat" ref={scrollRef}>
        <div className="chat__inner">
          {}
          {!hydrated && messages.length === 0 && <BootSkeleton />}

          {hydrated && messages.length === 0 && (
            <section className="hero">
              <EmptyArt />
              <div className="hero__badge">
                <span className="hero__badge-dot" />
                سریع و دقیق
              </div>
              <h1 className="hero__title grad-text">
                سلام، چه محتوایی بسازیم؟
              </h1>
              <p className="hero__subtitle">
                پلتفرم رو انتخاب کن، موضوع رو بگو، بقیش با من.
              </p>

              <div className="sugg-grid">
                {SUGGESTIONS.map((s, i) => (
                  <button
                    key={s.text}
                    className="sugg-card"
                    style={{
                      "--card-accent": s.accent,
                      animationDelay: `${i * 0.09}s`,
                    }}
                    onClick={() => handleSend(s.text)}
                  >
                    <span className="sugg-card__text">{s.text}</span>
                    <span className="sugg-card__icon" aria-hidden="true">
                      {s.icon}
                    </span>
                  </button>
                ))}
              </div>
            </section>
          )}

          {messages.map((m) => {
            const blocks = m.output ? parseBlocks(m.output) : [];
            return (
              <div className="msg-group" key={m.id}>
                {}
                <div className="msg-user">
                  <div className="avatar avatar--user" aria-hidden="true">
                    <Icon.user />
                  </div>
                  <div className="msg-user__bubble">
                    {m.platforms.length > 0 && (
                      <div className="ptag-row">
                        {m.platforms.map((pid) => {
                          const p = PLATFORM_MAP[pid];
                          if (!p) return null;
                          const P = p.Icon;
                          return (
                            <span className="ptag" key={pid}>
                              <span
                                className="ptag__icon"
                                style={{ "--ptag-color": p.dot, color: p.dot }}
                              >
                                <P />
                              </span>
                              {p.label}
                            </span>
                          );
                        })}
                      </div>
                    )}
                    <div className="msg-user__text">{m.topic}</div>
                  </div>
                </div>

                {}
                <div className="msg-ai">
                  <div className="avatar avatar--ai" aria-hidden="true">
                    <span
                      className={
                        m.streaming && !m.output
                          ? "sparkle-thinking"
                          : undefined
                      }
                      style={{ display: "grid" }}
                    >
                      <Icon.spark />
                    </span>
                  </div>
                  <div className="msg-ai__body">
                    <div className="msg-ai__head">
                      <span
                        className={
                          m.error
                            ? "msg-ai__label msg-ai__label--error"
                            : "msg-ai__label"
                        }
                      >
                        {m.error && <Icon.warn />}
                        {m.error ? "مشکلی پیش اومد" : "سناریو و کپشن"}
                      </span>
                      {!m.streaming && m.output && !m.error && (
                        <button
                          className="icon-btn icon-btn--sm"
                          onClick={() => copyText(m.id, m.output)}
                          aria-label="کپی کردن کل پاسخ"
                          title={copiedId === m.id ? "کپی شد" : "کپی کل پاسخ"}
                          style={
                            copiedId === m.id
                              ? { color: "var(--acc-cyan)" }
                              : undefined
                          }
                        >
                          {copiedId === m.id ? <Icon.check /> : <Icon.copy />}
                        </button>
                      )}
                    </div>

                    <div
                      className="msg-ai__content"
                      aria-live={m.streaming ? "polite" : "off"}
                      aria-busy={m.streaming || undefined}
                    >
                      {m.output ? (
                        blocks.map((b, bi) => {
                          const plat = guessPlatform(b.title);
                          const P = plat?.Icon;
                          const blockKey = `${m.id}-b${bi}`;
                          const blockText = [b.title, ...b.lines]
                            .filter(Boolean)
                            .join("\n")
                            .trim();
                          return (
                            <section className="out-block" key={blockKey}>
                              {b.title && (
                                <div className="out-block__head">
                                  <h3 className="out-block__title">
                                    {P && (
                                      <span
                                        className="out-block__title-icon"
                                        style={{ color: plat.dot }}
                                        aria-hidden="true"
                                      >
                                        <P width="15" height="15" />
                                      </span>
                                    )}
                                    {b.title}
                                  </h3>
                                  {}
                                  {!m.streaming && (
                                    <button
                                      className="icon-btn icon-btn--sm out-block__copy"
                                      onClick={() =>
                                        copyText(blockKey, blockText)
                                      }
                                      aria-label={`کپی کردن بخش ${b.title}`}
                                      title={
                                        copiedId === blockKey
                                          ? "کپی شد"
                                          : "کپی این بخش"
                                      }
                                      style={
                                        copiedId === blockKey
                                          ? { color: "var(--acc-cyan)" }
                                          : undefined
                                      }
                                    >
                                      {copiedId === blockKey ? (
                                        <Icon.check />
                                      ) : (
                                        <Icon.copy />
                                      )}
                                    </button>
                                  )}
                                </div>
                              )}
                              <div className="out-block__body">
                                {renderLines(b.lines)}
                              </div>
                            </section>
                          );
                        })
                      ) : (
                        <ShimmerLines />
                      )}
                      {m.streaming && m.output && (
                        <span className="caret" aria-hidden="true" />
                      )}
                    </div>

                    {m.error && !m.streaming && (
                      <button
                        className="retry-btn"
                        onClick={() => retryMessage(m)}
                      >
                        <Icon.retry />
                        امتحان دوباره
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </main>

      {}
      <footer className="composer-zone">
        <div className="composer-inner">
          <div className="chips-rail">
            <div
              className="chips"
              role="group"
              aria-label="انتخاب پلتفرم های خروجی"
            >
              {PLATFORMS.map((p) => {
                const active = selected.includes(p.id);
                const P = p.Icon;
                return (
                  <button
                    key={p.id}
                    className={active ? "chip chip--active" : "chip"}
                    onClick={() => togglePlatform(p.id)}
                    aria-pressed={active}
                    aria-label={`${p.label}${active ? " (انتخاب شده)" : ""}`}
                  >
                    <span
                      className="chip__icon"
                      style={{ "--chip-color": p.dot, color: p.dot }}
                    >
                      <P />
                    </span>
                    {p.label}
                  </button>
                );
              })}
            </div>
          </div>

          {selected.length === 0 && (
            <span className="chips__warn" role="status">
              <Icon.warn />
              حداقل یه پلتفرم رو انتخاب کن
            </span>
          )}

          <div className="composer">
            <div className="composer__field">
              <textarea
                ref={inputRef}
                className="composer__input"
                value={input}
                rows={1}
                maxLength={MAX_INPUT}
                onChange={(e) => {
                  setInput(e.target.value.slice(0, MAX_INPUT));
                  autoGrow(e.target);
                }}
                onKeyDown={handleKeyDown}
                placeholder="اینجا از Con Ai بپرس..."
                aria-label="متن پیام"
                aria-describedby="composer-counter"
              />
              <div className="composer__meta">
                <span className="composer__hint">
                  Enter برای ارسال، Shift + Enter خط جدید
                </span>
                <span
                  id="composer-counter"
                  className={counterClass}
                  aria-live="polite"
                >
                  {input.length} / {MAX_INPUT}
                </span>
              </div>
            </div>

            <button
              className={
                loading
                  ? "send-btn send-btn--stop"
                  : ready
                    ? "send-btn send-btn--ready"
                    : "send-btn"
              }
              onClick={loading ? stopGenerating : () => handleSend()}
              disabled={!loading && !ready}
              aria-label={loading ? "توقف تولید" : "ارسال پیام"}
              title={loading ? "توقف تولید" : "ارسال پیام"}
            >
              {loading ? (
                <Icon.stop />
              ) : (
                <Icon.send style={{ transform: "scaleX(-1)" }} />
              )}
            </button>
          </div>

          <span className="composer-credit">
            ساخته شده با ❤ توسط <b>{CREATOR_NAME}</b>
          </span>
        </div>
      </footer>

      {}
      <ToastLayer toasts={toasts} onAction={onToastAction} />

      {}
      {settingsOpen && (
        <div
          className="modal-overlay"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) closeSettings();
          }}
        >
          <div
            className="modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="settings-title"
            aria-describedby="settings-desc"
            ref={modalRef}
          >
            <button
              className="icon-btn icon-btn--sm modal__close"
              onClick={closeSettings}
              aria-label="بستن تنظیمات"
              title="بستن (Esc)"
            >
              <Icon.close />
            </button>

            <div className="modal__icon" aria-hidden="true">
              <Icon.tune />
            </div>
            <h2 className="modal__title" id="settings-title">
              تنظیمات برند
            </h2>
            <p className="modal__desc" id="settings-desc">
              این اطلاعات رو تو همه ی محتواها استفاده می کنیم و روی همین دستگاه
              ذخیره می مونه.
            </p>

            <div className="field">
              <label className="field__label" htmlFor="brand-input">
                نام برند
              </label>
              <input
                id="brand-input"
                className="field__input"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    confirmBrand();
                  }
                }}
                placeholder="مثلا Con Dev"
                autoComplete="organization"
              />
            </div>

            <div className="field">
              <label className="field__label" htmlFor="handle-input">
                آیدی اینستاگرام
              </label>
              <input
                id="handle-input"
                className="field__input"
                value={handle}
                onChange={(e) => setHandle(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    confirmBrand();
                  }
                }}
                placeholder="con.dev"
                dir="ltr"
                autoComplete="off"
                aria-describedby="handle-help"
              />
              <span className="field__help" id="handle-help">
                اگه خالی بذاری، همون نام برند استفاده می شه.
              </span>
            </div>

            <button
              className="modal__cta"
              onClick={confirmBrand}
              disabled={!brand.trim()}
            >
              {pending ? "تایید و ادامه" : "ذخیره"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
