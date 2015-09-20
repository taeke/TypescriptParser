/// <reference path='./../../typings/tsd.d.ts' />
/// <reference path='./../../src/interfaces/IRuleWriter.d.ts' />

'use strict';

var RuleWriter = require('./../../src/js/RuleWriter');

describe('RuleWriter', () => {
	var streamMock = jasmine.createSpyObj('streamMock', ['write']);
	var ruleWriter: IRuleWriter;
	
	beforeEach(()=>{
		ruleWriter = new RuleWriter(streamMock);
	});
	
	describe('write', () => {
		it('should call write on the stream for the rule.', () => {
			// arrange
			var ruleMock = { name: 'test', lines: [] }
			
			// act
			ruleWriter.write(ruleMock);
			
			// assert
			expect(streamMock.write.calls.count()).toBe(1);
		});
	});
});