@echo off
chcp 65001 
echo "Идет составление базы данных музыки"
echo "Это может занять несколько минут"
echo "Не закрывайте это окно, оно закроется само по завершению процесса"
break>DB.txt 
setlocal DisableDelayedExpansion
for /f "tokens=* delims=" %%a in ('dir /s/b') do (
  set "fulldir=%%~a"
	setlocal EnableDelayedExpansion
  set "fulldir=!fulldir:\=\\!"
  >>DB.txt echo.!fulldir!
	endlocal
)