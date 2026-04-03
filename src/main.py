from fastapi import FastAPI, Request
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from pathlib import Path
import json

app = FastAPI()

BASE_DIR = Path(__file__).resolve().parent.parent
app.mount("/static", StaticFiles(directory=str(BASE_DIR / "static")), name="static")

templates = Jinja2Templates(directory=str(BASE_DIR / "templates"))
templates.env.cache = None
templates.env.bytecode_cache = None


@app.get("/properties")
async def properties(request: Request):
    # Mock data for now
    properties_list = [
        {"id": 1, "address": "123 Rue de la Paix", "rent": 1200, "city": "Paris"},
        {"id": 2, "address": "456 Avenue des Champs", "rent": 1500, "city": "Lyon"},
    ]
    headers = ["Adresse", "Loyer (€)", "Ville"]
    data = [[p["address"], str(p["rent"]), p["city"]] for p in properties_list]
    return templates.TemplateResponse(
        request=request,
        name="properties.html",
        context={
            "request": request,
            "properties": properties_list,
            "headers_json": json.dumps(headers),
            "data_json": json.dumps(data),
        },
    )


@app.get("/tenants")
async def tenants(request: Request):
    # Mock data
    tenants_list = [
        {"id": 1, "name": "Jean Dupont", "email": "jean@example.com"},
    ]
    headers = ["Nom", "E-mail"]
    data = [[tenant["name"], tenant["email"]] for tenant in tenants_list]
    return templates.TemplateResponse(
        request=request,
        name="tenants.html",
        context={
            "request": request,
            "tenants": tenants_list,
            "headers_json": json.dumps(headers),
            "data_json": json.dumps(data),
        },
    )


@app.get("/leases")
async def leases(request: Request):
    # Mock
    leases_list = []
    return templates.TemplateResponse(
        request=request,
        name="leases.html",
        context={"request": request, "leases": leases_list},
    )


@app.get("/quittances")
async def quittances(request: Request):
    # Mock
    quittances_list = []
    return templates.TemplateResponse(
        request=request,
        name="quittances.html",
        context={"request": request, "quittances": quittances_list},
    )


@app.get("/")
async def index(request: Request):
    return templates.TemplateResponse(
        request=request,
        name="index.html",
        context={"request": request},
    )
