"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = __importDefault(require("path"));
var fileUtil_1 = __importDefault(require("./fileUtil"));
function stylePart() {
    return " <style>\n  .wrap {\n    width: 500px;\n    height: 500px;\n    padding: 0;\n    overflow: hidden;\n}\n.frame {\n  width: 2000px;\n  height: 1500px;\n  border: 0;\n  -ms-transform: scale(0.25);\n  -moz-transform: scale(0.25);\n  -o-transform: scale(0.25);\n  -webkit-transform: scale(0.25);\n  transform: scale(0.25);\n\n  -ms-transform-origin: 0 0;\n  -moz-transform-origin: 0 0;\n  -o-transform-origin: 0 0;\n  -webkit-transform-origin: 0 0;\n  transform-origin: 0 0;\n}\n.split {\nheight: 100%;\nwidth: 50%;\nposition: fixed;\nz-index: 1;\ntop: 0;\noverflow-x: hidden;\npadding-top: 20px;\npadding-left: 20px;\n}\n\n/* Control the left side */\n.left {\nleft: 0;\nbackground-color: white;\n}\n\n/* Control the right side */\n.right {\nright: 0;\nbackground-color: white;\n}\n/* If you want the content centered horizontally and vertically */\n.centered {\nposition: absolute;\ntop: 50%;\nleft: 50%;\ntransform: translate(-50%, -50%);\ntext-align: center;\n}\n\n/* Style the image inside the centered container, if needed */\n.centered img {\nwidth: 150px;\nborder-radius: 50%;\n}\n  </style>";
}
function htmlUpload() {
    return "<h3>Upload image to Full folder</h3>\n    <form action=\"/upload\" enctype=\"multipart/form-data\" method=\"post\">\n      <div>File: <input type=\"file\" name=\"Files\" multiple=\"multiple\" /></div>\n      <input type=\"hidden\" value=\"0\" name=\"resize\" />\n      <input type=\"submit\" value=\"Upload\" />\n    </form>";
}
function htmlUploadAndResize() {
    return "\n      <h3>Upload image to Full folder and resize</h3>\n      <form action=\"/upload\" enctype=\"multipart/form-data\" method=\"post\">\n      <div>existingFile: <input type=\"text\" value=\"\" name=\"existingFile\" /></div>\n      <div>width: <input type=\"number\" value=\"200\" name=\"width\" /></div>\n      <div>height: <input type=\"number\" value=\"200\" name=\"height\" /></div>\n      <input type=\"hidden\" value=\"1\" name=\"resize\" />\n      <div>File: <input type=\"file\" name=\"Files\" multiple=\"multiple\" /></div>\n      <input type=\"submit\" value=\"Upload and resize\" />\n      <button formaction=\"/resizeForm\">Resize</button>\n    </form>\n    ";
}
function listFilesWithItsIFrame(dir) {
    var listOfPaths = fileUtil_1.default.getDirContents(dir);
    var liElements;
    liElements = '';
    //show error text without iframe
    if (listOfPaths.length == 0) {
        liElements += "<p style=\"color:red;\">There is no files in the folder</p>";
        return "<div>\n            ".concat(liElements, "\n    </div>");
    }
    //show list of files with iframe
    else {
        for (var i = 0; i < listOfPaths.length; i++) {
            liElements += "<li><a href=\"/showImage?imgPath=".concat(path_1.default.resolve(listOfPaths[i]), "\" target=\"").concat(dir, "\">").concat(path_1.default.basename(listOfPaths[i]), "</a></li>");
        }
        return "\n\n  \n  <h3>list of file from ".concat(dir, "</h3>\n    <div>\n        <ul>\n            ").concat(liElements, "\n        </ul>\n    </div>\n    <div class=\"wrap\">\n    <iframe class=\"frame\" name=\"").concat(dir, "\">\n    </iframe>\n    </div>\n    \n    ");
    }
}
exports.default = {
    htmlUpload: htmlUpload,
    htmlUploadAndResize: htmlUploadAndResize,
    listFilesWithItsIFrame: listFilesWithItsIFrame,
    stylePart: stylePart,
};
