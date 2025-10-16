# CPlug Budget Calculator

Aplicação web simples (HTML + Tailwind + Alpine) para montar propostas comerciais, calcular totais com desconto e gerar PDF.

## Como usar

1. Abra `index.html` no navegador (duplo clique).
2. Na tela de acesso, digite qualquer senha (campo não pode ficar vazio) e clique em Entrar.
3. Selecione um segmento e um plano.
4. Personalize módulos adicionais e opcionais.
5. Veja o resumo com Subtotal, Cortesia (se houver) e Desconto.
6. Opcional: garanta a condição especial, preencha os dados do cliente e gere a proposta em PDF.

## Regras de produto

- **Desconto padrão**: 10% automaticamente ao carregar e sempre que selecionar um plano.
- **Editar desconto**: clique em "(Editar)" para abrir o modal; informe uma senha para autorizar; limite máximo de 20%.
- **Data de Fechamento**: pré-preenchida para o dia seguinte; exibida como somente leitura; clique para abrir modal e editar com senha.
- **Dependências de módulos**: ao selecionar um módulo que depende de outro, as dependências são ativadas automaticamente (se não forem módulos fixos do plano) e ficam protegidas contra desmarcação.
- **Lead e contagem regressiva**: após confirmar dados, é gerado um cupom e iniciado um cronômetro até 23:59:59 da data de fechamento.

## Atalhos e navegação

- Setas esquerda/direita: alternam segmento.
- Setas cima/baixo: alternam plano dentro do segmento.
- Enter: alterna seleção do módulo focado.

## Estrutura de arquivos

- `index.html`: Interface, importação de CDNs e modais.
- `planos.js`: Lógica do Alpine (`quoteCalculator()`), estado, computados e métodos (ex.: `generatePDF`).

## Stack

- HTML5, Tailwind CSS (CDN), Alpine.js (CDN), jsPDF (CDN), Google Fonts (Inter).

## Observações

- PDF: o layout é gerado client-side e inclui cabeçalho e rodapé padronizados.

