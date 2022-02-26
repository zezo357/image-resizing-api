import app from '../../index';
import fs from 'fs';
import sharp from 'sharp';
import path from 'path';
import supertest from 'supertest';
import fileUtil from '../../utilites/fileUtil';
import imageUtil from '../../utilites/imageUtil';

const request = supertest(app);

describe('upload endpoint responses', ():void => {
  const imageName = 'test_2.png';
  const width = 200;
  const height = 200;

  beforeEach(async ():Promise<void> => {
    const sharpObject = sharp({
      create: {
        width: 1024,
        height: 768,
        channels: 3,
        background: { r: 0, g: 0, b: 0, alpha: 0 },
      },
    });
    await sharpObject.toFile(imageName);
  });

  it('gets the upload endpoint without resize', (done: DoneFn):void => {
    request
      .post('/upload')
      .field('resize', 0)
      .field('width', width)
      .field('height', height)
      .attach('file', imageName)
      .redirects(1)
      .end(function (err, res:supertest.Response) {
        //check the response status
        expect(res.status).toBe(200);

        //check if the image was uploaded
        expect(
          fileUtil.checkFileExists(
            path.join(fileUtil.fullImagesPath(), imageName)
          )
        ).toBe(true);

        //check if the image was resized
        expect(
          fileUtil.checkFileExists(
            path.join(
              fileUtil.tempImagesPath(),
              imageUtil.newImageNameAfterResize(imageName, width, height)
            )
          )
        ).toBe(false);
        done();
      });
  });

  it('gets the upload endpoint with resize', (done: DoneFn):void => {
    request
      .post('/upload')
      .field('resize', 1)
      .field('width', width)
      .field('height', height)
      .attach('file', imageName)
      .redirects(1)
      .end(function (err, res: supertest.Response) {
        //check the response status
        expect(res.status).toBe(200);

        //check if the image was uploaded
        expect(
          fileUtil.checkFileExists(
            path.join(fileUtil.fullImagesPath(), imageName)
          )
        ).toBe(true);

        //check if the image was resized
        expect(
          fileUtil.checkFileExists(
            path.join(
              fileUtil.tempImagesPath(),
              imageUtil.newImageNameAfterResize(imageName, width, height)
            )
          )
        ).toBe(true);
        done();
      });
  });

  afterEach(():void => {
    //fs.unlinkSync(path.join(imageName));
    if (
      fileUtil.checkFileExists(path.join(fileUtil.fullImagesPath(), imageName))
    ) {
      fs.unlinkSync(path.join(fileUtil.fullImagesPath(), imageName));
    }
    if (
      fileUtil.checkFileExists(
        path.join(
          fileUtil.tempImagesPath(),
          imageUtil.newImageNameAfterResize(imageName, width, height)
        )
      )
    ) {
      fs.unlinkSync(
        path.join(
          fileUtil.tempImagesPath(),
          imageUtil.newImageNameAfterResize(imageName, width, height)
        )
      );
    }
  });
});
