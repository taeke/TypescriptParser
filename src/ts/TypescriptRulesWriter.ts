/// <reference path='./../../typings/tsd.d.ts' />
/// <reference path='./../interfaces/IChapter.d.ts' />
/// <reference path='./../interfaces/ITypescriptRulesWriter.d.ts' />
/// <reference path='./../interfaces/IAssets.d.ts' />
/// <reference path='./../interfaces/IRuleWriter.d.ts' />
'use strict';

import * as events from "events";

var StringHelper = require(' ./../../src/js/StringHelper');
var NoMatchRuleWriter = require('./../../src/js/NoMatchRuleWriter');

/**
 * Writes all the chapter lines for the Typescript parser and calls the RulesWriter for al the rules in a chapter.
 */
class TypescriptRulesWriter extends events.EventEmitter implements ITypescriptRulesWriter {
	private ruleWriters: IRuleWriter[] = [];
	
	constructor(private stream: NodeJS.WritableStream) {
		super();
	}
	
	write(assets: IAssets): void {
		this.stream.write(StringHelper.format(assets.stringConsts.start, assets.stringConsts.version));
		assets.appendixA.forEach((chapter:IChapter) => {
			this.stream.write(StringHelper.format(assets.stringConsts.chapter, chapter.title));
			chapter.rules.forEach((rule: IRule) => {
				this.writeRule(rule);
			});
		});
		
		this.emit('done');
	}
	
	writeRule(rule: IRule): void {
		var noMatchRuleWriter: IRuleWriter = new NoMatchRuleWriter(this.stream);
		noMatchRuleWriter.writeRule(rule);
	}	
}

export = TypescriptRulesWriter;