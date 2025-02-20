import express from 'express';
import OpenAI from 'openai'; 
import dotenv from 'dotenv';
import cors from 'cors'; // Import CORS

// Load environment variables
dotenv.config();

// Set up OpenAI configuration
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  apiBaseUrl: 'https://api.openai.com/v1',
});

// Initialize the Express app
const app = express();

// Enable CORS for all origins (or specify allowed origins)
app.use(cors());

// Middleware to parse JSON requests
app.use(express.json());

// POST route to handle AI requests
app.post('/chat', async (req, res) => {
  const { prompt, temperature, max_tokens } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: 'Prompt is required' });
  }

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
      temperature: temperature || 0.2,
      max_tokens: max_tokens || 200,
    });

    return res.json({ response: response.choices[0].message.content.trim() });
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ error: 'Error processing the request' });
  }
});

// Start the server
const PORT = process.env.PORT || 5175;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
