import express from 'express';

import fileUtil from './utilites/fileUtil';
import htmlUtil from './utilites/htmlUtil';
import upload from './routes/upload';
import resize from './routes/resize';
//used to handle the upload to server part
import formidable from 'formidable';

import path from 'path';
import fs from 'fs';

const app = express();
const port = 3000;

//logger for the requests
const router = express.Router();
router.use('/', (req: express.Request, res: express.Response, next):void => {
  console.log(`${req.path} Was visited`);
  next();
});
app.use('/', router);

app.use(upload);
app.use(resize);

//front end page
app.get('/', (req: express.Request, res: express.Response):void => {
  res.send(`


 ${htmlUtil.stylePart()}


  <div class="split left">
  <li> ${htmlUtil.htmlUpload()}</li>
  <li> ${htmlUtil.htmlUploadAndResize()}</li>
  <li> ${htmlUtil.listFilesWithItsIFrame(fileUtil.fullImagesPath())}</li>
  </div>


  
  <div class="split right">
  
  
  ${htmlUtil.listFilesWithItsIFrame(fileUtil.tempImagesPath())}

  </div>
   
    
    
  `);
});

// start the Express server
app.listen(port, ():void => {
  console.log(`server started at http://localhost:${port}`);
});
export default app;
