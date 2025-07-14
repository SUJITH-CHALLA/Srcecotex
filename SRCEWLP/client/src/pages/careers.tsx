import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Leaf, Rocket, Users, Building, MapPin, Clock, TrendingUp, ExternalLink } from "lucide-react";
import type { JobListing } from "@shared/schema";

export default function Careers() {
  const { data: jobs, isLoading } = useQuery<JobListing[]>({
    queryKey: ["/api/jobs"],
  });

  const handleApplyForJob = (job: JobListing) => {
    // Open specific Google Form for this job
    window.open(job.googleFormUrl, "_blank");
  };



  return (
    <div className="pt-20">
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-[var(--eco-text)] mb-6">Join Our Mission</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Be part of the sustainable revolution. Build your career while making a positive impact on the environment.
            </p>
          </motion.div>

          {/* Why Join Us */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="grid md:grid-cols-3 gap-8 mb-16"
          >
            <div className="text-center">
              <div className="bg-[var(--eco-primary)]/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Leaf className="text-[var(--eco-primary)] text-2xl" />
              </div>
              <h3 className="text-xl font-bold mb-4">Meaningful Work</h3>
              <p className="text-gray-600">Make a real difference in environmental sustainability while advancing your career.</p>
            </div>
            <div className="text-center">
              <div className="bg-[var(--eco-primary)]/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Rocket className="text-[var(--eco-primary)] text-2xl" />
              </div>
              <h3 className="text-xl font-bold mb-4">Innovation Focus</h3>
              <p className="text-gray-600">Work with cutting-edge technology and be part of industry-leading innovations.</p>
            </div>
            <div className="text-center">
              <div className="bg-[var(--eco-primary)]/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="text-[var(--eco-primary)] text-2xl" />
              </div>
              <h3 className="text-xl font-bold mb-4">Growth Culture</h3>
              <p className="text-gray-600">Continuous learning opportunities and clear career advancement paths.</p>
            </div>
          </motion.div>

          {/* Job Listings */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mb-16"
          >
            <h3 className="text-3xl font-bold text-[var(--eco-text)] text-center mb-12">Current Openings</h3>
            <div className="space-y-6">
              {isLoading ? (
                // Loading skeleton
                [...Array(3)].map((_, index) => (
                  <Card key={index} className="bg-[var(--eco-background)]">
                    <CardContent className="p-8">
                      <Skeleton className="h-8 w-1/3 mb-4" />
                      <div className="flex gap-4 mb-4">
                        <Skeleton className="h-4 w-24" />
                        <Skeleton className="h-4 w-32" />
                        <Skeleton className="h-4 w-20" />
                      </div>
                      <Skeleton className="h-16 w-full mb-4" />
                      <Skeleton className="h-10 w-32 ml-auto" />
                    </CardContent>
                  </Card>
                ))
              ) : jobs && jobs.length > 0 ? (
                jobs.map((job, index) => (
                  <motion.div
                    key={job.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Card className="bg-[var(--eco-background)] hover:shadow-lg transition-shadow">
                      <CardContent className="p-8">
                        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                          <div className="mb-4 lg:mb-0">
                            <h4 className="text-2xl font-bold text-[var(--eco-text)] mb-2">{job.title}</h4>
                            <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-4">
                              <Badge variant="secondary" className="flex items-center gap-1">
                                <Building className="w-3 h-3" />
                                {job.department}
                              </Badge>
                              <Badge variant="secondary" className="flex items-center gap-1">
                                <MapPin className="w-3 h-3" />
                                {job.location}
                              </Badge>
                              <Badge variant="secondary" className="flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                {job.type}
                              </Badge>
                              <Badge variant="secondary" className="flex items-center gap-1">
                                <TrendingUp className="w-3 h-3" />
                                {job.experience}
                              </Badge>
                            </div>
                            <p className="text-gray-600 mb-4">{job.description}</p>
                            
                            {/* Skills Section */}
                            {job.skills && job.skills.length > 0 && (
                              <div className="mb-4">
                                <h5 className="text-sm font-semibold text-[var(--eco-text)] mb-2">Required Skills:</h5>
                                <div className="flex flex-wrap gap-2">
                                  {job.skills.map((skill, skillIndex) => (
                                    <Badge 
                                      key={skillIndex} 
                                      variant="outline" 
                                      className="text-xs bg-[var(--eco-primary)]/10 text-[var(--eco-primary)] border-[var(--eco-primary)]/20"
                                    >
                                      {skill}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                          <div className="text-right">
                            <p className="text-sm text-gray-500 mb-2">
                              Posted {new Date(job.createdAt).toLocaleDateString()}
                            </p>
                            <Button
                              onClick={() => handleApplyForJob(job)}
                              className="bg-[var(--eco-primary)] hover:bg-[var(--eco-secondary)] text-white font-semibold py-3 px-6 rounded-lg transition-colors"
                            >
                              Apply Now
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))
              ) : (
                <Card className="bg-[var(--eco-background)]">
                  <CardContent className="p-8 text-center">
                    <h4 className="text-xl font-semibold mb-2">No Open Positions</h4>
                    <p className="text-gray-600">Check back soon for new opportunities!</p>
                  </CardContent>
                </Card>
              )}
            </div>
          </motion.div>

          {/* Application Process */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="bg-[var(--eco-background)] rounded-2xl p-8 text-center"
          >
            <h3 className="text-2xl font-bold text-[var(--eco-text)] mb-6">How to Apply</h3>
            <p className="text-lg text-gray-600 mb-8">
              Click "Apply Now" on any job listing above to access the specific application form. 
              Each position has its own dedicated application process for better tracking.
            </p>
            <p className="text-sm text-gray-500">
              Your application will be reviewed by our HR team within 48 hours
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
