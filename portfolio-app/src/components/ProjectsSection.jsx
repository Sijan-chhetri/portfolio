import { useState, useEffect } from "react";

const projects = [
  {
    img: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80",
    galleryImgs: [
      "https://images.unsplash.com/photo-1587620962725-abab7fe55159?w=800&q=80",
      "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=800&q=80",
    ],
    tag: "Flutter · REST API · Firebase",
    title: "SmartInven — Inventory Management System",
    shortDesc: "Real-time mobile inventory system for SMBs with stock alerts and analytics.",
    desc: "A mobile inventory management application designed for small and medium businesses. Enables real-time product tracking, supplier management, stock-in/out transactions, and financial monitoring across multiple warehouses. Integrated Firebase Cloud Messaging for automated low-stock alerts and push notifications, ensuring operations never fall behind. Features interactive analytics dashboards with daily/weekly/monthly revenue breakdowns and one-tap PDF report exports for improved decision-making. Supports role-based access so managers, staff, and auditors each see a tailored view.",
    stagger: false,
  },
  {
    img: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&q=80",
    galleryImgs: [
      "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&q=80",
      "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&q=80",
    ],
    tag: "React Native · REST API · JWT",
    title: "MediCare — Mobile Health Records App",
    shortDesc: "Secure cross-platform app for tracking medical history, prescriptions, and vitals.",
    desc: "A cross-platform mobile health management system that allows users to securely track medical history, prescriptions, and vital health metrics over time. Features trend visualization for key health indicators such as blood pressure, glucose, and BMI using interactive charts. Cloud-based medical document storage lets users carry records in their pocket, while medication reminders via push notifications ensure adherence. An interactive personal health dashboard surfaces insights at a glance. End-to-end encryption and JWT-based auth keep sensitive data safe.",
    stagger: true,
  },
  {
    img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
    galleryImgs: [
      "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=800&q=80",
      "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=800&q=80",
    ],
    tag: "Node.js · Express · PostgreSQL",
    title: "Dainiki — Task Management System",
    shortDesc: "Scalable backend for task tracking with automated reminders and JWT auth.",
    desc: "A scalable backend system for task management supporting categorization, priority tracking, and due-date scheduling for individuals and teams. Implemented automated reminder notifications using node-cron and Firebase Cloud Messaging to ensure deadlines are never missed. Features secure JWT authentication with refresh-token rotation, a full profile management API, and timezone-aware scheduling for accurate global reminders. Comprehensive REST API documentation via Swagger makes integration effortless for frontend teams. Horizontal scaling achieved via stateless architecture and Redis caching.",
    stagger: false,
  },
  {
    img: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=800&q=80",
    galleryImgs: [
      "https://images.unsplash.com/photo-1579621970795-87facc2f976d?w=800&q=80",
      "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=800&q=80",
    ],
    tag: "Flutter · Firebase · Data Visualization",
    title: "Hisab Kitab — Personal Finance Tracker",
    shortDesc: "Personal finance app with cashflow charts, lending tracker, and EMI tools.",
    desc: "A personal finance management application enabling users to monitor income, expenses, and overall cashflow in one place. Includes a lending and borrowing module with party-based balance tracking, so you always know who owes what. Interactive financial charts deliver daily, weekly, and monthly spending insights. One-tap Excel export generates ready-to-use reports for tax season or personal audits. A built-in EMI calculator helps users plan loans and large purchases with confidence. Synced across devices via Firebase Realtime Database for zero data loss.",
    stagger: false,
  },


  {
  img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
  galleryImgs: [
    "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80",
    "https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=800&q=80",
  ],
  tag: "React · TypeScript · Node.js · Express · PostgreSQL · AWS S3",
  title: "Buildify — Website Template Builder Platform",
  shortDesc: "Full-stack platform for creating and publishing websites using customizable templates and a visual editor.",
  desc: "Buildify is a full-stack web platform that enables users to create and publish professional websites using pre-built templates and a visual drag-and-drop editor. The system includes a template marketplace, interactive page editor, and site publishing engine designed for scalable multi-user environments. Users can browse templates by category, customize components in real time, upload media assets, and publish responsive websites through unique public URLs. The platform features JWT-based authentication, role-based access control for users and administrators, and a powerful admin dashboard for managing templates, categories, and platform activity. The backend architecture is built with Node.js, Express, and PostgreSQL, while AWS S3 handles secure image storage with automatic thumbnail generation. A dynamic component rendering engine and style system allow templates to support responsive layouts, animations, and component-level customization. The system also includes a favorites feature, draft workflow, rate-limited public publishing endpoints, and analytics-ready dashboards for tracking user activity and site performance.",
  stagger: true,
},

   {
    img: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",
    galleryImgs: [
      "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&q=80",
      "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=800&q=80",
    ],
    tag: "Django · Django REST Framework · React · JWT · PostgreSQL",
    title: "THEHMS — Hotel Management System",
    shortDesc: "Full-stack platform for managing hotel operations including reservations, inventory, staff, and payments.",
    desc: "A comprehensive full-stack hotel management system built with Django REST Framework and React to streamline daily hotel operations. The platform supports role-based access control for hotel owners, administrators, and operational staff, enabling secure management of rooms, bookings, employees, and inventory. Features include room availability tracking, guest check-in/check-out workflows, housekeeping management, food and beverage ordering, and vendor-based inventory requests. Integrated Khalti payment gateway enables secure online payments with automated invoice generation and PDF exports. The system also includes detailed operational dashboards and reporting tools for monitoring payments, orders, and hotel performance. Built with JWT authentication, RESTful APIs, and scalable database design to ensure reliability in real-world hospitality environments.",
    stagger: false,
  },

  
  {
    img: "https://images.unsplash.com/photo-1587620962725-abab7fe55159?w=800&q=80",
    galleryImgs: [
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80",
      "https://images.unsplash.com/photo-1495521821757-a1efb6729352?w=800&q=80",
    ],
    tag: "Flutter · Local Storage · Text-to-Speech",
    title: "SwaadGhar — Recipe Discovery App",
    shortDesc: "Cooking assistant with voice guidance, timers, and offline-first architecture.",
    desc: "An interactive cooking assistant application that lets users explore recipes spanning dozens of international cuisines. Each recipe features step-by-step cooking guidance with integrated timers and text-to-speech voice instructions so cooks can keep their hands free. A powerful search and favorites system surfaces the right dish in seconds. Built on an offline-first architecture using locally stored data, the app works seamlessly without internet — perfect for kitchens with spotty connectivity. Meal planning and a pantry tracker round out the feature set for serious home chefs.",
    stagger: false,
  },
];

function ProjectModal({ project, onClose }) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    const handleKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", handleKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKey);
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />

      {/* Modal */}
      <div
        className="relative z-10 w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-white dark:bg-[#070d18] border border-slate-200 dark:border-slate-800 shadow-2xl rounded-sm animate-[fadeInUp_0.35s_ease-out_forwards]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-9 h-9 flex items-center justify-center bg-black/40 hover:bg-primary text-white transition-colors duration-200 rounded-sm"
          aria-label="Close modal"
        >
          <span className="material-icons-outlined text-lg">close</span>
        </button>

        {/* Hero image */}
        <div className="relative h-64 md:h-80 overflow-hidden">
          <img
            src={project.img}
            alt={project.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          <div className="absolute bottom-0 left-0 p-6">
            <span className="text-[10px] tracking-[0.3em] uppercase text-primary font-bold mb-2 block">
              {project.tag}
            </span>
            <h3 className="font-display text-2xl md:text-3xl font-bold text-white leading-tight">
              {project.title}
            </h3>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 md:p-8 space-y-6">
          {/* Full description */}
          <p className="text-sm md:text-base font-light text-slate-600 dark:text-slate-300 leading-relaxed">
            {project.desc}
          </p>

          {/* Gallery */}
          <div>
            <h4 className="text-[10px] tracking-[0.3em] uppercase text-primary font-bold mb-4">
              Gallery
            </h4>
            <div className="grid grid-cols-2 gap-3">
              {project.galleryImgs.map((src, i) => (
                <div key={i} className="overflow-hidden aspect-video rounded-sm">
                  <img
                    src={src}
                    alt={`${project.title} screenshot ${i + 1}`}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Tech tags */}
          <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
            {project.tag.split(" · ").map((tech) => (
              <span
                key={tech}
                className="text-[10px] uppercase tracking-wider px-3 py-1 border border-primary/30 text-primary bg-primary/5"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ProjectsSection() {
  const [selected, setSelected] = useState(null);

  return (
    <section id="projects" className="py-24 px-8 bg-slate-50 dark:bg-[#01040a]">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <h3 className="text-primary font-display italic text-xl mb-2">
              Selected Works
            </h3>
            <h2 className="font-display text-4xl md:text-5xl font-bold dark:text-white text-slate-900">
              The Project Showcase
            </h2>
          </div>
          <div className="flex gap-4">
            <button className="p-3 ivory-border dark:border-slate-800 hover:bg-primary hover:text-white transition-all text-slate-700 dark:text-slate-200">
              <span className="material-icons-outlined">west</span>
            </button>
            <button className="p-3 ivory-border dark:border-slate-800 hover:bg-primary hover:text-white transition-all text-slate-700 dark:text-slate-200">
              <span className="material-icons-outlined">east</span>
            </button>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {projects.map((p) => (
            <div
              key={p.title}
              onClick={() => setSelected(p)}
              className={`project-card group cursor-pointer transition-all duration-500 ${
                p.stagger ? "lg:translate-y-12" : ""
              }`}
            >
              <div className="relative overflow-hidden ivory-border dark:border-slate-800 bg-white dark:bg-background-dark p-3 transition-all duration-500 hover:shadow-xl hover:shadow-primary/10">
                <div className="overflow-hidden aspect-[4/5] relative">
                  <img
                    alt={p.title}
                    className="project-image w-full h-full object-cover transition-transform duration-700 ease-out"
                    src={p.img}
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-all duration-500" />
                  {/* "View project" overlay */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <div className="flex items-center gap-2 bg-black/60 backdrop-blur-sm px-5 py-2.5 text-white text-xs uppercase tracking-widest font-serif border border-white/20">
                      <span className="material-icons-outlined text-sm">open_in_full</span>
                      View Project
                    </div>
                  </div>
                </div>
                <div className="mt-8 mb-4 px-2">
                  <span className="text-[10px] tracking-[0.3em] uppercase text-primary font-bold mb-3 block">
                    {p.tag}
                  </span>
                  <h4 className="font-display text-2xl font-bold mb-3 group-hover:text-primary transition-colors dark:text-white text-slate-900">
                    {p.title}
                  </h4>
                  <p className="text-sm font-light text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-2">
                    {p.shortDesc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {selected && (
        <ProjectModal project={selected} onClose={() => setSelected(null)} />
      )}
    </section>
  );
}
