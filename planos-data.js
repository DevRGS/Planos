// Dados dos Planos - Separado para melhor performance
const PLAN_DATA = {
    food: {
        pdv: {
            name: 'Plano PDV', basePrice: 221.11, baseUsers: 2, basePdvs: 1,
            fixedModules: ['2x Usuários', '1x PDV - Frente de Caixa', '30 Notas Fiscais', 'Suporte Técnico - Via chamados', 'Relatório Básico'],
            additionalUsers: { count: 0, price: 19.90, max: 1 }, additionalPdvs: { count: 0, price: 0, max: 0 },
            optionalModules: [
                { name: 'Delivery', price: 30.00, quantifiable: false, selected: false },
                { name: 'Hub de Delivery', price: 79.00, quantifiable: false, selected: false, requires: ['Delivery'] },
                { name: 'Delivery Direto Básico', price: 99.00, quantifiable: false, selected: false, requires: ['Hub de Delivery'] },
                { name: 'Delivery Direto Profissional', price: 200.00, quantifiable: false, selected: false, requires: ['Hub de Delivery'] },
                { name: 'Delivery Direto VIP', price: 300.00, quantifiable: false, selected: false, requires: ['Hub de Delivery'] },
                { name: 'TEF', price: 99.90, quantifiable: true, count: 0 },
                { name: 'Importação de XML', price: 29.00, quantifiable: false, selected: false },
                { name: 'Autoatendimento', price: 299.00, quantifiable: true, count: 0 },
                { name: 'Contratos de cartões', price: 50.00, quantifiable: false, selected: false },
                { name: 'Ordem de Serviço', price: 40.00, quantifiable: false, selected: false },
                { name: 'Estoque em Grade', price: 40.00, quantifiable: false, selected: false },
                { name: 'Conciliação Bancária', price: 50.00, quantifiable: false, selected: false },
                { name: 'Contratos de cartões e outros', price: 50.00, quantifiable: false, selected: false },
            ]
        },
        gestao: {
            name: 'Plano Gestão', basePrice: 332.22, baseUsers: 3, basePdvs: 1,
            fixedModules: ['3x Usuários', '1x PDV - Frente de Caixa', 'Notas Fiscais Ilimitadas', 'Importação de XML', 'Painel Senha TV', 'Estoque em Grade', 'Financeiro, Estoque e Relatórios', 'Suporte Técnico - Via Chat', 'Delivery', 'Relatório KDS', 'Produção', 'Controle de Mesas'],
            additionalUsers: { count: 0, price: 19.90, max: 2 }, additionalPdvs: { count: 0, price: 59.90, max: 2 },
            optionalModules: [
                { name: 'TEF', price: 99.90, quantifiable: true, count: 0 },
                { name: 'Smart TEF', price: 49.90, quantifiable: true, count: 0 },
                { name: 'Autoatendimento', price: 299.90, quantifiable: true, count: 0 },
                { name: 'Facilita NFE', price: 99.00, quantifiable: false, selected: false },
                { name: 'Conciliação Bancária', price: 50.00, quantifiable: false, selected: false },
                { name: 'Contratos de cartões', price: 50.00, quantifiable: false, selected: false },
                { name: 'Hub de Delivery', price: 79.00, quantifiable: false, selected: false, requires: ['Delivery'] },
                { name: 'Delivery Direto Básico', price: 99.00, quantifiable: false, selected: false, requires: ['Hub de Delivery'] },
                { name: 'Delivery Direto Profissional', price: 200.00, quantifiable: false, selected: false, requires: ['Hub de Delivery'] },
                { name: 'Delivery Direto VIP', price: 300.00, quantifiable: false, selected: false, requires: ['Hub de Delivery'] },
                { name: 'Integração API', price: 199.90, quantifiable: false, selected: false },
                { name: 'Business Intelligence (BI)', price: 199.00, quantifiable: false, selected: false },
                { name: 'Backup Realtime', price: 199.00, quantifiable: false, selected: false },
                { name: 'Cardápio digital', price: 99.00, quantifiable: false, selected: false },
                { name: 'Smart Menu', price: 99.00, quantifiable: false, selected: false },
                { name: 'Ordem de Serviço', price: 20.00, quantifiable: false, selected: false },
                { name: 'App Gestão CPlug', price: 20.00, quantifiable: false, selected: false },
                { name: 'Painel Senha Mobile', price: 49.00, quantifiable: false, selected: false },
                { name: 'Promoções', price: 24.50, quantifiable: false, selected: false },
                { name: 'Marketing', price: 24.50, quantifiable: false, selected: false },
                { name: 'Relatório Dinâmico', price: 50.00, quantifiable: false, selected: false },
                { name: 'Atualização em Tempo Real', price: 49.00, quantifiable: false, selected: false },
                { name: 'Suporte Técnico - Estendido', price: 99.00, quantifiable: false, selected: false },
                { name: 'Programa de Fidelidade', price: 299.90, setupCost: 1000.00, quantifiable: false, selected: false },
            ]
        },
        performance: {
            name: 'Plano Performance', basePrice: 443.33, baseUsers: 5, basePdvs: 2,
            fixedModules: ['5x Usuários', '2x PDV - Frente de Caixa', '2x Smart TEF', 'Produção', 'Promoções', 'Notas Fiscais Ilimitadas', 'Importação de XML', 'Hub de Delivery', 'Ordem de Serviço', 'Delivery', 'App Gestão CPlug', 'Relatório KDS', 'Painel Senha TV', 'Painel Senha Mobile', 'Controle de Mesas', 'Estoque em Grade', 'Marketing', 'Relatório Básico', 'Relatório Dinâmico', 'Atualização em Tempo Real', 'Facilita NFE', 'Conciliação Bancária', 'Contratos de cartões e outros', 'Suporte Técnico Completo (Todos os canais)'],
            additionalUsers: { count: 0, price: 19.90, max: 5 }, additionalPdvs: { count: 0, price: 59.90, max: 5 },
            optionalModules: [
                { name: 'Delivery Direto Básico', price: 99.00, quantifiable: false, selected: false, requires: ['Hub de Delivery'] },
                { name: 'Delivery Direto Profissional', price: 200.00, quantifiable: false, selected: false, requires: ['Hub de Delivery'] },
                { name: 'Delivery Direto VIP', price: 300.00, quantifiable: false, selected: false, requires: ['Hub de Delivery'] },
                { name: 'TEF', price: 99.90, quantifiable: true, count: 0 },
                { name: 'Programa de Fidelidade', price: 299.00, setupCost: 1000.00, quantifiable: false, selected: false },
                { name: 'Integração TAP', price: 299.00, quantifiable: false, selected: false },
                { name: 'Integração API', price: 299.00, quantifiable: false, selected: false },
                { name: 'Business Intelligence (BI)', price: 99.00, quantifiable: false, selected: false },
                { name: 'Backup Realtime', price: 99.00, quantifiable: false, selected: false },
                { name: 'Cardápio digital', price: 99.00, quantifiable: false, selected: false },
                { name: 'Smart Menu', price: 99.00, quantifiable: false, selected: false },
                { name: 'Autoatendimento', price: 299.90, quantifiable: true, count: 0 },
            ]
        }
    },
    varejo: {
        pdv: {
            name: 'Plano PDV', basePrice: 221.11, baseUsers: 2, basePdvs: 1,
            fixedModules: ['2x Usuários', '1x PDV - Frente de Caixa', '30 Notas Fiscais', 'Suporte Técnico - Via Chamados', 'Relatório Básico'],
            additionalUsers: { count: 0, price: 19.90, max: 1 }, additionalPdvs: { count: 0, price: 0.00, max: 0 },
            optionalModules: [
                { name: 'TEF', price: 99.90, quantifiable: true, count: 0 },
                { name: 'Autoatendimento', price: 299.00, quantifiable: true, count: 0 },
                { name: 'Delivery', price: 30.00, quantifiable: false, selected: false },
                { name: 'Hub de Delivery', price: 79.00, quantifiable: false, selected: false, requires: ['Delivery'] },
                { name: 'Importação de XML', price: 29.00, quantifiable: false, selected: false },
                { name: 'Estoque em Grade', price: 40.00, quantifiable: false, selected: false },
                { name: 'Contratos de cartões e outros', price: 50.00, quantifiable: false, selected: false },
                { name: 'Ordem de Serviço', price: 40.00, quantifiable: false, selected: false },
            ]
        },
        gestao: {
            name: 'Plano Gestão', basePrice: 332.22, baseUsers: 3, basePdvs: 1,
            fixedModules: ['3x Usuários', '1x PDV - Frente de Caixa', 'Notas Fiscais Ilimitadas', 'Importação de XML', 'Estoque em Grade', 'Financeiro, Estoque e Relatórios', 'Suporte Técnico - Via Chat', 'Facilita NFE', 'Contratos de cartões e outros', 'Promoções'],
            additionalUsers: { count: 0, price: 19.90, max: 2 }, additionalPdvs: { count: 0, price: 59.90, max: 2 },
            optionalModules: [
                { name: 'Delivery', price: 30.00, quantifiable: false, selected: false },
                { name: 'Hub de Delivery', price: 79.90, quantifiable: false, selected: false, requires: ['Delivery'] },
                { name: 'Delivery Direto Básico', price: 99.00, quantifiable: false, selected: false, requires: ['Hub de Delivery'] },
                { name: 'Delivery Direto Profissional', price: 200.00, quantifiable: false, selected: false, requires: ['Hub de Delivery'] },
                { name: 'Delivery Direto VIP', price: 300.00, quantifiable: false, selected: false, requires: ['Hub de Delivery'] },
                { name: 'TEF', price: 99.90, quantifiable: true, count: 0 },
                { name: 'Smart TEF', price: 49.90, quantifiable: true, count: 0 },
                { name: 'Autoatendimento', price: 299.90, quantifiable: true, count: 0 },
                { name: 'Integração API', price: 199.90, quantifiable: false, selected: false },
                { name: 'Suporte Técnico - Estendido', price: 99.00, quantifiable: false, selected: false },
                { name: 'Conciliação Bancária', price: 50.00, quantifiable: false, selected: false },
                { name: 'Programa de Fidelidade', price: 299.90, setupCost: 1000.00, quantifiable: false, selected: false },
                { name: 'Painel Senha', price: 49.90, quantifiable: false, selected: false },
                { name: 'Relatório Dinâmico', price: 50.00, quantifiable: false, selected: false },
                { name: 'Backup Realtime', price: 199.00, quantifiable: false, selected: false },
                { name: 'Business Intelligence (BI)', price: 199.00, quantifiable: false, selected: false },
                { name: 'App Gestão CPlug', price: 20.00, quantifiable: false, selected: false },
                { name: 'Marketing', price: 24.50, quantifiable: false, selected: false },
                { name: 'Produção', price: 30.00, quantifiable: false, selected: false },
                { name: 'Ordem de Serviço', price: 20.00, quantifiable: false, selected: false },
                { name: 'Controle de Mesas', price: 49.00, quantifiable: false, selected: false },
                { name: 'Atualização em Tempo Real', price: 49.00, quantifiable: false, selected: false },
            ]
        },
        performance: {
            name: 'Plano Performance', basePrice: 443.33, baseUsers: 5, basePdvs: 2,
            fixedModules: ['5x Usuários', '2x PDV - Frente de Caixa', '2x Smart TEF', 'Produção', 'Promoções', 'Notas Fiscais Ilimitadas', 'Importação de XML', 'Ordem de Serviço', 'App Gestão CPlug', 'Painel de Senha TV', 'Painel de Senha Mobile', 'Controle de Mesas', 'Delivery','Estoque em Grade', 'Marketing', 'Relatórios, Financeiro e Estoque', 'Relatório Dinâmico', 'Atualização em Tempo Real', 'Facilita NFE', 'Conciliação Bancária', 'Contratos de cartões e outros', 'Suporte Técnico Completo (Todos os canais)'],
            additionalUsers: { count: 0, price: 19.90, max: 5 },
            additionalPdvs: { count: 0, price: 59.90, max: 5 },
            optionalModules: [
                { name: 'TEF', price: 99.90, quantifiable: true, count: 0 },
                { name: 'Smart TEF', price: 49.90, quantifiable: true, count: 0 },
                { name: 'Hub de Delivery', price: 79.90, quantifiable: false, selected: false, requires: ['Delivery'] },
                { name: 'Delivery Direto Básico', price: 99.00, quantifiable: false, selected: false, requires: ['Hub de Delivery'] },
                { name: 'Delivery Direto Profissional', price: 200.00, quantifiable: false, selected: false, requires: ['Hub de Delivery'] },
                { name: 'Delivery Direto VIP', price: 300.00, quantifiable: false, selected: false, requires: ['Hub de Delivery'] },
                { name: 'Integração API', price: 199.90, quantifiable: false, selected: false },
                { name: 'Integração TAP', price: 299.00, quantifiable: false, selected: false },
                { name: 'Backup Realtime', price: 99.00, quantifiable: false, selected: false },
                { name: 'Business Intelligence (BI)', price: 99.00, quantifiable: false, selected: false },
                { name: 'Programa de Fidelidade', price: 299.90, setupCost: 1000.00, quantifiable: false, selected: false },
                { name: 'Cardápio digital', price: 99.00, quantifiable: false, selected: false },
                { name: 'Smart Menu', price: 99.00, quantifiable: false, selected: false },
                { name: 'E-Mail Profissional', price: 19.90, quantifiable: false, selected: false },
                { name: 'Entrega fácil iFood', price: 49.90, quantifiable: false, selected: false },
                { name: 'Painel Multilojas', price: 199.90, quantifiable: false, selected: false },
                { name: 'API DD', price: 49.90, quantifiable: false, selected: false },
                { name: 'Central Telefônica', price: 399.90, setupCost: 500.00, quantifiable: false, selected: false },
            ]
        }
    },
    outros: {
        bling: {
            name: 'Plano Bling', basePrice: 277.67, baseUsers: 2, basePdvs: 1,
            fixedModules: ['1x PDV - Frente de Caixa', '2x Usuários', 'Notas Fiscais Ilimitadas', 'Relatórios', 'Suporte Técnico - Via chamados', 'Suporte Técnico - Via chat', 'Estoque em Grade'],
            additionalUsers: { count: 0, price: 19.90, max: Infinity },
            additionalPdvs: { count: 0, price: 59.90, max: Infinity },
            optionalModules: [
                { name: 'Controle de mesas e comandas', price: 49.00, quantifiable: false, selected: false },
                { name: 'Contratos de cartões e outros', price: 50.00, quantifiable: false, selected: false },
                { name: 'Suporte Técnico - Estendido', price: 99.00, quantifiable: false, selected: false },
                { name: 'Delivery', price: 30.00, quantifiable: false, selected: false },
                { name: 'TEF', price: 99.90, quantifiable: true, count: 0, max: Infinity },
                { name: 'Smart TEF', price: 49.90, quantifiable: true, count: 0, max: Infinity },
                { name: 'Autoatendimento', price: 299.90, quantifiable: true, count: 0, max: Infinity },
            ]
        },
        autoatendimento: {
            name: 'Plano Autoatendimento', basePrice: 332.50, baseUsers: 1, basePdvs: 0,
            fixedModules: ['1x Terminais Autoatendimento', '1x Usuários', 'Suporte Técnico - Via chat', 'Suporte Técnico - Via chamados', 'Suporte Técnico - Estendido', 'Contratos de cartões e outros', 'Notas Fiscais Ilimitadas', 'Relatório Básico'],
            additionalUsers: { count: 0, price: 19.90, max: Infinity },
            additionalPdvs: { count: 0, price: 0, max: 0 },
            optionalModules: [
                { name: 'Facilita NFE', price: 99.00, quantifiable: false, selected: false },
                { name: 'Importação de XML', price: 29.00, quantifiable: false, selected: false },
                { name: 'Promoções', price: 24.50, quantifiable: false, selected: false },
                { name: 'Estoque em Grade', price: 40.00, quantifiable: false, selected: false },
                { name: 'Business Intelligence (BI)', price: 199.00, quantifiable: false, selected: false },
                { name: 'Atualização em Tempo Real', price: 49.00, quantifiable: false, selected: false },
                { name: 'Autoatendimento', price: 299.90, quantifiable: true, count: 0, max: Infinity },
            ]
        }
    }
};



