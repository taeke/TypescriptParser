#Description
The TypeScript language description
https://github.com/Microsoft/TypeScript/blob/master/doc/TypeScript%20Language%20Specification.docx
contains an appendix with all the grammer. A lot of this grammer needs the same structure of PEGjs rules.

This folder contains a pegjs file which parses this grammer and creates a json file which will be used
to automate the creation of PEGjs rules for this grammer.

AppendixA.txt is the original raw content of the appendix of the docx file.
AppendixA.pegjs is the file for parsing this appendix.
AppendixA.json is the result of parsing this appendix in de online pegjs parser.

StringConsts.json is extra data for creating the pegjs file for typescript.   