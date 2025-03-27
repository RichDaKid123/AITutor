import React from "react";
import { MathTutorAppProps } from "../types/interfaces";
import MathJax from "react-mathjax2";

const Whiteboard: React.FC<MathTutorAppProps> = ({ response, loading, width }) => {
  return (
    <div className="w-3/4 bg-white p-4 h-screen flex flex-col">
      <h2 className="text-lg font-bold mb-4">Whiteboard</h2>
      <div className="flex-grow p-4 border-2 border-gray-300 rounded overflow-auto">
        {loading ? (
          <p>Loading...</p>
        ) : (
          <MathJax.Context input="tex">
            <div className="flex flex-col items-start">
              {response.map((line, index) => (
                <div key={index} className="mb-2" style={{ fontSize: `${width}px` }}>
                  <span className="font-bold">Step {index + 1}:</span>
                  <MathJax.Node>{line}</MathJax.Node>
                </div>
              ))}
            </div>
          </MathJax.Context>
        )}
      </div>
    </div>
  );
};

export default Whiteboard;
