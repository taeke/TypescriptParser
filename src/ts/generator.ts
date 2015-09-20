/// <reference path='./../../typings/tsd.d.ts' />
'use strict';

var StringConsts = require('./../generatorData/StringConsts.json');
var StringHelper = require('./StringHelper');
var ChapterWriter = require('./ChapterWriter');
var fs = require('fs');

var stream: NodeJS.WritableStream = fs.createWriteStream("./../typescript.pegjs");
var chapterWriter = new ChapterWriter(stream);

stream.once('open', (fd: number) => {
	stream.write(StringHelper.format(StringConsts.Start, StringConsts.Version));
	chapterWriter.write();
	stream.end();
});