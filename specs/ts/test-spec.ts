/// <reference path='./../../typings/tsd.d.ts' />

var typestring = require('./typestring');
var pegjs = require('pegjs');

describe('typescriptcompile', () => {
	it('should throw an exception on a syntax error.', () => {
		// arrange
		
		// act and assert
		expect(() => { typestring.compile('var a := 1;')}).toThrow();
	});
	
	it('should not throw an exception if the syntax is correct.', () => {
		// arrange
		
		// act and assert
		expect(() => { typestring.compile('var c = 1;')}).not.toThrow();
	});
})

describe('javascriptParser', () => {
	it('should parse javasccript', () => {
		jasmine.getFixtures().fixturesPath = './base/node_modules/pegjs/examples/';
		var grammer = readFixtures('javascript.pegjs');
		var parser = pegjs.buildParser(grammer);
		
		var result = parser.parse('var a = 1;');
		
        expect(result.elements[0].type).toBe('VariableStatement');
        expect(result.elements[0].declarations[0].name).toBe('a');
        expect(result.elements[0].declarations[0].value.value).toBe(1);
	});
});

describe('javascriptParser', () => {
	it('should parse javasccript', () => {
		jasmine.getFixtures().fixturesPath = './base/src/';
		var grammer = readFixtures('typescript.pegjs');
		var parser = pegjs.buildParser(grammer);
		
		var result = parser.parse('var a = 1;');
		
        expect(result.elements[0].type).toBe('VariableStatement');
        expect(result.elements[0].declarations[0].name).toBe('a');
        expect(result.elements[0].declarations[0].value.value).toBe(1);
	});
});