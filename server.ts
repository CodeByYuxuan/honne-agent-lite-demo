import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

// Parse JSON bodies
app.use(express.json());

// Lazy-loaded Gemini client setup
let aiClient: GoogleGenAI | null = null;

function getAiClient(): GoogleGenAI {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY environment variable is required. Please set it in the Secrets panel.");
    }
    aiClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiClient;
}

// API Health Check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

// Interpretation endpoint
app.post("/api/interpret", async (req, res) => {
  try {
    const { message, context, relationship, goal } = req.body;

    if (!message || typeof message !== "string" || !message.trim()) {
      return res.status(400).json({ error: "Please enter a message to interpret." });
    }

    const ai = getAiClient();

    const systemInstruction = `
You are HonneAgent, an uncertainty-aware Japanese social message interpretation assistant for English-speaking international users in Japan.
Your core principle: You are NOT a "hidden-intention decoder" or "mind reader" that claims to know the absolute "true meaning." Instead, you show plausible, multi-angle interpretations based on limited context, and emphasize the inherent social ambiguity of Japanese communication (e.g., Keigo, indirect refusals, or standard polite postponement).

CRITICAL CONTEXT FOR ENGLISH MESSAGES:
Often, when communicating in English, Japanese speakers will directly translate Japanese social formulas into English phrases (for example: "I will go if I can make it" representing "行けたら行く" / "Iketara iku", "Maybe next time" representing "また今度ね" / "Mata kondo ne", or "Lately I am a little busy" representing "最近ちょっと忙しくて" / "Saikin chotto isogashikute").
If the input message is in English (or is a direct translation of Japanese expressions used by a Japanese speaker), interpret it as representing the corresponding Japanese social phrase. In your analysis:
- State the corresponding Japanese phrase and its cultural/relational role.
- Explain how this English phrasing is influenced by Japanese indirectness, politeness, and face-saving customs.

CRITICAL DIRECTIVES:
1. Always provide exactly 2 to 3 plausible interpretations in the 'possible_interpretations' array. Never choose or present one single "final" or "true" interpretation.
2. Use objective, non-accusatory labels like "Possible", "Uncertain", "Low-risk" to describe interpretations.
3. NEVER say "true meaning", "real intention", "what they actually mean", or similar definitive terms.
4. NEVER make sweeping, over-generalized, or stereotyping statements like "Japanese people always mean..." or "In Japan, everyone does...".
5. Frame explanations constructively, explaining nuance (e.g., preserving social harmony, avoiding direct refusals to save face/show politeness, or keeping relationships comfortable).
6. Avoid dating-heavy language. Keep the communication focused on social, educational (classmate/club), or professional (coworker/lab member) relationships.
7. Always include a strong, clear, and comprehensive "uncertainty_note" highlighting linguistic and social ambiguity.
8. Each interpretation must have a clear, realistic "risk_if_over_assumed" statement to act as a "Do not over-assume" warning.
9. Provide safe, natural, soft, and extremely low-pressure suggested replies in Japanese and English that allow the speaker a comfortable, face-saving "out".

Output MUST conform strictly to this JSON schema:
{
  "literal_meaning": "string",
  "plain_english_gloss": "string",
  "possible_interpretations": [
    {
      "label": "string",
      "explanation": "string",
      "confidence": "low | medium | high",
      "risk_if_over_assumed": "string"
    }
  ],
  "uncertainty_note": "string",
  "missing_context": ["string"],
  "risky_actions_to_avoid": ["string"],
  "low_risk_next_steps": ["string"],
  "suggested_replies_japanese": [
    {
      "reply": "string",
      "tone": "soft | polite | casual | boundary-respecting",
      "romaji": "string",
      "english_translation": "string"
    }
  ],
  "suggested_replies_english": ["string"],
  "safety_note": "This is not a hidden-intention decoder. It only shows plausible interpretations based on limited context."
}
`;

    const userPrompt = `
Analyze the following social message received from a Japanese speaker (can be in Japanese or a translated English phrase):
Message: "${message}"
Relationship: ${relationship || "unspecified"}
Optional Context: ${context || "None provided"}
User Goal: ${goal || "understand / reduce misunderstanding"}

Provide the response in structured JSON matching the requested schema. Ensure all fields are filled.
`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: userPrompt,
      config: {
        systemInstruction,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            literal_meaning: {
              type: Type.STRING,
              description: "The direct, word-for-word or semantic translation of the message into English.",
            },
            plain_english_gloss: {
              type: Type.STRING,
              description: "A quick, natural, plain English summary of what is literally said.",
            },
            possible_interpretations: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  label: {
                    type: Type.STRING,
                    description: "A neutral, descriptive label (e.g., 'Polite postponement', 'Soft refusal', 'Friendly invitation', 'Indecision'). Do NOT use terms like 'hidden motive'.",
                  },
                  explanation: {
                    type: Type.STRING,
                    description: "Why this interpretation is plausible, explaining the cultural, relational, or linguistic elements (such as indirectness or standard polite phrases).",
                  },
                  confidence: {
                    type: Type.STRING,
                    description: "Must be 'low', 'medium', or 'high'.",
                  },
                  risk_if_over_assumed: {
                    type: Type.STRING,
                    description: "The social risk if the user acts as if this interpretation is 100% correct.",
                  },
                },
                required: ["label", "explanation", "confidence", "risk_if_over_assumed"],
              },
            },
            uncertainty_note: {
              type: Type.STRING,
              description: "An explanation of why this message is inherently ambiguous, noting linguistic modifiers, particles, or common social formulas.",
            },
            missing_context: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "What extra pieces of context would reduce interpretation uncertainty.",
            },
            risky_actions_to_avoid: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "Behaviors or responses to avoid to prevent social pressure, awkwardness, or overstepping boundaries.",
            },
            low_risk_next_steps: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "Neutral or low-pressure actions the user can take next.",
            },
            suggested_replies_japanese: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  reply: {
                    type: Type.STRING,
                    description: "Suggested reply in Japanese characters.",
                  },
                  tone: {
                    type: Type.STRING,
                    description: "Must be 'soft', 'polite', 'casual', or 'boundary-respecting'.",
                  },
                  romaji: {
                    type: Type.STRING,
                    description: "Romaji pronunciation of the Japanese reply.",
                  },
                  english_translation: {
                    type: Type.STRING,
                    description: "English translation of the reply.",
                  },
                },
                required: ["reply", "tone", "romaji", "english_translation"],
              },
            },
            suggested_replies_english: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "Suggested reply strategies or phrases if responding in English.",
            },
            safety_note: {
              type: Type.STRING,
              description: "Must be exactly: 'This is not a hidden-intention decoder. It only shows plausible interpretations based on limited context.'",
            },
          },
          required: [
            "literal_meaning",
            "plain_english_gloss",
            "possible_interpretations",
            "uncertainty_note",
            "missing_context",
            "risky_actions_to_avoid",
            "low_risk_next_steps",
            "suggested_replies_japanese",
            "suggested_replies_english",
            "safety_note",
          ],
        },
      },
    });

    const jsonText = response.text;
    if (!jsonText) {
      throw new Error("Received an empty response from the AI model.");
    }

    try {
      const interpretationData = JSON.parse(jsonText.trim());
      res.json(interpretationData);
    } catch (parseError) {
      console.error("JSON Parsing Error of model response:", jsonText, parseError);
      throw new Error("The AI model returned a response that could not be parsed as structured JSON. Please try again.");
    }
  } catch (error: any) {
    console.error("Interpretation Error:", error);
    res.status(500).json({
      error: error.message || "An unexpected error occurred while analyzing the Japanese message.",
    });
  }
});

// Vite & Static assets hosting logic
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`HonneAgent server listening on http://localhost:${PORT}`);
  });
}

startServer();
