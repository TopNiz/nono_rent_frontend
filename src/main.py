from fastapi import FastAPI, Request
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates

app = FastAPI()

app.mount("/static", StaticFiles(directory="static"), name="static")

templates = Jinja2Templates(directory="templates")


@app.get("/")
async def home(request: Request):
    return templates.TemplateResponse("index.html", {"request": request})


@app.get("/tenants")
async def tenants(request: Request):
    # Mock data
    tenants = [
        {"id": 1, "name": "Jean Dupont", "email": "jean@example.com"},
    ]
    return templates.TemplateResponse(
        "tenants.html", {"request": request, "tenants": tenants}
    )


@app.get("/leases")
async def leases(request: Request):
    # Mock
    leases = []
    return templates.TemplateResponse(
        "leases.html", {"request": request, "leases": leases}
    )


@app.get("/quittances")
async def quittances(request: Request):
    # Mock
    quittances = []
    return templates.TemplateResponse(
        "quittances.html", {"request": request, "quittances": quittances}
    )
