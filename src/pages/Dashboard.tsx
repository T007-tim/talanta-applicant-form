import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Users, Briefcase, Building2, TrendingUp, Search } from "lucide-react";
import Navbar from "@/components/Navbar";

const mockApplicants = [
  { id: 1, name: "Sarah Johnson", email: "sarah@example.com", profession: "Software Engineer", industry: "Technology", specialization: "Frontend Development", skills: ["React", "TypeScript", "CSS"], date: "2026-02-15" },
  { id: 2, name: "Michael Chen", email: "michael@example.com", profession: "Data Scientist", industry: "Finance", specialization: "Machine Learning", skills: ["Python", "SQL", "Machine Learning"], date: "2026-02-14" },
  { id: 3, name: "Emma Williams", email: "emma@example.com", profession: "Product Manager", industry: "Technology", specialization: "B2B SaaS", skills: ["Agile", "Leadership", "Data Analysis"], date: "2026-02-13" },
  { id: 4, name: "James Martinez", email: "james@example.com", profession: "Designer", industry: "Marketing", specialization: "Brand Design", skills: ["UX Design", "Communication", "Problem Solving"], date: "2026-02-12" },
  { id: 5, name: "Aisha Patel", email: "aisha@example.com", profession: "Doctor", industry: "Healthcare", specialization: "Cardiology", skills: ["Leadership", "Communication", "Problem Solving"], date: "2026-02-11" },
  { id: 6, name: "David Kim", email: "david@example.com", profession: "Consultant", industry: "Finance", specialization: "Risk Management", skills: ["Data Analysis", "Project Management", "SQL"], date: "2026-02-10" },
  { id: 7, name: "Olivia Brown", email: "olivia@example.com", profession: "Teacher", industry: "Education", specialization: "Computer Science", skills: ["Python", "JavaScript", "Communication"], date: "2026-02-09" },
  { id: 8, name: "Carlos Ruiz", email: "carlos@example.com", profession: "Architect", industry: "Construction", specialization: "Sustainable Design", skills: ["Project Management", "Leadership", "Problem Solving"], date: "2026-02-08" },
];

const stats = [
  { icon: Users, label: "Total Applicants", value: "2,412", change: "+12%" },
  { icon: Briefcase, label: "Professions", value: "14", change: "+2" },
  { icon: Building2, label: "Industries", value: "12", change: "—" },
  { icon: TrendingUp, label: "This Week", value: "84", change: "+23%" },
];

const Dashboard = () => {
  const [search, setSearch] = useState("");
  const [industryFilter, setIndustryFilter] = useState("all");

  const filtered = mockApplicants.filter((a) => {
    const matchSearch = a.name.toLowerCase().includes(search.toLowerCase()) ||
      a.profession.toLowerCase().includes(search.toLowerCase()) ||
      a.skills.some((s) => s.toLowerCase().includes(search.toLowerCase()));
    const matchIndustry = industryFilter === "all" || a.industry === industryFilter;
    return matchSearch && matchIndustry;
  });

  const industries = [...new Set(mockApplicants.map((a) => a.industry))];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-6 pt-28 pb-20">
        <div className="mb-8 animate-fade-in">
          <h1 className="font-display text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="mt-1 text-muted-foreground">Overview of applicant submissions.</p>
        </div>

        {/* Stats */}
        <div className="mb-10 grid grid-cols-2 gap-4 md:grid-cols-4">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className="rounded-xl border border-border bg-card p-5 transition-all hover:shadow-md animate-fade-in"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <div className="flex items-center justify-between">
                <stat.icon size={20} className="text-primary" />
                <span className="text-xs font-medium text-primary">{stat.change}</span>
              </div>
              <div className="mt-3 font-display text-2xl font-bold text-foreground">{stat.value}</div>
              <div className="text-xs text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center animate-fade-in" style={{ animationDelay: "0.2s" }}>
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search by name, profession, or skill..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9"
            />
          </div>
          <Select value={industryFilter} onValueChange={setIndustryFilter}>
            <SelectTrigger className="w-full sm:w-48">
              <SelectValue placeholder="All Industries" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Industries</SelectItem>
              {industries.map((ind) => <SelectItem key={ind} value={ind}>{ind}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>

        {/* Table */}
        <div className="rounded-xl border border-border bg-card overflow-hidden animate-fade-in" style={{ animationDelay: "0.3s" }}>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/50">
                  <th className="px-5 py-3.5 text-left font-medium text-muted-foreground">Name</th>
                  <th className="px-5 py-3.5 text-left font-medium text-muted-foreground hidden md:table-cell">Profession</th>
                  <th className="px-5 py-3.5 text-left font-medium text-muted-foreground hidden lg:table-cell">Industry</th>
                  <th className="px-5 py-3.5 text-left font-medium text-muted-foreground hidden sm:table-cell">Skills</th>
                  <th className="px-5 py-3.5 text-left font-medium text-muted-foreground">Date</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((applicant) => (
                  <tr key={applicant.id} className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors">
                    <td className="px-5 py-4">
                      <div className="font-medium text-foreground">{applicant.name}</div>
                      <div className="text-xs text-muted-foreground md:hidden">{applicant.profession}</div>
                    </td>
                    <td className="px-5 py-4 text-foreground hidden md:table-cell">{applicant.profession}</td>
                    <td className="px-5 py-4 hidden lg:table-cell">
                      <Badge variant="secondary" className="text-xs">{applicant.industry}</Badge>
                    </td>
                    <td className="px-5 py-4 hidden sm:table-cell">
                      <div className="flex flex-wrap gap-1">
                        {applicant.skills.slice(0, 2).map((s) => (
                          <Badge key={s} variant="outline" className="text-xs">{s}</Badge>
                        ))}
                        {applicant.skills.length > 2 && (
                          <span className="text-xs text-muted-foreground">+{applicant.skills.length - 2}</span>
                        )}
                      </div>
                    </td>
                    <td className="px-5 py-4 text-muted-foreground">{applicant.date}</td>
                  </tr>
                ))}
                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={5} className="px-5 py-12 text-center text-muted-foreground">
                      No applicants found matching your criteria.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        <p className="mt-4 text-center text-xs text-muted-foreground">
          Showing demo data. Enable Lovable Cloud to persist real submissions.
        </p>
      </div>
    </div>
  );
};

export default Dashboard;
