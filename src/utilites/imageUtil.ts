import sharp from 'sharp';
import path from 'path';
import fileUtil from './fileUtil';

function newImageNameAfterResize(
  imageName: string,
  width: number,
  height: number
): string {
  return `${path.parse(imageName).name}_${width}_${height}${
    path.parse(imageName).ext
  }`;
}
async function resizeImage(
  imageName: string,
  width: number,
  height: number
): Promise<boolean> {
  try {
    const sharpObject = await sharp(
      path.join(fileUtil.fullImagesPath(), imageName)
    );
    const resizedImage = await sharpObject.resize({
      width: width,
      height: height,
    });
    await resizedImage.toFile(
      path.join(
        fileUtil.tempImagesPath(),
        newImageNameAfterResize(imageName, width, height)
      )
    );
    return true;
  } catch (error) {
    console.log(`An error occurred during resizeImage: ${error}`);
    return false;
  }
}

export default {
  resizeImage,
  newImageNameAfterResize,
};
