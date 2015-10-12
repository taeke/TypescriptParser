/// <reference path='./../../typings/tsd.d.ts' />
/// <reference path='./IAssets.d.ts' />

interface IJavascriptRulesWriter {
	write: (assets: IAssets) => void;
}