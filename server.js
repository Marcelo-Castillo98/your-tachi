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
          content: "Eres una mascota gamer sarcástica. Responde corto."
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