import fs from 'fs';
import path from 'path';
import fileUtil from '../../utilites/fileUtil';
describe('file util', ():void => {
  beforeAll(():void => {
    fs.writeFileSync(
      path.join(fileUtil.fullImagesPath(), 'test.txt'),
      'TestFile'
    );
  });

  it('checkFileExists(path.join(fileUtil.fullImagesPath(),"test.txt")) should return true', ():void => {
    expect(
      fileUtil.checkFileExists(path.join(fileUtil.fullImagesPath(), 'test.txt'))
    ).toEqual(true);
  });
  it('checkFileExists(path.join(fileUtil.fullImagesPath(),"test.png")) should return false', ():void => {
    expect(
      fileUtil.checkFileExists(path.join(fileUtil.fullImagesPath(), 'test.png'))
    ).toEqual(false);
  });
  it('CheckIfFileTypeIsValid("test.png") should return true', ():void => {
    expect(fileUtil.CheckIfFileTypeIsValid('test.png')).toEqual(true);
  });
  it('CheckIfFileTypeIsValid("test.txt") should return false', ():void => {
    expect(fileUtil.CheckIfFileTypeIsValid('test.txt')).toEqual(false);
  });

  it('Check getDirContents(fileUtil.fullImagesPath())  to Contain "test.txt"', async ():Promise<void> => {
    expect(fileUtil.getDirContents(fileUtil.fullImagesPath())).toContain(
      path.join(fileUtil.fullImagesPath(), 'test.txt')
    );
  });

  afterAll(():void => {
    fs.unlinkSync(path.join(fileUtil.fullImagesPath(), 'test.txt'));
  });
});
