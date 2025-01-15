import { useState } from 'react';
import { motion } from 'framer-motion';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';

const FAQSection = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const handleToggle = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index); // Toggle the active FAQ item
  };

  const faqs = [
    { question: 'How does the carpooling system work?', answer: 'Our system allows employees to share rides with colleagues, reducing commuting costs and environmental impact.' },
    { question: 'Is the vehicle and driver authorized?', answer: 'Yes, only authorized vehicles and drivers are allowed in the system to ensure safety.' },
    { question: 'How do I sign up for carpooling?', answer: 'Simply register with your details, including your route and vehicle information, and you can start carpooling.' },
    { question: 'Can I cancel a ride?', answer: 'Yes, you can cancel a ride anytime through your profile before the scheduled time.' },
    { question: 'How can I contact support?', answer: 'You can contact us via the "Contact Us" section or through email for support.' },
  ];

  return (
    <section className="bg-gradient-to-r from-zinc-800 to-zinc-900 text-white py-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <motion.h2
          initial={{ opacity: 0, y: -100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-4xl font-semibold text-center mb-12"
        >
          Frequently Asked Questions
        </motion.h2>

        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.2 + index * 0.2 }}
            >
              <Accordion type="multiple">
                <AccordionItem value={`faq-${index}`}>
                  <AccordionTrigger
                    onClick={() => handleToggle(index)}
                    className="text-xl font-medium hover:text-blue-400 cursor-pointer transition ease-in-out duration-300"
                  >
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent
                    className={`text-gray-300 mt-2 transition-all duration-500 ease-in-out ${activeIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}
                  >
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
