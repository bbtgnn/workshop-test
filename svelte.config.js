import { mdsvex } from 'mdsvex';
import mdsvexConfig from './mdsvex.config.js';
import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/kit/vite';

import fs from 'fs';
import path from 'path';

const dev = process.argv.includes('dev');

const packageJsonPath = path.resolve('./package.json');
const packageJsonData = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
const repoFullName = packageJsonData.repository;
const repoName = repoFullName.split('/')[1];

/** @type {import('@sveltejs/kit').Config} */
const config = {
	extensions: ['.svelte', ...mdsvexConfig.extensions],

	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	preprocess: [vitePreprocess({}), mdsvex(mdsvexConfig)],

	kit: {
		// adapter-auto only supports some environments, see https://kit.svelte.dev/docs/adapter-auto for a list.
		// If your environment is not supported or you settled on a specific environment, switch out the adapter.
		// See https://kit.svelte.dev/docs/adapters for more information about adapters.
		adapter: adapter({
			pages: 'docs'
		}),
		paths: {
			base: dev ? '' : `/${repoName}`
		}
	}
};

export default config;
