export default function SkeletonCard() {
  return (
    <div className="glass-card overflow-hidden flex flex-col min-h-[360px] animate-pulse">
      {/* Image Placeholder */}
      <div className="h-48 w-full bg-gray-200" />

      {/* Content Placeholders */}
      <div className="p-4 flex flex-col flex-grow">
        <div className="flex justify-between items-start gap-2 mb-3">
          <div className="h-5 bg-gray-200 rounded-full w-3/5" />
          <div className="h-5 bg-gray-200 rounded-full w-1/4" />
        </div>
        
        <div className="h-4 bg-gray-200 rounded-full w-2/3 mb-6" />

        <div className="flex items-center gap-4 mb-6 mt-auto">
          <div className="h-4 bg-gray-200 rounded-full w-16" />
          <div className="h-4 bg-gray-200 rounded-full w-20" />
          <div className="h-4 bg-gray-200 rounded-full w-16" />
        </div>

        <div className="h-10 bg-gray-200 rounded-lg w-full" />
      </div>
    </div>
  );
}
