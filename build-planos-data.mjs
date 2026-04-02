import fs from 'fs';
import { PLAN_DATA_VAREJO } from './planos-varejo-data.mjs';

const SRC = new URL('./novoPlanos.js', import.meta.url);
const raw = fs.readFileSync(SRC, 'utf8');
const api = JSON.parse(raw);

const MAP_KEYS = [
  ['balcao', 'basico', 'Balcão Básico'],
  ['balcao', 'gestao', 'Balcão Gestão'],
  ['balcao', 'avancado', 'Balcão Avançado'],
  ['delivery', 'basico', 'Delivery Básico'],
  ['delivery', 'gestao', 'Delivery Gestão'],
  ['delivery', 'avancado', 'Delivery Avançado'],
  ['deliveryBalcao', 'basico', 'Balcão + Delivery Básico'],
  ['deliveryBalcao', 'gestao', 'Balcão + Delivery Gestão'],
  ['deliveryBalcao', 'avancado', 'Balcão + Delivery Avançado'],
];

const DISPLAY_NAME = {
  'Balcão + Delivery Básico': 'Delivery & Balcão Básico',
  'Balcão + Delivery Gestão': 'Delivery & Balcão Gestão',
  'Balcão + Delivery Avançado': 'Delivery & Balcão Avançado',
};

/** Tabela comercial (mensal / anual + taxa de adesão) — sobrescreve preço base da API */
/** Taxa de adesão única (plano mensal); anual permanece R$ 0 */
const TAXA_ADESAO_MENSAL = 250;

const PRICING_TABLE = {
  'balcao:basico': { mensal: { preco: 249, taxa_adesao: TAXA_ADESAO_MENSAL }, anual: { preco: 199, taxa_adesao: 0 } },
  'balcao:gestao': { mensal: { preco: 499, taxa_adesao: TAXA_ADESAO_MENSAL }, anual: { preco: 399, taxa_adesao: 0 } },
  'balcao:avancado': { mensal: { preco: 699, taxa_adesao: TAXA_ADESAO_MENSAL }, anual: { preco: 549, taxa_adesao: 0 } },
  'delivery:basico': { mensal: { preco: 249, taxa_adesao: TAXA_ADESAO_MENSAL }, anual: { preco: 199, taxa_adesao: 0 } },
  'delivery:gestao': { mensal: { preco: 499, taxa_adesao: TAXA_ADESAO_MENSAL }, anual: { preco: 399, taxa_adesao: 0 } },
  'delivery:avancado': { mensal: { preco: 699, taxa_adesao: TAXA_ADESAO_MENSAL }, anual: { preco: 549, taxa_adesao: 0 } },
  'deliveryBalcao:basico': { mensal: { preco: 299, taxa_adesao: TAXA_ADESAO_MENSAL }, anual: { preco: 249, taxa_adesao: 0 } },
  'deliveryBalcao:gestao': { mensal: { preco: 599, taxa_adesao: TAXA_ADESAO_MENSAL }, anual: { preco: 499, taxa_adesao: 0 } },
  'deliveryBalcao:avancado': { mensal: { preco: 849, taxa_adesao: TAXA_ADESAO_MENSAL }, anual: { preco: 699, taxa_adesao: 0 } },
};

/** Mesma lógica do Varejo: mensal = basePrice da API; anual proporcional à tabela fidelidade. */
const OUTROS_RATIO_ANUAL = {
  /** Plano Bling — proporção Varejo PDV (199/221.11) */
  bling: 199 / 221.11,
  /** Autoatendimento — proporção Varejo Gestão (299/332.22) */
  autoatendimento: 299 / 332.22,
};

function optionalRequires(name) {
  if (name === 'Hub de Delivery') return ['Delivery'];
  if (name.startsWith('Delivery Direto')) return ['Hub de Delivery'];
  return undefined;
}

function buildOptional(m) {
  const nm = m.module.name;
  const rec = {
    name: nm,
    price: Number(m.price),
    quantifiable: false,
    selected: false,
  };
  const req = optionalRequires(nm);
  if (req) rec.requires = req;

  if (nm === 'TEF' || nm === 'Smart TEF') {
    rec.quantifiable = true;
    rec.count = 0;
  }
  if (nm === 'Terminais Autoatendimento') {
    rec.quantifiable = true;
    rec.count = 0;
    rec.max = Infinity;
  }
  if (nm === 'Programa de Fidelidade' && rec.price >= 299) {
    rec.setupCost = 1000.0;
  }
  return rec;
}

function buildPlan(planObj) {
  const users = planObj.modules.find((x) => x.module.type === 'users');
  const pdv = planObj.modules.find((x) => x.module.name === 'PDV - Frente de Caixa');

  const fixedModules = [];
  for (const m of planObj.modules) {
    if (m.add_on) continue;
    const nm = m.module.name;
    if (m.module.type === 'users') {
      fixedModules.push(`${m.amount}x Usuários`);
      continue;
    }
    if (nm === 'PDV - Frente de Caixa') {
      fixedModules.push(`${m.amount}x ${nm}`);
      continue;
    }
    fixedModules.push(nm);
  }

  const optionalModules = planObj.modules.filter((m) => m.add_on).map(buildOptional);

  const userUnit = users ? Number(users.module.price) : 20;
  const pdvUnit = pdv ? Number(pdv.module.price) : 59.9;

  return {
    name: DISPLAY_NAME[planObj.name] || planObj.name,
    apiPackageId: planObj.id,
    basePrice: Number(planObj.price),
    baseUsers: users ? users.amount : 1,
    basePdvs: pdv ? pdv.amount : 0,
    fixedModules,
    additionalUsers: {
      count: 0,
      price: userUnit,
      max: users && users.max_amount === -1 ? Infinity : users?.max_amount ?? 0,
    },
    additionalPdvs: {
      count: 0,
      price: pdvUnit,
      max: pdv && pdv.max_amount === -1 ? Infinity : pdv?.max_amount ?? 0,
    },
    optionalModules,
  };
}

const outrosNames = ['Plano Bling', 'Plano Autoatendimento | Mercado autônomo'];

const PLAN_DATA_FOOD = {
  balcao: {},
  delivery: {},
  deliveryBalcao: {},
  outros: {},
};

for (const [family, tier, apiName] of MAP_KEYS) {
  const p = api.data.find((x) => x.name === apiName);
  if (!p) throw new Error(`Plano não encontrado: ${apiName}`);
  const plan = buildPlan(p);
  plan.tier = tier;
  plan.highlight = tier === 'gestao';
  const pk = `${family}:${tier}`;
  if (PRICING_TABLE[pk]) {
    plan.pricing = PRICING_TABLE[pk];
    plan.basePrice = plan.pricing.mensal.preco;
  }
  PLAN_DATA_FOOD[family][tier] = plan;
}

for (const on of outrosNames) {
  const p = api.data.find((x) => x.name === on);
  if (!p) throw new Error(`Plano não encontrado: ${on}`);
  const key = on.startsWith('Plano Bling') ? 'bling' : 'autoatendimento';
  const plan = buildPlan(p);
  if (key === 'bling') {
    plan.name = 'Plano Bling';
    plan.optionalModules = plan.optionalModules.map((mod) => {
      if (mod.name === 'Hub de Delivery' && !mod.requires) mod.requires = ['Delivery'];
      if (mod.name.startsWith('Delivery Direto') && !mod.requires) mod.requires = ['Hub de Delivery'];
      return mod;
    });
  } else {
    plan.name = 'Plano Autoatendimento';
  }
  const mensalPreco = plan.basePrice;
  const ratio = OUTROS_RATIO_ANUAL[key];
  plan.pricing = {
    mensal: { preco: mensalPreco, taxa_adesao: TAXA_ADESAO_MENSAL },
    anual: {
      preco: Math.round(mensalPreco * ratio * 100) / 100,
      taxa_adesao: 0,
    },
  };
  PLAN_DATA_FOOD.outros[key] = plan;
}

function stringifyPlanData(obj) {
  return JSON.stringify(obj, (k, v) => (v === Infinity ? '__INF__' : v), 4).replace(/"__INF__"/g, 'Infinity');
}

const out = `// Gerado a partir de novoPlanos.js — não editar à mão; rode: node build-planos-data.mjs
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

const PLAN_DATA_FOOD = ${stringifyPlanData(PLAN_DATA_FOOD).replace(/"([^"]+)":/g, '$1:')};

/** Mercado Varejo — gerado a partir de planos-varejo-data.mjs */
const PLAN_DATA_VAREJO = ${stringifyPlanData(PLAN_DATA_VAREJO).replace(/"([^"]+)":/g, '$1:')};

const PLAN_DATA = { food: PLAN_DATA_FOOD, varejo: PLAN_DATA_VAREJO };
`;

fs.writeFileSync(new URL('./planos-data.js', import.meta.url), out, 'utf8');
console.log('planos-data.js gerado.');
