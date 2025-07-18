"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { Kanban, Target, Users, Clock, CheckCircle, AlertCircle, TrendingUp, Zap } from "lucide-react";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 300], [0, -50]);
  const y2 = useTransform(scrollY, [0, 300], [0, 25]);
  const opacity = useTransform(scrollY, [0, 200], [1, 0.8]);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener("resize", checkMobile);
    
    const handleMouseMove = (e) => {
      // Only track mouse movement on desktop
      if (!isMobile) {
        setMousePosition({ x: e.clientX, y: e.clientY });
      }
    };
    
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", checkMobile);
    };
  }, [isMobile]);

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
      {/* Floating Background Elements - Hidden on mobile for performance */}
      {!isMobile && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            className="absolute w-32 h-32 bg-blue-200 rounded-full opacity-20 md:w-64 md:h-64"
            style={{
              left: mousePosition.x * 0.02,
              top: mousePosition.y * 0.02,
            }}
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 4, repeat: Infinity }}
          />
          <motion.div
            className="absolute w-24 h-24 bg-orange-200 rounded-full opacity-30 md:w-48 md:h-48"
            style={{
              right: mousePosition.x * 0.015,
              bottom: mousePosition.y * 0.015,
            }}
            animate={{ scale: [1.1, 1, 1.1] }}
            transition={{ duration: 3, repeat: Infinity }}
          />
          <motion.div
            className="absolute w-16 h-16 bg-yellow-200 rounded-full opacity-25 md:w-32 md:h-32"
            style={{
              left: mousePosition.x * 0.01,
              bottom: mousePosition.y * 0.01,
            }}
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 5, repeat: Infinity }}
          />
        </div>
      )}

      {/* Main Content */}
      <motion.div 
        className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 text-center sm:px-6 lg:px-8"
        style={{ y: isMobile ? 0 : y1, opacity }}
      >
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="mb-6 sm:mb-8"
        >
          <motion.div
            variants={floatingVariants}
            animate={isMobile ? {} : "float"}
            className="relative"
          >
            <div className="absolute inset-0 bg-blue-500 rounded-full blur-xl opacity-30"></div>
            <Kanban className="relative w-12 h-12 mx-auto text-blue-600 sm:w-16 sm:h-16 md:w-20 md:h-20" />
          </motion.div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 1, ease: "easeOut" }}
          className="mb-4 text-2xl font-bold text-transparent text-gray-800 sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl bg-gradient-to-r from-blue-600 to-orange-600 bg-clip-text sm:mb-6"
        >
          Sport XI Project Board
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 1, ease: "easeOut" }}
          className="mb-6 sm:mb-8"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="w-1.5 h-1.5 mx-auto mb-4 bg-orange-500 rounded-full sm:w-2 sm:h-2"
          />
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 1 }}
          className="max-w-sm mb-8 text-base leading-relaxed text-gray-700 sm:max-w-2xl sm:mb-12 sm:text-lg md:text-xl lg:max-w-3xl"
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
          className="grid w-full max-w-sm grid-cols-2 gap-3 mb-12 sm:max-w-2xl sm:gap-4 md:max-w-4xl md:grid-cols-4 md:gap-6 md:mb-16"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 + index * 0.1, duration: 0.8 }}
              whileHover={{ scale: isMobile ? 1 : 1.05, y: isMobile ? 0 : -5 }}
              className="p-3 border shadow-lg bg-white/70 backdrop-blur-sm rounded-xl border-white/20 sm:p-4 md:p-6"
            >
              <motion.div
                variants={floatingVariants}
                animate={isMobile ? {} : "float"}
                style={{ animationDelay: `${index * 0.5}s` }}
              >
                <stat.icon className="w-6 h-6 mx-auto mb-2 text-blue-600 sm:w-7 sm:h-7 md:w-8 md:h-8 md:mb-3" />
              </motion.div>
              <div className="mb-1 text-lg font-bold text-gray-800 sm:text-xl md:text-2xl">{stat.value}</div>
              <div className="text-xs text-gray-600 sm:text-sm">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Features Section */}
      <motion.div 
        className="relative z-10 px-4 py-12 sm:px-6 sm:py-12 lg:px-8 lg:py-6"
        style={{ y: isMobile ? 0 : y2 }}
      >
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-3 text-2xl font-bold text-center text-gray-800 sm:mb-4 sm:text-3xl md:text-4xl"
        >
          Why Choose Sport XI Board?
        </motion.h2>
        
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-8 text-center sm:mb-12"
        >
          <Zap className="w-5 h-5 mx-auto mb-2 text-orange-500 sm:w-6 sm:h-6" />
          <p className="max-w-sm mx-auto text-sm text-gray-600 sm:max-w-2xl sm:text-base">
            Built specifically for sports event production teams who need speed, reliability, and crystal-clear project visibility.
          </p>
        </motion.div>

        <div className="grid max-w-sm gap-4 mx-auto sm:max-w-2xl sm:grid-cols-2 sm:gap-6 lg:max-w-6xl lg:grid-cols-4 lg:gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.8 }}
              viewport={{ once: true }}
              whileHover={{ y: isMobile ? 0 : -10, scale: isMobile ? 1 : 1.02 }}
              className="p-4 transition-all duration-300 border shadow-xl bg-white/60 backdrop-blur-sm rounded-2xl border-white/30 hover:shadow-2xl sm:p-6 lg:p-8"
            >
              <motion.div
                variants={floatingVariants}
                animate={isMobile ? {} : "float"}
                style={{ animationDelay: `${index * 0.7}s` }}
                className="mb-4 sm:mb-6"
              >
                <div className="flex items-center justify-center w-12 h-12 mx-auto bg-gradient-to-br from-blue-500 to-orange-500 rounded-xl sm:w-14 sm:h-14 md:w-16 md:h-16 md:rounded-2xl">
                  <feature.icon className="w-6 h-6 text-white sm:w-7 sm:h-7 md:w-8 md:h-8" />
                </div>
              </motion.div>
              <h3 className="mb-2 text-lg font-semibold text-gray-800 sm:mb-3 sm:text-xl">{feature.title}</h3>
              <p className="text-sm text-gray-600 sm:text-base">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-12 text-center sm:mt-16"
        >
          <motion.button
            whileHover={{ scale: isMobile ? 1 : 1.05, boxShadow: isMobile ? "0 10px 20px rgba(0,0,0,0.1)" : "0 20px 40px rgba(0,0,0,0.1)" }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-3 mb-6 text-sm font-semibold text-white transition-all duration-300 rounded-full shadow-lg bg-gradient-to-r from-blue-600 to-orange-600 hover:shadow-xl sm:px-8 sm:py-4 sm:text-base"
          >
            Get Started Today
          </motion.button>
        </motion.div>
      </motion.div>

      {/* Floating Action Elements - Adjusted for mobile */}
      <motion.div
        className="fixed z-20 bottom-4 right-4 sm:bottom-6 sm:right-6 lg:bottom-8 lg:right-8"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 2, duration: 0.5 }}
      >
        <motion.div
          animate={isMobile ? {} : { y: [0, -5, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex items-center justify-center w-10 h-10 transition-colors bg-blue-600 rounded-full shadow-lg cursor-pointer hover:bg-blue-700 sm:w-12 sm:h-12"
        >
          <AlertCircle className="w-5 h-5 text-white sm:w-6 sm:h-6" />
        </motion.div>
      </motion.div>
    </div>
  );
}