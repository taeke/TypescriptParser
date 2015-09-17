/// <reference path='./../../typings/tsd.d.ts' />
'use strict';
var fs = require('fs');
var stream = fs.createWriteStream("./../typescript.pegjs");
stream.once('open', function (fd) {
    stream.write('// Typescript rules.');
    stream.end();
});
