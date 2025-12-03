# 🚀 Plano Executivo - QA Solar Dashboard

## 📌 Resumo

O dashboard está em fase inicial de desenvolvimento. A estrutura de pastas foi criada, mas os componentes, serviços e rotas ainda precisam ser implementados.

---

## ⚡ Ações Imediatas (Próximas 2-4 horas)

### 1. Instalar Dependências Essenciais
```bash
cd apps/dashboard
yarn add vue-router@4 pinia
yarn add -D @types/node
```

### 2. Configurar Router (30 min)
- [ ] Criar `src/router/index.ts` com rotas básicas
- [ ] Configurar router no `main.ts`
- [ ] Criar layout principal com navegação

### 3. Configurar Pinia (20 min)
- [ ] Criar `src/stores/index.ts`
- [ ] Configurar Pinia no `main.ts`
- [ ] Criar store básico de exemplo

### 4. Implementar Results Service (1h)
- [ ] Criar tipos TypeScript para resultados
- [ ] Implementar função de leitura de JSON
- [ ] Criar parser para cada framework

### 5. Criar Componente SummaryCard (30 min)
- [ ] Componente básico funcional
- [ ] Integrar com service
- [ ] Adicionar estilos

---

## 🎯 Objetivo da Sprint Atual

**Meta:** Ter um dashboard básico funcional mostrando dados agregados dos testes.

**Entregáveis:**
1. ✅ Router configurado e funcionando
2. ✅ Service de resultados implementado
3. ✅ Store básico funcionando
4. ✅ Página Overview com cards de resumo
5. ✅ Visualização básica de dados

---

## 📋 Checklist Rápido

### Setup Inicial
- [ ] Instalar vue-router e pinia
- [ ] Configurar router
- [ ] Configurar Pinia
- [ ] Atualizar App.vue para usar router-view

### Dados
- [ ] Criar tipos TypeScript
- [ ] Implementar resultsService
- [ ] Testar leitura de arquivos JSON

### Componentes
- [ ] SummaryCard funcional
- [ ] FrameworkCard funcional
- [ ] Layout com navegação

### Páginas
- [ ] OverviewPage básica
- [ ] Roteamento funcionando

---

## 🔍 Estrutura de Arquivos a Criar/Completar

```
apps/dashboard/src/
├── router/
│   └── index.ts                    ⏳ Criar
├── stores/
│   ├── index.ts                    ⏳ Criar
│   ├── summaryStore.ts             ⏳ Implementar
│   └── frameworkStore.ts           ⏳ Implementar
├── services/
│   └── resultsService.ts           ⏳ Implementar
├── types/
│   └── results.types.ts            ⏳ Criar
├── components/
│   ├── cards/
│   │   ├── SummaryCard.vue          ⏳ Implementar
│   │   └── FrameworkCard.vue        ⏳ Implementar
│   ├── charts/
│   │   ├── PassFailDonut.vue        ⏳ Implementar
│   │   ├── TotalBarChart.vue        ⏳ Implementar
│   │   └── TrendLineChart.vue       ⏳ Implementar
│   └── tables/
│       └── TestsTable.vue           ⏳ Implementar
├── features/
│   ├── overview/
│   │   └── OverviewPage.vue         ⏳ Implementar
│   ├── frameworks/
│   │   └── FrameworkPage.vue        ⏳ Implementar
│   └── tests/
│       └── TestsListPage.vue         ⏳ Implementar
└── App.vue                          ⏳ Atualizar
```

---

## 💡 Dicas de Implementação

### Results Service
- Usar `fetch()` para ler arquivos JSON do diretório `public/qa-results/processed/`
- Criar interfaces TypeScript baseadas na estrutura dos JSONs
- Implementar tratamento de erros

### Stores
- Usar Pinia para gerenciamento de estado
- Criar actions para carregar dados
- Implementar getters para dados computados

### Componentes
- Usar Composition API do Vue 3
- Implementar loading states
- Adicionar tratamento de erros

### Charts
- Usar Chart.js (já instalado)
- Criar componentes reutilizáveis
- Adicionar opções de configuração

---

## 📊 Ordem de Implementação Recomendada

1. **Setup** → Router + Pinia
2. **Dados** → Types + Service
3. **Estado** → Stores básicos
4. **UI Base** → Layout + Cards
5. **Visualizações** → Charts + Tables
6. **Páginas** → Overview + Detalhes
7. **Polimento** → Estilos + UX

---

## 🐛 Possíveis Desafios

1. **Estrutura dos JSONs**: Verificar formato exato dos arquivos de resultado
2. **CORS**: Se servir localmente, pode precisar configurar CORS
3. **Chart.js**: Configurar corretamente com Vue 3
4. **Tipos**: Criar tipos que cubram todos os frameworks

---

## ✅ Critérios de Sucesso

- [ ] Dashboard carrega sem erros
- [ ] Dados são exibidos corretamente
- [ ] Navegação entre páginas funciona
- [ ] Gráficos renderizam corretamente
- [ ] Código sem erros de TypeScript/ESLint

---

**Próxima revisão:** Após completar ações imediatas
