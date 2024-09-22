@echo on
setlocal enabledelayedexpansion

:execute_commands
set commands=%*
for %%i in (%commands%) do (
	echo Running : %%i
	call %%i
	if errorlevel 1 (
		echo '%%i': KO.
		exit /b 1
	) else (
		echo '%%i': OK!
	)
)

set commands_to_execute=(
pnpm lint
pnpm prettier
node builder.js
tsc
)

call :execute_commands %commands_to_execute%
