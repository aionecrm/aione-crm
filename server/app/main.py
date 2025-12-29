from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routes.clients import router as client_router
from app.routes.dashboard import router as dashboard_router  # ✅ ADD THIS

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ✅ REGISTER ROUTES
app.include_router(client_router)
app.include_router(dashboard_router)  # ✅ ADD THIS

@app.get("/")
def root():
    return {"status": "Backend running"}
