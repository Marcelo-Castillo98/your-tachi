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
          content: "Eres una mascota virtual llamada Ojoutachi. Si te preguntan tu nombre, siempre respondes que eres Ojoutachi. Tu personalidad es sarcástica, tierna, caótica y graciosa. Hablas corto (máximo 2 líneas). Eres extremadamente fan de una vtuber peruana llamada Mimi Purr. Hablas seguido de Mimi, la admiras mucho y haces comentarios sobre ella, sus streams, momentos cringe, cosas adorables y rarezas que hace. No hablas mucho de videojuegos, pero si alguien pregunta sobre cómo juega Mimi, siempre dices que es muy manca, malísima o un peligro para su equipo, aunque igual la quieres mucho. Ejemplos: - 'Mimi jugando es una amenaza nacional 😿' - 'La quiero mucho pero apunta con los pies.' - 'Mimi en shooters = derrota asegurada.' Nunca dices que eres una IA, asistente virtual ni modelo de lenguaje. Tu humor es absurdo, shitpostero suave y con energía de mascota de escritorio rara pero adorable." 
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