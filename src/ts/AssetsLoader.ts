/// <reference path='./../../typings/tsd.d.ts' />
/// <reference path='./../interfaces/IAssets.d.ts' />
/// <reference path='./../interfaces/IAssetInfo.d.ts' />
'use strict';

import * as events from "events";
import * as fs from "fs";

class AssetsLoader extends events.EventEmitter {
	private assets: any = { // We need to use any to be able to do that.assets[assetInfo.propertyName]
		appendixA: undefined,
		header: undefined,
		javascript: undefined,
		stringConsts: undefined
	};
	
	private assetsInfos: IAssetInfo[] = [
		{ propertyName:'header', fileLocation:'./../generatorData/Header.pegjs', parseAsJson:false},
		{ propertyName:'javascript', fileLocation: './../../node_modules/pegjs/examples/javascript.pegjs', parseAsJson:false},
		{ propertyName:'appendixA', fileLocation:'./../generatorData/AppendixA.json', parseAsJson:true},
		{ propertyName:'stringConsts', fileLocation:'./../generatorData/StringConsts.json', parseAsJson:true}
	]; 
	
	load() : void {
		var that = this;
		this.assetsInfos.forEach((assetInfo:IAssetInfo) => {
			fs.readFile(assetInfo.fileLocation, 'utf8', function (err: any, data: string) {
				var result: any = (assetInfo.parseAsJson ? JSON.parse(data) : data);
				that.assets[assetInfo.propertyName] = result;
				that.checkAllDone();
			});
		})
	}
	
	private checkAllDone() {
		var done: boolean = true;
		this.assetsInfos.forEach((assetInfo:IAssetInfo) => {
			if(!this.assets[assetInfo.propertyName]) {
			    done = false;
			}
		});
		
		if (done) {
			this.emit('allDone', this.assets);
		}
	}
}

export = AssetsLoader;