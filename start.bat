@echo off
title Inicializador do Sistema de Serviços


echo ====================================
echo    Iniciando Servidor Backend (FastAPI)
echo ====================================

start "Backend - FastAPI" cmd /k "cd backend && venv\Scripts\activate && uvicorn main:app --reload"

echo ====================================
echo    Iniciando Servidor Frontend (Vite)
echo ====================================

start "Frontend - React" cmd /k "cd /d C:\GestaoServicos\frontend && npm run dev"

echo ====================================
echo    Iniciado com sucesso!
echo ====================================