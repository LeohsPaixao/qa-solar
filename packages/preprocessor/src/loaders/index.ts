import { Loader, RawFile } from '../types';
import { loadCypress } from './loadCypress';
// Importar outros loaders conforme forem implementados
// import { loadJest } from './loadJest';
// import { loadPlaywright } from './loadPlaywright';
// import { loadRobot } from './loadRobot';
// import { loadSelenium } from './loadSelenium';
// import { loadVitest } from './loadVitest';

/**
 * Lista de todos os loaders disponíveis
 */
const loaders: Loader[] = [
  loadCypress,
  // Adicionar outros loaders conforme forem implementados
];

/**
 * Get the loader for the given file
 * @param file - the file to get the loader for
 * @returns the loader
 */
export function getLoaderFor(file: RawFile): Loader {
  const loader = loaders.find(l => l.canLoad(file));
  
  if (!loader) {
    throw new Error(`No loader found for framework: ${file.framework}`);
  }
  
  return loader;
}