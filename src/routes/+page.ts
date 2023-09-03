export const load = async () => {
	const documentsPaths = import.meta.glob('$lib/content/*.md', { eager: true });
	const documents: string[] = [];

	for (const path of Object.keys(documentsPaths)) {
		const fileName = path.split('/').at(-1);
		const r = await fetch(
			`https://raw.githubusercontent.com/bbtgnn/workshop-test/main/src/lib/content/${fileName}`
		);
		documents.push(await r.text());
	}
	return { documents };
};
