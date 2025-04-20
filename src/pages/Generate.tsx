
import { useState } from "react";
import PromptInput from "@/components/PromptInput";
import StyleSelector from "@/components/StyleSelector";
import AspectRatioSelector from "@/components/AspectRatioSelector";
import ImagePreview from "@/components/ImagePreview";
import { useImageGeneration } from "@/hooks/useImageGeneration";
import { useImageHistory } from "@/hooks/useLocalStorage";
import { AspectRatio } from "@/types";

const Generate = () => {
  const [style, setStyle] = useState("");
  const [aspectRatio, setAspectRatio] = useState<AspectRatio>("1:1");
  const { generateImage, isLoading, currentImage } = useImageGeneration();
  const { addImage } = useImageHistory();

  const handleGenerate = async (prompt: string) => {
    const image = await generateImage(prompt, style, aspectRatio);
    if (image) {
      addImage(image);
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-gradient">Generate AI Images</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-10">
        <div className="space-y-6 order-2 md:order-1">
          <div className="space-y-4">
            <PromptInput onSubmit={handleGenerate} disabled={isLoading} />
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <StyleSelector
                value={style}
                onChange={setStyle}
                disabled={isLoading}
              />
              
              <AspectRatioSelector
                value={aspectRatio}
                onChange={setAspectRatio}
                disabled={isLoading}
              />
            </div>
          </div>
          
          <div className="glass-card p-4 rounded-lg space-y-2">
            <h3 className="font-medium">Tips for better results</h3>
            <ul className="text-sm text-muted-foreground space-y-1 list-disc pl-5">
              <li>Be specific about what you want to see</li>
              <li>Include details like colors, lighting, and style</li>
              <li>Try different art styles for variety</li>
              <li>Use descriptive adjectives</li>
            </ul>
          </div>
        </div>
        
        <div className="order-1 md:order-2">
          <div className="sticky top-24">
            <h2 className="text-xl font-medium mb-4">Preview</h2>
            <ImagePreview image={currentImage} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Generate;
