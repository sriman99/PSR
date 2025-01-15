// import { motion } from 'framer-motion';
// import Hero from "@/components/ui/comp/Hero";
// import { Navbar } from "@/components/ui/comp/Navbar";
// import AboutUsSection from "@/components/ui/comp/AboutUsSection";
// import FeaturesSection from "@/components/ui/comp/FeaturesSection";
// import FAQSection from "@/components/ui/comp/FAQSection";
// import ContactUsSection from "@/components/ui/comp/ContactUsSection";
// import FooterSection from "@/components/ui/comp/FooterSection";
// // import { AdminDashboard } from "./components/ui/comp/AdminDashboard";
// // import Dashboard from "./components/ui/comp/test/Dashboard";
// // import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
// // import { ThemeProvider } from "@/components/theme-provider";
// // import { EmployeeDashboard } from "./components/ui/comp/EmployeeDashboard";

// // Animated section wrapper component
// const AnimatedSection = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => {
//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 50 }}
//       whileInView={{ opacity: 1, y: 0 }}
//       viewport={{ once: true, margin: "-100px" }}
//       transition={{ duration: 0.8, ease: "easeOut" }}
//       className={className}
//     >
//       {children}
//     </motion.div>
//   );
// };

// // Landing page component with animations
// export const LandingPage = () => {
//   return (
//     <motion.div
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       exit={{ opacity: 0 }}
//       transition={{ duration: 0.5 }}
//       className="relative overflow-hidden"
//     >
//       {/* Animated background gradient */}
//       <div className="fixed inset-0 bg-gradient-to-br from-background to-background/50 pointer-events-none" />

//       {/* Animated dots pattern */}
//       <div className="fixed inset-0 opacity-[0.02] pointer-events-none">
//         <div className="absolute inset-0" style={{
//           backgroundImage: "radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)",
//           backgroundSize: "48px 48px"
//         }} />
//       </div>

//       {/* Navbar with fade-in animation */}
//       <motion.div
//         initial={{ y: -100, opacity: 0 }}
//         animate={{ y: 0, opacity: 1 }}
//         transition={{ duration: 0.6, ease: "easeOut" }}
//       >
//         <Navbar />
//       </motion.div>

//       {/* Hero section with staggered animations */}
//       <motion.div
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ duration: 0.8, delay: 0.2 }}
//       >
//         <Hero />
//       </motion.div>

//       {/* Other sections with scroll animations */}
//       <AnimatedSection>
//         <AboutUsSection />
//       </AnimatedSection>

//       <AnimatedSection>
//         <FeaturesSection />
//       </AnimatedSection>

//       <AnimatedSection>
//         <FAQSection />
//       </AnimatedSection>

//       <AnimatedSection>
//         <ContactUsSection />
//       </AnimatedSection>

//       {/* Footer with fade-in animation */}
//       <motion.div
//         initial={{ opacity: 0, y: 50 }}
//         whileInView={{ opacity: 1, y: 0 }}
//         viewport={{ once: true }}
//         transition={{ duration: 0.8 }}
//       >
//         <FooterSection />
//       </motion.div>
//     </motion.div>
//   );
// };


import { motion, AnimatePresence, useScroll, useSpring, useTransform } from 'framer-motion';
import { useState, useEffect, createContext, useContext } from 'react';
import Hero from "@/components/ui/comp/Hero";
import { Navbar } from "@/components/ui/comp/Navbar";
import AboutUsSection from "@/components/ui/comp/AboutUsSection";
import FeaturesSection from "@/components/ui/comp/FeaturesSection";
import FAQSection from "@/components/ui/comp/FAQSection";
import ContactUsSection from "@/components/ui/comp/ContactUsSection";
import FooterSection from "@/components/ui/comp/FooterSection";
// import { AdminDashboard } from "./components/ui/comp/AdminDashboard";
// import Dashboard from "./components/ui/comp/test/Dashboard";
// import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
// import { ThemeProvider } from "@/components/theme-provider";
// import { EmployeeDashboard } from "./components/ui/comp/EmployeeDashboard";

// Create scroll context
const ScrollContext = createContext({ scrollY: 0, scrollYProgress: 0 });

// Scroll provider component
const ScrollProvider = ({ children }: { children: React.ReactNode }) => {
  const { scrollY, scrollYProgress } = useScroll();
  const smoothScrollY = useSpring(scrollY, { damping: 15, stiffness: 100 });
  const smoothProgress = useSpring(scrollYProgress, { damping: 15, stiffness: 100 });

  return (
    <ScrollContext.Provider value={{ 
      scrollY: smoothScrollY.get(), 
      scrollYProgress: smoothProgress.get() 
    }}>
      {children}
    </ScrollContext.Provider>
  );
};

// Enhanced animated section with parallax and fade effects
const AnimatedSection = ({ 
  children, 
  className = "",
  index = 0 
}: { 
  children: React.ReactNode; 
  className?: string;
  index?: number;
}) => {
  const { scrollYProgress } = useScroll({
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    [0, 1, 1, 0]
  );

  const y = useTransform(
    scrollYProgress,
    [0, 1],
    [100, -100]
  );

  const scale = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    [0.8, 1, 1, 0.8]
  );

  return (
    <motion.div
      style={{ 
        opacity,
        y,
        scale,
      }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={`relative ${className}`}
    >
      {/* Parallax background effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-background/5 to-background/20 pointer-events-none"
        style={{
          y: useTransform(scrollYProgress, [0, 1], [0, -50 * (index + 1)]),
        }}
      />
      
      {/* Content with reveal effect */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, margin: "-100px" }}
        transition={{ duration: 0.6, delay: index * 0.1 }}
        className="relative z-10"
      >
        {children}
      </motion.div>
    </motion.div>
  );
};

// Landing page component with enhanced animations
const LandingPage = () => {
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.3]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);

  return (
    <ScrollProvider>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="relative min-h-screen overflow-hidden"
      >
        {/* Dynamic background pattern */}
        <motion.div 
          className="fixed inset-0 pointer-events-none"
          style={{ opacity: useTransform(scrollYProgress, [0, 1], [0.05, 0.02]) }}
        >
          <div className="absolute inset-0" style={{
            backgroundImage: "radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)",
            backgroundSize: "48px 48px"
          }} />
        </motion.div>

        {/* Navbar with scroll-aware animations */}
        <motion.div
          style={{ 
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            zIndex: 50,
            backgroundColor: useTransform(
              scrollYProgress,
              [0, 0.1],
              ['rgba(0,0,0,0)', 'rgba(0,0,0,0.8)']
            )
          }}
        >
          <Navbar />
        </motion.div>

        {/* Hero section with parallax effect */}
        <motion.div
          style={{ opacity, scale }}
          className="relative z-10"
        >
          <Hero />
        </motion.div>

        {/* Sections with enhanced scroll animations */}
        <AnimatedSection index={1} className="mt-20">
          <AboutUsSection />
        </AnimatedSection>

        <AnimatedSection index={2}>
          <FeaturesSection />
        </AnimatedSection>

        <AnimatedSection index={3}>
          <FAQSection />
        </AnimatedSection>

        <AnimatedSection index={4}>
          <ContactUsSection />
        </AnimatedSection>

        {/* Footer with reveal animation */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative z-10"
        >
          <FooterSection />
        </motion.div>
      </motion.div>
    </ScrollProvider>
  );
};