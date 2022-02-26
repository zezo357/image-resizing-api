"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
function checkFileExists(path) {
    var exist = fs_1.default.existsSync(path);
    return exist;
}
function createDirIfItDoNotExist(dir) {
    if (!fs_1.default.existsSync(dir)) {
        fs_1.default.mkdirSync(dir, { recursive: true });
    }
}
function fullImagesPath() {
    var pathUsed = path_1.default.join('.', 'Images', 'Full');
    createDirIfItDoNotExist(pathUsed);
    return pathUsed;
}
function tempImagesPath() {
    var pathUsed = path_1.default.join('.', 'Images', 'Temp');
    createDirIfItDoNotExist(pathUsed);
    return pathUsed;
}
function supportedFileTypes() {
    return ['.jpeg', '.png', '.jpg'];
}
function CheckIfFileTypeIsValid(FileName) {
    //check file extension
    if (supportedFileTypes().indexOf(path_1.default.extname(FileName)) == -1) {
        return false;
    }
    else {
        return true;
    }
}
function getDirContents(DirName) {
    var listOfFiles = [];
    fs_1.default.readdirSync(DirName).forEach(function (file) {
        listOfFiles.push(path_1.default.join(DirName, file));
        //console.log(file);
    });
    return listOfFiles;
}
exports.default = {
    checkFileExists: checkFileExists,
    fullImagesPath: fullImagesPath,
    tempImagesPath: tempImagesPath,
    getDirContents: getDirContents,
    supportedFileTypes: supportedFileTypes,
    CheckIfFileTypeIsValid: CheckIfFileTypeIsValid,
};
