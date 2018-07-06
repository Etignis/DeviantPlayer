@echo off
chcp 65001 
echo Идет создание базы данных Музыки
echo Не закрывайте это окно
echo Процесс может занять несколько минут, окно закроется само

setlocal DisableDelayedExpansion
for /f "tokens=* delims=" %%a in ('dir /s/b') do (
  set "fulldir=%%~a"
	setlocal EnableDelayedExpansion
  set "fulldir=!fulldir:\=\\!"
  >>DB.txt echo.!fulldir!
	endlocal
)