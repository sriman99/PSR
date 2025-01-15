// // src/components/Hero.tsx
// import { motion } from 'framer-motion';
// import { Button } from "@/components/ui/button"

// const Hero = () => {
//   return (
//     <div className="relative bg-zinc-900 bg-gradient-to-r from-zinc-800 via-zinc-700 to-zinc-600 h-screen flex items-center justify-center text-center px-4">
//       {/* Overlay for contrast */}
//       <div className="absolute inset-0 bg-black opacity-30"></div>

//       {/* Content */}
//       <div className="relative z-10 flex flex-col items-center justify-center text-white">
//         {/* Hero Title */}
//         <motion.h1
//           className="text-5xl sm:text-6xl font-extrabold mb-4 leading-tight"
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ duration: 1 }}
//         >
//           Transform Your Commute with Carpooling
//         </motion.h1>

//         {/* Subheading */}
//         <motion.p
//           className="text-lg sm:text-xl mb-6"
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ duration: 1, delay: 0.5 }}
//         >
//           Save time, money, and the environment. Join us today!
//         </motion.p>

//         {/* CTA Button */}
//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ duration: 1, delay: 1 }}
//         >
//           <Button 
//             className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-8 rounded-full text-xl transition duration-300"
//             onClick={() => window.scrollTo(0, window.innerHeight)} // Scroll on click
//           >
//             Get Started
//           </Button>
//         </motion.div>
        
//         {/* Scroll Indicator */}
//         <motion.div
//           className="mt-10 text-white"
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ duration: 1, delay: 1.5 }}
//         >
//           <span className="text-2xl">↓</span>
//         </motion.div>
//       </div>
//     </div>
//   );
// };

// export default Hero;


import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import carpool from '@/assets/carpool.webp';

const Hero = () => {
  return (
    <section className="relative bg-zinc-900 text-white min-h-screen flex items-center justify-center">
      {/* Background Animation */}
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-blue-800 via-zinc-700 to-blue-900 opacity-70 animate-gradient" />

      {/* Hero Content */}
      <div className="z-10 max-w-7xl mx-auto px-4 lg:px-12 text-center lg:text-left flex flex-col lg:flex-row items-center justify-between gap-15">
        {/* Text Content */}
        <div className="max-w-lg space-y-6">
          <motion.h1
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="text-5xl lg:text-6xl font-semibold leading-tight"
          >
            Transform Your Commute with Corporate Carpooling
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="text-lg lg:text-xl text-gray-300"
          >
            Join our secure and efficient carpooling platform, designed to help employees save time, reduce costs, and contribute to a sustainable future.
          </motion.p>

          {/* Call-to-Action Buttons */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.7, delay: 1 }}
            className="flex gap-4"
          >
            <Button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-lg rounded-lg shadow-lg transition-transform transform hover:scale-105">
              Get Started
            </Button>
            <Button variant="outline" className="px-6 py-3 border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white text-lg rounded-lg shadow-lg transition-transform transform hover:scale-105">
              Learn More
            </Button>
          </motion.div>
        </div>

        {/* Illustration */}
        <motion.div
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1 }}
          className="mt-10 lg:mt-0"
        >
          <img
            src={carpool} // Placeholder image path
            alt="Carpool Illustration"
            className="w-full max-w-md lg:max-w-xl"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;

