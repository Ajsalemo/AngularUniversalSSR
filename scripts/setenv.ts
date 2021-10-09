const { writeFile } = require('fs');
const { argv } = require('yargs');
// Read environment variables from .env file
require('dotenv').config();
// Read the command line arguments passed with yargs
const environment = argv.environment;
const isProduction = environment === 'prod';
const targetPath = isProduction
   ? `./src/environments/environment.prod.ts`
   : `./src/environments/environment.ts`;
/* 
    We have access to our environment variables
    in the process.env object thanks to dotenv
*/ 
const environmentFileContent = `
    export const environment = {
        production: ${isProduction},
        POSTGRES_DATABASE: "${process.env.POSTGRES_DATABASE}",
        POSTGRES_USERNAME: "${process.env.POSTGRES_USERNAME}",
        POSTGRES_PASSWORD: "${process.env.POSTGRES_PASSWORD}",
        POSTGRES_HOST: "${process.env.POSTGRES_HOST}",
        AUTH0_DOMAIN: "${process.env.AUTH0_DOMAIN}",
        AUTH0_CLIENT_ID: "${process.env.AUTH0_CLIENT_ID}"
    };
`;
// Write the content to the respective file
writeFile(targetPath, environmentFileContent, (err: any) => {
   if (err) {
      console.log(err);
   }
   console.log(`Wrote variables to ${targetPath}`);
});