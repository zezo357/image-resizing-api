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
var imageUtil_1 = __importDefault(require("../utilites/imageUtil"));
var express_1 = __importDefault(require("express"));
//used to handle the upload to server part
var formidable_1 = __importDefault(require("formidable"));
var path_1 = __importDefault(require("path"));
var app = (0, express_1.default)();
//resizeForm
app.post('/resizeForm', function (req, res) {
    var form = (0, formidable_1.default)({ multiples: false });
    var existingFile;
    var width;
    var height;
    //parse the input form fields (to get width and height if available)
    form.parse(req, function (err, fields) {
        if (err) {
            return;
        }
        existingFile = fields.existingFile;
        width = fields.width;
        height = fields.height;
        //console.log(`existingFile:${existingFile} width:${width} height:${height}`);
        //console.log(typeof width);
        //check width parameters
        if (isNaN(width) ||
            fields.width == '' ||
            width == null ||
            width == undefined) {
            res.status(404).send('parameters are not correct Please set the width');
            return;
        }
        //check height parameters
        if (isNaN(height) ||
            fields.height == '' ||
            height == null ||
            height == undefined) {
            res.status(404).send('parameters are not correct Please set the height');
            return;
        }
        //check existingFile parameters
        if (existingFile == undefined || existingFile == '') {
            res.status(404).send('parameters are not correct Please set the imgName');
            return;
        }
        res.redirect("/resize?imgName=".concat(existingFile, "&width=").concat(width, "&height=").concat(height));
    });
});
//resize?imgName=sammy.jpg&width=200&height=200
app.get('/resize', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var imgName, width, height, fullImagePath, NewImagePath;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                imgName = req.query.imgName;
                width = parseInt(req.query.width);
                height = parseInt(req.query.height);
                //check input parameters
                if (imgName == undefined || req.query.imgName == '') {
                    res
                        .status(404)
                        .send('imgName is not defined Ex: /resize?imgName=sammy.jpg&width=200&height=200');
                    return [2 /*return*/];
                }
                //check input parameters
                if (isNaN(height) ||
                    req.query.height == '' ||
                    height == null ||
                    height == undefined) {
                    res
                        .status(404)
                        .send('height is not defined Ex: /resize?imgName=sammy.jpg&width=200&height=200');
                    return [2 /*return*/];
                }
                //check input parameters
                if (isNaN(width) ||
                    req.query.width == '' ||
                    width == null ||
                    width == undefined) {
                    res
                        .status(404)
                        .send('width is not defined Ex: /resize?imgName=sammy.jpg&width=200&height=200');
                    return [2 /*return*/];
                }
                fullImagePath = path_1.default.join(fileUtil_1.default.fullImagesPath(), imgName);
                NewImagePath = path_1.default.join(fileUtil_1.default.tempImagesPath(), imageUtil_1.default.newImageNameAfterResize(imgName, width, height));
                //check if exists in full folder
                if (!(fileUtil_1.default.checkFileExists(fullImagePath))) {
                    res.status(404).send('Error image not found');
                    return [2 /*return*/];
                }
                if (!fileUtil_1.default.checkFileExists(NewImagePath)) return [3 /*break*/, 1];
                console.log('this image exists');
                //send the cached image
                res.sendFile(path_1.default.resolve(path_1.default.join(fileUtil_1.default.tempImagesPath(), imageUtil_1.default.newImageNameAfterResize(imgName, width, height))));
                return [3 /*break*/, 3];
            case 1:
                console.log("this image doesn't exists will create it");
                return [4 /*yield*/, imageUtil_1.default.resizeImage(imgName, width, height)];
            case 2:
                if (_a.sent()) {
                    res.sendFile(path_1.default.resolve(path_1.default.join(fileUtil_1.default.tempImagesPath(), imageUtil_1.default.newImageNameAfterResize(imgName, width, height))));
                }
                else {
                    res.status(404).send('Error in proccesing the image');
                }
                _a.label = 3;
            case 3: return [2 /*return*/];
        }
    });
}); });
exports.default = app;
