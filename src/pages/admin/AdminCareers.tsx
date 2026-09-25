import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Plus, Edit2, Trash2, Eye, Download, Search,
  Briefcase, MapPin, Clock, Users, CheckCircle, XCircle,
  Mail, Phone, FileText
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { JOB_TYPES } from "@/types/career";
import { useAuth } from "@/context/AuthContext";
import { CareerService } from "@/lib/api";
import { toast } from "sonner";

import type { ApiCareerJob, ApiCareerApplication } from "@/types/career";

/* ─── Status badge helpers ─── */
const appStatusConfig = {
  new: { label: "New", class: "bg-blue-100 text-blue-700 border-blue-200" },
  reviewing: { label: "Reviewing", class: "bg-amber-100 text-amber-700 border-amber-200" },
  shortlisted: { label: "Shortlisted", class: "bg-emerald-100 text-emerald-700 border-emerald-200" },
  rejected: { label: "Rejected", class: "bg-red-100 text-red-700 border-red-200" },
  hired: { label: "Hired", class: "bg-purple-100 text-purple-700 border-purple-200" },
};

const emptyJobForm = {
  title: "",
  department: "",
  location: "",
  type: "full-time" as ApiCareerJob["type"],
  description: "",
  requirements: "",
  is_active: 1,
};

export default function AdminCareers() {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState<"jobs" | "applications">("jobs");
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  /* Job dialog state */
  const [showJobDialog, setShowJobDialog] = useState(false);
  const [editingJob, setEditingJob] = useState<ApiCareerJob | null>(null);
  const [jobForm, setJobForm] = useState(emptyJobForm);

  /* Application detail dialog */
  const [selectedApp, setSelectedApp] = useState<ApiCareerApplication | null>(null);
  const [appStatus, setAppStatus] = useState<ApiCareerApplication["status"]>("new");

  /* ─── Fetch Queries ─── */
  const { data: jobsData, isLoading: jobsLoading } = useQuery({
    queryKey: ["adminCareerJobs"],
    queryFn: () => CareerService.fetchAdminCareerJobs(),
  });

  const { data: appsData, isLoading: appsLoading } = useQuery({
    queryKey: ["adminApplications", searchQuery, statusFilter],
    queryFn: () => CareerService.fetchAdminApplications({
      search: searchQuery || undefined,
      status: statusFilter === "all" ? undefined : (statusFilter as any),
    }),
  });

  const jobs = jobsData?.jobs || [];
  const applications = appsData?.applications || [];

  /* ─── Job Mutations ─── */
  const createJobMutation = useMutation({
    mutationFn: (data: Partial<ApiCareerJob>) => CareerService.createAdminCareerJob(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["adminCareerJobs"] });
      queryClient.invalidateQueries({ queryKey: ["publicCareerJobs"] });
      toast.success("Job listing created successfully & posted live to Careers page.");
      setShowJobDialog(false);
    },
    onError: () => toast.error("Failed to create job listing."),
  });

  const updateJobMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<ApiCareerJob> }) =>
      CareerService.updateAdminCareerJob(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["adminCareerJobs"] });
      queryClient.invalidateQueries({ queryKey: ["publicCareerJobs"] });
      toast.success("Job listing updated successfully.");
      setShowJobDialog(false);
    },
    onError: () => toast.error("Failed to update job listing."),
  });

  const deleteJobMutation = useMutation({
    mutationFn: (id: number) => CareerService.deleteAdminCareerJob(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["adminCareerJobs"] });
      queryClient.invalidateQueries({ queryKey: ["publicCareerJobs"] });
      toast.success("Job listing deleted.");
    },
    onError: () => toast.error("Failed to delete job listing."),
  });

  const updateApplicationMutation = useMutation({
    mutationFn: ({ id, status }: { id: number; status: ApiCareerApplication["status"] }) =>
      CareerService.updateAdminApplication(id, { status }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["adminApplications"] });
      toast.success("Application status updated.");
      setSelectedApp(null);
    },
    onError: () => toast.error("Failed to update application status."),
  });

  /* ─── Handlers ─── */
  const openNewJob = () => {
    setEditingJob(null);
    setJobForm(emptyJobForm);
    setShowJobDialog(true);
  };

  const openEditJob = (job: ApiCareerJob) => {
    setEditingJob(job);
    setJobForm({
      title: job.title,
      department: job.department,
      location: job.location,
      type: job.type,
      description: job.description,
      requirements: job.requirements || "",
      is_active: job.is_active,
    });
    setShowJobDialog(true);
  };

  const saveJob = () => {
    if (editingJob) {
      updateJobMutation.mutate({ id: editingJob.id, data: jobForm });
    } else {
      createJobMutation.mutate(jobForm);
    }
  };

  const handleDeleteJob = (id: number) => {
    if (confirm("Delete this job listing?")) {
      deleteJobMutation.mutate(id);
    }
  };

  const toggleJobActive = (job: ApiCareerJob) => {
    updateJobMutation.mutate({
      id: job.id,
      data: { is_active: job.is_active ? 0 : 1 },
    });
  };

  /* ─── Summary stats ─── */
  const stats = [
    { label: "Active Jobs", value: jobs.filter((j) => j.is_active === 1).length, icon: Briefcase, color: "text-blue-600", bg: "bg-blue-50" },
    { label: "Total Applications", value: applications.length, icon: Users, color: "text-emerald-600", bg: "bg-emerald-50" },
    { label: "New (Unreviewed)", value: applications.filter((a) => a.status === "new").length, icon: Mail, color: "text-orange-600", bg: "bg-orange-50" },
    { label: "Shortlisted", value: applications.filter((a) => a.status === "shortlisted").length, icon: CheckCircle, color: "text-purple-600", bg: "bg-purple-50" },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Career Management</h1>
          <p className="text-muted-foreground mt-1">
            Manage job listings and review applicant submissions.
          </p>
        </div>
        {activeTab === "jobs" && (
          <Button onClick={openNewJob} className="gap-2">
            <Plus className="w-4 h-4" /> Post New Job
          </Button>
        )}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s) => (
          <Card key={s.label}>
            <CardContent className="pt-5">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{s.label}</p>
                  <p className="text-3xl font-bold mt-1">{s.value}</p>
                </div>
                <div className={`p-2.5 rounded-xl ${s.bg}`}>
                  <s.icon className={`w-5 h-5 ${s.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex gap-1 border-b border-border">
        {(["jobs", "applications"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-5 py-3 text-sm font-semibold capitalize transition-colors border-b-2 -mb-px ${
              activeTab === tab
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            {tab === "jobs" ? `Job Listings (${jobs.length})` : `Applications (${applications.length})`}
          </button>
        ))}
      </div>

      {/* ─── JOB LISTINGS TAB ─── */}
      {activeTab === "jobs" && (
        <div className="space-y-4">
          {jobsLoading ? (
            <div className="text-center py-12 text-muted-foreground">Loading jobs...</div>
          ) : (
            jobs.map((job) => (
              <Card key={job.id} className="hover:shadow-md transition-shadow">
                <CardContent className="pt-5">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-bold text-foreground text-lg">{job.title}</h3>
                        <span className={`text-xs px-2.5 py-0.5 rounded-full font-semibold border ${
                          job.is_active === 1 ? "bg-emerald-50 text-emerald-700 border-emerald-200" : "bg-slate-100 text-slate-500 border-slate-200"
                        }`}>
                          {job.is_active === 1 ? "Active" : "Inactive"}
                        </span>
                      </div>
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-sm text-muted-foreground mb-3">
                        <span className="flex items-center gap-1"><Briefcase className="w-3.5 h-3.5" /> {job.department}</span>
                        <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" /> {job.location}</span>
                        <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {job.type.charAt(0).toUpperCase() + job.type.slice(1).replace("-", " ")}</span>
                      </div>
                      <p className="text-sm text-muted-foreground line-clamp-2">{job.description}</p>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <Button variant="outline" size="sm" onClick={() => toggleJobActive(job)}>
                        {job.is_active === 1 ? <XCircle className="w-4 h-4 text-muted-foreground" /> : <CheckCircle className="w-4 h-4 text-emerald-600" />}
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => openEditJob(job)}>
                        <Edit2 className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => handleDeleteJob(job.id)}>
                        <Trash2 className="w-4 h-4 text-destructive" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
          {!jobsLoading && jobs.length === 0 && (
            <div className="text-center py-16 text-muted-foreground">
              <Briefcase className="w-10 h-10 mx-auto mb-3 opacity-30" />
              <p className="font-medium">No job listings yet.</p>
              <Button variant="outline" className="mt-3" onClick={openNewJob}>Post First Job</Button>
            </div>
          )}
        </div>
      )}

      {/* ─── APPLICATIONS TAB ─── */}
      {activeTab === "applications" && (
        <div className="space-y-4">
          {/* Filters */}
          <div className="flex flex-wrap gap-3">
            <div className="relative flex-1 min-w-[200px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search by name, position, email…"
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-44">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="new">New</SelectItem>
                <SelectItem value="reviewing">Reviewing</SelectItem>
                <SelectItem value="shortlisted">Shortlisted</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
                <SelectItem value="hired">Hired</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Applications list */}
          <div className="overflow-x-auto rounded-xl border border-border">
            <table className="w-full text-sm">
              <thead className="bg-muted/50">
                <tr>
                  {["Applicant", "Position", "Phone", "Experience", "Applied On", "Status", "Actions"].map((h) => (
                    <th key={h} className="text-left px-4 py-3 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {appsLoading ? (
                  <tr>
                    <td colSpan={7} className="text-center py-6 text-muted-foreground">Loading applications...</td>
                  </tr>
                ) : (
                  applications.map((app) => {
                    const sc = appStatusConfig[app.status] || appStatusConfig.new;
                    return (
                      <tr key={app.id} className="hover:bg-muted/30 transition-colors">
                        <td className="px-4 py-3">
                          <div>
                            <p className="font-semibold text-foreground">{app.name}</p>
                            <p className="text-xs text-muted-foreground">{app.email}</p>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-foreground">{app.job_title || app.position}</td>
                        <td className="px-4 py-3 text-muted-foreground">{app.phone}</td>
                        <td className="px-4 py-3 text-muted-foreground">{app.experience || "N/A"}</td>
                        <td className="px-4 py-3 text-muted-foreground whitespace-nowrap">
                          {new Date(app.created_at).toLocaleDateString("en-IN")}
                        </td>
                        <td className="px-4 py-3">
                          <span className={`text-xs px-2.5 py-0.5 rounded-full font-semibold border ${sc.class}`}>
                            {sc.label}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-1.5">
                            <Button
                              size="sm" variant="outline"
                              onClick={() => { setSelectedApp(app); setAppStatus(app.status); }}
                              className="gap-1 text-xs"
                            >
                              <Eye className="w-3.5 h-3.5" /> View
                            </Button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
            {!appsLoading && applications.length === 0 && (
              <div className="text-center py-12 text-muted-foreground">
                <Users className="w-8 h-8 mx-auto mb-2 opacity-30" />
                <p>No applications match your filter.</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ─── JOB DIALOG ─── */}
      <Dialog open={showJobDialog} onOpenChange={setShowJobDialog}>
        <DialogContent className="max-w-xl">
          <DialogHeader>
            <DialogTitle>{editingJob ? "Edit Job Listing" : "Post New Job"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-3 py-2">
            <Input placeholder="Job Title *" value={jobForm.title} onChange={(e) => setJobForm((f) => ({ ...f, title: e.target.value }))} />
            <div className="grid grid-cols-2 gap-3">
              <Input placeholder="Department *" value={jobForm.department} onChange={(e) => setJobForm((f) => ({ ...f, department: e.target.value }))} />
              <Input placeholder="Location *" value={jobForm.location} onChange={(e) => setJobForm((f) => ({ ...f, location: e.target.value }))} />
            </div>
            <Select value={jobForm.type} onValueChange={(v) => setJobForm((f) => ({ ...f, type: v as ApiCareerJob["type"] }))}>
              <SelectTrigger><SelectValue placeholder="Employment Type" /></SelectTrigger>
              <SelectContent>
                {JOB_TYPES.map((t) => (
                  <SelectItem key={t} value={t}>
                    {t.charAt(0).toUpperCase() + t.slice(1).replace("-", " ")}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Textarea placeholder="Job Description *" rows={3} value={jobForm.description} onChange={(e) => setJobForm((f) => ({ ...f, description: e.target.value }))} />
            <Textarea placeholder="Requirements (one per line)" rows={3} value={jobForm.requirements} onChange={(e) => setJobForm((f) => ({ ...f, requirements: e.target.value }))} />
            <label className="flex items-center gap-2 text-sm font-medium cursor-pointer">
              <input
                type="checkbox"
                checked={jobForm.is_active === 1}
                onChange={(e) => setJobForm((f) => ({ ...f, is_active: e.target.checked ? 1 : 0 }))}
                className="w-4 h-4 rounded"
              />
              Mark as Active (visible on website)
            </label>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowJobDialog(false)}>Cancel</Button>
            <Button onClick={saveJob} disabled={!jobForm.title || !jobForm.department || !jobForm.location}>
              {editingJob ? "Save Changes" : "Post Job"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* ─── APPLICATION DETAIL DIALOG ─── */}
      <Dialog open={!!selectedApp} onOpenChange={() => setSelectedApp(null)}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Application — {selectedApp?.name}</DialogTitle>
          </DialogHeader>
          {selectedApp && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="flex items-center gap-2 text-muted-foreground"><Mail className="w-4 h-4" /> {selectedApp.email}</div>
                <div className="flex items-center gap-2 text-muted-foreground"><Phone className="w-4 h-4" /> {selectedApp.phone}</div>
                <div className="flex items-center gap-2 text-muted-foreground"><Briefcase className="w-4 h-4" /> {selectedApp.job_title || selectedApp.position}</div>
                <div className="flex items-center gap-2 text-muted-foreground"><Clock className="w-4 h-4" /> {selectedApp.experience || "N/A"} experience</div>
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">Cover Letter</p>
                <p className="text-sm text-foreground bg-muted/50 rounded-xl p-3 leading-relaxed">{selectedApp.cover_letter}</p>
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2">Update Status</p>
                <Select value={appStatus} onValueChange={(v) => setAppStatus(v as ApiCareerApplication["status"])}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {Object.entries(appStatusConfig).map(([val, cfg]) => (
                      <SelectItem key={val} value={val}>{cfg.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setSelectedApp(null)}>Close</Button>
            <Button onClick={() => { if (selectedApp) { updateApplicationMutation.mutate({ id: selectedApp.id, status: appStatus }); } }}>
              Save Status
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
