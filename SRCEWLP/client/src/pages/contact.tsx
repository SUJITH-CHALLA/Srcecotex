import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Phone, Mail, Clock, MessageSquare } from "lucide-react";

export default function Contact() {

  return (
    <div className="pt-20">
      <section className="py-20 bg-gradient-to-br from-[var(--eco-primary)] to-[var(--eco-secondary)] text-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-6">Get In Touch</h2>
            <p className="text-xl max-w-3xl mx-auto">
              Ready to explore sustainable textile solutions? Let's discuss how we can help transform your business.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form Button */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <Card className="bg-white/10 backdrop-blur-sm border-white/20">
                <CardContent className="p-8 text-center">
                  <h3 className="text-2xl font-bold mb-6 text-white">Get In Touch With Us</h3>
                  <p className="text-white/80 text-lg mb-8">
                    Ready to start your sustainable textile journey? Share your requirements and we'll get back to you promptly.
                  </p>
                  <div className="space-y-4">
                    <Button
                      onClick={() => window.open("https://forms.gle/tLapH1SVHNgDKAnh9", "_blank")}
                      className="w-full bg-white text-[var(--eco-primary)] font-bold py-4 px-8 rounded-lg hover:bg-gray-100 hover:scale-105 transition-all duration-300 text-lg"
                    >
                      <MessageSquare className="mr-2 h-5 w-5" />
                      Contact Us - Fill Form
                    </Button>
                    <p className="text-white/70 text-sm">
                      * Your information will be securely stored in our database
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="space-y-8"
            >
              <div>
                <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
                <div className="space-y-6">
                  <div className="flex items-start">
                    <MapPin className="text-2xl mr-4 mt-1" />
                    <div>
                      <h4 className="font-semibold mb-2">Address</h4>
                      <p>
                        SRC Ecotex (India) Pvt. Ltd.<br />
                        Nellore, Andhra Pradesh, India
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Phone className="text-2xl mr-4 mt-1" />
                    <div>
                      <h4 className="font-semibold mb-2">Phone</h4>
                      <p>+91-172-XXXXXXX</p>
                      <p>+91-98XXX-XXXXX</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Mail className="text-2xl mr-4 mt-1" />
                    <div>
                      <h4 className="font-semibold mb-2">Email</h4>
                      <p>info@srcecotex.com</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Clock className="text-2xl mr-4 mt-1" />
                    <div>
                      <h4 className="font-semibold mb-2">Business Hours</h4>
                      <p>Monday - Saturday: 9:30 AM - 6:00 PM</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Map Integration */}
              <Card className="bg-white/10 backdrop-blur-sm border-white/20">
                <CardContent className="p-6">
                  <h4 className="text-xl font-bold mb-4">Find Us On Map</h4>
                  <div className="rounded-lg overflow-hidden h-64">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3861.4089687154746!2d79.85206251482!3d14.248975290143746!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a4ce531bd492b3f%3A0x20773bbbd0bb8c5!2sSRC%20Ecotex%20(India)%20Pvt.%20Ltd.!5e0!3m2!1sen!2sin!4v1625000000000!5m2!1sen!2sin"
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="SRC Ecotex Location"
                    />
                  </div>
                  <div className="mt-4 text-center">
                    <a
                      href="https://www.google.com/maps/place/SRC+Ecotex+(India)+Pvt.+Ltd./@14.2489752,79.8520625,17z/data=!3m1!4b1!4m6!3m5!1s0x3a4ce531bd492b3f:0x20773bbbd0bb8c5!8m2!3d14.2489752!4d79.8546374!16s%2Fg%2F11vb0y9qj4?entry=ttu&g_ep=EgoyMDI1MDcwOS4wIKXMDSoASAFQAw%3D%3D"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-white hover:text-gray-200 transition-colors"
                    >
                      <MapPin className="mr-2" size={16} />
                      View on Google Maps
                    </a>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
