require('dotenv').config();
import { APP_BASE_HREF } from '@angular/common';
import { ngExpressEngine } from '@nguniversal/express-engine';
import * as express from 'express';
import { existsSync } from 'fs';
import { join } from 'path';
import 'zone.js/dist/zone-node';
import { AppServerModule } from './src/main.server';
import db from './src/server/models/index';

// The Express app is exported so that it can be used by serverless Functions.
export function app(): express.Express {
  const server = express();
  const distFolder = join(process.cwd(), 'dist/AngularUniversalSSR/browser');
  const indexHtml = existsSync(join(distFolder, 'index.original.html'))
    ? 'index.original.html'
    : 'index';

  // Our Universal express-engine (found @ https://github.com/angular/universal/tree/master/modules/express-engine)
  server.engine(
    'html',
    ngExpressEngine({
      bootstrap: AppServerModule,
    })
  );

  // Add express's built in body parser
  server.use(express.json());
  server.set('view engine', 'html');
  server.set('views', distFolder);

  // Express Rest API endpoints
  server.post('/api/submit_task', async (req, res) => {
    try {
      const { body } = req;
      if (!body.task || body.task === null) {
        console.error('Error: Form data must contain a value');
        res.status(500).send({ error: 'Form data must contain a value' });
      } else if (body.task.length < 2) {
        console.error('Error: Value must be 2 or greater');
        res.status(500).send({ error: 'Value must be 2 or greater' });
      } else {
        // Change this to return the actual database value
        const submitTask = await db.Todos.create({
          todo: body.task
        })
        res.json(body);
      }
    } catch (e) {
      res.send({ error: `An error has occurred: ${e}` }).status(500);
    }
  });

  server.get('/api/get_all_tasks', async (_, res) => {
    try {
      const getAllTasks = await db.Todos.findAll();
      res.json(getAllTasks);
    } catch (e) {
      res.status(500).send({ error: `An error has occurred: ${e}` });
    }
  });

  // Serve static files from /browser
  server.get(
    '*.*',
    express.static(distFolder, {
      maxAge: '1y',
    })
  );

  // All regular routes use the Universal engine
  server.get('*', (req, res) => {
    res.render(indexHtml, {
      req,
      providers: [{ provide: APP_BASE_HREF, useValue: req.baseUrl }],
    });
  });

  return server;
}

function run(): void {
  const port = process.env.PORT || 4000;
  const server = app();
  try {
    db.sequelize
      .sync()
      .then(() => {
        console.log('Successfully connected to MySQL');
        // Start up the Node server
        server.listen(port, () => {
          console.log(
            `Angular Universal SSR - Node Express server listening on http://localhost:${port}`
          );
        });
      })
      .catch((e: any) =>
        console.log(`An error has occurred with Sequelize and MySQL: ${e}`)
      );
  } catch (error) {
    console.log(`An error has occurred: ${error}`);
  }
}

// Ignore plugins

// Webpack will replace 'require' with '__webpack_require__'
// '__non_webpack_require__' is a proxy to Node 'require'
// The below code is to ensure that the server is run only when not requiring the bundle.
declare const __non_webpack_require__: NodeRequire;
const mainModule = __non_webpack_require__.main;
const moduleFilename = (mainModule && mainModule.filename) || '';
if (moduleFilename === __filename || moduleFilename.includes('iisnode')) {
  run();
}

export * from './src/main.server';
