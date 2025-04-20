import React, { useState } from "react";
import { Sparkles } from "lucide-react";
import { enhancePrompt } from "@/utils/promptEnhancer";
import { Button } from "./ui/button";

interface PromptInputProps {
  onSubmit: (prompt: string) => void;
  disabled?: boolean;
  style?: string;
}

const PromptInput: React.FC<PromptInputProps> = ({ 
  onSubmit, 
  disabled = false,
  style = ""
}) => {
  const [prompt, setPrompt] = useState("");
  const maxLength = 500;

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    if (value.length <= maxLength) {
      setPrompt(value);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (prompt.trim()) {
      onSubmit(prompt);
    }
  };

  const handleEnhance = () => {
    if (prompt.trim()) {
      const enhancedPrompt = enhancePrompt(prompt, style);
      setPrompt(enhancedPrompt);
    }
  };

  const charactersRemaining = maxLength - prompt.length;

  return (
    <form onSubmit={handleSubmit} className="w-full space-y-2">
      <div className="relative">
        <textarea
          value={prompt}
          onChange={handleChange}
          placeholder="Describe the image you want to generate..."
          className="min-h-24 w-full resize-y rounded-lg border border-input bg-background px-4 py-3 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          disabled={disabled}
        />
        <div className="absolute bottom-2 right-2 text-xs text-muted-foreground">
          {charactersRemaining} characters remaining
        </div>
      </div>
      
      <div className="flex gap-2">
        <Button
          type="button"
          variant="secondary"
          onClick={handleEnhance}
          disabled={!prompt.trim() || disabled}
          className="flex-1 md:flex-none"
        >
          <Sparkles className="mr-2 h-4 w-4" />
          Enhance Prompt
        </Button>
        
        <Button
          type="submit"
          disabled={!prompt.trim() || disabled}
          className="flex-1"
        >
          {disabled ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Generating...
            </>
          ) : (
            "Generate Image"
          )}
        </Button>
      </div>
    </form>
  );
};

export default PromptInput;
