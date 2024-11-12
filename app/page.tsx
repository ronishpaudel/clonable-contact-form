"use client";
import { useState, useRef } from "react";
import { User, Mail, Plus, X, CheckCircle, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface FormField {
  name: string;
  email: string;
}

export default function ContactForm() {
  const [fields, setFields] = useState<FormField[]>([{ name: "", email: "" }]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<string | null>(null);
  const [activeField, setActiveField] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const addField = () => {
    const newField = { name: "", email: "" };
    setFields([...fields, newField]);
    setActiveField(fields.length);
    scrollToBottom();
  };

  const removeField = (index: number) => {
    if (fields.length > 1) {
      setFields(fields.filter((_, i) => i !== index));
      setActiveField(null);
      scrollToBottom();
    }
  };

  const handleChange = (
    index: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = event.target;
    setFields(
      fields.map((field, i) =>
        i === index ? { ...field, [name]: value } : field
      )
    );
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/users",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(fields),
        }
      );

      if (response.ok) {
        setSubmitStatus("Data submitted successfully!");
        setFields([{ name: "", email: "" }]);
      } else {
        throw new Error("Submission failed");
      }
    } catch (error) {
      setSubmitStatus("Failed to submit data. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const scrollToBottom = () => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 to-gray-900 flex items-center justify-center p-4">
      <motion.div
        className="w-full max-w-md bg-gray-900 rounded-2xl shadow-2xl overflow-hidden border border-gray-700 backdrop-blur-sm sm:max-w-lg lg:max-w-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <form onSubmit={handleSubmit} className="p-4 sm:p-8">
          <h2 className="text-2xl font-bold mb-4 sm:text-3xl text-center bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Contact Information
          </h2>
          <div
            ref={containerRef}
            className="space-y-6 overflow-y-auto max-h-60 sm:max-h-72 px-4 py-2 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800"
          >
            <AnimatePresence mode="popLayout">
              {fields.map((field, index) => (
                <motion.div
                  key={index}
                  className="relative"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                  layoutId={`field-${index}`}
                >
                  <div className="flex flex-col space-y-4">
                    <div className="relative group">
                      <User
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 group-hover:text-purple-400 transition-colors duration-200"
                        size={18}
                      />
                      <input
                        type="text"
                        name="name"
                        value={field.name}
                        onChange={(e) => handleChange(index, e)}
                        onFocus={() => setActiveField(index)}
                        onBlur={() => setActiveField(null)}
                        placeholder="Name"
                        className="w-full pl-10 pr-3 py-3 bg-gray-900 text-gray-100 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-200 ease-in-out placeholder-gray-500"
                        required
                      />
                      <motion.div
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-purple-500"
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: activeField === index ? 1 : 0 }}
                        transition={{ duration: 0.2 }}
                      />
                    </div>
                    <div className="relative group">
                      <Mail
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 group-hover:text-purple-400 transition-colors duration-200"
                        size={18}
                      />
                      <input
                        type="email"
                        name="email"
                        value={field.email}
                        onChange={(e) => handleChange(index, e)}
                        onFocus={() => setActiveField(index)}
                        onBlur={() => setActiveField(null)}
                        placeholder="Email"
                        className="w-full pl-10 pr-3 py-3 bg-gray-900 text-gray-100 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-200 ease-in-out placeholder-gray-500"
                        required
                      />
                      <motion.div
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-purple-500"
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: activeField === index ? 1 : 0 }}
                        transition={{ duration: 0.2 }}
                      />
                    </div>
                  </div>
                  {fields.length > 1 && (
                    <motion.button
                      type="button"
                      onClick={() => removeField(index)}
                      className="absolute -right-2 -top-2 bg-red-500 text-white rounded-full p-1.5 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 transition duration-200 ease-in-out"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      aria-label="Remove field"
                    >
                      <X size={14} />
                    </motion.button>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
          <div className="px-4 py-2 sm:px-8 sm:py-4 bg-gray-900 border-t border-gray-700 flex justify-between items-center">
            <motion.button
              type="button"
              onClick={addField}
              className="flex items-center px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 transition duration-200 ease-in-out"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Plus size={18} className="mr-2" />
              Add Field
            </motion.button>
            <motion.button
              type="submit"
              disabled={isSubmitting}
              className={`px-4 py-2 sm:px-6 sm:py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-opacity-50 transition duration-200 ease-in-out ${
                isSubmitting ? "opacity-50 cursor-not-allowed" : ""
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </motion.button>
          </div>
        </form>
      </motion.div>
      <AnimatePresence>
        {submitStatus && (
          <motion.div
            className={`fixed bottom-4 right-4 p-4 rounded-lg shadow-lg flex items-center space-x-2 ${
              submitStatus.includes("successfully")
                ? "bg-green-500"
                : "bg-red-500"
            } text-white`}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
          >
            {submitStatus.includes("successfully") ? (
              <CheckCircle size={20} />
            ) : (
              <AlertCircle size={20} />
            )}
            <span>{submitStatus}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
