"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = __importDefault(require("path"));
var fileUtil_1 = __importDefault(require("../../utilites/fileUtil"));
function htmlUpload() {
    return "<h2>Upload image to Full folder</h2>\n    <form action=\"/upload\" enctype=\"multipart/form-data\" method=\"post\">\n      <div>File: <input type=\"file\" name=\"Files\" multiple=\"multiple\" /></div>\n      <input type=\"hidden\" value=\"0\" name=\"resize\" />\n      <input type=\"submit\" value=\"Upload\" />\n    </form>";
}
function htmlUploadAndResize() {
    return "\n      <h2>Upload image to Full folder and resize</h2>\n      <form action=\"/upload\" enctype=\"multipart/form-data\" method=\"post\">\n      <div>width: <input type=\"number\" value=\"200\" name=\"width\" /></div>\n      <div>height: <input type=\"number\" value=\"200\" name=\"height\" /></div>\n      <input type=\"hidden\" value=\"1\" name=\"resize\" />\n      <div>File: <input type=\"file\" name=\"Files\" multiple=\"multiple\" /></div>\n      <input type=\"submit\" value=\"Upload and resize\" />\n    </form>";
}
function listFilesWithItsIFrame(id, dir) {
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
            liElements += "<li><a href=\"/showImage?imgPath=".concat(path_1.default.resolve(listOfPaths[i]), "\" target=\"").concat(id, "\">").concat(path_1.default.basename(listOfPaths[i]), "</a></li>");
        }
        return "<div>\n        <ul>\n            ".concat(liElements, "\n        </ul>\n    </div>\n    <iframe name=\"").concat(id, "\">\n    </iframe>");
    }
}
exports.default = {
    htmlUpload: htmlUpload,
    htmlUploadAndResize: htmlUploadAndResize,
    listFilesWithItsIFrame: listFilesWithItsIFrame,
};
