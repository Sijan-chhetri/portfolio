import { useState } from "react";
import { SOCIAL_LINKS } from "../socialLinks";

const faqs = [
  {
    category: "Availability",
    icon: "schedule",
    q: "Are you currently available for new projects?",
    a: "Yes — I'm actively open to freelance projects, contract work, and full-time opportunities. My typical response time is within 24 hours. If you have a project in mind, the best way to reach me is through the contact form or directly via email.",
  },
  {
    category: "Collaboration",
    icon: "handshake",
    q: "How do you typically work with clients?",
    a: "I follow a structured process: discovery call → requirements scoping → proposal & timeline → iterative development with weekly check-ins → testing & delivery → post-launch support. I use tools like Notion, GitHub, and Slack to keep communication transparent throughout.",
  },
  {
    category: "Expertise",
    icon: "code",
    q: "What kind of projects do you specialise in?",
    a: "My core strength is full-stack web development — Django REST APIs paired with React frontends. I also build cross-platform mobile apps with Flutter and React Native. I'm particularly experienced in SaaS platforms, inventory systems, hotel management, and fintech tools.",
  },
  {
    category: "Timeline",
    icon: "timer",
    q: "How long does a typical project take?",
    a: "It depends on scope. A landing page or simple API takes 1–2 weeks. A full-stack web application typically runs 4–10 weeks. I always provide a detailed timeline in the proposal phase so there are no surprises. Rush delivery is available for an additional fee.",
  },
  {
    category: "Pricing",
    icon: "payments",
    q: "How do you structure your pricing?",
    a: "I offer both fixed-price and hourly engagements. Fixed-price works best for well-defined projects; hourly suits ongoing work or evolving requirements. I'm transparent about costs upfront — no hidden fees. A 30–50% deposit is required to begin, with the remainder on delivery.",
  },
  {
    category: "Tech Stack",
    icon: "layers",
    q: "Can you work with an existing codebase or team?",
    a: "Absolutely. I'm comfortable jumping into existing projects, conducting code reviews, and collaborating with other developers. I follow clean code principles, write documentation, and adapt to your team's conventions rather than imposing my own.",
  },
  {
    category: "Quality",
    icon: "verified",
    q: "How do you ensure the quality of your work?",
    a: "Every project includes unit and integration testing, code review, and a staging environment before production deployment. I use Git with feature branches, write clear commit messages, and document APIs with Swagger. I don't consider a project done until it's been thoroughly tested.",
  },
  {
    category: "Support",
    icon: "support_agent",
    q: "Do you offer post-launch support?",
    a: "Yes. All projects include a 2-week post-launch support window at no extra cost. After that, I offer monthly retainer packages for ongoing maintenance, feature additions, and monitoring. I don't disappear after delivery — I'm invested in the long-term success of what I build.",
  },
  {
    category: "Location",
    icon: "location_on",
    q: "Do you work remotely or on-site?",
    a: "I work fully remotely and have collaborated with clients across Nepal, Australia, the UK, and the US. I'm flexible with time zones and can adjust my working hours to overlap with your team. For local clients in Kathmandu, in-person meetings are also possible.",
  },
  {
    category: "Ownership",
    icon: "gavel",
    q: "Who owns the code after the project is complete?",
    a: "You do — fully. Upon final payment, all intellectual property, source code, and assets are transferred to you. I retain no rights to the work. You'll receive a clean handover including the repository, documentation, environment setup guide, and deployment instructions.",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(null);
  const [filter, setFilter] = useState("All");

  const categories = ["All", ...new Set(faqs.map((f) => f.category))];
  const filtered = filter === "All" ? faqs : faqs.filter((f) => f.category === filter);

  return (
    <section className="py-32 bg-[#f8f5f0] dark:bg-[#070d18] relative overflow-hidden">
      {/* Subtle background texture */}
      <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.04] pointer-events-none"
        style={{ backgroundImage: "repeating-linear-gradient(0deg, #0f172a 0px, #0f172a 1px, transparent 1px, transparent 60px), repeating-linear-gradient(90deg, #0f172a 0px, #0f172a 1px, transparent 1px, transparent 60px)" }}
      />

      <div className="max-w-5xl mx-auto px-8 md:px-16 relative z-10">

        {/* Header */}
        <div className="mb-16">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-8 h-px bg-[#0f172a] dark:bg-primary" />
            <span className="text-[10px] uppercase tracking-[0.4em] text-[#0f172a] dark:text-primary font-medium">
              Case File
            </span>
          </div>
          <h2 className="font-display text-5xl md:text-6xl italic text-slate-900 dark:text-[#f8f5f0] mb-4">
            Frequently Asked
          </h2>
          <p className="text-stone-500 dark:text-stone-400 font-light text-sm tracking-wide max-w-xl">
            Real questions from real clients. Everything you need to know before we work together — answered directly, no fluff.
          </p>
        </div>

        {/* Category filter */}
        <div className="flex flex-wrap gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => { setFilter(cat); setOpenIndex(null); }}
              className={`px-4 py-1.5 text-[10px] uppercase tracking-widest font-medium border transition-all duration-200 ${
                filter === cat
                  ? "bg-[#0f172a] dark:bg-primary text-white dark:text-background-dark border-[#0f172a] dark:border-primary"
                  : "border-[#0f172a]/20 dark:border-primary/20 text-slate-600 dark:text-slate-400 hover:border-[#0f172a]/60 dark:hover:border-primary/60"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* FAQ list */}
        <div className="space-y-0 divide-y divide-[#0f172a]/10 dark:divide-white/5">
          {filtered.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <div key={i} className="group">
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="w-full flex items-start gap-6 py-7 text-left transition-all duration-200"
                >
                  {/* Icon */}
                  <span className={`material-symbols-outlined text-xl mt-0.5 shrink-0 transition-colors duration-300 ${
                    isOpen ? "text-[#0f172a] dark:text-primary" : "text-stone-400 dark:text-stone-600 group-hover:text-[#0f172a] dark:group-hover:text-primary"
                  }`}>
                    {faq.icon}
                  </span>

                  {/* Question + category */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-1">
                      <span className="text-[9px] uppercase tracking-[0.3em] text-[#0f172a]/50 dark:text-primary/50 font-medium">
                        {faq.category}
                      </span>
                    </div>
                    <span className={`font-display text-lg md:text-xl transition-colors duration-200 ${
                      isOpen ? "text-[#0f172a] dark:text-[#f8f5f0]" : "text-slate-700 dark:text-slate-300 group-hover:text-[#0f172a] dark:group-hover:text-[#f8f5f0]"
                    }`}>
                      {faq.q}
                    </span>
                  </div>

                  {/* Toggle indicator */}
                  <span className={`shrink-0 w-6 h-6 flex items-center justify-center border transition-all duration-300 mt-1 ${
                    isOpen
                      ? "border-[#0f172a] dark:border-primary bg-[#0f172a] dark:bg-primary text-white dark:text-background-dark rotate-45"
                      : "border-[#0f172a]/20 dark:border-white/10 text-slate-400 dark:text-slate-600 group-hover:border-[#0f172a]/50 dark:group-hover:border-white/30"
                  }`}>
                    <span className="material-symbols-outlined text-sm">add</span>
                  </span>
                </button>

                {/* Answer */}
                <div className={`overflow-hidden transition-all duration-500 ease-in-out ${
                  isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                }`}>
                  <div className="pl-12 pb-8 pr-8">
                    <div className="border-l-2 border-[#0f172a]/20 dark:border-primary/30 pl-6">
                      <p className="text-sm md:text-base text-stone-600 dark:text-stone-400 leading-relaxed font-light">
                        {faq.a}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA at bottom */}
        <div className="mt-20 pt-12 border-t border-[#0f172a]/10 dark:border-white/5 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <p className="font-display text-2xl italic text-slate-800 dark:text-[#f8f5f0] mb-1">
              Still have questions?
            </p>
            <p className="text-sm text-stone-500 dark:text-stone-400 font-light">
              I respond to every message personally — usually within a day.
            </p>
          </div>
          <div className="flex gap-4">
            <a
              href="#contact"
              className="group relative px-8 py-3 bg-[#0f172a] dark:bg-primary text-white dark:text-background-dark font-serif uppercase text-xs tracking-widest overflow-hidden transition-all duration-300"
            >
              <span className="relative z-10">Ask Me Directly</span>
              <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            </a>
            <a
              href={SOCIAL_LINKS.linkedin}
              target="_blank"
              rel="noreferrer"
              className="px-8 py-3 border border-[#0f172a]/30 dark:border-primary/30 text-[#0f172a] dark:text-primary font-serif uppercase text-xs tracking-widest hover:border-[#0f172a] dark:hover:border-primary transition-all duration-300"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
