import { useState, useRef } from "react";
import emailjs from "@emailjs/browser";
import profileImg from "../assets/profile.png";

// ─────────────────────────────────────────────────────────────
//  EmailJS Configuration
//  1. Sign up free at https://www.emailjs.com
//  2. Create a Service (Gmail, Outlook, etc.) → copy Service ID
//  3. Create an Email Template → copy Template ID
//     Template variables to use: {{from_name}}, {{from_email}}, {{message}}
//  4. Go to Account → copy your Public Key
//  Replace the three placeholder strings below with your real values:
// ─────────────────────────────────────────────────────────────
const EMAILJS_SERVICE_ID  = "service_0ayxuka";   // e.g. "service_abc123"
const EMAILJS_TEMPLATE_ID = "template_8pszm4t";  // e.g. "template_xyz789"
const EMAILJS_PUBLIC_KEY  = "F2VKBkeH2cwWyiuTq";   // e.g. "aBcDeFgHiJkLmNoP"

const STATUS = { IDLE: "idle", SENDING: "sending", SUCCESS: "success", ERROR: "error" };

// ── Email validation ──────────────────────────────────────────
const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*\.[a-zA-Z]{2,}$/;

const DISPOSABLE_DOMAINS = new Set([
  "mailinator.com","guerrillamail.com","tempmail.com","throwam.com",
  "sharklasers.com","guerrillamailblock.com","grr.la","dispostable.com",
  "maildrop.cc","yopmail.com","trashmail.com","fakeinbox.com",
  "temp-mail.org","10minutemail.com","getairmail.com","spamgourmet.com",
  "test.com","example.com","fake.com","noemail.com",
]);

const TYPO_MAP = {
  "gmial.com":"gmail.com","gmaill.com":"gmail.com","gmeil.com":"gmail.com",
  "gnail.com":"gmail.com","gamil.com":"gmail.com","gmail.co":"gmail.com",
  "yahooo.com":"yahoo.com","yaho.com":"yahoo.com","yahoo.co":"yahoo.com",
  "hotmial.com":"hotmail.com","hotmail.co":"hotmail.com",
  "outlok.com":"outlook.com","outllok.com":"outlook.com",
  "iclod.com":"icloud.com","iclooud.com":"icloud.com",
};

function validateEmail(email) {
  if (!email) return { valid: false, error: "", suggestion: null };
  if (!EMAIL_REGEX.test(email)) return { valid: false, error: "Please enter a valid email format.", suggestion: null };
  const domain = email.split("@")[1]?.toLowerCase();
  if (DISPOSABLE_DOMAINS.has(domain)) return { valid: false, error: "Please use a real email address.", suggestion: null };
  if (TYPO_MAP[domain]) return { valid: false, error: "", suggestion: `Did you mean @${TYPO_MAP[domain]}?` };
  return { valid: true, error: "", suggestion: null };
}

export default function ContactSection() {
  const formRef = useRef(null);
  const [form, setForm]       = useState({ from_name: "", from_email: "", message: "" });
  const [status, setStatus]   = useState(STATUS.IDLE);
  const [emailTouched, setEmailTouched] = useState(false);

  const emailValidation = validateEmail(form.from_email);
  const emailError      = emailTouched && !emailValidation.valid ? emailValidation.error : "";
  const emailSuggestion = emailTouched ? emailValidation.suggestion : null;
  const canSubmit       = form.from_name.trim() && emailValidation.valid && form.message.trim();

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
    if (e.target.name === "from_email") setEmailTouched(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setEmailTouched(true);
    if (!canSubmit) return;
    setStatus(STATUS.SENDING);

    try {
      await emailjs.sendForm(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        formRef.current,
        EMAILJS_PUBLIC_KEY
      );
      setStatus(STATUS.SUCCESS);
      setForm({ from_name: "", from_email: "", message: "" });
      setTimeout(() => setStatus(STATUS.IDLE), 5000);
    } catch (err) {
      console.error("EmailJS error:", err);
      setStatus(STATUS.ERROR);
      setTimeout(() => setStatus(STATUS.IDLE), 5000);
    }
  };

  const fields = [
    { id: "from_name",  label: "Full Name",      type: "text"  },
    { id: "from_email", label: "Email Address",   type: "email" },
  ];

  return (
    <section id="contact" className="bg-background-light dark:bg-background-dark py-24">
      <div className="max-w-7xl mx-auto px-8 py-12 lg:py-24 grid lg:grid-cols-2 gap-24 items-center">

        {/* Left: portrait + heading */}
        <div className="space-y-12">
          <div className="relative group overflow-hidden">
            <img
              alt="Sijan Katuwal Chhetri"
              className="w-full aspect-[4/5] object-cover grayscale-[40%] group-hover:grayscale-0 transition-all duration-700"
              src={profileImg}
            />
            <div className="absolute inset-0 border border-primary/20 m-4 pointer-events-none"></div>
          </div>
          <div className="space-y-6">
            <h2 className="font-garamond text-5xl lg:text-7xl font-light leading-tight text-slate-800 dark:text-[#f8f5f0]">
              Let&apos;s build something <br />
              <span className="italic text-primary">great together</span>.
            </h2>
            <p className="max-w-md text-sm leading-relaxed font-light opacity-70 tracking-wide font-montserrat text-slate-700 dark:text-stone-300">
              Open to freelance projects, full-time opportunities, and technical
              collaborations. Whether it&apos;s a Django API, a React app, or a full
              product — I&apos;d love to hear about your idea.
            </p>
          </div>
        </div>

        {/* Right: form */}
        <div className="bg-stone-50/50 dark:bg-stone-900/20 p-8 lg:p-12 border border-primary/5">
          <div className="mb-8">
            <h3 className="font-garamond text-3xl font-light mb-2 text-slate-800 dark:text-[#f8f5f0]">
              Get In Touch
            </h3>
            <div className="h-px w-12 bg-primary mb-8"></div>

            {/* Contact info row */}
            <div className="flex flex-wrap gap-x-6 gap-y-4">
              {/* Phone */}
              <a
                href="tel:+9779741710013"
                className="group flex items-center gap-3 opacity-60 hover:opacity-100 transition-opacity"
              >
                <span className="flex items-center justify-center w-7 h-7 border border-primary/30 text-primary shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M6.62 10.79a15.053 15.053 0 0 0 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1C10.61 21 3 13.39 3 4c0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.24 1.02l-2.21 2.2z"/>
                  </svg>
                </span>
                <div>
                  <div className="text-[8px] uppercase tracking-widest text-stone-400 leading-none mb-0.5">Phone</div>
                  <div className="font-light text-slate-700 dark:text-stone-300 text-xs group-hover:text-primary transition-colors">+977 9741710013</div>
                </div>
              </a>

              {/* Divider */}
              <div className="w-px bg-primary/10 self-stretch hidden sm:block" />

              {/* Email */}
              <a
                href="mailto:sijanchhetri102@gmail.com"
                className="group flex items-center gap-3 opacity-60 hover:opacity-100 transition-opacity"
              >
                <span className="flex items-center justify-center w-7 h-7 border border-primary/30 text-primary shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z"/>
                  </svg>
                </span>
                <div>
                  <div className="text-[8px] uppercase tracking-widest text-stone-400 leading-none mb-0.5">Email</div>
                  <div className="font-light text-slate-700 dark:text-stone-300 text-xs group-hover:text-primary transition-colors">sijanchhetri102@gmail.com</div>
                </div>
              </a>

              {/* Divider */}
              <div className="w-px bg-primary/10 self-stretch hidden sm:block" />

              {/* LinkedIn */}
              <a
                href="https://www.linkedin.com/in/sijan-chhetri"
                target="_blank"
                rel="noreferrer"
                className="group flex items-center gap-3 opacity-60 hover:opacity-100 transition-opacity"
              >
                <span className="flex items-center justify-center w-7 h-7 border border-primary/30 text-primary shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                </span>
                <div>
                  <div className="text-[8px] uppercase tracking-widest text-stone-400 leading-none mb-0.5">LinkedIn</div>
                  <div className="font-light text-slate-700 dark:text-stone-300 text-xs group-hover:text-primary transition-colors flex items-center gap-0.5">
                    sijan-chhetri
                    <span className="material-symbols-outlined text-[10px]">north_east</span>
                  </div>
                </div>
              </a>
            </div>
          </div>

          <form ref={formRef} onSubmit={handleSubmit} className="space-y-12">
            {fields.map((f) => {
              const isEmail = f.id === "from_email";
              return (
                <div key={f.id} className="relative">
                  <input
                    id={f.id}
                    name={f.id}
                    type={f.type}
                    required
                    value={form[f.id]}
                    onChange={handleChange}
                    onBlur={() => isEmail && setEmailTouched(true)}
                    disabled={status === STATUS.SENDING}
                    className={`luxury-input dark:text-stone-200 disabled:opacity-40 transition-colors ${
                      isEmail && emailTouched
                        ? emailValidation.valid
                          ? "border-emerald-500"
                          : form.from_email
                          ? "border-rose-400"
                          : ""
                        : ""
                    }`}
                    placeholder=" "
                  />
                  <label
                    htmlFor={f.id}
                    className={`absolute left-0 top-4 text-xs uppercase tracking-widest font-light transition-all pointer-events-none ${
                      form[f.id]
                        ? "-translate-y-6 scale-90 origin-top-left text-primary opacity-100"
                        : "opacity-50 text-slate-700 dark:text-stone-300"
                    }`}
                  >
                    {f.label}
                  </label>
                  {/* Inline validation feedback */}
                  {isEmail && emailError && (
                    <p className="mt-1 text-[10px] text-rose-400 tracking-wide flex items-center gap-1">
                      <span className="material-symbols-outlined text-xs">error</span>
                      {emailError}
                    </p>
                  )}
                  {isEmail && emailSuggestion && (
                    <p className="mt-1 text-[10px] text-amber-400 tracking-wide flex items-center gap-1">
                      <span className="material-symbols-outlined text-xs">lightbulb</span>
                      {emailSuggestion}{" "}
                      <button
                        type="button"
                        className="underline hover:text-primary transition-colors"
                        onClick={() => {
                          const fixed = form.from_email.split("@")[0] + "@" + TYPO_MAP[form.from_email.split("@")[1]?.toLowerCase()];
                          setForm((f) => ({ ...f, from_email: fixed }));
                        }}
                      >
                        Fix it
                      </button>
                    </p>
                  )}
                  {isEmail && emailTouched && emailValidation.valid && (
                    <p className="mt-1 text-[10px] text-emerald-500 tracking-wide flex items-center gap-1">
                      <span className="material-symbols-outlined text-xs">check_circle</span>
                      Looks good!
                    </p>
                  )}
                </div>
              );
            })}

            <div className="relative">
              <textarea
                id="message"
                name="message"
                required
                rows={4}
                value={form.message}
                onChange={handleChange}
                disabled={status === STATUS.SENDING}
                className="luxury-input dark:text-stone-200 resize-none disabled:opacity-40"
                placeholder=" "
              />
              <label
                htmlFor="message"
                className={`absolute left-0 top-4 text-xs uppercase tracking-widest font-light transition-all pointer-events-none ${
                  form.message
                    ? "-translate-y-6 scale-90 origin-top-left text-primary opacity-100"
                    : "opacity-50 text-slate-700 dark:text-stone-300"
                }`}
              >
                Your Message
              </label>
            </div>

            {/* Status feedback */}
            {status === STATUS.SUCCESS && (
              <div className="flex items-center gap-3 text-emerald-600 dark:text-emerald-400 text-sm tracking-wide">
                <span className="material-symbols-outlined text-base">check_circle</span>
                Message sent successfully! I'll be in touch soon.
              </div>
            )}
            {status === STATUS.ERROR && (
              <div className="flex items-center gap-3 text-rose-500 text-sm tracking-wide">
                <span className="material-symbols-outlined text-base">error</span>
                Something went wrong. Please try again or email me directly.
              </div>
            )}

            <div className="pt-2">
              <button
                type="submit"
                disabled={status === STATUS.SENDING || !canSubmit}
                className="group relative px-12 py-5 bg-primary text-white text-[10px] uppercase tracking-[0.4em] font-medium overflow-hidden transition-all duration-500 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                <span className="relative z-10 flex items-center gap-3">
                  {status === STATUS.SENDING ? (
                    <>
                      <svg className="animate-spin h-3 w-3" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
                      </svg>
                      Sending…
                    </>
                  ) : (
                    "Send Message"
                  )}
                </span>
                {status !== STATUS.SENDING && (
                  <div className="absolute inset-0 bg-stone-900 translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
                )}
              </button>
            </div>
          </form>


        </div>
      </div>
    </section>
  );
}
