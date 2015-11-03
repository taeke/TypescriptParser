/// <reference path='./../../typings/tsd.d.ts' />
/// <reference path='./../interfaces/IAssets.d.ts' />
'use strict';

var TypescriptRulesWriter = require('./TypescriptRulesWriter');
var JavascriptRulesWriter = require('./JavascriptRulesWriter');
var NoMatchRuleWriter = require('./../../src/js/NoMatchRuleWriter');
var HeaderWriter = require('./HeaderWriter');
var AssetsLoader = require('./AssetsLoader');
var fs = require('fs');

var stream: NodeJS.WritableStream = fs.createWriteStream("./../typescript.pegjs");
var headerWriter = new HeaderWriter(stream);
var javascriptRulesWriter = new JavascriptRulesWriter(stream);
var typescriptRulesWriter = new TypescriptRulesWriter(stream, [new NoMatchRuleWriter(stream)]);
var assetsLoader = new AssetsLoader();

stream.once('open', (fd: number) => {
    assetsLoader.load();
    assetsLoader.on('allDone', (assets: IAssets) => {
        headerWriter.write(assets);
        javascriptRulesWriter.write(assets);
        typescriptRulesWriter.write(assets);
        stream.end();
    });
});