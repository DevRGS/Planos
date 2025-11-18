# Calculadora de Orçamento CPlug

Aplicação web moderna para montar propostas comerciais, calcular totais com desconto, gerenciar cortesias e gerar PDFs profissionais. Interface clean e responsiva desenvolvida com HTML, CSS customizado e Alpine.js.

## 🚀 Funcionalidades

### Seleção de Planos
- **Segmentos**: Food Service, Varejo e Outros
- **Planos**: PDV, Gestão, Performance, Bling e Autoatendimento
- **Interface moderna**: Cards com hover effects, gradientes e animações suaves
- **Navegação por teclado**: Setas para alternar entre segmentos e planos

### Personalização de Módulos
- **Módulos Adicionais**: Usuários e PDVs adicionais com limites configuráveis
- **Módulos Opcionais**: Lista completa de módulos com busca em tempo real
- **Dependências Automáticas**: Módulos dependentes são ativados automaticamente
- **Cortesia**: Sistema de cortesia para módulos até R$ 50,00

### Sistema de Descontos
- **Desconto Padrão**: 10% automaticamente aplicado
- **Edição de Desconto**: Modal protegido por senha
- **Limite de Desconto**: 
  - Máximo de 20% sem autorização
  - Com cortesia selecionada: desconto máximo de 20% sem autorização
  - Acima de 20%: requer código especial do gerente
- **Cálculo Flexível**: Permite definir desconto por porcentagem ou valor final
- **Validação Inteligente**: Bloqueia desconto acima de 20% quando há cortesia

### Geração de PDF
- **Proposta Completa**: Dados do cliente, resumo financeiro, módulos inclusos
- **Equipamentos Homologados**: Lista completa de equipamentos recomendados
- **Informações de Treinamento**: Tabela de agendamentos por faixa de valor
- **Layout Profissional**: Cabeçalho com logo, rodapé padronizado e design moderno
- **Suporte Especial**: Página adicional para Plano Bling com informações de integração

### Interface Moderna
- **Design Clean**: Gradientes, sombras suaves, bordas arredondadas
- **Responsivo**: Adaptável para mobile, tablet e desktop
- **Animações**: Transições suaves em hover e interações
- **Feedback Visual**: Popups de sucesso, validações em tempo real

## 📁 Estrutura de Arquivos

```
Planos/
├── index.html              # Interface principal da calculadora
├── Equipamentos.html       # Página de equipamentos homologados
├── planos.js               # Lógica principal (Alpine.js)
├── planos-data.js          # Dados dos planos e módulos
├── style.css               # Estilos customizados (sem dependências externas)
└── README.md               # Documentação do projeto
```

## 🛠️ Stack Tecnológica

- **HTML5**: Estrutura semântica
- **CSS3**: Estilos customizados completos (sem Tailwind CDN)
- **Alpine.js**: Framework JavaScript reativo (CDN)
- **jsPDF**: Geração de PDFs client-side (CDN)
- **Google Fonts**: Fonte Inter (fallback para system fonts)

## 🎨 Design

### Características Visuais
- **Cores**: Paleta azul corporativa com gradientes
- **Tipografia**: Inter com fallback para fontes do sistema
- **Espaçamento**: Sistema consistente de espaçamentos
- **Componentes**: Cards, modais, inputs e botões com design moderno
- **Estados**: Hover, focus, selected com feedback visual claro

### Responsividade
- **Mobile First**: Design otimizado para telas pequenas
- **Breakpoints**: sm (640px), md (768px), lg (1024px)
- **Grid Adaptativo**: Layout que se ajusta automaticamente

## 📖 Como Usar

### Acesso Inicial
1. Abra `index.html` no navegador
2. Na tela de acesso, digite qualquer senha (campo não pode ficar vazio)
3. Clique em "Entrar"

### Criar Orçamento
1. **Selecione o Segmento**: Food Service, Varejo ou Outros
2. **Escolha o Plano**: PDV, Gestão ou Performance
3. **Personalize Módulos**: 
   - Adicione usuários e PDVs adicionais
   - Selecione módulos opcionais
   - Use a busca para encontrar módulos rapidamente
4. **Configure Desconto e Cortesia**:
   - Clique em "(Editar)" ao lado do desconto
   - Informe a senha para autorizar
   - Defina desconto por porcentagem ou valor final
   - Selecione cortesia (se disponível)
5. **Visualize o Resumo**: Veja subtotal, cortesia, desconto e total final

### Gerar Proposta
1. Clique em "Garantir Condição Especial" (quando houver desconto)
2. Preencha os dados do cliente:
   - Nome (obrigatório)
   - CPF (obrigatório)
   - CNPJ (opcional)
   - Observações (opcional)
3. Clique em "Confirmar Dados e Gerar Cupom"
4. Clique em "Gerar Proposta em PDF"

## ⌨️ Atalhos de Teclado

- **← →**: Alternar entre segmentos
- **↑ ↓**: Alternar entre planos no segmento atual
- **Enter**: Selecionar módulo focado
- **Escape**: Fechar modais

## 🔐 Regras de Negócio

### Desconto
- **Padrão**: 10% aplicado automaticamente
- **Máximo sem autorização**: 20%
- **Com cortesia**: Máximo de 20% sem autorização
- **Acima de 20%**: Requer código especial do gerente
- **Edição**: Protegida por senha

### Cortesia
- **Elegibilidade**: Módulos opcionais até R$ 50,00
- **Limite**: Apenas 1 módulo por orçamento
- **Impacto no desconto**: Com cortesia, desconto máximo de 20% sem autorização

### Dependências de Módulos
- **Ativação Automática**: Dependências são ativadas ao selecionar módulo principal
- **Proteção**: Módulos dependentes não podem ser desmarcados enquanto o módulo principal estiver ativo
- **Módulos Fixos**: Dependências já inclusas no plano não são duplicadas

### Data de Fechamento
- **Padrão**: Próximo dia útil
- **Edição**: Protegida por senha
- **Uso**: Define validade do cupom gerado

### Lead e Cupom
- **Geração**: Após preencher dados do cliente
- **Formato**: 3 primeiras letras do nome + 4 últimos dígitos do CPF
- **Validade**: Até 23:59:59 da data de fechamento
- **Contagem Regressiva**: Exibida em tempo real

## 📄 PDF Gerado

O PDF inclui:
1. **Capa**: Dados do cliente e código do cupom
2. **Resumo Financeiro**: Plano, valores, desconto e total
3. **Módulos Inclusos**: Lista completa de módulos fixos e opcionais
4. **Informações de Treinamento**: Tabela de agendamentos por faixa
5. **Equipamentos Homologados**: Lista completa de equipamentos recomendados
6. **Informações Especiais**: Página adicional para Plano Bling (se aplicável)

## 🎯 Melhorias Implementadas

- ✅ Design moderno e clean
- ✅ CSS customizado completo (sem dependências externas)
- ✅ Sistema de cortesia integrado
- ✅ Validação de desconto com cortesia
- ✅ Popups de sucesso para ações importantes
- ✅ Interface responsiva e acessível
- ✅ Navegação por teclado
- ✅ Busca em tempo real de módulos
- ✅ Cálculo flexível de desconto (porcentagem ou valor final)

## 📝 Observações

- **Offline**: O projeto funciona completamente offline (exceto CDNs de Alpine.js e jsPDF)
- **Navegadores**: Compatível com navegadores modernos (Chrome, Firefox, Safari, Edge)
- **Performance**: Otimizado para carregamento rápido e interações fluidas
- **Manutenção**: Código organizado e comentado para fácil manutenção

## 📄 Licença

Ver arquivo `LICENSE` para mais informações.
