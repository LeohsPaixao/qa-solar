#!/usr/bin/env tsx
import fs from 'fs-extra';
import path from 'path';
import { defaultConfig } from '../src/core/config';
import { normalize } from '../src/core/normalizer';
import { saveProcessedFile } from '../src/core/saver';
import { scanRawDirectory } from '../src/core/scanner';
import { getLoaderFor } from '../src/loaders';
import { getParserFor } from '../src/parsers';

/**
 * Script de teste detalhado para debug
 */
async function testDebug() {
  console.log('🔍 Teste de Debug do Preprocessor\n');

  try {
    const config = defaultConfig;
    
    console.log('📁 Configuração:');
    console.log(`   Raw Dir: ${config.rawDir}`);
    console.log(`   Processed Dir: ${config.processedDir}`);
    console.log(`   Raw Dir existe: ${await fs.pathExists(config.rawDir)}`);
    console.log(`   Processed Dir existe: ${await fs.pathExists(config.processedDir)}\n`);

    // Testa o scanner
    console.log('🔎 Testando Scanner...');
    const rawFiles = await scanRawDirectory(config.rawDir);
    console.log(`   Arquivos encontrados: ${rawFiles.length}\n`);

    if (rawFiles.length === 0) {
      console.log('⚠️  Nenhum arquivo raw encontrado!');
      return;
    }

    // Mostra os arquivos encontrados
    console.log('📋 Arquivos raw encontrados:');
    for (const rawFile of rawFiles.slice(0, 3)) { // Mostra apenas os 3 primeiros
      console.log(`   - ${rawFile.framework} (${rawFile.timestamp})`);
      console.log(`     Path: ${rawFile.path}`);
      console.log(`     BaseDir: ${rawFile.baseDir}\n`);
    }

    // Testa com o primeiro arquivo Cypress
    const cypressFile = rawFiles.find(f => f.framework === 'cypress-e2e' || f.framework === 'cypress-ct');
    
    if (!cypressFile) {
      console.log('⚠️  Nenhum arquivo Cypress encontrado para teste!');
      return;
    }

    console.log(`\n🧪 Testando com arquivo: ${cypressFile.framework} (${cypressFile.timestamp})\n`);

    // Testa o loader
    console.log('📥 Testando Loader...');
    const loader = getLoaderFor(cypressFile);
    const content = await loader.load(cypressFile);
    console.log(`   ✅ Conteúdo carregado: ${typeof content === 'object' ? 'object' : typeof content}`);
    if (typeof content === 'object' && content !== null) {
      const data = content as { stats?: unknown; results?: unknown };
      console.log(`   Stats: ${data.stats ? 'presente' : 'ausente'}`);
      console.log(`   Results: ${Array.isArray(data.results) ? `array com ${data.results.length} items` : 'não é array'}\n`);
    }

    // Testa o parser
    console.log('🔨 Testando Parser...');
    const parser = getParserFor(cypressFile);
    const parsed = parser.parse(content, cypressFile);
    console.log(`   ✅ Framework: ${parsed.framework}`);
    console.log(`   ✅ Timestamp: ${parsed.timestamp}`);
    console.log(`   ✅ Testes extraídos: ${parsed.tests.length}\n`);

    if (parsed.tests.length > 0) {
      const firstTest = parsed.tests[0] as { id?: string; name?: string; status?: string };
      console.log(`   📝 Primeiro teste:`);
      console.log(`      ID: ${firstTest.id}`);
      console.log(`      Nome: ${firstTest.name}`);
      console.log(`      Status: ${firstTest.status}\n`);
    }

    // Testa o normalizer
    console.log('🔄 Testando Normalizer...');
    const normalized = normalize(parsed);
    console.log(`   ✅ Summary:`);
    console.log(`      Total: ${normalized.summary.total}`);
    console.log(`      Passed: ${normalized.summary.passed}`);
    console.log(`      Failed: ${normalized.summary.failed}`);
    console.log(`      Skipped: ${normalized.summary.skipped}`);
    console.log(`      Duração: ${normalized.summary.duration_s.toFixed(2)}s`);
    console.log(`      Testes: ${normalized.tests.length}\n`);

    // Testa o saver
    console.log('💾 Testando Saver...');
    await saveProcessedFile(normalized, config);
    console.log(`   ✅ Arquivo salvo!\n`);

    // Verifica se o arquivo foi criado
    const expectedPath = path.join(config.processedDir, normalized.timestamp, `${normalized.framework}.json`);
    if (await fs.pathExists(expectedPath)) {
      console.log(`✅ Arquivo criado com sucesso em: ${expectedPath}`);
      
      // Lê e valida o arquivo
      const savedContent = await fs.readJSON(expectedPath);
      console.log(`\n📄 Conteúdo do arquivo salvo:`);
      console.log(`   Framework: ${savedContent.framework}`);
      console.log(`   Timestamp: ${savedContent.timestamp}`);
      console.log(`   Total: ${savedContent.summary.total}`);
      console.log(`   Testes: ${savedContent.tests.length}`);
      
      if (savedContent.tests.length > 0) {
        const firstSavedTest = savedContent.tests[0];
        console.log(`\n   📝 Primeiro teste salvo:`);
        console.log(`      ID: ${firstSavedTest.id}`);
        console.log(`      Nome: ${firstSavedTest.name}`);
        console.log(`      Status: ${firstSavedTest.status}`);
        console.log(`      Arquivo: ${firstSavedTest.file}`);
        console.log(`      Duração: ${firstSavedTest.duration_s}s`);
      }
    } else {
      console.log(`❌ Arquivo não foi criado em: ${expectedPath}`);
    }

    console.log('\n🎉 Teste concluído!');

  } catch (error) {
    console.error('\n❌ Erro durante o teste:', error);
    if (error instanceof Error) {
      console.error('Mensagem:', error.message);
      console.error('Stack:', error.stack);
    }
    process.exit(1);
  }
}

testDebug();

