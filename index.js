import dotenv from "dotenv";  // Import dotenv to load environment variables
import express from "express";
import bodyParser from "body-parser";
import { HfInference } from "@huggingface/inference";  // Import Hugging Face Inference API
import cors from 'cors';  // Import CORS

// Load environment variables from .env file
dotenv.config();

// Debugging: Check if API key is loaded
console.log("Hugging Face API Key:", process.env.HUGGINGFACE_API_KEY);

const app = express();
const port = 5175;

// Enable CORS for all routes
app.use(cors({ origin: 'http://localhost:5173' })); 

// Middleware to parse JSON request bodies
app.use(bodyParser.json());

// Initialize Hugging Face inference client with API key from environment variable
const hf = new HfInference(process.env.HUGGINGFACE_API_KEY);  // Use Hugging Face API key

// Root route for GET request
app.get("/", (req, res) => {
  res.send("Hello! Server is running.");
});

// Chat endpoint to interact with Hugging Face
app.post("/chat", async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).send({ error: "Prompt is required" });
    }

    // Use Hugging Face's text generation model (e.g., GPT-2)
    const completion = await hf.textGeneration({
      model: 'gpt2',  // You can change the model to another Hugging Face model if needed
      inputs: prompt,  // The prompt sent from the frontend
    });

    res.send({ response: completion.generated_text.trim() });  // Return the generated response
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send({ error: error.message });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
