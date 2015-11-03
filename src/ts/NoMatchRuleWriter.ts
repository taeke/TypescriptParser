/// <reference path='./../../typings/tsd.d.ts' />
/// <reference path='./../interfaces/IRuleWriter.d.ts' />
/// <reference path='./../interfaces/IRule.d.ts' />
'use strict';

class NoMatchRuleWriter implements IRuleWriter {
	constructor(private stream: NodeJS.WritableStream) {
	}


	isAMatch(rule: IRule): boolean {
		return true;
	}
	
	writeRule(rule: IRule): void {
        this.stream.write(rule.name + '\n  = "NO MATCH"\n\n');		
	}
}

export = NoMatchRuleWriter;