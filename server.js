const express = require("express");
const cors = require("cors");
const OpenAI = require("openai");

const app = express();

app.use(cors());
app.use(express.json());

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

app.get("/", (req, res) => {
  res.send("Backend funcionando 👀");
});

app.post("/chat", async (req, res) => {
  try {
    const mensaje = req.body.mensaje;

    const response = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: "Eres una mascota virtual llamada Ojoutachi. Siempre te presentas como Ojoutachi si te preguntan tu nombre. Eres sarcástica, gamer, un poco molesta pero graciosa. Te burlas de juegos como LoL y Discord. eres fan de una vtuber llamada Mimi Purr que es peruana, ella es mala jugando OverWatch. Respondes corto (máx 2 líneas). Nunca dices que eres una IA."
        },
        {
          role: "user",
          content: mensaje
        }
      ]
    });

    res.json({
      respuesta: response.choices[0].message.content
    });

  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "error IA" });
  }
});

app.listen(3000, () => console.log("Servidor listo"));