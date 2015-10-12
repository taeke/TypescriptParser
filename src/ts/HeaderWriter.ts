/// <reference path='./../../typings/tsd.d.ts' />
/// <reference path='./../interfaces/IHeaderWriter.d.ts' />
/// <reference path='./../interfaces/IAssets.d.ts' />
'use strict';

import * as events from "events";

class HeaderWriter extends events.EventEmitter implements IHeaderWriter {
	constructor(private stream: NodeJS.WritableStream) {
		super();
	}
	
	write(assets: IAssets): void {
		this.stream.write(assets.header);
		this.emit('done');
	}
}

export = HeaderWriter;
