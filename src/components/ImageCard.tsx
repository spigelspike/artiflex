
import React from "react";
import { Download, Share2, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { downloadImage, shareImage } from "@/utils/imageUtils";
import { GeneratedImage } from "@/types";
import { format } from "date-fns";

interface ImageCardProps {
  image: GeneratedImage;
  onClick: () => void;
  onDelete: () => void;
}

const ImageCard: React.FC<ImageCardProps> = ({ image, onClick, onDelete }) => {
  const handleDownload = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      await downloadImage(image.imageUrl, `pollinations-${image.id}`);
      toast.success("Image downloaded successfully!");
    } catch (error) {
      toast.error("Failed to download image");
    }
  };

  const handleShare = async (e: React.MouseEvent) => {
    e.stopPropagation();
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

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDelete();
  };

  const formattedDate = format(new Date(image.timestamp), "MMM d, yyyy 'at' h:mm a");

  return (
    <div
      className="glass-card overflow-hidden rounded-lg transition-all hover:scale-[1.02] cursor-pointer group"
      onClick={onClick}
    >
      <div className="relative aspect-square">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={image.imageUrl}
          alt={image.prompt}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-3">
          <div className="flex justify-end gap-1">
            <button
              onClick={handleDelete}
              className="p-1.5 rounded-full bg-background/20 backdrop-blur-sm hover:bg-destructive/80 transition-colors"
              title="Delete"
            >
              <Trash2 className="h-3.5 w-3.5" />
            </button>
          </div>
          <div className="flex justify-end gap-1">
            <button
              onClick={handleDownload}
              className="p-1.5 rounded-full bg-background/20 backdrop-blur-sm hover:bg-background/40 transition-colors"
              title="Download"
            >
              <Download className="h-3.5 w-3.5" />
            </button>
            <button
              onClick={handleShare}
              className="p-1.5 rounded-full bg-background/20 backdrop-blur-sm hover:bg-background/40 transition-colors"
              title="Share"
            >
              <Share2 className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </div>
      <div className="p-3">
        <p className="text-sm font-medium line-clamp-2 text-card-foreground">
          {image.prompt}
        </p>
        <p className="text-xs text-muted-foreground mt-1">
          {formattedDate}
        </p>
      </div>
    </div>
  );
};

export default ImageCard;
