import React, { useState } from "react";
import Sidebar from "./SideBar";
import Whiteboard from "./Whiteboard";
import { MathTutorAppProps } from "../types/interfaces.js";
import generateAudio from './audio.js';

const MathTutorApp: React.FC<MathTutorAppProps> = () => {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [width, setWidth] = useState("16");
  const [audioUrl, setAudioUrl] = useState<string | null>(null); // State for audio URL

  const fontSize = (response: string) => {
    const calculatedWidth = Math.max(32 - response.length * 0.5, 20); 
    setWidth(calculatedWidth);  // Update width state with the calculated font size
  };
  

  const specialInstructions =
    "Provide a clear, step-by-step equation-solving process in proper LaTeX format for the following problem. " +
    "Do not include any words, explanations, or descriptions—only mathematical expressions using valid LaTeX notation. " +
    "Separate each step with the | symbol. Always use at a minumum two steps. " +
    "Wrap each equation in double dollar signs ($$) to ensure correct rendering. " +
    "Ensure all exponents, fractions, and mathematical operations follow proper LaTeX syntax. " +
    "Be extremely detailed and make sure you document each change, whether big or small, as a step." +
    "After providing the full step-by-step solution in LaTeX, give a clear, simple, and easy-to-follow explanation of the entire solution. Explain the logic behind each step and how these steps lead to the final answer. Use everyday language to make the explanation understandable for someone learning this concept for the first time. Keep the explanation concise but thorough, and separate it from the LaTeX output with the delimiter ###.";

  const parseResponse = (response: string) => {
    const lines = response
      .split("|")
      .map((line) => line.trim().replace(/\$\$/g, "")) // Remove $$ before rendering
      .filter(Boolean);

    setResponse(lines);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    if (!prompt.trim()) return;

    setLoading(true);
    setError("");
    setResponse([]);

    try {
      const fullPrompt = `${specialInstructions} Problem: ${prompt}`;
      const res = await fetch("http://localhost:5175/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: fullPrompt,
          temperature: 0.2,
          max_tokens: 200,
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

      console.log("API Response:", data.response); // Debugging
      fontSize(data.response); // Calculate and set font size based on the response length
      parseResponse(data.response); // Parse and display the response

      const audioUrl = await generateAudio(data.response);
      console.log("Generated Audio URL:", audioUrl); // Check the URL in the console
      setAudioUrl(audioUrl); // Set audio URL for playback

    } catch (error: any) {
      console.error("Error:", error);
      setError(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen">
      <Sidebar
        prompt={prompt}
        setPrompt={setPrompt}
        handleSubmit={handleSubmit}
        loading={loading}
        error={error}
        audioUrl={audioUrl}  // Pass the audio URL here
      />
      <Whiteboard response={response} loading={loading} width={width} />
    </div>
  );
};

export default MathTutorApp;
