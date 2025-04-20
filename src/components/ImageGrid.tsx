
import React, { useState } from "react";
import ImageCard from "./ImageCard";
import ImagePreview from "./ImagePreview";
import { GeneratedImage } from "@/types";

interface ImageGridProps {
  images: GeneratedImage[];
  onDelete: (id: string) => void;
}

const ImageGrid: React.FC<ImageGridProps> = ({ images, onDelete }) => {
  const [selectedImage, setSelectedImage] = useState<GeneratedImage | null>(null);

  if (images.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <p className="text-muted-foreground mb-2">Your gallery is empty</p>
        <p className="text-sm text-muted-foreground">
          Generate some images to see them here
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {images.map((image) => (
          <ImageCard
            key={image.id}
            image={image}
            onClick={() => setSelectedImage(image)}
            onDelete={() => onDelete(image.id)}
          />
        ))}
      </div>

      {selectedImage && (
        <div 
          className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div 
            className="relative bg-card rounded-lg max-w-4xl w-full max-h-[90vh] overflow-auto flex flex-col p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 p-2 text-muted-foreground hover:text-foreground"
            >
              ✕
            </button>
            <div className="flex-1 overflow-hidden mt-6">
              <ImagePreview image={selectedImage} />
            </div>
            <div className="mt-4">
              <h3 className="text-lg font-medium">Prompt</h3>
              <p className="text-muted-foreground mt-1">{selectedImage.prompt}</p>
              
              <div className="mt-4 flex flex-wrap gap-2">
                {selectedImage.style && (
                  <div className="text-xs rounded-full px-2 py-1 bg-secondary">
                    Style: {selectedImage.style.split(",")[0]}
                  </div>
                )}
                <div className="text-xs rounded-full px-2 py-1 bg-secondary">
                  Aspect Ratio: {selectedImage.aspectRatio}
                </div>
                <div className="text-xs rounded-full px-2 py-1 bg-secondary">
                  {new Date(selectedImage.timestamp).toLocaleString()}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ImageGrid;
