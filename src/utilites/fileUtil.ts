import fs from 'fs';
import path from 'path';
function checkFileExists(path: string): boolean {
    const exist = fs.existsSync(path);
    return exist;
}
function createDirIfItDoNotExist(dir: string):void {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function fullImagesPath(): string {
  const pathUsed = path.join('.', 'Images', 'Full');
  createDirIfItDoNotExist(pathUsed);
  return pathUsed;
}
function tempImagesPath(): string {
  const pathUsed = path.join('.', 'Images', 'Temp');
  createDirIfItDoNotExist(pathUsed);
  return pathUsed;
}

function supportedFileTypes(): string[] {
  return ['.jpeg', '.png', '.jpg'];
}

function CheckIfFileTypeIsValid(FileName: string): boolean {
  //check file extension
  if (supportedFileTypes().indexOf(path.extname(FileName)) == -1) {
    return false;
  } else {
    return true;
  }
}

function getDirContents(DirName: string): string[] {
  const listOfFiles: string[] = [];

  fs.readdirSync(DirName).forEach((file):void => {
    listOfFiles.push(path.join(DirName, file));
    //console.log(file);
  });
  return listOfFiles;
}

export default {
  checkFileExists,
  fullImagesPath,
  tempImagesPath,
  getDirContents,
  supportedFileTypes,
  CheckIfFileTypeIsValid,
};
