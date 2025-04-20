
import React from "react";
import { AspectRatio } from "@/types";
import { ASPECT_RATIO_OPTIONS } from "@/utils/imageUtils";

interface AspectRatioSelectorProps {
  value: AspectRatio;
  onChange: (aspectRatio: AspectRatio) => void;
  disabled?: boolean;
}

const AspectRatioSelector: React.FC<AspectRatioSelectorProps> = ({ value, onChange, disabled = false }) => {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">Aspect Ratio</label>
      <div className="flex flex-wrap gap-2">
        {ASPECT_RATIO_OPTIONS.map((option) => (
          <button
            key={option.id}
            type="button"
            onClick={() => onChange(option.id)}
            disabled={disabled}
            className={`px-3 py-1 text-xs rounded-md transition-colors ${
              value === option.id
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
            } ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default AspectRatioSelector;
