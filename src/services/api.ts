export const sendMessage = async (query: string, image?: File): Promise<string> => {
  try {
    // Determine whether to send a text query or an image
    if (image) {
      // If we have an image, convert it to base64 and send it
      return await sendImageMessage(query, image);
    } else if (query.trim()) {
      // If we only have a query, send it
      return await sendTextMessage(query);
    } else {
      throw new Error('Either a query or an image must be provided');
    }
  } catch (error) {
    console.error('Error sending message:', error);
    throw error;
  }
};

// Function to send text-only message
const sendTextMessage = async (query: string): Promise<string> => {
  const payload = {
    model: "aryabhata",
    messages: [{"role": "user", "content": query}],
    max_tokens: 4096,
    stream: false,
    temperature: 0,
    stop: ["<|im_end|>", "<|end|>", "<im_start|>", "```python\n", "<|im_start|>", "]}}]}}]", " <im_start>"]
  };
  
  const response = await fetch('https://http.aryabhatta-proxy.yotta-infrastructure.on-prem.clusters.s9t.link/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1dWlkIjoiNjBjYWEyOTAtMWZiYi00YWQwLTg4MTAtM2Y1ZDM1N2UxNGJlIiwiZXhwIjoxNzg2MDEwOTEzLCJvcmdfdXVpZCI6IjUyNjUwNzNkLTIxMjAtNDFlMS1hMzc5LTI3MWY1YjllYzVkMyJ9.H1awFKuISfVOGtqoKNgp5z9k1eAHBYUy4Cl0fWyXVts',
      'Content-Type': 'application/json',
      'id': 'a61042f4-3138-4b5e-bd79-3571fbc8fb7e'
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error('API Error Response:', errorText);
    throw new Error(`API request failed with status ${response.status}`);
  }

  const data = await response.json();
  console.log('API Response:', data);
  console.log('Content being returned:', data.choices[0].message.content);
  return data.choices[0].message.content;
};

// Function to send message with image
const sendImageMessage = async (query: string, image: File): Promise<string> => {
  // Convert image to base64
  const base64Image = await fileToBase64(image);
  
  // Create payload with base64 image and query
  const payload = {
    model: "aryabhata",
    messages: [
      {
        "role": "user", 
        "content": query.trim()
      }
    ],
    max_tokens: 4096,
    stream: false,
    temperature: 0,
    stop: ["<|im_end|>","<|end|>","<im_start|>","```python\n","<|im_start|>","]}}]}}]"," <im_start>"]
  };
  
  const response = await fetch('https://http.aryabhatta-proxy.yotta-infrastructure.on-prem.clusters.s9t.link/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1dWlkIjoiNjBjYWEyOTAtMWZiYi00YWQwLTg4MTAtM2Y1ZDM1N2UxNGJlIiwiZXhwIjoxNzg2MDEwOTEzLCJvcmdfdXVpZCI6IjUyNjUwNzNkLTIxMjAtNDFlMS1hMzc5LTI3MWY1YjllYzVkMyJ9.H1awFKuISfVOGtqoKNgp5z9k1eAHBYUy4Cl0fWyXVts',
      'Content-Type': 'application/json',
      'id': 'a61042f4-3138-4b5e-bd79-3571fbc8fb7e'
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error('API Error Response:', errorText);
    throw new Error(`API request failed with status ${response.status}`);
  }

  const data = await response.json();
  console.log('API Response:', data);
  console.log('Content being returned:', data.choices[0].message.content);
  return data.choices[0].message.content;
};

// Helper function to convert File to base64
const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        // Remove the data URL prefix (e.g., "data:image/jpeg;base64,")
        const base64 = reader.result.split(',')[1];
        resolve(base64);
      } else {
        reject(new Error('Failed to convert file to base64'));
      }
    };
    reader.onerror = error => reject(error);
  });
};
