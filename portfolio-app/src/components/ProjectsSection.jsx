const projects = [
  {
    img: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&q=80",
    tag: "Python · Django · React",
    title: "DevTask — Project Management SaaS",
    desc: "A full-stack SaaS application for developer teams. Django REST back-end with JWT auth, real-time task boards built in React, and a PostgreSQL database.",
    stagger: false,
  },
  {
    img: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=600&q=80",
    tag: "Django · REST API",
    title: "ShopAPI — E-Commerce Backend",
    desc: "A production-ready Django REST Framework e-commerce API with product management, order processing, Stripe payments, and Redis caching.",
    stagger: true,
  },
  {
    img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&q=80",
    tag: "React · TypeScript",
    title: "AnalyticsDash — Data Dashboard",
    desc: "An interactive analytics dashboard built with React and TypeScript. Features live chart updates, filter controls, and export functionality.",
    stagger: false,
  },
  {
    img: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=600&q=80",
    tag: "Python · Automation",
    title: "ScrapeSmart — Web Scraping Engine",
    desc: "A Python-based data collection pipeline using Scrapy and Celery, with a Django admin interface and automated scheduling via cron jobs.",
    stagger: false,
  },
  {
    img: "https://images.unsplash.com/photo-1587620962725-abab7fe55159?w=600&q=80",
    tag: "React · Django · WebSocket",
    title: "ChatFlow — Real-Time Messaging App",
    desc: "Real-time chat application using Django Channels (WebSockets) on the back-end and a React front-end with instant message delivery.",
    stagger: true,
  },
  {
    img: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&q=80",
    tag: "Docker · CI/CD · Django",
    title: "DeployKit — Dev Ops Starter",
    desc: "A fully containerized Django + React project template with Docker Compose, GitHub Actions CI/CD, Nginx, and environment-specific configs.",
    stagger: false,
  },
];

export default function ProjectsSection() {
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
              className={`project-card group cursor-pointer transition-all duration-500 ${
                p.stagger ? "lg:translate-y-12" : ""
              }`}
            >
              <div className="relative overflow-hidden ivory-border dark:border-slate-800 bg-white dark:bg-background-dark p-3 transition-all duration-500">
                <div className="overflow-hidden aspect-[4/5] relative">
                  <img
                    alt={p.title}
                    className="project-image w-full h-full object-cover transition-transform duration-700 ease-out"
                    src={p.img}
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-all duration-500"></div>
                </div>
                <div className="mt-8 mb-4 px-2">
                  <span className="text-[10px] tracking-[0.3em] uppercase text-primary font-bold mb-3 block">
                    {p.tag}
                  </span>
                  <h4 className="font-display text-2xl font-bold mb-3 group-hover:text-primary transition-colors dark:text-white text-slate-900">
                    {p.title}
                  </h4>
                  <p className="text-sm font-light text-slate-500 dark:text-slate-400 leading-relaxed">
                    {p.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
