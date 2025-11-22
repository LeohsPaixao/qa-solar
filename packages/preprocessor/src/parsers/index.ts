import { Parser, RawFile } from '../types';
import { cypressParser } from './cypressParser';
import { playwrightParser } from './playwrightParser';
import { vitestParser } from './vitestParser';
// Importar outros parsers conforme forem implementados
// import { jestParser } from './jestParser';
// import { robotParser } from './robotParser';
// import { seleniumParser } from './seleniumParser';

/**
 * Lista de todos os parsers disponíveis
 */
const parsers: Parser[] = [
  cypressParser,
  playwrightParser,
  vitestParser,
  // Adicionar outros parsers conforme forem implementados
];

/**
 * Get the parser for the given file
 * @param file - the file to get the parser for
 * @returns the parser
 */
export function getParserFor(file: RawFile): Parser {
  const parser = parsers.find(p => p.canParse(file));
  
  if (!parser) {
    throw new Error(`No parser found for framework: ${file.framework}`);
  }
  
  return parser;
}