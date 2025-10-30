# CORS Configuration for FastAPI Backend

## Why CORS is needed
When your React app (running on http://localhost:5173 via Vite) tries to make requests to your FastAPI backend (running on http://127.0.0.1:8000), browsers will block these requests due to CORS (Cross-Origin Resource Sharing) policy unless properly configured.

## FastAPI CORS Setup

Add the following to your FastAPI application:

```python
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# CORS middleware configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],  # Vite dev server
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE"],
    allow_headers=["*"],
)

# Your existing routes...
```

## Alternative: Allow all origins (development only)
For development purposes only, you can allow all origins:

```python
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins - NOT recommended for production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

## Production CORS Configuration
For production, be more specific with allowed origins:

```python
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "https://yourdomain.com",
        "https://www.yourdomain.com"
    ],
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE"],
    allow_headers=["*"],
)
```

## Installation
Make sure you have the CORS middleware installed:
```bash
pip install fastapi[all]
```

The `fastapi[all]` installation includes the CORS middleware, but if you're using a minimal installation, you might need:
```bash
pip install python-multipart
```