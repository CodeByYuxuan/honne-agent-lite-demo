# Next Prompt for Gemini

Use this now. Do not ask Gemini to add new product features. The app already has the core MVP: structured cards, sample scenarios, uncertainty notes, low-pressure replies, and stable fallback behavior.

## Prompt: Cloud Run readiness and final demo hardening

```text
Stop adding new features. Prepare the current HonneAgent Lite app for a stable 2-minute hackathon demo and Cloud Run deployment.

Your job is to audit and harden the existing app only.

Tasks:
1. Inspect the project structure and identify the exact commands for:
   - installing dependencies
   - running locally
   - building for production
   - starting the production server
   - deploying to Cloud Run

2. Check deployment readiness:
   - package.json has correct scripts
   - the server binds to process.env.PORT or a safe fallback port
   - Gemini API calls are server-side only
   - GEMINI_API_KEY is read from environment variables
   - no API key or secret appears in frontend code
   - static frontend files are served correctly in production
   - build output is compatible with the server

3. Check reliability:
   - app does not crash if GEMINI_API_KEY is missing
   - app does not crash if Gemini returns invalid JSON
   - app does not crash if the network is slow
   - preloaded samples still work even if live Gemini calls fail
   - errors are shown as user-friendly cards

4. Check demo quality:
   - the default demo example is easy to run
   - sample buttons work
   - output has structured cards, not a generic chatbot paragraph
   - the result always shows 2-3 plausible interpretations
   - the result includes an uncertainty note
   - the result includes missing context
   - the result includes low-pressure replies
   - the result includes a privacy warning
   - the result does not claim certainty about another person's intent

5. Do not add:
   - login
   - database
   - file upload
   - new pages
   - user feedback mechanism
   - long-term memory
   - analytics
   - large new UI redesign

6. After auditing, make only the smallest code changes needed for build stability and deployment.

7. At the end, print:
   - local run command
   - production build command
   - production start command
   - Cloud Run deploy command
   - required environment variables
   - final 2-minute demo checklist

Test with these examples:
- 最近ちょっと忙しくて、また時間が合えば。
- 行けたら行く
- I'll go if I can make it
```
