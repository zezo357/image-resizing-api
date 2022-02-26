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
var index_1 = __importDefault(require("../../index"));
var fs_1 = __importDefault(require("fs"));
var sharp_1 = __importDefault(require("sharp"));
var path_1 = __importDefault(require("path"));
var supertest_1 = __importDefault(require("supertest"));
var fileUtil_1 = __importDefault(require("../../utilites/fileUtil"));
var imageUtil_1 = __importDefault(require("../../utilites/imageUtil"));
var request = (0, supertest_1.default)(index_1.default);
describe('upload endpoint responses', function () {
    var imageName = 'test_2.png';
    var width = 200;
    var height = 200;
    beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
        var sharpObject;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    sharpObject = (0, sharp_1.default)({
                        create: {
                            width: 1024,
                            height: 768,
                            channels: 3,
                            background: { r: 0, g: 0, b: 0, alpha: 0 },
                        },
                    });
                    return [4 /*yield*/, sharpObject.toFile(imageName)];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('gets the upload endpoint without resize', function (done) {
        request
            .post('/upload')
            .field('resize', 0)
            .field('width', width)
            .field('height', height)
            .attach('file', imageName)
            .redirects(1)
            .end(function (err, res) {
            //check the response status
            expect(res.status).toBe(200);
            //check if the image was uploaded
            expect(fileUtil_1.default.checkFileExists(path_1.default.join(fileUtil_1.default.fullImagesPath(), imageName))).toBe(true);
            //check if the image was resized
            expect(fileUtil_1.default.checkFileExists(path_1.default.join(fileUtil_1.default.tempImagesPath(), imageUtil_1.default.newImageNameAfterResize(imageName, width, height)))).toBe(false);
            done();
        });
    });
    it('gets the upload endpoint with resize', function (done) {
        request
            .post('/upload')
            .field('resize', 1)
            .field('width', width)
            .field('height', height)
            .attach('file', imageName)
            .redirects(1)
            .end(function (err, res) {
            //check the response status
            expect(res.status).toBe(200);
            //check if the image was uploaded
            expect(fileUtil_1.default.checkFileExists(path_1.default.join(fileUtil_1.default.fullImagesPath(), imageName))).toBe(true);
            //check if the image was resized
            expect(fileUtil_1.default.checkFileExists(path_1.default.join(fileUtil_1.default.tempImagesPath(), imageUtil_1.default.newImageNameAfterResize(imageName, width, height)))).toBe(true);
            done();
        });
    });
    afterEach(function () {
        //fs.unlinkSync(path.join(imageName));
        if (fileUtil_1.default.checkFileExists(path_1.default.join(fileUtil_1.default.fullImagesPath(), imageName))) {
            fs_1.default.unlinkSync(path_1.default.join(fileUtil_1.default.fullImagesPath(), imageName));
        }
        if (fileUtil_1.default.checkFileExists(path_1.default.join(fileUtil_1.default.tempImagesPath(), imageUtil_1.default.newImageNameAfterResize(imageName, width, height)))) {
            fs_1.default.unlinkSync(path_1.default.join(fileUtil_1.default.tempImagesPath(), imageUtil_1.default.newImageNameAfterResize(imageName, width, height)));
        }
    });
});
