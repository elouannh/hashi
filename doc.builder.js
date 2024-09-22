const typeDoc = require("typedoc");

async function main() {
	const app = await typeDoc.Application.bootstrapWithPlugins({
		tsconfig: "tsconfig.json",
		entryPoints: ["src/**"],
		plugin: ["typedoc-material-theme"],
		themeColor: "#4100b3",
		alwaysCreateEntryPointModule: true,
		readme: "README.md",
		"exclude": [
			"src/**/index.ts"
		]
	});

	const project = await app.convert();
	if (project) {
		const outputDir = "docs";
		await app.generateDocs(project, outputDir);
		await app.generateJson(project, outputDir + "/documentation.json");
	}
}

main().catch(console.error);
