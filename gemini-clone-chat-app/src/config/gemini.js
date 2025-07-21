import { GoogleGenAI } from "@google/genai";

async function runChat(prompt) {
  const ai = new GoogleGenAI({
    apiKey: "AIzaSyCTLi-fd6G3Letx-WxsscFu4KzYDZqscVo",
  });

  const tools = [
    {
      googleSearch: {},
    },
  ];

  const config = {
    thinkingConfig: {
      thinkingBudget: -1,
    },
    tools,
    responseMimeType: "text/plain",
  };

  const model = "gemini-2.5-pro";
  const contents = [
    {
      role: "user",
      parts: [
        {
          text: prompt,
        },
      ],
    },
  ];

  const response = await ai.models.generateContentStream({
    model,
    config,
    contents,
  });
  let fullResponse = "";

  for await (const chunk of response) {
    fullResponse += chunk.text;
  }
  console.log(fullResponse)
  return fullResponse;
}

export default runChat;
