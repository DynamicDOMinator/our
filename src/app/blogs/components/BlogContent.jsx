'use client';
import { motion } from 'framer-motion';
import { useState } from 'react';

export default function BlogContent({ content, title }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.8 }}
      className="py-12 md:py-20 px-4 md:px-8 lg:px-16"
    >
      <div className="max-w-3xl mx-auto">
        <div 
          className="prose prose-lg md:prose-xl max-w-none"
          dangerouslySetInnerHTML={{ __html: content }}
        />
        
        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="flex flex-wrap gap-3">
            {['Web Design', 'Development', 'Technology'].map((tag, index) => (
              <span 
                key={index}
                className="px-4 py-2 bg-gray-100 rounded-full text-sm hover:bg-gray-200 transition-colors duration-300 cursor-pointer"
              >
                {tag}
              </span>
            ))}
          </div>
          
          <div className="mt-8 flex items-center justify-end">
            <div className="flex items-center space-x-4">
              <button 
                className="flex items-center space-x-2 text-gray-600 hover:text-black transition-colors duration-300 cursor-pointer"
                onClick={() => {
                  if (navigator.share) {
                    navigator.share({
                      title: title || 'Blog Post',
                      text: 'Check out this interesting blog post!',
                      url: window.location.href,
                    })
                    .catch((error) => console.log('Error sharing:', error));
                  } else {
                    // Fallback for browsers that don't support the Web Share API
                    const url = window.location.href;
                    navigator.clipboard.writeText(url);
                    alert('Link copied to clipboard!');
                  }
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"></path>
                  <polyline points="16 6 12 2 8 6"></polyline>
                  <line x1="12" y1="2" x2="12" y2="15"></line>
                </svg>
                <span>Share</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}