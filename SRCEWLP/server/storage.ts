import { 
  users, 
  jobListings, 
  contactSubmissions,
  type User, 
  type InsertUser, 
  type JobListing, 
  type InsertJobListing,
  type ContactSubmission,
  type InsertContactSubmission
} from "@shared/schema";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Job Listings
  getAllJobListings(): Promise<JobListing[]>;
  getActiveJobListings(): Promise<JobListing[]>;
  getJobListing(id: number): Promise<JobListing | undefined>;
  createJobListing(job: InsertJobListing): Promise<JobListing>;
  updateJobListing(id: number, updates: Partial<InsertJobListing>): Promise<JobListing | undefined>;
  deleteJobListing(id: number): Promise<boolean>;
  
  // Contact Submissions
  createContactSubmission(submission: InsertContactSubmission): Promise<ContactSubmission>;
  getAllContactSubmissions(): Promise<ContactSubmission[]>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private jobListings: Map<number, JobListing>;
  private contactSubmissions: Map<number, ContactSubmission>;
  private currentUserId: number;
  private currentJobId: number;
  private currentContactId: number;

  constructor() {
    this.users = new Map();
    this.jobListings = new Map();
    this.contactSubmissions = new Map();
    this.currentUserId = 1;
    this.currentJobId = 1;
    this.currentContactId = 1;
    
    // Initialize with sample job listings
    this.initializeJobListings();
  }

  private initializeJobListings() {
    const initialJobs: Omit<JobListing, 'id'>[] = [
      {
        title: "Senior Sustainability Engineer",
        department: "Engineering",
        location: "Nellore, India",
        type: "Full-time",
        experience: "5+ years",
        description: "Lead innovative projects in plastic-to-thread conversion technology. Design sustainable manufacturing processes and optimize recycling efficiency.",
        requirements: "Bachelor's degree in Engineering, experience with sustainable manufacturing, knowledge of recycling technologies",
        skills: ["Sustainability Engineering", "Process Design", "Recycling Technology", "Environmental Engineering", "Project Management", "CAD Software"],
        googleFormUrl: "https://forms.gle/fNz6c7of3pwQwJad7",
        isActive: true,
        createdAt: new Date(),
      },
      {
        title: "Production Manager",
        department: "Operations",
        location: "Nellore, India",
        type: "Full-time",
        experience: "7+ years",
        description: "Oversee manufacturing operations, ensure quality control, and implement lean production methodologies for sustainable textile production.",
        requirements: "Bachelor's degree in Operations Management, experience in manufacturing, knowledge of quality control systems",
        skills: ["Operations Management", "Quality Control", "Lean Manufacturing", "Team Leadership", "Supply Chain", "Process Optimization"],
        googleFormUrl: "https://forms.gle/fNz6c7of3pwQwJad7",
        isActive: true,
        createdAt: new Date(),
      },
      {
        title: "Environmental Compliance Officer",
        department: "Compliance",
        location: "Nellore, India",
        type: "Full-time",
        experience: "3+ years",
        description: "Ensure regulatory compliance, develop environmental policies, and maintain sustainability certifications across all operations.",
        requirements: "Bachelor's degree in Environmental Science, knowledge of regulatory compliance, certification management experience",
        skills: ["Environmental Compliance", "Regulatory Knowledge", "Policy Development", "Certification Management", "Audit Management", "Risk Assessment"],
        googleFormUrl: "https://forms.gle/fNz6c7of3pwQwJad7",
        isActive: true,
        createdAt: new Date(),
      },
    ];

    initialJobs.forEach(job => {
      const id = this.currentJobId++;
      this.jobListings.set(id, { ...job, id });
    });
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getAllJobListings(): Promise<JobListing[]> {
    return Array.from(this.jobListings.values());
  }

  async getActiveJobListings(): Promise<JobListing[]> {
    return Array.from(this.jobListings.values()).filter(job => job.isActive);
  }

  async getJobListing(id: number): Promise<JobListing | undefined> {
    return this.jobListings.get(id);
  }

  async createJobListing(job: InsertJobListing): Promise<JobListing> {
    const id = this.currentJobId++;
    const newJob: JobListing = { 
      ...job, 
      id, 
      isActive: job.isActive ?? true,
      googleFormUrl: job.googleFormUrl ?? "https://forms.gle/fNz6c7of3pwQwJad7",
      skills: job.skills ?? [],
      createdAt: new Date() 
    };
    this.jobListings.set(id, newJob);
    return newJob;
  }

  async updateJobListing(id: number, updates: Partial<InsertJobListing>): Promise<JobListing | undefined> {
    const existingJob = this.jobListings.get(id);
    if (!existingJob) return undefined;

    const updatedJob: JobListing = { ...existingJob, ...updates };
    this.jobListings.set(id, updatedJob);
    return updatedJob;
  }

  async deleteJobListing(id: number): Promise<boolean> {
    return this.jobListings.delete(id);
  }

  async createContactSubmission(submission: InsertContactSubmission): Promise<ContactSubmission> {
    const id = this.currentContactId++;
    const newSubmission: ContactSubmission = {
      ...submission,
      id,
      company: submission.company ?? null,
      createdAt: new Date(),
    };
    this.contactSubmissions.set(id, newSubmission);
    return newSubmission;
  }

  async getAllContactSubmissions(): Promise<ContactSubmission[]> {
    return Array.from(this.contactSubmissions.values());
  }
}

export const storage = new MemStorage();
