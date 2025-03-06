import React, { useEffect } from "react";
import "mathlive";
import { MathTutorAppProps } from "../types/interfaces";

// You can add more interfaces here as needed
const Sidebar: React.FC<MathTutorAppProps> = ({ prompt, setPrompt, handleSubmit, loading, error }) => {
  useEffect(() => {
    const mathField = document.getElementById("math-field");
    if (mathField) {
      mathField.addEventListener("input", (evt) => setPrompt(evt.target.value));
    }
  }, []);

  return (
    <div className="w-1/4 bg-gray-800 text-white p-4 h-full flex flex-col">
      <div className="flex items-center mb-4">
        <h2 className="text-lg font-bold">Chat</h2>
      </div>
      <div className="flex-grow"></div>
      <div className="mt-auto">
        <div className="flex mb-2">
        <math-field
          id="math-field"
          placeholder=""
          value={prompt}
          smart-mode="true"
        ></math-field>
        </div>
        <button
          className="w-full bg-blue-500 text-white p-2 mt-2 hover:bg-blue-600 transition duration-200"
          onClick={handleSubmit}
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