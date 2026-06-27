# HonneAgent Lite

HonneAgent Lite is an uncertainty-aware Japanese message interpretation demo for the Gemini AI Hackathon at Google Japan.

The project helps English-speaking users understand ambiguous Japanese social messages by showing multiple possible readings, missing context, and low-pressure response options.

## Core idea

Generic chatbots often produce one confident answer. HonneAgent Lite keeps uncertainty visible.

## MVP output

The app returns:

- literal meaning
- plain English gloss
- possible interpretations
- uncertainty note
- missing context checklist
- actions to avoid
- low-pressure reply suggestions in Japanese, romaji, and English

## Product boundary

This app is not an authority on another person's intent. It only provides plausible readings based on limited context.

Users should remove names and personal details before using the tool.

## MVP scope

- one-page web app
- no login
- no database
- no file upload
- no message storage

## Tech stack

- Google AI Studio Build Mode
- Gemini API
- structured JSON output
- React frontend
- Node.js server runtime
- Cloud Run deployment

## Demo input

```text
最近ちょっと忙しくて、また時間が合えば。
```

## Demo closing line

HonneAgent Lite does not remove uncertainty. It helps users act with better calibration when meaning is uncertain.
