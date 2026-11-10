FROM node:20-alpine AS frontend-builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM python:3.11-slim

# System dependencies for GDAL/rasterio and building C-extensions
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    libgdal-dev \
    gdal-bin \
    curl \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Install Python requirements
COPY CLPS/requirements.txt ./CLPS/requirements.txt
RUN pip install --no-cache-dir -r ./CLPS/requirements.txt

# Copy backend code, kernels, and precomputed masks
COPY CLPS/ ./CLPS/

# Copy built frontend directly into both root /app/dist and /app/CLPS/dist to ensure discovery
COPY --from=frontend-builder /app/dist ./dist
COPY --from=frontend-builder /app/dist ./CLPS/dist

ENV PORT=8000
EXPOSE 8000

WORKDIR /app/CLPS
CMD ["sh", "-c", "uvicorn main:app --host 0.0.0.0 --port ${PORT:-8000}"]


