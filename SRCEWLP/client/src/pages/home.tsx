import { motion } from "framer-motion";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import RecyclingProcess from "@/components/animations/recycling-process";
import { FaLinkedin, FaTwitter, FaInstagram, FaFacebook } from "react-icons/fa";
import backgroundImage from "@assets/2lltgp3d4y_Medium_WW2131424_1752508513435.jpg";

export default function Home() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-32">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${backgroundImage})`
        }}
      />
      <div className="absolute inset-0 hero-gradient opacity-90" />
      
      <div className="relative z-10 container mx-auto px-4 text-center text-white">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="fade-in"
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            SRCECOTEX <span className="text-green-200">(I)</span> PVT LTD
          </h1>
          <p className="text-2xl md:text-3xl mb-8 text-green-100">
            "Transforming Plastic into Thread"
          </p>
          <p className="text-lg md:text-xl mb-12 max-w-3xl mx-auto leading-relaxed">
            Leading the sustainable revolution in textile manufacturing by converting plastic waste into high-quality threads, 
            creating a circular economy that benefits both industry and environment.
          </p>
        </motion.div>
        
        {/* Recycling Process Animation */}
        <RecyclingProcess />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="flex flex-col md:flex-row gap-4 justify-center items-center mb-12"
        >
          <Link href="/about">
            <Button 
              variant="outline" 
              className="button-hover border-2 border-white bg-transparent text-white hover:bg-white hover:text-[var(--eco-primary)] font-semibold py-4 px-8 rounded-lg"
            >
              Learn More About Our Process
            </Button>
          </Link>
          <Link href="/careers">
            <Button 
              variant="outline" 
              className="button-hover border-2 border-white bg-transparent text-white hover:bg-white hover:text-[var(--eco-primary)] font-semibold py-4 px-8 rounded-lg"
            >
              Join Our Team
            </Button>
          </Link>
          <Link href="/contact">
            <Button 
              variant="outline" 
              className="button-hover border-2 border-white bg-transparent text-white hover:bg-white hover:text-[var(--eco-primary)] font-semibold py-4 px-8 rounded-lg"
            >
              Contact Us
            </Button>
          </Link>
        </motion.div>

        {/* Social Media Handles */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-12 mb-20"
        >
          <p className="text-lg mb-4">Follow Our Sustainability Journey</p>
          <div className="flex justify-center space-x-6">
            <a href="#" className="text-white hover:text-green-200 transition-colors">
              <FaLinkedin className="text-2xl" />
            </a>
            <a href="#" className="text-white hover:text-green-200 transition-colors">
              <FaTwitter className="text-2xl" />
            </a>
            <a href="#" className="text-white hover:text-green-200 transition-colors">
              <FaInstagram className="text-2xl" />
            </a>
            <a href="#" className="text-white hover:text-green-200 transition-colors">
              <FaFacebook className="text-2xl" />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
