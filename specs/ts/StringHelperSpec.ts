/// <reference path='./../../typings/tsd.d.ts' />
'use strict';

var StringHelper = require('./../../src/js/StringHelper');

describe('StringHelper', () => {
	describe('format', () => {
		it('Should format the string.', () =>{
			// arrange
			
			// act
			var result = StringHelper.format('{0} for the {1} function. {0} if i can use a string twice.', 'Test', 'format');
			
			// assert
			expect(result).toBe('Test for the format function. Test if i can use a string twice.');
		})
	});	
});