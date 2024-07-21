import express from 'express';
import cors from 'cors';
import { CommonEngine } from '@nguniversal/common/engine';
import { fileURLToPath } from 'node:url';
import { dirname, join, resolve } from 'node:path';
import bootstrap from './src/main.server';
import { APP_BASE_HREF } from '@angular/common';
import { AppServerModule } from 'src/app/app.module.server';

export function app(): express.Express {
  const server = express();
  const serverDistFolder = dirname(fileURLToPath(import.meta.url));
  const browserDistFolder = resolve(serverDistFolder, '../browser');
  const indexHtml = join(serverDistFolder, 'index.server.html');

  const commonEngine = new CommonEngine();

  // Enable CORS for all routes
  server.use(cors({
    origin: ['http://localhost:4200'],
  }));

  // Example route
  server.get('/api/example', (req, res) => {
    res.json({ message: 'Example API response' });
  });

  // Serve static files from /browser
  server.get('*.*', express.static(browserDistFolder, {
    maxAge: '1y'
  }));

  // CORS configuration for a specific route
  const corsOptions = {
    origin: 'https://localhost:7197',
  };

  // Apply CORS configuration only to the specific route
  server.get('/swagger/index.html', cors(corsOptions), (req, res) => {
    // Handle Swagger UI route
    res.send('Swagger UI content');
  });

  // All regular routes use the Angular engine
  server.get('*', (req, res, next) => {
    const { protocol, originalUrl, baseUrl, headers } = req;

    commonEngine
      .render({
        bootstrap: AppServerModule,
        documentFilePath: indexHtml,
        url: `${protocol}://${headers.host}${originalUrl}`,
        publicPath: browserDistFolder,
        providers: [{ provide: APP_BASE_HREF, useValue: baseUrl }],
      })
      .then((html) => res.send(html))
      .catch((err) => next(err));
  });

  return server;
}

function run(): void {
  const port = process.env['PORT'] || 3000;

  // Start up the Node server
  const server = app();
  server.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

run();
