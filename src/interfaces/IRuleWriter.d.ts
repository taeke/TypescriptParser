/// <reference path='./IRule.d.ts' />

interface IRuleWriter {
	isAMatch: (rule: IRule) => boolean;
	writeRule: (rule: IRule) => void; 
}