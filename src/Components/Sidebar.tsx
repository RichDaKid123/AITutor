import React, { useEffect } from "react";
import "mathlive";
import { MathTutorAppProps } from "../interfaces";

// You can add more interfaces here as needed
const Sidebar: React.FC<MathTutorAppProps> = ({
  prompt,
  setPrompt,
  handleSubmit,
  loading,
  error,
  audioUrl,    // Audio URL to be passed from the parent component
}) => {
  useEffect(() => {
    const mathField = document.getElementById("math-field");
    if (mathField) {
      mathField.addEventListener("input", (e) => setPrompt(e.target.value));
    }
  }, [setPrompt]);

  // Function to handle playing the audio
  const playAudio = () => {
    if (audioUrl) {
      const audio = new Audio(audioUrl);
      audio.play();
      console.log("Audio has been played")
    }
  };

  return (
    <div className="w-1/4 bg-gray-800 text-white p-4 h-full flex flex-col">
      <div className="flex items-center mb-5">
        <h2 className="text-lg font-bold">Chat</h2>
      </div>
      <div className="mt-auto">
        <div className="flex mb-2 overflow-hidden">
          <div className="max-w-full h-10 overflow-y-auto">
            <math-field
              id="math-field"
              placeholder=""
              value={prompt}
              smart-mode="true"
              className="w-full"
            ></math-field>
          </div>
        </div>
        <button
          className="w-full bg-blue-500 text-white p-2 mt-2 hover:bg-blue-600 transition duration-200"
          onClick={() => {
            handleSubmit();  // Generate the response and audio
            playAudio();     // Automatically play the audio after submission
          }}
          disabled={loading}
        >
          {loading ? "Submitting..." : "Submit"}
        </button>
        {error && <p className="text-red-500 mt-2">{error}</p>}
      </div>
    </div>
  );
};

export default Sidebar;
