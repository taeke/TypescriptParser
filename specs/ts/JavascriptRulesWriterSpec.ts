/// <reference path='./../../typings/tsd.d.ts' />
/// <reference path='./../../src/interfaces/IJavascriptRulesWriter.d.ts' />
/// <reference path='./../../src/interfaces/IAssets.d.ts' />

'use strict';

var JavascriptRulesWriter = require('./../../src/js/JavascriptRulesWriter');
var JavascriptWriterState = require(' ./../../src/js/JavascriptWriterState');

describe('JavascriptRulesWriter', () => {
	var streamMock: any;
	var javascriptRulesWriter: any;
	var assetsMock: IAssets = {
		javascript: `VariableDeclarationListNoIn
  = head:VariableDeclarationNoIn tail:(__ "," __ VariableDeclarationNoIn)* {
      var result = [head];
      for (var i = 0; i < tail.length; i++) {
        result.push(tail[i][3]);
      }
      return result;
    }

VariableDeclaration
  = name:Identifier value:(__ Initialiser)? {
      return {
        type:  "VariableDeclaration",
        name:  name,
        value: value !== null ? value[1] : null
      };
    }

VariableDeclarationNoIn
  = name:Identifier value:(__ InitialiserNoIn)? {
      return {
        type:  "VariableDeclaration",
        name:  name,
        value: value !== null ? value[1] : null
      };
    }`,
	    header: '',
		appendixA: [{
      title: "A.3 Statements",
      rules: [         {
            name: "VariableDeclaration",
            lines: [
               {
                  parts: [
                     {
                        type: "SinglePart",
                        indentifier: {
                           name: "SimpleVariableDeclaration",
                           optional: false
                        }
                     },
                     {
                        type: "SinglePart",
                        indentifier: {
                           name: "DestructuringVariableDeclaration",
                           optional: false
                        }
                     }
                  ]
               }
            ],
            modified: true
         },
         {
            name: "SimpleVariableDeclaration",
            lines: [
               {
                  parts: [
                     {
                        type: "MultipleIndentifierPart",
                        indentifiers: [
                           {
                                 name: "BindingIdentifier",
                                 optional: false
                           },
                           {
                                 name: "TypeAnnotation",
                                 optional: true
                           },
                           {
                                 name: "Initializer",
                                 optional: true
                           }
                        ]
                     }
                  ]
               }
            ],
            modified: false
         },
         {
            name: "DestructuringVariableDeclaration",
            lines: [
               {
                  parts: [
                     {
                        type: "MultipleIndentifierPart",
                        indentifiers: [
                           {
                                 name: "BindingPattern",
                                 optional: false
                           },
                           {
                                 name: "TypeAnnotation",
                                 optional: true
                           },
                           {
                                 name: "Initializer",
                                 optional: false
                           }
                        ]
                     }
                  ]
               }
            ],
            modified: false
         },
      ]
   }],
		stringConsts: null
	}
	
	beforeEach(()=>{
    streamMock = jasmine.createSpyObj('streamMock', ['write']);
		javascriptRulesWriter = new JavascriptRulesWriter(streamMock);
	});
	
	describe('write', () => {
		it('should call writeLine for every line', () => {
			// arrange
			spyOn(javascriptRulesWriter, 'writeLine');
			
			// act
			javascriptRulesWriter.write(assetsMock);
			
			// assert
      expect(javascriptRulesWriter.writeLine.calls.count()).toBe(26);
		});
    
    it('should call setModifiedRules', () => {
			// arrange
			spyOn(javascriptRulesWriter, 'setModifiedRules');
      spyOn(javascriptRulesWriter, 'writeLine');
			
			// act
			javascriptRulesWriter.write(assetsMock);
			
			// assert
      expect(javascriptRulesWriter.setModifiedRules).toHaveBeenCalled();
    });
	});
  
  describe('writeLine', () => {
    it('should call handleUnModified if grammerState is UnModified', () => {
      // arrange
			spyOn(javascriptRulesWriter, 'handleUnModified');
      
      // act
      javascriptRulesWriter.writeLine('');
      
      // assert
      expect(javascriptRulesWriter.handleUnModified).toHaveBeenCalled();
    });

    it('should call handleModified if grammerState is Modified', () => {
      // arrange
      javascriptRulesWriter.javascriptWriterState = JavascriptWriterState.Modified;
			spyOn(javascriptRulesWriter, 'handleModified');
      
      // act
      javascriptRulesWriter.writeLine('');
      
      // assert
      expect(javascriptRulesWriter.handleModified).toHaveBeenCalled();
    });
    
    it('should throw an exception if the grammerState is unknown.', () => {
      // arrange
      javascriptRulesWriter.javascriptWriterState = -1;
      
      // act and assert.
      expect(() => { javascriptRulesWriter.writeLine(''); }).toThrow(new Error('Unknown grammer state.'));
    })
  });

  describe('handleUnModified', () => {
    it('should call write on the stream if is NOT a modified rule', () =>{
      // arrange
      javascriptRulesWriter.modifiedRules = ['VariableDeclaration'];
            
      // act
      javascriptRulesWriter.handleUnModified('test line');
      
      // assert
      expect(streamMock.write).toHaveBeenCalled();
    });

    it('should NOT call write on the stream if is a modified rule', () =>{
      // arrange
      javascriptRulesWriter.modifiedRules = ['VariableDeclaration'];
            
      // act
      javascriptRulesWriter.handleUnModified('VariableDeclaration');
      
      // assert
      expect(streamMock.write).not.toHaveBeenCalled();
    });

    it('should set modified and state if it is a modified rule', () =>{
      // arrange
      javascriptRulesWriter.modifiedRules = ['VariableDeclaration'];
            
      // act
      javascriptRulesWriter.handleUnModified('VariableDeclaration');
      
      // assert
      expect(javascriptRulesWriter.modified).toBe('/*VariableDeclaration\n');
      expect(javascriptRulesWriter.javascriptWriterState).toBe(JavascriptWriterState.Modified)
    });
  });
  
  describe('handleModified', () => {
    // if it starts with a space we are still handeling the same rule.
    it('should extend modified with the line if the line starts with a space', () => {
      // arrange
      
      // act
      javascriptRulesWriter.handleModified(' test');
      
      // assert
      expect(javascriptRulesWriter.modified).toBe(' test\n');
      expect(streamMock.write).not.toHaveBeenCalled();
    });
    
    it('should write to the stream when the line does NOT start with a space', () => {
      // arrange
      
      // act
      javascriptRulesWriter.handleModified('next rule');
      
      // assert
      expect(streamMock.write.calls.count()).toBe(2);
    });
  });
  
  describe('setModifiedRules', () => {
    it('should set modified rules', () => {
      // arrange
      
      // act
      javascriptRulesWriter.setModifiedRules(assetsMock);
      
      // assert
      expect(javascriptRulesWriter.modifiedRules.length).toBe(1);
    });
  });
});