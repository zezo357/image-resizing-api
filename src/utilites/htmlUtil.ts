import path from 'path';

import fileUtil from './fileUtil';
function stylePart(): string {
  return ` <style>
  .wrap {
    width: 500px;
    height: 500px;
    padding: 0;
    overflow: hidden;
}
.frame {
  width: 2000px;
  height: 1500px;
  border: 0;
  -ms-transform: scale(0.25);
  -moz-transform: scale(0.25);
  -o-transform: scale(0.25);
  -webkit-transform: scale(0.25);
  transform: scale(0.25);

  -ms-transform-origin: 0 0;
  -moz-transform-origin: 0 0;
  -o-transform-origin: 0 0;
  -webkit-transform-origin: 0 0;
  transform-origin: 0 0;
}
.split {
height: 100%;
width: 50%;
position: fixed;
z-index: 1;
top: 0;
overflow-x: hidden;
padding-top: 20px;
padding-left: 20px;
}

/* Control the left side */
.left {
left: 0;
background-color: white;
}

/* Control the right side */
.right {
right: 0;
background-color: white;
}
/* If you want the content centered horizontally and vertically */
.centered {
position: absolute;
top: 50%;
left: 50%;
transform: translate(-50%, -50%);
text-align: center;
}

/* Style the image inside the centered container, if needed */
.centered img {
width: 150px;
border-radius: 50%;
}
  </style>`;
}
function htmlUpload(): string {
  return `<h3>Upload image to Full folder</h3>
    <form action="/upload" enctype="multipart/form-data" method="post">
      <div>File: <input type="file" name="Files" multiple="multiple" /></div>
      <input type="hidden" value="0" name="resize" />
      <input type="submit" value="Upload" />
    </form>`;
}
function htmlUploadAndResize(): string {
  return `
      <h3>Upload image to Full folder and resize</h3>
      <form action="/upload" enctype="multipart/form-data" method="post">
      <div>existingFile: <input type="text" value="" name="existingFile" /></div>
      <div>width: <input type="number" value="200" name="width" /></div>
      <div>height: <input type="number" value="200" name="height" /></div>
      <input type="hidden" value="1" name="resize" />
      <div>File: <input type="file" name="Files" multiple="multiple" /></div>
      <input type="submit" value="Upload and resize" />
      <button formaction="/resizeForm">Resize</button>
    </form>
    `;
}
function listFilesWithItsIFrame(dir: string):string {
  const listOfPaths = fileUtil.getDirContents(dir);
  let liElements: string;
  liElements = '';
  //show error text without iframe
  if (listOfPaths.length == 0) {
    liElements += `<p style="color:red;">There is no files in the folder</p>`;
    return `<div>
            ${liElements}
    </div>`;
  }
  //show list of files with iframe
  else {
    for (let i = 0; i < listOfPaths.length; i++) {
      liElements += `<li><a href="/showImage?imgPath=${path.resolve(
        listOfPaths[i]
      )}" target="${dir}">${path.basename(listOfPaths[i])}</a></li>`;
    }
    return `

  
  <h3>list of file from ${dir}</h3>
    <div>
        <ul>
            ${liElements}
        </ul>
    </div>
    <div class="wrap">
    <iframe class="frame" name="${dir}">
    </iframe>
    </div>
    
    `;
  }
}

export default {
  htmlUpload,
  htmlUploadAndResize,
  listFilesWithItsIFrame,
  stylePart,
};
