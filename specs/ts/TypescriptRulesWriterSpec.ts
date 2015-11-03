/// <reference path='./../../typings/tsd.d.ts' />
/// <reference path='./../../src/interfaces/ITypescriptRulesWriter.d.ts' />
/// <reference path='./../../src/interfaces/IAssets.d.ts' />
/// <reference path='./../../src/interfaces/IRule.d.ts' />

'use strict';

var TypescriptRulesWriter = require('./../../src/js/TypescriptRulesWriter');

describe('TypescriptRulesWriter', () => {
	var streamMock: any;
	var assetsMock: IAssets = {
		javascript: '',
	    header: '',
		appendixA: [
			{rules:[{name:'rule1', lines:[], modified: false},{name:'rule2', lines:[], modified: false}],
			 title:'test1'},
			{rules:[{name:'rule3', lines:[], modified: false},{name:'rule4', lines:[], modified: false}],
			 title:'test2'},
			{rules:[{name:'rule5', lines:[], modified: false},{name:'rule6', lines:[], modified: false}],
			title:'test3'}],
		stringConsts: {start:'', version:'', chapter:''}
	};
	
	var noMatchRuleWritersMock= jasmine.createSpyObj('ruleWritersMock', ['isAMatch', 'writeRule']);
	noMatchRuleWritersMock.isAMatch.and.returnValue(true);
	
	var typescriptRulesWriter: any;
	
	beforeEach(()=>{
		streamMock = jasmine.createSpyObj('streamMock', ['write']);
		typescriptRulesWriter = new TypescriptRulesWriter(streamMock, [noMatchRuleWritersMock]);
	});

	describe('write', () => {
		it('should call write on the stream for all chapters.', () => {
			// arrange
			spyOn(typescriptRulesWriter, 'writeRule'); 
			
			// act
			typescriptRulesWriter.write(assetsMock);
			
			// assert 
			expect(streamMock.write.calls.count()).toBe(1+3); // start line and 3 chapters.
		});

		it('should call writeRule on the ruleWriter for all the rules.', () => {
			// arrange
			var count = 0;
			spyOn(typescriptRulesWriter, 'writeRule').and.callFake(() => { count++; }); 
			
			// act
			typescriptRulesWriter.write(assetsMock);
			
			// assert
			expect(count).toBe(6);
		});
	});

	describe('writeRule', () => {
		it('should call writeRule on the noMatchRuleWritersMock', () => {
			// arrange
			var rule: IRule = {
				name: 'test',
				lines: [],
				modified: false
			}
			
			// act
			typescriptRulesWriter.writeRule(rule);
			
			// assert
			expect(noMatchRuleWritersMock.writeRule).toHaveBeenCalled();
		});
	});	
});