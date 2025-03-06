import { MathTutorAppProps } from "../types/interfaces";

const Whiteboard: React.FC<MathTutorAppProps> = ({ response, loading, width }) => (
  <div className="w-3/4 bg-white p-4 h-screen flex flex-col">
    <h2 className="text-lg font-bold mb-4">Whiteboard</h2>
    <div className="flex-grow p-4 border-2 border-gray-300 rounded overflow-auto">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="flex flex-col items-start items-center">
          {response.map((line, index) => (
            <p key={index} style={{ fontSize: width }}>
              Step {index + 1}: {line}
            </p>
          ))}
        </div>
      )}
    </div>
  </div>
);

export default Whiteboard;