import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const testimonials = [
  {
    text: "Thank you so much for your help. It's exactly what I've been looking for. LMS is exactly what our business has been lacking.",
    name: "Divya Sharma",
    reviews: "12",
    image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80",
  },
  {
    text: "The platform made learning so interactive and fun. I highly recommend it to everyone!",
    name: "Shruti Verma",
    reviews: "8",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80",
  },
  {
    text: "Excellent support and well-structured content. It saved me a lot of time.",
    name: "Anita Singh",
    reviews: "15",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
  },
];

export default function TestimonialSection() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16 grid grid-cols-1 md:grid-cols-2 items-center gap-6 sm:gap-8 lg:gap-10">
      {/* Left Text Content */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-center md:text-left md:ml-2 lg:ml-10"
      >
        <div className="inline-flex items-center px-4 sm:px-6 py-2 bg-teal-600 text-white rounded-full text-sm font-medium mb-4 sm:mb-6">
              Testimonials
            </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">What They Say?</h2>
        <p className="text-gray-600 mb-3 sm:mb-4 text-sm sm:text-base leading-relaxed">
          "TOTC's interactive quizzes and badges keep me motivated every day. Studying has never been this
          fun!" – Priya Nair, Student
          <br />
          <br />
          "As a teacher, TOTC's tools simplified course management. I save hours each week on planning and
          grading." – Rahul Sharma, Instructor
        </p>
        <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
          "Our students now easily collaborate online. TOTC transformed our classes even when we can't
          meet in person." – Vikram Singh, School Administrator
        </p>
      </motion.div>

      {/* Right Image and Card */}
      <motion.div
        className="relative"
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="rounded-2xl overflow-hidden w-full sm:w-80 h-64 sm:h-80 lg:h-96 mx-auto">
          <AnimatePresence mode="wait">
            <motion.img
              key={index}
              src={testimonials[index].image}
              alt={testimonials[index].name}
              className="object-cover w-full h-full"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
            />
          </AnimatePresence>
        </div>

        {/* Sliding Testimonial Card */}
        <div
          className="
            absolute bottom-1 right-2 sm:right-4 lg:right-20
            md:left-1/2 md:right-auto
            md:translate-x-[-50%]
            w-[160px] sm:w-[190px] md:w-[210px] lg:w-[230px]
          "
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              className="bg-white shadow-xl rounded-xl p-2 sm:p-3"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.6 }}
            >
              <p className="text-[11px] text-gray-700 leading-snug">
                "{testimonials[index].text}"
              </p>
              <div className="mt-2">
                <p className="font-semibold text-gray-900 text-xs">
                  {testimonials[index].name}
                </p>
                <div className="flex items-center gap-1 text-yellow-400 mt-1">
                  {Array(5)
                    .fill(0)
                    .map((_, i) => (
                      <svg
                        key={i}
                        className="w-3 h-3 fill-current"
                        viewBox="0 0 20 20"
                      >
                        <path d="M10 15l-5.878 3.09 1.122-6.545L.488 6.91l6.561-.955L10 0l2.951 5.955 6.561.955-4.756 4.635 1.122 6.545z" />
                      </svg>
                    ))}
                </div>
                <p className="text-[9px] text-gray-400 mt-1">
                  {testimonials[index].reviews} reviews at Yelp
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>
    </section>
  );
}
