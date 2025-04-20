
import { useState } from "react";
import { useImageHistory } from "@/hooks/useLocalStorage";
import { format } from "date-fns";

const History = () => {
  const { images } = useImageHistory();

  // Sort images by timestamp (newest first)
  const sortedImages = [...images].sort((a, b) => b.timestamp - a.timestamp);

  // Group images by date
  const imagesByDate = sortedImages.reduce((acc, image) => {
    const date = format(new Date(image.timestamp), "yyyy-MM-dd");
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(image);
    return acc;
  }, {} as Record<string, typeof images>);

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
        <h1 className="text-3xl font-bold text-gradient">Generation History</h1>
      </div>
      
      <div className="space-y-8">
        {Object.entries(imagesByDate).length > 0 ? (
          Object.entries(imagesByDate).map(([date, dateImages]) => (
            <div key={date} className="space-y-4">
              <h2 className="text-xl font-medium">
                {format(new Date(date), "MMMM d, yyyy")}
              </h2>
              <div className="space-y-4">
                {dateImages.map((image) => (
                  <div key={image.id} className="glass-card p-4 rounded-lg">
                    <div className="flex flex-col sm:flex-row gap-4">
                      <div className="w-full sm:w-48 h-48 flex-shrink-0">
                        <img 
                          src={image.imageUrl} 
                          alt={image.prompt}
                          className="w-full h-full object-cover rounded-md"
                        />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-muted-foreground">
                          {format(new Date(image.timestamp), "h:mm a")}
                        </p>
                        <h3 className="text-lg font-medium mt-1">Prompt</h3>
                        <p className="text-muted-foreground">{image.prompt}</p>
                        
                        <div className="mt-4 flex flex-wrap gap-2">
                          {image.style && (
                            <div className="text-xs rounded-full px-2 py-1 bg-secondary">
                              Style: {image.style.split(",")[0]}
                            </div>
                          )}
                          <div className="text-xs rounded-full px-2 py-1 bg-secondary">
                            Aspect Ratio: {image.aspectRatio}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <p className="text-muted-foreground mb-2">No generation history</p>
            <p className="text-sm text-muted-foreground">
              Generate some images to see your history
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default History;
