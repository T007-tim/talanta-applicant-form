import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Users, FileText, BarChart3, ArrowRight, Sparkles, Shield, Zap } from "lucide-react";
import Navbar from "@/components/Navbar";

const features = [
  {
    icon: FileText,
    title: "Smart Application Forms",
    description: "Collect detailed applicant data with guided, multi-step forms tailored to your industry.",
  },
  {
    icon: Users,
    title: "Talent Pool Management",
    description: "Organize applicants by profession, specialization, and skills for quick discovery.",
  },
  {
    icon: BarChart3,
    title: "Insightful Analytics",
    description: "Track application trends and talent distribution across industries and roles.",
  },
];

const stats = [
  { value: "2,400+", label: "Applicants" },
  { value: "85%", label: "Completion Rate" },
  { value: "12", label: "Industries" },
  { value: "4.9★", label: "Satisfaction" },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="hero-gradient relative overflow-hidden pt-32 pb-20 md:pt-44 md:pb-32">
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: "radial-gradient(circle at 30% 50%, hsl(173, 58%, 39%, 0.3) 0%, transparent 50%), radial-gradient(circle at 70% 30%, hsl(38, 92%, 50%, 0.15) 0%, transparent 40%)"
        }} />
        <div className="container relative mx-auto px-6 text-center">
          <div className="mx-auto max-w-3xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-xs font-medium text-primary-foreground/80">
              <Sparkles size={14} />
              Streamlined Talent Acquisition
            </div>
            <h1 className="font-display text-4xl font-bold leading-tight tracking-tight text-primary-foreground md:text-6xl lg:text-7xl animate-fade-in">
              Find the Right{" "}
              <span className="text-gradient">Talent</span>,{" "}
              <br className="hidden md:block" />
              Faster
            </h1>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-primary-foreground/70 animate-fade-in" style={{ animationDelay: "0.15s" }}>
              A modern platform for collecting, organizing, and managing applicant profiles across professions, industries, and skill sets.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row animate-fade-in" style={{ animationDelay: "0.3s" }}>
              <Link to="/apply">
                <Button size="lg" className="gap-2 px-8 text-base font-semibold shadow-lg">
                  Start Your Application <ArrowRight size={18} />
                </Button>
              </Link>
              <Link to="/dashboard">
                <Button size="lg" variant="outline" className="px-8 text-base font-semibold border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10">
                  View Dashboard
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="relative -mt-12 z-10">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {stats.map((stat, i) => (
              <div key={stat.label} className="rounded-xl bg-card p-6 text-center shadow-lg animate-fade-in" style={{ animationDelay: `${i * 0.1}s` }}>
                <div className="font-display text-2xl font-bold text-foreground md:text-3xl">{stat.value}</div>
                <div className="mt-1 text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 md:py-32">
        <div className="container mx-auto px-6">
          <div className="mb-16 text-center">
            <h2 className="font-display text-3xl font-bold text-foreground md:text-4xl">
              Everything You Need
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-muted-foreground">
              A comprehensive toolkit to manage your talent pipeline from application to placement.
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {features.map((feature, i) => (
              <div
                key={feature.title}
                className="group rounded-xl border border-border bg-card p-8 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 animate-fade-in"
                style={{ animationDelay: `${i * 0.15}s` }}
              >
                <div className="mb-5 inline-flex rounded-lg bg-primary/10 p-3 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <feature.icon size={24} />
                </div>
                <h3 className="font-display text-lg font-semibold text-foreground">{feature.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="hero-gradient rounded-2xl p-12 text-center md:p-20">
            <div className="mx-auto max-w-2xl">
              <h2 className="font-display text-3xl font-bold text-primary-foreground md:text-4xl">
                Ready to Build Your Talent Pipeline?
              </h2>
              <p className="mt-4 text-primary-foreground/70">
                Start collecting applications today and discover exceptional talent.
              </p>
              <Link to="/apply">
                <Button size="lg" className="mt-8 gap-2 px-8 text-base font-semibold shadow-lg">
                  Apply Now <ArrowRight size={18} />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-12">
        <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-6 md:flex-row">
          <span className="font-display text-lg font-bold text-foreground">
            Talent<span className="text-gradient">Hub</span>
          </span>
          <p className="text-sm text-muted-foreground">© 2026 TalentHub. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
