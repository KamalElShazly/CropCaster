# Start from the official n8n image
FROM n8nio/n8n:latest

# Switch to root to install Python and dependencies
USER root

# Install Python and pip for Alpine Linux
RUN apk add --no-cache python3 py3-pip

# Create a virtual environment for Python packages
RUN python3 -m venv /opt/venv

# Upgrade pip inside the virtual environment
RUN /opt/venv/bin/pip install --no-cache-dir --upgrade pip

# Install youtube-transcript-api in the virtual environment
RUN /opt/venv/bin/pip install --no-cache-dir --upgrade youtube-transcript-api

# Add the virtual environment to the PATH so n8n can find it
ENV PATH="/opt/venv/bin:$PATH"

# Back to node user for running n8n
USER node

# Expose n8n's default port
EXPOSE 5678

# Start n8n
CMD ["n8n"]