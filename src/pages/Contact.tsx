import { Navbar, Footer, ScrollProgress, CursorGlow, MagneticButton } from "@/components/SiteChrome";
import { motion } from "framer-motion";
import { useState } from "react";
import { Mail, MessageCircle, Calendar, MapPin, ArrowUpRight, Check } from "lucide-react";

export default function Contact() {
  const [sent, setSent] = useState(false);
  return (
    <div className="relative">
      <ScrollProgress />
      <CursorGlow />
      <Navbar />
      <section className="relative px-6 pb-32 pt-44 sm:pt-52">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[70vh] radial-glow opacity-70" />
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="font-display text-balance text-5xl font-semibold leading-[1.02] sm:text-6xl md:text-7xl">
              Let's talk about <span className="text-gradient">what's next.</span>
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }} className="mt-6 max-w-lg text-lg text-muted-foreground">
              Tell us about your project. We'll come back within 24 hours with a clear next step — whether that's a demo, a discovery call, or a proposal.
            </motion.p>

            <div className="mt-10 space-y-4">
              {[
                { icon: Mail, label: "Email", value: "hello@nexus.lk" },
                { icon: MessageCircle, label: "WhatsApp", value: "Priority channel · 24/7" },
                { icon: Calendar, label: "Book a call", value: "30-minute consultation" },
                { icon: MapPin, label: "Studios", value: "Colombo · Badulla, Sri Lanka" },
              ].map((c) => (
                <div key={c.label} className="flex items-center gap-4 rounded-2xl border border-border bg-surface/50 p-4">
                  <div className="grid h-11 w-11 place-items-center rounded-xl bg-neon/10 text-neon"><c.icon className="h-5 w-5" /></div>
                  <div>
                    <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{c.label}</div>
                    <div className="font-medium">{c.value}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="glass-strong relative rounded-3xl border border-border p-7 sm:p-9"
          >
            {sent ? (
              <div className="flex min-h-[460px] flex-col items-center justify-center text-center">
                <div className="grid h-16 w-16 place-items-center rounded-full bg-neon/15 text-neon glow-neon"><Check className="h-7 w-7" /></div>
                <h3 className="mt-6 font-display text-2xl font-semibold">Message received</h3>
                <p className="mt-2 max-w-sm text-sm text-muted-foreground">Thanks for reaching out. We'll respond within 24 hours.</p>
              </div>
            ) : (
              <>
                <h2 className="font-display text-2xl font-semibold">Start a project</h2>
                <p className="mt-1 text-sm text-muted-foreground">All fields required.</p>
                <div className="mt-6 space-y-4">
                  <Field label="Name" name="name" />
                  <Field label="Email" name="email" type="email" />
                  <Field label="Company" name="company" />
                  <div>
                    <label className="mb-1.5 block text-xs uppercase tracking-[0.2em] text-muted-foreground">Project</label>
                    <textarea required rows={4} className="w-full resize-none rounded-xl border border-input bg-background/60 px-4 py-3 text-sm outline-none transition-colors focus:border-neon focus:ring-2 focus:ring-ring" placeholder="Tell us what you're building or scaling..." />
                  </div>
                  <button
                    type="button"
                    onClick={() => setSent(true)}
                    className="w-full"
                  >
                    <MagneticButton as="span" className="!w-full !justify-center !px-6 !py-3.5 !text-base">
                      Send message <ArrowUpRight className="h-4 w-4" />
                    </MagneticButton>
                  </button>
                </div>
              </>
            )}
          </motion.div>
        </div>
      </section>
      <Footer />
    </div>
  );
}

function Field({ label, name, type = "text" }: { label: string; name: string; type?: string }) {
  return (
    <div>
      <label htmlFor={name} className="mb-1.5 block text-xs uppercase tracking-[0.2em] text-muted-foreground">{label}</label>
      <input
        id={name} name={name} type={type} required
        className="w-full rounded-xl border border-input bg-background/60 px-4 py-3 text-sm outline-none transition-colors focus:border-neon focus:ring-2 focus:ring-ring"
        placeholder={label}
      />
    </div>
  );
}
