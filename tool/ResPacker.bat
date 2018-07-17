for /f %%a in ('dir /b .\res\loose') do (
	node .\tool\resPacker.js %%a
)