'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function BlogNotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 md:px-8 lg:px-16 py-20 md:py-40">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="text-center max-w-2xl"
      >
        <h1 className="text-6xl md:text-8xl font-bold mb-6">404</h1>
        <h2 className="text-3xl md:text-4xl font-medium mb-8">Blog Post Not Found</h2>
        <p className="text-xl text-gray-600 mb-10">
          The blog post you're looking for doesn't exist or has been moved.
        </p>
        
        <div className="flex flex-col md:flex-row gap-4 justify-center">
          <Link 
            href="/blogs"
            className="px-8 py-3 bg-black text-white rounded-full hover:bg-gray-800 transition-colors duration-300"
          >
            Browse All Blogs
          </Link>
          
          <Link 
            href="/"
            className="px-8 py-3 border-2 border-black rounded-full hover:bg-gray-100 transition-colors duration-300"
          >
            Back to Home
          </Link>
        </div>
      </motion.div>
    </div>
  );
}