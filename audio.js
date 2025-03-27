const generateAudio = async (text) => {
    const apiKey = 'YOUR_API_KEY'; // Replace with your Eleven Labs API key
    const voiceId = 'Rachel'; // Choose a voice from Eleven Labs
  
    try {
      const response = await fetch('https://api.elevenlabs.io/v1/text-to-speech', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'xi-api-key': apiKey,
        },
        body: JSON.stringify({
          text: text,
          voice: voiceId,
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