/// <reference path='./../../src/interfaces/ITypeScriptParse.d.ts' />

interface ITestDataItem {
	source: string; // What source is this piece of code from.
	code: string; // A piece of source code to be compiled / parsed.
	result: ITypeScriptParse;
}