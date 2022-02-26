import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import fileUtil from '../../utilites/fileUtil';

import imageUtil from '../../utilites/imageUtil';
describe('images util', ():void => {
  beforeAll(async ():Promise<void>  => {
    const sharpObject = sharp({
      create: {
        width: 1024,
        height: 768,
        channels: 3,
        background: { r: 0, g: 0, b: 0, alpha: 0 },
      },
    });
    await sharpObject.toFile(path.join(fileUtil.fullImagesPath(), 'test.png'));
  });

  it('newImageNameAfterResize("test.png",200,200) should return test_200_200.png', ():void  => {
    expect(imageUtil.newImageNameAfterResize('test.png', 200, 200)).toEqual(
      'test_200_200.png'
    );
  });
  it('resizeImage("test.png",200,200) should return true', async ():Promise<void>  => {
    const result = await imageUtil.resizeImage('test.png', 200, 200);
    expect(result).toEqual(true);
  });
  it('Check if new image(test_200_200.png) is created in the temp folder should return true', async ():Promise<void> => {
    const result = await fileUtil.checkFileExists(
      path.join(
        fileUtil.tempImagesPath(),
        imageUtil.newImageNameAfterResize('test.png', 200, 200)
      )
    );
    expect(result).toEqual(true);
  });

  afterAll(():void => {
    fs.unlinkSync(path.join(fileUtil.fullImagesPath(), 'test.png'));
    fs.unlinkSync(
      path.join(
        fileUtil.tempImagesPath(),
        imageUtil.newImageNameAfterResize('test.png', 200, 200)
      )
    );
  });
});
