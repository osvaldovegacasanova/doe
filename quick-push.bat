@echo off
setlocal EnableExtensions

REM Usage: quick-push.bat "commit message"
if "%~1"=="" (
  echo ERROR: Commit message required
  echo Usage: quick-push.bat "your message"
  exit /b 1
)

set "MSG=%~1"
set "TMP=%TEMP%\gitmsg_%RANDOM%%RANDOM%.txt"

> "%TMP%" (
  echo %MSG%
  echo.
  echo Generated por Os, Pixory
  echo.
  echo Co-authored-by: Claude Sonnet 4.5 ^<noreply@anthropic.com^>
)

echo Committing and pushing:
echo %MSG%

git add . || goto :fail
git commit -F "%TMP%" || goto :fail
git push || goto :fail

del "%TMP%" >nul 2>&1
echo SUCCESS!
exit /b 0

:fail
set "EC=%ERRORLEVEL%"
del "%TMP%" >nul 2>&1
echo FAILED! (error %EC%)
pause
exit /b %EC%
