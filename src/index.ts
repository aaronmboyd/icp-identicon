import { Server, ic } from 'azle';
import express from 'express';
import * as jdenticon from 'jdenticon';

export default Server(() => {
   
   const app = express();
   app.use(express.json());
   app.use((_req, res, next) => {
      res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
      res.setHeader('Pragma', 'no-cache');
      res.setHeader('Expires', '0');
      next();
   });  

   app.get("/identicon", (_req:any, res:any) => {
      const principal = ic.caller();
      const svg = jdenticon.toSvg(principal, 800);
      const htmlResponse = `
        <html>
        <head>
            <title>Identicon</title>
            <style>
                body {
                    background-color: #F5F8FA; /* Light background */
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    height: 100vh;
                    flex-direction: column;
                    font-family: Arial, sans-serif;
                }
                .identicon-container {
                    background-color: white;
                    padding: 20px;
                    border-radius: 8px;
                    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
                    text-align: center;
                }
                .header {
                    color: #0078E7; /* DFINITY blue */
                    margin-bottom: 20px;
                }
            </style>
        </head>
        <body>
            <div class="identicon-container">
                <div class="header">Generated identicon for principal: ${principal}</div>
                ${svg}
            </div>
        </body>
        </html>
      `;
      res.setHeader('Content-Type', 'text/html');
      res.send(htmlResponse);
   });  

   app.get("/salty-identicon", (_req:any, res:any) => {
      const principal = ic.caller();
      const salt = ic.time();
      const svg = jdenticon.toSvg(principal + salt.toString(), 800);
      const htmlResponse = `
        <html>
        <head>
            <title>Salty Identicon</title>
            <style>
                body {
                    background-color: #F5F8FA; /* Light background */
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    height: 100vh;
                    flex-direction: column;
                    font-family: Arial, sans-serif;
                }
                .identicon-container {
                    background-color: white;
                    padding: 20px;
                    border-radius: 8px;
                    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
                    text-align: center;
                }
                .header {
                    color: #0078E7; /* DFINITY blue */
                    margin-bottom: 20px;
                }
            </style>
        </head>
        <body>
            <div class="identicon-container">
                <div class="header">Generated identicon for principal: ${principal} at timestamp ${salt}</div>
                ${svg}
            </div>
        </body>
        </html>
      `;
      res.setHeader('Content-Type', 'text/html');
      res.send(htmlResponse);
   });

   return app.listen();
}); 
