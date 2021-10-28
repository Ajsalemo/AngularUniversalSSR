require('dotenv').config();
import { APP_BASE_HREF } from '@angular/common';
import { ngExpressEngine } from '@nguniversal/express-engine';
import * as express from 'express';
import { existsSync } from 'fs';
import { join } from 'path';
import 'zone.js/dist/zone-node';
import { checkJwt } from './auth/auth';
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
  server.post('/api/task/submit', checkJwt, async (req, res) => {
    try {
      const {
        data: { task },
        email,
      } = req.body;
      const {
        body: { data },
      } = req;
      // Check if the task and email are both not null and not empty
      if (task && email && task !== '' && email !== '') {
        const findUserToCreateTodo = await db.Users.findOne({
          where: {
            email: email,
          },
        });
        // Check if the user that we're adding a task for exists and has a user ID
        if (findUserToCreateTodo && findUserToCreateTodo?.id) {
          await findUserToCreateTodo!.createTodo({
            todo: task,
          });
          // Send the request body back since it's fully validated
          res.json(data);
        } else {
          // Logging the error to the console for more visibility
          console.error(`User not found with ID: ${findUserToCreateTodo?.id}`);
          // Return a HTTP 404 if the user isn't found or doesn't exist
          res.status(404).send({
            error: `User not found with ID: ${findUserToCreateTodo?.id}`,
          });
        }
      } else if (task.length < 2) {
        // Logging the error to the console for more visibility
        // Send a HTTP 500 back if the task in the request body is less than 2 characters
        console.error('Error: Value must be 2 or greater');
        res.status(500).send({ error: 'Value must be 2 or greater' });
      } else {
        // Logging the error to the console for more visibility
        console.error('Error: Form data must contain a value');
        // Send a HTTP 500 back if the task in the request body is null
        res.status(500).send({ error: 'Form data must contain a value' });
      }
    } catch (e) {
      // Logging the error to the console for more visibility
      console.error(e);
      // Return a HTTP 500 in the case of a SequelizeError or otherwise
      res.status(500).send({ error: `An error has occurred: ${e}` });
    }
  });

  // Update a task with a due date
  server.put('/api/task/due/:id', checkJwt, async (req, res) => {
    try {
      const { id } = req.params;
      const { isDueBy, email } = req.body;
      // Check if the todo ID and email are both not null and not empty
      if (id && email && id !== '' && email !== '') {
        const findUserDueDateTask = await db.Users.findOne({
          where: {
            email: email,
          },
        });
        // If the user is found and the user ID exists use this to include in the where clause for the task
        if (findUserDueDateTask && findUserDueDateTask?.id) {
          await db.Todos.update(
            {
              dueBy: isDueBy,
            },
            {
              where: {
                id: id,
                userId: findUserDueDateTask?.id,
              },
            }
          ).catch((e) => res.status(500).send({ error: e }));
          res.status(200).send({ message: 'Task updated' });
        } else {
          // Logging the error to the console for more visibility
          console.error(`User not found with ID: ${findUserDueDateTask?.id}`);
          // Return a HTTP 404 if the user isn't found or doesn't exist
          res.status(404).send({
            error: `User not found with ID: ${findUserDueDateTask?.id}`,
          });
        }
      } else {
        // Logging the error to the console for more visibility
        console.error('Required parameters are either empty or invalid');
        // Return a HTTP 500 if the required parameters are not provided or valid
        res
          .status(500)
          .send({ error: 'Required parameters are either empty or invalid' });
      }
    } catch (e) {
      // Logging the error to the console for more visibility
      console.error(e);
      // Return a HTTP 500 in the case of a SequelizeError or otherwise
      res.status(500).send({ error: `An error has occurred: ${e}` });
    }
  });

  // Delete a task
  server.delete('/api/task/delete/:id', checkJwt, async (req, res) => {
    try {
      const { id } = req.params;
      const { email } = req.body;
      // Check if the todo ID and email are both not null and not empty
      if (id && email && id !== '' && email !== '') {
        const findUserToDeleteTask = await db.Users.findOne({
          where: {
            email: email,
          },
        });

        // If the user is found and the user ID exists use this to include in the where clause for the task
        if (findUserToDeleteTask && findUserToDeleteTask?.id) {
          await db.Todos.destroy({
            where: {
              id: id,
              userId: findUserToDeleteTask?.id,
            },
          }).catch((e) => res.status(500).send({ error: e }));
          res.status(200).send({ message: 'Task deleted' });
        } else {
          // Logging the error to the console for more visibility
          console.error(`User not found with ID: ${findUserToDeleteTask?.id}`);
          // Return a HTTP 404 if the user isn't found or doesn't exist
          res.status(404).send({
            error: `User not found with ID: ${findUserToDeleteTask?.id}`,
          });
        }
      } else {
        // Logging the error to the console for more visibility
        console.error('Required parameters are either empty or invalid');
        // Return a HTTP 500 if the required parameters are not provided or valid
        res
          .status(500)
          .send({ error: 'Required parameters are either empty or invalid' });
      }
    } catch (e) {
      // Logging the error to the console for more visibility
      console.error(e);
      // Return a HTTP 500 in the case of a SequelizeError or otherwise
      res.status(500).send({ error: `An error has occurred: ${e}` });
    }
  });

  // Update a task to be completed/incomplete
  server.put('/api/task/complete/:id', checkJwt, async (req, res) => {
    try {
      const { id } = req.params;
      const { isCompleted, email } = req.body;
      // Check if the todo ID and email are both not null and not empty
      if (id && email && id !== '' && email !== '') {
        const findUserForTaskToComplete = await db.Users.findOne({
          where: {
            email: email,
          },
          include: [db.Users.associations.todos],
        });
        // If the user is found and the user ID exists use this to include in the where clause for the task
        if (findUserForTaskToComplete && findUserForTaskToComplete?.id) {
          await db.Todos.update(
            {
              completed: isCompleted,
            },
            {
              where: {
                id: id,
                userId: findUserForTaskToComplete?.id,
              },
            }
          ).catch((e) => res.status(500).send({ error: e }));
          res.status(200).send({ message: 'Task updated' });
        } else {
          // Logging the error to the console for more visibility
          console.error(
            `User not found with ID: ${findUserForTaskToComplete?.id}`
          );
          // Return a HTTP 404 if the user isn't found or doesn't exist
          res.status(404).send({
            error: `User not found with ID: ${findUserForTaskToComplete?.id}`,
          });
        }
      } else {
        // Logging the error to the console for more visibility
        console.error('Required parameters are either empty or invalid');
        // Return a HTTP 500 if the required parameters are not provided or valid
        res
          .status(500)
          .send({ error: 'Required parameters are either empty or invalid' });
      }
    } catch (e) {
      // Logging the error to the console for more visibility
      console.error(e);
      // Return a HTTP 500 in the case of a SequelizeError or otherwise
      res.status(500).send({ error: `An error has occurred: ${e}` });
    }
  });

  // Update a task to be important/unimportant
  server.put('/api/task/important/:id', checkJwt, async (req, res) => {
    try {
      const { id } = req.params;
      const { isImportant, email } = req.body;
      // Check if the todo ID and email are both not null and not empty
      if (id && email && id !== '' && email !== '') {
        const findImportantUser = await db.Users.findOne({
          where: {
            email: email,
          },
          include: [db.Users.associations.todos],
        });
        // If the user is found and the user ID exists use this to include in the where clause for the task
        if (findImportantUser && findImportantUser?.id) {
          await db.Todos.update(
            {
              important: isImportant,
            },
            // Update by specifying the task/todo ID and the userID associated with the task
            {
              where: {
                id: id,
                userId: findImportantUser?.id,
              },
            }
          ).catch((e) => res.status(500).send({ error: e }));
          res.status(200).send({ message: 'Task updated' });
        } else {
          // Logging the error to the console for more visibility
          console.error(`User not found with ID: ${findImportantUser?.id}`);
          // Return a HTTP 404 if the user isn't found or doesn't exist
          res.status(404).send({
            error: `User not found with ID: ${findImportantUser?.id}`,
          });
        }
      } else {
        // Logging the error to the console for more visibility
        console.error('Required parameters are either empty or invalid');
        // Return a HTTP 500 if the required parameters are not provided or valid
        res
          .status(500)
          .send({ error: 'Required parameters are either empty or invalid' });
      }
    } catch (e) {
      // Logging the error to the console for more visibility
      console.error(e);
      // Return a HTTP 500 in the case of a SequelizeError or otherwise
      res.status(500).send({ error: `An error has occurred: ${e}` });
    }
  });

  // Find all tasks
  server.get('/api/task/get/:email', checkJwt, async (req, res) => {
    try {
      const { email } = req.params;
      // If the email parameter exists and isn't emptry search for the user
      if (email && email !== '') {
        const findUserToGetTasks = await db.Users.findOne({
          where: {
            email: req.params.email,
          },
          include: [db.Users.associations.todos],
        });
        // Check if the user is not null and the user ID exists
        if (findUserToGetTasks && findUserToGetTasks?.id) {
          // Find all tasks with the getTodos() method off of the User class
          // Return all found tasks back to the client
          const getAllTasks = await findUserToGetTasks?.getTodos();
          res.json(getAllTasks);
        } else {
          // Logging the error to the console for more visibility
          console.error(`User not found with ID: ${findUserToGetTasks?.id}`);
          // Return a HTTP 404 if the user isn't found or doesn't exist
          res.status(404).send({
            error: `User not found with ID: ${findUserToGetTasks?.id}`,
          });
        }
      } else {
        // Logging the error to the console for more visibility
        console.error('Required parameters are either empty or invalid');
        // Return a HTTP 500 if the required parameters are not provided or valid
        res
          .status(500)
          .send({ error: 'Required parameters are either empty or invalid' });
      }
    } catch (e) {
      // Logging the error to the console for more visibility
      console.error(e);
      // Return a HTTP 500 in the case of a SequelizeError or otherwise
      res.status(500).send({ error: `An error has occurred: ${e}` });
    }
  });

  // Add a user
  server.get('/api/user/get/:email', checkJwt, async (req, res) => {
    try {
      const { email } = req.params;
      // If the email parameter exists and isn't empty search for the user
      if (email && email !== '') {
        const findUser = await db.Users.findOne({
          where: {
            email: req.params.email,
          },
        });
        // If the user doesn't create it after logging in create the user
        // This would indicate the user is new
        if (!findUser) {
          const createNonExistentUser = await db.Users.create({
            email,
          });
          res
            .status(200)
            .send({ message: `User added: ${createNonExistentUser?.email}` });
        } else {
          // Else the user already exists and skip creation
          console.log('User found: ' + findUser?.email);
          res.status(200).send({ message: 'User exists' });
        }
      } else {
        // Logging the error to the console for more visibility
        console.error('Required parameters are either empty or invalid');
        // Return a HTTP 500 if the required parameters are not provided or valid
        res
          .status(500)
          .send({ error: 'Required parameters are either empty or invalid' });
      }
    } catch (e) {
      // Logging the error to the console for more visibility
      console.error(e);
      // Return a HTTP 500 in the case of a SequelizeError or otherwise
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
      .sync({ force: false })
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

