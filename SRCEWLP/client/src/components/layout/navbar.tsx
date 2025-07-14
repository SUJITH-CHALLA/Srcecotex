import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Recycle } from "lucide-react";

export default function Navbar() {
  const [location] = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
    { href: "/careers", label: "Careers" },
    { href: "/admin", label: "HR Portal" },
  ];

  const isActive = (href: string) => {
    if (href === "/" && location === "/") return true;
    if (href !== "/" && location.startsWith(href)) return true;
    return false;
  };

  return (
    <nav className="fixed w-full top-0 z-50 bg-white/95 backdrop-blur-sm shadow-sm">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <Link href="/" className="flex items-center space-x-2">
            <Recycle className="text-[var(--eco-primary)] text-2xl" />
            <span className="text-xl font-bold text-[var(--eco-text)]">SRCECOTEX</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`relative font-medium transition-all duration-300 transform hover:scale-105 hover:-translate-y-0.5 ${
                  isActive(item.href)
                    ? "text-[var(--eco-primary)]"
                    : "text-[var(--eco-text)] hover:text-[var(--eco-primary)]"
                } after:content-[''] after:absolute after:w-0 after:h-0.5 after:bg-[var(--eco-primary)] after:left-0 after:-bottom-1 after:transition-all after:duration-300 hover:after:w-full ${
                  isActive(item.href) ? "after:w-full" : ""
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px]">
                <div className="flex flex-col space-y-4 mt-8">
                  {navItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`text-lg font-medium transition-all duration-300 transform hover:scale-105 hover:translate-x-2 px-2 py-1 rounded-md hover:bg-[var(--eco-primary)]/10 ${
                        isActive(item.href)
                          ? "text-[var(--eco-primary)] bg-[var(--eco-primary)]/10"
                          : "text-[var(--eco-text)] hover:text-[var(--eco-primary)]"
                      }`}
                      onClick={() => setIsOpen(false)}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}
