# Next.js Media Optimization

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app) that includes optimizations for video and GIF content to improve page performance while maintaining visual quality.

## Media Optimization Features

### 1. Lazy Loading Videos

All videos are now lazy-loaded using the `LazyVideo` component, which:
- Uses Intersection Observer API to load videos only when they enter the viewport
- Provides WebM format with fallback to MP4 for better compression
- Handles autoplay with proper error recovery
- Includes proper attributes for mobile compatibility

### 2. GIF to Video Conversion

GIFs have been replaced with video elements that:
- Provide better compression (up to 95% smaller file sizes)
- Maintain the same visual appearance
- Support both WebM and MP4 formats for cross-browser compatibility

### 3. Media Conversion Script

A Node.js script is included to convert media files:

```bash
npm run convert-media
```

This script:
- Converts MP4 videos to WebM format for better compression
- Converts GIFs to both MP4 and WebM video formats
- Requires FFmpeg to be installed on your system

## Components

### LazyVideo

Use this component to display videos with optimal performance:

```jsx
<LazyVideo
  src="/path/to/video.mp4"
  webmSrc="/path/to/video.webm"
  poster="/path/to/poster.jpg" // Optional
  autoPlay={true}
  loop={true}
  muted={true}
  playsInline={true}
  className="your-class"
/>
```

### LazyImage

Use this component to display images or GIFs (converted to video):

```jsx
<LazyImage
  src="/path/to/image.jpg"
  // For GIFs converted to video
  videoSrc="/path/to/video.mp4" // Optional
  webmSrc="/path/to/video.webm" // Optional
  isGif={true} // Set to true to use video instead of image
  width={500}
  height={500}
  alt="Description"
  className="your-class"
/>
```

## Getting Started

First, install FFmpeg (required for media conversion):
- Windows: Download from [FFmpeg.org](https://ffmpeg.org/download.html) and add to PATH
- Mac: `brew install ffmpeg`
- Linux: `apt-get install ffmpeg`

Then, convert media files (optional, but recommended for performance):

```bash
npm run convert-media
```

Finally, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Performance Benefits

Implementing these optimizations provides several benefits:

- Reduced initial page load time
- Lower bandwidth usage
- Improved Core Web Vitals scores
- Better mobile performance
- Smoother scrolling experience

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
