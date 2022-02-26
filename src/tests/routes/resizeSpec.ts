import app from '../../index';
import fs from 'fs';
import sharp from 'sharp';
import path from 'path';
import supertest from 'supertest';
import fileUtil from '../../utilites/fileUtil';
import imageUtil from '../../utilites/imageUtil';

const request = supertest(app);

describe('resize endpoint responses', ():void => {
  const imageName = 'test_2.png';
  const width = 200;
  const height = 200;

  beforeAll(async ():Promise<void> => {
    const sharpObject = sharp({
      create: {
        width: 1024,
        height: 768,
        channels: 3,
        background: { r: 0, g: 0, b: 0, alpha: 0 },
      },
    });
    await sharpObject.toFile(path.join(fileUtil.fullImagesPath(), imageName));
  });

  it('gets the resize endpoint', (done: DoneFn):void => {
    request
      .get(`/resize?imgName=${imageName}&width=${width}&height=${height}`)
      .end(function (_err, res: supertest.Response) {
        //check the response status
        expect(res.status).toBe(200);

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

  afterAll(():void => {
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
