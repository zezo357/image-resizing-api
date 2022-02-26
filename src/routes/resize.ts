import fileUtil from '../utilites/fileUtil';
import htmlUtil from '../utilites/htmlUtil';
import imageUtil from '../utilites/imageUtil';
import express from 'express';

//used to handle the upload to server part
import formidable from 'formidable';
import path from 'path';
import fs from 'fs';

const app = express();

//resizeForm
app.post('/resizeForm', (req: express.Request, res: express.Response):void => {
  const form = formidable({ multiples: false });

  let existingFile: string;
  let width: number;
  let height: number;

  //parse the input form fields (to get width and height if available)
  form.parse(req, (err, fields: formidable.Fields):void => {
    if (err) {
      return;
    }

    existingFile = fields.existingFile as string;
    width = fields.width as unknown as number;
    height = fields.height as unknown as number;
    //console.log(`existingFile:${existingFile} width:${width} height:${height}`);
    //console.log(typeof width);
    //check width parameters
    if (
      isNaN(width) ||
      fields.width == '' ||
      width == null ||
      width == undefined
    ) {
      res.status(404).send('parameters are not correct Please set the width');
      return;
    }
    //check height parameters
    if (
      isNaN(height) ||
      fields.height == '' ||
      height == null ||
      height == undefined
    ) {
      res.status(404).send('parameters are not correct Please set the height');
      return;
    }

    //check existingFile parameters
    if (existingFile == undefined || existingFile == '') {
      res.status(404).send('parameters are not correct Please set the imgName');
      return;
    }

    res.redirect(
      `/resize?imgName=${existingFile}&width=${width}&height=${height}`
    );
  });
});
//resize?imgName=sammy.jpg&width=200&height=200
app.get('/resize',async (req: express.Request, res: express.Response):Promise<void> => {
  //get image name from query params
  const imgName = req.query.imgName as string;
  //get width from query params
  const width = parseInt(req.query.width as string);
  //get height from query params
  const height = parseInt(req.query.height as string);

  //check input parameters
  if (imgName == undefined || req.query.imgName == '') {
    res
      .status(404)
      .send(
        'imgName is not defined Ex: /resize?imgName=sammy.jpg&width=200&height=200'
      );
    return;
  }
  //check input parameters
  if (
    isNaN(height) ||
    req.query.height == '' ||
    height == null ||
    height == undefined
  ) {
    res
      .status(404)
      .send(
        'height is not defined Ex: /resize?imgName=sammy.jpg&width=200&height=200'
      );
    return;
  }
  //check input parameters
  if (
    isNaN(width) ||
    req.query.width == '' ||
    width == null ||
    width == undefined
  ) {
    res
      .status(404)
      .send(
        'width is not defined Ex: /resize?imgName=sammy.jpg&width=200&height=200'
      );
    return;
  }
  //set a variable for the full Image Path (readability)
  const fullImagePath = path.join(fileUtil.fullImagesPath(), imgName);
  //set a variable for the new image path (readability)
  const NewImagePath = path.join(
    fileUtil.tempImagesPath(),
    imageUtil.newImageNameAfterResize(imgName, width, height)
  );

  //check if exists in full folder
  if (!(fileUtil.checkFileExists(fullImagePath))) {
    res.status(404).send('Error image not found');
    return;
  }

  //check if the resized image exists
  if (fileUtil.checkFileExists(NewImagePath)) {
    console.log('this image exists');
    //send the cached image
    res.sendFile(
      path.resolve(
        path.join(
          fileUtil.tempImagesPath(),
          imageUtil.newImageNameAfterResize(imgName, width, height)
        )
      )
    );
  }
  // resized image doesn't exist will create new resized image and send it
  else {
    console.log("this image doesn't exists will create it");
    if (await imageUtil.resizeImage(imgName, width, height)) {
      res.sendFile(
        path.resolve(
          path.join(
            fileUtil.tempImagesPath(),
            imageUtil.newImageNameAfterResize(imgName, width, height)
          )
        )
      );
    } else {
      res.status(404).send('Error in proccesing the image');
    }
  }
});
export default app;
