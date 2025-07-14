import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertJobListingSchema, insertContactSubmissionSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Contact form submission
  app.post("/api/contact", async (req, res) => {
    try {
      const validatedData = insertContactSubmissionSchema.parse(req.body);
      const submission = await storage.createContactSubmission(validatedData);
      
      // Email-only contact system - SMS functionality disabled
      // Store submission for email processing only
      console.log("New contact submission (email-only):", submission);
      
      res.json({ success: true, message: "Contact form submitted successfully" });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: "Invalid form data", details: error.errors });
      } else {
        res.status(500).json({ error: "Failed to submit contact form" });
      }
    }
  });

  // Get all contact submissions (for admin)
  app.get("/api/contact", async (req, res) => {
    try {
      const submissions = await storage.getAllContactSubmissions();
      res.json(submissions);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch contact submissions" });
    }
  });

  // Get active job listings (public)
  app.get("/api/jobs", async (req, res) => {
    try {
      const jobs = await storage.getActiveJobListings();
      res.json(jobs);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch job listings" });
    }
  });

  // Get all job listings (admin)
  app.get("/api/jobs/all", async (req, res) => {
    try {
      const jobs = await storage.getAllJobListings();
      res.json(jobs);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch job listings" });
    }
  });

  // Get single job listing
  app.get("/api/jobs/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const job = await storage.getJobListing(id);
      if (!job) {
        return res.status(404).json({ error: "Job listing not found" });
      }
      res.json(job);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch job listing" });
    }
  });

  // Create new job listing (admin)
  app.post("/api/jobs", async (req, res) => {
    try {
      const validatedData = insertJobListingSchema.parse(req.body);
      const job = await storage.createJobListing(validatedData);
      res.json(job);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: "Invalid job data", details: error.errors });
      } else {
        res.status(500).json({ error: "Failed to create job listing" });
      }
    }
  });

  // Update job listing (admin)
  app.put("/api/jobs/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const validatedData = insertJobListingSchema.partial().parse(req.body);
      const job = await storage.updateJobListing(id, validatedData);
      if (!job) {
        return res.status(404).json({ error: "Job listing not found" });
      }
      res.json(job);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: "Invalid job data", details: error.errors });
      } else {
        res.status(500).json({ error: "Failed to update job listing" });
      }
    }
  });

  // Delete job listing (admin)
  app.delete("/api/jobs/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const deleted = await storage.deleteJobListing(id);
      if (!deleted) {
        return res.status(404).json({ error: "Job listing not found" });
      }
      res.json({ success: true, message: "Job listing deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete job listing" });
    }
  });

  // HR Login endpoint
  app.post("/api/auth/login", async (req, res) => {
    try {
      const { username, password } = req.body;
      
      // Hardcoded credentials as specified
      if (username === "HRSRCE" && password === "@SRCEhr1314") {
        res.json({ success: true, message: "Login successful" });
      } else {
        res.status(401).json({ error: "Invalid credentials" });
      }
    } catch (error) {
      res.status(500).json({ error: "Login failed" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
