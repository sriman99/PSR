// import { useState } from 'react';
// import { motion } from 'framer-motion';
// // import { Button, Input, Textarea } from '@shadcn/ui';
// import {Button} from '@/components/ui/button';
// import {Input} from '@/components/ui/input';
// import {Textarea} from '@/components/ui/textarea';
// import contactus from '@/assets/contactus.jpg'

// const ContactUsSection = () => {
//     const [formData, setFormData] = useState({ name: '', email: '', message: '' });
//     const [submitted, setSubmitted] = useState(false);
    
//     const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//       const { name, value } = e.target;
//       setFormData((prev) => ({ ...prev, [name]: value }));
//     };
  
//     const handleSubmit = (e: React.FormEvent) => {
//       e.preventDefault();
//       if (formData.name && formData.email && formData.message) {
//         setSubmitted(true);
//         setFormData({ name: '', email: '', message: '' }); // Clear the form
//       }
//     };
  
//     return (
//       <section className="bg-zinc-800 text-white py-20">
//         <div className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-col-reverse lg:flex-row items-center">
//           <motion.div
//             initial={{ opacity: 0, x: -100 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ duration: 1 }}
//             className="lg:w-1/2 mb-12 lg:mb-0"
//           >
//             {/* Illustration */}
//             <img src={contactus} alt="Contact Illustration" className="w-full h-auto object-cover p-4" />
//           </motion.div>
  
//           <motion.div
//             initial={{ opacity: 0, y: 100 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 1 }}
//             className="lg:w-1/2 space-y-6"
//           >
//             <h2 className="text-4xl font-semibold text-center mb-12">Contact Us</h2>
  
//             {!submitted ? (
//               <motion.form
//                 onSubmit={handleSubmit}
//                 initial={{ opacity: 0, y: 100 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 1 }}
//                 className="space-y-6"
//               >
//                 <div className="space-y-4">
//                   <Input
//                     type="text"
//                     name="name"
//                     value={formData.name}
//                     onChange={handleChange}
//                     placeholder="Your Name"
//                     required
//                     className="bg-zinc-700 text-white border border-zinc-600 focus:ring-blue-400 focus:border-blue-400 transition duration-300"
//                   />
//                   <Input
//                     type="email"
//                     name="email"
//                     value={formData.email}
//                     onChange={handleChange}
//                     placeholder="Your Email"
//                     required
//                     className="bg-zinc-700 text-white border border-zinc-600 focus:ring-blue-400 focus:border-blue-400 transition duration-300"
//                   />
//                   <Textarea
//                     name="message"
//                     value={formData.message}
//                     onChange={handleChange}
//                     placeholder="Your Message"
//                     required
//                     rows={5}
//                     className="bg-zinc-700 text-white border border-zinc-600 focus:ring-blue-400 focus:border-blue-400 transition duration-300"
//                   />
//                 </div>
  
//                 <Button
//                   type="submit"
//                   className="w-full py-3 bg-blue-500 hover:bg-blue-400 text-white font-semibold transition duration-300"
//                 >
//                   Submit
//                 </Button>
//               </motion.form>
//             ) : (
//               <motion.div
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 transition={{ duration: 1 }}
//                 className="text-center text-xl"
//               >
//                 <p>Thank you for reaching out! We will get back to you soon.</p>
//               </motion.div>
//             )}
//           </motion.div>
//         </div>
//       </section>
//     );
//   };
  
//   export default ContactUsSection;


import { useState } from 'react';
import { motion } from 'framer-motion';
// import { Button, Input, Textarea } from '@shadcn/ui';
import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {Textarea} from '@/components/ui/textarea';
import contactus from '@/assets/contactus.jpg'

const ContactUsSection = () => {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [submitted, setSubmitted] = useState(false);
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
    };
  
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (formData.name && formData.email && formData.message) {
        setSubmitted(true);
        setFormData({ name: '', email: '', message: '' }); // Clear the form
      }
    };
  
    return (
      <section className="bg-zinc-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-col-reverse lg:flex-row items-center">
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            className="lg:w-1/2 mb-12 lg:mb-0"
          >
            {/* Illustration */}
            <img src={contactus} alt="Contact Illustration" className="w-full h-auto object-cover p-4" />
          </motion.div>
  
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="lg:w-1/2 space-y-6"
          >
            <h2 className="text-4xl font-semibold text-center mb-12">Contact Us</h2>
  
            {!submitted ? (
              <motion.form
                onSubmit={handleSubmit}
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                className="space-y-6"
              >
                <div className="space-y-4">
                  <Input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your Name"
                    required
                    className="bg-zinc-700 text-white border border-zinc-600 focus:ring-blue-400 focus:border-blue-400 transition duration-300"
                  />
                  <Input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Your Email"
                    required
                    className="bg-zinc-700 text-white border border-zinc-600 focus:ring-blue-400 focus:border-blue-400 transition duration-300"
                  />
                  <Textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Your Message"
                    required
                    rows={5}
                    className="bg-zinc-700 text-white border border-zinc-600 focus:ring-blue-400 focus:border-blue-400 transition duration-300"
                  />
                </div>
  
                <Button
                  type="submit"
                  className="w-full py-3 bg-blue-500 hover:bg-blue-400 text-white font-semibold transition duration-300"
                >
                  Submit
                </Button>
              </motion.form>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
                className="text-center text-xl"
              >
                <p>Thank you for reaching out! We will get back to you soon.</p>
              </motion.div>
            )}
          </motion.div>
        </div>
      </section>
    );
  };
  
  export default ContactUsSection;