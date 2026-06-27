# HonneAgent Lite

HonneAgent Lite is an uncertainty-aware Japanese social message interpreter built for the Gemini AI Hackathon @ Google Japan.

It helps international users in Japan interpret ambiguous Japanese messages without pretending to know the speaker’s true intention.

## Core idea

Generic AI often gives one confident interpretation. HonneAgent keeps ambiguity visible.

The app returns:

- Literal meaning
- Possible interpretations
- Uncertainty note
- Missing context
- Risky actions to avoid
- Low-risk reply suggestions in Japanese and English

## Safety boundary

HonneAgent is not a hidden-intention decoder. It does not claim to know what someone “really means.” It only shows plausible interpretations based on limited context.

Users should remove names and private details before using the tool.

## Tech stack

- Gemini API
- Google AI Studio
- React
- Node.js
- Cloud Run
