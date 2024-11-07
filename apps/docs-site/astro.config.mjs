import { defineConfig } from 'astro/config';
import * as path from 'path';
import { workspaceRoot } from '@nx/devkit';
import starlight from '@astrojs/starlight';

const ASTRO_APP_DIR = 'apps/docs-site';

// https://astro.build/config
export default defineConfig({
  outDir: path.resolve(workspaceRoot, 'dist', ASTRO_APP_DIR),
  srcDir: path.resolve(workspaceRoot, ASTRO_APP_DIR, 'src'),
  publicDir: path.resolve(workspaceRoot, ASTRO_APP_DIR, 'public'),
  vite: {
    cacheDir: path.resolve(workspaceRoot, 'node_modules', '.vite'),
  },
  site: 'https://nx-sonarqube.dev',
  integrations: [
    starlight({
      title: 'Docs',
      favicon: '/favicon.png',
      customCss: ['./src/styles/theme.css'],
      social: {
        github: 'https://github.com/gcko/nx-sonar',
        'x.com': 'https://x.com/JaredMScott',
        linkedin: 'https://www.linkedin.com/in/jaredmscott/',
      },
      editLink: {
        baseUrl:
          'https://github.com/gcko/nx-sonar/blob/main/apps/docs-site',
      },
      sidebar: [
        {
          label: 'Start Here',
          items: [
            {
              label: 'Getting Started',
              link: 'getting-started',
            },
            {
              label: 'Usage',
              link: 'usage',
            },
          ],
        },
        {
          label: 'Explanation',
          autogenerate: { directory: 'explanation' },
        },
        {
          label: 'How-To Guides',
          autogenerate: { directory: 'how-to-guides' },
        },
        {
          label: 'Reference',
          autogenerate: { directory: 'reference' },
        },
        {
          label: 'Tutorials',
          autogenerate: { directory: 'tutorials' },
        },
      ],
    }),
  ],
});
