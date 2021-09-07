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
  // Add a task
  server.post('/api/task/submit', async (req, res) => {
    try {
      const { data: { task }, email } = req.body;
      const { body: { data } } = req;

      if ((task && email) && (task !== '' && email !== '')) {
        const findUserToCreateTodo = await db.Users.findOne({
          where: {
            email: email,
          },
        });

        await findUserToCreateTodo!.createTodo({
          todo: task,
        });

        res.json(data);
      } else if (task.length < 2) {
        console.error('Error: Value must be 2 or greater');
        res.status(500).send({ error: 'Value must be 2 or greater' });
      } else {
        console.error('Error: Form data must contain a value');
        res.status(500).send({ error: 'Form data must contain a value' });
      }
    } catch (e) {
      res.status(500).send({ error: `An error has occurred: ${e}` });
    }
  });

  // Update a task with a due date
  // server.put('/api/task/due/:id', async (req, res) => {
  //   try {
  //     const { id } = req.params;
  //     const { isDueBy } = req.body;
  //     const dueDate_id = parseInt(id);
  //     if (dueDate_id && dueDate_id > 0) {
  //       const findDueDateTask = await db.Todos.findOne({
  //         where: {
  //           id: dueDate_id,
  //         },
  //       });

  //       if (findDueDateTask?.id) {
  //         await db.Todos.update(
  //           {
  //             dueBy: isDueBy,
  //           },
  //           {
  //             where: {
  //               id: findDueDateTask?.id,
  //             },
  //           }
  //         );
  //         res.status(200).send({ message: 'Task updated' });
  //       } else {
  //         res.status(404).send({ error: 'Task not found' });
  //       }
  //     } else {
  //       res.status(500).send({ error: 'Bad parameter provided' });
  //     }
  //   } catch (e) {
  //     res.status(500).send({ error: `An error has occurred: ${e}` });
  //   }
  // });

  // Delete a task
  // server.delete('/api/task/delete/:id', async (req, res) => {
  //   try {
  //     const { id } = req.params;
  //     const num_id = parseInt(id);
  //     // Check if the parameter exists and if it's greater than 0
  //     if (num_id && num_id > 0) {
  //       const findTask = await db.Todos.findOne({
  //         where: {
  //           id: num_id,
  //         },
  //       });

  //       // Check if we're able to return a valid Task ID from findTask
  //       if (findTask?.id) {
  //         const deleteTodo = await db.Todos.destroy({
  //           where: {
  //             id: findTask?.id,
  //           },
  //         });
  //         res.status(200).send({ message: 'Task deleted' });
  //       } else {
  //         res.status(404).send({ error: 'Task not found' });
  //       }
  //     } else {
  //       res.status(500).send({ error: 'Bad parameter provided' });
  //     }
  //   } catch (e) {
  //     res.status(500).send({ error: `An error has occurred: ${e}` });
  //   }
  // });

  // Update a task to be completed/incomplete
  // server.put('/api/task/complete/:id', async (req, res) => {
  //   try {
  //     const { id } = req.params;
  //     const { isCompleted } = req.body;
  //     const task_id = parseInt(id);
  //     if (task_id && task_id > 0) {
  //       const findTask = await db.Todos.findOne({
  //         where: {
  //           id: task_id,
  //         },
  //       });

  //       if (findTask?.id) {
  //         await db.Todos.update(
  //           {
  //             completed: isCompleted,
  //           },
  //           {
  //             where: {
  //               id: findTask?.id,
  //             },
  //           }
  //         );
  //         res.status(200).send({ message: 'Task updated' });
  //       } else {
  //         res.status(404).send({ error: 'Task not found' });
  //       }
  //     } else {
  //       res.status(500).send({ error: 'Bad parameter provided' });
  //     }
  //   } catch (e) {
  //     res.status(500).send({ error: `An error has occurred: ${e}` });
  //   }
  // });

  // Update a task to be important/unimportant
  server.put('/api/task/important/:id', async (req, res) => {
    try {
      const { id } = req.params;
      // TODO - use this email to find the current user
      const { isImportant, email } = req.body;

      if (id) {
        const findTask = await db.Todos.findOne({
          where: {
            id: id,
          },
        });

        if (findTask?.id) {
          await db.Todos.update(
            {
              important: isImportant,
            },
            {
              where: {
                id: findTask?.id,
              },
            }
          );
          res.status(200).send({ message: 'Task updated' });
        } else {
          res.status(404).send({ error: 'Task not found' });
        }
      } else {
        res.status(500).send({ error: 'Bad parameter provided' });
      }
    } catch (e) {
      res.status(500).send({ error: `An error has occurred: ${e}` });
    }
  });

  // Find all tasks
  server.get('/api/task/get/:email', async (req, res) => {
    try {
      const { email } = req.params

      if (email && email !== '') {
        const findUserToGetTasks = await db.Users.findOne({
          where: {
            email: req.params.email,
          },
          include: [db.Users.associations.todos]
        });

        const getAllTasks = await findUserToGetTasks?.getTodos()
        res.json(getAllTasks);
      } else {
        res.status(500).send({ error: 'Bad parameter provided' });
      }
    } catch (e) {
      res.status(500).send({ error: `An error has occurred: ${e}` });
    }
  });

  // Add a user
  server.get('/api/user/get/:email', async (req, res) => {
    try {
      const { email } = req.params;

      if (email) {
        const findUser = await db.Users.findOne({
          where: {
            email: req.params.email,
          },
        });
        if (!findUser) {
          const createNonExistentUser = await db.Users.create({
            email,
          });
          res.status(200).send({ message: `User added: ${createNonExistentUser?.email}` });
        } else {
          console.log('User found: ' + findUser?.email);
          res.status(200).send({ message: 'User exists' });
        }
      } else {
        console.error('No email provided');
        res.status(500).send({ error: 'Bad parameter provided' });
      }
    } catch (e) {
      console.log(e);
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

// Sync the database depending on the current environment
function syncDatabaseIfDevelopment(): boolean {
  if (process.env.NODE_ENV === 'development') {
    console.log(`Current environment is: ${process.env.NODE_ENV}`);
    return true;
  } else {
    console.log(`Current development environment is: ${process.env.NODE_ENV}`);
    return false;
  }
}

function run(): void {
  const port = process.env.PORT || 4000;
  const server = app();
  try {
    db.sequelize
      // Sync the database depending on the current environment
      .sync({ force: syncDatabaseIfDevelopment() })
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
