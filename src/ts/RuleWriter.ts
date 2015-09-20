/// <reference path='./../../typings/tsd.d.ts' />
/// <reference path='./../interfaces/IRule.d.ts' />
'use strict';

class RuleWriter {
    constructor(private stream: NodeJS.WritableStream) {
	}
	
	write(rule: IRule): void {
		this.stream.write(rule.name + '\n  = "NO MATCH"\n\n');
	}
}

export = RuleWriter;