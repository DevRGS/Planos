function quoteCalculator() {
    return {
        // --- Properties ---
        loggedIn: false, password: '', loginError: false, selectedSegment: 'food', selectedPlanKey: null, closingDate: (() => { const d = new Date(); d.setDate(d.getDate() + 1); return d.toISOString().split('T')[0]; })(), searchQuery: '', activeModuleIndex: -1,
        showDiscountModal: false, isDiscountAuthorized: false, discountPassword: '', discountPasswordError: false, 
        // Proteção da Data de Fechamento
        showClosingDateModal: false, isClosingDateAuthorized: false, closingDatePassword: '', closingDatePasswordError: false, tempClosingDate: '',
        manualDiscountPercentage: 10, tempDiscountPercentage: 10, tempFinalValue: null, discountRuleError: '',
        // Código especial para desconto acima de 20%
        showSpecialCodeModal: false, specialCode: '', specialCodeError: false,
        courtesyModuleName: null,
        showLeadForm: false, leadCaptureSuccess: false, clientName: '', clientCPF: '', clientCNPJ: '', clientObservation: '', leadFormError: '',
        generatedCouponCode: '', annualSavings: 0, countdownTimer: null, countdownText: '',
        selectedYears: 1,
        showPdfSuccess: false,
        showDiscountSuccess: false,

        noDiscountModules: new Set([
    // Defina aqui módulos que você não quer que recebam desconto
        ]),

        planData: typeof PLAN_DATA !== 'undefined' ? PLAN_DATA : (() => {
            // Fallback data se PLAN_DATA não estiver disponível
            return {
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
                        { name: 'Ordem de Serviço', price: 20.00, quantifiable: false, selected: false },
                        { name: 'Estoque em Grade', price: 40.00, quantifiable: false, selected: false },
                        { name: 'Conciliação Bancária', price: 50.00, quantifiable: false, selected: false },
                        { name: 'Contratos de cartões e outros', price: 50.00, quantifiable: false, selected: false },
                    ]
                },
                gestao: {
                    name: 'Plano Gestão', basePrice: 332.22, baseUsers: 3, basePdvs: 1, // Alterado basePdvs para 1
                    fixedModules: ['3x Usuários', '1x PDV - Frente de Caixa', 'Notas Fiscais Ilimitadas', 'Importação de XML', 'Painel Senha TV', 'Estoque em Grade', 'Financeiro, Estoque e Relatórios', 'Suporte Técnico - Via Chat', 'Delivery', 'Relatório KDS', 'Produção', 'Controle de Mesas'], // Alterado para 1x PDV
                    additionalUsers: { count: 0, price: 19.90, max: 2 }, additionalPdvs: { count: 0, price: 59.90, max: 2 }, // Alterado max para 2
                    optionalModules: [
                        { name: 'Facilita NFE', price: 99.00, quantifiable: false, selected: false }, 
                        { name: 'Conciliação Bancária', price: 50.00, quantifiable: false, selected: false },
                        { name: 'Contratos de cartões', price: 50.00, quantifiable: false, selected: false }, 
                        // O módulo 'Delivery' já está fixo neste plano, a dependência funcionará naturalmente.
                        { name: 'Hub de Delivery', price: 79.90, quantifiable: false, selected: false, requires: ['Delivery'] },
                        { name: 'Delivery Direto Básico', price: 99.00, quantifiable: false, selected: false, requires: ['Hub de Delivery'] },
                        { name: 'Delivery Direto Profissional', price: 200.00, quantifiable: false, selected: false, requires: ['Hub de Delivery'] },
                        { name: 'Delivery Direto VIP', price: 300.00, quantifiable: false, selected: false, requires: ['Hub de Delivery'] },
                        { name: 'TEF', price: 99.90, quantifiable: true, count: 0 }, 
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
                        { name: 'Smart TEF', price: 49.90, quantifiable: true, count: 0 }, 
                        { name: 'Autoatendimento', price: 299.00, quantifiable: true, count: 0 },
                        { name: 'Suporte Técnico - Estendido', price: 99.00, quantifiable: false, selected: false },
                        { name: 'Programa de Fidelidade', price: 299.90, setupCost: 1000.00, quantifiable: false, selected: false },
                    ]
                },
                performance: {
                    name: 'Plano Performance', basePrice: 443.33, baseUsers: 5, basePdvs: 2,
                    fixedModules: ['5x Usuários', '2x PDV - Frente de Caixa', '3x Smart TEF', 'Produção', 'Promoções', 'Notas Fiscais Ilimitadas', 'Importação de XML', 'Hub de Delivery', 'Ordem de Serviço', 'Delivery', 'App Gestão CPlug', 'Relatório KDS', 'Painel Senha TV', 'Painel Senha Mobile', 'Controle de Mesas', 'Estoque em Grade', 'Marketing', 'Relatório Básico', 'Relatório Dinâmico', 'Atualização em Tempo Real', 'Facilita NFE', 'Conciliação Bancária', 'Contratos de cartões e outros', 'Suporte Técnico Completo (Todos os canais)'],
                    additionalUsers: { count: 0, price: 19.90, max: 5 }, additionalPdvs: { count: 0, price: 59.90, max: 5 },
                    optionalModules: [
                        // Os módulos 'Delivery' e 'Hub de Delivery' já estão fixos neste plano.
                        { name: 'Delivery Direto Básico', price: 99.00, quantifiable: false, selected: false, requires: ['Hub de Delivery'] }, 
                        { name: 'Delivery Direto Profissional', price: 200.00, quantifiable: false, selected: false, requires: ['Hub de Delivery'] },
                        { name: 'Delivery Direto VIP', price: 300.00, quantifiable: false, selected: false, requires: ['Hub de Delivery'] },
                        { name: 'TEF', price: 99.90, quantifiable: true, count: 0 }, { name: 'Programa de Fidelidade', price: 299.90, setupCost: 1000.00, quantifiable: false, selected: false },
                        { name: 'Integração TAP', price: 299.00, quantifiable: false, selected: false }, { name: 'Integração API', price: 199.90, quantifiable: false, selected: false },
                        { name: 'Business Intelligence (BI)', price: 99.00, quantifiable: false, selected: false }, { name: 'Backup Realtime', price: 99.00, quantifiable: false, selected: false },
                        { name: 'Cardápio digital', price: 99.00, quantifiable: false, selected: false }, { name: 'Smart Menu', price: 99.00, quantifiable: false, selected: false },
                        { name: 'Autoatendimento', price: 299.00, quantifiable: true, count: 0 },
                    ]
                }
            },
            varejo: {
                 pdv: {
                    name: 'Plano PDV', basePrice: 221.11, baseUsers: 2, basePdvs: 1,
                    fixedModules: ['2x Usuários', '1x PDV - Frente de Caixa', '30 Notas Fiscais', 'Suporte Técnico - Via Chamados', 'Relatório Básico'],
                    additionalUsers: { count: 0, price: 19.90, max: 1 }, additionalPdvs: { count: 0, price: 0.00, max: 0 },
                    optionalModules: [
                        // Adicionando módulos de delivery para a lógica de dependência funcionar
                        { name: 'Delivery', price: 30.00, quantifiable: false, selected: false },
                        { name: 'Hub de Delivery', price: 79.00, quantifiable: false, selected: false, requires: ['Delivery'] },
                        { name: 'TEF', price: 99.90, quantifiable: true, count: 0 }, { name: 'Importação de XML', price: 29.00, quantifiable: false, selected: false },
                        { name: 'Estoque em Grade', price: 40.00, quantifiable: false, selected: false }, { name: 'Conciliação Bancária', price: 50.00, quantifiable: false, selected: false },
                        { name: 'Contratos de cartões e outros', price: 50.00, quantifiable: false, selected: false }, { name: 'Ordem de Serviço', price: 20.00, quantifiable: false, selected: false },
                        { name: 'Autoatendimento', price: 299.00, quantifiable: true, count: 0 },
                    ]
                },
                gestao: {
                    name: 'Plano Gestão', basePrice: 332.22, baseUsers: 3, basePdvs: 1, // Alterado basePdvs para 1
                    fixedModules: ['3x Usuários', '1x PDV - Frente de Caixa', 'Notas Fiscais Ilimitadas', 'Importação de XML', 'Estoque em Grade', 'Financeiro, Estoque e Relatórios', 'Suporte Técnico - Via Chat', 'Facilita NFE', 'Contratos de cartões e outros', 'Promoções'], // Alterado para 1x PDV
                    additionalUsers: { count: 0, price: 19.90, max: 2 }, additionalPdvs: { count: 0, price: 59.90, max: 2 }, // Alterado max para 2
                    optionalModules: [
                        { name: 'Delivery', price: 30.00, quantifiable: false, selected: false },
                        { name: 'Hub de Delivery', price: 79.90, quantifiable: false, selected: false, requires: ['Delivery'] },
                        { name: 'Delivery Direto Básico', price: 99.00, quantifiable: false, selected: false, requires: ['Hub de Delivery'] },
                        { name: 'Delivery Direto Profissional', price: 200.00, quantifiable: false, selected: false, requires: ['Hub de Delivery'] }, 
                        { name: 'Delivery Direto VIP', price: 300.00, quantifiable: false, selected: false, requires: ['Hub de Delivery'] },
                        { name: 'TEF', price: 99.90, quantifiable: true, count: 0 }, 
                        { name: 'Smart TEF', price: 49.90, quantifiable: true, count: 0 },
                        { name: 'Autoatendimento', price: 299.00, quantifiable: true, count: 0 },
                        { name: 'Integração API', price: 199.90, quantifiable: false, selected: false },
                        { name: 'Suporte Técnico - Estendido', price: 99.00, quantifiable: false, selected: false }, 
                        { name: 'Conciliação Bancária', price: 50.00, quantifiable: false, selected: false },
                        { name: 'Programa de Fidelidade', price: 299.90, setupCost: 1000.00, quantifiable: false, selected: false },
                        { name: 'Painel Senha', price: 49.00, quantifiable: false, selected: false }, 
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
                    fixedModules: ['5x Usuários', '2x PDV - Frente de Caixa', '3x Smart TEF', 'Produção', 'Promoções', 'Notas Fiscais Ilimitadas', 'Importação de XML', 'Ordem de Serviço', 'App Gestão CPlug', 'Painel de Senha TV', 'Painel de Senha Mobile', 'Controle de Mesas', 'Delivery','Estoque em Grade', 'Marketing', 'Relatórios, Financeiro e Estoque', 'Relatório Dinâmico', 'Atualização em Tempo Real', 'Facilita NFE', 'Conciliação Bancária', 'Contratos de cartões e outros', 'Suporte Técnico Completo (Todos os canais)'],
                    additionalUsers: { count: 0, price: 19.90, max: 5 }, 
                    additionalPdvs: { count: 0, price: 59.90, max: 5 },
                    optionalModules: [
                        // Adicionando módulos de delivery para a lógica de dependência funcionar
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
            outros: { // Novo segmento para planos independentes
                bling: {
                    name: 'Plano Bling', basePrice: 277.67, baseUsers: 2, basePdvs: 1,
                    fixedModules: ['1x PDV - Frente de Caixa', '2x Usuários', 'Notas Fiscais Ilimitadas', 'Relatórios', 'Suporte Técnico - Via chamados', 'Suporte Técnico - Via chat', 'Estoque em Grade'],
                    additionalUsers: { count: 0, price: 19.90, max: Infinity }, // Infinitos usuários
                    additionalPdvs: { count: 0, price: 59.90, max: Infinity }, // Infinitos PDVs
                    optionalModules: [
                        { name: 'Controle de mesas e comandas', price: 49.00, quantifiable: false, selected: false },
                        { name: 'Contratos de cartões e outros', price: 50.00, quantifiable: false, selected: false },
                        { name: 'Suporte Técnico - Estendido', price: 99.00, quantifiable: false, selected: false },
                        { name: 'Delivery', price: 30.00, quantifiable: false, selected: false },
                        { name: 'TEF', price: 99.90, quantifiable: true, count: 0, max: Infinity }, // Infinitos TEF
                        { name: 'Smart TEF', price: 49.90, quantifiable: true, count: 0, max: Infinity }, // Infinitos SmartTEF
                        { name: 'Autoatendimento', price: 299.00, quantifiable: true, count: 0, max: Infinity }, // Infinitos Autoatendimento
                    ]
                },
                autoatendimento: {
                    name: 'Plano Autoatendimento', basePrice: 332.50, baseUsers: 1, basePdvs: 0,
                    fixedModules: ['1x Terminais Autoatendimento', '1x Usuários', 'Suporte Técnico - Via chat', 'Suporte Técnico - Via chamados', 'Suporte Técnico - Estendido', 'Contratos de cartões e outros', 'Notas Fiscais Ilimitadas', 'Relatório Básico'],
                    additionalUsers: { count: 0, price: 19.90, max: Infinity }, // Infinitos usuários
                    additionalPdvs: { count: 0, price: 0, max: 0 }, // Não mencionado como adicional
                    optionalModules: [
                        { name: 'Facilita NFE', price: 99.00, quantifiable: false, selected: false },
                        { name: 'Importação de XML', price: 29.00, quantifiable: false, selected: false },
                        { name: 'Promoções', price: 24.50, quantifiable: false, selected: false },
                        { name: 'Estoque em Grade', price: 40.00, quantifiable: false, selected: false },
                        { name: 'Business Intelligence (BI)', price: 199.00, quantifiable: false, selected: false },
                        { name: 'Atualização em Tempo Real', price: 49.00, quantifiable: false, selected: false },
                        { name: 'Autoatendimento', price: 299.00, quantifiable: true, count: 0, max: Infinity }, // Infinitos Terminais de Autoatendimento (adicionais)
                    ]
                }
            }
            };
        })(),
        
        // --- Computed Properties ---
        get eligibleForCourtesy() {
            if (!this.selectedPlan) return [];
            return this.selectedPlan.optionalModules.filter(mod => (mod.selected || mod.count > 0) && mod.price <= 50.00 && mod.price > 0);
        },

        get selectedPlan() { return this.selectedPlanKey ? this.planData[this.selectedSegment][this.selectedPlanKey] : null; },
        
        get filteredOptionalModules() {
            if (!this.selectedPlan) return [];
            if (!this.searchQuery) return this.selectedPlan.optionalModules;
            return this.selectedPlan.optionalModules.filter(mod => mod.name.toLowerCase().includes(this.searchQuery.toLowerCase()));
        },

        get tempFinalTotal() {
            if (!this.selectedPlan) return 0;
            const base = this.selectedPlan.basePrice;
            const addons = (this.selectedPlan.additionalUsers.count * this.selectedPlan.additionalUsers.price) + (this.selectedPlan.additionalPdvs.count * this.selectedPlan.additionalPdvs.price);
            const optionals = this.selectedPlan.optionalModules.reduce((total, mod) => total + (mod.quantifiable ? mod.count * mod.price : (mod.selected ? mod.price : 0)), 0);
            const subtotal = base + addons + optionals;
            const courtesyValue = this.eligibleForCourtesy.find(m => m.name === this.courtesyModuleName)?.price || 0;
            let amountEligibleForPercentageDiscount = base + addons;
            this.selectedPlan.optionalModules.forEach(mod => {
                if (!this.noDiscountModules.has(mod.name) && (mod.selected || mod.count > 0)) {
                    amountEligibleForPercentageDiscount += mod.quantifiable ? mod.count * mod.price : mod.price;
                }
            });
            if (courtesyValue > 0 && !this.noDiscountModules.has(this.courtesyModuleName)) {
                amountEligibleForPercentageDiscount -= courtesyValue;
            }
            const calculatedDiscountAmount = amountEligibleForPercentageDiscount * (this.tempDiscountPercentage / 100);
            const totalReduction = courtesyValue + calculatedDiscountAmount;
            return subtotal - totalReduction;
        },

        get summary() {
            if (!this.selectedPlan) return { base: 0, addons: 0, optionals: 0, setupCost: 0, subtotal: 0, courtesyValue: 0, calculatedDiscountAmount: 0, totalReduction: 0, finalTotal: 0, effectivePercentage: 0 };
            const base = this.selectedPlan.basePrice;
            const addons = (this.selectedPlan.additionalUsers.count * this.selectedPlan.additionalUsers.price) + (this.selectedPlan.additionalPdvs.count * this.selectedPlan.additionalPdvs.price);
            const optionals = this.selectedPlan.optionalModules.reduce((total, mod) => total + (mod.quantifiable ? mod.count * mod.price : (mod.selected ? mod.price : 0)), 0);
            
            // Calcula custo de setup (apenas primeiro mês)
            const setupCost = this.selectedPlan.optionalModules.reduce((total, mod) => {
                if ((mod.selected || (mod.quantifiable && mod.count > 0)) && mod.setupCost) {
                    return total + mod.setupCost;
                }
                return total;
            }, 0);
            
            const subtotal = base + addons + optionals;
            
            const courtesyValue = this.eligibleForCourtesy.find(m => m.name === this.courtesyModuleName)?.price || 0;
            
            let amountEligibleForPercentageDiscount = base + addons;
            this.selectedPlan.optionalModules.forEach(mod => {
                if (!this.noDiscountModules.has(mod.name) && (mod.selected || mod.count > 0)) {
                    amountEligibleForPercentageDiscount += mod.quantifiable ? mod.count * mod.price : mod.price;
                }
            });

            if (courtesyValue > 0 && !this.noDiscountModules.has(this.courtesyModuleName)) {
                amountEligibleForPercentageDiscount -= courtesyValue;
            }
            
            const calculatedDiscountAmount = amountEligibleForPercentageDiscount * (this.manualDiscountPercentage / 100);
            const totalReduction = courtesyValue + calculatedDiscountAmount;
            const finalTotal = subtotal - totalReduction;
            const effectivePercentage = subtotal > 0 ? (totalReduction / subtotal) * 100 : 0;

            return { 
                base, 
                addons, 
                optionals, 
                setupCost,
                subtotal, 
                courtesyValue, 
                calculatedDiscountAmount, 
                totalReduction, 
                finalTotal,
                effectivePercentage 
            };
        },

        // --- Methods ---
        init() {
            this.$watch('selectedPlan.optionalModules', () => {
                if (!this.selectedPlan) return;
                const tefModule = this.selectedPlan.optionalModules.find(m => m.name === 'TEF');
                const contractModule = this.selectedPlan.optionalModules.find(m => m.name === 'Contratos de cartões');
                if (tefModule && contractModule && tefModule.count > 0 && !contractModule.selected) {
                    contractModule.selected = true;
                }
            }, { deep: true });
            window.addEventListener('keydown', (e) => this.handleKeyPress(e));
        },

        login() { if (this.password) { this.loggedIn = true; this.loginError = false; } else { this.loginError = true; } },
        
        selectPlan(key) {
            this.selectedPlanKey = key;
            if (key === null) return;
            this.searchQuery = '';
            this.manualDiscountPercentage = 10;
            this.courtesyModuleName = null;
            this.leadCaptureSuccess = false;
            this.showLeadForm = false;
            // Reset counts for all plans when a new plan is selected
            Object.values(this.planData).forEach(segment => {
                Object.values(segment).forEach(plan => {
                    plan.additionalUsers.count = 0;
                    plan.additionalPdvs.count = 0;
                    plan.optionalModules.forEach(mod => {
                        if (mod.quantifiable) mod.count = 0;
                        else mod.selected = false;
                    });
                });
            });
        },
        
        setSegment(segment) {
            this.selectedSegment = segment;
            this.selectPlan(null);
        },
        
        // MÉTODO MODIFICADO: toggleModule
        toggleModule(mod) {
            if (this.isModuleDisabled(mod) || mod.quantifiable) return;
            
            mod.selected = !mod.selected;

            // Se o módulo for selecionado, ativa suas dependências
            if (mod.selected && mod.requires) {
                this.activateDependencies(mod);
            }
            
            // Se o módulo for desmarcado e era uma cortesia, remove a cortesia
            if (!mod.selected && mod.name === this.courtesyModuleName) {
                this.courtesyModuleName = null;
            }
        },

        // NOVO MÉTODO: activateDependencies
        activateDependencies(mod) {
            if (!mod.requires || !this.selectedPlan) return;
            
            mod.requires.forEach(dependencyName => {
                // Verifica se a dependência já está inclusa nos módulos fixos do plano
                if (this.selectedPlan.fixedModules.includes(dependencyName)) {
                    return; // Não faz nada se a dependência já é fixa
                }

                // Encontra o módulo de dependência na lista de opcionais
                const dependencyModule = this.selectedPlan.optionalModules.find(m => m.name === dependencyName);
                
                if (dependencyModule && !dependencyModule.selected) {
                    dependencyModule.selected = true;
                    // Chama recursivamente para o caso de dependências aninhadas (A -> B -> C)
                    this.activateDependencies(dependencyModule);
                }
            });
        },
        
        // MÉTODO MODIFICADO: isModuleDisabled
        isModuleDisabled(mod) {
            if (!this.selectedPlan) return false;

            // Regra original: Desabilita 'Contratos de cartões' se 'TEF' estiver ativo
            const tefModule = this.selectedPlan.optionalModules.find(m => m.name === 'TEF');
            if (tefModule?.count > 0 && mod.name === 'Contratos de cartões e outros') { // Atualizado para 'Contratos de cartões e outros'
                return true;
            }

            // Nova Regra: Verifica se o módulo 'mod' é uma dependência para algum outro módulo já selecionado
            const isRequiredByAnotherModule = this.selectedPlan.optionalModules.some(otherMod => 
                otherMod.selected && 
                otherMod.requires && 
                otherMod.requires.includes(mod.name)
            );

            if (isRequiredByAnotherModule) {
                return true; // Desabilita o checkbox se for uma dependência ativa
            }
            
            // Nova Regra: Verifica se a dependência já está fixa no plano, nesse caso, não precisa ser desabilitada
            const isFixedModule = this.selectedPlan.fixedModules.includes(mod.name);
            if (isRequiredByAnotherModule && !isFixedModule) {
               return true;
            }


            return false;
        },

        openDiscountModal() {
            this.tempDiscountPercentage = this.manualDiscountPercentage;
            this.tempFinalValue = null;
            this.isDiscountAuthorized = false;
            this.discountPassword = '';
            this.discountRuleError = '';
            this.showDiscountModal = true;
        },

        authorizeDiscount() {
            if (this.discountPassword) {
                this.isDiscountAuthorized = true;
                this.discountPasswordError = false;
            } else { this.discountPasswordError = true; }
        },

        calculateDiscountFromFinalValue() {
            if (!this.selectedPlan || this.tempFinalValue === null || this.tempFinalValue === '') {
                return;
            }
            
            const finalValue = parseFloat(this.tempFinalValue);
            if (isNaN(finalValue) || finalValue < 0) {
                return;
            }
            
            // Calcula o subtotal atual
            const base = this.selectedPlan.basePrice;
            const addons = (this.selectedPlan.additionalUsers.count * this.selectedPlan.additionalUsers.price) + (this.selectedPlan.additionalPdvs.count * this.selectedPlan.additionalPdvs.price);
            const optionals = this.selectedPlan.optionalModules.reduce((total, mod) => total + (mod.quantifiable ? mod.count * mod.price : (mod.selected ? mod.price : 0)), 0);
            const subtotal = base + addons + optionals;
            
            // Calcula o valor da cortesia
            const courtesyValue = this.eligibleForCourtesy.find(m => m.name === this.courtesyModuleName)?.price || 0;
            
            // Calcula o valor elegível para desconto percentual
            let amountEligibleForPercentageDiscount = base + addons;
            this.selectedPlan.optionalModules.forEach(mod => {
                if (!this.noDiscountModules.has(mod.name) && (mod.selected || mod.count > 0)) {
                    amountEligibleForPercentageDiscount += mod.quantifiable ? mod.count * mod.price : mod.price;
                }
            });
            
            if (courtesyValue > 0 && !this.noDiscountModules.has(this.courtesyModuleName)) {
                amountEligibleForPercentageDiscount -= courtesyValue;
            }
            
            // Calcula o desconto necessário para chegar ao valor final
            const totalReduction = subtotal - finalValue;
            const calculatedDiscountAmount = totalReduction - courtesyValue;
            
            // Calcula a porcentagem de desconto
            if (amountEligibleForPercentageDiscount > 0) {
                this.tempDiscountPercentage = (calculatedDiscountAmount / amountEligibleForPercentageDiscount) * 100;
            } else {
                this.tempDiscountPercentage = 0;
            }
            
            // Limita a porcentagem entre 0 e 100
            if (this.tempDiscountPercentage < 0) this.tempDiscountPercentage = 0;
            if (this.tempDiscountPercentage > 100) this.tempDiscountPercentage = 100;
        },

        applyManualDiscount() {
            this.discountRuleError = '';
            
            // Se o usuário inseriu um valor final, calcula a porcentagem primeiro
            if (this.tempFinalValue !== null && this.tempFinalValue !== '') {
                this.calculateDiscountFromFinalValue();
            }
            
            // Verifica se há cortesia selecionada
            const hasCourtesy = this.courtesyModuleName !== null && this.courtesyModuleName !== '';
            
            // Se desconto > 20%, requer autorização (com ou sem cortesia)
            // Com cortesia: desconto máximo permitido sem autorização é 20%
            // Sem cortesia: desconto máximo permitido sem autorização é 20%
            if (this.tempDiscountPercentage > 20) {
                this.discountRuleError = '🚫';
                // Não mostra o modal automaticamente, apenas o botão no template
                return;
            }
            
            if (this.tempDiscountPercentage < 0) this.tempDiscountPercentage = 0;
            this.manualDiscountPercentage = this.tempDiscountPercentage;
            this.tempFinalValue = null; // Limpa o valor final após aplicar
            this.showDiscountModal = false;
            this.showSpecialCodeModal = false;
        },

        validateSpecialCode() {
            this.specialCodeError = false;
            if (!this.specialCode || !this.specialCode.toUpperCase().includes('C')) {
                this.specialCodeError = true;
                return false;
            }
            // Se o usuário inseriu um valor final, calcula a porcentagem primeiro
            if (this.tempFinalValue !== null && this.tempFinalValue !== '') {
                this.calculateDiscountFromFinalValue();
            }
            // Código válido, permite aplicar desconto acima de 20%
            this.manualDiscountPercentage = this.tempDiscountPercentage;
            this.tempFinalValue = null; // Limpa o valor final após aplicar
            this.showDiscountModal = false;
            this.showSpecialCodeModal = false;
            this.specialCode = '';
            
            // Mostra popup de sucesso
            this.showDiscountSuccess = true;
            setTimeout(() => {
                this.showDiscountSuccess = false;
            }, 3000); // Fecha automaticamente após 3 segundos
            
            return true;
        },

        // Modal de autorização e edição da Data de Fechamento
        openClosingDateModal() {
            this.tempClosingDate = this.closingDate;
            this.isClosingDateAuthorized = false;
            this.closingDatePassword = '';
            this.closingDatePasswordError = false;
            this.showClosingDateModal = true;
        },

        authorizeClosingDate() {
            if (this.closingDatePassword) {
                this.isClosingDateAuthorized = true;
                this.closingDatePasswordError = false;
            } else {
                this.closingDatePasswordError = true;
            }
        },

        applyClosingDate() {
            this.closingDate = this.tempClosingDate;
            this.showClosingDateModal = false;
        },
        
        startCountdown(expiryDate) {
            clearInterval(this.countdownTimer);
            this.countdownTimer = setInterval(() => {
                const now = new Date().getTime();
                const distance = expiryDate.getTime() - now;
                if (distance < 0) {
                    clearInterval(this.countdownTimer);
                    this.countdownText = 'Oferta Expirada';
                    return;
                }
                const days = Math.floor(distance / (1000 * 60 * 60 * 24));
                const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((distance % (1000 * 60)) / 1000);
                this.countdownText = `${days}d ${hours}h ${minutes}m ${seconds}s`;
            }, 1000);
        },

        submitLead() {
            this.leadFormError = '';
            if (!this.clientName.trim() || !this.clientCPF.trim()) {
                this.leadFormError = 'Por favor, preencha o Nome e o CPF.';
                return;
            }
            const namePart = this.clientName.trim().substring(0, 3).toUpperCase();
            const docPart = this.clientCPF.trim().replace(/\D/g, '').slice(-4);
            this.generatedCouponCode = `${namePart}${docPart}`;
            this.annualSavings = (this.summary.subtotal - this.summary.finalTotal) * 12;
            const expiryDate = new Date(this.closingDate);
            expiryDate.setHours(23, 59, 59, 999);
            this.startCountdown(expiryDate);
            this.leadCaptureSuccess = true;
        },
        
        async generatePDF() { // Tornando a função assíncrona
            const { jsPDF } = window.jspdf;
            const doc = new jsPDF();

            // --- Estrutura de Dados: Equipamentos Homologados ---
            const equipamentosHomologados = {
                impressorasTermicas: {
                    titulo: 'Impressoras Térmicas',
                    recomendados: [
                        'Epson TM T-20',
                        'Elgin i9',
                        'Bematech MP4200TH'
                    ],
                    naoRecomendados: [
                        'EpsonTMT-20 (USB)',
                        'EpsonTMT-81 (USB)',
                        'EpsonTMT-88 (USB)',
                        'Elgini9 (USB)',
                        'Elgini7 (USB)',
                        'Bematech MP 4200 TH (USB)',
                        'Bematech MP 100S (USB)',
                        'Bematech MP 4000 TH (USB)',
                        'Bematech MP 2500 TH (USB)',
                        'Bematech LR 2000 (USB)',
                        'CIS PR 1800',
                        'Thermal Receipt Printer POS - 8330'
                    ]
                },
                balancas: {
                    titulo: 'Balanças',
                    recomendados: [
                        'Toledo Prix 3 Light (Comunicação com sistema sem impressão de etiqueta)',
                        'Toledo Prix 3 Plus (Comunicação com sistema sem impressão de etiqueta)',
                        'Toledo Prix 3 Fit (Comunicação com sistema sem impressão de etiqueta)',
                        'Toledo Prix 2187 (Comunicação com sistema sem impressão de etiqueta)',
                        'Toledo Prix 4 (Imprime etiquetas - requer Relatório Dinâmico)',
                        'Toledo Prix 5 (Imprime etiquetas - requer Relatório Dinâmico)',
                        'Urano: Todos modelos (Protocolo PRT-3)',
                        'Filizola Platina 3/4/5 (Imprime etiquetas - requer Relatório Dinâmico)',
                        'Balanças Elgin Linha DP - todos os modelos'
                    ]
                },
                computadores: {
                    titulo: 'Computadores - Requisitos Mínimos',
                    itens: [
                        'Windows 10 e 11',
                        'Memória RAM: no mínimo 4GB',
                        'Espaço mínimo de HD/SSD: 250 GB',
                        'Processador mínimo: i3'
                    ]
                },
                celulares: {
                    titulo: 'Celulares (Recomendado)',
                    itens: [
                        'Sistema operacional: Android',
                        'Tamanho: 10.1 polegadas',
                        'Memória Interna: 32GB',
                        'Possuir conectividade via bluetooth',
                        'Versão mínima do Android: 5.5.5'
                    ]
                },
                tablets: {
                    titulo: 'Tablet (Recomendado)',
                    itens: [
                        'Samsung Galaxy Tab A Wi-Fi 2GB Ram 32GB Octa-Core Android 9 Tela de 10.1"'
                    ]
                },
                sat: {
                    titulo: 'SAT',
                    recomendados: [
                        'TANCA S1000',
                        'ELGIN SMART'
                    ],
                    testados: [
                        'ELGIN SAT GO',
                        'ELGIN SMART',
                        'TANCA TS 1000',
                        'TANCA TS 2000',
                        'CONTROL ID SAT ID (Recomendado, fácil contato com suporte técnico)',
                        'EPSON SAT A10',
                        'DIMEP D-SAT 2.0 (Recomendado, fácil contato com suporte técnico)',
                        'DIMEP D-SAT (Recomendado, fácil contato com suporte técnico)',
                        'SWEDA SS-2000 (Recomendado, fácil contato com suporte técnico)',
                        'SWEDA SS-1000 (Recomendado, fácil contato com suporte técnico)',
                        'KRYPTUS EASYS@T',
                        'GERTEC GERSAT',
                        'NITERE NSAT-4200',
                        'URANO',
                        'JETWAY JS-1000'
                    ]
                },
                leitoresCodigo: {
                    titulo: 'Leitores de Código de Barras',
                    itens: [
                        'Honeywell MS5145',
                        'Leitor Código de Barras Fixo 1D Áquila S-3200 - Bematech (PARA TOTEM SELF CHECKOUT)'
                    ]
                },
                gavetasAutomaticas: {
                    titulo: 'Gavetas Automáticas',
                    nota: 'Todos os modelos funcionam. Recomendação muito utilizada:',
                    itens: [
                        'Bematech GD50',
                        'Bematech GD56'
                    ]
                },
                etiquetadoras: {
                    titulo: 'Etiquetadoras',
                    itens: [
                        'Argox 214 Plus OS',
                        'Elgin L42',
                        'Elgin L42 PRO',
                        'Zebra GC420 (Não pode ser modelo EPL)'
                    ]
                },
                pinpads: {
                    titulo: 'Pinpads',
                    itens: [
                        'Pinpad Ingenico IPP320',
                        'Pinpad PPC920',
                        'Pinpad PPC930',
                        'Pinpad MP15'
                    ]
                },
                monitoresTouch: {
                    titulo: 'Monitores Touch Screen',
                    itens: [
                        'Monitor Dell P2424HT Touchscreen 24"',
                        'Monitor Touch Screen Multitoque 18,5 ou 23 - Lynx Wave'
                    ]
                },
                bancosSitef: {
                    titulo: 'Bancos Credenciados SITEF',
                    comPix: [
                        'Itaú Unibanco',
                        'Banco SICREDI',
                        'Banco do Brasil',
                        'Banco SICOOB',
                        'Banco Bradesco',
                        'Banco Santander',
                        'Banco VerdeCard / Quero Quero Pag'
                    ],
                    semGarantia: [
                        'Ailos',
                        'Banco Original',
                        'Cielo',
                        'Efí (Gerencianet)',
                        'PagSeguro PagBank',
                        'Realize CFI',
                        'Senff',
                        'Tribanco',
                        'Unicred',
                        'Mercado Pago',
                        'Rede',
                        'Stone',
                        'SafraPay',
                        'Vero',
                        'Getnet'
                    ]
                }
            };

            // --- Configurações de Design Melhoradas ---
            const MARGIN = 20;
            const PAGE_WIDTH = doc.internal.pageSize.width;
            const PAGE_HEIGHT = doc.internal.pageSize.height;
            const FONT_REGULAR = 'helvetica';
            const FONT_BOLD = 'helvetica';
            const ACCENT_COLOR = '#1E40AF'; // Azul mais profissional
            const PRIMARY_COLOR = '#2563EB'; // Azul corporativo
            const DARK_GRAY = '#1F2937'; // Mais escuro para melhor contraste
            const MEDIUM_GRAY = '#4B5563'; // Mais escuro
            const LIGHT_GRAY = '#F9FAFB'; // Mais suave
            const SECTION_BG = '#F3F4F6'; // Fundo para seções
            const HEADER_HEIGHT = 25; // Aumentado para mais espaço
            const FOOTER_HEIGHT = 18; // Aumentado
            let y = HEADER_HEIGHT + 20;
            const generationDate = new Date().toLocaleDateString('pt-BR');

            // Função auxiliar para carregar imagem e converter para Data URL
            const getImageDataUrl = (url) => {
                return new Promise((resolve, reject) => {
                    const img = new Image();
                    img.crossOrigin = 'Anonymous'; // Importante para lidar com CORS
                    img.onload = () => {
                        const canvas = document.createElement('canvas');
                        canvas.width = img.width;
                        canvas.height = img.height;
                        const ctx = canvas.getContext('2d');
                        ctx.drawImage(img, 0, 0);
                        resolve(canvas.toDataURL('image/png')); // Converte para Data URL PNG
                    };
                    img.onerror = (error) => {
                        console.error("Erro ao carregar a imagem:", error);
                        reject(new Error('Falha ao carregar a imagem da logo.'));
                    };
                    img.src = url;
                });
            };

            // --- Funções de Desenho Melhoradas ---
            const drawHeader = async (doc) => {
                const LOGO_URL = 'https://manual.cplug.com.br/uploads/images/system/2021-02/kFDdmOgun4T92suN-LOGO-PNG.png';
                const LOGO_WIDTH = 45;
                const LOGO_HEIGHT = 16;
                const LOGO_X = MARGIN;
                const LOGO_Y = (HEADER_HEIGHT - LOGO_HEIGHT) / 2;

                // Header com gradiente mais suave
                doc.setFillColor(30, 58, 138); // Azul escuro profissional
                doc.rect(0, 0, PAGE_WIDTH, HEADER_HEIGHT, 'F');
                
                // Linha decorativa
                const primaryRgbHeader = hexToRgb(PRIMARY_COLOR);
                if (primaryRgbHeader) {
                    doc.setFillColor(primaryRgbHeader.r, primaryRgbHeader.g, primaryRgbHeader.b);
                }
                doc.rect(0, HEADER_HEIGHT - 2, PAGE_WIDTH, 2, 'F');

                try {
                    const imageDataUrl = await getImageDataUrl(LOGO_URL);
                    doc.addImage(imageDataUrl, 'PNG', LOGO_X, LOGO_Y, LOGO_WIDTH, LOGO_HEIGHT);
                } catch (error) {
                    console.error("Não foi possível adicionar a logo ao PDF:", error);
                }

                doc.setFontSize(10);
                doc.setTextColor(255, 255, 255);
                doc.setFont(FONT_BOLD, 'bold');
                // Centraliza o nome da empresa no meio superior
                const companyName = 'CONNECTPLUG DESENVOLVIMENTO DE SOFTWARES LTDA';
                const nameLines = doc.splitTextToSize(companyName, PAGE_WIDTH - MARGIN * 2);
                let nameY = 13;
                for (const line of nameLines) {
                    doc.text(line, PAGE_WIDTH / 2, nameY, { align: 'center' });
                    nameY += 5;
                }
            };

            // Função para converter hex para RGB (definida antes de todas as funções)
            const hexToRgb = (hex) => {
                const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
                return result ? {
                    r: parseInt(result[1], 16),
                    g: parseInt(result[2], 16),
                    b: parseInt(result[3], 16)
                } : null;
            };

            const drawFooter = (doc) => {
                // Footer melhorado
                const darkGrayRgb = hexToRgb(DARK_GRAY);
                if (darkGrayRgb) {
                    doc.setFillColor(darkGrayRgb.r, darkGrayRgb.g, darkGrayRgb.b);
                }
                doc.rect(0, PAGE_HEIGHT - FOOTER_HEIGHT, PAGE_WIDTH, FOOTER_HEIGHT, 'F');

                // Linha decorativa superior do footer
                const primaryRgb = hexToRgb(PRIMARY_COLOR);
                if (primaryRgb) {
                    doc.setFillColor(primaryRgb.r, primaryRgb.g, primaryRgb.b);
                }
                doc.rect(0, PAGE_HEIGHT - FOOTER_HEIGHT, PAGE_WIDTH, 2, 'F');

                doc.setFontSize(8);
                doc.setTextColor(255, 255, 255);
                doc.setFont(FONT_REGULAR, 'normal');
                doc.text('ConnectPlug - Soluções Inteligentes para o seu negócio', MARGIN, PAGE_HEIGHT - 8);
                doc.setFontSize(7);
                doc.text(`Gerado em ${generationDate}`, PAGE_WIDTH - MARGIN, PAGE_HEIGHT - 8, { align: 'right' });
            };

            // Função para desenhar barra horizontal de separamento azul
            const drawBlueSeparator = (doc, yPos) => {
                const accentRgb = hexToRgb(ACCENT_COLOR);
                if (accentRgb) {
                    doc.setFillColor(accentRgb.r, accentRgb.g, accentRgb.b);
                }
                doc.rect(MARGIN, yPos - 2, PAGE_WIDTH - MARGIN * 2, 3, 'F');
            };

            // Função para desenhar seção de título melhorada
            const drawSectionTitle = (doc, title, yPos) => {
                // Linha decorativa antes do título
                const accentRgb = hexToRgb(ACCENT_COLOR);
                if (accentRgb) {
                    doc.setDrawColor(accentRgb.r, accentRgb.g, accentRgb.b);
                }
                doc.setLineWidth(0.5);
                doc.line(MARGIN, yPos - 3, PAGE_WIDTH - MARGIN, yPos - 3);

                // Fundo do título
                const bgRgb = hexToRgb(SECTION_BG);
                if (bgRgb) {
                    doc.setFillColor(bgRgb.r, bgRgb.g, bgRgb.b);
                }
                doc.roundedRect(MARGIN, yPos - 2, PAGE_WIDTH - MARGIN * 2, 10, 2, 2, 'F');

                doc.setFontSize(13);
                doc.setFont(FONT_BOLD, 'bold');
                const darkGrayRgb = hexToRgb(DARK_GRAY);
                if (darkGrayRgb) {
                    doc.setTextColor(darkGrayRgb.r, darkGrayRgb.g, darkGrayRgb.b);
                }
                doc.text(title, MARGIN + 3, yPos + 4);

                return yPos + 12;
            };

            // Helper para adicionar nova página se necessário
            const checkPageBreak = async (requiredSpace) => { // Tornando a função assíncrona
                if (y + requiredSpace > PAGE_HEIGHT - FOOTER_HEIGHT - 10) {
                    doc.addPage();
                    await drawHeader(doc); // Aguarda o cabeçalho ser desenhado
                    y = HEADER_HEIGHT + 15;
                }
            };

            // --- GERAÇÃO DO CONTEÚDO ---
            await drawHeader(doc); // Aguarda o cabeçalho ser desenhado antes de continuar

            // Título Principal (Melhorado)
            doc.setFontSize(24);
            doc.setFont(FONT_BOLD, 'bold');
            doc.setTextColor(DARK_GRAY);
            doc.text('Proposta de Solução de Software', MARGIN, y);

            // Linha decorativa abaixo do título
            const accentRgb = hexToRgb(ACCENT_COLOR);
            if (accentRgb) {
                doc.setDrawColor(accentRgb.r, accentRgb.g, accentRgb.b);
            }
            doc.setLineWidth(1);
            doc.line(MARGIN, y + 3, PAGE_WIDTH - MARGIN, y + 3);
            y += 12;
            
            // Dados da Proposta
            doc.setFontSize(10);
            doc.setFont(FONT_REGULAR, 'normal');
            doc.setTextColor(MEDIUM_GRAY);
            doc.text(`Data: ${generationDate}`, PAGE_WIDTH - MARGIN, y, { align: 'right' });
            y += 5;
            doc.text(`Validade: ${new Date(this.closingDate + 'T00:00:00').toLocaleDateString('pt-BR')}`, PAGE_WIDTH - MARGIN, y, { align: 'right' });
            y += 5;
            doc.text(`Código: ${this.generatedCouponCode}`, PAGE_WIDTH - MARGIN, y, { align: 'right' });
            y += 10;

            // Seção: Dados do Cliente (Melhorado)
            await checkPageBreak(40);
            y = drawSectionTitle(doc, 'DADOS DO CLIENTE', y);

            doc.setFontSize(10);
            doc.setFont(FONT_REGULAR, 'normal');
            doc.setTextColor(MEDIUM_GRAY);
            doc.text(`Nome: ${this.clientName}`, MARGIN, y);
            y += 5;
            if (this.clientCPF) {
                doc.text(`CPF: ${this.clientCPF}`, MARGIN, y);
                y += 5;
            }
            if (this.clientCNPJ) {
                doc.text(`CNPJ: ${this.clientCNPJ}`, MARGIN, y);
                y += 5;
            }
            if (this.clientObservation) {
                y += 5;
                doc.setFont(FONT_BOLD, 'bold');
                doc.text('Observações:', MARGIN, y);
                doc.setFont(FONT_REGULAR, 'normal');
                y += 5;
                const obsLines = doc.splitTextToSize(this.clientObservation, PAGE_WIDTH - MARGIN * 2);
                doc.text(obsLines, MARGIN, y);
                y += obsLines.length * 4 + 2;
            }
            y += 10;

            // Seção: Resumo da Proposta (Melhorado)
            await checkPageBreak(50);
            y = drawSectionTitle(doc, 'RESUMO DA PROPOSTA', y);

            // Card Principal (Plano + Valor Final) - Melhorado
            const lightGrayRgb = hexToRgb(LIGHT_GRAY);
            if (lightGrayRgb) {
                doc.setFillColor(lightGrayRgb.r, lightGrayRgb.g, lightGrayRgb.b);
            }
            const accentRgb2 = hexToRgb(ACCENT_COLOR);
            if (accentRgb2) {
                doc.setDrawColor(accentRgb2.r, accentRgb2.g, accentRgb2.b);
            }
            doc.setLineWidth(0.5);
            doc.roundedRect(MARGIN, y, PAGE_WIDTH - MARGIN * 2, 32, 4, 4, 'FD');
            
            doc.setFontSize(11);
            doc.setFont(FONT_REGULAR, 'normal');
            doc.setTextColor(DARK_GRAY);
            doc.text(`Plano: ${this.selectedPlan.name}`, MARGIN + 5, y + 10);
            doc.text(`Segmento: ${this.selectedSegment === 'food' ? 'Food Service' : (this.selectedSegment === 'varejo' ? 'Varejo' : 'Outros')}`, MARGIN + 5, y + 17);
            
            doc.setFont(FONT_REGULAR, 'normal');
            doc.text('VALOR MENSAL', PAGE_WIDTH - MARGIN - 5, y + 10, { align: 'right' });
            doc.setFontSize(22);
            doc.setFont(FONT_BOLD, 'bold');
            const accentRgb3 = hexToRgb(ACCENT_COLOR);
            if (accentRgb3) {
                doc.setTextColor(accentRgb3.r, accentRgb3.g, accentRgb3.b);
            }
            doc.text(`R$ ${this.summary.finalTotal.toFixed(2).replace('.', ',')}`, PAGE_WIDTH - MARGIN - 5, y + 20, { align: 'right' });
            
            // Mostra custo de setup se houver
            if (this.summary.setupCost > 0) {
                doc.setFontSize(9);
                doc.setFont(FONT_REGULAR, 'normal');
                const setupOrangeRgb = hexToRgb('#F97316');
                if (setupOrangeRgb) {
                    doc.setTextColor(setupOrangeRgb.r, setupOrangeRgb.g, setupOrangeRgb.b);
                }
                doc.text(`+ Setup: R$ ${this.summary.setupCost.toFixed(2).replace('.', ',')} (1º mês)`, PAGE_WIDTH - MARGIN - 5, y + 27, { align: 'right' });
            }
            
            y += 35;

            // Detalhamento de Valores
            doc.setFontSize(10);
            doc.setFont(FONT_REGULAR, 'normal');
            doc.setTextColor(MEDIUM_GRAY);
            doc.text(`Subtotal: R$ ${this.summary.subtotal.toFixed(2).replace('.', ',')}`, PAGE_WIDTH - MARGIN, y, { align: 'right' });
            y += 5;
            if (this.summary.setupCost > 0) {
                const setupGrayRgb = hexToRgb('#F97316'); // Laranja
                if (setupGrayRgb) {
                    doc.setTextColor(setupGrayRgb.r, setupGrayRgb.g, setupGrayRgb.b);
                }
                doc.text(`Custo de Setup (1º mês): R$ ${this.summary.setupCost.toFixed(2).replace('.', ',')}`, PAGE_WIDTH - MARGIN, y, { align: 'right' });
                const mediumGrayRgb2 = hexToRgb(MEDIUM_GRAY);
                if (mediumGrayRgb2) {
                    doc.setTextColor(mediumGrayRgb2.r, mediumGrayRgb2.g, mediumGrayRgb2.b);
                }
                y += 5;
            }
            if (this.summary.courtesyValue > 0) {
                doc.text(`Cortesia (${this.courtesyModuleName}): - R$ ${this.summary.courtesyValue.toFixed(2).replace('.', ',')}`, PAGE_WIDTH - MARGIN, y, { align: 'right' });
                y += 5;
            }
            if (this.summary.calculatedDiscountAmount > 0) {
                doc.text(`Desconto (${this.manualDiscountPercentage.toFixed(2).replace('.', ',')}%): - R$ ${this.summary.calculatedDiscountAmount.toFixed(2).replace('.', ',')}`, PAGE_WIDTH - MARGIN, y, { align: 'right' });
                y += 5;
            }
            y += 10;

            // Seção: Condições Especiais (se houver) - Melhorado
            if (this.summary.totalReduction > 0) {
                await checkPageBreak(50);
                y = drawSectionTitle(doc, 'CONDIÇÕES ESPECIAIS', y);

                doc.setFontSize(10);
                doc.setFont(FONT_REGULAR, 'normal');
                doc.setTextColor(MEDIUM_GRAY);
                doc.text(`Economia Mensal: R$ ${(this.summary.subtotal - this.summary.finalTotal).toFixed(2).replace('.', ',')}`, MARGIN, y);
                y += 5;
                doc.text(`Economia Anual: R$ ${this.annualSavings.toFixed(2).replace('.', ',')}`, MARGIN, y);
                y += 5;
                doc.text(`Compromisso de parceria de 12 meses para garantir seus benefícios.`, MARGIN, y);
                y += 10;
            }

            // Seção: Módulos Inclusos - SEMPRE na Página 2
            // Sempre força nova página para começar na página 2
            doc.addPage();
            await drawHeader(doc);
            y = HEADER_HEIGHT + 20;

            y = drawSectionTitle(doc, 'MÓDULOS INCLUSOS', y);

            doc.setFontSize(10);
            doc.setFont(FONT_BOLD, 'bold');
            const darkGrayRgbModulos = hexToRgb(DARK_GRAY);
            if (darkGrayRgbModulos) {
                doc.setTextColor(darkGrayRgbModulos.r, darkGrayRgbModulos.g, darkGrayRgbModulos.b);
            }
            doc.text('Módulos Fixos do Plano:', MARGIN, y);
            y += 5;

            doc.setFont(FONT_REGULAR, 'normal');
            const mediumGrayRgbModulos = hexToRgb(MEDIUM_GRAY);
            if (mediumGrayRgbModulos) {
                doc.setTextColor(mediumGrayRgbModulos.r, mediumGrayRgbModulos.g, mediumGrayRgbModulos.b);
            }

            // Distribui os módulos em 2 colunas: máximo 14 na primeira, resto na segunda
            const MAX_ITENS_COLUNA_1 = 14;
            const COLUMN_COUNT_MOD = 2;
            const COLUMN_GAP_MOD = 8;
            const availableWidthMod = PAGE_WIDTH - MARGIN * 2;
            const columnWMod = (availableWidthMod - COLUMN_GAP_MOD) / COLUMN_COUNT_MOD;

            const fixedModulesList = this.selectedPlan.fixedModules;
            const itemsColuna1 = fixedModulesList.slice(0, MAX_ITENS_COLUNA_1);
            const itemsColuna2 = fixedModulesList.slice(MAX_ITENS_COLUNA_1);

            let startY = y;
            let maxY = y;

            // Coluna 1 (máximo 14 itens)
            let col1Y = startY;
            const col1X = MARGIN + 5;
            for (const item of itemsColuna1) {
                await checkPageBreak(5);
                const lines = doc.splitTextToSize(`• ${item}`, columnWMod - 10);
                doc.text(lines, col1X, col1Y);
                col1Y += lines.length * 4.5;
                if (col1Y > maxY) maxY = col1Y;
            }

            // Coluna 2 (itens excedentes)
            if (itemsColuna2.length > 0) {
                let col2Y = startY;
                const col2X = MARGIN + columnWMod + COLUMN_GAP_MOD + 5;
                for (const item of itemsColuna2) {
                    await checkPageBreak(5);
                    const lines = doc.splitTextToSize(`• ${item}`, columnWMod - 10);
                    doc.text(lines, col2X, col2Y);
                    col2Y += lines.length * 4.5;
                    if (col2Y > maxY) maxY = col2Y;
                }
            }

            y = maxY + 5;

            if (this.selectedPlan.additionalUsers.count > 0 || this.selectedPlan.additionalPdvs.count > 0) {
                await checkPageBreak(30);
                doc.setFontSize(10);
                doc.setFont(FONT_BOLD, 'bold');
                doc.setTextColor(DARK_GRAY);
                doc.text('Usuários e PDVs Adicionais:', MARGIN, y);
                y += 5;
                doc.setFont(FONT_REGULAR, 'normal');
                doc.setTextColor(MEDIUM_GRAY);
                if (this.selectedPlan.additionalUsers.count > 0) {
                    await checkPageBreak(5);
                    doc.text(`• ${this.selectedPlan.additionalUsers.count}x Usuário(s) Adicional(is) (R$ ${this.selectedPlan.additionalUsers.price.toFixed(2).replace('.', ',')}/cada)`, MARGIN + 5, y);
                    y += 5;
                }
                if (this.selectedPlan.additionalPdvs.count > 0) {
                    await checkPageBreak(5);
                    doc.text(`• ${this.selectedPlan.additionalPdvs.count}x PDV(s) Adicional(is) (R$ ${this.selectedPlan.additionalPdvs.price.toFixed(2).replace('.', ',')}/cada)`, MARGIN + 5, y);
                    y += 5;
                }
                y += 5;
            }

            const selectedOptionalModules = this.selectedPlan.optionalModules.filter(mod => mod.selected || (mod.quantifiable && mod.count > 0));
            if (selectedOptionalModules.length > 0) {
                await checkPageBreak(30);
                doc.setFontSize(10);
                doc.setFont(FONT_BOLD, 'bold');
                doc.setTextColor(DARK_GRAY);
                doc.text('Módulos Opcionais Selecionados:', MARGIN, y);
                y += 5;
                doc.setFont(FONT_REGULAR, 'normal');
                doc.setTextColor(MEDIUM_GRAY);
                for (const mod of selectedOptionalModules) { // Usando for...of para await
                    await checkPageBreak(5);
                    let moduleText = `• ${mod.quantifiable ? `${mod.count}x ` : ''}${mod.name}`;
                    if (mod.name === this.courtesyModuleName) {
                        moduleText += ` (Cortesia)`;
                        const accentRgb4 = hexToRgb(ACCENT_COLOR);
                        if (accentRgb4) {
                            doc.setTextColor(accentRgb4.r, accentRgb4.g, accentRgb4.b);
                        }
                    } else {
                        moduleText += ` (R$ ${mod.price.toFixed(2).replace('.', ',')})`;
                        doc.setTextColor(MEDIUM_GRAY);
                    }
                    doc.text(moduleText, MARGIN + 5, y);
                    y += 5;
                }
                y += 5;
            }

            // Seção: Informações sobre Treinamentos - SEMPRE na Página 3
            // Força nova página para sempre começar na página 3
            doc.addPage();
            await drawHeader(doc);
            y = HEADER_HEIGHT + 20;

            // Barra horizontal de separamento azul
            drawBlueSeparator(doc, y);
            y += 8;

            doc.setFontSize(14);
            doc.setFont(FONT_BOLD, 'bold');
            const darkGrayRgbTraining = hexToRgb(DARK_GRAY);
            if (darkGrayRgbTraining) {
                doc.setTextColor(darkGrayRgbTraining.r, darkGrayRgbTraining.g, darkGrayRgbTraining.b);
            }
            doc.text('INFORMAÇÕES SOBRE TREINAMENTOS:', MARGIN, y);
            y += 10;

            doc.setFontSize(10);
            doc.setFont(FONT_REGULAR, 'normal');
            const mediumGrayRgbTraining = hexToRgb(MEDIUM_GRAY);
            if (mediumGrayRgbTraining) {
                doc.setTextColor(mediumGrayRgbTraining.r, mediumGrayRgbTraining.g, mediumGrayRgbTraining.b);
            }

            // Tabela de agendamentos
            doc.setFont(FONT_BOLD, 'bold');
            if (darkGrayRgbTraining) {
                doc.setTextColor(darkGrayRgbTraining.r, darkGrayRgbTraining.g, darkGrayRgbTraining.b);
            }
            doc.text('Até R$199,00 (Plano PDV Básico)', MARGIN, y);
            doc.setFont(FONT_REGULAR, 'normal');
            if (mediumGrayRgbTraining) {
                doc.setTextColor(mediumGrayRgbTraining.r, mediumGrayRgbTraining.g, mediumGrayRgbTraining.b);
            }
            doc.text('> 3 agendamentos', MARGIN + 100, y);
            y += 6;

            doc.setFont(FONT_BOLD, 'bold');
            if (darkGrayRgbTraining) {
                doc.setTextColor(darkGrayRgbTraining.r, darkGrayRgbTraining.g, darkGrayRgbTraining.b);
            }
            doc.text('De R$199,01 a R$299,00 (Plano Gestão)', MARGIN, y);
            doc.setFont(FONT_REGULAR, 'normal');
            if (mediumGrayRgbTraining) {
                doc.setTextColor(mediumGrayRgbTraining.r, mediumGrayRgbTraining.g, mediumGrayRgbTraining.b);
            }
            doc.text('> 4 agendamentos', MARGIN + 100, y);
            y += 6;

            doc.setFont(FONT_BOLD, 'bold');
            if (darkGrayRgbTraining) {
                doc.setTextColor(darkGrayRgbTraining.r, darkGrayRgbTraining.g, darkGrayRgbTraining.b);
            }
            doc.text('De R$299,01 a R$399,00 (Plano Performance)', MARGIN, y);
            doc.setFont(FONT_REGULAR, 'normal');
            if (mediumGrayRgbTraining) {
                doc.setTextColor(mediumGrayRgbTraining.r, mediumGrayRgbTraining.g, mediumGrayRgbTraining.b);
            }
            doc.text('> 6 agendamentos', MARGIN + 100, y);
            y += 6;

            doc.setFont(FONT_BOLD, 'bold');
            if (darkGrayRgbTraining) {
                doc.setTextColor(darkGrayRgbTraining.r, darkGrayRgbTraining.g, darkGrayRgbTraining.b);
            }
            doc.text('A partir de R$399,01 (Plano Personalizado etc)', MARGIN, y);
            doc.setFont(FONT_REGULAR, 'normal');
            if (mediumGrayRgbTraining) {
                doc.setTextColor(mediumGrayRgbTraining.r, mediumGrayRgbTraining.g, mediumGrayRgbTraining.b);
            }
            doc.text('> 8 agendamentos', MARGIN + 100, y);
            y += 10;

            doc.setFontSize(9);
            if (mediumGrayRgbTraining) {
                doc.setTextColor(mediumGrayRgbTraining.r, mediumGrayRgbTraining.g, mediumGrayRgbTraining.b);
            }
            const biText = 'Caso o cliente contrate o módulo de Business Intelligence (BI), ganha +2 agendamentos no pacote';
            const biLines = doc.splitTextToSize(biText, PAGE_WIDTH - MARGIN * 2);
            doc.text(biLines, MARGIN, y);
            y += biLines.length * 5 + 2;

            const fidelidadeText = 'Caso o cliente contrate o módulo de Programa de Fidelidade, ganha +3 agendamentos no pacote.';
            doc.text(fidelidadeText, MARGIN, y);
            y += 8;

            // Aviso destacado sobre não comparecimento
            doc.setFontSize(10);
            doc.setFont(FONT_BOLD, 'bold');
            doc.setTextColor(200, 0, 0); // Vermelho para destacar
            doc.text('• Não comparecimento no agendamento:', MARGIN, y);
            y += 6;

            doc.setFontSize(9);
            doc.setFont(FONT_BOLD, 'bold');
            if (darkGrayRgbTraining) {
                doc.setTextColor(darkGrayRgbTraining.r, darkGrayRgbTraining.g, darkGrayRgbTraining.b);
            }
            const avisoText = `o não comparecimento no dia e horário do agendamento irá acarretar no consumo do agendamento dentro do seu pacote disponível!

Caso deseje realizar o cancelamento do agendamento, sinalize até 24 horas antes do agendamento para que não haja desconto em seu pacote.

 
Caso deseje, você poderá adquirir mais treinamentos com duração de 01h:30min pelo valor de R$ 199,00`;
            const avisoLines = doc.splitTextToSize(avisoText, PAGE_WIDTH - MARGIN * 2);
            doc.text(avisoLines, MARGIN, y);
            y += avisoLines.length * 5 + 8;

            // Barra horizontal de separamento azul
            // drawBlueSeparator(doc, y);
            y += 8;

            // Seção: Equipamentos Homologados - SEMPRE na Página 4 em diante
            // Força nova página para sempre começar na página 4
            doc.addPage();
            await drawHeader(doc);
            y = HEADER_HEIGHT + 20;

            y = drawSectionTitle(doc, 'EQUIPAMENTOS HOMOLOGADOS', y);

            doc.setFontSize(9);
            doc.setFont(FONT_REGULAR, 'normal');
            doc.setTextColor(MEDIUM_GRAY);

            // Função auxiliar para adicionar lista de equipamentos em colunas
            const addEquipmentListColumns = async (titulo, items, yPos, isSubtitle = false, columnWidth = null) => {
                const COLUMN_COUNT = 2;
                const COLUMN_GAP = 8;
                const availableWidth = PAGE_WIDTH - MARGIN * 2;
                const columnW = columnWidth || (availableWidth - COLUMN_GAP) / COLUMN_COUNT;

                await checkPageBreak(15 + Math.ceil(items.length / COLUMN_COUNT) * 5);

                if (isSubtitle && titulo) {
                    doc.setFontSize(9);
                    doc.setFont(FONT_BOLD, 'bold');
                    const mediumGrayRgb = hexToRgb(MEDIUM_GRAY);
                    if (mediumGrayRgb) {
                        doc.setTextColor(mediumGrayRgb.r, mediumGrayRgb.g, mediumGrayRgb.b);
                    }
                    doc.text(titulo, MARGIN + 5, yPos);
                    yPos += 5;
                } else if (titulo) {
                    doc.setFontSize(10);
                    doc.setFont(FONT_BOLD, 'bold');
                    const darkGrayRgb = hexToRgb(DARK_GRAY);
                    if (darkGrayRgb) {
                        doc.setTextColor(darkGrayRgb.r, darkGrayRgb.g, darkGrayRgb.b);
                    }
                    doc.text(titulo, MARGIN + 3, yPos);
                    yPos += 6;
                }

                doc.setFontSize(8);
                doc.setFont(FONT_REGULAR, 'normal');
                const mediumGrayRgb2 = hexToRgb(MEDIUM_GRAY);
                if (mediumGrayRgb2) {
                    doc.setTextColor(mediumGrayRgb2.r, mediumGrayRgb2.g, mediumGrayRgb2.b);
                }

                const itemsPerColumn = Math.ceil(items.length / COLUMN_COUNT);
                const columnHeights = [];

                for (let col = 0; col < COLUMN_COUNT; col++) {
                    const startIdx = col * itemsPerColumn;
                    const endIdx = Math.min(startIdx + itemsPerColumn, items.length);
                    const columnItems = items.slice(startIdx, endIdx);

                    let colY = yPos;
                    const colX = MARGIN + (col * (columnW + COLUMN_GAP));

                    for (const item of columnItems) {
                        // Verifica se precisa de nova página
                        if (colY + 5 > PAGE_HEIGHT - FOOTER_HEIGHT - 10) {
                            doc.addPage();
                            await drawHeader(doc);
                            colY = HEADER_HEIGHT + 20;
                            // Redesenha o título se necessário
                            if (titulo && !isSubtitle) {
                                doc.setFontSize(10);
                                doc.setFont(FONT_BOLD, 'bold');
                                const darkGrayRgb2 = hexToRgb(DARK_GRAY);
                                if (darkGrayRgb2) {
                                    doc.setTextColor(darkGrayRgb2.r, darkGrayRgb2.g, darkGrayRgb2.b);
                                }
                                doc.text(titulo, MARGIN + 3, colY);
                                colY += 6;
                                // Reseta a cor para os itens
                                if (mediumGrayRgb2) {
                                    doc.setTextColor(mediumGrayRgb2.r, mediumGrayRgb2.g, mediumGrayRgb2.b);
                                }
                            }
                        }

                        const lines = doc.splitTextToSize(`• ${item}`, columnW - 5);
                        doc.text(lines, colX + 5, colY);
                        colY += lines.length * 4;
                    }

                    columnHeights.push(colY);
                }

                // Retorna a maior altura das colunas
                return Math.max(...columnHeights) + 5;
            };

            // Função auxiliar para adicionar lista de equipamentos (versão simples para títulos principais)
            const addEquipmentList = async (titulo, items, yPos, isSubtitle = false) => {
                return await addEquipmentListColumns(titulo, items, yPos, isSubtitle);
            };

            // Página 3 - Equipamentos Homologados
            // Impressoras Térmicas
            await checkPageBreak(15);
            drawBlueSeparator(doc, y);
            y += 8;
            y = await addEquipmentListColumns(equipamentosHomologados.impressorasTermicas.titulo, equipamentosHomologados.impressorasTermicas.recomendados, y);

            // Balanças
            await checkPageBreak(15);
            drawBlueSeparator(doc, y);
            y += 8;
            y = await addEquipmentListColumns(equipamentosHomologados.balancas.titulo, equipamentosHomologados.balancas.recomendados, y);

            // Computadores ou Notebooks
            await checkPageBreak(15);
            drawBlueSeparator(doc, y);
            y += 8;
            y = await addEquipmentListColumns('Computadores ou Notebooks - Requisitos Mínimos', equipamentosHomologados.computadores.itens, y);

            // Celulares
            await checkPageBreak(15);
            drawBlueSeparator(doc, y);
            y += 8;
            y = await addEquipmentListColumns(equipamentosHomologados.celulares.titulo, equipamentosHomologados.celulares.itens, y);

            // Tablets
            await checkPageBreak(15);
            drawBlueSeparator(doc, y);
            y += 8;
            y = await addEquipmentListColumns(equipamentosHomologados.tablets.titulo, equipamentosHomologados.tablets.itens, y);

            // Leitores de Código de Barras
            drawBlueSeparator(doc, y);
            y += 8;

            // Adiciona Leitores sem verificar quebra de página inicial (já foi verificado antes)
            const leitoresTitulo = equipamentosHomologados.leitoresCodigo.titulo;
            const leitoresItems = equipamentosHomologados.leitoresCodigo.itens;

            doc.setFontSize(10);
            doc.setFont(FONT_BOLD, 'bold');
            const darkGrayRgbLeitores = hexToRgb(DARK_GRAY);
            if (darkGrayRgbLeitores) {
                doc.setTextColor(darkGrayRgbLeitores.r, darkGrayRgbLeitores.g, darkGrayRgbLeitores.b);
            }
            doc.text(leitoresTitulo, MARGIN + 3, y);
            y += 6;

            doc.setFontSize(8);
            doc.setFont(FONT_REGULAR, 'normal');
            const mediumGrayRgbLeitores = hexToRgb(MEDIUM_GRAY);
            if (mediumGrayRgbLeitores) {
                doc.setTextColor(mediumGrayRgbLeitores.r, mediumGrayRgbLeitores.g, mediumGrayRgbLeitores.b);
            }

            // Uma única coluna para Leitores de Código de Barras
            const availableWidthLeit = PAGE_WIDTH - MARGIN * 2;

            for (const item of leitoresItems) {
                const lines = doc.splitTextToSize(`• ${item}`, availableWidthLeit - 10);
                doc.text(lines, MARGIN + 5, y);
                y += lines.length * 4.5;
            }
            y += 5;

            // Gavetas Automáticas - forçado a ficar na mesma página
            drawBlueSeparator(doc, y);
            y += 8;

            if (equipamentosHomologados.gavetasAutomaticas.nota) {
                doc.setFontSize(7.5);
                doc.setFont(FONT_REGULAR, 'italic');
                const grayRgb2 = hexToRgb(MEDIUM_GRAY);
                if (grayRgb2) {
                    doc.setTextColor(grayRgb2.r, grayRgb2.g, grayRgb2.b);
                }
                doc.text(equipamentosHomologados.gavetasAutomaticas.nota, MARGIN + 3, y);
                y += 4;
            }

            doc.setFontSize(10);
            doc.setFont(FONT_BOLD, 'bold');
            if (darkGrayRgbLeitores) {
                doc.setTextColor(darkGrayRgbLeitores.r, darkGrayRgbLeitores.g, darkGrayRgbLeitores.b);
            }
            doc.text(equipamentosHomologados.gavetasAutomaticas.titulo, MARGIN + 3, y);
            y += 6;

            doc.setFontSize(8);
            doc.setFont(FONT_REGULAR, 'normal');
            if (mediumGrayRgbLeitores) {
                doc.setTextColor(mediumGrayRgbLeitores.r, mediumGrayRgbLeitores.g, mediumGrayRgbLeitores.b);
            }

            // Uma única coluna para Gavetas Automáticas
            const availableWidthGav = PAGE_WIDTH - MARGIN * 2;

            for (const item of equipamentosHomologados.gavetasAutomaticas.itens) {
                const lines = doc.splitTextToSize(`• ${item}`, availableWidthGav - 10);
                doc.text(lines, MARGIN + 5, y);
                y += lines.length * 4.5;
            }
            y += 5;

            // Etiquetadoras e demais equipamentos - verifica se precisa de nova página
            // Só cria página 4 se realmente não houver espaço na página 3
            const espacoMinimoP4 = 40; // Espaço mínimo necessário para próxima seção
            if (y + espacoMinimoP4 > PAGE_HEIGHT - FOOTER_HEIGHT - 10) {
                doc.addPage();
                await drawHeader(doc);
                y = HEADER_HEIGHT + 20;
                y = drawSectionTitle(doc, 'EQUIPAMENTOS HOMOLOGADOS', y);
            }

            drawBlueSeparator(doc, y);
            y += 8;
            y = await addEquipmentListColumns(equipamentosHomologados.etiquetadoras.titulo, equipamentosHomologados.etiquetadoras.itens, y);

            // Pinpads
            await checkPageBreak(15);
            drawBlueSeparator(doc, y);
            y += 8;
            y = await addEquipmentListColumns(equipamentosHomologados.pinpads.titulo, equipamentosHomologados.pinpads.itens, y);

            // Monitores Touch Screen
            await checkPageBreak(15);
            drawBlueSeparator(doc, y);
            y += 8;
            y = await addEquipmentListColumns(equipamentosHomologados.monitoresTouch.titulo, equipamentosHomologados.monitoresTouch.itens, y);

            // SAT (APENAS RECOMENDADOS)
            await checkPageBreak(15);
            drawBlueSeparator(doc, y);
            y += 8;
            y = await addEquipmentListColumns('SAT (APENAS RECOMENDADOS)', equipamentosHomologados.sat.recomendados, y);

            // Bancos Credenciados SITEF
            await checkPageBreak(15);
            drawBlueSeparator(doc, y);
            y += 8;
            const darkGrayRgbTitle = hexToRgb(DARK_GRAY);
            if (darkGrayRgbTitle) {
                doc.setTextColor(darkGrayRgbTitle.r, darkGrayRgbTitle.g, darkGrayRgbTitle.b);
            }
            doc.setFontSize(10);
            doc.setFont(FONT_BOLD, 'bold');
            doc.text(equipamentosHomologados.bancosSitef.titulo, MARGIN + 3, y);
            y += 6;

            y = await addEquipmentListColumns('Com PIX:', equipamentosHomologados.bancosSitef.comPix, y, true);

            // Sem garantia de funcionamento - ajustado para não criar nova página
            doc.setFontSize(8);
            doc.setFont(FONT_REGULAR, 'italic');
            const grayRgb3 = hexToRgb(MEDIUM_GRAY);
            if (grayRgb3) {
                doc.setTextColor(grayRgb3.r, grayRgb3.g, grayRgb3.b);
            }
            doc.text('Sem garantia de funcionamento:', MARGIN + 3, y);
            y += 4;

            // Lista de bancos sem garantia - em coluna única para não quebrar página
            doc.setFontSize(8);
            doc.setFont(FONT_REGULAR, 'normal');
            if (grayRgb3) {
                doc.setTextColor(grayRgb3.r, grayRgb3.g, grayRgb3.b);
            }

            const COLUMN_COUNT_BANCO = 2;
            const COLUMN_GAP_BANCO = 8;
            const availableWidthBanco = PAGE_WIDTH - MARGIN * 2;
            const columnWBanco = (availableWidthBanco - COLUMN_GAP_BANCO) / COLUMN_COUNT_BANCO;
            const itemsPerColumnBanco = Math.ceil(equipamentosHomologados.bancosSitef.semGarantia.length / COLUMN_COUNT_BANCO);
            const columnHeightsBanco = [];

            for (let col = 0; col < COLUMN_COUNT_BANCO; col++) {
                const startIdx = col * itemsPerColumnBanco;
                const endIdx = Math.min(startIdx + itemsPerColumnBanco, equipamentosHomologados.bancosSitef.semGarantia.length);
                const columnItems = equipamentosHomologados.bancosSitef.semGarantia.slice(startIdx, endIdx);

                let colY = y;
                const colX = MARGIN + (col * (columnWBanco + COLUMN_GAP_BANCO));

                for (const item of columnItems) {
                    const lines = doc.splitTextToSize(`• ${item}`, columnWBanco - 5);
                    doc.text(lines, colX + 5, colY);
                    colY += lines.length * 4;
                }

                columnHeightsBanco.push(colY);
            }

            y = Math.max(...columnHeightsBanco) + 8;

            // Página adicional para Plano Bling - Sincronizações e Limitações
            if (this.selectedPlan && this.selectedPlan.name === 'Plano Bling') {
                doc.addPage();
                await drawHeader(doc);
                y = HEADER_HEIGHT + 6;

                y = drawSectionTitle(doc, 'INFORMAÇÕES SOBRE INTEGRAÇÃO BLING', y);

                doc.setFontSize(11);
                doc.setFont(FONT_BOLD, 'bold');
                const darkGrayRgbBling = hexToRgb(DARK_GRAY);
                if (darkGrayRgbBling) {
                    doc.setTextColor(darkGrayRgbBling.r, darkGrayRgbBling.g, darkGrayRgbBling.b);
                }
                doc.text('1. SINCRONIZAÇÕES:', MARGIN, y);
                y += 8;

                // Sincronização de Produtos
                doc.setFontSize(10);
                doc.setFont(FONT_BOLD, 'bold');
                doc.text('SINCRONIZAÇÃO DE PRODUTOS:', MARGIN + 5, y);
                y += 6;
                doc.setFont(FONT_REGULAR, 'normal');
                doc.setFontSize(9);
                const mediumGrayRgbBling = hexToRgb(MEDIUM_GRAY);
                if (mediumGrayRgbBling) {
                    doc.setTextColor(mediumGrayRgbBling.r, mediumGrayRgbBling.g, mediumGrayRgbBling.b);
                }
                const prodText = 'Nesta funcionalidade a sincronização segue com ORIGEM na BLING e sendo enviado para CPLUG os seguintes dados:';
                const prodLines = doc.splitTextToSize(prodText, PAGE_WIDTH - MARGIN * 2 - 10);
                doc.text(prodLines, MARGIN + 5, y);
                y += prodLines.length * 4.5 + 3;

                // Lista de dados sincronizados
                const produtosSync = [
                    'Nome',
                    'Atributos: Se utilizado, deverá ser obrigatório a contratação do módulo de GRADE DE PRODUTOS EM AMBAS PLATAFORMAS',
                    'Parâmetros Tributários: Origem, NCM e CEST, os demais parâmetros tributários não são sincronizados e devem ser preenchidos manualmente',
                    'Categoria: nesta sincronização serão eliminadas as categorias existentes na CPLUG e permanecerão apenas os dados oriundos da BLING',
                    'Valor de Venda',
                    'Código de Barras'
                ];

                doc.setFontSize(8);
                for (const item of produtosSync) {
                    await checkPageBreak(5);
                    const lines = doc.splitTextToSize(`• ${item}`, PAGE_WIDTH - MARGIN * 2 - 15);
                    doc.text(lines, MARGIN + 10, y);
                    y += lines.length * 4;
                }
                y += 5;

                // Sincronização de Vendas
                await checkPageBreak(15);
                doc.setFontSize(10);
                doc.setFont(FONT_BOLD, 'bold');
                if (darkGrayRgbBling) {
                    doc.setTextColor(darkGrayRgbBling.r, darkGrayRgbBling.g, darkGrayRgbBling.b);
                }
                doc.text('SINCRONIZAÇÃO DE VENDAS:', MARGIN + 5, y);
                y += 6;
                doc.setFont(FONT_REGULAR, 'normal');
                doc.setFontSize(9);
                if (mediumGrayRgbBling) {
                    doc.setTextColor(mediumGrayRgbBling.r, mediumGrayRgbBling.g, mediumGrayRgbBling.b);
                }
                const vendasText = 'Já nesta modalidade a sincronização segue como ORIGEM as vendas originadas na CPLUG, são enviados os seguintes dados para BLING:';
                const vendasLines = doc.splitTextToSize(vendasText, PAGE_WIDTH - MARGIN * 2 - 10);
                doc.text(vendasLines, MARGIN + 5, y);
                y += vendasLines.length * 4.5 + 3;

                const vendasSync = [
                    'Venda',
                    'Vendedor: com a ressalva que serão enviados dados de vendedores que já foram sincronizados entre BLING-CPLUG',
                    'Cliente: Se o CPF/CNPJ do cliente já existir na BLING, não será duplicado, será apenas vinculado ao cliente já existente',
                    'Método de Pagamento',
                    'Cancelamento de Vendas realizadas na CPLUG'
                ];

                doc.setFontSize(8);
                for (const item of vendasSync) {
                    await checkPageBreak(5);
                    const lines = doc.splitTextToSize(`• ${item}`, PAGE_WIDTH - MARGIN * 2 - 15);
                    doc.text(lines, MARGIN + 10, y);
                    y += lines.length * 4;
                }
                y += 5;

                // Sincronização de Cadastro de Clientes
                await checkPageBreak(15);
                doc.setFontSize(10);
                doc.setFont(FONT_BOLD, 'bold');
                if (darkGrayRgbBling) {
                    doc.setTextColor(darkGrayRgbBling.r, darkGrayRgbBling.g, darkGrayRgbBling.b);
                }
                doc.text('SINCRONIZAÇÃO DE CADASTRO DE CLIENTES', MARGIN + 5, y);
                y += 6;
                doc.setFont(FONT_REGULAR, 'normal');
                doc.setFontSize(9);
                if (mediumGrayRgbBling) {
                    doc.setTextColor(mediumGrayRgbBling.r, mediumGrayRgbBling.g, mediumGrayRgbBling.b);
                }
                
                const clientesBlingText = 'Clientes cadastrados na BLING: Como a ideia da integração é possibilitar vendas em nosso PDV, os clientes de e-commerce da BLING não se fazem necessários em nosso ERP, dessa maneira nenhum cliente da BLING é sincronizado no ERP CPLUG.';
                const clientesBlingLines = doc.splitTextToSize(clientesBlingText, PAGE_WIDTH - MARGIN * 2 - 10);
                doc.text(clientesBlingLines, MARGIN + 5, y);
                y += clientesBlingLines.length * 4.5 + 3;

                const clientesCplugText = 'Clientes cadastrados na CPLUG: Somente clientes cadastrados na CPLUG são sincronizados para BLING, se o CPF/CNPJ do cliente já existir na BLING, não será duplicado, será apenas vinculado ao cliente já existente.';
                const clientesCplugLines = doc.splitTextToSize(clientesCplugText, PAGE_WIDTH - MARGIN * 2 - 10);
                doc.text(clientesCplugLines, MARGIN + 5, y);
                y += clientesCplugLines.length * 4.5 + 5;

                // Limitações
                await checkPageBreak(20);
                doc.setFontSize(11);
                doc.setFont(FONT_BOLD, 'bold');
                if (darkGrayRgbBling) {
                    doc.setTextColor(darkGrayRgbBling.r, darkGrayRgbBling.g, darkGrayRgbBling.b);
                }
                doc.text('2. LIMITAÇÕES:', MARGIN, y);
                y += 8;

                const limitacoes = [
                    'Controle de Estoque apenas na BLING: O objetivo da integração é que as vendas realizadas em nossos PONTOS DE VENDA sejam debitados do estoque da BLING, por esta razão o estoque não é controlado na CPLUG.',
                    'Métodos de Pagamentos: Na sincronização não é realizado os vínculos entre os métodos de pagamentos entre ambas plataformas, sendo assim é obrigatório realizar um DE-PARA: vincular pagamentos CPLUG para pagamentos BLING.',
                    'Parâmetros Tributários: A integração não exporta as NFC-e emitidas para o BLING, ficando em nosso ERP para acessa-las, fazer download.',
                    'Imagens: As imagens do cadastro de produtos não é integrada, sendo necessário replicar manualmente a inserção de imagens descritivas.'
                ];

                doc.setFontSize(9);
                doc.setFont(FONT_REGULAR, 'normal');
                if (mediumGrayRgbBling) {
                    doc.setTextColor(mediumGrayRgbBling.r, mediumGrayRgbBling.g, mediumGrayRgbBling.b);
                }
                for (const item of limitacoes) {
                    await checkPageBreak(8);
                    const lines = doc.splitTextToSize(`• ${item}`, PAGE_WIDTH - MARGIN * 2 - 10);
                    doc.text(lines, MARGIN + 5, y);
                    y += lines.length * 4.5;
                }
                y += 10;
            }

            // Mensagem de Encerramento (Melhorado)
            // Se for plano Bling, a mensagem já está na última página do Bling
            // Se não for, precisa verificar se há espaço na página atual
            if (!this.selectedPlan || this.selectedPlan.name !== 'Plano Bling') {
                await checkPageBreak(25);
            }
            drawBlueSeparator(doc, y);
            y += 10;

            doc.setFontSize(10);
            doc.setFont(FONT_REGULAR, 'normal');
            const darkGrayRgbFinal = hexToRgb(DARK_GRAY);
            if (darkGrayRgbFinal) {
                doc.setTextColor(darkGrayRgbFinal.r, darkGrayRgbFinal.g, darkGrayRgbFinal.b);
            }
            doc.text('Agradecemos a sua atenção e estamos à disposição para quaisquer dúvidas.', MARGIN, y);
            y += 7;

            doc.setFont(FONT_BOLD, 'bold');
            doc.text('Atenciosamente,', MARGIN, y);
            y += 6;
            doc.setFontSize(11);
            const accentRgbFinal = hexToRgb(ACCENT_COLOR);
            if (accentRgbFinal) {
                doc.setTextColor(accentRgbFinal.r, accentRgbFinal.g, accentRgbFinal.b);
            }
            doc.text('Equipe ConnectPlug', MARGIN, y);
            y += 10;

            // Rodapé
            drawFooter(doc);
            
            const fileName = `Proposta-${this.clientName.replace(/ /g, '_')}-${generationDate}.pdf`;
            doc.save(fileName);
            
            // Mostra animação de sucesso
            this.showPdfSuccess = true;
            setTimeout(() => {
                this.showPdfSuccess = false;
            }, 3000); // Fecha automaticamente após 3 segundos
        },


        handleKeyPress(e) {
            if (this.showDiscountModal) return;
            const allSegments = Object.keys(this.planData); // Get all segments
            const currentSegmentIndex = allSegments.indexOf(this.selectedSegment);
            
            if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
                e.preventDefault();
                let newSegmentIndex = currentSegmentIndex;
                if (e.key === 'ArrowRight') {
                    newSegmentIndex = (currentSegmentIndex + 1) % allSegments.length;
                } else { // ArrowLeft
                    newSegmentIndex = (currentSegmentIndex - 1 + allSegments.length) % allSegments.length;
                }
                this.setSegment(allSegments[newSegmentIndex]);
                return; // Handle segment change, then return
            }

            const planKeys = Object.keys(this.planData[this.selectedSegment]);
            let currentIndex = planKeys.indexOf(this.selectedPlanKey);
            if (e.key === 'ArrowDown') {
                e.preventDefault();
                currentIndex = currentIndex === -1 ? 0 : (currentIndex + 1) % planKeys.length;
                this.selectPlan(planKeys[currentIndex]);
            } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                currentIndex = currentIndex === -1 ? planKeys.length - 1 : (currentIndex - 1 + planKeys.length) % planKeys.length;
                this.selectPlan(planKeys[currentIndex]);
            }
        }
    }
}
