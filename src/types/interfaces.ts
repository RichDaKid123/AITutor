export interface MathTutorAppProps {
  prompt: string;
  setPrompt: (value: string) => void;
  response: string[];
  loading: boolean;
  error: string;
  width: string;
  setWidth: (value: string) => void; // If you want to allow width to be set from props
  handleSubmit: () => void; // Add handleSubmit to the interface
}