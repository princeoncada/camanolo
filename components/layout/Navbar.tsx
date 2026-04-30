import { useState } from 'react';
import { motion } from 'motion/react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface NavbarProps {
  currentSection: number;
  visualSection: number;
  sections: { id: string; label: string }[];
  onNavigate: (index: number) => void;
}

export function Navbar({
  currentSection,
  visualSection,
  sections,
  onNavigate,
}: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isHome = visualSection === 0;

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{
          y: 0,
          opacity: 1,
          backgroundColor: isHome ? 'rgba(255, 255, 255, 0)' : 'rgba(255, 255, 255, 0.95)',
        }}
        transition={{ duration: 0.3 }}
        className={`fixed top-0 left-0 right-0 z-40 ${isHome ? 'backdrop-blur-sm' : 'backdrop-blur-md border-b border-black/5'}`}
      >
        <div className="max-w- mx-auto px-8 py-5">
          <div className="flex justify-end lg:justify-center items-center">
            {/* Desktop Navigation */}
            <div className="hidden lg:flex gap-12 text-sm tracking-wider">
              {sections.map((section, index) => (
                <button
                  key={section.id}
                  onClick={() => onNavigate(index)}
                  className={`transition-all duration-300 pb-1 hover:cursor-pointer ${
                    currentSection === index
                      ? (isHome ? 'text-white border-b-2 border-white' : 'text-black border-b-2 border-black')
                      : (isHome ? 'text-white/70 hover:text-white' : 'text-gray-500 hover:text-black')
                  }`}
                >
                  {section.label}
                </button>
              ))}
            </div>

            <DropdownMenu modal={false} open={isMenuOpen} onOpenChange={setIsMenuOpen}>
              <DropdownMenuTrigger asChild>
                <button
                  type="button"
                  aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
                  className={`relative h-10 w-10 lg:hidden hover:cursor-pointer ${isHome ? 'text-white' : 'text-black'}`}
                >
                  <motion.span
                    animate={{ rotate: isMenuOpen ? 45 : 0, y: isMenuOpen ? 0 : -7 }}
                    transition={{ duration: 0.2 }}
                    className="absolute left-2 top-1/2 h-0.5 w-6 bg-current"
                  />
                  <motion.span
                    animate={{ width: isMenuOpen ? 0 : "24px" }}
                    transition={{ duration: 0.15 }}
                    className="absolute left-2 top-1/2 h-0.5 w-6 bg-current"
                  />
                  <motion.span
                    animate={{ rotate: isMenuOpen ? -45 : 0, y: isMenuOpen ? 0 : 7 }}
                    transition={{ duration: 0.2 }}
                    className="absolute left-2 top-1/2 h-0.5 w-6 bg-current"
                  />
                </button>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end" className="lg:hidden">
                {sections.map((section, index) => (
                  <DropdownMenuItem
                    key={section.id}
                    aria-current={currentSection === index ? 'page' : undefined}
                    onSelect={(event) => {
                      event.preventDefault();
                      onNavigate(index);
                    }}
                    className={
                      currentSection === index
                        ? 'bg-black text-white hover:bg-black hover:text-white focus:bg-black focus:text-white data-highlighted:bg-black data-highlighted:text-white'
                        : 'text-gray-500'
                    }
                  >
                    {section.label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </motion.nav>
    </>
  );
}
