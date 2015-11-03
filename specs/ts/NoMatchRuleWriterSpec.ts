/// <reference path='./../../typings/tsd.d.ts' />

'use strict';

var NoMatchRuleWriter = require('./../../src/js/NoMatchRuleWriter');

describe('NoMatchRuleWriter', () => {
	var streamMock: any;
	var noMatchRuleWriter: any;
	
	beforeEach(()=>{
    streamMock = jasmine.createSpyObj('streamMock', ['write']);
		noMatchRuleWriter = new NoMatchRuleWriter(streamMock);
	});
	
	describe('isAMatch', () => {
		it('should return true', () => {
			// arrange
			
			// act
			var result = noMatchRuleWriter.isAMatch();
			
			// assert
			expect(result).toBeTruthy();
		});
	});
	
	describe('writeRule', () => {
		it('should call write on the stream', () => {
			// arrange
			var ruleMock = {
				name: 'test'
			};
			
			// act
			noMatchRuleWriter.writeRule(ruleMock);
			
			// assert
			expect(streamMock.write).toHaveBeenCalled();
		});
	});	
});
