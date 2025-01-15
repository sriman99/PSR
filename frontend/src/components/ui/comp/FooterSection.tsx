import { motion } from 'framer-motion';
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from 'react-icons/fa';

const FooterSection = () => {
  return (
    <footer className="bg-zinc-800 text-white py-12 mt-1">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8"
        >
          {/* Company Info */}
          <div className="space-y-4">
            <h4 className="text-2xl font-semibold">Company</h4>
            <p className="text-lg">123 Business Ave, City, Country</p>
            <p className="text-lg">Phone: (123) 456-7890</p>
            <p className="text-lg">Email: contact@company.com</p>
          </div>

          {/* Links */}
          <div className="space-y-4">
            <h4 className="text-2xl font-semibold">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="/privacy-policy" className="hover:text-blue-500 transition duration-300">Privacy Policy</a></li>
              <li><a href="/terms-of-service" className="hover:text-blue-500 transition duration-300">Terms of Service</a></li>
              <li><a href="/about-us" className="hover:text-blue-500 transition duration-300">About Us</a></li>
              <li><a href="/contact-us" className="hover:text-blue-500 transition duration-300">Contact Us</a></li>
            </ul>
          </div>

          {/* Social Media */}
          <div className="space-y-4">
            <h4 className="text-2xl font-semibold">Follow Us</h4>
            <div className="flex space-x-6">
              <motion.a
                href="https://facebook.com"
                target="_blank"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
                className="text-2xl hover:text-blue-500 transition duration-300"
              >
                <FaFacebookF />
              </motion.a>
              <motion.a
                href="https://twitter.com"
                target="_blank"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.2 }}
                className="text-2xl hover:text-blue-400 transition duration-300"
              >
                <FaTwitter />
              </motion.a>
              <motion.a
                href="https://linkedin.com"
                target="_blank"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.4 }}
                className="text-2xl hover:text-blue-600 transition duration-300"
              >
                <FaLinkedinIn />
              </motion.a>
              <motion.a
                href="https://instagram.com"
                target="_blank"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.6 }}
                className="text-2xl hover:text-pink-500 transition duration-300"
              >
                <FaInstagram />
              </motion.a>
            </div>
          </div>
        </motion.div>

        {/* Copyright */}
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="text-center text-lg"
        >
          <p>&copy; 2025 Company Name. All rights reserved.</p>
        </motion.div>
      </div>
    </footer>
  );
};

export default FooterSection;
