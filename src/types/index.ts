
export interface GeneratedImage {
  id: string;
  prompt: string;
  style: string;
  aspectRatio: AspectRatio;
  imageUrl: string;
  timestamp: number;
}

export type AspectRatio = "1:1" | "16:9" | "9:16" | "4:3" | "3:4";

export interface StyleOption {
  id: string;
  label: string;
  value: string;
}

export interface AspectRatioOption {
  id: AspectRatio;
  label: string;
  width: number;
  height: number;
}
