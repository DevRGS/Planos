function quoteCalculator() {
    return {
        // --- Properties ---
        loggedIn: false, password: '', loginError: false, selectedSegment: 'food', selectedPlanKey: null, closingDate: (()=>{ const d=new Date(); d.setDate(d.getDate()+1); return d.toISOString().split('T')[0]; })(), searchQuery: '', activeModuleIndex: -1,
        showDiscountModal: false, isDiscountAuthorized: false, discountPassword: '', discountPasswordError: false, 
        // Proteção da Data de Fechamento
        showClosingDateModal: false, isClosingDateAuthorized: false, closingDatePassword: '', closingDatePasswordError: false, tempClosingDate: '',
        manualDiscountPercentage: 10, tempDiscountPercentage: 10, discountRuleError: '',
        courtesyModuleName: null,
        showLeadForm: false, leadCaptureSuccess: false, clientName: '', clientCPF: '', clientCNPJ: '', clientObservation: '', leadFormError: '',
        generatedCouponCode: '', annualSavings: 0, countdownTimer: null, countdownText: '',
        selectedYears: 1,

        noDiscountModules: new Set([
            "TEF", "Autoatendimento", "Smart TEF", "Programa de Fidelidade",
            "Delivery Direto Profissional", "Delivery Direto VIP", "Hub de Delivery", "Integração API", "Integração TAP"
        ]),

        planData: {
            food: {
                pdv: {
                    name: 'Plano PDV', basePrice: 221.11, baseUsers: 2, basePdvs: 1,
                    fixedModules: ['2x Usuários', '1x PDV - Frente de Caixa', '30 Notas Fiscais', 'Suporte Técnico - Via chamados', 'Relatório Básico'],
                    additionalUsers: { count: 0, price: 19.90, max: 1 }, additionalPdvs: { count: 0, price: 0, max: 0 },
                    optionalModules: [
                        // NOTE: Delivery module isn't in this plan, so dependencies won't work here. Added a placeholder 'Delivery' module for dependency logic.
                        { name: 'Delivery', price: 30.00, quantifiable: false, selected: false }, // Placeholder for dependency
                        { name: 'Hub de Delivery', price: 79.00, quantifiable: false, selected: false, requires: ['Delivery'] },
                        { name: 'Delivery Direto Básico', price: 99.00, quantifiable: false, selected: false, requires: ['Hub de Delivery'] },
                        { name: 'Delivery Direto Profissional', price: 200.00, quantifiable: false, selected: false, requires: ['Hub de Delivery'] },
                        { name: 'Delivery Direto VIP', price: 300.00, quantifiable: false, selected: false, requires: ['Hub de Delivery'] },
                        { name: 'TEF', price: 99.90, quantifiable: true, count: 0 }, { name: 'Importação de XML', price: 29.00, quantifiable: false, selected: false },
                        { name: 'Autoatendimento', price: 299.00, quantifiable: true, count: 0 }, { name: 'Contratos de cartões', price: 50.00, quantifiable: false, selected: false },
                        { name: 'Ordem de Serviço', price: 20.00, quantifiable: false, selected: false }, { name: 'Estoque em Grade', price: 40.00, quantifiable: false, selected: false },
                        { name: 'Conciliação Bancária', price: 50.00, quantifiable: false, selected: false },
                    ]
                },
                gestao: {
                    name: 'Plano Gestão', basePrice: 332.22, baseUsers: 3, basePdvs: 1, // Alterado basePdvs para 1
                    fixedModules: ['3x Usuários', '1x PDV - Frente de Caixa','Notas Fiscais Ilimitadas', 'Importação de XML', 'Painel Senha TV', 'Estoque em Grade', 'Financeiro, Estoque e Relatórios', 'Suporte Técnico - Via Chat', 'Delivery', 'Relatório KDS', 'Produção', 'Controle de Mesas'], // Alterado para 1x PDV
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
                        { name: 'TEF', price: 99.90, quantifiable: true, count: 0 }, { name: 'Programa de Fidelidade', price: 299.90, quantifiable: false, selected: false },
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
                        { name: 'Programa de Fidelidade', price: 299.90, quantifiable: false, selected: false },
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
                    fixedModules: ['5x Usuários', '2x PDV - Frente de Caixa', '3x Smart TEF', 'Produção', 'Promoções', 'Notas Fiscais Ilimitadas', 'Importação de XML', 'Ordem de Serviço', 'App Gestão CPlug', 'Painel de Senha TV', 'Painel de Senha Mobile', 'Controle de Mesas', 'Estoque em Grade', 'Marketing', 'Relatórios, Financeiro e Estoque', 'Relatório Dinâmico', 'Atualização em Tempo Real', 'Facilita NFE', 'Conciliação Bancária', 'Contratos de cartões e outros', 'Suporte Técnico Completo (Todos os canais)'],
                    additionalUsers: { count: 0, price: 19.90, max: 5 }, 
                    additionalPdvs: { count: 0, price: 59.90, max: 5 },
                    optionalModules: [
                        // Adicionando módulos de delivery para a lógica de dependência funcionar
                        { name: 'Delivery', price: 30.00, quantifiable: false, selected: false }, // Adicionado para consistência
                        { name: 'Hub de Delivery', price: 79.90, quantifiable: false, selected: false, requires: ['Delivery'] },
                        { name: 'Integração API', price: 199.90, quantifiable: false, selected: false }, 
                        { name: 'Integração TAP', price: 299.00, quantifiable: false, selected: false },
                        { name: 'Backup Realtime', price: 99.00, quantifiable: false, selected: false }, 
                        { name: 'Business Intelligence (BI)', price: 99.00, quantifiable: false, selected: false },
                        { name: 'Programa de Fidelidade', price: 299.90, quantifiable: false, selected: false }, 
                        { name: 'Cardápio digital', price: 99.00, quantifiable: false, selected: false },
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
        },
        
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

        get summary() {
            if (!this.selectedPlan) return { base: 0, addons: 0, optionals: 0, subtotal: 0, courtesyValue: 0, calculatedDiscountAmount: 0, totalReduction: 0, finalTotal: 0, effectivePercentage: 0 };
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
            
            const calculatedDiscountAmount = amountEligibleForPercentageDiscount * (this.manualDiscountPercentage / 100);
            const totalReduction = courtesyValue + calculatedDiscountAmount;
            const finalTotal = subtotal - totalReduction;
            const effectivePercentage = subtotal > 0 ? (totalReduction / subtotal) * 100 : 0;

            return { 
                base, 
                addons, 
                optionals, 
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

        applyManualDiscount() {
            this.discountRuleError = '';
            if (this.tempDiscountPercentage > 20) {
                this.discountRuleError = 'O desconto máximo permitido é de 20%.';
                return;
            }
            if (this.tempDiscountPercentage < 0) this.tempDiscountPercentage = 0;
            this.manualDiscountPercentage = this.tempDiscountPercentage;
            this.showDiscountModal = false;
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

            // --- Configurações de Design ---
            const MARGIN = 20;
            const PAGE_WIDTH = doc.internal.pageSize.width;
            const PAGE_HEIGHT = doc.internal.pageSize.height;
            const FONT_REGULAR = 'helvetica';
            const FONT_BOLD = 'helvetica';
            const ACCENT_COLOR = '#2563EB'; // Azul corporativo
            const DARK_GRAY = '#374151';
            const MEDIUM_GRAY = '#6B7280';
            const LIGHT_GRAY = '#F3F4F6';
            const HEADER_HEIGHT = 20;
            const FOOTER_HEIGHT = 15;
            let y = HEADER_HEIGHT + 15;
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

            // --- Funções de Desenho ---
            const drawHeader = async (doc) => { // Tornando a função assíncrona
                const LOGO_URL = 'https://manual.cplug.com.br/uploads/images/system/2021-02/kFDdmOgun4T92suN-LOGO-PNG.png';
                const LOGO_WIDTH = 40; 
                const LOGO_HEIGHT = 15; 
                const LOGO_X = MARGIN;
                const LOGO_Y = (HEADER_HEIGHT - LOGO_HEIGHT) / 2; // Centraliza verticalmente

                doc.setFillColor('#000000'); // Fundo preto para o cabeçalho
                doc.rect(0, 0, PAGE_WIDTH, HEADER_HEIGHT, 'F');
                
                // Adiciona a imagem da logo
                try {
                    const imageDataUrl = await getImageDataUrl(LOGO_URL);
                    doc.addImage(imageDataUrl, 'PNG', LOGO_X, LOGO_Y, LOGO_WIDTH, LOGO_HEIGHT);
                } catch (error) {
                    console.error("Não foi possível adicionar a logo ao PDF:", error);
                    // Opcional: Adicionar um texto placeholder ou apenas ignorar a imagem
                }

                doc.setFontSize(12);
                doc.setTextColor(255, 255, 255);
                doc.setFont(FONT_BOLD, 'bold');
                // Ajusta a posição do texto para ficar após a logo
                doc.text('ConnectPlug', LOGO_X + LOGO_WIDTH + 5, 13); // 5 unidades de espaçamento após a logo
                doc.setFontSize(10);
                doc.setFont(FONT_REGULAR, 'normal');
                doc.text('Proposta Comercial', PAGE_WIDTH - MARGIN, 13, { align: 'right' });
            };

            const drawFooter = (doc) => {
                doc.setFillColor(DARK_GRAY);
                doc.rect(0, PAGE_HEIGHT - FOOTER_HEIGHT, PAGE_WIDTH, FOOTER_HEIGHT, 'F');
                doc.setFontSize(8);
                doc.setTextColor(255, 255, 255);
                doc.setFont(FONT_REGULAR, 'normal');
                doc.text('ConnectPlug - Soluções Inteligentes para o seu negócio', MARGIN, PAGE_HEIGHT - 6);
                doc.text(`Proposta gerada em ${generationDate}`, PAGE_WIDTH - MARGIN, PAGE_HEIGHT - 6, { align: 'right' });
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

            // Título Principal
            doc.setFontSize(22);
            doc.setFont(FONT_BOLD, 'bold');
            doc.setTextColor(DARK_GRAY);
            doc.text('Proposta de Solução de Software', MARGIN, y);
            y += 10;
            
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

            // Seção: Dados do Cliente
            await checkPageBreak(40);
            doc.setFontSize(14);
            doc.setFont(FONT_BOLD, 'bold');
            doc.setTextColor(DARK_GRAY);
            doc.text('DADOS DO CLIENTE', MARGIN, y);
            y += 8;

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

            // Seção: Resumo da Proposta
            await checkPageBreak(50);
            doc.setFontSize(14);
            doc.setFont(FONT_BOLD, 'bold');
            doc.setTextColor(DARK_GRAY);
            doc.text('RESUMO DA PROPOSTA', MARGIN, y);
            y += 8;

            // Card Principal (Plano + Valor Final)
            doc.setFillColor(LIGHT_GRAY);
            doc.roundedRect(MARGIN, y, PAGE_WIDTH - MARGIN * 2, 30, 3, 3, 'F');
            
            doc.setFontSize(11);
            doc.setFont(FONT_REGULAR, 'normal');
            doc.setTextColor(DARK_GRAY);
            doc.text(`Plano: ${this.selectedPlan.name}`, MARGIN + 5, y + 10);
            doc.text(`Segmento: ${this.selectedSegment === 'food' ? 'Food Service' : (this.selectedSegment === 'varejo' ? 'Varejo' : 'Outros')}`, MARGIN + 5, y + 17);
            
            doc.setFont(FONT_REGULAR, 'normal');
            doc.text('VALOR MENSAL', PAGE_WIDTH - MARGIN - 5, y + 10, { align: 'right' });
            doc.setFontSize(22);
            doc.setFont(FONT_BOLD, 'bold');
            doc.setTextColor(ACCENT_COLOR);
            doc.text(`R$ ${this.summary.finalTotal.toFixed(2).replace('.', ',')}`, PAGE_WIDTH - MARGIN - 5, y + 20, { align: 'right' });
            y += 35;

            // Detalhamento de Valores
            doc.setFontSize(10);
            doc.setFont(FONT_REGULAR, 'normal');
            doc.setTextColor(MEDIUM_GRAY);
            doc.text(`Subtotal: R$ ${this.summary.subtotal.toFixed(2).replace('.', ',')}`, PAGE_WIDTH - MARGIN, y, { align: 'right' });
            y += 5;
            if (this.summary.courtesyValue > 0) {
                doc.text(`Cortesia (${this.courtesyModuleName}): - R$ ${this.summary.courtesyValue.toFixed(2).replace('.', ',')}`, PAGE_WIDTH - MARGIN, y, { align: 'right' });
                y += 5;
            }
            if (this.summary.calculatedDiscountAmount > 0) {
                doc.text(`Desconto (${this.manualDiscountPercentage.toFixed(2).replace('.', ',')}%): - R$ ${this.summary.calculatedDiscountAmount.toFixed(2).replace('.', ',')}`, PAGE_WIDTH - MARGIN, y, { align: 'right' });
                y += 5;
            }
            y += 10;

            // Seção: Condições Especiais (se houver)
            if (this.summary.totalReduction > 0) {
                await checkPageBreak(50);
                doc.setFontSize(14);
                doc.setFont(FONT_BOLD, 'bold');
                doc.setTextColor(DARK_GRAY);
                doc.text('CONDIÇÕES ESPECIAIS', MARGIN, y);
                y += 8;

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

            // Seção: Módulos Inclusos
            await checkPageBreak(100); // Estimativa de espaço para o título e alguns itens
            doc.setFontSize(14);
            doc.setFont(FONT_BOLD, 'bold');
            doc.setTextColor(DARK_GRAY);
            doc.text('MÓDULOS INCLUSOS', MARGIN, y);
            y += 8;

            doc.setFontSize(10);
            doc.setFont(FONT_BOLD, 'bold');
            doc.setTextColor(DARK_GRAY);
            doc.text('Módulos Fixos do Plano:', MARGIN, y);
            y += 5;
            doc.setFont(FONT_REGULAR, 'normal');
            doc.setTextColor(MEDIUM_GRAY);
            for (const item of this.selectedPlan.fixedModules) { // Usando for...of para await
                await checkPageBreak(5);
                doc.text(`• ${item}`, MARGIN + 5, y);
                y += 5;
            }
            y += 5;

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
                        doc.setTextColor(ACCENT_COLOR); // Cor diferente para cortesia
                    } else {
                        moduleText += ` (R$ ${mod.price.toFixed(2).replace('.', ',')})`;
                        doc.setTextColor(MEDIUM_GRAY);
                    }
                    doc.text(moduleText, MARGIN + 5, y);
                    y += 5;
                }
                y += 5;
            }

            // Mensagem de Encerramento
            await checkPageBreak(20);
            doc.setFontSize(10);
            doc.setFont(FONT_REGULAR, 'normal');
            doc.setTextColor(DARK_GRAY);
            doc.text('Agradecemos a sua atenção e estamos à disposição para quaisquer dúvidas.', MARGIN, y);
            y += 5;
            doc.text('Atenciosamente,', MARGIN, y);
            y += 5;
            doc.text('Equipe ConnectPlug', MARGIN, y);
            y += 10;

            // Rodapé
            drawFooter(doc);
            
            const fileName = `Proposta-${this.clientName.replace(/ /g, '_')}-${generationDate}.pdf`;
            doc.save(fileName);
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
