import Link from 'next/link';
import Image from 'next/image';
import { getBlogPosts } from '@/app/utils/blogUtils';

export default async function BlogList() {
  // Fetch blog posts using server component
  const posts = await getBlogPosts();

  return (
    <div className="py-10 md:py-20 px-4 md:px-8 lg:px-16">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
        {posts.map((post) => (
          <BlogCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}

function BlogCard({ post }) {
  const { id, title, excerpt, coverImage, date, category } = post;
  
  return (
    <Link href={`/blogs/${id}`} className="group">
      <div className="flex flex-col h-full overflow-hidden transition-all duration-500 hover:scale-[0.98]">
        <div className="relative aspect-video w-full overflow-hidden rounded-lg mb-4">
          <Image 
            src={coverImage} 
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute top-4 left-4 bg-black text-white text-xs px-3 py-1 rounded-full">
            {category}
          </div>
        </div>
        
        <h3 className="text-xl md:text-2xl font-medium mb-2 group-hover:text-gray-700 transition-colors duration-300">
          {title}
        </h3>
        
        <p className="text-sm text-gray-500 mb-3">
          {new Date(date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}
        </p>
        
        <p className="text-gray-700 line-clamp-3">{excerpt}</p>
        
        <div className="mt-auto pt-4 flex items-center">
          <span className="text-black font-medium group-hover:underline transition-all duration-300">
            Read more
          </span>
        </div>
      </div>
    </Link>
  );
}