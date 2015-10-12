/// <reference path='./IRule.d.ts' />
/// <reference path='./IAssets.d.ts' />

interface ITypescriptRulesWriter {
	write: (assets: IAssets) => void;
	writeRule: (rule:IRule) => void;
}