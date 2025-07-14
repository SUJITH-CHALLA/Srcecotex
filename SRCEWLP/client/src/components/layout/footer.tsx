import { Link } from "wouter";
import { Recycle, Phone, Mail, MapPin } from "lucide-react";
import { FaLinkedin, FaTwitter, FaInstagram, FaFacebook } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-[var(--eco-text)] text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-6">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Recycle className="text-[var(--eco-primary)] text-2xl" />
              <span className="text-xl font-bold">SRCECOTEX</span>
            </div>
            <p className="text-gray-300 mb-4">
              Transforming plastic waste into premium textile solutions for a sustainable future.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-[var(--eco-primary)] transition-colors">
                <FaLinkedin className="text-xl" />
              </a>
              <a href="#" className="text-gray-300 hover:text-[var(--eco-primary)] transition-colors">
                <FaTwitter className="text-xl" />
              </a>
              <a href="#" className="text-gray-300 hover:text-[var(--eco-primary)] transition-colors">
                <FaInstagram className="text-xl" />
              </a>
              <a href="#" className="text-gray-300 hover:text-[var(--eco-primary)] transition-colors">
                <FaFacebook className="text-xl" />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Company</h4>
            <ul className="space-y-2">
              <li><Link href="/about" className="text-gray-300 hover:text-[var(--eco-primary)] transition-colors">About Us</Link></li>
              <li><Link href="/careers" className="text-gray-300 hover:text-[var(--eco-primary)] transition-colors">Careers</Link></li>
              <li><Link href="/contact" className="text-gray-300 hover:text-[var(--eco-primary)] transition-colors">Contact Us</Link></li>
            </ul>
          </div>
          

          
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-gray-300">
              <li className="flex items-center"><Phone className="mr-2 h-4 w-4" />+91-863-XXXXXXX</li>
              <li className="flex items-center"><Mail className="mr-2 h-4 w-4" />info@srcecotex.com</li>
              <li className="flex items-center"><MapPin className="mr-2 h-4 w-4" />Nellore, India</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-6 pt-4 text-center text-gray-400">
          <p>&copy; 2024 SRCECOTEX (I) PVT LTD. All rights reserved. | Transforming Plastic into Thread</p>
        </div>
      </div>
    </footer>
  );
}
