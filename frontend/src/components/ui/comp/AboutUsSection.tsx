// import { Button } from '@/components/ui/button';
// import { motion } from 'framer-motion';

// const AboutUsSection = () => {
//   return (
//     <section className="bg-zinc-800 text-white py-20">
//       <div className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-col lg:flex-row items-center justify-between gap-10">
//         {/* Text Content */}
//         <motion.div
//           initial={{ opacity: 0, x: -100 }}
//           animate={{ opacity: 1, x: 0 }}
//           transition={{ duration: 1 }}
//           className="max-w-xl space-y-6"
//         >
//           <h2 className="text-4xl lg:text-5xl font-semibold leading-tight">
//             About Our Corporate Carpooling Platform
//           </h2>
//           <p className="text-lg lg:text-xl text-gray-300">
//             Our platform enables employees to share rides, reduce commute costs, and minimize their carbon footprint. Join us in creating a more sustainable and efficient commuting experience.
//           </p>

//           {/* Benefits List */}
//           <ul className="space-y-4">
//             <motion.li
//               initial={{ opacity: 0, x: -50 }}
//               animate={{ opacity: 1, x: 0 }}
//               transition={{ duration: 1, delay: 0.5 }}
//               className="flex items-center gap-3"
//             >
//               <span className="text-blue-500">✔</span> Save money on your commute
//             </motion.li>
//             <motion.li
//               initial={{ opacity: 0, x: -50 }}
//               animate={{ opacity: 1, x: 0 }}
//               transition={{ duration: 1, delay: 0.7 }}
//               className="flex items-center gap-3"
//             >
//               <span className="text-blue-500">✔</span> Reduce environmental impact
//             </motion.li>
//             <motion.li
//               initial={{ opacity: 0, x: -50 }}
//               animate={{ opacity: 1, x: 0 }}
//               transition={{ duration: 1, delay: 0.9 }}
//               className="flex items-center gap-3"
//             >
//               <span className="text-blue-500">✔</span> Convenient, user-friendly platform
//             </motion.li>
//           </ul>

//           {/* Call-to-Action Button */}
//           <div className="mt-8">
//             <Button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-lg rounded-lg shadow-lg transition-transform transform hover:scale-105">
//               Get Started Now
//             </Button>
//           </div>
//         </motion.div>

//         {/* Illustration */}
//         <motion.div
//           initial={{ opacity: 0, x: 100 }}
//           animate={{ opacity: 1, x: 0 }}
//           transition={{ duration: 1 }}
//           className="mt-10 lg:mt-0"
//         >
//           <img
//             src="/assets/about-us-illustration.svg" // Placeholder image path
//             alt="About Us Illustration"
//             className="w-full max-w-md lg:max-w-xl"
//           />
//         </motion.div>
//       </div>
//     </section>
//   );
// };

// export default AboutUsSection;


import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import aboutus from '@/assets/aboutus.jpg';

const AboutUsSection = () => {
  return (
    <section className="bg-gradient-to-r from-zinc-800 to-zinc-600 text-white py-20">
        
      <div className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-col lg:flex-row items-center justify-between gap-10">
        {/* Text Content */}
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="max-w-xl space-y-6"
        >
          <h2 className="text-4xl lg:text-5xl font-semibold leading-tight">
            About Our Corporate Carpooling Platform
          </h2>
          <p className="text-lg lg:text-xl text-gray-300">
            Our platform enables employees to share rides, reduce commute costs, and minimize their carbon footprint. Join us in creating a more sustainable and efficient commuting experience.
          </p>

          {/* Benefits List */}
          <ul className="space-y-4">
            <motion.li
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="flex items-center gap-3"
            >
              <span className="text-blue-500">✔</span> Save money on your commute
            </motion.li>
            <motion.li
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.7 }}
              className="flex items-center gap-3"
            >
              <span className="text-blue-500">✔</span> Reduce environmental impact
            </motion.li>
            <motion.li
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.9 }}
              className="flex items-center gap-3"
            >
              <span className="text-blue-500">✔</span> Convenient, user-friendly platform
            </motion.li>
          </ul>

          {/* Call-to-Action Button */}
          <div className="mt-8">
            <Button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-lg rounded-lg shadow-lg transition-transform transform hover:scale-105">
              Get Started Now
            </Button>
          </div>
        </motion.div>

        {/* Illustration */}
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="mt-10 lg:mt-0"
        >
          <img
            src={aboutus} // Placeholder image path
            alt="About Us Illustration"
            className="w-full max-w-md lg:max-w-xl"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default AboutUsSection;
