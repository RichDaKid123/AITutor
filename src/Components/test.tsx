import React, { useState } from "react";

const MathTutorApp = () => {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const specialInstructions = "Provide the step-by-step equation solving process for the following problem. Do not explain the steps in text. Just show the equation at each step."; // Your special instructions here

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!prompt.trim()) return; // Prevent empty prompts

    setLoading(true); // Set loading to true when submitting
    setError(""); // Clear previous errors

    try {
      // Combine prompt with special instructions
      const fullPrompt = `${specialInstructions} Problem: ${prompt}`;

      // Make a POST request to the backend server
      const res = await fetch("http://localhost:5175/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: fullPrompt,
          temperature: 0.2, // Adjust this for randomness
          max_tokens: 200, // Limits the response length
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(`${errorData.error}`);
      }

      const data = await res.json();

      if (data.error) {
        throw new Error(data.error);
      }

      setResponse(data.response); // Set the response from the server
    } catch (error: any) {
      console.error("Error:", error);
      setError(`Error: ${error.message}`); // Display error message
    } finally {
      setLoading(false); // Set loading to false after response or error
    }
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-1/4 bg-gray-800 text-white p-4 h-full">
        <div className="flex items-center mb-4">
          <h2 className="text-lg font-bold">Chat</h2>
        </div>
        <div className="flex flex-col h-full">
          <textarea
            className="w-full h-[100px] p-2 border-none bg-gray-800 text-white resize-none"
            placeholder="Type your problem..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          ></textarea>
          <button
            className="w-full bg-blue-500 text-white p-2 mt-2 hover:bg-blue-600 transition duration-200"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
          <div className="flex-grow overflow-auto mt-4">
            {loading ? (
              <p>Loading...</p>
            ) : error ? (
              <p className="text-red-500">{error}</p>
            ) : (
              <p>{response}</p>
            )}
          </div>
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
