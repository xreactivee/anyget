export type Platform = "spotify" | "youtube" | "instagram" | "tiktok" | "facebook" | "soundcloud";

export type DownloadType = "audio" | "video";

export type Format = "mp3" | "wav" | "m4a" | "mp4" | "webm";

export interface PlatformSelectProps {
  onSelect: (platform: Platform) => void;
}

export interface TypeSelectProps {
  platform: Platform;
  onSelect: (type: DownloadType) => void;
  onBack: () => void;
}

export interface FormatSelectProps {
  platform: Platform;
  type: DownloadType;
  onSelect: (format: Format) => void;
  onBack: () => void;
}

export interface LinkInputProps {
  platform: Platform;
  onSubmit: (link: string) => void;
  onBack: () => void;
}

export interface DownloadData {
  success: boolean;
  downloadUrl: string;
  title?: string;
  thumbnail?: string;
  format?: string;
  headers?: Record<string, string>;
  originalUrl?: string;
}


export interface DownloadReadyProps {
  onReset: () => void;
  data: DownloadData | null;
}

export interface DownloaderModalProps {
  isOpen: boolean;
  onClose: () => void;
}
