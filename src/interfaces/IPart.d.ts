/// <reference path='./../../typings/tsd.d.ts' />
/// <reference path='./IIndentifier.d.ts' />

interface IPart {
    type: string; //PartType
    indentifier?: IIndentifier;
    indentifiers?: IIndentifier[];
    bracketType?: string;
    separator?: string;
    tokens: string[];
    token: string;
    fixed: string;
}