/// <reference path='./../../typings/tsd.d.ts' />
/// <reference path='./../interfaces/IChapter.d.ts' />
/// <reference path='./../interfaces/IChapterWriter.d.ts' />
'use strict';

var StringHelper = require('./StringHelper');
var RuleWriter = require('./RuleWriter');
var StringConsts = require('./../generatorData/StringConsts.json');
var ApendixAJson = require('./../generatorData/AppendixA.json');

/**
 * Writes all the chapter lines for the Typescript parser and calls the RulesWriter for al the rules in a chapter.
 */
class ChapterWriter implements IChapterWriter {
	ruleWriter: IRuleWriter;
	constructor(private stream: NodeJS.WritableStream) {
		this.ruleWriter = new RuleWriter(this.stream);
	}
	
	write(): void {
		ApendixAJson.forEach((chapter:IChapter) => {
			this.stream.write(StringHelper.format(StringConsts.Chapter, chapter.title));
			chapter.rules.forEach((rule: IRule) => {
				this.ruleWriter.write(rule);
			});
		});
	}
}

export = ChapterWriter;