@echo off
REM Batch script to commit and push changes to GitHub
REM Usage: commit-push.bat "your commit message"

echo.
echo ========================================
echo   Git Commit and Push Helper
echo ========================================
echo.

REM Check if a commit message was provided
if "%~1"=="" (
    echo ERROR: Please provide a commit message
    echo Usage: commit-push.bat "your commit message"
    echo Example: commit-push.bat "update homepage styling"
    echo.
    pause
    exit /b 1
)

REM Show current git status
echo Checking git status...
echo.
git status
echo.

REM Prompt user to continue
set /p confirm="Do you want to commit and push these changes? (Y/N): "
if /i not "%confirm%"=="Y" (
    echo Aborted by user.
    pause
    exit /b 0
)

echo.
echo Staging all changes...
git add .

echo.
echo Creating commit...
git commit -m "%~1" -m "" -m "🤖 Generated with [Claude Code](https://claude.com/claude-code)" -m "" -m "Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"

if errorlevel 1 (
    echo.
    echo ERROR: Commit failed!
    pause
    exit /b 1
)

echo.
echo Pushing to GitHub...
git push

if errorlevel 1 (
    echo.
    echo ERROR: Push failed!
    pause
    exit /b 1
)

echo.
echo ========================================
echo   SUCCESS! Changes pushed to GitHub
echo ========================================
echo.
pause
