"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var fileUtil_1 = __importDefault(require("./utilites/fileUtil"));
var htmlUtil_1 = __importDefault(require("./utilites/htmlUtil"));
var upload_1 = __importDefault(require("./routes/upload"));
var resize_1 = __importDefault(require("./routes/resize"));
var app = (0, express_1.default)();
var port = 3000;
//logger for the requests
var router = express_1.default.Router();
router.use('/', function (req, res, next) {
    console.log("".concat(req.path, " Was visited"));
    next();
});
app.use('/', router);
app.use(upload_1.default);
app.use(resize_1.default);
//front end page
app.get('/', function (req, res) {
    res.send("\n\n\n ".concat(htmlUtil_1.default.stylePart(), "\n\n\n  <div class=\"split left\">\n  <li> ").concat(htmlUtil_1.default.htmlUpload(), "</li>\n  <li> ").concat(htmlUtil_1.default.htmlUploadAndResize(), "</li>\n  <li> ").concat(htmlUtil_1.default.listFilesWithItsIFrame(fileUtil_1.default.fullImagesPath()), "</li>\n  </div>\n\n\n  \n  <div class=\"split right\">\n  \n  \n  ").concat(htmlUtil_1.default.listFilesWithItsIFrame(fileUtil_1.default.tempImagesPath()), "\n\n  </div>\n   \n    \n    \n  "));
});
// start the Express server
app.listen(port, function () {
    console.log("server started at http://localhost:".concat(port));
});
exports.default = app;
