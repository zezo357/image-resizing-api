"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fileUtil_1 = __importDefault(require("../../utilites/fileUtil"));
var htmlUtil_1 = __importDefault(require("../../utilites/htmlUtil"));
//this code Was imported from https://github.com/sindresorhus/is-html/blob/main/index.js
///////////////////
//it was not installed because the code had this Error [ERR_REQUIRE_ESM]: require() of ES Module
var html_tags_1 = __importDefault(require("html-tags"));
var basic = /\s?<!doctype html>|(<html\b[^>]*>|<body\b[^>]*>|<x-[^>]+>)+/i;
var full = new RegExp(html_tags_1.default.map(function (tag) { return "<".concat(tag, "\\b[^>]*>"); }).join('|'), 'i');
function isHtml(stringInput) {
    // We limit it to a reasonable length to improve performance.
    stringInput = stringInput.trim().slice(0, 1000);
    return basic.test(stringInput) || full.test(stringInput);
}
//////////////////////
describe('html util', function () {
    it('htmlUpload() is accepted html', function () {
        expect(isHtml(htmlUtil_1.default.htmlUpload())).toEqual(true);
    });
    it('htmlUploadAndResize() is accepted html', function () {
        expect(isHtml(htmlUtil_1.default.htmlUploadAndResize())).toEqual(true);
    });
    it('listFilesWithItsIFrame(fileUtil.fullImagesPath()) is accepted html', function () {
        expect(isHtml(htmlUtil_1.default.listFilesWithItsIFrame(fileUtil_1.default.fullImagesPath()))).toEqual(true);
    });
    it('listFilesWithItsIFrame(fileUtil.tempImagesPath()) is accepted html', function () {
        expect(isHtml(htmlUtil_1.default.listFilesWithItsIFrame(fileUtil_1.default.tempImagesPath()))).toEqual(true);
    });
});
