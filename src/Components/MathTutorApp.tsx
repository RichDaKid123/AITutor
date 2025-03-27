import React, { useState } from "react";
import Sidebar from "./SideBar";
import Whiteboard from "./Whiteboard";
import { MathTutorAppProps } from "../types/interfaces";

const MathTutorApp: React.FC<MathTutorAppProps> = () => {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [width, setWidth] = useState("16");

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
    "Be extremely detailed and make sure you document each change, whether big or small, as a step.";

  const parseResponse = (response: string) => {
    const lines = response
      .split("|")
      .map((line) => line.trim().replace(/\$\$/g, "")) // Remove $$ before rendering
      .filter(Boolean);

    setResponse(lines);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
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
      />
      <Whiteboard response={response} loading={loading} width={width} />
    </div>
  );
};

export default MathTutorApp;
