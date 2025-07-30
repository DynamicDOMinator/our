import { Suspense } from 'react';
import BlogList from './components/BlogList';
import BlogHero from './components/BlogHero';
import BlogLoading from './components/BlogLoading';

export const metadata = {
  title: 'Blogs - PROSENTAL',
  description: 'Explore our latest insights on web development, UI/UX design, mobile app development, and digital transformation.',
  keywords: 'blog, insights, web development, UI/UX design, mobile app development, digital transformation, tech articles, industry trends',
  openGraph: {
    title: 'Blogs - PROSENTAL',
    description: 'Explore our latest insights on web development, UI/UX design, mobile app development, and digital transformation.',
    url: '/blogs',
    siteName: 'PROSENTAL',
    locale: 'en_US',
    type: 'website',
  },
};

export default function BlogsPage() {
  return (
    <div className="min-h-screen">
      <BlogHero />
      <Suspense fallback={<BlogLoading />}>
        <BlogList />
      </Suspense>
    </div>
  );
}