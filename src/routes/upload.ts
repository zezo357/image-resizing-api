import fileUtil from '../utilites/fileUtil';
import htmlUtil from '../utilites/htmlUtil';
import imageUtil from '../utilites/imageUtil';
import express from 'express';
//used to handle the upload to server part
import formidable from 'formidable';
import path from 'path';
import fs from 'fs';

const app = express();

//should be accessed from front end only to get the file
app.post('/upload', (req: express.Request, res: express.Response):void => {
  const form = formidable({ multiples: false });

  let resize: number;
  let width: number;
  let height: number;
  //parse the input form fields (to get width and height if available)
  form.parse(req, (err, fields: formidable.Fields, files: formidable.Files):void => {
    if (err) {
      return;
    }

    //get resize value (1=> true 0=> false)
    resize = fields.resize as unknown as number;

    //get rest of resize values if request was to resize
    if (resize == 1) {
      width = fields.width as unknown as number;
      height = fields.height as unknown as number;
    }

    //console.log(`resize:${resize} width:${width} height:${height}`);
    let file: formidable.File;

    if ((files.Files as unknown as formidable.File) != undefined) {
      file = files.Files as unknown as formidable.File;
    } else {
      file = files.file as unknown as formidable.File;
    }
    if (file == undefined) {
      res.status(404).send(`Image not found`);
      return;
    }

    if (file.size == 0) {
      res.status(404).send(`Image not found`);
      return;
    }

    if (!fileUtil.checkFileExists(file.filepath)) {
      res.status(404).send(`File could not be found`);
      return;
    }

    //check input parameters
    if (
      resize == 1 &&
      (fields.height == '' || height == undefined || isNaN(height))
    ) {
      res.status(404).send('parameters are not correct Please set the height');
      return;
    }
    if (
      resize == 1 &&
      (fields.width == '' || width == undefined || isNaN(width))
    ) {
      res.status(404).send('parameters are not correct Please set the width ');
      return;
    }
    //console.log(files.file);
    //path of inputted file
    const oldpath = file.filepath;

    //get the file name from the uploaded file
    const fileName = file.originalFilename as string;

    if (!fileUtil.CheckIfFileTypeIsValid(fileName)) {
      res
        .status(404)
        .send(
          `File type ${path.extname(
            fileName
          )} is not supported : supported file types ${fileUtil.supportedFileTypes()}`
        );
      return;
    }

    //new path of the image (the full folder)
    const newpath = path.join(fileUtil.fullImagesPath(), fileName);

    //move file from old path to new path
    fs.rename(oldpath, newpath, function (err): void {
      if (err) throw err;

      //if resize is 1 will redirect to resize page
      if (resize == 1) {
        res.redirect(
          `/resize?imgName=${fileName}&width=${width}&height=${height}`
        );
      }
      //resize ==0 the page is that the file got uploaded
      else {
        res.write('File uploaded and moved!');
        res.end();
      }
    });
  });
});

//showImage?imgPath=sammy.jpg
app.get('/showImage', async (req: express.Request, res: express.Response):Promise<void> => {
  //get image name from query params
  const imgPath = req.query.imgPath as string;
  res.sendFile(imgPath);
});

export default app;
