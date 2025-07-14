import { useState } from "react";
import { motion } from "framer-motion";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { loginHR } from "@/lib/auth";
import { Plus, Edit, Trash2, ExternalLink, Eye, Download, Table, LogOut } from "lucide-react";
import { insertJobListingSchema, type JobListing } from "@shared/schema";

const loginSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
});

const jobFormSchema = insertJobListingSchema;

type LoginFormData = z.infer<typeof loginSchema>;
type JobFormData = z.infer<typeof jobFormSchema>;

export default function Admin() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isJobDialogOpen, setIsJobDialogOpen] = useState(false);
  const [editingJob, setEditingJob] = useState<JobListing | null>(null);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const loginForm = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const jobForm = useForm<JobFormData>({
    resolver: zodResolver(jobFormSchema),
    defaultValues: {
      title: "",
      department: "",
      location: "Nellore, India",
      type: "Full-time",
      experience: "",
      description: "",
      requirements: "",
      skills: [],
      googleFormUrl: "https://forms.gle/fNz6c7of3pwQwJad7",
      isActive: true,
    },
  });

  const { data: jobs, isLoading: jobsLoading } = useQuery<JobListing[]>({
    queryKey: ["/api/jobs/all"],
    enabled: isLoggedIn,
  });

  const loginMutation = useMutation({
    mutationFn: async (data: LoginFormData) => {
      const success = await loginHR(data);
      if (!success) throw new Error("Invalid credentials");
      return success;
    },
    onSuccess: () => {
      setIsLoggedIn(true);
      toast({
        title: "Login Successful",
        description: "Welcome to the HR Dashboard",
      });
    },
    onError: () => {
      toast({
        title: "Login Failed",
        description: "Invalid username or password",
        variant: "destructive",
      });
    },
  });

  const createJobMutation = useMutation({
    mutationFn: async (data: JobFormData) => {
      return await apiRequest("POST", "/api/jobs", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/jobs/all"] });
      queryClient.invalidateQueries({ queryKey: ["/api/jobs"] });
      setIsJobDialogOpen(false);
      jobForm.reset();
      setEditingJob(null);
      toast({
        title: "Job Created",
        description: "Job listing has been created successfully",
      });
    },
    onError: () => {
      toast({
        title: "Failed to Create Job",
        description: "Please try again",
        variant: "destructive",
      });
    },
  });

  const updateJobMutation = useMutation({
    mutationFn: async ({ id, data }: { id: number; data: JobFormData }) => {
      return await apiRequest("PUT", `/api/jobs/${id}`, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/jobs/all"] });
      queryClient.invalidateQueries({ queryKey: ["/api/jobs"] });
      setIsJobDialogOpen(false);
      jobForm.reset();
      setEditingJob(null);
      toast({
        title: "Job Updated",
        description: "Job listing has been updated successfully",
      });
    },
    onError: () => {
      toast({
        title: "Failed to Update Job",
        description: "Please try again",
        variant: "destructive",
      });
    },
  });

  const deleteJobMutation = useMutation({
    mutationFn: async (id: number) => {
      return await apiRequest("DELETE", `/api/jobs/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/jobs/all"] });
      queryClient.invalidateQueries({ queryKey: ["/api/jobs"] });
      toast({
        title: "Job Deleted",
        description: "Job listing has been deleted successfully",
      });
    },
    onError: () => {
      toast({
        title: "Failed to Delete Job",
        description: "Please try again",
        variant: "destructive",
      });
    },
  });

  const handleLogin = (data: LoginFormData) => {
    loginMutation.mutate(data);
  };

  const handleCreateJob = () => {
    setEditingJob(null);
    jobForm.reset();
    setIsJobDialogOpen(true);
  };

  const handleEditJob = (job: JobListing) => {
    setEditingJob(job);
    jobForm.reset({
      title: job.title,
      department: job.department,
      location: job.location,
      type: job.type,
      experience: job.experience,
      description: job.description,
      requirements: job.requirements,
      skills: job.skills || [],
      googleFormUrl: job.googleFormUrl,
      isActive: job.isActive,
    });
    setIsJobDialogOpen(true);
  };

  const handleDeleteJob = (id: number) => {
    if (confirm("Are you sure you want to delete this job listing?")) {
      deleteJobMutation.mutate(id);
    }
  };

  const handleJobSubmit = (data: JobFormData) => {
    if (editingJob) {
      updateJobMutation.mutate({ id: editingJob.id, data });
    } else {
      createJobMutation.mutate(data);
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    loginForm.reset();
    toast({
      title: "Logged Out",
      description: "You have been logged out successfully",
    });
  };

  const handleOpenGoogleSheets = () => {
    const googleSheetsUrl = "https://docs.google.com/spreadsheets/d/your-sheet-id/edit";
    window.open(googleSheetsUrl, "_blank");
  };

  if (!isLoggedIn) {
    return (
      <div className="pt-20">
        <section className="py-20 bg-gradient-to-br from-gray-100 to-gray-200 min-h-screen">
          <div className="container mx-auto px-4">
            <div className="max-w-md mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-center mb-8"
              >
                <h2 className="text-4xl font-bold text-[var(--eco-text)] mb-6">HR Portal</h2>
                <p className="text-xl text-gray-600">Secure access for Human Resources personnel</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <Card className="shadow-2xl">
                  <CardContent className="p-8">
                    <div className="text-center mb-8">
                      <img 
                        src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400" 
                        alt="Professional office environment" 
                        className="w-full h-48 object-cover rounded-lg mb-6" 
                      />
                      <h3 className="text-2xl font-bold text-[var(--eco-text)]">HR Login</h3>
                      <p className="text-gray-600">Access job management dashboard</p>
                    </div>

                    <form onSubmit={loginForm.handleSubmit(handleLogin)} className="space-y-6">
                      <div>
                        <Label className="text-gray-700 font-semibold">Username</Label>
                        <Input
                          {...loginForm.register("username")}
                          className="mt-2"
                        />
                        {loginForm.formState.errors.username && (
                          <p className="text-red-500 text-sm mt-1">{loginForm.formState.errors.username.message}</p>
                        )}
                      </div>
                      <div>
                        <Label className="text-gray-700 font-semibold">Password</Label>
                        <Input
                          {...loginForm.register("password")}
                          type="password"
                          className="mt-2"
                        />
                        {loginForm.formState.errors.password && (
                          <p className="text-red-500 text-sm mt-1">{loginForm.formState.errors.password.message}</p>
                        )}
                      </div>
                      <Button
                        type="submit"
                        disabled={loginMutation.isPending}
                        className="w-full bg-[var(--eco-primary)] hover:bg-[var(--eco-secondary)] text-white font-bold py-4 px-8 rounded-lg transition-colors"
                      >
                        {loginMutation.isPending ? "Logging in..." : "Login to Dashboard"}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="pt-20">
      <section className="py-20 bg-gradient-to-br from-gray-100 to-gray-200 min-h-screen">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-8"
            >
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                <div>
                  <h2 className="text-3xl sm:text-4xl font-bold text-[var(--eco-text)] mb-2">HR Dashboard</h2>
                  <p className="text-lg sm:text-xl text-gray-600">Manage job listings and applications</p>
                </div>
                <Button
                  onClick={handleLogout}
                  variant="outline"
                  className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white w-full sm:w-auto"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </Button>
              </div>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 mb-8">
              {/* Job Listings Management */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <Card className="shadow-lg">
                  <CardHeader>
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                      <CardTitle className="text-xl sm:text-2xl text-[var(--eco-text)]">Job Listings</CardTitle>
                      <Button
                        onClick={handleCreateJob}
                        className="bg-[var(--eco-primary)] hover:bg-[var(--eco-secondary)] text-white w-full sm:w-auto"
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        Add New Job
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4 max-h-96 overflow-y-auto">
                      {jobsLoading ? (
                        [...Array(3)].map((_, index) => (
                          <div key={index} className="border border-gray-200 rounded-lg p-4">
                            <Skeleton className="h-6 w-2/3 mb-2" />
                            <Skeleton className="h-4 w-1/3 mb-2" />
                            <Skeleton className="h-4 w-1/4" />
                          </div>
                        ))
                      ) : jobs && jobs.length > 0 ? (
                        jobs.map((job) => (
                          <div key={job.id} className="border border-gray-200 rounded-lg p-4">
                            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
                              <div className="flex-1">
                                <h4 className="font-bold text-[var(--eco-text)] text-lg">{job.title}</h4>
                                <p className="text-sm text-gray-600 mb-1">{job.department}</p>
                                <p className="text-xs text-gray-500 font-mono break-all mb-2">{job.googleFormUrl}</p>
                                <div className="flex flex-wrap items-center gap-2 mt-1">
                                  <Badge variant={job.isActive ? "default" : "secondary"}>
                                    {job.isActive ? "Active" : "Inactive"}
                                  </Badge>
                                  <span className="text-xs text-gray-500">
                                    Created {new Date(job.createdAt).toLocaleDateString()}
                                  </span>
                                </div>
                              </div>
                              <div className="flex space-x-2 sm:flex-col sm:space-x-0 sm:space-y-2 lg:flex-row lg:space-y-0 lg:space-x-2">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => window.open(job.googleFormUrl, "_blank")}
                                  className="text-green-500 hover:text-green-700 flex-1 sm:flex-none"
                                  title="Open Google Form"
                                >
                                  <ExternalLink className="w-4 h-4 sm:mr-2" />
                                  <span className="hidden sm:inline">Form</span>
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => handleEditJob(job)}
                                  className="text-blue-500 hover:text-blue-700 flex-1 sm:flex-none"
                                >
                                  <Edit className="w-4 h-4 sm:mr-2" />
                                  <span className="hidden sm:inline">Edit</span>
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => handleDeleteJob(job.id)}
                                  className="text-red-500 hover:text-red-700 flex-1 sm:flex-none"
                                >
                                  <Trash2 className="w-4 h-4 sm:mr-2" />
                                  <span className="hidden sm:inline">Delete</span>
                                </Button>
                              </div>
                            </div>
                          </div>
                        ))
                      ) : (
                        <p className="text-gray-500 text-center py-8">No job listings found</p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Google Forms & Spreadsheet Management */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                <Card className="shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-xl sm:text-2xl text-[var(--eco-text)]">Google Forms & Spreadsheet</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {/* Create Google Form Section */}
                      <div className="p-6 bg-green-50 rounded-lg border border-green-200">
                        <div className="flex items-center mb-4">
                          <Plus className="w-6 h-6 text-green-600 mr-3" />
                          <h4 className="text-lg font-semibold text-green-800">Create Google Form</h4>
                        </div>
                        <p className="text-sm text-green-600 mb-4">
                          Create new Google Forms for job applications. Each form should be configured to send responses to the centralized spreadsheet.
                        </p>
                        <Button
                          onClick={() => window.open("https://forms.google.com/create", "_blank")}
                          className="bg-green-600 hover:bg-green-700 text-white w-full sm:w-auto"
                        >
                          <Plus className="w-4 h-4 mr-2" />
                          Create New Google Form
                        </Button>
                      </div>

                      {/* Access Spreadsheet Section */}
                      <div className="p-6 bg-blue-50 rounded-lg border border-blue-200">
                        <div className="flex items-center mb-4">
                          <Table className="w-6 h-6 text-blue-600 mr-3" />
                          <h4 className="text-lg font-semibold text-blue-800">Application Data Spreadsheet</h4>
                        </div>
                        <p className="text-sm text-blue-600 mb-4">
                          Access the centralized spreadsheet containing all application data from various Google Forms. All job applications are automatically collected here.
                        </p>
                        <Button
                          onClick={handleOpenGoogleSheets}
                          className="bg-blue-600 hover:bg-blue-700 text-white w-full sm:w-auto"
                        >
                          <Table className="w-4 h-4 mr-2" />
                          Open Application Spreadsheet
                        </Button>
                      </div>

                      {/* Instructions */}
                      <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                        <h5 className="font-semibold text-gray-700 mb-2">Setup Instructions:</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>1. Create Google Forms using the button above</li>
                          <li>2. Configure each form to send responses to your central spreadsheet</li>
                          <li>3. Copy the form URL and paste it into the job posting Google Form URL field</li>
                          <li>4. Access all application data through the spreadsheet link</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>


          </div>
        </div>

        {/* Job Form Dialog */}
        <Dialog open={isJobDialogOpen} onOpenChange={setIsJobDialogOpen}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto mx-4 sm:mx-0">
            <DialogHeader>
              <DialogTitle>
                {editingJob ? "Edit Job Listing" : "Create New Job Listing"}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={jobForm.handleSubmit(handleJobSubmit)} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label>Job Title</Label>
                  <Input {...jobForm.register("title")} placeholder="e.g. Senior Engineer" />
                  {jobForm.formState.errors.title && (
                    <p className="text-red-500 text-sm">{jobForm.formState.errors.title.message}</p>
                  )}
                </div>
                <div>
                  <Label>Department</Label>
                  <Input {...jobForm.register("department")} placeholder="e.g. Engineering" />
                  {jobForm.formState.errors.department && (
                    <p className="text-red-500 text-sm">{jobForm.formState.errors.department.message}</p>
                  )}
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label>Location</Label>
                  <Input {...jobForm.register("location")} />
                  {jobForm.formState.errors.location && (
                    <p className="text-red-500 text-sm">{jobForm.formState.errors.location.message}</p>
                  )}
                </div>
                <div>
                  <Label>Job Type</Label>
                  <Select onValueChange={(value) => jobForm.setValue("type", value)} defaultValue={jobForm.getValues("type")}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select job type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Full-time">Full-time</SelectItem>
                      <SelectItem value="Part-time">Part-time</SelectItem>
                      <SelectItem value="Contract">Contract</SelectItem>
                      <SelectItem value="Internship">Internship</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label>Experience Required</Label>
                <Input {...jobForm.register("experience")} placeholder="e.g. 3+ years" />
                {jobForm.formState.errors.experience && (
                  <p className="text-red-500 text-sm">{jobForm.formState.errors.experience.message}</p>
                )}
              </div>

              <div>
                <Label>Job Description</Label>
                <Textarea {...jobForm.register("description")} rows={4} placeholder="Describe the role and responsibilities..." />
                {jobForm.formState.errors.description && (
                  <p className="text-red-500 text-sm">{jobForm.formState.errors.description.message}</p>
                )}
              </div>

              <div>
                <Label>Requirements</Label>
                <Textarea {...jobForm.register("requirements")} rows={3} placeholder="List the required qualifications and skills..." />
                {jobForm.formState.errors.requirements && (
                  <p className="text-red-500 text-sm">{jobForm.formState.errors.requirements.message}</p>
                )}
              </div>

              <div>
                <Label>Key Skills</Label>
                <Input 
                  value={jobForm.watch("skills")?.join(", ") || ""}
                  onChange={(e) => {
                    const skillsArray = e.target.value.split(",").map(skill => skill.trim()).filter(skill => skill.length > 0);
                    jobForm.setValue("skills", skillsArray);
                  }}
                  placeholder="e.g. React, TypeScript, Node.js, Project Management"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Enter skills separated by commas. These will be displayed as tags on the careers page.
                </p>
                {jobForm.formState.errors.skills && (
                  <p className="text-red-500 text-sm">{jobForm.formState.errors.skills.message}</p>
                )}
              </div>

              <div>
                <Label>Google Form URL</Label>
                <Input 
                  {...jobForm.register("googleFormUrl")} 
                  placeholder="https://forms.gle/your-form-id"
                  className="font-mono text-sm"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Each job posting should have its own Google Form for applications. When the job is deactivated, the form won't be accessible.
                </p>
                {jobForm.formState.errors.googleFormUrl && (
                  <p className="text-red-500 text-sm">{jobForm.formState.errors.googleFormUrl.message}</p>
                )}
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  {...jobForm.register("isActive")}
                  className="w-4 h-4 text-[var(--eco-primary)] border-gray-300 rounded focus:ring-[var(--eco-primary)]"
                />
                <Label className="text-sm">Active (visible to applicants)</Label>
              </div>

              <div className="flex flex-col sm:flex-row sm:justify-end space-y-2 sm:space-y-0 sm:space-x-2 pt-4">
                <Button type="button" variant="outline" onClick={() => setIsJobDialogOpen(false)} className="w-full sm:w-auto">
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={createJobMutation.isPending || updateJobMutation.isPending}
                  className="bg-[var(--eco-primary)] hover:bg-[var(--eco-secondary)] w-full sm:w-auto"
                >
                  {(createJobMutation.isPending || updateJobMutation.isPending)
                    ? "Saving..."
                    : editingJob
                    ? "Update Job"
                    : "Create Job"}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </section>
    </div>
  );
}
