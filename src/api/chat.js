import OpenAI from 'openai';

let openaiInstance = null;

const initializeOpenAI = async () => {
  try {
    const response = await fetch('/api/openai-key', {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });
    
    if (!response.ok) {
      throw new Error('API Key konnte nicht abgerufen werden');
    }

    const { apiKey } = await response.json();
    console.log('OpenAI API Key erfolgreich abgerufen');
    
    openaiInstance = new OpenAI({
      apiKey: apiKey,
      dangerouslyAllowBrowser: true
    });

    return openaiInstance;
  } catch (error) {
    console.error('Fehler beim Initialisieren von OpenAI:', error);
    throw error;
  }
};

export const handleChatRequest = async (message, supplements, symptoms) => {
  console.log('Verarbeite Chat-Anfrage:', { message, supplements, symptoms });

  try {
    if (!openaiInstance) {
      await initializeOpenAI();
    }

    const response = await openaiInstance.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: `Du bist ein medizinischer Assistent, spezialisiert auf Nahrungsergänzungsmittel und Gesundheit.
          Deine Aufgabe ist es, fundierte und wissenschaftlich validierte Informationen zu geben.
          
          Aktuelle Supplements des Nutzers: ${JSON.stringify(supplements)}
          Aktuelle Symptome: ${JSON.stringify(symptoms)}
          
          Wichtige Richtlinien:
          - Gib nur wissenschaftlich belegte Informationen
          - Verweise auf Studien wenn möglich
          - Warne vor möglichen Wechselwirkungen
          - Bei medizinischen Problemen empfehle einen Arztbesuch
          - Bleibe sachlich und professionell`
        },
        {
          role: "user",
          content: message
        }
      ],
      temperature: 0.7,
      max_tokens: 1000,
    });

    console.log('OpenAI Antwort erhalten:', response);
    return response.choices[0].message.content;
  } catch (error) {
    console.error('Fehler bei der Chat-Anfrage:', error);
    throw error;
  }
};