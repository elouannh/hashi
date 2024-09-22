#!/bin/bash

execute_commands() {
	local commands=("$@")
	for cmd in "${commands[@]}"; do
		echo "Running : $cmd"
		$cmd
		if [ $? -ne 0 ]; then
			echo "'$cmd': KO."
			exit 1
		else
			echo "'$cmd': OK!"
		fi
	done
}

commands_to_execute=(
  "pnpm lint"
  "pnpm prettier"
  "node builder.js"
  "tsc"
)

execute_commands "${commands_to_execute[@]}"
