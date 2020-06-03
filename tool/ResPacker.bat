for /f %%a in ('dir /b .\res\loose') do (
	node .\tool\ResPacker.js .\res\loose\%%a .\res\packed
)

for /f %%a in ('dir /b .\res\scene') do (
	node .\tool\ResPacker.js .\res\scene\%%a .\res\packed
)

for /f %%a in ('dir /b .\res\actor') do (
	node .\tool\ResPacker.js .\res\actor\%%a .\res\packed
)
