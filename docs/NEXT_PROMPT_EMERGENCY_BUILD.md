# Next Prompt — Emergency Build and Deployment Fix

Use this prompt in Gemini / AI Studio / Antigravity. The goal is not to add features. The goal is to get the app running and deployable.

```text
Stop adding features. Act as a build and deployment engineer.

The current app already has the MVP UX. Fix only build/start/deploy blockers.

Current observed local errors:
1. Node is v20.11.1 while package dependencies require newer Node.
2. npm run build fails at esbuild with: "Must use outdir when there are multiple input files".
3. npm run start fails because dist/server.cjs was not created.
4. Port 3000 may already be occupied during local testing.

Tasks:
1. Inspect package.json, server.ts, vite.config.ts, tsconfig files, and the dist/build output assumptions.
2. Fix package.json scripts so they are simple and robust:
   - dev should run the development server
   - build should build the Vite frontend and bundle the server into dist/server.cjs
   - start should run production mode from dist/server.cjs
3. Remove any inline comments accidentally inserted into package.json scripts, such as "# success" or "# http://localhost:3000 opens".
4. Ensure build creates dist/server.cjs.
5. Ensure start does not require Vite dev middleware in production.
6. Ensure server uses process.env.PORT || 3000 and listens on 0.0.0.0.
7. If Node 22 is required, add an engines field and explain that local Node must be upgraded.
8. Do not change the app UI.
9. Do not add login, database, feedback, analytics, file upload, or new pages.
10. Do not rewrite the product.

After edits, provide exact commands:
- node -v
- npm install
- npm run build
- npm run start
- Cloud Run deploy command

Also provide a fallback if local port 3000 is occupied:
PORT=3001 npm run start
```
