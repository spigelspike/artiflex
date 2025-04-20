
import React, { useState } from "react";
import { Download, Share2, X, Maximize } from "lucide-react";
import { toast } from "sonner";
import { downloadImage, shareImage } from "@/utils/imageUtils";
import { GeneratedImage } from "@/types";

interface ImagePreviewProps {
  image: GeneratedImage | null;
  showControls?: boolean;
}

const ImagePreview: React.FC<ImagePreviewProps> = ({ image, showControls = true }) => {
  const [isFullscreen, setIsFullscreen] = useState(false);

  if (!image) {
    return (
      <div className="w-full aspect-square flex items-center justify-center rounded-lg border border-dashed border-border bg-muted/30">
        <p className="text-muted-foreground">Generate an image to see the preview</p>
      </div>
    );
  }

  const handleDownload = async () => {
    try {
      await downloadImage(image.imageUrl, `pollinations-${image.id}`);
      toast.success("Image downloaded successfully!");
    } catch (error) {
      toast.error("Failed to download image");
    }
  };

  const handleShare = async () => {
    try {
      const isNativeShare = await shareImage(image.imageUrl, image.prompt);
      if (isNativeShare) {
        toast.success("Sharing image...");
      } else {
        toast.success("Image URL copied to clipboard!");
      }
    } catch (error) {
      toast.error("Failed to share image");
    }
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  return (
    <>
      <div className="relative glass-card rounded-lg overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={image.imageUrl}
          alt={image.prompt}
          className="w-full h-auto object-cover"
        />
        {showControls && (
          <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/70 to-transparent flex justify-end gap-2">
            <button
              onClick={handleDownload}
              className="p-2 rounded-full bg-background/20 backdrop-blur-sm hover:bg-background/40 transition-colors"
              title="Download"
            >
              <Download className="h-4 w-4" />
            </button>
            <button
              onClick={handleShare}
              className="p-2 rounded-full bg-background/20 backdrop-blur-sm hover:bg-background/40 transition-colors"
              title="Share"
            >
              <Share2 className="h-4 w-4" />
            </button>
            <button
              onClick={toggleFullscreen}
              className="p-2 rounded-full bg-background/20 backdrop-blur-sm hover:bg-background/40 transition-colors"
              title="View Fullscreen"
            >
              <Maximize className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>

      {isFullscreen && (
        <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4" onClick={toggleFullscreen}>
          <div className="relative max-w-5xl max-h-[90vh] overflow-auto" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={toggleFullscreen}
              className="absolute top-2 right-2 p-2 rounded-full bg-background/20 backdrop-blur-sm hover:bg-background/40 transition-colors z-10"
            >
              <X className="h-5 w-5" />
            </button>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={image.imageUrl}
              alt={image.prompt}
              className="max-w-full max-h-[90vh] object-contain"
            />
            <div className="absolute bottom-4 right-4 flex gap-2">
              <button
                onClick={handleDownload}
                className="p-2 rounded-full bg-background/20 backdrop-blur-sm hover:bg-background/40 transition-colors"
                title="Download"
              >
                <Download className="h-5 w-5" />
              </button>
              <button
                onClick={handleShare}
                className="p-2 rounded-full bg-background/20 backdrop-blur-sm hover:bg-background/40 transition-colors"
                title="Share"
              >
                <Share2 className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ImagePreview;
