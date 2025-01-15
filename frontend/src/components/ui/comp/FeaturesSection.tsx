// import { Button } from '@/components/ui/button';
// import { Card } from '@/components/ui/card';
// import { motion } from 'framer-motion';
// import { Icon } from '@iconify/react';

// const FeaturesSection = () => {
//   return (
//     <section className="bg-gradient-to-r from-zinc-800 to-zinc-600 text-white py-20">
//       <div className="max-w-7xl mx-auto px-6 lg:px-12">
//         <motion.h2
//           initial={{ opacity: 0, y: -100 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 1 }}
//           className="text-4xl lg:text-5xl font-semibold text-center mb-12"
//         >
//           Key Features of Our Platform
//         </motion.h2>

//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
//           {/* Feature 1 */}
//           <motion.div
//             initial={{ opacity: 0, x: -100 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ duration: 1, delay: 0.2 }}
//           >
//             <Card className="bg-zinc-700 rounded-lg shadow-lg p-8 text-center hover:scale-105 transition-transform">
//               <div className="mb-6">
//                 <Icon icon="mdi:cash" className="w-24 h-24 text-blue-500 mx-auto" />
//               </div>
//               <h3 className="text-xl font-semibold mb-4">Save Money on Commuting</h3>
//               <p className="text-gray-300">
//                 Share rides with colleagues to reduce commuting costs while helping the environment.
//               </p>
//             </Card>
//           </motion.div>

//           {/* Feature 2 */}
//           <motion.div
//             initial={{ opacity: 0, x: 100 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ duration: 1, delay: 0.4 }}
//           >
//             <Card className="bg-zinc-700 rounded-lg shadow-lg p-8 text-center hover:scale-105 transition-transform">
//               <div className="mb-6">
//                 <Icon icon="mdi:leaf" className="w-24 h-24 text-green-500 mx-auto" />
//               </div>
//               <h3 className="text-xl font-semibold mb-4">Reduce Your Environmental Impact</h3>
//               <p className="text-gray-300">
//                 By carpooling, you contribute to reducing carbon emissions and making our world greener.
//               </p>
//             </Card>
//           </motion.div>

//           {/* Feature 3 */}
//           <motion.div
//             initial={{ opacity: 0, x: -100 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ duration: 1, delay: 0.6 }}
//           >
//             <Card className="bg-zinc-700 rounded-lg shadow-lg p-8 text-center hover:scale-105 transition-transform">
//               <div className="mb-6">
//                 <Icon icon="mdi:car" className="w-24 h-24 text-red-500 mx-auto" />
//               </div>
//               <h3 className="text-xl font-semibold mb-4">Convenient and Easy to Use</h3>
//               <p className="text-gray-300">
//                 Our platform is simple to use with an intuitive interface, allowing quick registration and access.
//               </p>
//             </Card>
//           </motion.div>
//         </div>

//         {/* Call-to-Action Button */}
//         <div className="mt-12 text-center">
//           <Button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-lg rounded-lg shadow-lg transition-transform transform hover:scale-105">
//             Explore More Features
//           </Button>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default FeaturesSection;

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { Icon } from '@iconify/react';

const FeaturesSection = () => {
  const [showMore, setShowMore] = useState(false);

  const features = [
    {
      icon: "mdi:cash",
      title: "Save Money on Commuting",
      description: "Share rides with colleagues to reduce commuting costs while helping the environment.",
    },
    {
      icon: "mdi:leaf",
      title: "Reduce Your Environmental Impact",
      description: "By carpooling, you contribute to reducing carbon emissions and making our world greener.",
    },
    {
      icon: "mdi:car",
      title: "Convenient and Easy to Use",
      description: "Our platform is simple to use with an intuitive interface, allowing quick registration and access.",
    },
    {
      icon: "mdi:shield-car",
      title: "Secure and Authorized Vehicles",
      description: "Only authorized drivers and vehicles are available on the platform, ensuring safety and reliability.",
    },
    {
      icon: "mdi:timer-sand",
      title: "Time-Saving",
      description: "Save valuable time by finding the most efficient carpool routes, avoiding traffic and delays.",
    },
    {
      icon: "mdi:account-check",
      title: "Track Ride History",
      description: "Easily track your ride history and view all your previous carpooling journeys for future reference.",
    },
  ];

  return (
    <section className="bg-gradient-to-r from-zinc-800 to-zinc-600 text-white py-20 mt-1">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <motion.h2
          initial={{ opacity: 0, y: -100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-4xl lg:text-5xl font-semibold text-center mb-12"
        >
          Key Features of Our Platform
        </motion.h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Render Initial Features */}
          {features.slice(0, 3).map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.2 + index * 0.2 }}
            >
              <Card className="bg-zinc-700 rounded-lg shadow-lg p-8 text-center hover:scale-105 transition-transform h-full">
                <div className="mb-6">
                  <Icon icon={feature.icon} className="w-24 h-24 text-blue-500 mx-auto" />
                </div>
                <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
                <p className="text-gray-300">{feature.description}</p>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Show More Button */}
        {!showMore && (
          <div className="mt-12 text-center">
            <Button
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-lg rounded-lg shadow-lg transition-transform transform hover:scale-105"
              onClick={() => setShowMore(true)}
            >
              Show More Features
            </Button>
          </div>
        )}

        {/* Render More Features */}
        {showMore && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-10 mt-12"
          >
            {features.slice(3).map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, delay: 0.2 + index * 0.2 }}
              >
                <Card className="bg-zinc-700 rounded-lg shadow-lg p-8 text-center hover:scale-105 transition-transform h-full">
                  <div className="mb-6">
                    <Icon icon={feature.icon} className="w-24 h-24 text-green-500 mx-auto" />
                  </div>
                  <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
                  <p className="text-gray-300">{feature.description}</p>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Show Less Button (after expanding the features) */}
        {showMore && (
          <div className="mt-12 text-center">
            <Button
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-lg rounded-lg shadow-lg transition-transform transform hover:scale-105"
              onClick={() => setShowMore(false)}
            >
              Show Less Features
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturesSection;
