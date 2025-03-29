const generateAudio = async (text) => {
  const apiKey = 'sk_3857662c34b214499bc9426f7116a86720c2c89d0a595b11'; // Replace with your Eleven Labs API key
  const voiceId = '9XfYMbJVZqPHaQtYnTAO'; // Replace with the correct voice ID from Eleven Labs

  try {
    const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'xi-api-key': apiKey,
      },
      body: JSON.stringify({
        text: text,
        model_id: 'eleven_monolingual_v1', // Use the correct model_id
      }),
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.statusText}`);
    }

    // Convert the response to a blob (binary data)
    const audioBlob = await response.blob();

    // Create a URL for the audio and return it
    return URL.createObjectURL(audioBlob);
  } catch (error) {
    console.error('Error generating audio:', error);
    return null;
  }
};

export default generateAudio;
