@echo off
chcp 65001 
setlocal DisableDelayedExpansion
for /f "tokens=* delims=" %%a in ('dir /s/b') do (
  set "fulldir=%%~a"
	setlocal EnableDelayedExpansion
  set "fulldir=!fulldir:\=\\!"
  >>DB.txt echo.!fulldir!
	endlocal
)