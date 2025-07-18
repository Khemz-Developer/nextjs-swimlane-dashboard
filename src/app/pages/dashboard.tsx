"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { Kanban, Target, Users, Clock, CheckCircle, AlertCircle, TrendingUp, Zap } from "lucide-react";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 300], [0, -50]);
  const y2 = useTransform(scrollY, [0, 300], [0, 25]);
  const opacity = useTransform(scrollY, [0, 200], [1, 0.8]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const floatingVariants = {
    float: {
      y: [0, -10, 0],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const features = [
    {
      icon: Target,
      title: "Task Prioritization",
      description: "Smart priority system to keep your team focused on what matters most"
    },
    {
      icon: Users,
      title: "Team Collaboration",
      description: "Real-time updates and seamless communication across your entire team"
    },
    {
      icon: Clock,
      title: "Time Tracking",
      description: "Monitor project timelines and deadlines with precision"
    },
    {
      icon: TrendingUp,
      title: "Progress Analytics",
      description: "Visual insights into team productivity and project health"
    }
  ];

  const stats = [
    { label: "Active Projects", value: "12", icon: Kanban },
    { label: "Team Members", value: "28", icon: Users },
    { label: "Completed Tasks", value: "156", icon: CheckCircle },
    { label: "Success Rate", value: "94%", icon: TrendingUp }
  ];

  return (
    <div className="min-h-screen overflow-hidden bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
      {/* Floating Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute w-64 h-64 bg-blue-200 rounded-full opacity-20"
          style={{
            left: mousePosition.x * 0.02,
            top: mousePosition.y * 0.02,
          }}
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 4, repeat: Infinity }}
        />
        <motion.div
          className="absolute w-48 h-48 bg-orange-200 rounded-full opacity-30"
          style={{
            right: mousePosition.x * 0.015,
            bottom: mousePosition.y * 0.015,
          }}
          animate={{ scale: [1.1, 1, 1.1] }}
          transition={{ duration: 3, repeat: Infinity }}
        />
        <motion.div
          className="absolute w-32 h-32 bg-yellow-200 rounded-full opacity-25"
          style={{
            left: mousePosition.x * 0.01,
            bottom: mousePosition.y * 0.01,
          }}
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 5, repeat: Infinity }}
        />
      </div>

      {/* Main Content */}
      <motion.div 
        className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 text-center"
        style={{ y: y1, opacity }}
      >
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="mb-8"
        >
          <motion.div
            variants={floatingVariants}
            animate="float"
            className="relative"
          >
            <div className="absolute inset-0 bg-blue-500 rounded-full blur-xl opacity-30"></div>
            <Kanban className="relative w-20 h-20 mx-auto text-blue-600" />
          </motion.div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 1, ease: "easeOut" }}
          className="mb-6 text-4xl font-bold text-transparent text-gray-800 md:text-6xl bg-gradient-to-r from-blue-600 to-orange-600 bg-clip-text"
        >
          Sport XI Project Board
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 1, ease: "easeOut" }}
          className="mb-8"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="w-2 h-2 mx-auto mb-4 bg-orange-500 rounded-full"
          />
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 1 }}
          className="max-w-3xl mb-12 text-lg leading-relaxed text-gray-700 md:text-xl"
        >
          Transform your <span className="font-semibold text-blue-600">Sport XI event production</span> with our intelligent Kanban-based task management system. 
          Track progress through <span className="font-medium text-blue-600">To Do</span>,
          <span className="font-medium text-yellow-600"> In Progress</span>,
          <span className="font-medium text-green-600"> Approved</span>,
          and <span className="font-medium text-red-600"> Rejected</span> stages with seamless drag-and-drop functionality.
        </motion.p>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 1 }}
          className="grid max-w-4xl grid-cols-2 gap-6 mb-16 md:grid-cols-4"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 + index * 0.1, duration: 0.8 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="p-6 border shadow-lg bg-white/70 backdrop-blur-sm rounded-xl border-white/20"
            >
              <motion.div
                variants={floatingVariants}
                animate="float"
                style={{ animationDelay: `${index * 0.5}s` }}
              >
                <stat.icon className="w-8 h-8 mx-auto mb-3 text-blue-600" />
              </motion.div>
              <div className="mb-1 text-2xl font-bold text-gray-800">{stat.value}</div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Features Section */}
      <motion.div 
        className="relative z-10 px-4 py-20"
        style={{ y: y2 }}
      >
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-4 text-3xl font-bold text-center text-gray-800 md:text-4xl"
        >
          Why Choose Sport XI Board?
        </motion.h2>
        
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <Zap className="w-6 h-6 mx-auto mb-2 text-orange-500" />
          <p className="max-w-2xl mx-auto text-gray-600">
            Built specifically for sports event production teams who need speed, reliability, and crystal-clear project visibility.
          </p>
        </motion.div>

        <div className="grid max-w-6xl gap-8 mx-auto md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.8 }}
              viewport={{ once: true }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="p-8 transition-all duration-300 border shadow-xl bg-white/60 backdrop-blur-sm rounded-2xl border-white/30 hover:shadow-2xl"
            >
              <motion.div
                variants={floatingVariants}
                animate="float"
                style={{ animationDelay: `${index * 0.7}s` }}
                className="mb-6"
              >
                <div className="flex items-center justify-center w-16 h-16 mx-auto bg-gradient-to-br from-blue-500 to-orange-500 rounded-2xl">
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
              </motion.div>
              <h3 className="mb-3 text-xl font-semibold text-gray-800">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(0,0,0,0.1)" }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 font-semibold text-white transition-all duration-300 rounded-full shadow-lg bg-gradient-to-r from-blue-600 to-orange-600 hover:shadow-xl"
          >
            Get Started Today
          </motion.button>
        </motion.div>
      </motion.div>

      {/* Floating Action Elements */}
      <motion.div
        className="fixed z-20 bottom-8 right-8"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 2, duration: 0.5 }}
      >
        <motion.div
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex items-center justify-center w-12 h-12 transition-colors bg-blue-600 rounded-full shadow-lg cursor-pointer hover:bg-blue-700"
        >
          <AlertCircle className="w-6 h-6 text-white" />
        </motion.div>
      </motion.div>
    </div>
  );
}