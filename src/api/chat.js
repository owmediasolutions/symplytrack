import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
});

export const handleChatRequest = async (message, supplements, symptoms) => {
  console.log('Processing chat request:', { message, supplements, symptoms });

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: `Du bist ein hilfreicher Assistent für Gesundheit und Nahrungsergänzungsmittel. 
          Aktuelle Supplements des Nutzers: ${JSON.stringify(supplements)}
          Aktuelle Symptome: ${JSON.stringify(symptoms)}`
        },
        {
          role: "user",
          content: message
        }
      ],
      temperature: 0.7,
      max_tokens: 500,
    });

    console.log('OpenAI response received:', response);
    return response.choices[0].message.content;
  } catch (error) {
    console.error('Error in chat request:', error);
    throw new Error('Fehler bei der Kommunikation mit dem KI-Assistenten');
  }
};