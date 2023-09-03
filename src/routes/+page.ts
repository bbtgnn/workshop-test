export const load = async () => {
	const documents = import.meta.glob('$lib/content/*.md', { eager: true });
	const documentsPaths: string[] = [];

	for (const path of Object.keys(documents)) {
		documentsPaths.push(path);
	}
	return { documentsPaths };
};
