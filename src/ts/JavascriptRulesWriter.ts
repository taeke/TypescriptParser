/// <reference path='./../../typings/tsd.d.ts' />
/// <reference path='./../interfaces/IJavascriptRulesWriter.d.ts' />
/// <reference path='./../interfaces/IAssets.d.ts' />
'use strict';

import * as events from "events";

var JavascriptWriterState = require(' ./../../src/js/JavascriptWriterState');

class JavascriptRulesWriter extends events.EventEmitter implements IJavascriptRulesWriter {
	javascriptWriterState = JavascriptWriterState.UnModified;
	modified: string = '';
	modifiedRules: string[]; // Rules allready available in javascript but modified in TypeScript.
	
	constructor(private stream: NodeJS.WritableStream) {
		super();
	}
	
	setModifiedRules(assets: IAssets): void {
		this.modifiedRules = [];
		assets.appendixA.forEach((chapter: IChapter) => {
			chapter.rules.forEach((rule: IRule) => {
				if (rule.modified) {
					this.modifiedRules.push(rule.name);
				}
			});
		});
	}

	write(assets: IAssets): void {
		this.setModifiedRules(assets);
		var lines: string[] = assets.javascript.split('\n');
		lines.forEach((line:string) => {
			this.writeLine(line);
		});
	}

	writeLine(line: string): void {
		switch (this.javascriptWriterState) {
			case JavascriptWriterState.UnModified:
				this.handleUnModified(line);
				break;
			case JavascriptWriterState.Modified:
				this.handleModified(line);
				break;
			default:
			    throw new Error('Unknown grammer state.');
		}
	}
	
	handleUnModified(line: string) {
		if (this.modifiedRules.indexOf(line) === -1) {
			this.stream.write(line + '\n');
		} else {
			this.modified = '/* Redefined in typescript rules\n' + line + '\n';
			this.javascriptWriterState = JavascriptWriterState.Modified;
		}
	}
	
	handleModified(line: string) {
		if(line.indexOf(' ') === 0) {
			this.modified = this.modified + line + '\n';
		} else {
			this.stream.write(this.modified + '*/'  + '\n');
			this.stream.write(line + '\n');
			this.javascriptWriterState = JavascriptWriterState.UnModified; 
		}
	}
}

export = JavascriptRulesWriter;