/// <reference path='./../../typings/tsd.d.ts' />
import * as typescript from 'typescript';
var ts: any = require('typescript');

/*
 * Helper for compiling TypeScript in the browser. 
 * Based on : https://github.com/gavinhungry/typestring
 * Made it a pure commonjs module. So we can use browserify on it and wrote it in typescript offcourse :).
 */
class Typestring {
      public static _filename = '_typestring.ts';
	
	/**
      * Compile a string of TypeScript, return as a string of JavaScript
	*
	* @param {String} input - TypeScript to compile
	* @param {Object} [refs] - map of referenced filenames to content
	* @param {Object} [opts] - Options to TypeScript compiler
	* @param {Boolean} [semantic] - if true, throw semantic errors
	* @return {String} JavaScript output
	* @throws TypeScript compile error
	*/
      static compile(input: string, refs: string[], opts: typescript.CompilerOptions, semantic: boolean): string {
            input = (typeof input === 'string') ? input : '';
            refs = refs || [];
            opts = opts || ts.getDefaultCompilerOptions();

            // replace references with script strings
            var re = new RegExp(ts.fullTripleSlashReferencePathRegEx.source, 'gm');
            input = input.replace(re, (match, p1, p2, filename) => {
                  return refs[filename] || match;
            });

            var host = ts.createCompilerHost(opts);

            // return our input if requested, otherwise use default host method
            var getSourceFile = host.getSourceFile;
            var args = arguments;
            host.getSourceFile = (filename: string) => {
                  if (filename === this._filename) {
                        return ts.createSourceFile(filename, input, opts.target, '0');
                  }

                  return getSourceFile.apply(this, args);
            };

            // append output to a string
            var output = '';
            host.writeFile = function(filename: string, text: string) {
                  output += text;
            };

            var prog = ts.createProgram([this._filename], opts, host);

            var errs = prog.getSyntacticDiagnostics();
            if (errs.length) {
                  throw errs;
            }

            if (semantic) {
                  errs = prog.getSemanticDiagnostics();
                  if (errs.length) {
                        throw errs;
                  }
            }

            prog.emit();

            return output;
      }
}

export = Typestring;