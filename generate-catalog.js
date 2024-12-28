import fs from 'fs';
import path from 'path';
import fetch from 'node-fetch';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

dotenv.config();
// Resolve the directory name
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Import eventcatalog.config.js
import eventCatalogConfig from './eventcatalog.config.js';

const GITHUB_API_BASE = 'https://api.github.com';
const GITHUB_TOKEN = process.env.GITHUB_TOKEN || '';

async function fetchFileFromGitHub({repository, branch, id, fileName}) {
    const [owner, repo] = repository.split('/');
    const filePath = `${id}/asyncapi-files/${id}.yml`;
    const url = `https://api.github.com/repos/${owner}/${repo}/contents/${filePath}?ref=${branch}`;

    console.log(`printing url: ${url}`);
    const headers = {
       'Accept': 'application/vnd.github.v3.raw',
    };
    const response = await fetch(url, {
        method: 'GET',
        headers: {
          Authorization: `token ${GITHUB_TOKEN}`, // Use the GitHub PAT
          Accept: 'application/vnd.github.v3.raw', // Optional: Fetch raw content directly
        },
      });
    if(!response.ok) {
        throw new Error(`Failed to fetch file from GitHub: ${response.status} - ${response.statusText}`);
    }
    return await response.text();
}

(async () => {
    try {
        const { generators } = eventCatalogConfig;
        const asyncApiGenerator = generators.find(([name]) => name === '@eventcatalog/generator-asyncapi');
        if(!asyncApiGenerator) {
            console.error('No asyncapi generator found in eventcatalog.config.js');
            return;
        }
        const { services } = asyncApiGenerator[1];
        const targetPath = path.join(__dirname, 'asyncapi-files');
        console.log(`printing targetPath: ${targetPath}`);
        if (!fs.existsSync(targetPath)) { fs.mkdirSync(targetPath, { recursive: true })} else { console.log('Directory exists') };
        for(const service of services) {
            const { repository, mainBranch: branch, asyncApiFileName, path: outputPath, id } = service;
            // if (!fs.existsSync(targetPath)) fs.mkdirSync(targetPath, { recursive: true });

            const content = await fetchFileFromGitHub({repository, branch, id, fileName: asyncApiFileName});
            // fs.writeFileSync(targetPath + '/' + asyncApiFileName, content);
            fs.writeFileSync(outputPath, content);
        }
    } catch (error) {
        console.error(error);
    }
})();
