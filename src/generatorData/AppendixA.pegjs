Start
  = chapters:Chapter* LineEnding* {
  return chapters
}

Chapter
  = title:ChapterHelper rules:Rule* {
  return {
    title: title,
    rules:rules
  }
}

Rule
  = name:RuleName  modified:Modified? lines:Line* {
  return {
    name:name,
    lines:lines
  }
}

Line
  = !ChapterStart head:Part tail:Part* {
  return {
     parts: tail ? [head].concat(tail) : [head]
  }
}

Part
  = part:(OneOfTheParts) !":" LineEnding? {
  return part
}

/*** Parts *****************************************************/

EnclosedPart
  = type:Brackets Space+ indentifier:Indentifier Space+ Brackets {
  return {
    type:"EnclosedPart", 
    bracketType:type,
    indentifier:indentifier
  }
}

SinglePart
  = indentifier:Indentifier !Space {
  return {
    type:"SinglePart", 
    indentifier:indentifier
  }
}

TokensIdentifierPart
  = head:Token Space* tail:Token? Space* indentifier:Indentifier {
  return {
    type:"TokenIdentifierPart",
    tokens: tail ? [head, tail] : [head],
    indentifier:indentifier
  }
}

TokenPart
  = token:Token {
  return {
    type:"TokenPart",
    token:token
  }
}


MultipleIndentifierPart
  = head:Indentifier Space* tail:MultipleIndentifierHelper+ {
  return {
    type:"MultipleIndentifierPart",
    indentifiers: [{indentifier:head}].concat(tail)
  }
}

SeparatorPart
  = head:Indentifier Space* separator:Separator Space* tail:SeparatorHelper+ {
  return {
    type:"SeparatorPart",
    separator:separator,
    indentifiers: [{indentifier:head}].concat(tail)
  }
}

FixedPart
  = fixed:
    (TypeReference
    / TypeBody
    / ArrayType
    / FunctionType
    / ConstructorType
    / PropertySignature
    / TypeAnnotation
    / CallSignature
    / OptionalParameter
    / RestParameter
    / ConstructSignature
    / IndexSignature
    / MethodSignature
    / TypeAliasDeclaration
    / PropertyDefinitionLine 
    / GetAccessor
    / SetAccessor
    / FunctionExpression
    / Arguments
    / FunctionDeclaration1
    / FunctionDeclaration2
    / InterfaceDeclaration
    / ClassDeclaration
    / ConstructorDeclaration
    / MemberVariableDeclaration
    / MemberFunctionDeclaration
    / MemberAccessorDeclaration
    / IndexMemberDeclaration
    / EnumDeclaration
    / EnumBody
    / NamespaceDeclaration
    / ImportAliasDeclaration
    / ImportRequireDeclaration
    / ExportDefaultImplementationElementLast
    / ExportDefaultDeclarationElementLast
    / ExportListDeclaration
    / ExportAssignment
    / AmbientVariableDeclaration
    / AmbientFunctionDeclaration
    / AmbientClassDeclaration
    / AmbientConstructorDeclaration
    / AmbientPropertyMemberDeclaration
    / AmbientNamespaceDeclaration
    / AmbientModuleDeclaration) {
  return {
    type:"FixedPart",
    fixed:fixed
  }
}

OneOfTheParts
  = FixedPart
    / EnclosedPart 
    / TokensIdentifierPart
    / TokenPart
    / MultipleIndentifierPart
    / SinglePart 
    / SeparatorPart 

/*** Helpers ***************************************************/

MultipleIndentifierHelper
  = indentifier:Indentifier Space* {
  return {
    indentifier:indentifier
  }
}

SeparatorHelper
  = indentifier:Indentifier Space* separator:Separator? Space* {
  return {
    indentifier:indentifier
  }
}

ChapterHelper
  = ChapterStart num:Num+ Space+ head:ChapterTitleWord tail:(ChapterTitleWord)* LineEnding? {
    return "A." + num + " " + (tail ? [head].concat(tail).join(" ") : head)
}

/*** Words *****************************************************/

ChapterTitleWord
  = indentifier:Indentifier Space* {
    return indentifier.name
}

RuleName
  = indentifier:Indentifier Colon LineEnding* {
  return indentifier.name
}

Indentifier
  = !ChapterStart name:UpperLower+ optional:OptionalToken? {
  return {
    name:name.join(""),
    optional: optional ? true: false
  }
}

/*** Fixeds *****************************************************/

TypeReference
  = "TypeName   [no LineTerminator here]   TypeArgumentsopt"

TypeBody
  = "TypeMemberList   ;opt\nTypeMemberList   ,opt"

ArrayType
  = "PrimaryType   [no LineTerminator here]   [   ]"

FunctionType
  = "TypeParametersopt   (   ParameterListopt   )   =>   Type"

ConstructorType
  = "new   TypeParametersopt   (   ParameterListopt   )   =>   Type"

PropertySignature
  = "PropertyName   ?opt   TypeAnnotationopt"

TypeAnnotation
  = ":   Type"

CallSignature
  = "TypeParametersopt   (   ParameterListopt   )   TypeAnnotationopt"

OptionalParameter
  = "AccessibilityModifieropt   BindingIdentifierOrPattern   ?   TypeAnnotationopt\n"
    "AccessibilityModifieropt   BindingIdentifierOrPattern   TypeAnnotationopt   Initializer\n"
    "BindingIdentifier   ?   :   StringLiteral"

RestParameter
  = "...   BindingIdentifier   TypeAnnotationopt"

ConstructSignature
  = "new   TypeParametersopt   (   ParameterListopt   )   TypeAnnotationopt"

IndexSignature
  = "[   BindingIdentifier   :   string   ]   TypeAnnotation\n"
    "[   BindingIdentifier   :   number   ]   TypeAnnotation"

MethodSignature
  = "PropertyName   ?opt   CallSignature"

TypeAliasDeclaration
  = "type   BindingIdentifier   TypeParametersopt   =   Type   ;"

Modified
  = Space* "( Modified )" LineEnding?

PropertyDefinitionLine
  = "PropertyName   CallSignature   {   FunctionBody   }"

GetAccessor
  = "get   PropertyName   (   )   TypeAnnotationopt   {   FunctionBody   }"

SetAccessor
  = "set   PropertyName   (   BindingIdentifierOrPattern   TypeAnnotationopt   )   {   FunctionBody   }"

FunctionExpression
  = "function   BindingIdentifieropt   CallSignature   {   FunctionBody   }"

Arguments
  = "TypeArgumentsopt   (   ArgumentListopt   )\n"
    "UnaryExpression:  ( Modified )\n"
    "…\n"
    "<   Type   >   UnaryExpression"

FunctionDeclaration1
  = "function   BindingIdentifieropt   CallSignature   {   FunctionBody   }"

FunctionDeclaration2
  = "function   BindingIdentifieropt   CallSignature   ;"

InterfaceDeclaration
  = "interface   BindingIdentifier   TypeParametersopt   InterfaceExtendsClauseopt   ObjectType"

ClassDeclaration
  = "class   BindingIdentifieropt   TypeParametersopt   ClassHeritage   {   ClassBody   }"

ConstructorDeclaration
  = "AccessibilityModifieropt   constructor   (   ParameterListopt   )   {   FunctionBody   }\n"
    "AccessibilityModifieropt   constructor   (   ParameterListopt   )   ;"

MemberVariableDeclaration
  = "AccessibilityModifieropt   staticopt   PropertyName   TypeAnnotationopt   Initializeropt   ;"

MemberFunctionDeclaration
  = "AccessibilityModifieropt   staticopt   PropertyName   CallSignature   {   FunctionBody   }\n"
    "AccessibilityModifieropt   staticopt   PropertyName   CallSignature   ;"

MemberAccessorDeclaration
  = "AccessibilityModifieropt   staticopt   GetAccessor\n"
    "AccessibilityModifieropt   staticopt   SetAccessor"

IndexMemberDeclaration
  = "IndexSignature   ;"

EnumDeclaration
  = "constopt   enum   BindingIdentifier   {   EnumBodyopt   }"

EnumBody
  = "EnumMemberList   ,opt"

NamespaceDeclaration
  = "namespace   IdentifierPath   {   NamespaceBody   }"

ImportAliasDeclaration
  = "import   BindingIdentifier   =   EntityName   ;"

ImportRequireDeclaration
  = "import   BindingIdentifier   =   require   (   StringLiteral   )   ;"

ExportDefaultImplementationElementLast
  = "export   default   AssignmentExpression   ;"

ExportDefaultDeclarationElementLast
  = "export   default   IdentifierReference   ;"

ExportListDeclaration
  = "export   *   FromClause   ;\n"
    "export   ExportClause   FromClause   ;\n"
    "export   ExportClause   ;"

ExportAssignment
  = "export   =   IdentifierReference   ;"

AmbientVariableDeclaration
  = "var   AmbientBindingList   ;\n"
    "let   AmbientBindingList   ;\n"
    "const   AmbientBindingList   ;"

AmbientFunctionDeclaration
  = "function   BindingIdentifier   CallSignature   ;"

AmbientClassDeclaration
  = "class   BindingIdentifier   TypeParametersopt   ClassHeritage   {   AmbientClassBody   }"

AmbientConstructorDeclaration
  = "constructor   (   ParameterListopt   )   ;"

AmbientPropertyMemberDeclaration
  = "AccessibilityModifieropt   staticopt   PropertyName   TypeAnnotationopt   ;\n"
    "AccessibilityModifieropt   staticopt   PropertyName   CallSignature   ;"

AmbientNamespaceDeclaration
  = "namespace   IdentifierPath   {   AmbientNamespaceBody   }"

AmbientModuleDeclaration
  = "declare   module   StringLiteral   {    DeclarationModule   }"

/*** Tokens *****************************************************/

Token
  = OptionalToken
    / ExtendsToken
    / AnyToken
    / NumberToken
    / BooleanToken
    / StringToken
    / SymbolToken
    / VoidToken
    / TypeofToken
    / PublicToken
    / PrivateToken
    / ProtectedToken
    / TriplePointToken
    / ImplementsToken
    / ExportToken
    / DefaultToken
    / DeclareToken

OptionalToken
  = "opt"

ExtendsToken
  = "extends"

AnyToken
  = "any"

NumberToken
  = "number"

BooleanToken
  = "boolean"

StringToken
  = "string"

SymbolToken
  = "symbol"

VoidToken
  = "void"

TypeofToken
  = "typeof"

PublicToken
  = "public"

PrivateToken
  = "private"

ProtectedToken
  = "protected"

TriplePointToken
  = "…"

ImplementsToken
  = "implements"

ExportToken
  = "export"

DefaultToken
  = "default"

DeclareToken
  = "declare"

/*** Single characters ******************************************/

Separator
  = Comma / Point / Semicolon / VerticalBar / Ampersand / Colon / EqualSign

Brackets
  = AngleBrackets / Parenthesis / CurlyBrackets / SquareBrackets

LineEnding
  = "\n"

AllChar
  = !LineEnding char:. {
  return char;
}

ChapterStart
  = "A."

Space
  = " "/ "\t"

Colon
  = ":"

Semicolon
  = ";"

Comma
  = ","

Point
  = "."

VerticalBar
  = "|"

Ampersand
  = "&"

Num
  = [0-9]

EqualSign
  = "="

AngleBrackets
  = "<" / ">"

Parenthesis
  = "(" / ")"

CurlyBrackets
  = "{" / "}"

SquareBrackets
  = "[" / "]"

UpperLower
  = !(OptionalToken (LineEnding/Space/Colon)) char:[a-zA-Z] {
  return char
}