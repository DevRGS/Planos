// Gerado a partir de novoPlanos.js — não editar à mão; rode: node build-planos-data.mjs
/** Mercados: Food, Varejo, Outros (Bling / Autoatendimento) */
const MARKET_SEGMENTS = [
  { id: 'food', label: 'Food' },
  { id: 'varejo', label: 'Varejo' },
  { id: 'outros', label: 'Outros' },
];

const PLAN_FAMILIES = [
  { id: 'balcao', label: 'Planos Balcão' },
  { id: 'delivery', label: 'Planos Delivery' },
  { id: 'deliveryBalcao', label: 'Planos Delivery + Balcão' },
];

/** Planos Varejo (uma linha por opção) — detalhes em planos-varejo-data.mjs */
const VAREJO_PLAN_OPTIONS = [
  { id: 'pdv', label: 'PDV Básico' },
  { id: 'gestao', label: 'Plano Gestão' },
  { id: 'performance', label: 'Plano Performance' },
];

/** Planos Outros (Bling / Autoatendimento) — dados em PLAN_DATA_FOOD.outros */
const OUTROS_PLAN_OPTIONS = [
  { id: 'bling', label: 'Plano Bling' },
  { id: 'autoatendimento', label: 'Autoatendimento' },
];

const PLAN_DATA_FOOD = {
    balcao: {
        basico: {
            name: "Balcão Básico",
            apiPackageId: 41,
            basePrice: 249,
            baseUsers: 2,
            basePdvs: 1,
            fixedModules: [
                "1x PDV - Frente de Caixa",
                "Relatório Básico",
                "Relatório KDS",
                "Importação de XML",
                "Controle de Mesas",
                "2x Usuários",
                "Suporte Técnico - Via chamados",
                "Notas Fiscais Ilimitadas"
            ],
            additionalUsers: {
                count: 0,
                price: 20,
                max: Infinity
            },
            additionalPdvs: {
                count: 0,
                price: 59.9,
                max: Infinity
            },
            optionalModules: [
                {
                    name: "Smart TEF",
                    price: 99,
                    quantifiable: true,
                    selected: false,
                    count: 0
                },
                {
                    name: "TEF",
                    price: 99,
                    quantifiable: true,
                    selected: false,
                    count: 0
                },
                {
                    name: "Contratos de cartões e outros",
                    price: 50,
                    quantifiable: false,
                    selected: false
                },
                {
                    name: "Terminais Autoatendimento",
                    price: 299,
                    quantifiable: true,
                    selected: false,
                    count: 0,
                    max: Infinity
                }
            ],
            tier: "basico",
            highlight: false,
            pricing: {
                mensal: {
                    preco: 249,
                    taxa_adesao: 250
                },
                anual: {
                    preco: 199,
                    taxa_adesao: 0
                }
            }
        },
        gestao: {
            name: "Balcão Gestão",
            apiPackageId: 40,
            basePrice: 499,
            baseUsers: 3,
            basePdvs: 3,
            fixedModules: [
                "3x Usuários",
                "Relatório KDS",
                "Importação de XML",
                "Produção",
                "Painel Senha TV",
                "Painel Senha Mobile",
                "Marketing",
                "Atualização em tempo real",
                "Controle de Mesas",
                "Cardápio digital",
                "Relatórios",
                "Contratos de cartões e outros",
                "Suporte Técnico - Via chamados",
                "Suporte Técnico - Via chat",
                "Suporte Técnico - Estendido",
                "Notas Fiscais Ilimitadas",
                "3x PDV - Frente de Caixa",
                "Estoque em Grade"
            ],
            additionalUsers: {
                count: 0,
                price: 20,
                max: Infinity
            },
            additionalPdvs: {
                count: 0,
                price: 59.9,
                max: Infinity
            },
            optionalModules: [
                {
                    name: "Smart TEF",
                    price: 49,
                    quantifiable: true,
                    selected: false,
                    count: 0
                },
                {
                    name: "TEF",
                    price: 99,
                    quantifiable: true,
                    selected: false,
                    count: 0
                },
                {
                    name: "Facilita NFE",
                    price: 99,
                    quantifiable: false,
                    selected: false
                },
                {
                    name: "Conciliação Bancária",
                    price: 50,
                    quantifiable: false,
                    selected: false
                },
                {
                    name: "Relatório Dinâmico",
                    price: 50,
                    quantifiable: false,
                    selected: false
                },
                {
                    name: "Business Intelligence (BI)",
                    price: 199,
                    quantifiable: false,
                    selected: false
                },
                {
                    name: "Terminais Autoatendimento",
                    price: 299,
                    quantifiable: true,
                    selected: false,
                    count: 0,
                    max: Infinity
                }
            ],
            tier: "gestao",
            highlight: true,
            pricing: {
                mensal: {
                    preco: 499,
                    taxa_adesao: 250
                },
                anual: {
                    preco: 399,
                    taxa_adesao: 0
                }
            }
        },
        avancado: {
            name: "Balcão Avançado",
            apiPackageId: 39,
            basePrice: 699,
            baseUsers: 5,
            basePdvs: 4,
            fixedModules: [
                "Estoque em Grade",
                "5x Usuários",
                "Relatório KDS",
                "Importação de XML",
                "Produção",
                "Painel Senha TV",
                "Painel Senha Mobile",
                "Marketing",
                "Promoções",
                "App Gestão CPlug",
                "Atualização em tempo real",
                "Backup Realtime",
                "Controle de Mesas",
                "Smart Menu",
                "Cardápio digital",
                "Integração Tap",
                "Relatórios",
                "Contratos de cartões e outros",
                "Facilita NFE",
                "Conciliação Bancária",
                "Relatório Dinâmico",
                "Suporte Técnico - Via chamados",
                "Suporte Técnico - Via chat",
                "Suporte Técnico - Estendido",
                "Notas Fiscais Ilimitadas",
                "4x PDV - Frente de Caixa"
            ],
            additionalUsers: {
                count: 0,
                price: 20,
                max: Infinity
            },
            additionalPdvs: {
                count: 0,
                price: 59.9,
                max: Infinity
            },
            optionalModules: [
                {
                    name: "Programa de Fidelidade",
                    price: 299.9,
                    quantifiable: false,
                    selected: false,
                    setupCost: 1000
                },
                {
                    name: "TEF",
                    price: 99,
                    quantifiable: true,
                    selected: false,
                    count: 0
                },
                {
                    name: "Business Intelligence (BI)",
                    price: 99,
                    quantifiable: false,
                    selected: false
                },
                {
                    name: "Integração API",
                    price: 299,
                    quantifiable: false,
                    selected: false
                },
                {
                    name: "Terminais Autoatendimento",
                    price: 299,
                    quantifiable: true,
                    selected: false,
                    count: 0,
                    max: Infinity
                }
            ],
            tier: "avancado",
            highlight: false,
            pricing: {
                mensal: {
                    preco: 699,
                    taxa_adesao: 250
                },
                anual: {
                    preco: 549,
                    taxa_adesao: 0
                }
            }
        }
    },
    delivery: {
        basico: {
            name: "Delivery Básico",
            apiPackageId: 44,
            basePrice: 249,
            baseUsers: 2,
            basePdvs: 1,
            fixedModules: [
                "Pedidos masketplace delivery mês",
                "1x PDV - Frente de Caixa",
                "Delivery Direto Básico",
                "Relatório Básico",
                "Relatório KDS",
                "Importação de XML",
                "2x Usuários",
                "Delivery",
                "Hub de Delivery",
                "Suporte Técnico - Via chamados",
                "Notas Fiscais Ilimitadas"
            ],
            additionalUsers: {
                count: 0,
                price: 20,
                max: Infinity
            },
            additionalPdvs: {
                count: 0,
                price: 59.9,
                max: Infinity
            },
            optionalModules: [
                {
                    name: "TEF",
                    price: 99,
                    quantifiable: true,
                    selected: false,
                    count: 0
                }
            ],
            tier: "basico",
            highlight: false,
            pricing: {
                mensal: {
                    preco: 249,
                    taxa_adesao: 250
                },
                anual: {
                    preco: 199,
                    taxa_adesao: 0
                }
            }
        },
        gestao: {
            name: "Delivery Gestão",
            apiPackageId: 43,
            basePrice: 499,
            baseUsers: 3,
            basePdvs: 1,
            fixedModules: [
                "Delivery Direto Profissional",
                "3x Usuários",
                "Relatório KDS",
                "Importação de XML",
                "Produção",
                "Painel Senha TV",
                "Painel Senha Mobile",
                "Marketing",
                "Delivery",
                "Hub de Delivery",
                "Relatórios",
                "Suporte Técnico - Via chamados",
                "Suporte Técnico - Via chat",
                "Suporte Técnico - Estendido",
                "Notas Fiscais Ilimitadas",
                "Pedidos masketplace delivery mês",
                "Estoque em Grade",
                "1x PDV - Frente de Caixa"
            ],
            additionalUsers: {
                count: 0,
                price: 20,
                max: Infinity
            },
            additionalPdvs: {
                count: 0,
                price: 59.9,
                max: Infinity
            },
            optionalModules: [
                {
                    name: "TEF",
                    price: 99,
                    quantifiable: true,
                    selected: false,
                    count: 0
                },
                {
                    name: "Facilita NFE",
                    price: 99,
                    quantifiable: false,
                    selected: false
                },
                {
                    name: "Conciliação Bancária",
                    price: 50,
                    quantifiable: false,
                    selected: false
                },
                {
                    name: "Relatório Dinâmico",
                    price: 50,
                    quantifiable: false,
                    selected: false
                },
                {
                    name: "Business Intelligence (BI)",
                    price: 199,
                    quantifiable: false,
                    selected: false
                },
                {
                    name: "Contratos de cartões e outros",
                    price: 50,
                    quantifiable: false,
                    selected: false
                },
                {
                    name: "Smart TEF",
                    price: 50,
                    quantifiable: true,
                    selected: false,
                    count: 0
                }
            ],
            tier: "gestao",
            highlight: true,
            pricing: {
                mensal: {
                    preco: 499,
                    taxa_adesao: 250
                },
                anual: {
                    preco: 399,
                    taxa_adesao: 0
                }
            }
        },
        avancado: {
            name: "Delivery Avançado",
            apiPackageId: 42,
            basePrice: 699,
            baseUsers: 5,
            basePdvs: 1,
            fixedModules: [
                "Estoque em Grade",
                "5x Usuários",
                "Relatório KDS",
                "Importação de XML",
                "Produção",
                "Painel Senha TV",
                "Painel Senha Mobile",
                "Marketing",
                "Promoções",
                "App Gestão CPlug",
                "Atualização em tempo real",
                "Delivery",
                "Hub de Delivery",
                "Delivery Direto VIP",
                "Relatórios",
                "Contratos de cartões e outros",
                "Facilita NFE",
                "Conciliação Bancária",
                "Relatório Dinâmico",
                "Suporte Técnico - Via chamados",
                "Suporte Técnico - Via chat",
                "Suporte Técnico - Estendido",
                "Pedidos masketplace delivery mês",
                "Notas Fiscais Ilimitadas",
                "1x PDV - Frente de Caixa"
            ],
            additionalUsers: {
                count: 0,
                price: 20,
                max: Infinity
            },
            additionalPdvs: {
                count: 0,
                price: 59.9,
                max: Infinity
            },
            optionalModules: [
                {
                    name: "Programa de Fidelidade",
                    price: 299.9,
                    quantifiable: false,
                    selected: false,
                    setupCost: 1000
                },
                {
                    name: "TEF",
                    price: 99,
                    quantifiable: true,
                    selected: false,
                    count: 0
                },
                {
                    name: "Business Intelligence (BI)",
                    price: 99,
                    quantifiable: false,
                    selected: false
                },
                {
                    name: "Integração API",
                    price: 299,
                    quantifiable: false,
                    selected: false
                }
            ],
            tier: "avancado",
            highlight: false,
            pricing: {
                mensal: {
                    preco: 699,
                    taxa_adesao: 250
                },
                anual: {
                    preco: 549,
                    taxa_adesao: 0
                }
            }
        }
    },
    deliveryBalcao: {
        basico: {
            name: "Delivery & Balcão Básico",
            apiPackageId: 38,
            basePrice: 299,
            baseUsers: 2,
            basePdvs: 1,
            fixedModules: [
                "Pedidos masketplace delivery mês",
                "1x PDV - Frente de Caixa",
                "Delivery Direto Básico",
                "Relatório Básico",
                "Relatório KDS",
                "Importação de XML",
                "Controle de Mesas",
                "2x Usuários",
                "Delivery",
                "Hub de Delivery",
                "Suporte Técnico - Via chamados",
                "Notas Fiscais Ilimitadas"
            ],
            additionalUsers: {
                count: 0,
                price: 20,
                max: Infinity
            },
            additionalPdvs: {
                count: 0,
                price: 59.9,
                max: Infinity
            },
            optionalModules: [
                {
                    name: "Smart TEF",
                    price: 99,
                    quantifiable: true,
                    selected: false,
                    count: 0
                },
                {
                    name: "TEF",
                    price: 99,
                    quantifiable: true,
                    selected: false,
                    count: 0
                },
                {
                    name: "Contratos de cartões e outros",
                    price: 50,
                    quantifiable: false,
                    selected: false
                }
            ],
            tier: "basico",
            highlight: false,
            pricing: {
                mensal: {
                    preco: 299,
                    taxa_adesao: 250
                },
                anual: {
                    preco: 249,
                    taxa_adesao: 0
                }
            }
        },
        gestao: {
            name: "Delivery & Balcão Gestão",
            apiPackageId: 37,
            basePrice: 599,
            baseUsers: 3,
            basePdvs: 3,
            fixedModules: [
                "Delivery Direto Profissional",
                "3x Usuários",
                "Relatório KDS",
                "Importação de XML",
                "Produção",
                "Painel Senha TV",
                "Painel Senha Mobile",
                "Marketing",
                "Atualização em tempo real",
                "Controle de Mesas",
                "Cardápio digital",
                "Delivery",
                "Hub de Delivery",
                "Relatórios",
                "Contratos de cartões e outros",
                "Suporte Técnico - Via chamados",
                "Suporte Técnico - Via chat",
                "Suporte Técnico - Estendido",
                "Notas Fiscais Ilimitadas",
                "Pedidos masketplace delivery mês",
                "3x PDV - Frente de Caixa",
                "Estoque em Grade"
            ],
            additionalUsers: {
                count: 0,
                price: 20,
                max: Infinity
            },
            additionalPdvs: {
                count: 0,
                price: 59.9,
                max: Infinity
            },
            optionalModules: [
                {
                    name: "Smart TEF",
                    price: 49,
                    quantifiable: true,
                    selected: false,
                    count: 0
                },
                {
                    name: "TEF",
                    price: 99,
                    quantifiable: true,
                    selected: false,
                    count: 0
                },
                {
                    name: "Facilita NFE",
                    price: 99,
                    quantifiable: false,
                    selected: false
                },
                {
                    name: "Conciliação Bancária",
                    price: 50,
                    quantifiable: false,
                    selected: false
                },
                {
                    name: "Relatório Dinâmico",
                    price: 50,
                    quantifiable: false,
                    selected: false
                },
                {
                    name: "Business Intelligence (BI)",
                    price: 199,
                    quantifiable: false,
                    selected: false
                },
                {
                    name: "Terminais Autoatendimento",
                    price: 299,
                    quantifiable: true,
                    selected: false,
                    count: 0,
                    max: Infinity
                }
            ],
            tier: "gestao",
            highlight: true,
            pricing: {
                mensal: {
                    preco: 599,
                    taxa_adesao: 250
                },
                anual: {
                    preco: 499,
                    taxa_adesao: 0
                }
            }
        },
        avancado: {
            name: "Delivery & Balcão Avançado",
            apiPackageId: 36,
            basePrice: 849,
            baseUsers: 5,
            basePdvs: 4,
            fixedModules: [
                "Estoque em Grade",
                "5x Usuários",
                "Relatório KDS",
                "Importação de XML",
                "Produção",
                "Painel Senha TV",
                "Painel Senha Mobile",
                "Marketing",
                "Promoções",
                "App Gestão CPlug",
                "Atualização em tempo real",
                "Backup Realtime",
                "Controle de Mesas",
                "Smart Menu",
                "Cardápio digital",
                "Integração Tap",
                "Delivery",
                "Hub de Delivery",
                "Delivery Direto VIP",
                "Relatórios",
                "Contratos de cartões e outros",
                "Facilita NFE",
                "Conciliação Bancária",
                "Relatório Dinâmico",
                "Suporte Técnico - Via chamados",
                "Suporte Técnico - Via chat",
                "Suporte Técnico - Estendido",
                "4x PDV - Frente de Caixa",
                "Pedidos masketplace delivery mês",
                "Notas Fiscais Ilimitadas"
            ],
            additionalUsers: {
                count: 0,
                price: 20,
                max: Infinity
            },
            additionalPdvs: {
                count: 0,
                price: 59.9,
                max: Infinity
            },
            optionalModules: [
                {
                    name: "Programa de Fidelidade",
                    price: 299.9,
                    quantifiable: false,
                    selected: false,
                    setupCost: 1000
                },
                {
                    name: "TEF",
                    price: 99,
                    quantifiable: true,
                    selected: false,
                    count: 0
                },
                {
                    name: "Business Intelligence (BI)",
                    price: 99,
                    quantifiable: false,
                    selected: false
                },
                {
                    name: "Integração API",
                    price: 299,
                    quantifiable: false,
                    selected: false
                },
                {
                    name: "Terminais Autoatendimento",
                    price: 299,
                    quantifiable: true,
                    selected: false,
                    count: 0,
                    max: Infinity
                }
            ],
            tier: "avancado",
            highlight: false,
            pricing: {
                mensal: {
                    preco: 849,
                    taxa_adesao: 250
                },
                anual: {
                    preco: 699,
                    taxa_adesao: 0
                }
            }
        }
    },
    outros: {
        bling: {
            name: "Plano Bling",
            apiPackageId: 11,
            basePrice: 276.67,
            baseUsers: 2,
            basePdvs: 1,
            fixedModules: [
                "Estoque em Grade",
                "Notas Fiscais Ilimitadas",
                "Relatórios",
                "Suporte Técnico - Via chamados",
                "Suporte Técnico - Via chat",
                "1x PDV - Frente de Caixa",
                "2x Usuários"
            ],
            additionalUsers: {
                count: 0,
                price: 20,
                max: 100
            },
            additionalPdvs: {
                count: 0,
                price: 59.9,
                max: 100
            },
            optionalModules: [
                {
                    name: "Hub de Delivery",
                    price: 99.9,
                    quantifiable: false,
                    selected: false,
                    requires: [
                        "Delivery"
                    ]
                },
                {
                    name: "Controle de Mesas",
                    price: 49,
                    quantifiable: false,
                    selected: false
                },
                {
                    name: "Terminais Autoatendimento",
                    price: 299,
                    quantifiable: true,
                    selected: false,
                    count: 0,
                    max: Infinity
                },
                {
                    name: "TEF",
                    price: 99.9,
                    quantifiable: true,
                    selected: false,
                    count: 0
                },
                {
                    name: "Contratos de cartões e outros",
                    price: 49.9,
                    quantifiable: false,
                    selected: false
                },
                {
                    name: "Suporte Técnico - Estendido",
                    price: 99,
                    quantifiable: false,
                    selected: false
                },
                {
                    name: "Delivery",
                    price: 40,
                    quantifiable: false,
                    selected: false
                },
                {
                    name: "Smart TEF",
                    price: 49,
                    quantifiable: true,
                    selected: false,
                    count: 0
                }
            ]
        },
        autoatendimento: {
            name: "Plano Autoatendimento",
            apiPackageId: 16,
            basePrice: 332.5,
            baseUsers: 1,
            basePdvs: 0,
            fixedModules: [
                "Terminais Autoatendimento",
                "Suporte Técnico - Via chat",
                "Suporte Técnico - Via chamados",
                "Suporte Técnico - Estendido",
                "Contratos de cartões e outros",
                "Notas Fiscais Ilimitadas",
                "1x Usuários",
                "Relatório Básico"
            ],
            additionalUsers: {
                count: 0,
                price: 20,
                max: 10
            },
            additionalPdvs: {
                count: 0,
                price: 59.9,
                max: 0
            },
            optionalModules: [
                {
                    name: "Produção",
                    price: 30,
                    quantifiable: false,
                    selected: false
                },
                {
                    name: "Atualização em tempo real",
                    price: 49.9,
                    quantifiable: false,
                    selected: false
                },
                {
                    name: "Importação de XML",
                    price: 30,
                    quantifiable: false,
                    selected: false
                },
                {
                    name: "Facilita NFE",
                    price: 50,
                    quantifiable: false,
                    selected: false
                },
                {
                    name: "Promoções",
                    price: 24.9,
                    quantifiable: false,
                    selected: false
                },
                {
                    name: "Estoque em Grade",
                    price: 40,
                    quantifiable: false,
                    selected: false
                },
                {
                    name: "Business Intelligence (BI)",
                    price: 200,
                    quantifiable: false,
                    selected: false
                }
            ]
        }
    }
};

/** Mercado Varejo — gerado a partir de planos-varejo-data.mjs */
const PLAN_DATA_VAREJO = {
    pdv: {
        name: "PDV Básico",
        basePrice: 221.11,
        baseUsers: 2,
        basePdvs: 1,
        fixedModules: [
            "2x Usuários",
            "1x PDV - Frente de Caixa",
            "30 Notas Fiscais",
            "Suporte Técnico - Via Chamados",
            "Relatório Básico"
        ],
        additionalUsers: {
            count: 0,
            price: 19.9,
            max: 1
        },
        additionalPdvs: {
            count: 0,
            price: 0,
            max: 0
        },
        optionalModules: [
            {
                name: "TEF",
                price: 99.9,
                quantifiable: true,
                count: 0
            },
            {
                name: "Autoatendimento",
                price: 299,
                quantifiable: true,
                count: 0
            },
            {
                name: "Delivery",
                price: 30,
                quantifiable: false,
                selected: false
            },
            {
                name: "Hub de Delivery",
                price: 79,
                quantifiable: false,
                selected: false,
                requires: [
                    "Delivery"
                ]
            },
            {
                name: "Importação de XML",
                price: 29,
                quantifiable: false,
                selected: false
            },
            {
                name: "Estoque em Grade",
                price: 40,
                quantifiable: false,
                selected: false
            },
            {
                name: "Contratos de cartões e outros",
                price: 50,
                quantifiable: false,
                selected: false
            },
            {
                name: "Ordem de Serviço",
                price: 40,
                quantifiable: false,
                selected: false
            }
        ],
        tier: "pdv",
        highlight: false
    },
    gestao: {
        name: "Plano Gestão",
        basePrice: 332.22,
        baseUsers: 3,
        basePdvs: 1,
        fixedModules: [
            "3x Usuários",
            "1x PDV - Frente de Caixa",
            "Notas Fiscais Ilimitadas",
            "Importação de XML",
            "Estoque em Grade",
            "Financeiro, Estoque e Relatórios",
            "Suporte Técnico - Via Chat",
            "Facilita NFE",
            "Contratos de cartões e outros",
            "Promoções"
        ],
        additionalUsers: {
            count: 0,
            price: 19.9,
            max: 2
        },
        additionalPdvs: {
            count: 0,
            price: 59.9,
            max: 2
        },
        optionalModules: [
            {
                name: "Delivery",
                price: 30,
                quantifiable: false,
                selected: false
            },
            {
                name: "Hub de Delivery",
                price: 79.9,
                quantifiable: false,
                selected: false,
                requires: [
                    "Delivery"
                ]
            },
            {
                name: "Delivery Direto Básico",
                price: 99,
                quantifiable: false,
                selected: false,
                requires: [
                    "Hub de Delivery"
                ]
            },
            {
                name: "Delivery Direto Profissional",
                price: 200,
                quantifiable: false,
                selected: false,
                requires: [
                    "Hub de Delivery"
                ]
            },
            {
                name: "Delivery Direto VIP",
                price: 300,
                quantifiable: false,
                selected: false,
                requires: [
                    "Hub de Delivery"
                ]
            },
            {
                name: "TEF",
                price: 99.9,
                quantifiable: true,
                count: 0
            },
            {
                name: "Smart TEF",
                price: 49.9,
                quantifiable: true,
                count: 0
            },
            {
                name: "Autoatendimento",
                price: 299,
                quantifiable: true,
                count: 0
            },
            {
                name: "Integração API",
                price: 199.9,
                quantifiable: false,
                selected: false
            },
            {
                name: "Suporte Técnico - Estendido",
                price: 99,
                quantifiable: false,
                selected: false
            },
            {
                name: "Conciliação Bancária",
                price: 50,
                quantifiable: false,
                selected: false
            },
            {
                name: "Programa de Fidelidade",
                price: 299.9,
                setupCost: 1000,
                quantifiable: false,
                selected: false
            },
            {
                name: "Painel Senha",
                price: 49.9,
                quantifiable: false,
                selected: false
            },
            {
                name: "Relatório Dinâmico",
                price: 50,
                quantifiable: false,
                selected: false
            },
            {
                name: "Backup Realtime",
                price: 199,
                quantifiable: false,
                selected: false
            },
            {
                name: "Business Intelligence (BI)",
                price: 199,
                quantifiable: false,
                selected: false
            },
            {
                name: "App Gestão CPlug",
                price: 20,
                quantifiable: false,
                selected: false
            },
            {
                name: "Marketing",
                price: 24.5,
                quantifiable: false,
                selected: false
            },
            {
                name: "Produção",
                price: 30,
                quantifiable: false,
                selected: false
            },
            {
                name: "Ordem de Serviço",
                price: 20,
                quantifiable: false,
                selected: false
            },
            {
                name: "Controle de Mesas",
                price: 49,
                quantifiable: false,
                selected: false
            },
            {
                name: "Atualização em Tempo Real",
                price: 49,
                quantifiable: false,
                selected: false
            }
        ],
        tier: "gestao",
        highlight: true
    },
    performance: {
        name: "Plano Performance",
        basePrice: 443.33,
        baseUsers: 5,
        basePdvs: 2,
        fixedModules: [
            "5x Usuários",
            "2x PDV - Frente de Caixa",
            "3x Smart TEF",
            "Produção",
            "Promoções",
            "Notas Fiscais Ilimitadas",
            "Importação de XML",
            "Ordem de Serviço",
            "App Gestão CPlug",
            "Painel de Senha TV",
            "Painel de Senha Mobile",
            "Controle de Mesas",
            "Delivery",
            "Estoque em Grade",
            "Marketing",
            "Relatórios, Financeiro e Estoque",
            "Relatório Dinâmico",
            "Atualização em Tempo Real",
            "Facilita NFE",
            "Conciliação Bancária",
            "Contratos de cartões e outros",
            "Suporte Técnico Completo (Todos os canais)"
        ],
        additionalUsers: {
            count: 0,
            price: 19.9,
            max: 5
        },
        additionalPdvs: {
            count: 0,
            price: 59.9,
            max: 5
        },
        optionalModules: [
            {
                name: "Hub de Delivery",
                price: 79.9,
                quantifiable: false,
                selected: false,
                requires: [
                    "Delivery"
                ]
            },
            {
                name: "Delivery Direto Básico",
                price: 99,
                quantifiable: false,
                selected: false,
                requires: [
                    "Hub de Delivery"
                ]
            },
            {
                name: "Delivery Direto Profissional",
                price: 200,
                quantifiable: false,
                selected: false,
                requires: [
                    "Hub de Delivery"
                ]
            },
            {
                name: "Delivery Direto VIP",
                price: 300,
                quantifiable: false,
                selected: false,
                requires: [
                    "Hub de Delivery"
                ]
            },
            {
                name: "Integração API",
                price: 199.9,
                quantifiable: false,
                selected: false
            },
            {
                name: "Integração TAP",
                price: 299,
                quantifiable: false,
                selected: false
            },
            {
                name: "Backup Realtime",
                price: 99,
                quantifiable: false,
                selected: false
            },
            {
                name: "Business Intelligence (BI)",
                price: 99,
                quantifiable: false,
                selected: false
            },
            {
                name: "Programa de Fidelidade",
                price: 299.9,
                setupCost: 1000,
                quantifiable: false,
                selected: false
            },
            {
                name: "Cardápio digital",
                price: 99,
                quantifiable: false,
                selected: false
            },
            {
                name: "Smart Menu",
                price: 99,
                quantifiable: false,
                selected: false
            },
            {
                name: "E-Mail Profissional",
                price: 19.9,
                quantifiable: false,
                selected: false
            },
            {
                name: "Entrega fácil iFood",
                price: 49.9,
                quantifiable: false,
                selected: false
            },
            {
                name: "Painel Multilojas",
                price: 199.9,
                quantifiable: false,
                selected: false
            },
            {
                name: "API DD",
                price: 49.9,
                quantifiable: false,
                selected: false
            },
            {
                name: "Central Telefônica",
                price: 399.9,
                setupCost: 500,
                quantifiable: false,
                selected: false
            }
        ],
        tier: "performance",
        highlight: false
    }
};

const PLAN_DATA = { food: PLAN_DATA_FOOD, varejo: PLAN_DATA_VAREJO };
