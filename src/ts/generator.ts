/// <reference path='./../../typings/tsd.d.ts' />

'use strict';

var fs = require('fs');

var stream: NodeJS.WritableStream = fs.createWriteStream("./../typescript.pegjs");
stream.once('open', (fd: number) => {
	stream.write('// Typescript rules.');
	stream.end();
});