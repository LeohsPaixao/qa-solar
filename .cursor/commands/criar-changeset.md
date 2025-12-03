# Criar Changeset

## Visão geral
Cria um changeset bem estruturado, com descrição adequada para a branch atual.

## Etapas
1. **Preparar a branch**
   - Garante que todas as alterações estejam commitadas

2. **Escrever a descrição do changeset**
   - Execute o comando `yarn changeset` para criar o changeset
   - Selecione o projeto ou pacote que foi alterado
   - Avalie as alterações para definir o nível de impacto (patch, minor, major)
   - Selecione o nível de impacto
   - Adicione uma descrição detalhada das alterações

3. **Configurar o changeset**
   - Adicione o changeset criado ao git stage
   - Commit as alterações
   - Push a branch para o remoto