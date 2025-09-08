# CropCaster n8n Workflow

This repository contains the n8n workflow and scripts for **CropCaster**, which fetches crop prices from YouTube channels, extracts the data using AI (Google Gemini), and stores it in MongoDB.

## Project Structure

cropcaster/
├─ scripts/get_transcript.py       # Python script to fetch YouTube transcript
├─ workflow.json                  # Exported n8n workflow
├─ Dockerfile                     # Docker configuration
├─ docker-compose.yml             # Docker Compose file for local dev
├─ .env                           # Environment variables (not committed)
└─ .n8n/                          # n8n credentials and local data (not committed)

## Setup (Local Development)

1. Create a `.env` file in the project root with the following variables:

DB_MONGO_CONNECTION_URL=mongodb+srv://:@.mongodb.net
DB_MONGO_DATABASE=cropcaster
GEMINI_API_KEY=<your_gemini_api_key>
GENERIC_TIMEZONE=Africa/Cairo
N8N_BASIC_AUTH_ACTIVE=true
N8N_BASIC_AUTH_USER=<n8n_user>
N8N_BASIC_AUTH_PASSWORD=<n8n_password>
N8N_ENFORCE_SETTINGS_FILE_PERMISSIONS=true

2. Run the Docker container:

```bash
docker compose up -d
```

3.	Open n8n at http://localhost:5678 and import workflow.json.