import React, { useState } from "react";
import Sidebar from "./SideBar";
import Whiteboard from "./Whiteboard";

const MathTutorApp = () => {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [width, setWidth] = useState("1.5rem");

  const specialInstructions =
    "Provide a clear, step-by-step equation-solving process for the following problem. Do not include any text explanations—only show the equation at each step. Use the | symbol to separate each step. Make sure to state the final solution";

  const parseResponse = (response: string) => {
    const lines = response.split("|").map((line) => line.trim()).filter(Boolean);
    const maxLength = Math.max(...lines.map(line => line.length));
    if (maxLength < 20) {
      setWidth("2.5rem");
    } else if (maxLength < 40) {
      setWidth("2rem");
    } else {
      setWidth("1.5rem");
    }
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

      parseResponse(data.response);
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
