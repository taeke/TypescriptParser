/// <reference path='./../../typings/tsd.d.ts' />
/// <reference path='./IAssets.d.ts' />

interface IHeaderWriter {
	write: (assets: IAssets) => void;
	emit: (event: string) => void;
}