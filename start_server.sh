#!/bin/bash

cd /home/nizarayed/git/nono_rent/frontend

source venv/bin/activate

uvicorn src.main:app --port 8000