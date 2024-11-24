import OpenAI from 'openai';

const apiKey = import.meta.env.VITE_OPENAI_API_KEY;

if (!apiKey || !apiKey.startsWith('sk-')) {
  console.error('OpenAI API Key fehlt oder ist ungültig. Bitte stellen Sie sicher, dass die .env Datei einen gültigen VITE_OPENAI_API_KEY enthält.');
  throw new Error('OpenAI API Key nicht korrekt konfiguriert. Der Key muss mit "sk-" beginnen.');
}

const openai = new OpenAI({
  apiKey: apiKey,
  dangerouslyAllowBrowser: true
});

export const handleChatRequest = async (message, supplements, symptoms) => {
  console.log('Processing chat request:', { message, supplements, symptoms });

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4",
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
    if (error.response) {
      console.error('OpenAI API Error:', error.response.data);
    }
    throw new Error('Fehler bei der Kommunikation mit dem KI-Assistenten');
  }
};