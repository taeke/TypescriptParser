'use strict';

class StringHelper {

	/*
	* StringHelper.format('{0} for the {1} function. {0} if i can use a string twice.', 'Test', 'format');
	*/
	static format(str: string): string {
		var formatted = str;
		for (var i = 0; i < arguments.length; i++) {
			formatted = formatted.replace(new RegExp('\\{'+i+'\\}', 'g'), arguments[i + 1]);
		}
		
		return formatted;
	}
}

export = StringHelper;