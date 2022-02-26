"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fileUtil_1 = __importDefault(require("../utilites/fileUtil"));
var express_1 = __importDefault(require("express"));
//used to handle the upload to server part
var formidable_1 = __importDefault(require("formidable"));
var path_1 = __importDefault(require("path"));
var fs_1 = __importDefault(require("fs"));
var app = (0, express_1.default)();
//should be accessed from front end only to get the file
app.post('/upload', function (req, res) {
    var form = (0, formidable_1.default)({ multiples: false });
    var resize;
    var width;
    var height;
    //parse the input form fields (to get width and height if available)
    form.parse(req, function (err, fields, files) {
        if (err) {
            return;
        }
        //get resize value (1=> true 0=> false)
        resize = fields.resize;
        //get rest of resize values if request was to resize
        if (resize == 1) {
            width = fields.width;
            height = fields.height;
        }
        //console.log(`resize:${resize} width:${width} height:${height}`);
        var file;
        if (files.Files != undefined) {
            file = files.Files;
        }
        else {
            file = files.file;
        }
        if (file == undefined) {
            res.status(404).send("Image not found");
            return;
        }
        if (file.size == 0) {
            res.status(404).send("Image not found");
            return;
        }
        if (!fileUtil_1.default.checkFileExists(file.filepath)) {
            res.status(404).send("File could not be found");
            return;
        }
        //check input parameters
        if (resize == 1 &&
            (fields.height == '' || height == undefined || isNaN(height))) {
            res.status(404).send('parameters are not correct Please set the height');
            return;
        }
        if (resize == 1 &&
            (fields.width == '' || width == undefined || isNaN(width))) {
            res.status(404).send('parameters are not correct Please set the width ');
            return;
        }
        //console.log(files.file);
        //path of inputted file
        var oldpath = file.filepath;
        //get the file name from the uploaded file
        var fileName = file.originalFilename;
        if (!fileUtil_1.default.CheckIfFileTypeIsValid(fileName)) {
            res
                .status(404)
                .send("File type ".concat(path_1.default.extname(fileName), " is not supported : supported file types ").concat(fileUtil_1.default.supportedFileTypes()));
            return;
        }
        //new path of the image (the full folder)
        var newpath = path_1.default.join(fileUtil_1.default.fullImagesPath(), fileName);
        //move file from old path to new path
        fs_1.default.rename(oldpath, newpath, function (err) {
            if (err)
                throw err;
            //if resize is 1 will redirect to resize page
            if (resize == 1) {
                res.redirect("/resize?imgName=".concat(fileName, "&width=").concat(width, "&height=").concat(height));
            }
            //resize ==0 the page is that the file got uploaded
            else {
                res.write('File uploaded and moved!');
                res.end();
            }
        });
    });
});
//showImage?imgPath=sammy.jpg
app.get('/showImage', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var imgPath;
    return __generator(this, function (_a) {
        imgPath = req.query.imgPath;
        res.sendFile(imgPath);
        return [2 /*return*/];
    });
}); });
exports.default = app;
