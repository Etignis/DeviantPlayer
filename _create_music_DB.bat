@echo off
chcp 65001 
setlocal enabledelayedexpansion
for /f "tokens=* delims=" %%a in ('dir /s/b') do (
  set "fulldir=%%~a"
  set "fulldir=!fulldir:\=\\!"
  >>DB.txt echo.!fulldir!
)