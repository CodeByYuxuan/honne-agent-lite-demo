# Gemini Prompt Sequence for HonneAgent Lite

Use these prompts one by one. Do not paste all of them at once. The goal is to make Gemini build a small, demo-ready MVP quickly.

## Prompt 1 — Build the first full-stack app in Google AI Studio

Paste this into Google AI Studio Build Mode.

```text
Build a full-stack web app called HonneAgent Lite.

Purpose:
HonneAgent Lite helps English-speaking users understand ambiguous Japanese social messages without overclaiming certainty.

Core principle:
The app should not give one final answer. It should keep uncertainty visible.

User input:
1. Japanese message
2. Optional context
3. Relationship type:
   - classmate
   - lab member
   - coworker
   - friend
   - language exchange partner
   - club member
   - other
4. User goal:
   - understand
   - reply politely
   - decide whether to follow up
   - reduce misunderstanding

Server-side Gemini task:
Call Gemini API from the Node.js server only.
Return structured JSON with this schema:

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
  "safety_note": "string"
}

UI:
Create a clean one-page dashboard with cards:
1. Input panel
2. Literal Meaning
3. Possible Interpretations
4. Uncertainty and Missing Context
5. Risky Actions to Avoid
6. Low-Risk Reply Suggestions
7. Safety Note

Add sample buttons:
- 「行けたら行く」
- 「また今度ね」
- 「最近ちょっと忙しくて」
- 「また時間が合えば」
- 「みんなでなら行けるかも」

Important UX requirements:
- Use labels like Possible, Uncertain, and Low-risk.
- Never say that the app knows the speaker's true intent.
- Avoid stereotypes.
- Ask users to anonymize names and personal details.
- Do not store user messages.
- Add a privacy warning at the top:
  "Please remove names and personal details before using this tool."

Tech:
- React frontend
- Node.js server runtime
- Gemini API called only server-side
- Structured JSON output
- No database
- No login
- No file upload
- Prepare for Cloud Run deployment
```

## Prompt 2 — Make the output less generic

Use this if the first version feels like a normal chatbot.

```text
Revise the app so it is clearly different from a generic chatbot.

Changes:
1. Do not produce one final interpretation.
2. Always show 2-3 plausible interpretations.
3. Add a strong uncertainty note.
4. Add a missing-context checklist.
5. Add a risk section showing what the user should avoid doing.
6. Make suggested replies softer and lower-pressure.
7. Avoid stereotypes.
8. Do not claim to know the speaker's true intent.
9. Render the result as structured cards, not as one paragraph.
```

## Prompt 3 — Add the Gemini system instruction

Use this when you need to improve the server-side Gemini behavior.

```text
Add or update the server-side Gemini system instruction:

You are HonneAgent Lite, an uncertainty-aware Japanese message interpretation assistant.

Your task is to help English-speaking users understand ambiguous Japanese social messages.

Rules:
- Do not claim to know the speaker's true intent.
- Do not stereotype Japanese people.
- Do not give one definitive answer when the message is ambiguous.
- Use calibrated language such as "may", "could", and "one possible reading is".
- If context is missing, say so.
- Encourage low-pressure and respectful next steps.
- Provide short Japanese replies with romaji and English translation.
- Return valid JSON matching the schema.
```

## Prompt 4 — Fix JSON and schema errors

Use this if the app crashes or output parsing fails.

```text
Fix JSON parsing and schema handling.

Requirements:
1. Gemini must return valid JSON only.
2. If Gemini returns invalid JSON, show a clear error card instead of crashing.
3. Add safe fallback values for missing fields.
4. Keep the same schema.
5. Do not add new features.
6. Test with:
   「最近ちょっと忙しくて、また時間が合えば。」
```

## Prompt 5 — Improve UI for demo

Use this after the app works.

```text
Improve the UI for a 2-minute hackathon demo.

Design goals:
- Clean Google-style card layout
- Serious and trustworthy tone
- Clear sections
- Visible labels: Possible, Uncertain, Low-risk
- A privacy warning at the top
- A final safety note at the bottom

Do not add login, database, file upload, or extra pages.
```

## Prompt 6 — Add sample messages

Use this to make the live demo faster.

```text
Add sample message buttons. When clicked, each button fills the input box.

Samples:
1. 行けたら行く
2. また今度ね
3. 最近ちょっと忙しくて
4. また時間が合えば
5. みんなでなら行けるかも

Also add one recommended demo example with prefilled context:
Message: 最近ちょっと忙しくて、また時間が合えば。
Relationship type: language exchange partner
User goal: decide whether to follow up
Context: We met once at an event and I invited them to coffee.
```

## Prompt 7 — Optional: add generic AI comparison

Use only if the core MVP already works.

```text
Add an optional comparison panel called "Generic answer vs HonneAgent".

Purpose:
Show why HonneAgent is different from a generic chatbot.

Generic answer:
- Give one direct interpretation.

HonneAgent answer:
- Show multiple possible readings.
- Show uncertainty.
- Show missing context.
- Show low-pressure next steps.

Keep this feature small. Do not make it a second app.
```

## Prompt 8 — Optional: add action-risk scoring

Use only if you have time for function calling or a simple local helper.

```text
Add a simple action-risk scorer.

Candidate actions:
- wait
- soft follow-up
- direct clarification
- repeated message
- ask a personal question
- step back politely

For each action, return:
{
  "action": "string",
  "risk_level": "low | medium | high",
  "reason": "string",
  "safer_alternative": "string"
}

The app should recommend low-risk actions first.
```

## Prompt 9 — Prepare for Cloud Run deployment

Use this before deploying.

```text
Prepare this app for Cloud Run deployment.

Checklist:
1. Confirm the app has a package.json start script.
2. Confirm the server reads GEMINI_API_KEY from environment variables.
3. Confirm Gemini API calls are server-side only.
4. Confirm the app binds to process.env.PORT when deployed.
5. Do not expose secrets in frontend code.
6. Do not add database, login, or file upload.
7. Provide the exact local run command and Cloud Run deploy command.
```

## Prompt 10 — Final demo polish

Use this at the end.

```text
Polish the app for a live 2-minute demo.

The demo story:
1. International users often understand Japanese words but not the social meaning.
2. Generic AI can give one overconfident answer.
3. HonneAgent keeps uncertainty visible.
4. It shows literal meaning, possible interpretations, missing context, risky actions, and low-pressure replies.
5. The goal is not to remove uncertainty but to help users act with better calibration.

Make sure the UI supports this story clearly.
```
