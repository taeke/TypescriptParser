/// <reference path='./IRuleWriter.d.ts' />

interface IChapterWriter {
	write: () => void;
	ruleWriter: IRuleWriter;
}