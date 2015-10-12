/// <reference path='./../../typings/tsd.d.ts' />
/// <reference path='./../../src/interfaces/IHeaderWriter.d.ts' />
/// <reference path='./../../src/interfaces/IAssets.d.ts' />
'use strict';

var HeaderWriter = require('./../../src/js/HeaderWriter');

describe('HeaderWriter', () => {
	var streamMock: any;
	var headerWriter: IHeaderWriter;
	var assetsMock: IAssets = {
		javascript: '',
	    header: '',
		appendixA: null,
		stringConsts: null
	};

	
	beforeEach(()=>{
		streamMock = jasmine.createSpyObj('streamMock', ['write']);
		headerWriter = new HeaderWriter(streamMock);
	});
	
	describe('write', () => {
		it('should call write on the stream', () => {
			// arrange
			
			// act
			headerWriter.write(assetsMock);
			
			// assert
			expect(streamMock.write).toHaveBeenCalled();
		});
	});
});