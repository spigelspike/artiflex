
import { useState } from "react";
import { toast } from "sonner";
import { GeneratedImage, AspectRatio } from "@/types";

const BASE_URL = "https://image.pollinations.ai/prompt";

export const useImageGeneration = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentImage, setCurrentImage] = useState<GeneratedImage | null>(null);

  const generateImage = async (
    prompt: string,
    style: string,
    aspectRatio: AspectRatio
  ): Promise<GeneratedImage | null> => {
    if (!prompt.trim()) {
      toast.error("Please enter a prompt");
      return null;
    }

    setIsLoading(true);
    setError(null);

    try {
      // Format the prompt with style
      const formattedPrompt = style ? `${style}, ${prompt}` : prompt;
      
      // Add aspect ratio parameter if needed
      // The API doesn't directly support aspect ratio, so we'll use width/height later
      const encodedPrompt = encodeURIComponent(formattedPrompt);
      const url = `${BASE_URL}/${encodedPrompt}`;
      
      // Add a random parameter to avoid caching
      const imageUrl = `${url}?random=${Date.now()}`;

      // Create a unique ID for this generation
      const id = Math.random().toString(36).substring(2, 15);
      
      const generatedImage: GeneratedImage = {
        id,
        prompt,
        style,
        aspectRatio,
        imageUrl,
        timestamp: Date.now(),
      };

      // Simulate a network delay (the API is very fast, but we want to show loading state)
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setCurrentImage(generatedImage);
      toast.success("Image generated successfully!");
      return generatedImage;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to generate image";
      setError(errorMessage);
      toast.error(errorMessage);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    generateImage,
    isLoading,
    error,
    currentImage,
  };
};
