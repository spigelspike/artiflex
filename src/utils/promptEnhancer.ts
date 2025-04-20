
import { STYLE_OPTIONS } from "./imageUtils";

const enhancePrompt = (prompt: string, selectedStyle: string = ""): string => {
  // Get the style description from STYLE_OPTIONS or use a default empty string
  const styleValue = selectedStyle
    ? STYLE_OPTIONS.find(style => style.value === selectedStyle)?.value || ""
    : "";

  // Template for enhanced prompts
  const template = "A highly detailed, {style}-style depiction of {subject}, set in a vibrant and immersive environment, with dynamic lighting, cinematic composition, ultra-sharp focus, trending on ArtStation, 8k resolution";

  // Replace {subject} with the user's prompt
  let enhancedPrompt = template.replace("{subject}", prompt.trim());
  
  // Replace {style} with the selected style or remove the style part if no style is selected
  enhancedPrompt = styleValue
    ? enhancedPrompt.replace("{style}-style", styleValue)
    : enhancedPrompt.replace("{style}-style ", "");

  return enhancedPrompt;
};

export { enhancePrompt };
