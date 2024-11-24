const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();

const genAI = new GoogleGenerativeAI(process.env.API_KEY);

async function askTheQuestion(promptText) {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const result = await model.generateContent(promptText);
  const response = await result.response;
  const text = response.text();
  console.log(text);
}



askTheQuestion("quantos anos vc tem?")