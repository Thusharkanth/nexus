import { Navbar, Footer, ScrollProgress, CursorGlow, MagneticButton } from "@/components/SiteChrome";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { 
  Briefcase, CheckCircle2, ArrowUpRight, Check, Plus, Minus, 
  MapPin, Clock, Award, ShieldCheck, Sparkles, GraduationCap,
  ChevronDown
} from "lucide-react";

interface JobPosition {
  id: string;
  title: string;
  department: string;
  location: string;
  duration: string;
  description: string;
  responsibilities: string[];
  requirements: string[];
}

const INTERN_POSITIONS: JobPosition[] = [
  {
    id: "pm-intern",
    title: "Project Manager Intern",
    department: "Product & Delivery",
    location: "Colombo / Remote (Sri Lanka)",
    duration: "3 - 6 Months",
    description: "Work closely with our engineering and design teams to coordinate sprints, manage timelines, and learn the lifecycle of modern digital products.",
    responsibilities: [
      "Assist in coordinating daily standups and sprint planning sessions using Agile methodologies.",
      "Liaise between technical builders and product stakeholders to draft clear feature specifications.",
      "Help track project milestones and release schedules using tools like Jira, Linear, and Trello.",
      "Identify blockers in cross-functional work streams and help resolve them with senior leads."
    ],
    requirements: [
      "Strong analytical, organizational, and excellent verbal/written communication skills.",
      "A passion for technology and building digital systems (basic technical understanding is a plus).",
      "Familiarity with project planning tools and spreadsheets.",
      "Undergraduate or graduate pursuing a degree in Business Information Systems, Management, or Computer Science."
    ]
  },
  {
    id: "uiux-intern",
    title: "UI/UX Designer Intern",
    department: "Creative & Design",
    location: "Colombo / Badulla / Remote",
    duration: "3 - 6 Months",
    description: "Craft modern, accessible, and premium interfaces for SaaS platforms (like ALLFIX) and bespoke web applications under the guidance of senior designers.",
    responsibilities: [
      "Collaborate on wireframes, user flows, and high-fidelity prototype interactions in Figma.",
      "Contribute to and maintain our design token system, bridging UI components with React code.",
      "Participate in user research sessions and translate customer pain points into intuitive design solutions.",
      "Present design iterations to development teams and review implementation accuracy."
    ],
    requirements: [
      "A portfolio showcasing design thinking, typography, clean grid systems, and Figma proficiency.",
      "Strong grasp of responsive layout patterns, dark-mode styling, and design principles.",
      "Basic understanding of frontend markup (HTML/CSS) is a major plus.",
      "Self-driven learner who welcomes constructive feedback and iterates quickly."
    ]
  },
  {
    id: "dev-intern",
    title: "Full Stack Developer Intern",
    department: "Engineering",
    location: "Colombo / Remote (Sri Lanka)",
    duration: "3 - 6 Months",
    description: "Join our senior engineering team to ship production-grade code using React, TypeScript, Node.js, and Tailwind CSS.",
    responsibilities: [
      "Write clean, componentized, and responsive user interface code in React 19.",
      "Assist in building and documenting secure backend APIs and data integration pipelines.",
      "Write unit tests and participate in codebase peer code reviews.",
      "Troubleshoot code issues, optimize load speeds, and help maintain CI/CD workflows."
    ],
    requirements: [
      "Solid foundations in modern JavaScript (ES6+), HTML5, and CSS3 / Tailwind.",
      "Practical experience or personal projects built with React, Node.js, and TypeScript.",
      "Familiarity with Git branching workflows and command-line interfaces.",
      "Student or graduate in Computer Science, Software Engineering, or equivalent practical bootcamps."
    ]
  }
];

const BENEFITS = [
  { icon: Award, title: "Mentorship", desc: "Work directly with senior developers, AI leads, and founders to accelerate your skills." },
  { icon: Clock, title: "Flexible Hours", desc: "Remote-first work options that focus on output and quality rather than punch clocks." },
  { icon: ShieldCheck, title: "Path to Permanent", desc: "High-performing interns will have immediate opportunities for full-time job offers." },
  { icon: Sparkles, title: "Premium Tools", desc: "Access premium licenses (Figma, Linear, Copilot) to sharpen your craft with best-in-class tools." },
];

export default function Careers() {
  const [openJob, setOpenJob] = useState<string | null>("pm-intern");
  const [selectedRole, setSelectedRole] = useState("Project Manager Intern");
  const [submitted, setSubmitted] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleJobSelect = (id: string, title: string) => {
    setOpenJob(openJob === id ? null : id);
    setSelectedRole(title);
  };

  return (
    <div className="relative">
      <ScrollProgress />
      <CursorGlow />
      <Navbar />

      {/* Hero Section */}
      <section className="relative px-6 pb-20 pt-44 sm:pt-52">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[80vh] radial-glow opacity-60" />
        <div className="mx-auto max-w-5xl text-center">
          <motion.div 
            initial={{ opacity: 0, y: 12 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.6 }} 
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-surface/50 px-3 py-1 text-[11px] uppercase tracking-[0.22em] text-muted-foreground"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-neon glow-neon" /> Careers at Nexus
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 30 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.8 }} 
            className="font-display text-balance text-5xl font-semibold leading-[1.02] tracking-tight sm:text-6xl md:text-7xl"
          >
            Build the future of <span className="text-gradient">business.</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.8, delay: 0.15 }} 
            className="mx-auto mt-8 max-w-2xl text-lg text-muted-foreground"
          >
            Join a tight-knit division of engineers and creatives at Nexus. We make world-class 
            systems accessible—combining AI, design, and software into products that scale.
          </motion.p>
        </div>
      </section>

      {/* Why Join Us Section */}
      <section className="relative px-6 py-20 border-t border-border/40 bg-surface/10">
        <div className="mx-auto max-w-5xl">
          <div className="text-center mb-16">
            <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-muted-foreground">What we offer</span>
            <h2 className="mt-3 font-display text-3xl font-semibold sm:text-4xl">Accelerate your tech career</h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-4">
            {BENEFITS.map((b, i) => (
              <motion.div 
                key={b.title} 
                initial={{ opacity: 0, y: 20 }} 
                whileInView={{ opacity: 1, y: 0 }} 
                viewport={{ once: true }} 
                transition={{ delay: i * 0.1 }} 
                className="rounded-2xl border border-border bg-[#020503]/50 p-6 flex flex-col hover:border-neon/30 hover:bg-[#050a06]/40 transition-colors"
              >
                <div className="h-10 w-10 grid place-items-center rounded-xl bg-neon/10 text-neon mb-5">
                  <b.icon className="h-5 w-5" />
                </div>
                <h3 className="font-display text-lg font-semibold text-white mb-2">{b.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{b.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Available Positions */}
      <section id="positions" className="relative px-6 py-20">
        <div className="mx-auto max-w-4xl">
          <div className="flex items-center gap-4 mb-12">
            <span className="text-neon"><Briefcase className="h-4 w-4" /></span>
            <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-muted-foreground">Open Internships</span>
            <div className="h-px flex-1 bg-gradient-to-r from-border to-transparent" />
          </div>

          <div className="space-y-4">
            {INTERN_POSITIONS.map((job) => {
              const isOpen = openJob === job.id;
              return (
                <motion.div
                  key={job.id}
                  layout="position"
                  className={`overflow-hidden rounded-2xl border transition-colors duration-300 ${
                    isOpen ? "border-neon/40 bg-[#020503]/70" : "border-border bg-[#020503]/20 hover:border-border-elevated"
                  }`}
                >
                  <button
                    onClick={() => handleJobSelect(job.id, job.title)}
                    className="flex w-full items-center justify-between gap-6 p-6 text-left"
                  >
                    <div>
                      <span className="text-xs font-semibold uppercase tracking-wider text-neon mb-1.5 block">
                        {job.department}
                      </span>
                      <h3 className="font-display text-xl font-medium text-white sm:text-2xl">{job.title}</h3>
                      <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5" /> {job.location}</span>
                        <span className="flex items-center gap-1.5"><Clock className="h-3.5 w-3.5" /> {job.duration}</span>
                      </div>
                    </div>
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-border text-neon">
                      {isOpen ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-6 pt-2 border-t border-border/30">
                          <p className="text-[15px] leading-relaxed text-muted-foreground mb-6">{job.description}</p>
                          
                          <div className="grid gap-6 md:grid-cols-2">
                            <div>
                              <h4 className="font-display text-sm font-semibold text-white uppercase tracking-wider mb-3 flex items-center gap-2">
                                <CheckCircle2 className="h-4 w-4 text-neon" /> Key Responsibilities
                              </h4>
                              <ul className="space-y-2">
                                {job.responsibilities.map((resp, i) => (
                                  <li key={i} className="text-sm text-muted-foreground flex items-start gap-2.5">
                                    <span className="h-1.5 w-1.5 rounded-full bg-neon/70 shrink-0 mt-2" />
                                    {resp}
                                  </li>
                                ))}
                              </ul>
                            </div>
                            
                            <div>
                              <h4 className="font-display text-sm font-semibold text-white uppercase tracking-wider mb-3 flex items-center gap-2">
                                <GraduationCap className="h-4 w-4 text-neon" /> Requirements
                              </h4>
                              <ul className="space-y-2">
                                {job.requirements.map((req, i) => (
                                  <li key={i} className="text-sm text-muted-foreground flex items-start gap-2.5">
                                    <span className="h-1.5 w-1.5 rounded-full bg-neon/70 shrink-0 mt-2" />
                                    {req}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>

                          <div className="mt-8 flex justify-end">
                            <button
                              onClick={() => {
                                document.getElementById("apply-form")?.scrollIntoView({ behavior: "smooth" });
                              }}
                              className="text-xs font-semibold text-neon border border-neon/30 bg-neon/5 hover:bg-neon/10 px-4 py-2.5 rounded-full transition-colors inline-flex items-center gap-1.5"
                            >
                              Apply for this role <ArrowUpRight className="h-3.5 w-3.5" />
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section id="apply-form" className="relative px-6 py-20 border-t border-border/40">
        <div className="mx-auto max-w-xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
            className="glass-strong relative rounded-3xl border border-border p-8 md:p-10"
          >
            {submitted ? (
              <div className="flex min-h-[380px] flex-col items-center justify-center text-center">
                <div className="grid h-16 w-16 place-items-center rounded-full bg-neon/15 text-neon glow-neon mb-6">
                  <Check className="h-7 w-7" />
                </div>
                <h3 className="font-display text-2xl font-semibold">Application Submitted</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  Thanks for applying. Our technical recruitment team will review your profile and respond within a few days.
                </p>
              </div>
            ) : (
              <>
                <div className="mb-8">
                  <h2 className="font-display text-2xl font-semibold">Join the team</h2>
                  <p className="mt-1.5 text-sm text-muted-foreground">Select a role and upload your credentials. All fields required.</p>
                </div>
                
                <form 
                  onSubmit={(e) => {
                    e.preventDefault();
                    setSubmitted(true);
                  }}
                  className="space-y-4"
                >
                  <div className="relative">
                    <label className="mb-1.5 block text-xs uppercase tracking-[0.2em] text-muted-foreground">Position</label>
                    <button
                      type="button"
                      onClick={() => setDropdownOpen(!dropdownOpen)}
                      className="flex w-full items-center justify-between rounded-xl border border-input bg-[#000]/60 px-4 py-3 text-sm text-white outline-none transition-all focus:border-neon focus:ring-2 focus:ring-ring cursor-pointer"
                    >
                      <span>{selectedRole}</span>
                      <ChevronDown className={`h-4 w-4 text-muted-foreground transition-transform duration-300 ${dropdownOpen ? 'rotate-180 text-neon' : ''}`} />
                    </button>
                    
                    <AnimatePresence>
                      {dropdownOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.2 }}
                          className="absolute left-0 z-50 mt-2 w-full rounded-xl border border-border bg-[#020503] shadow-2xl p-1.5 backdrop-blur-md"
                        >
                          {INTERN_POSITIONS.map((job) => (
                            <button
                              key={job.id}
                              type="button"
                              onClick={() => {
                                setSelectedRole(job.title);
                                setDropdownOpen(false);
                              }}
                              className={`flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-sm transition-colors text-left cursor-pointer ${
                                selectedRole === job.title
                                  ? "bg-neon/10 text-neon font-medium"
                                  : "text-muted-foreground hover:bg-white/5 hover:text-white"
                              }`}
                            >
                              <span>{job.title}</span>
                              {selectedRole === job.title && <Check className="h-4 w-4 text-neon" />}
                            </button>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  <Field label="Full Name" id="applicant-name" placeholder="John Doe" />
                  <Field label="Email Address" id="applicant-email" type="email" placeholder="john@example.com" />
                  <Field label="Resume Link (Google Drive / Dropbox)" id="applicant-resume" type="url" placeholder="https://drive.google.com/..." />
                  <Field label="Portfolio Link (Optional)" id="applicant-portfolio" type="url" placeholder="https://github.com/..." required={false} />

                  <div>
                    <label htmlFor="cover-letter" className="mb-1.5 block text-xs uppercase tracking-[0.2em] text-muted-foreground">Why Nexus?</label>
                    <textarea 
                      id="cover-letter"
                      required 
                      rows={4} 
                      className="w-full resize-none rounded-xl border border-input bg-[#000]/60 px-4 py-3 text-sm text-white outline-none transition-colors focus:border-neon focus:ring-2 focus:ring-ring" 
                      placeholder="Tell us about a project you've worked on that you are proud of..." 
                    />
                  </div>

                  <button type="submit" className="w-full pt-2">
                    <MagneticButton as="button" className="!w-full !justify-center !px-6 !py-3.5 !text-base">
                      Submit Application <ArrowUpRight className="h-4 w-4" />
                    </MagneticButton>
                  </button>
                </form>
              </>
            )}
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

function Field({ 
  label, 
  id, 
  type = "text", 
  placeholder, 
  required = true 
}: { 
  label: string; 
  id: string; 
  type?: string; 
  placeholder: string; 
  required?: boolean;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-xs uppercase tracking-[0.2em] text-muted-foreground">{label}</label>
      <input
        id={id} 
        name={id} 
        type={type} 
        required={required}
        className="w-full rounded-xl border border-input bg-[#000]/60 px-4 py-3 text-sm text-white outline-none transition-colors focus:border-neon focus:ring-2 focus:ring-ring"
        placeholder={placeholder}
      />
    </div>
  );
}
