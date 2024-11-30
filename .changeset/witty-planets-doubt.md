---
"backend": major
---

feat: migra o projeto de JavaScript para TypeScript

BREAKING CHANGE: 

### O que mudou:
- Todo o código do backend foi reescrito de JavaScript para TypeScript.
- Foram adicionados tipos para garantir maior segurança e previsibilidade no código.
- Algumas estruturas e middlewares foram refatorados para aderir às melhores práticas do TypeScript.

### Por que a mudança foi feita:
- Para melhorar a qualidade do código e reduzir erros em tempo de execução.
- Para facilitar a manutenção do projeto e a escalabilidade futura.
- Para alinhar o projeto com padrões modernos de desenvolvimento.

### Como atualizar seu código:
1. Certifique-se de ter o TypeScript instalado no seu ambiente de desenvolvimento.
2. Atualize os comandos de execução do projeto para usar `ts-node` ou compile os arquivos com `tsc`.
3. Verifique suas integrações externas para ajustar chamadas e tipos, se necessário.
4. Revise os exemplos no `README.md` (se aplicável) para garantir compatibilidade com o novo código.
