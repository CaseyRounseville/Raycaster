for /f %%a in ('dir /b .\res\loose') do (
	node .\tool\resPacker.js .\res\loose\%%a .\res\packed
)

for /f %%a in ('dir /b .\res\scene') do (
	node .\tool\resPacker.js .\res\scene\%%a .\res\packed
)
