export interface MathTutorAppProps {
  prompt: string;
  setPrompt: (value: string) => void;
  response: string[];
  loading: boolean;
  error: string;
  width: number;
  setWidth: (value: number) => void; // If you want to allow width to be set from props
  handleSubmit: () => void; // Add handleSubmit to the interface
  audioUrl: string; // Optional audio URL
  setAudioUrl: (url: string) => void; // Optional setter for audio URL
}