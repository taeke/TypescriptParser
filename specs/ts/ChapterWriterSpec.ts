/// <reference path='./../../typings/tsd.d.ts' />
/// <reference path='./../../src/interfaces/IChapterWriter.d.ts' />
'use strict';

var ChapterWriter = require('./../../src/js/ChapterWriter');

describe('ChapterWriter', () => {
	var streamMock = jasmine.createSpyObj('streamMock', ['write']);
	var chapterWriter: IChapterWriter;
	
	beforeEach(()=>{
		chapterWriter = new ChapterWriter(streamMock);
	});
	
	describe('write', () => {
		it('should call write on the stream for all chapters.', () => {
			// arrange
			spyOn(chapterWriter.ruleWriter, 'write'); 
			
			// act
			chapterWriter.write();
			
			// assert
			expect(streamMock.write.calls.count()).toBe(10);
		});

		it('should call write on the ruleWriter for all the rules.', () => {
			// arrange
			var count = 0;
			spyOn(chapterWriter.ruleWriter, 'write').and.callFake(() => { count++; }); 
			
			// act
			chapterWriter.write();
			
			// assert
			expect(count).toBe(130);
		});
	});
});