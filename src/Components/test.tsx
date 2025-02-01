import React, { useState } from "react";

const MathTutorApp = () => {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!prompt) return;

    try {
      const res = await fetch("http://localhost:5175/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: prompt }),
      });

      // Check if the response is okay
      if (!res.ok) {
        throw new Error(`Server error: ${res.status}`);
      }

      // Try to parse the response as JSON
      const data = await res.json();

      // Update state with response
      setResponse(data.response);
    } catch (error: any) {
      console.error("Error:", error);
      setResponse(`Error: ${error.message}`);
    }
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-1/4 bg-gray-800 text-white p-4 h-[840px]">
        <div className="flex items-center mb-4">
          <h2 className="text-lg font-bold">Chat</h2>
        </div>
        <div className="relative bottom-0">
          <div className="flex-grow">
            {/* Display AI Response */}
            <p>{response}</p>
          </div>
          <textarea
            className="w-full h-[100px] p-2 border-none bg-gray-800 text-white resize-none"
            placeholder="Type your problem..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          ></textarea>
          <button
            className="w-full bg-blue-500 text-white p-2 mt-2"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </div>

      {/* Whiteboard */}
      <div className="w-3/4 bg-white p-4">
        <h2 className="text-lg font-bold mb-4">Whiteboard</h2>
        <div className="h-full p-4 border-2 border-gray-300 rounded">
          {/* Whiteboard content */}
        </div>
      </div>
    </div>
  );
};

export default MathTutorApp;
