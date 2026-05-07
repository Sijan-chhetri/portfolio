import { useState, useRef, useEffect } from "react";
import OpenAI from "openai";

const SYSTEM_PROMPT = `You are Sijan's personal AI assistant on his portfolio website. 
You represent Sijan Katuwal Chhetri, a full-stack software engineer based in Kathmandu, Nepal.

About Sijan:
- Full-stack developer specialising in Python, Django, React, Flutter
- Experience: Software Engineer at Elevate Tech (Dec 2025–present), Intern at Xdezo (Nov 2024–Feb 2025), Freelance developer (2023–2024)
- Skills: Python, Django, Django REST Framework, React, TypeScript, Node.js, Express, Flutter, React Native, PostgreSQL, MongoDB, Docker, Firebase, AWS S3
- Projects: SmartInven (inventory), MediCare (health), Dainiki (task management), Hisab Kitab (finance), Buildify (website builder), THEHMS (hotel management), SwaadGhar (recipe app)
- Available for freelance, contract, and full-time work
- Contact: sijanchhetri102@gmail.com | +977 9741710013
- LinkedIn: linkedin.com/in/sijan-chhetri

Your role:
- Answer questions about Sijan's skills, experience, availability, and projects
- Be professional, warm, and concise — max 3 sentences per reply unless detail is needed
- If asked something you don't know, suggest contacting Sijan directly
- Never make up information not listed above
- Speak as Sijan's assistant, not as Sijan himself`;

// ─── All predefined Q&A pairs ─────────────────────────────────
const ALL_QA = [
  {
    q: "Is Sijan available for hire?",
    a: "Yes — Sijan is actively open to freelance projects, contract work, and full-time opportunities. His typical response time is within 24 hours. Reach him at sijanchhetri102@gmail.com or through the contact form.",
  },
  {
    q: "What tech stack does he use?",
    a: "Sijan's core stack is Python & Django for back-end, React & TypeScript for front-end, and Flutter for mobile. He also works with Node.js, PostgreSQL, MongoDB, Docker, Firebase, and AWS S3.",
  },
  {
    q: "How much does he charge?",
    a: "Sijan offers both fixed-price and hourly engagements. Fixed-price suits well-defined projects; hourly works best for ongoing or evolving work. A 30–50% deposit is required to start. Contact him for a custom quote.",
  },
  {
    q: "Can he work with my team?",
    a: "Absolutely. Sijan is comfortable joining existing teams, reviewing code, and adapting to your conventions. He uses Git, writes documentation, and communicates via Slack or Notion — whatever your team prefers.",
  },
  {
    q: "How long does a project take?",
    a: "A simple API or landing page takes 1–2 weeks. A full-stack web application typically runs 4–10 weeks. Sijan always provides a detailed timeline in the proposal phase so there are no surprises.",
  },
  {
    q: "Does he offer post-launch support?",
    a: "Yes — all projects include a 2-week post-launch support window at no extra cost. After that, monthly retainer packages are available for ongoing maintenance and feature additions.",
  },
  {
    q: "What projects has he built?",
    a: "Sijan has built inventory systems, hotel management platforms, finance trackers, mobile apps, a website builder, and full-stack SaaS products. Check the Projects section on this page for details.",
  },
  {
    q: "How do I contact Sijan?",
    a: "You can reach Sijan at sijanchhetri102@gmail.com or +977 9741710013. He responds to every message personally, usually within 24 hours. You can also use the contact form at the bottom of this page.",
  },
];

// ─── Pick 4 follow-up suggestions excluding the last asked ────
function getFollowUps(lastQuestion) {
  const others = ALL_QA.filter((qa) => qa.q !== lastQuestion);
  // Shuffle and take 4
  return others.sort(() => Math.random() - 0.5).slice(0, 4);
}

const client = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "Hi 👋 I'm Sijan's AI assistant. Ask me anything about his work, availability, or how to collaborate.",
      suggestions: ALL_QA.slice(0, 4), // show first 4 on welcome
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [hasKey] = useState(!!import.meta.env.VITE_OPENAI_API_KEY);
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 100);
  }, [open]);

  const sendMessage = async (text, predefinedAnswer = null) => {
    const userText = (text || input).trim();
    if (!userText || loading) return;

    // Add user message (no suggestions on user bubbles)
    setMessages((m) => [...m, { role: "user", content: userText }]);
    setInput("");
    setLoading(true);

    const followUps = getFollowUps(userText);

    if (predefinedAnswer) {
      await new Promise((r) => setTimeout(r, 500));
      setMessages((m) => [...m, { role: "assistant", content: predefinedAnswer, suggestions: followUps }]);
      setLoading(false);
      return;
    }

    try {
      let reply;
      if (!hasKey) {
        await new Promise((r) => setTimeout(r, 700));
        reply = getFallbackReply(userText);
      } else {
        const history = messages.map((m) => ({ role: m.role, content: m.content }));
        const res = await client.chat.completions.create({
          model: "gpt-4o-mini",
          messages: [
            { role: "system", content: SYSTEM_PROMPT },
            ...history,
            { role: "user", content: userText },
          ],
          max_tokens: 200,
          temperature: 0.7,
        });
        reply = res.choices[0].message.content;
      }
      setMessages((m) => [...m, { role: "assistant", content: reply, suggestions: followUps }]);
    } catch (err) {
      console.error(err);
      setMessages((m) => [
        ...m,
        {
          role: "assistant",
          content: "Sorry, I ran into an issue. Please reach out to Sijan directly at sijanchhetri102@gmail.com.",
          suggestions: followUps,
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKey = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  // Only show suggestions on the last assistant message
  const lastAssistantIndex = [...messages].map((m, i) => ({ ...m, i })).filter((m) => m.role === "assistant").at(-1)?.i;

  return (
    <>
      {open && (
        <div className="fixed bottom-24 right-6 z-50 w-[360px] max-w-[calc(100vw-2rem)] flex flex-col shadow-2xl animate-[fadeInUp_0.3s_ease-out_forwards]">
          {/* Header */}
          <div className="bg-[#0f172a] px-5 py-4 flex items-center justify-between rounded-t-sm">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                  <span className="material-symbols-outlined text-primary text-sm">smart_toy</span>
                </div>
                <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-400 rounded-full border-2 border-[#0f172a]" />
              </div>
              <div>
                <p className="text-white text-sm font-medium tracking-wide">Sijan's Assistant</p>
                <p className="text-emerald-400 text-[10px] tracking-widest uppercase">Online</p>
              </div>
            </div>
            <button onClick={() => setOpen(false)} className="text-white/40 hover:text-white transition-colors" aria-label="Close chat">
              <span className="material-symbols-outlined text-lg">close</span>
            </button>
          </div>

          {/* Messages */}
          <div className="bg-[#f8f5f0] dark:bg-[#0a1020] flex-1 overflow-y-auto px-4 py-5 space-y-4 min-h-[320px] max-h-[420px]">
            {messages.map((msg, i) => (
              <div key={i}>
                <div className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                  {msg.role === "assistant" && (
                    <div className="w-6 h-6 rounded-full bg-[#0f172a] flex items-center justify-center shrink-0 mr-2 mt-1">
                      <span className="material-symbols-outlined text-primary text-xs">smart_toy</span>
                    </div>
                  )}
                  <div className={`max-w-[80%] px-4 py-3 text-sm leading-relaxed font-light ${
                    msg.role === "user"
                      ? "bg-[#0f172a] text-white rounded-tl-xl rounded-bl-xl rounded-tr-sm rounded-br-xl"
                      : "bg-white dark:bg-[#0f172a]/60 text-slate-700 dark:text-slate-300 rounded-tr-xl rounded-br-xl rounded-tl-sm rounded-bl-xl border border-[#0f172a]/10 dark:border-white/5"
                  }`}>
                    {msg.content}
                  </div>
                </div>

                {/* Follow-up suggestions — only on last assistant message */}
                {msg.role === "assistant" && msg.suggestions && i === lastAssistantIndex && !loading && (
                  <div className="mt-3 ml-8 flex flex-wrap gap-2">
                    {msg.suggestions.map((s) => (
                      <button
                        key={s.q}
                        onClick={() => sendMessage(s.q, s.a)}
                        className="text-[10px] px-3 py-1.5 border border-[#0f172a]/20 dark:border-white/10 text-slate-600 dark:text-slate-400 hover:border-[#0f172a] dark:hover:border-primary hover:text-[#0f172a] dark:hover:text-primary bg-white dark:bg-[#0f172a]/30 transition-all duration-200 tracking-wide rounded-sm"
                      >
                        {s.q}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {/* Typing indicator */}
            {loading && (
              <div className="flex justify-start">
                <div className="w-6 h-6 rounded-full bg-[#0f172a] flex items-center justify-center shrink-0 mr-2 mt-1">
                  <span className="material-symbols-outlined text-primary text-xs">smart_toy</span>
                </div>
                <div className="bg-white dark:bg-[#0f172a]/60 border border-[#0f172a]/10 dark:border-white/5 px-4 py-3 rounded-tr-xl rounded-br-xl rounded-tl-sm rounded-bl-xl">
                  <div className="flex gap-1 items-center h-4">
                    {[0, 1, 2].map((j) => (
                      <span key={j} className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: `${j * 0.15}s` }} />
                    ))}
                  </div>
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div className="bg-white dark:bg-[#0d1526] border-t border-[#0f172a]/10 dark:border-white/5 px-4 py-3 flex items-end gap-3 rounded-b-sm">
            <textarea
              ref={inputRef}
              rows={1}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKey}
              placeholder="Ask me anything…"
              className="flex-1 resize-none bg-transparent text-sm text-slate-800 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-600 focus:outline-none leading-relaxed max-h-24 overflow-y-auto"
              style={{ fieldSizing: "content" }}
            />
            <button
              onClick={() => sendMessage()}
              disabled={!input.trim() || loading}
              className="w-8 h-8 flex items-center justify-center bg-[#0f172a] dark:bg-primary text-white dark:text-background-dark rounded-sm disabled:opacity-30 transition-all hover:opacity-80 shrink-0"
              aria-label="Send"
            >
              <span className="material-symbols-outlined text-sm">send</span>
            </button>
          </div>
        </div>
      )}

      {/* Floating toggle button */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-[#0f172a] dark:bg-primary text-white dark:text-background-dark rounded-sm shadow-xl hover:scale-105 transition-all duration-300 flex items-center justify-center"
        aria-label="Toggle chat"
      >
        <span className="material-symbols-outlined text-2xl">{open ? "close" : "chat"}</span>
        {!open && <span className="absolute inset-0 rounded-sm animate-ping bg-[#0f172a] dark:bg-primary opacity-20" />}
      </button>
    </>
  );
}

function getFallbackReply(text) {
  const t = text.toLowerCase();
  if (t.match(/available|hire|open/))
    return "Yes, Sijan is currently open to freelance, contract, and full-time opportunities. You can reach him at sijanchhetri102@gmail.com or through the contact form.";
  if (t.match(/price|cost|rate|charge|fee/))
    return "Sijan offers both fixed-price and hourly engagements. Pricing depends on project scope — reach out via the contact form for a custom quote.";
  if (t.match(/stack|tech|language|framework/))
    return "Sijan specialises in Python, Django, React, and Flutter. He also works with Node.js, PostgreSQL, Docker, Firebase, and AWS S3.";
  if (t.match(/time|long|deadline|fast|quick/))
    return "Timelines vary by scope — a simple API takes 1–2 weeks, a full-stack app typically 4–10 weeks. Rush delivery is available.";
  if (t.match(/contact|email|reach|talk|meet/))
    return "You can reach Sijan at sijanchhetri102@gmail.com or +977 9741710013. He responds within 24 hours.";
  if (t.match(/project|built|portfolio/))
    return "Sijan has built inventory systems, hotel management platforms, finance trackers, mobile apps, and full-stack SaaS products. Check the Projects section for details.";
  if (t.match(/location|where|remote|nepal/))
    return "Sijan is based in Kathmandu, Nepal and works fully remotely with clients worldwide. He's flexible with time zones.";
  if (t.match(/support|after|maintain/))
    return "All projects include a 2-week post-launch support window. Monthly retainer packages are available for ongoing maintenance.";
  if (t.match(/team|collab|existing/))
    return "Absolutely — Sijan is comfortable joining existing teams, reviewing code, and adapting to your conventions and tools.";
  return "That's a great question! For the most accurate answer, I'd recommend reaching out to Sijan directly at sijanchhetri102@gmail.com — he responds within 24 hours.";
}
