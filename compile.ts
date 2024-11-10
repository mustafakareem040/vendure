import { compileUiExtensions } from '@vendure/ui-devkit/compiler';
import { DEFAULT_BASE_HREF } from '@vendure/ui-devkit/compiler/constants';
import path from 'path';
import { promises as fs } from 'fs';

/**
 * Compiles the Admin UI. If the BASE_HREF is defined, use that.
 * Otherwise, go back to the default admin route.
 */
compileUiExtensions({
    outputPath: path.join(__dirname, 'build'),
    baseHref: process.env.BASE_HREF ?? DEFAULT_BASE_HREF,
    extensions: [
        /* any UI extensions would go here, or leave empty */
    ],
})
    .compile?.()
    .then(() => {
        // If building for Vercel deployment, replace the config to make
        // api calls to api.example.com instead of localhost.
        if (process.env.VERCEL) {
            console.log('Overwriting the vendure-ui-config.json for Vercel deployment.');
            return fs.writeFile(
                path.join(__dirname, 'build', 'dist', 'vendure-ui-config.json'),
                JSON.stringify({
                    apiHost: 'https://api.example.com',
                    apiPort: '443',
                    adminApiPath: 'admin-api',
                    tokenMethod: 'cookie',
                    defaultLanguage: 'en',
                    availableLanguages: ['en', 'de'],
                    hideVendureBranding: false,
                    hideVersion: false,
                }),
            );
        }
    })
    .then(() => {
        process.exit(0);
    });