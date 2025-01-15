// import Hero from "./components/ui/comp/Hero"
// import { Navbar } from "./components/ui/comp/Navbar"
// import AboutUsSection from "./components/ui/comp/AboutUsSection"
// import FeaturesSection from "./components/ui/comp/FeaturesSection"
// import FAQSection from "./components/ui/comp/FAQSection"
// import ContactUsSection from "./components/ui/comp/ContactUsSection"
// import FooterSection from "./components/ui/comp/FooterSection"
// import AdminDashboard from "./components/ui/comp/AdminDashboard"
// import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'


// export default function App() {
//   return (
//     <div>
//       <Navbar />
//       <Hero />
//       <AboutUsSection />
//       <FeaturesSection />
//       <FAQSection />
//       <ContactUsSection />
//       <FooterSection />
//       <Router>
//         <Routes>
//           <Route path="/admin" element={<AdminDashboard />} />
//         </Routes>
//       </Router>
//     </div>
//   )
// }

// import Hero from "./components/ui/comp/Hero";
// import { Navbar } from "./components/ui/comp/Navbar";
// import AboutUsSection from "./components/ui/comp/AboutUsSection";
// import FeaturesSection from "./components/ui/comp/FeaturesSection";
// import FAQSection from "./components/ui/comp/FAQSection";
// import ContactUsSection from "./components/ui/comp/ContactUsSection";
// import FooterSection from "./components/ui/comp/FooterSection";
// import { AdminDashboard } from "./components/ui/comp/AdminDashboard";
// import Dashboard from "./components/ui/comp/test/Dashboard";
// import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
// import { AnimatePresence } from "framer-motion";
// import { ThemeProvider } from "@/components/theme-provider";
// import {EmployeeDashboard} from "./components/ui/comp/EmployeeDashboard";
// import { LandingPage } from "./components/ui/comp/LandingPage";

// export default function App() {
//   return (
//     <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
//       <Router>
//         <Routes>
//           {/* Route for the landing page */}
//           <Route
//             path="/"
//             element={
//               <>
//                 <Navbar />
//                 <Hero />
//                 <AboutUsSection />
//                 <FeaturesSection />
//                 <FAQSection />
//                 <ContactUsSection />
//                 <FooterSection />
//               </>
//             }
//           />
          
//           {/* Route for the Admin Dashboard */}
//           {/* <Route path="/admin" element={<AdminDashboard />} /> */}
//           <Route path="/admin" element={<Dashboard />} />
//           <Route path="/admin1" element={<AdminDashboard />} />
//           <Route path="/employee" element={<EmployeeDashboard />} />

//         </Routes>
//       </Router>
//     </ThemeProvider>
//   );
// }


// export default function App() {

//   return (
//     <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
//       <AnimatePresence>
//         <Router>
//         <Routes>
//           {/* Route for the landing page */}
//           <Route path="/" element={<LandingPage />} />
          
//           {/* Route for the Admin Dashboard */}
//           <Route path="/admin" element={<Dashboard />} />
//           <Route path="/admin1" element={<AdminDashboard />} />
//           <Route path="/employee" element={<EmployeeDashboard />} />
//         </Routes>
//         </Router>
//       </AnimatePresence>
//     </ThemeProvider>
//   );
// }



import { motion, AnimatePresence, useScroll, useSpring, useTransform } from 'framer-motion';
import { createContext, useContext } from 'react';
import Hero from "./components/ui/comp/Hero";
import { Navbar } from "./components/ui/comp/Navbar";
import AboutUsSection from "./components/ui/comp/AboutUsSection";
import FeaturesSection from "./components/ui/comp/FeaturesSection";
import FAQSection from "./components/ui/comp/FAQSection";
import ContactUsSection from "./components/ui/comp/ContactUsSection";
import FooterSection from "./components/ui/comp/FooterSection";
import { AdminDashboard } from "./components/ui/comp/AdminDashboard";
import Dashboard from "./components/ui/comp/test/Dashboard";
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import { ThemeProvider } from "@/components/theme-provider";
import { EmployeeDashboard } from "./components/ui/comp/EmployeeDashboard";

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

// import { BrowserRouter as Router } from "react-router-dom";

export default function App() {

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Router>
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/admin" element={<Dashboard />} />
            <Route path="/admin1" element={<AdminDashboard />} />
            <Route path="/employee" element={<EmployeeDashboard />} />
          </Routes>
        </AnimatePresence>
      </Router>
    </ThemeProvider>
  );
}