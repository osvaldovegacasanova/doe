@echo off
REM Quick commit and push script - no confirmations
REM Usage: quick-push.bat "commit message"

if "%~1"=="" (
    echo ERROR: Commit message required
    echo Usage: quick-push.bat "your message"
    exit /b 1
)

echo Committing and pushing: %~1
git add . && git commit -m "%~1" -m "" -m "🤖 Generated with [Claude Code](https://claude.com/claude-code)" -m "" -m "Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>" && git push

if errorlevel 1 (
    echo FAILED!
    pause
    exit /b 1
)

echo SUCCESS!
