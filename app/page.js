"use client";

import { useState, useRef, useEffect } from "react";
import "./index.css";

const CREATOR_NAME = "Con Dev";
const APP_NAME = "Con Ai";

const PLATFORMS = [
  { id: "instagram", label: "اینستاگرام", dot: "#f472b6" },
  { id: "youtube", label: "یوتیوب", dot: "#fb7185" },
  { id: "linkedin", label: "لینکدین", dot: "#6c9fff" },
  { id: "threads", label: "تردز", dot: "#f2f3f8" },
  { id: "facebook", label: "فیسبوک", dot: "#67a2ff" },
  { id: "aparat", label: "آپارات", dot: "#f45e8c" },
];

/* ---------- آیکون های اختصاصی SVG (بدون هیچ کتابخونه ای) ---------- */
const Icon = {
  spark: (props) => (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" {...props}>
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
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M4.4 11.5 20 4.5l-7 15.6-2.3-6.3-6.3-2.3Z" />
      <path d="M10.7 13.8 20 4.5" />
    </svg>
  ),
  stop: (props) => (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" {...props}>
      <rect x="6" y="6" width="12" height="12" rx="3" />
    </svg>
  ),
  tune: (props) => (
    <svg viewBox="0 0 24 24" width="19" height="19" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" {...props}>
      <path d="M4 7h9M17 7h3M4 17h3M11 17h9" />
      <circle cx="15" cy="7" r="2.4" />
      <circle cx="9" cy="17" r="2.4" />
    </svg>
  ),
  copy: (props) => (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect x="9" y="9" width="11" height="11" rx="2.5" />
      <path d="M5 15V6.5A2.5 2.5 0 0 1 7.5 4H15" />
    </svg>
  ),
  check: (props) => (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="m5 12.5 4.5 4.5L19 7.5" />
    </svg>
  ),
  retry: (props) => (
    <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M20 11a8 8 0 1 0-2.3 6.3" />
      <path d="M20 5v6h-6" />
    </svg>
  ),
  warn: (props) => (
    <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7.5v5.5M12 16.5h.01" />
    </svg>
  ),
  user: (props) => (
    <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" {...props}>
      <circle cx="12" cy="8.5" r="3.6" />
      <path d="M4.8 19.4c1.6-3 4.2-4.5 7.2-4.5s5.6 1.5 7.2 4.5" />
    </svg>
  ),
  megaphone: (props) => (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M4 10v4a1.5 1.5 0 0 0 1.5 1.5H8l8 4.5v-16L8 8.5H5.5A1.5 1.5 0 0 0 4 10Z" />
      <path d="M19 10.5a3 3 0 0 1 0 3" />
    </svg>
  ),
  clapper: (props) => (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect x="3.5" y="8.5" width="17" height="11" rx="2" />
      <path d="m4 8.5 2.2-4 4 1-2.2 4M12 6.5l4-1 2.2 4" />
    </svg>
  ),
  bulb: (props) => (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M9.5 18.5h5M10 21h4M12 3.5a6 6 0 0 0-3.5 10.9c.8.6 1.3 1.2 1.5 2.1h4c.2-.9.7-1.5 1.5-2.1A6 6 0 0 0 12 3.5Z" />
    </svg>
  ),
};

const SUGGESTIONS = [
  { text: "معرفی محصول جدیدمون", icon: <Icon.megaphone />, accent: "#6c9fff" },
  { text: "پشت صحنه ی یه روز کاری", icon: <Icon.clapper />, accent: "#a78bfa" },
  { text: "یه نکته آموزشی سریع", icon: <Icon.bulb />, accent: "#f472b6" },
];

function ShimmerLines() {
  return (
    <div className="shimmer">
      <div className="shimmer__line" style={{ width: "92%" }} />
      <div className="shimmer__line" style={{ width: "76%", animationDelay: "0.15s" }} />
      <div className="shimmer__line" style={{ width: "55%", animationDelay: "0.3s" }} />
    </div>
  );
}

function renderOutput(text) {
  return text.split("\n").map((line, i) => {
    const isHeader = line.trim().startsWith("📍") || line.trim().startsWith("🎵");
    const parts = line.split(/(#[^\s#]+)/g);
    return (
      <div key={i} className={isHeader ? "out-line out-line--header" : "out-line"}>
        {parts.map((p, j) =>
          p.startsWith("#") ? (
            <span key={j} className="out-hashtag">{p}</span>
          ) : (
            <span key={j}>{p}</span>
          ),
        )}
        {line === "" && <br />}
      </div>
    );
  });
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

  const scrollRef = useRef(null);
  const inputRef = useRef(null);
  const abortRef = useRef(null);
  const nearBottomRef = useRef(true);

  // اسکرول خودکار فقط وقتی کاربر خودش پایین صفحه باشه
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const onScroll = () => {
      nearBottomRef.current =
        el.scrollHeight - el.scrollTop - el.clientHeight < 140;
    };
    el.addEventListener("scroll", onScroll);
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

  // ارتفاع خودکار textarea بدون هیچ کتابخونه ای
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
          prev.map((m) => (m.id === id ? { ...m, output: m.output + chunk } : m)),
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
              ? { ...m, output: m.output || "یه مشکلی پیش اومد.", error: !m.output }
              : m,
          ),
        );
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
      setSettingsOpen(true);
      return;
    }

    setInput("");
    if (inputRef.current) inputRef.current.style.height = "auto";
    startMessage(text, [...selected]);
  };

  const confirmBrand = () => {
    if (!brand.trim()) return;
    setSettingsOpen(false);
    if (pending) {
      setInput("");
      startMessage(pending.text, pending.platforms);
      setPending(null);
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

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey && !e.nativeEvent.isComposing) {
      e.preventDefault();
      handleSend();
    }
  };

  const copyMessage = (id, text) => {
    navigator.clipboard?.writeText(text).catch(() => {});
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="app" dir="rtl">
      {/* پس زمینه ی Aurora: سه هاله ی رنگی + شبکه ی نقطه ای محو */}
      <div className="aurora" aria-hidden="true">
        <div className="aurora__grid" />
        <div className="aurora__blob aurora__blob--1" />
        <div className="aurora__blob aurora__blob--2" />
        <div className="aurora__blob aurora__blob--3" />
      </div>

      {/* Topbar شیشه ای */}
      <header className="topbar">
        <div className="brand">
          <div className="brand__logo">
            <Icon.spark />
          </div>
          <div>
            <div className="brand__name">{APP_NAME}</div>
            <div className="brand__tag">دستیار تولید محتوای شبکه های اجتماعی</div>
          </div>
        </div>
        <button
          className="icon-btn"
          onClick={() => setSettingsOpen(true)}
          aria-label="تنظیمات برند"
          title="تنظیمات برند"
        >
          <Icon.tune />
        </button>
      </header>

      {/* بدنه ی گفتگو */}
      <main className="chat" ref={scrollRef}>
        <div className="chat__inner">
          {messages.length === 0 && (
            <section className="hero">
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
                    style={{ "--card-accent": s.accent, animationDelay: `${i * 0.09}s` }}
                    onClick={() => handleSend(s.text)}
                  >
                    <span className="sugg-card__text">{s.text}</span>
                    <span className="sugg-card__icon">{s.icon}</span>
                  </button>
                ))}
              </div>
            </section>
          )}

          {messages.map((m) => (
            <div className="msg-group" key={m.id}>
              {/* پیام کاربر */}
              <div className="msg-user">
                <div className="avatar avatar--user">
                  <Icon.user />
                </div>
                <div className="msg-user__bubble">
                  {m.platforms.length > 0 && (
                    <div className="ptag-row">
                      {m.platforms.map((pid) => {
                        const p = PLATFORMS.find((x) => x.id === pid);
                        return (
                          <span className="ptag" key={pid}>
                            <span className="ptag__dot" style={{ background: p?.dot }} />
                            {p?.label}
                          </span>
                        );
                      })}
                    </div>
                  )}
                  <div className="msg-user__text">{m.topic}</div>
                </div>
              </div>

              {/* پاسخ Ai */}
              <div className="msg-ai">
                <div className="avatar avatar--ai">
                  <span className={m.streaming && !m.output ? "sparkle-thinking" : undefined} style={{ display: "grid" }}>
                    <Icon.spark />
                  </span>
                </div>
                <div className="msg-ai__body">
                  <div className="msg-ai__head">
                    <span className={m.error ? "msg-ai__label msg-ai__label--error" : "msg-ai__label"}>
                      {m.error && <Icon.warn />}
                      {m.error ? "مشکلی پیش اومد" : "سناریو و کپشن"}
                    </span>
                    {!m.streaming && m.output && !m.error && (
                      <button
                        className="icon-btn icon-btn--sm"
                        onClick={() => copyMessage(m.id, m.output)}
                        aria-label="کپی کردن پاسخ"
                        title={copiedId === m.id ? "کپی شد" : "کپی کردن"}
                        style={copiedId === m.id ? { color: "var(--acc-cyan)" } : undefined}
                      >
                        {copiedId === m.id ? <Icon.check /> : <Icon.copy />}
                      </button>
                    )}
                  </div>

                  <div className="msg-ai__content">
                    {m.output ? renderOutput(m.output) : <ShimmerLines />}
                    {m.streaming && m.output && <span className="caret" />}
                  </div>

                  {m.error && !m.streaming && (
                    <button className="retry-btn" onClick={() => retryMessage(m)}>
                      <Icon.retry />
                      امتحان دوباره
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* نوار ورودی */}
      <footer className="composer-zone">
        <div className="composer-inner">
          <div className="chips">
            {PLATFORMS.map((p) => {
              const active = selected.includes(p.id);
              return (
                <button
                  key={p.id}
                  className={active ? "chip chip--active" : "chip"}
                  onClick={() => togglePlatform(p.id)}
                >
                  <span className="chip__dot" style={{ background: p.dot, color: p.dot }} />
                  {p.label}
                </button>
              );
            })}
            {selected.length === 0 && (
              <span className="chips__warn">حداقل یه پلتفرم رو انتخاب کن</span>
            )}
          </div>

          <div className="composer">
            <textarea
              ref={inputRef}
              className="composer__input"
              value={input}
              rows={1}
              onChange={(e) => {
                setInput(e.target.value);
                autoGrow(e.target);
              }}
              onKeyDown={handleKeyDown}
              placeholder="اینجا از Con Ai بپرس..."
              aria-label="متن پیام"
            />
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
              {loading ? <Icon.stop /> : <Icon.send style={{ transform: "scaleX(-1)" }} />}
            </button>
          </div>

          <span className="composer-credit">
            ساخته شده با ❤ توسط <b>{CREATOR_NAME}</b>
          </span>
        </div>
      </footer>

      {/* دیالوگ تنظیمات برند */}
      {settingsOpen && (
        <div
          className="modal-overlay"
          onClick={(e) => {
            if (e.target === e.currentTarget) setSettingsOpen(false);
          }}
        >
          <div className="modal" role="dialog" aria-modal="true" aria-label="تنظیمات برند">
            <div className="modal__icon">
              <Icon.tune />
            </div>
            <h2 className="modal__title">تنظیمات برند</h2>
            <p className="modal__desc">این اطلاعات رو تو همه ی محتواها استفاده می کنیم.</p>

            <div className="field">
              <label className="field__label" htmlFor="brand-input">نام برند</label>
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
                autoFocus
              />
            </div>

            <div className="field">
              <label className="field__label" htmlFor="handle-input">آیدی اینستاگرام</label>
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
              />
            </div>

            <button
              className="modal__cta"
              onClick={confirmBrand}
              disabled={!brand.trim()}
            >
              تایید و ادامه
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
