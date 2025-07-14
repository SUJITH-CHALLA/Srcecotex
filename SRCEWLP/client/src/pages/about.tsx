import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Recycle, Leaf, Factory, Users, Star } from "lucide-react";

export default function About() {
  const teamMembers = [
    {
      name: "Lorem Ipsum",
      title: "Lorem Dolor Sit",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      image: "",
    },
    {
      name: "Consectetur Adipiscing",
      title: "Elit Sed Do",
      description: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      image: "",
    },
    {
      name: "Tempor Incididunt",
      title: "Ut Labore Et",
      description: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
      image: "",
    },
  ];

  const testimonials = [
    {
      quote: "SRCECOTEX has transformed our approach to sustainable textiles. Their recycled threads maintain exceptional quality while significantly reducing our environmental impact.",
      name: "Michael Johnson",
      title: "Sustainability Director, Fashion Forward Inc.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100",
    },
    {
      quote: "The consistency and reliability of SRCECOTEX's recycled threads have exceeded our expectations. They're setting the standard for sustainable manufacturing.",
      name: "Sarah Chen",
      title: "VP of Operations, EcoTextile Solutions",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100",
    },
  ];

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
            <h2 className="text-4xl font-bold text-[var(--eco-text)] mb-6">About <span className="text-[var(--eco-primary)]">SRC ECOTEX</span></h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Pioneering sustainable textile manufacturing through innovative plastic recycling technology
            </p>
          </motion.div>



          {/* Company History & Mission */}
          <div className="grid md:grid-cols-2 gap-12 mb-20">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <h3 className="text-3xl font-bold text-[var(--eco-text)] mb-6">From Waste to Wonder: The SRC Ecotex Process</h3>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                At SRC Ecotex, we see value where others see waste. Our entire operation is designed around a single, powerful idea: transforming used PET bottles into a premium, sustainable resource for industries worldwide.
              </p>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                Our process begins with the collection of post-consumer PET bottles. These bottles are then transported to our advanced facility in Nellore, where they undergo a rigorous process of sorting, washing, and shredding to create clean, high-quality plastic flakes.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                These flakes are the raw material for our main product. Through a sophisticated extrusion and spinning process, we melt and convert them into Recycled Polyester Staple Fiber (RPSF)—a strong, versatile, and eco-friendly fiber. This transformation from a single-use bottle to a durable material is at the heart of our commitment to innovation and sustainability.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="bg-[var(--eco-background)] rounded-xl p-8"
            >
              <h3 className="text-3xl font-bold text-[var(--eco-text)] mb-6">Our Impact</h3>
              <div className="space-y-4">
                <div className="flex items-center">
                  <Recycle className="text-[var(--eco-primary)] text-2xl mr-4" />
                  <span className="text-lg"><strong>50,000+</strong> Tons of plastic recycled annually</span>
                </div>
                <div className="flex items-center">
                  <Leaf className="text-[var(--eco-primary)] text-2xl mr-4" />
                  <span className="text-lg"><strong>75%</strong> Reduction in carbon footprint</span>
                </div>
                <div className="flex items-center">
                  <Factory className="text-[var(--eco-primary)] text-2xl mr-4" />
                  <span className="text-lg"><strong>200+</strong> Industry partners worldwide</span>
                </div>
                <div className="flex items-center">
                  <Users className="text-[var(--eco-primary)] text-2xl mr-4" />
                  <span className="text-lg"><strong>500+</strong> Dedicated employees</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Team Profiles */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mb-16"
          >
            <h3 className="text-3xl font-bold text-[var(--eco-text)] text-center mb-12">Meet Our Leadership Team</h3>
            <div className="grid md:grid-cols-3 gap-8">
              {teamMembers.map((member, index) => (
                <motion.div
                  key={member.name}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 + index * 0.1 }}
                >
                  <Card className="text-center hover:shadow-2xl transition-shadow">
                    <CardContent className="p-8">
                      <Avatar className="w-32 h-32 mx-auto mb-6">
                        <AvatarImage src={member.image} alt={member.name} />
                        <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <h4 className="text-xl font-bold text-[var(--eco-text)] mb-2">{member.name}</h4>
                      <p className="text-[var(--eco-primary)] font-semibold mb-4">{member.title}</p>
                      <p className="text-gray-600">{member.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>


        </div>
      </section>
    </div>
  );
}
