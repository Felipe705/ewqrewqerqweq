// server.js
import express from "express";
import chatRoute from "./api/chat.js";
import dotenv from "dotenv";
import cors from "cors";
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

dotenv.config();

// Pega o diretório atual (substituto do __dirname)

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express();
const PORT = process.env.PORT || 3001;
const PORTSITE = 3002;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

// Rotas
app.use("/api", chatRoute);

// Rota de teste
app.get("/", (req, res) => {
  res.send("API de viagem com ChatGPT está no ar! 🌍");
});

// Iniciar servidor
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Servidor rodando na porta ${PORT} 🚀`);
});

app.get('/index', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
  });

  // api/index.js

