import fileUtil from '../../utilites/fileUtil';
import htmlUtil from '../../utilites/htmlUtil';

//this code Was imported from https://github.com/sindresorhus/is-html/blob/main/index.js
///////////////////
//it was not installed because the code had this Error [ERR_REQUIRE_ESM]: require() of ES Module
import htmlTags from 'html-tags';

const basic = /\s?<!doctype html>|(<html\b[^>]*>|<body\b[^>]*>|<x-[^>]+>)+/i;
const full = new RegExp(
  htmlTags.map((tag) => `<${tag}\\b[^>]*>`).join('|'),
  'i'
);

function isHtml(stringInput: string):boolean {
  // We limit it to a reasonable length to improve performance.
  stringInput = stringInput.trim().slice(0, 1000);
  return basic.test(stringInput) || full.test(stringInput);
}
//////////////////////

describe('html util', ():void => {
  it('htmlUpload() is accepted html', () => {
    expect(isHtml(htmlUtil.htmlUpload())).toEqual(true);
  });

  it('htmlUploadAndResize() is accepted html', ():void => {
    expect(isHtml(htmlUtil.htmlUploadAndResize())).toEqual(true);
  });
  it('listFilesWithItsIFrame(fileUtil.fullImagesPath()) is accepted html', ():void => {
    expect(
      isHtml(htmlUtil.listFilesWithItsIFrame(fileUtil.fullImagesPath()))
    ).toEqual(true);
  });
  it('listFilesWithItsIFrame(fileUtil.tempImagesPath()) is accepted html', ():void => {
    expect(
      isHtml(htmlUtil.listFilesWithItsIFrame(fileUtil.tempImagesPath()))
    ).toEqual(true);
  });
});
