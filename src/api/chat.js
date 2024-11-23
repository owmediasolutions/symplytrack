import OpenAI from 'openai';

const apiKey = import.meta.env.VITE_OPENAI_API_KEY;

if (!apiKey) {
  console.error('OpenAI API Key fehlt. Bitte .env Datei mit VITE_OPENAI_API_KEY erstellen.');
}

const openai = new OpenAI({
  apiKey: apiKey || 'dummy-key',
  dangerouslyAllowBrowser: true // Enable browser usage
});

export const handleChatRequest = async (message, supplements, symptoms) => {
  console.log('Processing chat request:', { message, supplements, symptoms });

  if (!apiKey) {
    throw new Error('OpenAI API Key nicht konfiguriert. Bitte .env Datei mit VITE_OPENAI_API_KEY erstellen.');
  }

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