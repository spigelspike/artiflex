
import React from "react";
import { STYLE_OPTIONS } from "@/utils/imageUtils";
import { DropdownMenu, DropdownMenuContent, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { PaintBucket } from "lucide-react";

interface StyleSelectorProps {
  value: string;
  onChange: (style: string) => void;
  disabled?: boolean;
}

const StyleSelector: React.FC<StyleSelectorProps> = ({ value, onChange, disabled = false }) => {
  // Find the current style label for display
  const currentStyle = STYLE_OPTIONS.find(style => style.value === value) || STYLE_OPTIONS[0];
  
  return (
    <div className="space-y-2">
      <label htmlFor="style-selector" className="text-sm font-medium">
        Art Style
      </label>
      
      <DropdownMenu>
        <DropdownMenuTrigger asChild disabled={disabled}>
          <Button 
            variant="outline" 
            className="w-full justify-between"
            disabled={disabled}
          >
            <div className="flex items-center gap-2">
              <PaintBucket className="h-4 w-4" />
              <span>{currentStyle.label}</span>
            </div>
          </Button>
        </DropdownMenuTrigger>
        
        <DropdownMenuContent className="w-[200px] max-h-[300px] overflow-y-auto">
          <DropdownMenuRadioGroup value={value} onValueChange={onChange}>
            {STYLE_OPTIONS.map((style) => (
              <DropdownMenuRadioItem 
                key={style.id} 
                value={style.value}
                className="cursor-pointer"
              >
                {style.label}
              </DropdownMenuRadioItem>
            ))}
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default StyleSelector;
