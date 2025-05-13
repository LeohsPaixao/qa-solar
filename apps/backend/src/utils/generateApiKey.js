import crypto from 'crypto';

/**
 * Gera uma chave API profissional seguindo o padrão: sk_live_XXXXX_XXXXX_XXXXX
 * @returns {string} A chave API gerada no formato sk_live_XXXXX_XXXXX_XXXXX
 */
export function generateApiKey() {
  // Gera 3 blocos de 5 caracteres cada
  const block1 = crypto.randomBytes(3).toString('hex').toUpperCase();
  const block2 = crypto.randomBytes(3).toString('hex').toUpperCase();
  const block3 = crypto.randomBytes(3).toString('hex').toUpperCase();

  // Monta a API Key no formato: sk_live_XXXXX_XXXXX_XXXXX
  return `sk_live_${block1}_${block2}_${block3}`;
}