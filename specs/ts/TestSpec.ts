/// <reference path='./../../typings/tsd.d.ts' />
/// <reference path='./ITestData.d.ts' />

var typestring = require('./Typestring');
var pegjs = require('pegjs');

describe('typescript compile', () => {
	it('should throw an exception on a syntax error.', () => {
		// arrange
		
		// act and assert
		expect(() => { typestring.compile('var a := 1;') }).toThrow();
	});

	describe('Basic types', () => {
		jasmine.getFixtures().fixturesPath = './base/specs/data/';
		var testData: ITestData = JSON.parse(readFixtures('BasicTypes.json'));
		testData.items.forEach((test: ITestDataItem) => {
			it('should not throw an exception if the syntax is correct.', () => {
				// arrange
				
				// act and assert
				expect(() => { typestring.compile(test.code) }).not.toThrow();
			});
		});
	});
	
    describe('Temp', () => {
		jasmine.getFixtures().fixturesPath = './base/specs/data/';
		var testData: ITestData = JSON.parse(readFixtures('Temp.json'));
		testData.items.forEach((test: ITestDataItem) => {
			it('should not throw an exception if the syntax is correct.', () => {
				// arrange
				
				// act and assert
				expect(() => { typestring.compile(test.code) }).not.toThrow();
			});
		});
	});

});

describe('typescript parse', () => {
	describe('Basic types', () => {
		jasmine.getFixtures().fixturesPath = './base/specs/data/';
		var testData: ITestData = JSON.parse(readFixtures('BasicTypes.json'));
		testData.items.forEach((test: ITestDataItem) => {
			it('should parse typesccript', () => {
				// arrange
				jasmine.getFixtures().fixturesPath = './base/src/';
				var grammer = readFixtures('typescript.pegjs');
				var parser = pegjs.buildParser(grammer);
		
				// act
				var result = parser.parse(test.code);
		
				// assert
				expect(result).toEqual(test.result);
			});
		});
	});
	
	describe('Temp', () => {
		jasmine.getFixtures().fixturesPath = './base/specs/data/';
		var testData: ITestData = JSON.parse(readFixtures('Temp.json'));
		testData.items.forEach((test: ITestDataItem) => {
			it('should parse typesccript', () => {
				// arrange
				jasmine.getFixtures().fixturesPath = './base/src/';
				var grammer = readFixtures('typescript.pegjs');
				var parser = pegjs.buildParser(grammer);
		
				// act
				var result = parser.parse(test.code);
				console.log(JSON.stringify(result.elements));
		
				// assert
				expect(result).toEqual(test.result);
			});
		});
	});
});
