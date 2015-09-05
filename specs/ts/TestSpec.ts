/// <reference path='./../../typings/tsd.d.ts' />
/// <reference path='./ITestInfo.d.ts' />

var typestring = require('./typestring');
var pegjs = require('pegjs');
var testen: ITestInfo[] = [{
	    code: 'var a:string = "test";',
		result: '{"type":"Program","elements":[{"type":"VariableStatement","declarations":[{"type":"SimpleVariableDeclaration","name":"a","value":{"type":"StringLiteral","value":"test"},"typeAnnotation":{"type":"PredefinedType","predefined":"string"}}]}]}'
    }, {
	    code: 'var a:number = 1;',
		result: '{"type":"Program","elements":[{"type":"VariableStatement","declarations":[{"type":"SimpleVariableDeclaration","name":"a","value":{"type":"NumericLiteral","value":1},"typeAnnotation":{"type":"PredefinedType","predefined":"number"}}]}]}'
    }];

describe('typescriptcompile', () => {
	it('should throw an exception on a syntax error.', () => {
		// arrange
		
		// act and assert
		expect(() => { typestring.compile('var a := 1;')}).toThrow();
	});
	
	testen.forEach((test) => {
		it('should not throw an exception if the syntax is correct.', () => {
			// arrange
			
			// act and assert
			expect(() => { typestring.compile(test.code)}).not.toThrow();
		});
	});
})

describe('javascriptParser', () => {
	it('should parse javasccript', () => {
		jasmine.getFixtures().fixturesPath = './base/node_modules/pegjs/examples/';
		var grammer = readFixtures('javascript.pegjs');
		var parser = pegjs.buildParser(grammer);
		
		var result = JSON.stringify(parser.parse('var a = 1;'));
		
        expect(result).toBe('{"type":"Program","elements":[{"type":"VariableStatement","declarations":[{"type":"VariableDeclaration","name":"a","value":{"type":"NumericLiteral","value":1}}]}]}');
	});
});

describe('typescriptParser', () => {
	testen.forEach((test) => {
		it('should parse typesccript', () => {
			jasmine.getFixtures().fixturesPath = './base/src/';
			var grammer = readFixtures('typescript.pegjs');
			var parser = pegjs.buildParser(grammer);
			
			var result = JSON.stringify(parser.parse(test.code));
			
			expect(result).toBe(test.result);
		});
	});
});
