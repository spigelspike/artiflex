
import { useState } from "react";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";
import ImageGrid from "@/components/ImageGrid";
import { useImageHistory } from "@/hooks/useLocalStorage";

const Gallery = () => {
  const { images, removeImage, clearHistory } = useImageHistory();
  const [isConfirmingClear, setIsConfirmingClear] = useState(false);

  const handleDeleteImage = (id: string) => {
    removeImage(id);
    toast.success("Image removed from gallery");
  };

  const handleClearGallery = () => {
    if (isConfirmingClear) {
      clearHistory();
      setIsConfirmingClear(false);
      toast.success("Gallery cleared successfully");
    } else {
      setIsConfirmingClear(true);
      // Reset confirmation after 5 seconds
      setTimeout(() => setIsConfirmingClear(false), 5000);
    }
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
        <h1 className="text-3xl font-bold text-gradient">Your Gallery</h1>
        
        {images.length > 0 && (
          <button
            onClick={handleClearGallery}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors bg-destructive/10 text-destructive hover:bg-destructive/20"
          >
            <Trash2 className="h-4 w-4" />
            {isConfirmingClear ? "Confirm Clear Gallery" : "Clear Gallery"}
          </button>
        )}
      </div>
      
      <div className="space-y-6">
        <ImageGrid images={images} onDelete={handleDeleteImage} />
      </div>
    </div>
  );
};

export default Gallery;
