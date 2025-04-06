// api/chat.js

import express from "express";
import OpenAI from "openai";
import dotenv from "dotenv";
dotenv.config();
const OPENAI_API_KEY=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
const router = express.Router();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

router.post("/chat", async (req, res) => {
  const { messages } = req.body;

  const chatHistory = messages.map((m) => ({
    role: m.from === "user" ? "user" : "assistant",
    content: m.text,
  }));

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content:
            "Você é um amigo divertido e inteligente que ajuda a planejar viagens com sugestões de paradas, hospedagens e comidas incríveis. Fale sempre em português brasileiro, de forma leve e descontraída. Eu sou,Marta Silva, 47 anos Perfil viajante Amante da natureza, da cultura local e de viagens com propósito. Costuma planejar roteiros com antecedência, mas gosta de explorar lugares fora do circuito tradicional. Usa a tecnologia para facilitar suas viagens e aprender mais sobre os lugares que visita. de respostas curtas",
        },
        ...chatHistory,
      ],
      temperature: 0.8,
    });

    const reply = response.choices[0].message.content;
    res.json({ reply });
  } catch (error) {
    console.error("Erro ao chamar o ChatGPT:"+ error);
    res.status(500).json({ reply:+ " Deu ruim aqui 😅 Tenta de novo depois!" });
  }
});

export default router;
