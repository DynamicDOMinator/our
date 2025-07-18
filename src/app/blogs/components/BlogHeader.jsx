'use client';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function BlogHeader({ post }) {
  const { title, date, author, coverImage, category } = post;
  
  return (
    <div className="relative blogs-hero-section">
      {/* Hero image with overlay */}
      <div className="relative h-[50vh] md:h-[70vh] w-full overflow-hidden">
        <Image 
          src={coverImage} 
          alt={title}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
      </div>
      
      {/* Content overlay */}
      <div className="absolute inset-0 flex flex-col justify-end px-4 md:px-8 lg:px-16 pb-10 md:pb-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="max-w-4xl"
        >
          <div className="mb-4">
            <span className="bg-black text-white text-sm px-4 py-1 rounded-full">
              {category}
            </span>
          </div>
          
          <h1 className="text-3xl md:text-5xl lg:text-7xl font-medium text-white mb-4 md:mb-6">
            {title}
          </h1>
          
          <div className="flex items-center text-white">
            <div className="mr-6">
              <p className="text-sm md:text-base">
                {new Date(date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </p>
            </div>
            <div>
              <p className="text-sm md:text-base">By {author}</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}