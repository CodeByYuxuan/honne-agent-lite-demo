# HonneAgent Lite Implementation Checklist

This checklist is optimized for a solo hackathon build. The goal is not a complete product. The goal is a stable demo.

## Final product decision

Build HonneAgent Lite, not a broad research system.

One-line product definition:

> HonneAgent Lite helps English-speaking users interpret ambiguous Japanese social messages by showing multiple possible readings, missing context, uncertainty, and low-pressure reply options.

## Must-have features

- [ ] Input field for Japanese message
- [ ] Optional context field
- [ ] Relationship type selector
- [ ] User goal selector
- [ ] Gemini server-side call
- [ ] Structured JSON output
- [ ] Literal meaning card
- [ ] Possible interpretations card
- [ ] Uncertainty and missing context card
- [ ] Actions to avoid card
- [ ] Low-pressure reply suggestions card
- [ ] Privacy warning
- [ ] Safety note
- [ ] Cloud Run deployment or local fallback demo

## Do not build today

- [ ] Login
- [ ] Database
- [ ] File upload
- [ ] Message storage
- [ ] Full research study system
- [ ] Complex ADK multi-agent system
- [ ] Large-scale multilingual corpus search

## Recommended architecture

```text
React UI
  -> POST /api/analyze
    -> validate input
    -> call Gemini with system instruction
    -> request structured JSON
    -> parse / repair / fallback
    -> return dashboard data
  -> render cards
```

## Google stack usage

Core:

- Google AI Studio Build Mode for fast app generation
- Gemini API for interpretation
- Structured JSON output for card rendering
- Cloud Run for deployment

Optional:

- Google Stitch for UI inspiration
- Antigravity for code cleanup and deployment help
- Function calling for action-risk scoring

## Test cases

### Test 1

```text
最近ちょっと忙しくて、また時間が合えば。
```

Expected behavior:

- Shows busyness as one possible reading
- Shows polite distancing as another possible reading
- Does not pick one final answer
- Suggests a low-pressure reply

### Test 2

```text
行けたら行く
```

Expected behavior:

- Explains literal meaning
- Mentions that commitment is weak
- Avoids saying it always means refusal

### Test 3

```text
また今度ね
```

Expected behavior:

- Explains that it may be a polite delay
- Says context matters
- Suggests a soft follow-up or waiting

## Failure analysis checklist

Before demo, confirm the app does not:

- [ ] claim certainty where context is missing
- [ ] give a single overconfident interpretation
- [ ] stereotype Japanese people
- [ ] encourage pressure
- [ ] store private messages
- [ ] expose GEMINI_API_KEY in frontend code
- [ ] crash when Gemini returns malformed JSON

## Cloud Run deployment checklist

- [ ] `npm install` works
- [ ] `npm run dev` works locally
- [ ] `npm run build` works
- [ ] app reads `process.env.GEMINI_API_KEY`
- [ ] app binds to `process.env.PORT` if needed
- [ ] Cloud Run service allows unauthenticated access for demo
- [ ] demo URL opens in browser

## 2-minute demo script

```text
Many international students and newcomers in Japan understand the words of a Japanese message, but not always the social meaning. Generic AI often gives one confident interpretation, which can make ambiguity feel more certain than it really is.

HonneAgent Lite is an uncertainty-aware Japanese message interpreter. It shows literal meaning, several plausible interpretations, missing context, actions to avoid, and low-pressure reply options.

Technically, I built it with Gemini structured output. The model returns typed JSON, and the UI renders it as cards. The goal is not to remove uncertainty. The goal is to help users act with better calibration when meaning is uncertain.
```
