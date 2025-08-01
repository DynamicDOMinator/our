import { notFound } from 'next/navigation';
import { getBlogPostById, getRelatedPosts } from '../../utils/blogUtils';
import BlogHeader from '../components/BlogHeader';
import BlogContent from '../components/BlogContent';
import RelatedPosts from '../components/RelatedPosts';

// Generate metadata for the page
export async function generateMetadata({ params }) {
  try {
    // Properly await params before accessing properties
    const { id } = await params;
    const post = await getBlogPostById(id);
    
    return {
      title: ` PROSENTAL Blog - ${post.title} `,
      description: post.excerpt,
      openGraph: {
        title: post.title,
        description: post.excerpt,
        images: [{ url: post.coverImage }],
      },
    };
  } catch (error) {
    return {
      title: 'Blog Post Not Found - PROSENTAL',
      description: 'The requested blog post could not be found.',
    };
  }
}

export default async function BlogPost({ params }) {
  try {
    // Properly await params before accessing properties
    const { id } = await params;
    
    // Fetch the blog post data
    const post = await getBlogPostById(id);
    
    // Fetch related posts based on the same category
    const relatedPosts = await getRelatedPosts(id, post.category);
    
    return (
      <div className="min-h-screen">
        <BlogHeader post={post} />
        <BlogContent content={post.content} title={post.title} />
        <RelatedPosts posts={relatedPosts} />
      </div>
    );
  } catch (error) {
    // If the post is not found, return the Next.js not-found page
    notFound();
  }
}