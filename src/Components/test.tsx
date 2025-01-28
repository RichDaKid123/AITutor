import { List } from "lucide-react";

const MathTutorApp = () => {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-1/4 bg-gray-800 text-white p-4 h-[840px]">
        <div className="flex items-center mb-4">
          <List className="mr-3" />
          <h2 className="text-lg font-bold">Chat</h2>
        </div>
        <div className ="relative bottom-0">
          <div className="flex-grow">
            {/* You can display messages or chat content here */}
          </div>
          <textarea
            className="w-full h-[100px] p-2 border-none bg-gray-800 text-white resize-none"
            placeholder="Type your problem..."
          ></textarea>
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
