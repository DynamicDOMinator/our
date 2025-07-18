export default function BlogLoading() {
  return (
    <div className="py-10 md:py-20 px-4 md:px-8 lg:px-16">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
        {[...Array(6)].map((_, index) => (
          <div key={index} className="flex flex-col">
            {/* Skeleton for image */}
            <div className="aspect-video w-full bg-gray-200 animate-pulse rounded-lg mb-4"></div>
            
            {/* Skeleton for title */}
            <div className="h-8 bg-gray-200 animate-pulse rounded-md mb-3 w-3/4"></div>
            
            {/* Skeleton for date */}
            <div className="h-4 bg-gray-200 animate-pulse rounded-md mb-3 w-1/4"></div>
            
            {/* Skeleton for excerpt */}
            <div className="h-4 bg-gray-200 animate-pulse rounded-md mb-2 w-full"></div>
            <div className="h-4 bg-gray-200 animate-pulse rounded-md mb-2 w-5/6"></div>
            <div className="h-4 bg-gray-200 animate-pulse rounded-md w-4/6"></div>
          </div>
        ))}
      </div>
    </div>
  );
}