import { useState } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

const MobileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <div className="md:hidden relative w-full">
      {/* Navbar */}
      <div className="flex justify-between items-center p-4 bg-white dark:bg-gray-900 shadow-md z-50">
        <h1 className="text-xl font-bold text-gray-900 dark:text-white">My App</h1>
        <button onClick={toggleMenu} className="p-2">
          {isOpen ? (
            <X className="w-7 h-7 text-gray-900 dark:text-white" />
          ) : (
            <Menu className="w-7 h-7 text-gray-900 dark:text-white" />
          )}
        </button>
      </div>

      {/* Slide Down Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute top-full left-0 w-full bg-white dark:bg-gray-900 shadow-md flex flex-col px-6 py-4 gap-4 z-40"
          >
            <Link
              to="/"
              onClick={toggleMenu}
              className="text-lg font-medium text-gray-900 dark:text-white hover:text-indigo-500 dark:hover:text-indigo-400 transition"
            >
              Home
            </Link>
            <Link
              to="/about"
              onClick={toggleMenu}
              className="text-lg font-medium text-gray-900 dark:text-white hover:text-indigo-500 dark:hover:text-indigo-400 transition"
            >
              About
            </Link>
            <Link
              to="/contact"
              onClick={toggleMenu}
              className="text-lg font-medium text-gray-900 dark:text-white hover:text-indigo-500 dark:hover:text-indigo-400 transition"
            >
              Contact
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MobileMenu;
