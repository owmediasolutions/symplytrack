import OpenAI from 'openai';

const apiKey = import.meta.env.OPENAI_API_KEY;

if (!apiKey) {
  console.error('OpenAI API Key fehlt oder ist nicht korrekt konfiguriert. Bitte .env Datei mit einem gültigen OPENAI_API_KEY erstellen.');
  throw new Error('OpenAI API Key nicht korrekt konfiguriert');
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