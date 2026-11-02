# WhatsApp portfolio assistant setup

Proposed integration; no chatbot endpoints or WhatsApp automation are live yet.
The current portfolio button remains a direct `wa.me` link to SITE.whatsapp.

## Required account setup

Use Meta's official Cloud API: a Meta business portfolio, WhatsApp Business
Account and registered business phone number are required. Start with Meta's
test number before registering the intended production number. Confirm whether
the existing number uses normal WhatsApp or the Business app before choosing
the appropriate onboarding/migration/coexistence path; do not remove its account
or assume the existing app will continue working under every onboarding method.

In Meta's app dashboard, complete WhatsApp API setup and obtain the phone number
ID, server access token and app secret. Store credentials as server-only Vercel
environment variables, never in src/data, browser JavaScript or chat messages.
Configure an HTTPS webhook and a separately chosen verification token.

## Proposed conversation

1. Introduce itself as Umer's automated portfolio assistant and ask English/Urdu.
2. Answer questions from the actual services, projects and employment data.
3. Ask which service is needed, the website URL, goal, budget range and timeline.
4. Summarize the brief and offer to hand the conversation to Umer. Do not promise
   a quote, delivery date, availability slot or guaranteed search ranking.
5. Stop automated replies when the client requests a human; retain a persistent
   per-conversation handoff flag until the operator resumes the bot.

A guided FAQ/lead flow can work without an AI model. Flexible natural-language
conversation needs an AI provider, a restricted portfolio knowledge source and
fallback replies when information is missing. An AI must not invent experience,
client results or prices. A human inbox/dashboard is also needed for handoff;
an API connection alone is not an operator interface.

## Implementation outline

- Add `/api/whatsapp/webhook` GET verification and POST inbound-message handling.
- Validate the webhook signature against the raw body using the app secret.
- Persist inbound WhatsApp message IDs in a durable database/queue so delivery
  retries cannot create duplicate bot replies. Quickly acknowledge events and
  process them through a retryable worker. Ignore delivery statuses as chat input.
- Store conversation stage, last user-message time and handoff state securely;
  add payload limits, throttling and a retention policy. Avoid logging full chats
  or tokens. External message content is data, not trusted system instructions.
- Send answers through Meta's messages endpoint. Respect the customer-service
  window; outside the allowed window, use eligible approved templates and the
  required consent rather than unrestricted automatic follow-ups.
- Test signature failure, duplicate events, provider timeouts, lead collection,
  unsupported messages and persistent human handoff using the test number.

Meta currently states that service messages inside the 24-hour window opened
by a user's message are free; other message categories may be charged depending
on market/category. Hosting, inbox providers and optional AI can have separate
costs. Check the current rate card before enabling production.

References checked 2026-11-02:

- [Meta Cloud API setup and account requirements](https://www.postman.com/meta/whatsapp-business-platform/collection/wlk6lh4/whatsapp-cloud-api)
- [Official WhatsApp developer hub](https://whatsappbusiness.com/developers/developer-hub/)
- [Official pricing and service window](https://whatsappbusiness.com/products/platform-pricing/)
