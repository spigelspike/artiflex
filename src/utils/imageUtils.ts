import { AspectRatioOption, StyleOption } from "@/types";

export const downloadImage = async (imageUrl: string, filename: string) => {
  try {
    const response = await fetch(imageUrl);
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${filename}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error("Error downloading image:", error);
    throw error;
  }
};

export const shareImage = async (imageUrl: string, prompt: string) => {
  try {
    if (navigator.share) {
      await navigator.share({
        title: "AI Generated Image",
        text: `Check out this AI-generated image: "${prompt}"`,
        url: imageUrl,
      });
      return true;
    }
    
    // Fallback to copying to clipboard
    await navigator.clipboard.writeText(imageUrl);
    return false;
  } catch (error) {
    console.error("Error sharing image:", error);
    throw error;
  }
};

export const STYLE_OPTIONS: StyleOption[] = [
  { id: "none", label: "None", value: "" },
  { id: "photorealistic", label: "Photorealistic", value: "photorealistic, detailed, high resolution" },
  { id: "anime", label: "Anime", value: "anime style, vibrant, detailed" },
  { id: "digital-art", label: "Digital Art", value: "digital art, detailed, vibrant colors" },
  { id: "oil-painting", label: "Oil Painting", value: "oil painting, textured, detailed brushwork" },
  { id: "watercolor", label: "Watercolor", value: "watercolor painting, soft edges, flowing colors" },
  { id: "pixel-art", label: "Pixel Art", value: "pixel art, retro, 8-bit style" },
  { id: "3d-render", label: "3D Render", value: "3D render, octane render, detailed, smooth" },
  { id: "sci-fi", label: "Sci-Fi", value: "science fiction, futuristic, detailed" },
  { id: "fantasy", label: "Fantasy", value: "fantasy art, magical, detailed" },
  { id: "studio-ghibli", label: "Studio Ghibli", value: "studio ghibli style, miyazaki, whimsical, detailed, dreamy" },
  { id: "cyberpunk", label: "Cyberpunk", value: "cyberpunk, neon, futuristic, high tech, dark" },
  { id: "vaporwave", label: "Vaporwave", value: "vaporwave, retro, 80s, purple and blue, geometric" },
  { id: "comic-book", label: "Comic Book", value: "comic book style, bold lines, flat colors, halftone pattern" },
  { id: "pop-art", label: "Pop Art", value: "pop art style, bold colors, halftone dots, comic inspired" },
  { id: "impressionist", label: "Impressionist", value: "impressionist painting, loose brushstrokes, light effects" },
  { id: "minimalist", label: "Minimalist", value: "minimalist, clean, simple, elegant, limited color palette" },
  { id: "synthwave", label: "Synthwave", value: "synthwave, retrowave, 80s, purple and pink, sunset grid" },
  { id: "baroque", label: "Baroque", value: "baroque style, dramatic, ornate, rich colors, chiaroscuro" },
  { id: "steampunk", label: "Steampunk", value: "steampunk, victorian, mechanical, brass, gears, steam-powered" },
];

export const ASPECT_RATIO_OPTIONS: AspectRatioOption[] = [
  { id: "1:1", label: "Square (1:1)", width: 512, height: 512 },
  { id: "16:9", label: "Landscape (16:9)", width: 640, height: 360 },
  { id: "9:16", label: "Portrait (9:16)", width: 360, height: 640 },
  { id: "4:3", label: "Standard (4:3)", width: 512, height: 384 },
  { id: "3:4", label: "Portrait (3:4)", width: 384, height: 512 },
];
