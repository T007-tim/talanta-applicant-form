import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, ArrowRight, ArrowLeft, X } from "lucide-react";
import Navbar from "@/components/Navbar";
import { useToast } from "@/hooks/use-toast";

const industries = [
  "Technology", "Healthcare", "Finance", "Education", "Manufacturing",
  "Retail", "Construction", "Marketing", "Legal", "Entertainment",
  "Energy", "Agriculture",
];

const professions = [
  "Software Engineer", "Data Scientist", "Product Manager", "Designer",
  "Doctor", "Nurse", "Teacher", "Accountant", "Lawyer", "Architect",
  "Marketing Manager", "Sales Representative", "Researcher", "Consultant",
];

const commonSkills = [
  "JavaScript", "Python", "React", "Node.js", "SQL", "Project Management",
  "Data Analysis", "Communication", "Leadership", "Problem Solving",
  "Machine Learning", "UX Design", "Cloud Computing", "Agile",
];

const steps = ["Personal Info", "Professional Details", "Skills & Expertise", "Review"];

const Apply = () => {
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const { toast } = useToast();
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    profession: "",
    industry: "",
    specialization: "",
    skills: [] as string[],
    customSkill: "",
  });

  const update = (field: string, value: string) => setForm((prev) => ({ ...prev, [field]: value }));

  const addSkill = (skill: string) => {
    const trimmed = skill.trim();
    if (trimmed && !form.skills.includes(trimmed) && form.skills.length < 15) {
      setForm((prev) => ({ ...prev, skills: [...prev.skills, trimmed], customSkill: "" }));
    }
  };

  const removeSkill = (skill: string) => {
    setForm((prev) => ({ ...prev, skills: prev.skills.filter((s) => s !== skill) }));
  };

  const canNext = () => {
    if (step === 0) return form.fullName.trim().length > 0 && form.email.trim().length > 0;
    if (step === 1) return form.profession.length > 0 && form.industry.length > 0;
    if (step === 2) return form.skills.length > 0;
    return true;
  };

  const handleSubmit = () => {
    toast({ title: "Application Submitted!", description: "Thank you for applying. We'll review your profile shortly." });
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="flex min-h-screen items-center justify-center px-6 pt-20">
          <div className="mx-auto max-w-md text-center animate-scale-in">
            <div className="mx-auto mb-6 inline-flex rounded-full bg-primary/10 p-4">
              <CheckCircle2 size={48} className="text-primary" />
            </div>
            <h1 className="font-display text-3xl font-bold text-foreground">Application Submitted!</h1>
            <p className="mt-3 text-muted-foreground">
              Thank you, <strong className="text-foreground">{form.fullName}</strong>. We've received your application and will be in touch soon.
            </p>
            <Button className="mt-8" onClick={() => { setSubmitted(false); setStep(0); setForm({ fullName: "", email: "", profession: "", industry: "", specialization: "", skills: [], customSkill: "" }); }}>
              Submit Another
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto max-w-2xl px-6 pt-28 pb-20">
        <div className="mb-10 text-center animate-fade-in">
          <h1 className="font-display text-3xl font-bold text-foreground md:text-4xl">Apply Now</h1>
          <p className="mt-2 text-muted-foreground">Tell us about yourself and your expertise.</p>
        </div>

        {/* Step indicator */}
        <div className="mb-10 flex items-center justify-center gap-2">
          {steps.map((label, i) => (
            <div key={label} className="flex items-center gap-2">
              <button
                onClick={() => i < step && setStep(i)}
                className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-semibold transition-all ${
                  i <= step
                    ? "bg-primary text-primary-foreground shadow-md"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                {i < step ? "✓" : i + 1}
              </button>
              {i < steps.length - 1 && (
                <div className={`hidden h-0.5 w-8 sm:block ${i < step ? "bg-primary" : "bg-border"}`} />
              )}
            </div>
          ))}
        </div>

        {/* Form card */}
        <div className="rounded-xl border border-border bg-card p-8 shadow-sm animate-fade-in">
          <h2 className="font-display text-lg font-semibold text-foreground mb-6">{steps[step]}</h2>

          {/* Step 0: Personal Info */}
          {step === 0 && (
            <div className="space-y-5">
              <div>
                <Label htmlFor="fullName">Full Name *</Label>
                <Input id="fullName" placeholder="John Doe" value={form.fullName} onChange={(e) => update("fullName", e.target.value)} className="mt-1.5" />
              </div>
              <div>
                <Label htmlFor="email">Email Address *</Label>
                <Input id="email" type="email" placeholder="john@example.com" value={form.email} onChange={(e) => update("email", e.target.value)} className="mt-1.5" />
              </div>
            </div>
          )}

          {/* Step 1: Professional */}
          {step === 1 && (
            <div className="space-y-5">
              <div>
                <Label>Profession *</Label>
                <Select value={form.profession} onValueChange={(v) => update("profession", v)}>
                  <SelectTrigger className="mt-1.5"><SelectValue placeholder="Select profession" /></SelectTrigger>
                  <SelectContent>
                    {professions.map((p) => <SelectItem key={p} value={p}>{p}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Industry *</Label>
                <Select value={form.industry} onValueChange={(v) => update("industry", v)}>
                  <SelectTrigger className="mt-1.5"><SelectValue placeholder="Select industry" /></SelectTrigger>
                  <SelectContent>
                    {industries.map((ind) => <SelectItem key={ind} value={ind}>{ind}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="specialization">Specialization</Label>
                <Input id="specialization" placeholder="e.g., Frontend Development" value={form.specialization} onChange={(e) => update("specialization", e.target.value)} className="mt-1.5" />
              </div>
            </div>
          )}

          {/* Step 2: Skills */}
          {step === 2 && (
            <div className="space-y-5">
              <div>
                <Label>Select Skills *</Label>
                <div className="mt-2 flex flex-wrap gap-2">
                  {commonSkills.map((skill) => (
                    <button
                      key={skill}
                      onClick={() => form.skills.includes(skill) ? removeSkill(skill) : addSkill(skill)}
                      className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-all ${
                        form.skills.includes(skill)
                          ? "border-primary bg-primary/10 text-primary"
                          : "border-border text-muted-foreground hover:border-primary/50 hover:text-foreground"
                      }`}
                    >
                      {skill}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <Label htmlFor="customSkill">Add Custom Skill</Label>
                <div className="mt-1.5 flex gap-2">
                  <Input
                    id="customSkill"
                    placeholder="Type a skill..."
                    value={form.customSkill}
                    onChange={(e) => update("customSkill", e.target.value)}
                    onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addSkill(form.customSkill); }}}
                  />
                  <Button variant="outline" size="sm" onClick={() => addSkill(form.customSkill)}>Add</Button>
                </div>
              </div>
              {form.skills.length > 0 && (
                <div>
                  <Label>Selected Skills ({form.skills.length})</Label>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {form.skills.map((skill) => (
                      <Badge key={skill} variant="secondary" className="gap-1 pr-1">
                        {skill}
                        <button onClick={() => removeSkill(skill)} className="rounded-full p-0.5 hover:bg-muted">
                          <X size={12} />
                        </button>
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Step 3: Review */}
          {step === 3 && (
            <div className="space-y-4">
              {[
                { label: "Full Name", value: form.fullName },
                { label: "Email", value: form.email },
                { label: "Profession", value: form.profession },
                { label: "Industry", value: form.industry },
                { label: "Specialization", value: form.specialization || "—" },
              ].map((item) => (
                <div key={item.label} className="flex items-center justify-between border-b border-border py-3">
                  <span className="text-sm text-muted-foreground">{item.label}</span>
                  <span className="text-sm font-medium text-foreground">{item.value}</span>
                </div>
              ))}
              <div className="pt-2">
                <span className="text-sm text-muted-foreground">Skills</span>
                <div className="mt-2 flex flex-wrap gap-2">
                  {form.skills.map((s) => <Badge key={s} variant="secondary">{s}</Badge>)}
                </div>
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="mt-8 flex items-center justify-between">
            <Button variant="ghost" onClick={() => setStep((s) => s - 1)} disabled={step === 0} className="gap-1">
              <ArrowLeft size={16} /> Back
            </Button>
            {step < 3 ? (
              <Button onClick={() => setStep((s) => s + 1)} disabled={!canNext()} className="gap-1">
                Next <ArrowRight size={16} />
              </Button>
            ) : (
              <Button onClick={handleSubmit} className="gap-1">
                Submit Application <CheckCircle2 size={16} />
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Apply;
