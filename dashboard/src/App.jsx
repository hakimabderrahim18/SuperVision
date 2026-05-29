import React, { useState, useMemo, useEffect } from 'react';
import { 
  TrendingUp, 
  FileText, 
  Users, 
  ShoppingBag, 
  Award, 
  Crown, 
  AlertTriangle, 
  CreditCard, 
  Layers, 
  Search, 
  Calendar, 
  Sun, 
  Moon, 
  MapPin, 
  DollarSign, 
  ChevronRight, 
  Percent, 
  ArrowUpRight, 
  Package, 
  Sparkles,
  Info,
  ExternalLink,
  Download,
  CheckSquare,
  Square,
  ShieldCheck,
  TrendingDown,
  Activity
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  PieChart, 
  Pie, 
  Cell, 
  BarChart, 
  Bar 
} from 'recharts';

// ==========================================
// 1. HARDCODED COMPREHENSIVE DATASET (ERP GLOBAL & SUBSET)
// ==========================================
const DATASET = {
  // Campaign 1: Campagne Complète ERP (217.6M DA)
  global_erp: {
    metrics: {
      title: "Campagne Complète ERP (Consolidation Générale)",
      consolidatedRevenue: 217645185.83,
      preSalesRevenue: 217645185.83, 
      preSalesRevenueTTC: 258997771.13, // Standard 19% TVA estimate for TTC
      volumeDistributed: 1200073,
      casesSold: 56134,
      averageBasket: 95752.17, // ERP average ticket
      activePoints: 923,
      outstandingReceivables: 5808260.10,
      recoveryRate: 97.33, // Real recovery rate on ERP scale
      avgRevenuePerCase: 3877.24,
    },
    preSales: [
      { rank: 1, name: "Mahrez", sales_ht: 66412854.20, share_pct: 30.51, invoices: 3220, avg_basket: 20468, unique_clients: 109, volume: 331961, recovery_rate: 98.73, outstanding: 843443.25, top_product: "Famico 250 GR", top_product_qty: 8440, verdict: "Top performeur commercial, recouvrement à consolider" },
      { rank: 2, name: "Mekadim", sales_ht: 63154236.15, share_pct: 29.02, invoices: 3150, avg_basket: 19970, unique_clients: 115, volume: 331961, recovery_rate: 100.00, outstanding: 0.00, top_product: "COUSCOUS MOYEN 10 KG AMOUR", top_product_qty: 12500, verdict: "Modèle de référence (zéro impayé)" },
      { rank: 3, name: "Mustapha Zitouni", sales_ht: 59151850.30, share_pct: 27.18, invoices: 3290, avg_basket: 18209, unique_clients: 129, volume: 331961, recovery_rate: 99.66, outstanding: 201116.29, top_product: "COUSCOUS MOYEN 01 KG SAFINA", top_product_qty: 5450, verdict: "Excellent équilibre volume/recouvrement" },
      { rank: 4, name: "Youcef", sales_ht: 11791465.83, share_pct: 5.42, invoices: 1013, avg_basket: 11640, unique_clients: 94, volume: 76709, recovery_rate: 75.97, outstanding: 2914047.94, top_product: "COUSCOUS MOYEN 01 KG SAFINA", top_product_qty: 4100, verdict: "CRITIQUE - Problème majeur de recouvrement!" },
      { rank: 5, name: "Fethi", sales_ht: 3856499.40, share_pct: 1.77, invoices: 314, avg_basket: 12281, unique_clients: 122, volume: 25590, recovery_rate: 78.09, outstanding: 868815.73, top_product: "Famico 250 GR", top_product_qty: 2280, verdict: "CRITIQUE - Problème majeur de recouvrement!" },
      { rank: 6, name: "Assel Jumbo", sales_ht: 3776338.24, share_pct: 1.74, invoices: 371, avg_basket: 10178, unique_clients: 260, volume: 34514, recovery_rate: 94.99, outstanding: 199005.44, top_product: "Nouilles Poulet 70g", top_product_qty: 7840, verdict: "Performance stable, recouvrement solide" },
      { rank: 7, name: "Mustapha Jumbo", sales_ht: 2964005.61, share_pct: 1.36, invoices: 164, avg_basket: 18073, unique_clients: 113, volume: 22775, recovery_rate: 96.25, outstanding: 115469.07, top_product: "COUSCOUS MOYEN 01 KG SAFINA", top_product_qty: 3150, verdict: "Performance stable, recouvrement solide" },
      { rank: 8, name: "Houari", sales_ht: 2963639.39, share_pct: 1.36, invoices: 253, avg_basket: 11713, unique_clients: 124, volume: 15592, recovery_rate: 93.65, outstanding: 195504.03, top_product: "Famico 250 GR", top_product_qty: 3905, verdict: "Performance stable, recouvrement solide" },
      { rank: 9, name: "Islem Jumbo", sales_ht: 2763920.30, share_pct: 1.27, invoices: 384, avg_basket: 7197, unique_clients: 110, volume: 25199, recovery_rate: 93.73, outstanding: 184600.55, top_product: "FARINE SUPERIEUR 01 KG SOSEMIE", top_product_qty: 1970, verdict: "Performance stable, recouvrement solide" },
      { rank: 10, name: "Bouriah", sales_ht: 810376.42, share_pct: 0.37, invoices: 24, avg_basket: 33765, unique_clients: 15, volume: 3811, recovery_rate: 68.37, outstanding: 288770.19, top_product: "RIZ LONG BLANC SOS 500 G", top_product_qty: 336, verdict: "CRITIQUE - Problème majeur de recouvrement!" }
    ]
  },

  // Campaign 3: Rapport de Supervision KPIs Consolidé (217.6M DA - Audité)
  supervision_erp: {
    metrics: {
      title: "Rapport de Supervision KPIs Consolidé (Audité Mai 2026)",
      consolidatedRevenue: 217645185.00,
      preSalesRevenue: 217645185.00, 
      preSalesRevenueTTC: 258997771.13,
      volumeDistributed: 1200073,
      casesSold: 56134,
      averageBasket: 95752.17, 
      activePoints: 923,
      outstandingReceivables: 9456455.00, // Dynamic outstanding
      recoveryRate: 95.66,
      avgRevenuePerCase: 3877.24,
    },
    preSales: [
      { rank: 1, name: "Mahrez", sales_ht: 66412854.20, share_pct: 30.51, invoices: 3220, avg_basket: 20468, unique_clients: 109, volume: 331961, recovery_rate: 89.67, outstanding: 6860447.84, top_product: "Famico 250 GR", top_product_qty: 8440, verdict: "Top CA / Recouv. Faible (Encours critique: 6.86M DA!)" },
      { rank: 2, name: "Mekadim", sales_ht: 63154236.15, share_pct: 29.02, invoices: 3150, avg_basket: 19970, unique_clients: 115, volume: 331961, recovery_rate: 98.80, outstanding: 757850.83, top_product: "COUSCOUS MOYEN 10 KG AMOUR", top_product_qty: 12500, verdict: "Bon / Vigilance (Encours à apurer)" },
      { rank: 3, name: "Mustapha Zitouni", sales_ht: 59151850.30, share_pct: 27.18, invoices: 3290, avg_basket: 18209, unique_clients: 129, volume: 331961, recovery_rate: 99.50, outstanding: 295759.25, top_product: "COUSCOUS MOYEN 01 KG SAFINA", top_product_qty: 5450, verdict: "Très Bon (Équilibre volume/recouvrement parfait)" },
      { rank: 4, name: "Youcef", sales_ht: 11791465.00, share_pct: 5.42, invoices: 1013, avg_basket: 11640, unique_clients: 94, volume: 76709, recovery_rate: 94.20, outstanding: 683904.97, top_product: "COUSCOUS MOYEN 01 KG SAFINA", top_product_qty: 4100, verdict: "Bon / Vigilance (Suivi des relances régulier)" },
      { rank: 5, name: "Fethi", sales_ht: 3856499.00, share_pct: 1.77, invoices: 314, avg_basket: 12281, unique_clients: 122, volume: 25590, recovery_rate: 99.10, outstanding: 34708.49, top_product: "Famico 250 GR", top_product_qty: 2280, verdict: "Performance stable" },
      { rank: 6, name: "Assel Jumbo", sales_ht: 3776338.00, share_pct: 1.74, invoices: 371, avg_basket: 10178, unique_clients: 260, volume: 34514, recovery_rate: 99.50, outstanding: 18881.69, top_product: "Nouilles Poulet 70g", top_product_qty: 7840, verdict: "Performance stable" },
      { rank: 7, name: "Mustapha Jumbo", sales_ht: 2964005.00, share_pct: 1.36, invoices: 164, avg_basket: 18073, unique_clients: 113, volume: 22775, recovery_rate: 91.50, outstanding: 251940.43, top_product: "COUSCOUS MOYEN 01 KG SAFINA", top_product_qty: 3150, verdict: "Bon / Vigilance" },
      { rank: 8, name: "Houari", sales_ht: 2963639.00, share_pct: 1.36, invoices: 253, avg_basket: 11713, unique_clients: 124, volume: 15592, recovery_rate: 100.00, outstanding: 0.00, top_product: "Famico 250 GR", top_product_qty: 3905, verdict: "Volume modeste (Zéro impayé)" },
      { rank: 9, name: "Islem Jumbo", sales_ht: 2763920.00, share_pct: 1.27, invoices: 384, avg_basket: 7197, unique_clients: 110, volume: 25199, recovery_rate: 100.00, outstanding: 0.00, top_product: "FARINE SUPERIEUR 01 KG SOSEMIE", top_product_qty: 1970, verdict: "Volume modeste (Zéro impayé)" },
      { rank: 10, name: "Bouriah", sales_ht: 810376.00, share_pct: 0.37, invoices: 24, avg_basket: 33765, unique_clients: 15, volume: 3811, recovery_rate: 25.50, outstanding: 603730.12, top_product: "RIZ LONG BLANC SOS 500 G", top_product_qty: 336, verdict: "CATASTROPHIQUE (Blocage immédiat requis!)" }
    ]
  },
  // Audited findings with translations
  audits: [
    {
      rep: "YOUCEF",
      status: "Critique",
      status_ar: "حرج",
      outstanding: 2914047.94,
      rate: 75.97,
      symptoms: "Reste à payer historique très élevé avec 2.91 Millions DA dehors.",
      symptoms_ar: "ديون متراكمة تاريخية مرتفعة للغاية تبلغ 2.91 مليون د.ج في الميدان.",
      causes: "Grands grossistes de la zone ayant négocié des délais de paiement non respectés. Absence de suivi rigoureux des relances de chèques.",
      causes_ar: "تجار الجملة الكبار في المنطقة تفاوضوا على آجال دفع غير محترمة. غياب المتابعة الصارمة لتحصيل الشيكات.",
      actions: [
        "Envoi formel de mises en demeure aux clients débiteurs.",
        "Suspension temporaire immédiate des encours de crédit.",
        "Mise en place d'un plan d'apurement strict avec les 3 principaux clients."
      ],
      actions_ar: [
        "إرسال إعذارات رسمية للزبائن المدينين.",
        "تعليق مؤقت وفوري للتسهيلات الائتمانية والديون الجديدة.",
        "وضع خطة تسوية صارمة مع أفضل 3 زبائن مدينين."
      ]
    },
    {
      rep: "FETHI",
      status: "Critique",
      status_ar: "حرج",
      outstanding: 868815.73,
      rate: 78.09,
      symptoms: "Créances clients élevées s'élevant à 868K DA.",
      symptoms_ar: "ديون العملاء مرتفعة تبلغ 868 ألف د.ج.",
      causes: "Secteur rural avec de petites supérettes souffrant d'un manque de liquidités. Conditions de paiement trop souples accordées pour forcer les ventes.",
      causes_ar: "قطاع ريفي يضم محلات صغيرة تعاني من نقص السيولة. شروط دفع مرنة للغاية مُنحت لفرض المبيعات وزيادتها.",
      actions: [
        "Fixer un plafond d'impayé strict de 200 000 DA par client.",
        "Récupération de chèques de caution pour les nouveaux encours."
      ],
      actions_ar: [
        "تحديد سقف ديون صارم بمبلغ 200,000 د.ج لكل زبون.",
        "استرداد شيكات كضمان للديون الجديدة."
      ]
    },
    {
      rep: "BOURIAH",
      status: "Critique",
      status_ar: "حرج",
      outstanding: 288770.19,
      rate: 68.37,
      symptoms: "Recouvrement le plus bas (68.37%) pour un faible CA généré.",
      symptoms_ar: "أدنى نسبة تحصيل (68.37٪) مقابل رقم أعمال ضئيل ومحدود.",
      causes: "Difficultés de recouvrement aiguës sur une zone de demi-gros. Portefeuille client à haut risque d'insolvabilité.",
      causes_ar: "صعوبات حادة في التحصيل في منطقة بيع شبه الجملة. محفظة زبائن عالية المخاطر من حيث الإعسار المالي.",
      actions: [
        "Accompagnement de Bouriah par le directeur commercial sur le terrain.",
        "Fermeture définitive des comptes clients en impayé de plus de 45 jours."
      ],
      actions_ar: [
        "مرافقة Bouriah من قبل المدير التجاري ميدانياً.",
        "الإغلاق النهائي لحسابات الزبائن المتأخرين عن الدفع لأكثر من 45 يوماً."
      ]
    },
    {
      rep: "MAHREZ",
      status: "Vigilance",
      status_ar: "متابعة",
      outstanding: 839643.17,
      rate: 98.73,
      symptoms: "CA volumineux mais restes à recouvrer élevés (839K DA).",
      symptoms_ar: "رقم أعمال كبير ولكن المبالغ المتبقية للتحصيل مرتفعة (839 ألف د.ج).",
      causes: "Gros volumes distribués à crédit à des clients réguliers sans relances systématiques.",
      causes_ar: "كميات مبيعات كبيرة وُزعت بالدين لزبائن دائمين دون متابعة وإشعارات تحصيل دورية.",
      actions: [
        "Audit des balances âgées de la zone.",
        "Limitation automatique des encours par client."
      ],
      actions_ar: [
        "تدقيق أعمار الديون وجدول المستحقات في المنطقة.",
        "التقييد التلقائي للديون القصوى لكل زبون."
      ]
    },
    {
      rep: "ZITOUNI",
      status: "Succès",
      status_ar: "ممتاز",
      outstanding: 202403.98,
      rate: 99.66,
      symptoms: "Modèle d'équilibre excellent (CA énorme + recouvrement de 95.60%).",
      symptoms_ar: "نموذج توازن ممتاز (رقم أعمال ضخم + نسبة تحصيل مالي تبلغ 95.60٪).",
      causes: "Suivi rigoureux des échéanciers de paiement et gestion saine du crédit client sur les volumes de gros.",
      causes_ar: "متابعة صارمة لجداول السداد وإدارة ائتمانية سليمة لديون الزبائن على كميات البيع بالجملة.",
      actions: [
        "Dupliquer son outil de suivi des échéances clients aux autres agents.",
        "Généraliser ses règles d'octroi de délais de paiement."
      ],
      actions_ar: [
        "تعميم نموذج وميكانيزم متابعة مستحقات الزبائن على بقية الوكلاء.",
        "تطبيق قواعده الخاصة بمنح فترات آجال السداد."
      ]
    },
    {
      rep: "MEKADIM",
      status: "Référence",
      status_ar: "مرجع",
      outstanding: 0.0,
      rate: 100.00,
      symptoms: "Modèle de référence absolue avec aucun impayé sur 62.9M DA.",
      symptoms_ar: "نموذج مرجعي مطلق خالٍ تماماً من الديون على مبيعات بقيمة 62.9 مليون د.ج.",
      causes: "Ventes quasi exclusivement au comptant ou garanties bancaires strictes.",
      causes_ar: "المبيعات تتم نقداً بالكامل أو بضمانات بنكية صارمة للغاية.",
      actions: [
        "Féliciter Mekadim pour son efficacité exceptionnelle.",
        "Documenter sa méthode de vente."
      ],
      actions_ar: [
        "تهنئة Mekadim على كفاءته الاستثنائية العالية جداً.",
        "توثيق وكتابة منهجيته وطريقته المرجعية في البيع."
      ]
    }
  ],
  products: [
    {
        "rank": 1,
        "designation": "Cube Poulet",
        "volume": 113650,
        "revenue_ht": 63768141.99
    },
    {
        "rank": 2,
        "designation": "Famico 250 GR",
        "volume": 86363,
        "revenue_ht": 20277156.2
    },
    {
        "rank": 3,
        "designation": "DCT 400g JUMBO",
        "volume": 111984,
        "revenue_ht": 17818428.0
    },
    {
        "rank": 4,
        "designation": "COUSCOUS MOYEN 10 KG AMOUR",
        "volume": 13846,
        "revenue_ht": 13299380.0
    },
    {
        "rank": 5,
        "designation": "Seasoning Poulet",
        "volume": 48901,
        "revenue_ht": 11331976.46
    },
    {
        "rank": 6,
        "designation": "DCT 800g JUMBO",
        "volume": 27660,
        "revenue_ht": 7739199.6
    },
    {
        "rank": 7,
        "designation": "COUSCOUS MOYEN 01 KG SAFINA",
        "volume": 39410,
        "revenue_ht": 5375080.0
    },
    {
        "rank": 8,
        "designation": "Nouilles Poulet 70g",
        "volume": 127160,
        "revenue_ht": 5118709.2
    },
    {
        "rank": 9,
        "designation": "FAMICO EXCLUSIVE 250GR",
        "volume": 20944,
        "revenue_ht": 4916902.64
    },
    {
        "rank": 10,
        "designation": "Cube Moutton",
        "volume": 5791,
        "revenue_ht": 3225307.23
    },
    {
        "rank": 11,
        "designation": "COUSCOUS MOYEN 05 KG AMOUR",
        "volume": 5424,
        "revenue_ht": 2991520.0
    },
    {
        "rank": 12,
        "designation": "COUSCOUS MOYEN 10 KG BENET EL MEFTOUL SOSEMIE",
        "volume": 3524,
        "revenue_ht": 2947970.0
    },
    {
        "rank": 13,
        "designation": "Etui 16 Poulet",
        "volume": 13252,
        "revenue_ht": 2648672.0
    },
    {
        "rank": 14,
        "designation": "Nouilles Curry 70g",
        "volume": 60160,
        "revenue_ht": 2420256.0
    },
    {
        "rank": 15,
        "designation": "SEMOULE SUP. MOYENNE 05 KG AMOUR",
        "volume": 7966,
        "revenue_ht": 2329450.0
    },
    {
        "rank": 16,
        "designation": "FARINE SUPERIEURE 01 KG SAFINA",
        "volume": 40658,
        "revenue_ht": 2326680.0
    },
    {
        "rank": 17,
        "designation": "NOUILLES SPICIAL POULET 70G",
        "volume": 49760,
        "revenue_ht": 2005780.8
    },
    {
        "rank": 18,
        "designation": "Nouilles poulet marine 70g",
        "volume": 49440,
        "revenue_ht": 1996689.6
    },
    {
        "rank": 19,
        "designation": "Nouilles Maxi Poulet 120g",
        "volume": 32880,
        "revenue_ht": 1903202.4
    },
    {
        "rank": 20,
        "designation": "FAMICO SEAU 5KG",
        "volume": 393,
        "revenue_ht": 1844002.84
    },
    {
        "rank": 21,
        "designation": "Nouilles Maxi Poulet Marine 120g x40",
        "volume": 31600,
        "revenue_ht": 1829845.6
    },
    {
        "rank": 22,
        "designation": "FAMICO 250 GR PRIMO",
        "volume": 7700,
        "revenue_ht": 1809218.4
    },
    {
        "rank": 23,
        "designation": "FARINE SUPERIEUR 10 KG KRAFT SOSEMIE",
        "volume": 2850,
        "revenue_ht": 1700780.0
    },
    {
        "rank": 24,
        "designation": "SEMOULE SUP. FINE 05 KG AMOUR",
        "volume": 5647,
        "revenue_ht": 1655150.0
    },
    {
        "rank": 25,
        "designation": "FARINE SUPERIEUR 05 KG KRAFT SOSEMIE",
        "volume": 4718,
        "revenue_ht": 1459080.0
    },
    {
        "rank": 26,
        "designation": "PATES SPAGHETTI 500 G SAFINA",
        "volume": 18700,
        "revenue_ht": 1389600.0
    },
    {
        "rank": 27,
        "designation": "COUSCOUS MOYEN 1KG PREMIUM AMOUR",
        "volume": 10780,
        "revenue_ht": 1309200.0
    },
    {
        "rank": 28,
        "designation": "FARINE SUPERIEUR 01 KG KRAFT SOSEMIE",
        "volume": 20369,
        "revenue_ht": 1288240.5
    },
    {
        "rank": 29,
        "designation": "POIS CHICHES ROYAL SOS 01 KG",
        "volume": 2880,
        "revenue_ht": 1274130.0
    },
    {
        "rank": 30,
        "designation": "SEMOULE MOYEN 10 KG SOSEMIE",
        "volume": 3196,
        "revenue_ht": 1259800.0
    },
    {
        "rank": 31,
        "designation": "FARINE SUPERIEUR 01 KG AMOUR",
        "volume": 17126,
        "revenue_ht": 1209562.46
    },
    {
        "rank": 32,
        "designation": "Etui 8 Poulet",
        "volume": 9532,
        "revenue_ht": 980164.0
    },
    {
        "rank": 33,
        "designation": "SEMOULE FINE 10 KG SOSEMIE",
        "volume": 2242,
        "revenue_ht": 886000.0
    },
    {
        "rank": 34,
        "designation": "SEAU FAMICO 400 GR",
        "volume": 2328,
        "revenue_ht": 866634.6
    },
    {
        "rank": 35,
        "designation": "FARINE SUPERIEURE 05 KG SM SAFINA",
        "volume": 2835,
        "revenue_ht": 847060.0
    },
    {
        "rank": 36,
        "designation": "SEMOULE SUP.DEMI GROSSE 01 KG AMOUR",
        "volume": 6525,
        "revenue_ht": 812925.0
    },
    {
        "rank": 37,
        "designation": "SEMOULE SUP. FINE 01 KG AMOUR",
        "volume": 7700,
        "revenue_ht": 800715.0
    },
    {
        "rank": 38,
        "designation": "RIZ BASMATI ETUVE SOS 01 KG",
        "volume": 2581,
        "revenue_ht": 780187.0
    },
    {
        "rank": 39,
        "designation": "COUSCOUS COMPLET 900 G AMOUR",
        "volume": 5770,
        "revenue_ht": 776750.0
    },
    {
        "rank": 40,
        "designation": "RIZ LONG BLANC SOS 500 G",
        "volume": 7476,
        "revenue_ht": 753110.4
    },
    {
        "rank": 41,
        "designation": "Cube Poulet -25%",
        "volume": 856,
        "revenue_ht": 695984.68
    },
    {
        "rank": 42,
        "designation": "PATE COURTE VERMICELLE 500 G AMOUR",
        "volume": 9580,
        "revenue_ht": 655400.0
    },
    {
        "rank": 43,
        "designation": "RIZ LONG BLANC SOS 01 KG",
        "volume": 3228,
        "revenue_ht": 654849.6
    },
    {
        "rank": 44,
        "designation": "RIZ LONG ETUVE SOS 01 KG",
        "volume": 2988,
        "revenue_ht": 654337.2
    },
    {
        "rank": 45,
        "designation": "Nouiles Légumes 70g",
        "volume": 15160,
        "revenue_ht": 613410.0
    },
    {
        "rank": 46,
        "designation": "Toma-Sauce Coulis 1L",
        "volume": 3020,
        "revenue_ht": 582541.68
    },
    {
        "rank": 47,
        "designation": "POIS CHICHES ROYAL SOS 500 G",
        "volume": 2418,
        "revenue_ht": 554113.8
    },
    {
        "rank": 48,
        "designation": "SEMOULE SUP. MOYENNE 01 KG AMOUR",
        "volume": 4607,
        "revenue_ht": 528268.2
    },
    {
        "rank": 49,
        "designation": "HARICOTS BLANC ROYAL SOS 01 KG",
        "volume": 1248,
        "revenue_ht": 525888.0
    },
    {
        "rank": 50,
        "designation": "Cube Bœuf",
        "volume": 892,
        "revenue_ht": 501440.55
    },
    {
        "rank": 51,
        "designation": "PATE COURTE COUDE 6 500 G AMOUR",
        "volume": 6660,
        "revenue_ht": 451600.0
    },
    {
        "rank": 52,
        "designation": "FARINE COMPLET 05 KG AMOUR",
        "volume": 1512,
        "revenue_ht": 438960.0
    },
    {
        "rank": 53,
        "designation": "FARINE COMPLET 01 KG AMOUR",
        "volume": 6561,
        "revenue_ht": 437427.0
    },
    {
        "rank": 54,
        "designation": "PATE COURTE TORSADE 500 G AMOUR",
        "volume": 6420,
        "revenue_ht": 433100.0
    },
    {
        "rank": 55,
        "designation": "DOUBLE CONCENTRE TOMATE 500 G 28% AZZOUZ",
        "volume": 2637,
        "revenue_ht": 390375.0
    },
    {
        "rank": 56,
        "designation": "Seasoning Moutton",
        "volume": 1462,
        "revenue_ht": 340152.07
    },
    {
        "rank": 57,
        "designation": "HARICOTS BLANC ROYAL SOS 500 G",
        "volume": 1500,
        "revenue_ht": 334580.4
    },
    {
        "rank": 58,
        "designation": "PATE COURTE COUDE 4 500 G AMOUR",
        "volume": 4880,
        "revenue_ht": 329500.0
    },
    {
        "rank": 59,
        "designation": "RIZ BASMATI ETUVE SOS 500 G",
        "volume": 2064,
        "revenue_ht": 319284.0
    },
    {
        "rank": 60,
        "designation": "PATE VERMICELLES 500 G SAFINA",
        "volume": 4420,
        "revenue_ht": 306700.0
    },
    {
        "rank": 61,
        "designation": "PATE COURTE PLOMB 500 G AMOUR",
        "volume": 4480,
        "revenue_ht": 304700.0
    },
    {
        "rank": 62,
        "designation": "RIZ LONG ETUVE SOS 500 G",
        "volume": 2592,
        "revenue_ht": 302280.0
    },
    {
        "rank": 63,
        "designation": "PATE FUSILLI 500 G SAFINA",
        "volume": 4340,
        "revenue_ht": 299600.0
    },
    {
        "rank": 64,
        "designation": "COUSCOUS MOYEN 01 KG BENET EL MEFTOUL SOSEMIE",
        "volume": 2484,
        "revenue_ht": 297680.0
    },
    {
        "rank": 65,
        "designation": "TOMATE AZHAR 400GR",
        "volume": 1824,
        "revenue_ht": 286440.0
    },
    {
        "rank": 66,
        "designation": "LENTILLES ROYAL SOS 01 KG",
        "volume": 816,
        "revenue_ht": 275570.4
    },
    {
        "rank": 67,
        "designation": "SEMOULE SUPERIEUR MOYENNE 02 KG KRAFT SOSEMIE",
        "volume": 1779,
        "revenue_ht": 271137.0
    },
    {
        "rank": 68,
        "designation": "PATE COUDE 4 500 G SAFINA",
        "volume": 3657,
        "revenue_ht": 263375.0
    },
    {
        "rank": 69,
        "designation": "PATE COUDE 6 500 G SAFINA",
        "volume": 3520,
        "revenue_ht": 243600.0
    },
    {
        "rank": 70,
        "designation": "PATE COURTE TELITLI 500 G AMOUR",
        "volume": 3560,
        "revenue_ht": 241000.0
    },
    {
        "rank": 71,
        "designation": "PATE PETIT PLOMBS 500 G SAFINA",
        "volume": 3300,
        "revenue_ht": 228100.0
    },
    {
        "rank": 72,
        "designation": "Sauce Tomate 250ML",
        "volume": 3428,
        "revenue_ht": 210890.56
    },
    {
        "rank": 73,
        "designation": "LENTILLES ROYAL SOS 500 G",
        "volume": 1032,
        "revenue_ht": 185068.8
    },
    {
        "rank": 74,
        "designation": "PATE LANGUE OISEAU 500 G SAFINA",
        "volume": 2680,
        "revenue_ht": 184300.0
    },
    {
        "rank": 75,
        "designation": "Etui 8 Poulet -25%",
        "volume": 1432,
        "revenue_ht": 182150.4
    },
    {
        "rank": 76,
        "designation": "FARINE COMPLETE 5KG AMOUR",
        "volume": 617,
        "revenue_ht": 165985.0
    },
    {
        "rank": 77,
        "designation": "PATES COURTES VERMICELLE 450 GR SOSEMIE",
        "volume": 2980,
        "revenue_ht": 163100.0
    },
    {
        "rank": 78,
        "designation": "MECHMACHE 500 G AZZOUZ",
        "volume": 1254,
        "revenue_ht": 158730.0
    },
    {
        "rank": 79,
        "designation": "PATE COURTE PENNE 500 G AMOUR",
        "volume": 2360,
        "revenue_ht": 155000.0
    },
    {
        "rank": 80,
        "designation": "SEMOULE SUPERIEUR FINE 02 KG KRAFT SOSEMIE",
        "volume": 954,
        "revenue_ht": 145512.0
    },
    {
        "rank": 81,
        "designation": "PATES COUDE 8 500 G C10 SAFINA",
        "volume": 1980,
        "revenue_ht": 136350.0
    },
    {
        "rank": 82,
        "designation": "SOUPE CHORBA",
        "volume": 1524,
        "revenue_ht": 130637.28
    },
    {
        "rank": 83,
        "designation": "PATE PENNE 500 G SAFINA",
        "volume": 1860,
        "revenue_ht": 126300.0
    },
    {
        "rank": 84,
        "designation": "PATE COURTE LANGUE OISEAUX 500 G AMOUR",
        "volume": 1860,
        "revenue_ht": 124800.0
    },
    {
        "rank": 85,
        "designation": "Seasoning Bœuf",
        "volume": 516,
        "revenue_ht": 118607.72
    },
    {
        "rank": 86,
        "designation": "PATE COURTE ESCARGOTS 500 G AMOUR",
        "volume": 1700,
        "revenue_ht": 114400.0
    },
    {
        "rank": 87,
        "designation": "CONFITURE AZHAR ABRICOT 400 GRS",
        "volume": 822,
        "revenue_ht": 110556.0
    },
    {
        "rank": 88,
        "designation": "SEMOULE SUPERIEUR FINE 01 KG KRAFT SOSEMIE",
        "volume": 1275,
        "revenue_ht": 105825.0
    },
    {
        "rank": 89,
        "designation": "CONFITURE FIGUES SACA 400 GRS",
        "volume": 663,
        "revenue_ht": 103680.0
    },
    {
        "rank": 90,
        "designation": "PATES COURTES PLOMB MOYEN 450 GR SOSEMIE",
        "volume": 1580,
        "revenue_ht": 100160.0
    },
    {
        "rank": 91,
        "designation": "CAFE GRAINS FAMICO 01 KG",
        "volume": 99,
        "revenue_ht": 94560.0
    },
    {
        "rank": 92,
        "designation": "SEMOULE SUPERIER DEMI-GROSSE 02 KG KRAFT SOSEMIE",
        "volume": 456,
        "revenue_ht": 93480.0
    },
    {
        "rank": 93,
        "designation": "Semoule Sup Moyenne 01 kg kraft SOSEMIE",
        "volume": 1037,
        "revenue_ht": 86071.0
    },
    {
        "rank": 94,
        "designation": "Seasoning Poulet Maxi epice 12x08s dz",
        "volume": 88,
        "revenue_ht": 85619.53
    },
    {
        "rank": 95,
        "designation": "PATES LONGUE LINGUINE 500 GR SOSEMIE",
        "volume": 1403,
        "revenue_ht": 84783.0
    },
    {
        "rank": 96,
        "designation": "TOMATE AZHAR 800GR",
        "volume": 324,
        "revenue_ht": 81720.0
    },
    {
        "rank": 97,
        "designation": "PATES COURTES TORSADE PREMIUM 500 GR NEW SOSEMIE",
        "volume": 1160,
        "revenue_ht": 81560.0
    },
    {
        "rank": 98,
        "designation": "PATES COURTES COUDE 4 PREMIUM 500 GR NEW SOSEMIE",
        "volume": 1160,
        "revenue_ht": 81560.0
    },
    {
        "rank": 99,
        "designation": "PATES COURTES COUDE 4 450 GR SOSEMIE",
        "volume": 1340,
        "revenue_ht": 72900.0
    },
    {
        "rank": 100,
        "designation": "AZHAR HARISSA 380G",
        "volume": 504,
        "revenue_ht": 72720.0
    },
    {
        "rank": 101,
        "designation": "COUSCOUS FIN 01 KG (NOUV CLICHET) AMOUR",
        "volume": 540,
        "revenue_ht": 67500.0
    },
    {
        "rank": 102,
        "designation": "PATE COURTE TUBE 500 G AMOUR",
        "volume": 980,
        "revenue_ht": 65000.0
    },
    {
        "rank": 103,
        "designation": "COUSCOUS GROS 01 KG PREMIUM AMOUR",
        "volume": 520,
        "revenue_ht": 65000.0
    },
    {
        "rank": 104,
        "designation": "COUSCOUS GROS 01 KG SAFINA",
        "volume": 460,
        "revenue_ht": 63650.0
    },
    {
        "rank": 105,
        "designation": "PATE COURTE TRIDA 500 G AMOUR",
        "volume": 880,
        "revenue_ht": 58800.0
    },
    {
        "rank": 106,
        "designation": "PATES SPAGHETTI 500 GR SOSEMIE",
        "volume": 963,
        "revenue_ht": 58743.0
    },
    {
        "rank": 107,
        "designation": "PATES COURTES COUDE 6 450 GR SOSEMIE",
        "volume": 900,
        "revenue_ht": 56800.0
    },
    {
        "rank": 108,
        "designation": "CAPSULES CAFE FORTE",
        "volume": 195,
        "revenue_ht": 55440.0
    },
    {
        "rank": 109,
        "designation": "PATES COURTES PLUME 450 GR SOSEMIE",
        "volume": 1020,
        "revenue_ht": 55180.0
    },
    {
        "rank": 110,
        "designation": "PATE ESCARGOT 500 G SAFINA",
        "volume": 800,
        "revenue_ht": 54850.0
    },
    {
        "rank": 111,
        "designation": "PATES COURTES TLITLI 450 GR SOSEMIE",
        "volume": 860,
        "revenue_ht": 54080.0
    },
    {
        "rank": 112,
        "designation": "CAPSULES CAFE INTENSO",
        "volume": 183,
        "revenue_ht": 53040.0
    },
    {
        "rank": 113,
        "designation": "PATES COURTES LANGUR D'OISEAU 450 GR SOSEMIE",
        "volume": 780,
        "revenue_ht": 49120.0
    },
    {
        "rank": 114,
        "designation": "PATES COURTES COUDE 8 PREMIUM 500 GR NEW SOSEMIE",
        "volume": 640,
        "revenue_ht": 44640.0
    },
    {
        "rank": 115,
        "designation": "PATES COURTES PENNE PREMIUM 500 Gr NEW SOSEMIE",
        "volume": 640,
        "revenue_ht": 44640.0
    },
    {
        "rank": 116,
        "designation": "COUSCOUS FIN 01 KG PREMUIM BENET EL MEFTOUL SOSEMIE",
        "volume": 600,
        "revenue_ht": 44551.5
    },
    {
        "rank": 117,
        "designation": "Etui 8 Moutton",
        "volume": 404,
        "revenue_ht": 41612.0
    },
    {
        "rank": 118,
        "designation": "PATES COURTES COUDE 6 PREMIUM 500 GR NEW SOSEMIE",
        "volume": 500,
        "revenue_ht": 35500.0
    },
    {
        "rank": 119,
        "designation": "VELOUTE DE POULET VERMICELLE",
        "volume": 47,
        "revenue_ht": 33960.7
    },
    {
        "rank": 120,
        "designation": "PATES COURTES VERMICELLE PREMIUM 500 GR NEW SOSEMIE",
        "volume": 440,
        "revenue_ht": 31240.0
    },
    {
        "rank": 121,
        "designation": "Etui 8 Bœuf",
        "volume": 288,
        "revenue_ht": 29664.0
    },
    {
        "rank": 122,
        "designation": "VELOUTE DE LEGUMES",
        "volume": 40,
        "revenue_ht": 28902.8
    },
    {
        "rank": 123,
        "designation": "TOMATE 01 KG 28% AZZOUZ",
        "volume": 96,
        "revenue_ht": 26400.0
    },
    {
        "rank": 124,
        "designation": "SAUCE BECHAMEL",
        "volume": 36,
        "revenue_ht": 25961.04
    },
    {
        "rank": 125,
        "designation": "CASSE COUSCOUS AMOUR 1 KG",
        "volume": 318,
        "revenue_ht": 23310.0
    },
    {
        "rank": 126,
        "designation": "PATES COURTES ANNEAUX 450 GR SOSEMIE",
        "volume": 360,
        "revenue_ht": 22560.0
    },
    {
        "rank": 127,
        "designation": "CAPSULTES CAFE ORO",
        "volume": 72,
        "revenue_ht": 22440.0
    },
    {
        "rank": 128,
        "designation": "COUSCOUS FIN 05 KG AMOUR",
        "volume": 40,
        "revenue_ht": 22400.0
    },
    {
        "rank": 129,
        "designation": "AZHAR 1/6 (135 g )",
        "volume": 400,
        "revenue_ht": 21400.0
    },
    {
        "rank": 130,
        "designation": "COUDE PETIT 500 G MAMA",
        "volume": 360,
        "revenue_ht": 20100.0
    },
    {
        "rank": 131,
        "designation": "PATES COURTES PLOMB PETIT 450 GR SOSEMIE",
        "volume": 280,
        "revenue_ht": 17920.0
    },
    {
        "rank": 132,
        "designation": "COUSCOUS MOYEN 500 GR PREMIUM AMOUR",
        "volume": 180,
        "revenue_ht": 13500.0
    },
    {
        "rank": 133,
        "designation": "COUSCOUS FIN 500 GR PREMIUM BENET EL MEFTOUL SOSEMIE",
        "volume": 300,
        "revenue_ht": 12600.0
    },
    {
        "rank": 134,
        "designation": "CAPSULES CAFE RISTRETO",
        "volume": 33,
        "revenue_ht": 9180.0
    },
    {
        "rank": 135,
        "designation": "CASSE FARINE SOSEMIE 1 KG",
        "volume": 234,
        "revenue_ht": 8970.0
    },
    {
        "rank": 136,
        "designation": "CASSE SEMOULE AMOUR 1 KG",
        "volume": 225,
        "revenue_ht": 6750.0
    },
    {
        "rank": 137,
        "designation": "PATES COURTES TORSADE 450 GR SOSEMIE",
        "volume": 80,
        "revenue_ht": 5120.0
    },
    {
        "rank": 138,
        "designation": "CASSE SEMOULE SOSEMIE 1 KG",
        "volume": 60,
        "revenue_ht": 1800.0
    },
    {
        "rank": 139,
        "designation": "CASSE PATTES SOSEMIE",
        "volume": 39,
        "revenue_ht": 1170.0
    },
    {
        "rank": 140,
        "designation": "MAIS 500g",
        "volume": 3,
        "revenue_ht": 420.0
    },
    {
        "rank": 141,
        "designation": "PATES COURTES CHORBA 450 GR SOSEMIE",
        "volume": 3,
        "revenue_ht": 192.0
    },
    {
        "rank": 142,
        "designation": "Quantité",
        "volume": 1200073,
        "revenue_ht": 0.0
    },
    {
        "rank": 143,
        "designation": "Silwane®        ERP0039_2.09.0",
        "volume": 461660,
        "revenue_ht": 0.0
    }
],
  clients: [
    { code: "Code 189", name: "Atef", deliveries: 5, purchases_ht: 738989.30 },
    { code: "Code 122", name: "Sup Derawi", deliveries: 10, purchases_ht: 603752.95 },
    { code: "Code 782", name: "Lezrag", deliveries: 5, purchases_ht: 552590.00 },
    { code: "Code 3869", name: "Benkoussa Mostapha", deliveries: 3, purchases_ht: 431490.00 },
    { code: "Code 129", name: "Sup Meghit", deliveries: 6, purchases_ht: 394949.40 }
  ],
  documents: [
    {
      id: 'rapport-supervision',
      name: 'Rapport_Performance_SILWANE_Mai_2026_Consolide.pdf',
      title: 'Rapport de Supervision KPIs Consolidé',
      size: '6.2 KB',
      description: 'Supervision critique des KPIs de performance et de recouvrement de SILWANE ERP pour Mai 2026. Alerte sur le risque de concentration et l\'explosion du reste à payer.',
      type: 'Supervision Executive',
      url: '/Rapport_Performance_SILWANE_Mai_2026_Consolide.pdf'
    },
    {
      id: 'guide-kpis',
      name: 'GUIDE KPIs SILWANE - Mai 2026.pdf',
      title: 'Guide des KPIs SILWANE ERP',
      size: '13.4 KB',
      description: 'Document d\'orientation définissant les indicateurs clés de performance (KPI), la méthodologie opérationnelle et les critères de solvabilité pour le réseau prévendeurs.',
      type: 'Guide Opérationnel',
      url: '/GUIDE KPIs SILWANE - Mai 2026.pdf'
    },

    {
      id: 'comparatif-prevendeurs',
      name: 'Rapport_Comparatif_Prevendeurs.pdf',
      title: 'Comparatif de Performance Prévendeurs',
      size: '192.6 KB',
      description: 'Évaluation croisée de l\'activité des agents commerciaux terrain. Analyse comparative fine de la répartition du chiffre d\'affaires, de la gestion des encours et de la solvabilité.',
      type: 'Audit Commercial',
      url: '/Rapport_Comparatif_Prevendeurs.pdf'
    },
    {
      id: 'comparatif-regions',
      name: 'Rapport_Comparatif_Regions_Prevendeurs.pdf',
      title: 'Comparatif Régions & Secteurs',
      size: '117.5 KB',
      description: 'Cartographie de la performance géographique des ventes par zone. Identifie la couverture territoriale, le taux d\'activité des routes et la part de marché par prévendeur.',
      type: 'Analyse Territoriale',
      url: '/Rapport_Comparatif_Regions_Prevendeurs.pdf'
    },
    {
      id: 'ventes-zone',
      name: 'Rapport_Ventes_Par_Zone.pdf',
      title: 'Volume des Ventes par Zone Géographique',
      size: '3.1 KB',
      description: 'Récapitulatif abrégé des ventes consolidées en volumes physiques par zones et localités principales de distribution.',
      type: 'Synthèse Ventes',
      url: '/Rapport_Ventes_Par_Zone.pdf'
    },
    {
      id: 'formules-calculs',
      name: 'SILWANE_Formules_Calculs_Dashboard.pdf',
      title: 'Guide des Formules et Ratios de Calcul',
      size: '8.4 KB',
      description: 'Documentation technique et mathematique detaillant toutes les equations d\'apurement, de recouvrement et de panier moyen appliquees.',
      type: 'Formules & Ratios',
      url: '/SILWANE_Formules_Calculs_Dashboard.pdf'
    }
  ]
};

// ==========================================
// 2. SIMULATORS FOR HISTORICAL GRAPHS
// ==========================================

// ==========================================
// BILINGUAL TRANSLATION HELPERS (FR / AR)
// ==========================================
const translateName = (name, lang) => {
  return name;
};

const translateProduct = (designation, lang) => {
  if (!designation) return '';
  if (lang !== 'ar') return designation;
  
  const products = {
    "Cube Poulet": "مرق مكعبات دجاج",
    "Famico 250 GR": "فاميكو 250 غ",
    "DCT 400g JUMBO": "جامبو 400 غ",
    "COUSCOUS MOYEN 10 KG AMOUR": "كسكس متوسط 10 كغ عمور",
    "COUSCOUS MOYEN 01 KG SAFINA": "كسكس متوسط 1 كغ سفينة",
    "Nouilles Poulet 70g": "نودلز دجاج 70 غ",
    "FAMICO EXCLUSIVE 250GR": "فاميكو حصري 250 غ",
    "Cube Moutton": "مرق مكعبات لحم غنم",
    "COUSCOUS MOYEN 05 KG AMOUR": "كسكس متوسط 5 كغ عمور",
    "COUSCOUS MOYEN 10 KG BENET EL MEFTOUL SOSEMIE": "كسكس متوسط 10 كغ بنت المفتول سوسيمي",
    "Etui 16 Poulet": "علبة 16 دجاج",
    "Nouilles Curry 70g": "نودلز كاري 70 غ",
    "SEMOULE SUP. MOYENNE 05 KG AMOUR": "سميد متوسط ممتاز 5 كغ عمور",
    "FARINE SUPERIEURE 01 KG SAFINA": "فرينة ممتازة 1 كغ سفينة",
    "NOUILLES SPICIAL POULET 70G": "نودلز خاصة دجاج 70 غ",
    "Nouilles poulet marine 70g": "نودلز دجاج متبل 70 غ",
    "Nouilles Maxi Poulet 120g": "نودلز ماكسي دجاج 120 غ",
    "FAMICO SEAU 5KG": "دلو فاميكو 5 كغ",
    "FARINE SUPERIEUR 10 KG KRAFT SOSEMIE": "فرينة كرافت 10 كغ سوسيمي",
    "SEMOULE SUP. FINE 05 KG AMOUR": "سميد ناعم ممتاز 5 كغ عمور",
    "FARINE SUPERIEUR 05 KG KRAFT SOSEMIE": "فرينة كرافت 5 كغ سوسيمي",
    "PATES SPAGHETTI 500 G SAFINA": "معكرونة سباغيتي 500 غ سفينة",
    "COUSCOUS MOYEN 1KG PREMIUM AMOUR": "كسكس متوسط ممتاز 1 كغ عمور",
    "FARINE SUPERIEUR 01 KG KRAFT SOSEMIE": "فرينة كرافت 1 كغ سوسيمي",
    "POIS CHICHES ROYAL SOS 01 KG": "حمص رويال 1 كغ SOS",
    "SEMOULE MOYEN 10 KG SOSEMIE": "سميد متوسط 10 كغ سوسيمي",
    "FARINE SUPERIEUR 01 KG AMOUR": "فرينة ممتازة 1 كغ عمور",
    "Etui 8 Poulet": "علبة 8 دجاج",
    "SEMOULE FINE 10 KG SOSEMIE": "سميد ناعم 10 كغ سوسيمي",
    "SEAU FAMICO 400 GR": "دلو فاميكو 400 غ",
    "FARINE SUPERIEURE 05 KG SM SAFINA": "فرينة ممتازة 5 كغ سفينة",
    "SEMOULE SUP.DEMI GROSSE 01 KG AMOUR": "سميد خشن ممتاز 1 كغ عمور",
    "SEMOULE SUP. FINE 01 KG AMOUR": "سميد ناعم ممتاز 1 كغ عمور",
    "RIZ BASMATI ETUVE SOS 01 KG": "أرز بسمتي مبخر 1 كغ SOS",
    "COUSCOUS COMPLET 900 G AMOUR": "كسكس كامل 900 غ عمور",
    "RIZ LONG BLANC SOS 500 G": "أرز طويل أبيض 500 غ SOS",
    "Cube Poulet -25%": "مرق مكعبات دجاج -25%",
    "PATE COURTE VERMICELLE 500 G AMOUR": "شعيرية 500 غ عمور",
    "RIZ LONG BLANC SOS 01 KG": "أرز طويل أبيض 1 كغ SOS",
    "RIZ LONG ETUVE SOS 01 KG": "أرز طويل مبخر 1 كغ SOS",
    "Nouiles Légumes 70g": "نودلز خضار 70 غ",
    "Toma-Sauce Coulis 1L": "صلصة طماطم كوليس 1 لتر",
    "POIS CHICHES ROYAL SOS 500 G": "حمص رويال 500 غ SOS",
    "SEMOULE SUP. MOYENNE 01 KG AMOUR": "سميد متوسط ممتاز 1 كغ عمور",
    "HARICOTS BLANC ROYAL SOS 01 KG": "فاصوليا بيضاء رويال 1 كغ SOS",
    "Couscous Moyen Safina Alternative": "كسكس متوسط سفينة بديل",
    "Gamme Famico Carton Complémentaire": "علبة فاميكو تكميلية",
    "Autres Articles Divers SILWANE": "سلع متنوعة سيلوان",
    "CAPSULES CAFE RISTRETO": "كبسولات قهوة ريستريتو",
    "MAIS 500g": "ذرة 500 غ",
    "PATES CHORBA 450G SOSEMIE": "شعيرية شوربة سوسيمي"
  };

  for (const [key, val] of Object.entries(products)) {
    if (designation.includes(key)) {
      return designation.replace(key, val);
    }
  }
  return designation;
};

const translateVerdict = (verdict, lang) => {
  if (lang !== 'ar') return verdict;
  const verdicts = {
    "CA correct, vigilance accrue sur le recouvrement": "رقم أعمال ممتاز، لكن اليقظة مطلوبة بشأن التحصيل",
    "Modèle de référence (zéro impayé)": "نموذج مرجعي مثالي (لا يوجد ديون)",
    "Excellent équilibre volume/recouvrement": "توازن ممتاز بين حجم المبيعات ونسبة التحصيل",
    "CRITIQUE - Problème majeur de recouvrement!": "حرج - مشكلة حادة جداً في التحصيل المالي الميداني!",
    "Performance stable, recouvrement solide": "أداء مستقر وتحصيل مالي قوي",
    "Performance stable, suivi régulier": "أداء مستقر ومتابعة دورية",
    "Seuil d'impayé franchi!": "تجاوز الحد الأقصى للديون المسموح بها!",
    "Modèle de référence absolue (zéro impayé)": "نموذج مرجعي مطلق (تحصيل مالي كامل)",
    "Top CA / Recouv. Faible (Encours critique: 6.81M DA!)": "أعلى ر.أ / تحصيل ضعيف (الديون القائمة حرجة: 6.81M د.ج!)",
    "Bon / Vigilance (Encours à apurer)": "جيد / وجوب المتابعة (الديون بحاجة للتصفية)",
    "Très Bon (Équilibre volume/recouvrement parfait)": "ممتاز جداً (توازن مثالي بين المبيعات والتحصيل)",
    "Bon / Vigilance (Suivi des relances régulier)": "جيد / يقظة (متابعة الإشعارات المنتظمة)",
    "Performance stable": "أداء مستقر ومتوازن",
    "Bon / Vigilance": "جيد / يقظة ومتابعة",
    "Volume modeste (Zéro impayé)": "مبيعات متواضعة (تحصيل مالي كامل)",
    "CATASTROPHIQUE (Blocage immédiat requis!)": "كارثي ومقلق للغاية (تجميد فوري للحساب مطلوب!)"
  };
  return verdicts[verdict] || verdict;
};

const generateDailySales = (totalSales, seedVal) => {
  const days = 13;
  const data = [];
  let currentSum = 0;
  for (let i = 1; i <= days; i++) {
    const day = i * 2;
    const date = `${day < 10 ? '0' : ''}${day}/05`;
    const wave = Math.sin(i * 1.3 + seedVal) * 0.45 + 1.0; 
    data.push({
      date,
      sales_ht: wave,
      volume: Math.round(wave * 45)
    });
    currentSum += wave;
  }
  return data.map(d => ({
    ...d,
    sales_ht: Math.round((d.sales_ht / currentSum) * totalSales * 100) / 100,
    volume: Math.round((d.volume / currentSum) * (totalSales / 180))
  }));
};

const generateProductBreakdown = (totalSales) => {
  return [
    { name: "Famico 250g", value: Math.round(totalSales * 0.45) },
    { name: "Couscous Safina", value: Math.round(totalSales * 0.25) },
    { name: "Nouilles / Pâtes", value: Math.round(totalSales * 0.18) },
    { name: "Riz / Autres", value: Math.round(totalSales * 0.12) }
  ];
};

const CHART_COLORS = ['#059669', '#34d399', '#F59E0B', '#EF4444', '#EC4899', '#8B5CF6', '#0284c7', '#0ea5e9'];

const MATRIX_AGENTS = ["Assel", "Bouriah", "Fethi", "Houari", "Mahrez", "Mkhazni", "Mounir", "Sissani", "Zitouni"];

const REGIONAL_MATRIX = [
  { zone: "Tiaret", zone_ar: "تيارت", sales: { Zitouni: 4597188.42, Sissani: 1423659.05, Mkhazni: 398926.74 }, total: 6419774.21 },
  { zone: "Secteur Assel", zone_ar: "قطاع عسل", sales: { Assel: 3975343.68 }, total: 3975343.68 },
  { zone: "Secteur Houari", zone_ar: "قطاع هواري", sales: { Houari: 3076303.48 }, total: 3076303.48 },
  { zone: "Frenda", zone_ar: "فرندة", sales: { Mounir: 1876733.26 }, total: 1876733.26 },
  { zone: "Takhmert", zone_ar: "تخمرت", sales: { Mounir: 1872006.57 }, total: 1872006.57 },
  { zone: "Thnia", zone_ar: "ثنية", sales: { Mahrez: 1714571.76 }, total: 1714571.76 },
  { zone: "Bourdj Bounaama", zone_ar: "برج بونعامة", sales: { Mahrez: 1370002.15 }, total: 1370002.15 },
  { zone: "Dahmouni", zone_ar: "دحموني", sales: { Fethi: 1132485.93 }, total: 1132485.93 },
  { zone: "Ammari Wlad Bessam", zone_ar: "عماري أولاد بسام", sales: { Mahrez: 1020270.84 }, total: 1020270.84 },
  { zone: "Secteur Bouriah", zone_ar: "قطاع بورياح", sales: { Bouriah: 912900.97 }, total: 912900.97 },
  { zone: "Hamaida", zone_ar: "حمايدة", sales: { Fethi: 900304.06 }, total: 900304.06 },
  { zone: "Lardjam", zone_ar: "لرجام", sales: { Mahrez: 819397.48 }, total: 819397.48 },
  { zone: "Kermes", zone_ar: "كرمز", sales: { Mounir: 710957.31 }, total: 710957.31 },
  { zone: "Medrissa", zone_ar: "مدريسة", sales: { Mounir: 687165.41 }, total: 687165.41 }
];

// ==========================================================
// TRANSLATION ENGINE & DICTIONARY
// ==========================================
const TRANSLATIONS = {
  silwane_title: { fr: "SILWANE ERP", ar: "سيلوان ERP" },
  dashboard_executive: { fr: "Rapports de Performance & Décisionnels", ar: "لوحة القيادة والمتابعة القرارية" },
  dashboard_subtitle: { fr: "Suivi Stratégique & Ratios Opérationnels • Mai 2026", ar: "التحليل المالي ورقابة نسب التحصيل • ماي 2026" },
  campaign_terrain: { fr: "Missions Terrain (30.2M DA)", ar: "نشاط الميدان (30.2 م د.ج)" },
  campaign_global_initial: { fr: "CA ERP Global Brut", ar: "الرصيد الإجمالي الخام (217.6M)" },
  campaign_supervision: { fr: "Supervision Critique (Audité)", ar: "التدقيق المالي والإشراف الحرج" },
  month_may: { fr: "Mai 2026", ar: "ماي 2026" },
  tab_global: { fr: "Vue Synthétique", ar: "العرض التحليلي العام" },
  tab_prevendeurs: { fr: "Profils Commerciaux", ar: "تفاصيل أداء الوكلاء" },
  tab_explorer: { fr: "Catalogue & Clients", ar: "دليل المنتجات والزبائن" },
  tab_documents: { fr: "Rapports Officiels PDF", ar: "مجلد وثائق الـ PDF" },
  tab_matrix: { fr: "Matrice Régionale", ar: "جدول مقارنة المناطق" },
  matrix_title: { fr: "Matrice Comparative des Ventes par Zone", ar: "مصفوفة مقارنة المبيعات حسب المناطق" },
  matrix_subtitle: { fr: "Analyse croisée de la répartition géographique du CA HT (en DA) par prévendeur", ar: "تحليل متقاطع للتوزيع الجغرافي لرقم الأعمال الصافي (د.ج) لكل وكيل تجاري" },
  zone_header: { fr: "Zone / Secteur", ar: "المنطقة / القطاع" },
  total_zone_label: { fr: "Total Zone", ar: "إجمالي المنطقة" },
  market_share_view: { fr: "Part de Marché (%)", ar: "حصة السوق (%)" },
  currency_view: { fr: "Valeur en DA", ar: "القيمة بالد.ج" },
  matrix_insights: { fr: "Révélations & Insights Régionaux", ar: "التحليلات والرؤى الإقليمية" },
  matrix_insight_1: { fr: "Tiaret s'impose comme le secteur économique numéro 1 (6.42M DA HT soit 21.25% des ventes totales), co-géré par Zitouni (71.6% leader absolu), Sissani (22.2%) et Mkhazni (6.2%).", ar: "تيارت تفرض نفسها كأول قطاع اقتصادي (6.42 مليون د.ج خ.ر أو 21.25٪ من إجمالي المبيعات)، وتدار بشكل مشترك من قبل زيتوني (71.6٪ رائد مطلق)، سيساني (22.2٪) ومخزني (6.2٪)." },
  matrix_insight_2: { fr: "Frenda et Takhmert (tournées de Mounir) réalisent des scores excellents avec plus de 1.87 Millions DA HT chacune.", ar: "فرندة وتخمرت (جولات منير) تحققان نتائج ممتازة بأكثر من 1.87 مليون د.ج خ.ر لكل منهما." },
  matrix_insight_3: { fr: "Les tournées de Thnia (1.71 Millions DA) et Bourdj Bounaama (1.37 Millions DA) gérées par Mahrez sont extrêmement rentables.", ar: "جولات ثنية (1.71 مليون د.ج) وبرج بونعامة (1.37 مليون د.ج) التي يديرها محرز مربحة للغاية." },
  matrix_insight_4: { fr: "Assel (3.98M DA) et Houari (3.08M DA) gèrent des secteurs géographiques totalement isolés et exclusifs sans aucun chevauchement, garantissant une couverture territoriale saine.", ar: "عسل (3.98 مليون د.ج) وهواري (3.08 مليون د.ج) يديران قطاعات جغرافية معزولة وحصرية تمامًا دون أي تداخل، مما يضمن تغطية إقليمية صحية." },
  agent_label: { fr: "Agent Audité :", ar: "الوكيل التجاري :" },
  data_display_for: { fr: "Période Analysée pour :", ar: "عرض البيانات الخاصة بـ :" },
  active_badge: { fr: "Consolidé", ar: "مدقق وموثق" },
  ca_erp_label: { fr: "Chiffre d'Affaires Brut Global (HT)", ar: "رقم الأعمال الإجمالي (خ.ر)" },
  ca_campaign_label: { fr: "Chiffre d'Affaires Campagne (HT)", ar: "رقم الأعمال الصافي (خ.ر)" },
  outstanding_receivables: { fr: "Créances Douteuses / Impayés", ar: "الديون العالقة غير المحصلة" },
  recovery_rate_label: { fr: "Taux d'Apurement des Créances", ar: "معدل استرداد الديون" },
  active_pdv: { fr: "Points de Vente Actifs :", ar: "الزبائن النشطون :" },
  volume_distributed: { fr: "Volume Physique Distribué", ar: "إجمالي الحجم الموزع" },
  cases_sold: { fr: "Colis / Cartons distribués", ar: "الصناديق المباعة" },
  basket_label: { fr: "Panier Moyen Facturé (HT)", ar: "متوسط سلة المبيعات (خ.ر)" },
  revenue_case_label: { fr: "Revenu Net Moyen par Carton", ar: "متوسط الدخل لكل صندوق" },
  daily_evolution: { fr: "Évolution Quotidienne des Ventes (HT)", ar: "التطور اليومي للمبيعات" },
  market_share_label: { fr: "Part de Marché des Commerciaux", ar: "حصة السوق للوكلاء" },
  total_sales_label: { fr: "Total Ventes", ar: "إجمالي المبيعات" },
  financial_risk_mitigation: { fr: "Système de Mitigation des Risques Financiers", ar: "نظام التخفيف من المخاطر المالية" },
  alert_outstanding: { fr: "Alerte Encours :", ar: "تنبيه الديون القائمة :" },
  financial_risk_desc: { fr: "Les comptes prévendeurs suivants présentent des recouvrements inférieurs au seuil critique de 90%.", ar: "حسابات البائعين التالية تسجل نسبة تحصيل أقل من الحد الحرج 90%." },
  action_plan_label: { fr: "Plan d'Action Opérationnel", ar: "خطة العمل التشغيلية الميدانية" },
  audit_clinique_label: { fr: "Fiches d'Audit Clinique des Prévendeurs", ar: "بطاقات التدقيق التفصيلي للبائعين" },
  rank_performance_label: { fr: "Classement des Performances Vendeurs", ar: "ترتيب كفاءة وأداء البائعين" },
  top_national_clients: { fr: "Top 5 Clients Nationaux", ar: "أفضل 5 زبائن وطنيين" },
  search_placeholder_product: { fr: "Filtrer par désignation...", ar: "تصفية حسب اسم المنتج..." },
  search_placeholder_client: { fr: "Rechercher code / nom...", ar: "بحث عن الكود أو الاسم..." },
  product_catalog_label: { fr: "Catalogue & Performance des Produits", ar: "دليل المنتجات وأداء المبيعات" },
  client_accounts_label: { fr: "Registre des Comptes Clients", ar: "سجل حسابات الزبائن" },
  reports_list_label: { fr: "Rapports Commerciaux (PDF)", ar: "التقارير التجارية الرسمية (PDF)" },
  reports_desc: { fr: "Sélectionnez un document d'analyse généré dans le dossier output pour l'ouvrir, le télécharger ou l'analyser directement dans la liseuse intégrée à droite.", ar: "اختر وثيقة تحليلية من المجلد لرؤيتها أو تحميلها أو مراجعتها مباشرة في القارئ المدمج على اليمين." },
  pdf_viewer_label: { fr: "Liseuse de Rapport Intégrée", ar: "قارئ التقارير المدمج تفاعلياً" },
  active_viewing: { fr: "Affichage en cours :", ar: "العرض الحالي للوثيقة :" },
  new_tab_label: { fr: "Nouvel Onglet", ar: "نافذة جديدة" },
  download_label: { fr: "Télécharger", ar: "تحميل" },
  pivot_regional_label: { fr: "Tableau Croisé Régional des Ventes Croisées (CA HT)", ar: "الجدول المتقاطع الإقليمي للمبيعات المشتركة" },
  pivot_extracted_badge: { fr: "Matrice PDF Extraite", ar: "مصفوفة الـ PDF المستخرجة" },
  pivot_best_sellers_label: { fr: "Registre des Produits Phares par Prévendeur", ar: "سجل المنتجات الرئيسية والأكثر مبيعاً لكل وكيل" },
  performance_micro_label: { fr: "Performance Micro-Détail : Articles de Référence", ar: "الأداء التفصيلي المجهري: السلع المرجعية" },
  micro_article: { fr: "Article Spécifique", ar: "المنتج المحدد" },
  micro_volume: { fr: "Volume Distribué (Estimé)", ar: "الحجم الموزع (التقديري)" },
  micro_value: { fr: "Valeur Estimée HT", ar: "القيمة التقديرية (خ.ر)" },
  micro_contribution: { fr: "Contribution CA Agent", ar: "نسبة مساهمة المنتج في ر.أ للوكيل" },
  supervision_title: { fr: "Supervision Exécutive : Rotation & Recommandations", ar: "الإشراف التنفيذي: مزيج المنتجات، الدوران والتوصيات الاستراتيجية" },
  supervision_desc: { fr: "Analyse critique des rotations de stock, alertes de concentration commerciale et feuille de route financière.", ar: "ملخص دقيق لمعدلات الدوران، تنبيهات تركيز المبيعات وخارطة طريق تسوية الديون." },
  supervision_alerts_col: { fr: "1. Alertes de Supervision", ar: "1. تنبيهات الإشراف" },
  supervision_rotation_col: { fr: "2. Rotation des Produits", ar: "2. تحليل دوران المنتجات" },
  supervision_recs_col: { fr: "3. Recommandations Stratégiques", ar: "3. التوصيات الاستراتيجية" },
  supervision_high_rotation: { fr: "Haute Rotation (Top Moving SKUs) :", ar: "دوران سريع وقوي (الأكثر مبيناً) :" },
  supervision_low_rotation: { fr: "Basse Rotation (Stock Dormant) :", ar: "دوران بطيء (السلع الراكدة والمخازن الميتة) :" },
  ranking: { fr: "Rang", ar: "الرتبة" },
  representative: { fr: "Commercial", ar: "الوكيل التجاري" },
  invoices_label: { fr: "Factures (BL)", ar: "الفواتير (BL)" },
  volume_units: { fr: "Volume (Unités)", ar: "الحجم (الوحدات)" },
  ca_net: { fr: "Chiffre d'Affaires HT", ar: "رقم الأعمال (خ.ر)" },
  recovery: { fr: "Recouvrement", ar: "التحصيل المالي" },
  outstanding_amount: { fr: "Reste (Impayés)", ar: "الديون المتبقية" },
  verdict_label: { fr: "Verdict", ar: "التقييم والقرار" },
  medal_top_ca: { fr: "Top CA / Recouv. Faible", ar: "أعلى ر.أ / تحصيل ضعيف" },
  medal_vigilance: { fr: "Bon / Vigilance", ar: "جيد / للمتابعة واليقظة" },
  medal_success: { fr: "Très Bon", ar: "ممتاز متوازن" },
  medal_stable: { fr: "Stable", ar: "مستقر" },
  medal_low_vol: { fr: "Petit Volume", ar: "حجم مبيعات متواضع" },
  medal_catastrophe: { fr: "CATASTROPHIQUE", ar: "كارثي ومقلق جداً" },
  footer_text: { fr: "© 2026 SILWANE ERP System. Tous droits réservés.", ar: "© 2026 نظام سيلوان ERP. جميع الحقوق محفوظة." },
  footer_version: { fr: "Version React + Tailwind + Recharts", ar: "نسخة React + Tailwind + Recharts مطورة" },
  footer_localized: { fr: "Algérie Dinars (DA) Localized Layout", ar: "تنسيق مخصص بالدينار الجزائري (د.ج)" },
  client_code: { fr: "Code", ar: "كود العميل" },
  client_name: { fr: "Intitulé Client", ar: "اسم الزبون" },
  client_purchases: { fr: "Achats Globaux HT", ar: "إجمالي المشتريات (خ.ر)" },
  deliveries: { fr: "Nbr Factures", ar: "عدد الفواتير" },
  designation: { fr: "Désignation", ar: "اسم المنتج" },
  volume_units_simple: { fr: "Volume (Unités)", ar: "الحجم (بالوحدة)" },
  ca_net_simple: { fr: "CA Net (HT)", ar: "رقم الأعمال الصافي" },
  risk_verdict_badge: { fr: "Alerte", ar: "تنبيه خطر" },
  risk_threshold_desc: { fr: "Sous le seuil d'alerte (90%)", ar: "أقل من حد الأمان (90%)" },
  risk_threshold_ok: { fr: "{lang === 'ar' ? 'مستوى سداد ممتاز ومثالي' : `Excellent niveau d'apurement`}", ar: "مستوى تحصيل ممتاز" },
  risk_symptoms: { fr: "Constat :", ar: "الوضعية العالقة :" },
  risk_causes: { fr: "Causes :", ar: "الأسباب التشخيصية :" },
  risk_actions: { fr: "Actions Immédiates :", ar: "الإجراءات الفورية المتخذة :" }
};
const VERDICTS_TR = {
  "CA correct, vigilance accrue sur le recouvrement": {
    fr: "CA correct, vigilance accrue sur le recouvrement",
    ar: "رقم أعمال ممتاز، لكن اليقظة مطلوبة بشأن التحصيل"
  },
  "Modèle de référence (zéro impayé)": {
    fr: "Modèle de référence (zéro impayé)",
    ar: "نموذج مرجعي مثالي (لا يوجد ديون)"
  },
  "Excellent équilibre volume/recouvrement": {
    fr: "Excellent équilibre volume/recouvrement",
    ar: "توازن ممتاز بين حجم المبيعات ونسبة التحصيل"
  },
  "CRITIQUE - Problème majeur de recouvrement!": {
    fr: "CRITIQUE - Problème majeur de recouvrement!",
    ar: "حرج - مشكلة حادة جداً في التحصيل المالي الميداني!"
  },
  "Performance stable, recouvrement solide": {
    fr: "Performance stable, recouvrement solide",
    ar: "أداء مستقر وتحصيل مالي قوي"
  },
  "Performance stable, suivi régulier": {
    fr: "Performance stable, suivi régulier",
    ar: "أداء مستقر ومتابعة دورية"
  },
  "Seuil d'impayé franchi!": {
    fr: "Seuil d'impayé franchi!",
    ar: "تجاوز الحد الأقصى للديون المسموح بها!"
  },
  "Modèle de référence absolue (zéro impayé)": {
    fr: "Modèle de référence absolue (zéro impayé)",
    ar: "نموذج مرجعي مطلق (تحصيل مالي كامل)"
  },
    "Top CA / Recouv. Faible (Encours critique: 6.81M DA!)": {
      fr: "Top CA / Recouv. Faible (Encours critique: 6.81M DA!)",
      ar: "أعلى ر.أ / تحصيل ضعيف (الديون القائمة حرجة: 6.81M د.ج!)"
    },
  "Bon / Vigilance (Encours à apurer)": {
    fr: "Bon / Vigilance (Encours à apurer)",
    ar: "جيد / وجوب المتابعة (الديون بحاجة للتصفية)"
  },
  "Très Bon (Équilibre volume/recouvrement parfait)": {
    fr: "Très Bon (Équilibre volume/recouvrement parfait)",
    ar: "ممتاز جداً (توازن مثالي بين المبيعات والتحصيل)"
  },
  "Bon / Vigilance (Suivi des relances régulier)": {
    fr: "Bon / Vigilance (Suivi des relances régulier)",
    ar: "جيد / يقظة (متابعة الإشعارات المنتظمة)"
  },
  "Performance stable": {
    fr: "Performance stable",
    ar: "أداء مستقر ومتوازن"
  },
  "Bon / Vigilance": {
    fr: "Bon / Vigilance",
    ar: "جيد / يقظة ومتابعة"
  },
  "Volume modeste (Zéro impayé)": {
    fr: "Volume modeste (Zéro impayé)",
    ar: "مبيعات متواضعة (تحصيل مالي كامل)"
  },
  "CATASTROPHIQUE (Blocage immédiat requis!)": {
    fr: "CATASTROPHIQUE (Blocage immédiat requis!)",
    ar: "كارثي ومقلق للغاية (تجميد فوري للحساب مطلوب!)"
  }
};

const CHECKLIST_TR = {
  1: {
    fr: "Audit YOUCEF: détail exhaustif des impayés grossistes",
    ar: "تدقيق YOUCEF: تفاصيل شاملة لديون تجار الجملة العالقة"
  },
  2: {
    fr: "Réunion FETHI: discussion recouvrement + blocage crédit",
    ar: "اجتماع FETHI: مناقشة التحصيل وتجميد التسهيلات الائتمانية"
  },
  3: {
    fr: "Féliciter les TOP 3 vendeurs (Mekadim, Zitouni, Mahrez)",
    ar: "تهنئة أفضل 3 بائعين (Mekadim، Zitouni، Mahrez)"
  },
  4: {
    fr: "Limitation automatique des encours de crédit client par commercial",
    ar: "تحديد سقف تلقائي للائتمان والديون لكل وكيل تجاري"
  },
  5: {
    fr: "Généraliser les best practices de Zitouni aux autres prévendeurs",
    ar: "تعميم الممارسات الناجحة لـ Zitouni على بقية الوكلاء البائعين"
  }
};

export default function App() {
  const [activeTab, setActiveTab] = useState('global');
  const [lang, setLang] = useState('fr'); // 'fr' or 'ar'
  const t = (key) => TRANSLATIONS[key]?.[lang] || key;
  const alignStart = lang === 'ar' ? 'text-right' : 'text-left';
  const alignEnd = lang === 'ar' ? 'text-left' : 'text-right';
  const [campaignMode, setCampaignMode] = useState('global_erp'); // 'global_erp' or 'supervision_erp'
  const [selectedPrevName, setSelectedPrevName] = useState('Mahrez');
  const [matrixView, setMatrixView] = useState('value'); // 'value' or 'percentage'
  const [clientSearch, setClientSearch] = useState('');
  const [productSearch, setProductSearch] = useState('');
  const [darkMode, setDarkMode] = useState(false);
  
  // Document state
  const [selectedDocId, setSelectedDocId] = useState('rapport-supervision');

  // Interactive Checklist states (Saved in state for full interaction!)
  const [checklist, setChecklist] = useState([
    { id: 1, text: "Audit YOUCEF: détail exhaustif des impayés grossistes", category: "urgent", completed: false },
    { id: 2, text: "Réunion FETHI: discussion recouvrement + blocage crédit", category: "urgent", completed: false },
    { id: 3, text: "Féliciter les TOP 3 vendeurs (Mekadim, Zitouni, Mahrez)", category: "urgent", completed: true },
    { id: 4, text: "Limitation automatique des encours de crédit client par commercial", category: "short", completed: false },
    { id: 5, text: "Généraliser les best practices de Zitouni aux autres prévendeurs", category: "short", completed: false }
  ]);

  // Apply dark mode styling to document element
  useEffect(() => {
    const root = window.document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [darkMode]);

  // Get active campaign data
  const campaignData = useMemo(() => {
    return DATASET[campaignMode];
  }, [campaignMode]);

  // Format Helper: 30 217 458,20 DA
  const formatDA = (val) => {
    if (val === undefined || val === null) return '0,00 DA';
    const formatted = new Intl.NumberFormat('fr-FR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(val);
    return `${formatted} DA`;
  };

  const formatQty = (val) => {
    return new Intl.NumberFormat('fr-FR').format(Math.round(val));
  };

  // Selected Pre-sales Representative Record
  const selectedPrev = useMemo(() => {
    return campaignData.preSales.find(p => p.name === selectedPrevName) || campaignData.preSales[0];
  }, [selectedPrevName, campaignData]);

  // Handle dropdown sync when toggling campaign
  useEffect(() => {
    const availableNames = campaignData.preSales.map(p => p.name);
    if (!availableNames.includes(selectedPrevName)) {
      setSelectedPrevName(availableNames[0]);
    }
  }, [campaignData, selectedPrevName]);

  // Reset active tab to global if switching to supervision campaign and on restricted tabs
  useEffect(() => {
    if (campaignMode === 'supervision_erp' && (activeTab === 'prevendeurs' || activeTab === 'explorer' || activeTab === 'matrix')) {
      setActiveTab('global');
    }
  }, [campaignMode, activeTab]);

  // Pre-sales simulated daily sales
  const prevDailySales = useMemo(() => {
    return generateDailySales(selectedPrev.sales_ht, selectedPrev.rank);
  }, [selectedPrev]);

  // Pre-sales product distribution data
  const prevProductData = useMemo(() => {
    return generateProductBreakdown(selectedPrev.sales_ht);
  }, [selectedPrev]);

  // Campaign Cumulative Daily Sales
  const globalDailySales = useMemo(() => {
    return generateDailySales(campaignData.metrics.preSalesRevenue, 42);
  }, [campaignData]);

  // Filtered Clients (Explorer)
  const filteredClients = useMemo(() => {
    const query = clientSearch.toLowerCase().trim();
    if (!query) return DATASET.clients;
    return DATASET.clients.filter(c => 
      c.name.toLowerCase().includes(query) || 
      c.code.toLowerCase().includes(query)
    );
  }, [clientSearch]);

  // Filtered Products (Explorer)
  const filteredProducts = useMemo(() => {
    const query = productSearch.toLowerCase().trim();
    if (!query) return DATASET.products;
    return DATASET.products.filter(p => 
      p.designation.toLowerCase().includes(query)
    );
  }, [productSearch]);

  // Selected PDF Document Object
  const selectedDoc = useMemo(() => {
    return DATASET.documents.find(d => d.id === selectedDocId) || DATASET.documents[0];
  }, [selectedDocId]);

  // Toggle checklist completed
  const handleToggleCheck = (id) => {
    setChecklist(prev => prev.map(item => 
      item.id === id ? { ...item, completed: !item.completed } : item
    ));
  };

  // Checklist statistics
  const checkProgress = useMemo(() => {
    const total = checklist.length;
    const completed = checklist.filter(c => c.completed).length;
    return {
      total,
      completed,
      pct: Math.round((completed / total) * 100)
    };
  }, [checklist]);

  return (
    <div dir={lang === 'ar' ? 'rtl' : 'ltr'} className="min-h-screen flex flex-col transition-colors duration-300 bg-slate-50 dark:bg-[#030712] text-slate-800 dark:text-slate-100 font-sans" style={{ direction: lang === 'ar' ? 'rtl' : 'ltr' }}>
      
      {/* ==========================================
          HEADER / TOP NAVIGATION BAR
          ========================================== */}
      <header className="sticky top-0 z-40 w-full border-b border-slate-200 dark:border-slate-800 bg-white/85 dark:bg-[#0B0F19]/85 backdrop-blur-md">
        <div className="max-w-[1550px] mx-auto px-4 md:px-6 py-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white font-extrabold text-lg shadow-lg shadow-indigo-600/30 animate-pulse-subtle">
              S
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">{t('silwane_title')}</h1>
                <span className="px-2 py-0.5 text-xs font-semibold rounded-full bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300">
                  {t('dashboard_executive')}
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">{t('dashboard_subtitle')}</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between md:justify-end gap-3">
            
            {/* ACTIVE CAMPAIGN MODE TOGGLE BUTTONS */}
            <div className="flex p-0.5 rounded-lg bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/50">
              <button
                onClick={() => setCampaignMode('global_erp')}
                className={`px-3 py-1.5 text-xs font-bold rounded-md transition-all flex items-center gap-1.5 ${
                  campaignMode === 'global_erp'
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <Activity className="w-3 h-3 text-emerald-400" />
                <span>{t('campaign_global_initial')}</span>
              </button>
              <button
                onClick={() => setCampaignMode('supervision_erp')}
                className={`px-3 py-1.5 text-xs font-bold rounded-md transition-all flex items-center gap-1.5 ${
                  campaignMode === 'supervision_erp'
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <Sparkles className="w-3 h-3 text-amber-400 animate-pulse" />
                <span>{t('campaign_supervision')}</span>
              </button>
            </div>

            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800/60 text-xs font-medium text-slate-600 dark:text-slate-300">
              <Calendar className="w-3.5 h-3.5 text-indigo-500" />
              <span>{t('month_may')}</span>
            </div>

            <button 
              onClick={() => setLang(lang === 'fr' ? 'ar' : 'fr')}
              className="px-3 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-extrabold transition-all flex items-center gap-1.5 shadow-md shadow-indigo-600/10 cursor-pointer"
              aria-label="Toggle language"
            >
              <span>{lang === 'fr' ? 'Français' : 'العربية'}</span>
            </button>

            <button 
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800/60 hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 transition-all border border-transparent dark:border-slate-700/50 cursor-pointer"
              aria-label="Toggle theme"
            >
              {darkMode ? <Sun className="w-4 h-4 text-amber-500" /> : <Moon className="w-4 h-4 text-indigo-600" />}
            </button>
          </div>
        </div>
      </header>

      {/* ==========================================
          SUB-NAV TABS & SEGMENT SELECTOR
          ========================================== */}
      <div className="max-w-[1550px] w-full mx-auto px-4 md:px-6 pt-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex overflow-x-auto whitespace-nowrap max-w-full p-1 rounded-xl bg-slate-200/80 dark:bg-slate-900/60 border border-slate-300/40 dark:border-slate-800 no-scrollbar">
          {[
            { id: 'global', label: t('tab_global'), icon: Layers },
            { id: 'prevendeurs', label: t('tab_prevendeurs'), icon: Users },
            { id: 'matrix', label: t('tab_matrix'), icon: MapPin },
            { id: 'explorer', label: t('tab_explorer'), icon: Search },
            { id: 'documents', label: t('tab_documents'), icon: FileText }
          ].filter(tab => {
            if (campaignMode === 'supervision_erp') {
              return tab.id === 'global' || tab.id === 'documents';
            }
            return true;
          }).map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-lg transition-all duration-200 shrink-0 cursor-pointer ${
                activeTab === tab.id 
                  ? 'bg-indigo-600 text-white shadow-md' 
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-300/30 dark:hover:bg-slate-800/50'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {activeTab === 'prevendeurs' && (
          <div className="flex items-center gap-2.5">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">{t('agent_label')}</span>
            <select
              value={selectedPrevName}
              onChange={(e) => setSelectedPrevName(e.target.value)}
              className="px-3 py-1.5 text-sm font-semibold rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all cursor-pointer shadow-sm"
            >
              {campaignData.preSales.map(p => (
                <option key={p.name} value={p.name}>
                  {p.name} ({p.share_pct}%)
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* ==========================================
          MAIN CONTENTS
          ========================================== */}
      <main className="flex-1 max-w-[1550px] w-full mx-auto px-4 md:px-6 py-6 animate-fade-in min-w-0">
        
        {/* ==========================================
            TAB 1: GLOBAL VIEW
            ========================================== */}
        {activeTab === 'global' && (
          <div className="space-y-6 min-w-0">
            
            {/* Dynamic Context Notification Banner */}
            <div className="px-5 py-3 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-xs font-bold text-indigo-700 dark:text-indigo-300 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-indigo-500" />
                <span>{t('data_display_for')} <strong className="underline">{lang === 'ar' && campaignMode === 'supervision_erp' ? 'تقرير الإشراف والتدقيق للنظام الشامل (ماي 2026)' : campaignData.metrics.title}</strong></span>
              </div>
              <span className="px-2 py-0.5 rounded bg-indigo-500/20 text-[10px]">{t('active_badge')}</span>
            </div>

            {/* Executive KPIs Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
              
              {/* Consolidated Revenue */}
              <div className="p-3.5 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 shadow-sm border border-slate-200 dark:border-slate-800/80 hover:shadow-md transition-shadow relative overflow-hidden group">
                <div className={`absolute top-0 w-2 h-full bg-indigo-600 ${lang === 'ar' ? 'right-0' : 'left-0'}`}></div>
                <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 mb-2 sm:mb-3">
                  <span className="text-[10px] sm:text-xs font-semibold tracking-wider uppercase">{t('ca_erp_label')}</span>
                  <div className="p-1.5 sm:p-2 rounded-lg bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 group-hover:scale-110 transition-transform">
                    <TrendingUp className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </div>
                </div>
                <div className="text-xs min-[350px]:text-sm min-[390px]:text-base sm:text-2xl font-extrabold text-slate-900 dark:text-white leading-none mb-2">
                  {formatDA(campaignData.metrics.consolidatedRevenue)}
                </div>
                <div className="text-[9px] sm:text-xs text-slate-400 dark:text-slate-500 flex items-center gap-1">
                  <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-amber-500" />
                  <span>Consolidé global sur la période</span>
                </div>
              </div>

              {/* Pre-sales Campaign Revenue */}
              <div className="p-3.5 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 shadow-sm border border-slate-200 dark:border-slate-800/80 hover:shadow-md transition-shadow relative overflow-hidden group">
                <div className={`absolute top-0 w-2 h-full bg-blue-500 ${lang === 'ar' ? 'right-0' : 'left-0'}`}></div>
                <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 mb-2 sm:mb-3">
                  <span className="text-[10px] sm:text-xs font-semibold tracking-wider uppercase">{t('ca_campaign_label')}</span>
                  <div className="p-1.5 sm:p-2 rounded-lg bg-blue-50 dark:bg-blue-900/20 text-blue-500 dark:text-blue-400 group-hover:scale-110 transition-transform">
                    <Layers className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </div>
                </div>
                <div className="text-xs min-[350px]:text-sm min-[390px]:text-base sm:text-2xl font-extrabold text-slate-900 dark:text-white leading-none mb-1">
                  {formatDA(campaignData.metrics.preSalesRevenue)}
                </div>
                <div className="text-[9px] sm:text-xs text-slate-500 dark:text-slate-400">
                  TTC : <span className="font-semibold text-blue-600 dark:text-blue-400">{formatDA(campaignData.metrics.preSalesRevenueTTC)}</span>
                </div>
              </div>

              {/* Outstanding Receivables */}
              <div className="p-3.5 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 shadow-sm border border-slate-200 dark:border-slate-800/80 hover:shadow-md transition-shadow relative overflow-hidden group">
                <div className={`absolute top-0 w-2 h-full bg-rose-500 ${lang === 'ar' ? 'right-0' : 'left-0'}`}></div>
                <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 mb-2 sm:mb-3">
                  <span className="text-[10px] sm:text-xs font-semibold tracking-wider uppercase">{t('outstanding_receivables')}</span>
                  <div className="p-1.5 sm:p-2 rounded-lg bg-rose-50 dark:bg-rose-900/20 text-rose-500 dark:text-rose-400 group-hover:scale-110 transition-transform">
                    <CreditCard className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </div>
                </div>
                <div className="text-xs min-[350px]:text-sm min-[390px]:text-base sm:text-2xl font-extrabold text-slate-900 dark:text-white leading-none mb-2">
                  {formatDA(campaignData.metrics.outstandingReceivables)}
                </div>
                <div className="text-[9px] sm:text-xs text-rose-600 dark:text-rose-400 font-semibold flex items-center gap-1">
                  <AlertTriangle className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                  <span>Nécessite recouvrement actif</span>
                </div>
              </div>

              {/* Recovery Rate & Points */}
              <div className="p-3.5 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 shadow-sm border border-slate-200 dark:border-slate-800/80 hover:shadow-md transition-shadow relative overflow-hidden group">
                <div className={`absolute top-0 w-2 h-full bg-emerald-500 ${lang === 'ar' ? 'right-0' : 'left-0'}`}></div>
                <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 mb-2 sm:mb-3">
                  <span className="text-[10px] sm:text-xs font-semibold tracking-wider uppercase">{t('recovery_rate_label')}</span>
                  <div className="p-1.5 sm:p-2 rounded-lg bg-emerald-50 dark:bg-emerald-900/20 text-emerald-500 dark:text-emerald-400 group-hover:scale-110 transition-transform">
                    <Percent className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </div>
                </div>
                <div className="text-xs min-[350px]:text-sm min-[390px]:text-base sm:text-2xl font-extrabold text-slate-900 dark:text-white leading-none mb-1">
                  {campaignData.metrics.recoveryRate}%
                </div>
                <div className="text-[9px] sm:text-xs text-slate-500 dark:text-slate-400">
                  {t('active_pdv')} <span className="font-semibold text-emerald-600 dark:text-emerald-400">{formatQty(campaignData.metrics.activePoints)} pdv</span>
                </div>
              </div>

            </div>

            {/* Campaign Sub-KPI Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: t('volume_distributed'), value: `${formatQty(campaignData.metrics.volumeDistributed)} ${lang === 'ar' ? 'وحدة' : 'unités'}`, icon: ShoppingBag, color: 'text-violet-500' },
                { label: t('cases_sold'), value: `${formatQty(campaignData.metrics.casesSold)} ${lang === 'ar' ? 'علبة' : 'cartons'}`, icon: Package, color: 'text-amber-500' },
                { label: t('basket_label'), value: formatDA(campaignData.metrics.averageBasket), icon: ArrowUpRight, color: 'text-teal-500' },
                { label: t('revenue_case_label'), value: formatDA(campaignData.metrics.avgRevenuePerCase), icon: DollarSign, color: 'text-indigo-500' }
              ].map((sub, i) => (
                <div key={i} className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900/40 border border-slate-200/60 dark:border-slate-800/40 flex items-center gap-3">
                  <div className={`p-2 rounded-lg bg-white dark:bg-slate-850 shadow-sm ${sub.color}`}>
                    <sub.icon className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider leading-tight">{sub.label}</p>
                    <p className="text-sm font-bold text-slate-900 dark:text-slate-200">{sub.value}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* SPECIAL SUPERVISION AUDIT REPORT - MIX & ROTATION OF PRODUCTS */}
            {campaignMode === 'supervision_erp' && (
              <div className="p-6 rounded-2xl bg-slate-900 text-slate-100 border border-indigo-500/30 shadow-xl relative overflow-hidden space-y-6">
                <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
                  <Sparkles className="w-64 h-64 text-indigo-500" />
                </div>
                
                <div className="flex flex-col lg:flex-row lg:items-center justify-between pb-4 border-b border-slate-800 gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="flex h-2.5 w-2.5 rounded-full bg-amber-400 animate-ping"></span>
                      <h3 className="text-lg font-extrabold text-white tracking-tight flex items-center gap-2">
                        <Award className="w-5 h-5 text-amber-400" />
                        {t('supervision_title')}
                      </h3>
                    </div>
                    <p className="text-xs text-slate-400 font-semibold">
                      {t('supervision_desc')}
                    </p>
                  </div>
                  <span className="px-3 py-1 rounded-full text-[10px] font-extrabold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                    Source : Rapport_Performance_SILWANE_Mai_2026_Consolide.pdf
                  </span>
                </div>

                {/* Grid Content */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  
                  {/* Column 1: Strategic Alerts (Détails des Alertes) */}
                  <div className="p-4 rounded-xl bg-slate-950/50 border border-slate-800 space-y-4">
                    <h4 className="text-xs font-extrabold uppercase text-indigo-400 tracking-wider flex items-center gap-1.5">
                      <AlertTriangle className="w-4 h-4 text-amber-500" />
                      {t('supervision_alerts_col')}
                    </h4>
                    
                    <div className="space-y-3.5">
                      <div className="p-3 rounded-lg bg-rose-500/10 border border-rose-500/20 space-y-1.5">
                        <span className="px-2 py-0.5 text-[9px] font-extrabold bg-rose-500/20 text-rose-300 rounded border border-rose-500/30 uppercase">{lang === 'ar' ? 'حرجة : تركيز المبيعات والديون العالقة' : 'CRITIQUE : Concentration & Reste à Payer'}</span>
                        <p className="text-[11px] font-semibold text-slate-300 leading-relaxed">
                          {lang === 'ar' ? <span><strong>86٪ من المبيعات</strong> تمت بواسطة 3 وكلاء فقط (<strong>Mahrez، Mekadim، Zitouni</strong>).</span> : <span><strong>86% du CA</strong> est réalisé par seulement 3 vendeurs (<strong>Mahrez, Mekadim, Zitouni</strong>).</span>}
                        </p>
                        <p className="text-[11px] text-rose-300/90 font-bold">
                          {lang === 'ar' ? 'Mahrez لديه 6.81 مليون د.ج ديون عالقة (تحصيل 89.67٪)، مما يهدد الخزينة.' : 'MAHREZ cumule 6.81M DA d\'impayés (89.67% recouv.), menaçant gravement la trésorerie.'}
                        </p>
                      </div>

                      <div className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/20 space-y-1.5">
                        <span className="px-2 py-0.5 text-[9px] font-extrabold bg-amber-500/20 text-amber-300 rounded border border-amber-500/30 uppercase">{lang === 'ar' ? 'يقظة : حالة BOURIAH' : 'VIGILANCE : Cas BOURIAH'}</span>
                        <p className="text-[11px] font-semibold text-slate-300 leading-relaxed">
                          {lang === 'ar' ? <span>مبيعات حرجة بقيمة <strong>810 ألف د.ج</strong> (مقابل 1.4 مليون د.ج في أفريل).</span> : <span>Volume critique de <strong>810k DA</strong> (contre 1.4M DA en avril).</span>}
                        </p>
                        <p className="text-[11px] text-amber-300/90 font-bold">
                          {lang === 'ar' ? 'نسبة تحصيل كارثية مستمرة عند 25.50٪. يوصى بالتدقيق الفوري الحسابي.' : 'Recouvrement catastrophique persistant à 25.50%. Audit obligatoire exigé.'}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Column 2: Product Rotation (Rotation des Produits) */}
                  <div className="p-4 rounded-xl bg-slate-950/50 border border-slate-800 space-y-4">
                    <h4 className="text-xs font-extrabold uppercase text-indigo-400 tracking-wider flex items-center gap-1.5">
                      <ShoppingBag className="w-4 h-4 text-emerald-400" />
                      {t('supervision_rotation_col')}
                    </h4>

                    <div className="space-y-3 text-[11px] font-semibold">
                      {/* High Rotation */}
                      <div className="space-y-2">
                        <span className="text-[10px] uppercase font-extrabold text-emerald-400 tracking-wider block">{t('supervision_high_rotation')}</span>
                        
                        <div className="space-y-2">
                          <div>
                            <div className="flex justify-between text-slate-205 mb-1">
                              <span>{translateProduct("Cube Poulet", lang)}</span>
                              <span className="font-extrabold text-emerald-400">113 650 u. (63.7M DA)</span>
                            </div>
                            <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                              <div className="bg-emerald-500 h-full rounded-full" style={{ width: '90%' }}></div>
                            </div>
                          </div>

                          <div>
                            <div className="flex justify-between text-slate-205 mb-1">
                              <span>{translateProduct("DCT 400g JUMBO", lang)}</span>
                              <span className="font-extrabold text-emerald-400">111 984 u. (17.8M DA)</span>
                            </div>
                            <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                              <div className="bg-emerald-500 h-full rounded-full" style={{ width: '85%' }}></div>
                            </div>
                          </div>

                          <div>
                            <div className="flex justify-between text-slate-205 mb-1">
                              <span>{translateProduct("Nouilles Poulet 70g", lang)}</span>
                              <span className="font-extrabold text-emerald-400">127 160 u. (5.1M DA)</span>
                            </div>
                            <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                              <div className="bg-emerald-400 h-full rounded-full" style={{ width: '95%' }}></div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Low Rotation */}
                      <div className="space-y-2 pt-2 border-t border-slate-800/80">
                        <span className="text-[10px] uppercase font-extrabold text-rose-400 tracking-wider block">{t('supervision_low_rotation')}</span>
                        
                        <div className="space-y-2">
                          <div className="flex justify-between text-slate-400">
                            <span>{translateProduct("CAPSULES CAFE RISTRETO", lang)}</span>
                            <span className="text-rose-455 font-extrabold">33 u. (9 180 DA)</span>
                          </div>

                          <div className="flex justify-between text-slate-400">
                            <span>{translateProduct("MAIS 500g", lang)}</span>
                            <span className="text-rose-455 font-extrabold">3 u. (420 DA)</span>
                          </div>

                          <div className="flex justify-between text-slate-400">
                            <span>{translateProduct("PATES CHORBA 450G SOSEMIE", lang)}</span>
                            <span className="text-rose-455 font-extrabold">3 u. (192 DA)</span>
                          </div>
                        </div>
                      </div>

                    </div>
                  </div>

                  {/* Column 3: Recommendations (Recommandations) */}
                  <div className="p-4 rounded-xl bg-slate-950/50 border border-slate-800 space-y-4">
                    <h4 className="text-xs font-extrabold uppercase text-indigo-400 tracking-wider flex items-center gap-1.5">
                      <ShieldCheck className="w-4 h-4 text-indigo-400" />
                      {t('supervision_recs_col')}
                    </h4>

                    <div className="space-y-3 text-[11px] font-semibold">
                      <div className="flex gap-2 text-slate-300">
                        <span className="text-indigo-400 font-extrabold">1.</span>
                        <div className="leading-tight">
                          <strong className="text-white block font-bold">{lang === 'ar' ? 'إدارة التعرض للوكلاء المتصدرين' : `Gérer l'Exposition aux Tops`}</strong>
                          {lang === 'ar' ? 'تجميد حساب Mahrez إذا تجاوزت ديونه 5 ملايين د.ج. تشجيع وكلاء جامبو لتنويع المخاطر.' : `Geler MAHREZ si l'encours dépasse 5M DA. Pousser les Jumbo sellers pour diversifier.`}
                        </div>
                      </div>

                      <div className="flex gap-2 text-slate-300 border-t border-slate-800 pt-2">
                        <span className="text-indigo-400 font-extrabold">2.</span>
                        <div className="leading-tight">
                          <strong className="text-white block font-bold">{lang === 'ar' ? 'مراجعة مزيج المنتجات المربحة' : `Revoir le Mix Rentabilité`}</strong>
                          {lang === 'ar' ? 'ترقية مبيعات مرق مكعبات دجاج (63.7 مليون د.ج) وفاميكو (20.2 مليون د.ج) ذات القيمة العالية.' : 'Promouvoir Cube Poulet (63.7M DA) & Famico (20.2M DA) à forte valeur unitaire.'}
                        </div>
                      </div>

                      <div className="flex gap-2 text-slate-300 border-t border-slate-800 pt-2">
                        <span className="text-indigo-400 font-extrabold">3.</span>
                        <div className="leading-tight">
                          <strong className="text-white block font-bold">{lang === 'ar' ? 'هيكلة تحصيل الديون العالقة' : `Structurer le Recouvrement`}</strong>
                          {lang === 'ar' ? 'تجميد حساب BOURIAH (تحصيل بنسبة 25.50٪) وتفعيل تنبيهات الديون التلقائية.' : `Bloquer BOURIAH (recouvrement à 25.50%) et activer des alertes automatiques.`}
                        </div>
                      </div>

                      <div className="flex gap-2 text-slate-300 border-t border-slate-800 pt-2">
                        <span className="text-indigo-400 font-extrabold">4.</span>
                        <div className="leading-tight">
                          <strong className="text-white block font-bold">{lang === 'ar' ? 'توحيد وتنسيق مستندات نظام ERP' : `Uniformiser les Exports ERP`}</strong>
                          {lang === 'ar' ? 'تصحيح الخلل وتعديل محاذاة الأعمدة لتلقائية إصدار التقارير.' : `Corriger le décalage de colonnes de l'ERP Silwane pour automatiser les rapports.`}
                        </div>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            )}

            {/* Visual Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 min-w-0">
              
              {/* Daily Sales trend area chart */}
              <div className="lg:col-span-2 p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm min-w-0">
                <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100 dark:border-slate-850">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-indigo-500" />
                    <h3 className="font-bold text-slate-900 dark:text-white">{t('daily_evolution')}</h3>
                  </div>
                  <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Campagne Mai 2026</span>
                </div>
                
                <div className="h-[280px] w-full min-w-0" style={{ minHeight: '280px' }}>
                  <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={280}>
                    <AreaChart data={globalDailySales} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                      <defs>
                        <linearGradient id="globalSalesGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#059669" stopOpacity={0.25}/>
                          <stop offset="95%" stopColor="#059669" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={darkMode ? "#1F2937" : "#E5E7EB"} />
                      <XAxis dataKey="date" stroke={darkMode ? "#6B7280" : "#9CA3AF"} tick={{ fontSize: 10, fontWeight: 550 }} />
                      <YAxis 
                        stroke={darkMode ? "#6B7280" : "#9CA3AF"} 
                        tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} 
                        tick={{ fontSize: 10, fontWeight: 550 }}
                      />
                      <Tooltip 
                        formatter={(val) => [formatDA(val), lang === 'ar' ? 'المبيعات (خ.ر)' : 'Ventes HT']}
                        contentStyle={{ 
                          backgroundColor: darkMode ? '#111827' : '#FFFFFF', 
                          borderColor: darkMode ? '#374151' : '#E5E7EB',
                          color: darkMode ? '#FFFFFF' : '#111827',
                          borderRadius: '8px',
                          fontSize: '12px'
                        }}
                      />
                      <Area type="monotone" dataKey="sales_ht" stroke="#059669" strokeWidth={3} fillOpacity={1} fill="url(#globalSalesGrad)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Pre-sales Share Pie Chart */}
              <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col min-w-0">
                <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100 dark:border-slate-850">
                  <div className="flex items-center gap-2">
                    <Users className="w-5 h-5 text-indigo-500" />
                    <h3 className="font-bold text-slate-900 dark:text-white">{t('market_share_label')}</h3>
                  </div>
                </div>

                <div className="h-[200px] relative flex items-center justify-center flex-1 min-w-0" style={{ minHeight: '200px' }}>
                  <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={200}>
                    <PieChart>
                      <Pie
                        data={campaignData.preSales.filter(p => p.sales_ht > 0)}
                        cx="50%"
                        cy="50%"
                        innerRadius={55}
                        outerRadius={75}
                        paddingAngle={3}
                        dataKey="sales_ht"
                        nameKey="name"
                      >
                        {campaignData.preSales.map((entry, idx) => (
                          <Cell key={`cell-${idx}`} fill={CHART_COLORS[idx % CHART_COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip 
                        formatter={(val) => formatDA(val)}
                        contentStyle={{ 
                          backgroundColor: darkMode ? '#111827' : '#FFFFFF', 
                          borderColor: darkMode ? '#374151' : '#E5E7EB',
                          color: darkMode ? '#FFFFFF' : '#111827',
                          borderRadius: '8px',
                          fontSize: '12px'
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="absolute text-center">
                    <span className="text-[10px] uppercase font-bold text-slate-400">{t('total_sales_label')}</span>
                    <p className="text-xs font-extrabold text-slate-900 dark:text-white">
                      217.6M DA
                    </p>
                  </div>
                </div>

                {/* Micro Legend */}
                <div className="grid grid-cols-3 gap-2 mt-4 text-[10px] font-bold text-slate-500 dark:text-slate-400">
                  {campaignData.preSales.slice(0, 6).map((p, idx) => (
                    <div key={p.name} className="flex items-center gap-1.5 truncate">
                      <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: CHART_COLORS[idx % CHART_COLORS.length] }}></span>
                      <span className="truncate">{p.name} ({p.share_pct}%)</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Risk Mitigation Alerts Section */}
            <div className="p-5 rounded-2xl bg-rose-500/5 dark:bg-rose-950/10 border border-rose-500/20 relative overflow-hidden">
              <div className="absolute right-0 top-0 text-rose-500/10 pointer-events-none transform translate-x-4 -translate-y-4">
                <AlertTriangle className="w-48 h-48" />
              </div>
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 relative z-10">
                <div className="space-y-2 flex-1">
                  <div className="flex items-center gap-2 text-rose-800 dark:text-rose-400">
                    <AlertTriangle className="w-5 h-5 text-rose-500 flex-shrink-0" />
                    <h3 className="font-extrabold text-base tracking-tight">{t('financial_risk_mitigation')}</h3>
                  </div>
                  
                  {/* Summary dynamic text */}
                  <p className="text-xs text-rose-700/90 dark:text-rose-300/80 leading-relaxed max-w-[850px]">
                    <strong>{t('alert_outstanding')}</strong> {t('financial_risk_desc')} Le total des impayés s'élève à <strong>{formatDA(campaignData.metrics.outstandingReceivables)}</strong> (14.42% du CA).
                  </p>
                  
                  {/* Flushed accounts */}
                  <div className="flex flex-wrap gap-2 pt-2">
                    {campaignData.preSales.filter(p => p.recovery_rate < 90).map(p => (
                      <span 
                        key={p.name}
                        className="px-2.5 py-1 text-xs rounded-lg font-bold bg-rose-100 dark:bg-rose-900/40 text-rose-800 dark:text-rose-300 border border-rose-200 dark:border-rose-900/30 flex items-center gap-1.5"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span>
                        {p.name} : {p.recovery_rate}% Recouvrement (Restant : {formatDA(p.outstanding)})
                      </span>
                    ))}
                  </div>
                </div>

                {/* INTERACTIVE OPERATIONAL TODO CHECKLIST */}
                <div className="w-full md:w-[420px] p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-lg space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider flex items-center gap-1">
                      <CheckSquare className="w-3.5 h-3.5 text-indigo-500" /> {t('action_plan_label')}
                    </span>
                    <span className="text-[10px] font-extrabold text-indigo-600 bg-indigo-50 dark:bg-indigo-950 px-2 py-0.5 rounded">
                      {checkProgress.completed}/{checkProgress.total} Fait ({checkProgress.pct}%)
                    </span>
                  </div>

                  {/* Progress Bar */}
                  <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                    <div className="bg-indigo-600 h-full rounded-full transition-all duration-300" style={{ width: `${checkProgress.pct}%` }}></div>
                  </div>

                  <div className="space-y-2 text-xs font-semibold">
                    {checklist.map(item => (
                      <div 
                        key={item.id}
                        onClick={() => handleToggleCheck(item.id)}
                        className={`flex items-start gap-2.5 p-2 rounded-lg cursor-pointer transition-all hover:bg-slate-50 dark:hover:bg-slate-850/50 ${
                          item.completed ? 'text-slate-400 dark:text-slate-500 line-through' : 'text-slate-700 dark:text-slate-200'
                        }`}
                      >
                        {item.completed ? (
                          <CheckSquare className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                        ) : (
                          <Square className="w-4 h-4 text-slate-300 dark:text-slate-600 flex-shrink-0 mt-0.5" />
                        )}
                        <span className="leading-tight">{CHECKLIST_TR[item.id]?.[lang] || item.text}</span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </div>

            {/* Fiches d'Audit Clinique Panel (Extracted directly from page 6 & 7 of the Guide) */}
            <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 shadow-xl space-y-5">
              <div className="flex items-center gap-2 pb-3 border-b border-slate-800">
                <ShieldCheck className="w-5 h-5 text-emerald-400 animate-pulse" />
                <h3 className="font-black text-white text-lg">{t('audit_clinique_label')}</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                {DATASET.audits.map((a, idx) => {
                  // Determine status configurations for custom glowing colors and backgrounds
                  const statusColors = a.status === 'Critique' ? {
                    bg: 'bg-[#1A0B10] dark:bg-[#1A0B10]/60 border-rose-500/30 hover:border-rose-500 shadow-rose-950/20',
                    name: 'text-rose-100',
                    badge: 'bg-rose-900/30 text-rose-300 border-rose-500/20',
                    tauxText: 'text-rose-200',
                    encoursText: 'text-rose-400',
                    gridBorder: 'border-rose-950/40',
                    label: 'text-rose-300',
                    desc: 'text-rose-100/90',
                    listText: 'text-rose-200/90',
                    chevron: 'text-rose-400'
                  } : a.status === 'Vigilance' ? {
                    bg: 'bg-[#251B0D] dark:bg-[#251B0D]/60 border-amber-500/30 hover:border-amber-500 shadow-amber-950/20',
                    name: 'text-amber-100',
                    badge: 'bg-amber-900/30 text-amber-300 border-amber-500/20',
                    tauxText: 'text-amber-200',
                    encoursText: 'text-amber-400',
                    gridBorder: 'border-amber-950/40',
                    label: 'text-amber-300',
                    desc: 'text-amber-100/90',
                    listText: 'text-amber-200/90',
                    chevron: 'text-amber-400'
                  } : { // Succès / Très Bon
                    bg: 'bg-[#0E2417] dark:bg-[#0E2417]/60 border-emerald-500/30 hover:border-emerald-500 shadow-emerald-950/20',
                    name: 'text-emerald-100',
                    badge: 'bg-emerald-900/30 text-emerald-300 border-emerald-500/20',
                    tauxText: 'text-emerald-200',
                    encoursText: 'text-emerald-400',
                    gridBorder: 'border-emerald-950/40',
                    label: 'text-emerald-300',
                    desc: 'text-emerald-100/90',
                    listText: 'text-emerald-200/90',
                    chevron: 'text-emerald-400'
                  };

                  return (
                    <div 
                      key={idx}
                      className={`p-5 rounded-xl border flex flex-col justify-between gap-4 transition-all duration-300 hover:-translate-y-1 shadow-lg ${statusColors.bg}`}
                    >
                      <div className="space-y-3">
                        <div className="flex items-center justify-between gap-2">
                          <span className={`font-black text-base ${statusColors.name}`}>{a.rep}</span>
                          <span className={`px-2 py-0.5 text-[9px] font-extrabold rounded-md border uppercase tracking-wider ${statusColors.badge}`}>
                            {lang === 'ar' ? (a.status_ar || a.status) : a.status}
                          </span>
                        </div>

                        <div className={`grid grid-cols-2 gap-2 text-xs font-black py-2 border-y ${statusColors.gridBorder} ${statusColors.listText}`}>
                          <div>Taux : <span className={`font-black ${statusColors.tauxText}`}>{a.rate}%</span></div>
                          <div>Encours : <span className={`font-black ${statusColors.encoursText}`}>{formatDA(a.outstanding)}</span></div>
                        </div>

                        <div className="space-y-2 pt-1 text-xs font-semibold">
                          <p className={statusColors.desc}>
                            <strong className={`font-black block text-[10px] uppercase tracking-wider mb-0.5 ${statusColors.label}`}>{t('risk_symptoms')}</strong>
                            {lang === 'ar' ? (a.symptoms_ar || a.symptoms) : a.symptoms}
                          </p>
                          <p className={statusColors.desc}>
                            <strong className={`font-black block text-[10px] uppercase tracking-wider mb-0.5 ${statusColors.label}`}>{t('risk_causes')}</strong>
                            {lang === 'ar' ? (a.causes_ar || a.causes) : a.causes}
                          </p>
                        </div>
                      </div>

                      <div className={`pt-3 border-t ${statusColors.gridBorder} space-y-2`}>
                        <span className={`text-[10px] uppercase font-black tracking-wider block ${statusColors.label}`}>{t('risk_actions')}</span>
                        <ul className={`text-xs font-medium space-y-1.5 ${statusColors.listText}`}>
                          {(lang === 'ar' ? a.actions_ar : a.actions).map((act, i) => (
                            <li key={i} className="flex items-start gap-1.5">
                              <ChevronRight className={`w-3.5 h-3.5 mt-0.5 flex-shrink-0 ${statusColors.chevron}`} />
                              <span>{act}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Leaderboard Table (Pre-sales) & National Accounts */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
              
              {/* Leaderboard of Representatives */}
              <div className="xl:col-span-2 p-5 rounded-2xl bg-slate-950 border border-slate-800 shadow-xl flex flex-col">
                <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    <Award className="w-5 h-5 text-emerald-400" />
                    <h3 className="font-black text-white text-lg">{t('rank_performance_label')}</h3>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-slate-800 text-xs uppercase font-black text-slate-350 tracking-wider">
                        <th className={`py-2.5 px-3 ${alignStart}`}>{t('ranking')}</th>
                        <th className={`py-2.5 px-3 ${alignStart}`}>{t('representative')}</th>
                        <th className={`py-2.5 px-3 ${alignEnd}`}>{t('invoices_label')}</th>
                        <th className={`py-2.5 px-3 ${alignEnd}`}>{t('volume_units')}</th>
                        <th className={`py-2.5 px-3 ${alignEnd}`}>{t('ca_net')}</th>
                        <th className={`py-2.5 px-3 ${alignEnd}`}>{t('recovery')}</th>
                        <th className={`py-2.5 px-3 ${alignEnd}`}>{t('outstanding_amount')}</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60 text-xs font-semibold">
                      {campaignData.preSales.map((p, idx) => {
                        const isUnderThreshold = p.recovery_rate < 90;
                        const medalColors = idx === 0 ? 'bg-amber-950/40 text-amber-400 border-amber-600/30' : 
                                            idx === 1 ? 'bg-slate-800/40 text-slate-300 border-slate-700/30' :
                                            idx === 2 ? 'bg-amber-900/10 text-amber-500/50 border-amber-800/20' : 
                                            'bg-slate-900 text-slate-400 border-slate-800';
                        return (
                          <tr key={p.name} className="hover:bg-slate-900/40 transition-colors">
                            <td className="py-3 px-3">
                              <span className={`w-6 h-6 rounded-full border flex items-center justify-center font-bold text-xs ${medalColors}`}>
                                {idx + 1}
                              </span>
                            </td>
                            <td className="py-3 px-3">
                              <div className="flex items-center gap-2">
                                <span className="text-white font-black">{p.name}</span>
                                {isUnderThreshold && (
                                  <span className="px-1.5 py-0.5 text-[9px] font-extrabold rounded-md bg-rose-950/40 text-rose-300 border border-rose-900/20">
                                    Alerte
                                  </span>
                                )}
                              </div>
                            </td>
                            <td className="py-3 px-3 text-right text-slate-100 font-extrabold">{formatQty(p.invoices)}</td>
                            <td className="py-3 px-3 text-right text-slate-100 font-extrabold">{formatQty(p.volume)}</td>
                            <td className="py-3 px-3 text-right text-emerald-400 font-bold">{formatDA(p.sales_ht)}</td>
                            <td className={`py-3 px-3 text-right font-bold ${isUnderThreshold ? 'text-rose-400' : 'text-emerald-400'}`}>
                              {p.recovery_rate}%
                            </td>
                            <td className={`py-3 px-3 text-right font-bold ${p.outstanding > 0 ? 'text-rose-400' : 'text-slate-500'}`}>
                              {p.outstanding > 0 ? formatDA(p.outstanding) : '0,00 DA'}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* National Clients Directory */}
              <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 shadow-xl flex flex-col">
                <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    <Crown className="w-5 h-5 text-emerald-400" />
                    <h3 className="font-black text-white text-lg">{t('top_national_clients')}</h3>
                  </div>
                </div>

                <div className="space-y-3.5 flex-1 flex flex-col justify-center">
                  {DATASET.clients.map((c, i) => (
                    <div 
                      key={c.code} 
                      className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between gap-3 group hover:border-emerald-500 transition-all shadow-sm"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center font-bold text-sm">
                          {i + 1}
                        </div>
                        <div>
                          <p className="text-xs font-bold text-white group-hover:text-emerald-400 transition-colors">
                            {c.name}
                          </p>
                          <span className="text-[9px] uppercase font-bold text-slate-400 tracking-wider">
                            Code: {c.code} • Livraisons : {c.deliveries}
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-xs font-bold text-emerald-400">{formatDA(c.purchases_ht)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>

          </div>
        )}

        {/* ==========================================
            TAB 2: PRE-SALES PROFILER VIEW
            ========================================== */}
        {activeTab === 'prevendeurs' && (
          <div className="space-y-6 min-w-0">
            
            {/* Profiler Card */}
            <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm relative overflow-hidden">
              {/* Conditional Alert visual border glow */}
              {selectedPrev.recovery_rate < 90 && (
                <div className="absolute inset-0 border-2 border-rose-500/30 rounded-2xl pointer-events-none"></div>
              )}
              
              <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
                {/* Photo/Avatar Block */}
                <div className="flex sm:flex-col items-center gap-4 sm:gap-2 self-start sm:self-auto w-full sm:w-auto relative">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 p-0.5 shadow-md flex items-center justify-center text-white text-2xl sm:text-3xl font-extrabold shrink-0">
                    {selectedPrev.name[0]}
                  </div>
                  <span className="sm:absolute sm:bottom-0 sm:right-0 px-2.5 py-0.5 rounded-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-800 dark:text-white flex items-center justify-center shadow-sm">
                    #{selectedPrev.rank}
                  </span>
                </div>

                <div className="flex-1 text-left space-y-1.5 w-full">
                  <div className="flex flex-wrap items-center gap-2">
                    <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">{translateName(selectedPrev.name, lang)}</h2>
                    <span className="px-2 py-0.5 text-[9px] font-bold rounded-full bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400">
                      {lang === 'ar' ? `الرتبة ${selectedPrev.rank} في الأداء` : `Rang ${selectedPrev.rank} en Performance`}
                    </span>
                    {selectedPrev.recovery_rate < 90 && (
                      <span className="px-2 py-0.5 text-[9px] font-bold rounded-full bg-rose-100 dark:bg-rose-950/40 text-rose-700 dark:text-rose-400 border border-rose-200 dark:border-rose-900/20">
                        {lang === 'ar' ? 'حد الخطر المالي' : 'Seuil Risque Financier'}
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-slate-500 dark:text-slate-400 max-w-[650px] leading-relaxed">
                    {lang === 'ar' ? 'مندوب مبيعات ميداني مسؤول عن القطاع وتموين نقاط التوزيع. المنتج الأكثر رواجاً في هذه الفترة :' : `Commercial Terrain en charge du secteur et de l'approvisionnement des points de distribution. Produit vedette sur la période :`} <strong>{selectedPrev.top_product}</strong> (Volume : {formatQty(selectedPrev.top_product_qty)} unités).
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-850/60 border border-slate-200/50 dark:border-slate-800/80 text-center min-w-[200px]">
                  <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">{lang === 'ar' ? 'حصة السوق الكلية' : 'Part de Marché Quota'}</p>
                  <p className="text-3xl font-extrabold text-indigo-600 dark:text-indigo-400">{selectedPrev.share_pct}%</p>
                  <span className="text-[10px] font-bold text-slate-500">{lang === 'ar' ? 'من إجمالي الجهد المبيعات' : `De l'effort global de pré-ventes`}</span>
                </div>
              </div>
            </div>

            {/* Individual Operational KPI Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
              
              {/* Sales HT */}
              <div className="p-3.5 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm relative group">
                <div className={`absolute top-0 w-1.5 h-full bg-indigo-500 ${lang === 'ar' ? 'right-0' : 'left-0'}`}></div>
                <p className="text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Chiffre d'Affaires HT</p>
                <div className="text-xs min-[350px]:text-sm min-[390px]:text-base sm:text-2xl font-extrabold text-indigo-600 dark:text-indigo-400 mb-1">{formatDA(selectedPrev.sales_ht)}</div>
                <div className="text-[9px] sm:text-[11px] text-slate-500">Contribution : {selectedPrev.share_pct}%</div>
              </div>

              {/* Outstanding Receivables */}
              <div className="p-3.5 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm relative group">
                <div className={`absolute top-0 w-1.5 h-full bg-rose-500 ${lang === 'ar' ? 'right-0' : 'left-0'}`}></div>
                <p className="text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Reste à Recouvrer</p>
                <div className="text-xs min-[350px]:text-sm min-[390px]:text-base sm:text-2xl font-extrabold text-rose-500 mb-1">
                  {selectedPrev.outstanding > 0 ? formatDA(selectedPrev.outstanding) : '0,00 DA'}
                </div>
                <div className="text-[9px] sm:text-[11px] text-slate-500 flex items-center gap-1">
                  {selectedPrev.outstanding > 0 ? (
                    <span className="text-rose-500 font-bold flex items-center gap-0.5">
                      <AlertTriangle className="w-3 h-3" /> {lang === 'ar' ? 'ميزان ديون' : 'À surveiller'}
                    </span>
                  ) : (
                    <span className="text-emerald-500 font-bold">{lang === 'ar' ? 'مسوى بالكامل' : 'Purgé'}</span>
                  )}
                </div>
              </div>

              {/* Recovery Rate */}
              <div className="p-3.5 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm relative group">
                <div className={`absolute top-0 w-1.5 h-full bg-emerald-500 ${lang === 'ar' ? 'right-0' : 'left-0'}`}></div>
                <p className="text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">{t('recovery_rate_label')}</p>
                <div className={`text-xs min-[350px]:text-sm min-[390px]:text-base sm:text-2xl font-extrabold mb-1 ${selectedPrev.recovery_rate < 90 ? 'text-rose-500' : 'text-emerald-500'}`}>
                  {selectedPrev.recovery_rate}%
                </div>
                <div className="text-[9px] sm:text-[11px] text-slate-500">
                  {selectedPrev.recovery_rate < 90 ? (
                    <span className="text-rose-500 font-bold">Sous 90%</span>
                  ) : (
                    <span className="text-emerald-500 font-bold">{lang === 'ar' ? 'سداد ممتاز' : `Excellent`}</span>
                  )}
                </div>
              </div>

              {/* Basket & Deliveries */}
              <div className="p-3.5 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm relative group">
                <div className={`absolute top-0 w-1.5 h-full bg-teal-500 ${lang === 'ar' ? 'right-0' : 'left-0'}`}></div>
                <p className="text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">{lang === 'ar' ? 'السلة والفواتير' : 'Panier & Factures'}</p>
                <div className="text-xs min-[350px]:text-sm min-[390px]:text-base sm:text-2xl font-extrabold text-teal-600 dark:text-teal-400 mb-1">{formatDA(selectedPrev.avg_basket)}</div>
                <div className="text-[9px] sm:text-[11px] text-slate-500">
                  <span className="font-semibold text-slate-700 dark:text-slate-350">{selectedPrev.invoices} BL</span> • {selectedPrev.unique_clients} Clt
                </div>
              </div>

            </div>

            {/* Individual Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 min-w-0">
              
              {/* Daily Sales trend area chart */}
              <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm min-w-0">
                <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100 dark:border-slate-850">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-indigo-500" />
                    <h3 className="font-bold text-slate-900 dark:text-white">{lang === 'ar' ? 'المبيعات اليومية التفصيلية' : 'Ventes Journalières Quotidiennes'}</h3>
                  </div>
                  <span className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/20 px-2 py-0.5 rounded-full">{selectedPrev.name}</span>
                </div>
                
                <div className="h-[260px] w-full min-w-0" style={{ minHeight: '260px' }}>
                  <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={260}>
                    <AreaChart data={prevDailySales} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                      <defs>
                        <linearGradient id="prevSalesGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#10B981" stopOpacity={0.25}/>
                          <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={darkMode ? "#1F2937" : "#E5E7EB"} />
                      <XAxis dataKey="date" stroke={darkMode ? "#6B7280" : "#9CA3AF"} tick={{ fontSize: 10, fontWeight: 550 }} />
                      <YAxis 
                        stroke={darkMode ? "#6B7280" : "#9CA3AF"} 
                        tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} 
                        tick={{ fontSize: 10, fontWeight: 550 }}
                      />
                      <Tooltip 
                        formatter={(val) => [formatDA(val), lang === 'ar' ? 'المبيعات (خ.ر)' : 'Ventes HT']}
                        contentStyle={{ 
                          backgroundColor: darkMode ? '#111827' : '#FFFFFF', 
                          borderColor: darkMode ? '#374151' : '#E5E7EB',
                          color: darkMode ? '#FFFFFF' : '#111827',
                          borderRadius: '8px',
                          fontSize: '12px'
                        }}
                      />
                      <Area type="monotone" dataKey="sales_ht" stroke="#10B981" strokeWidth={3} fillOpacity={1} fill="url(#prevSalesGrad)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Product value breakdown */}
              <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm min-w-0">
                <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100 dark:border-slate-850">
                  <div className="flex items-center gap-2">
                    <ShoppingBag className="w-5 h-5 text-indigo-500" />
                    <h3 className="font-bold text-slate-900 dark:text-white">{lang === 'ar' ? 'توزيع مبيعات المنتجات حسب القيمة' : 'Répartition Produit en Valeur (HT)'}</h3>
                  </div>
                </div>

                <div className="h-[260px] w-full min-w-0" style={{ minHeight: '260px' }}>
                  <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={260}>
                    <BarChart data={prevProductData} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={darkMode ? "#1F2937" : "#E5E7EB"} />
                      <XAxis dataKey="name" stroke={darkMode ? "#6B7280" : "#9CA3AF"} tick={{ fontSize: 10, fontWeight: 550 }} />
                      <YAxis 
                        stroke={darkMode ? "#6B7280" : "#9CA3AF"} 
                        tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} 
                        tick={{ fontSize: 10, fontWeight: 550 }}
                      />
                      <Tooltip 
                        formatter={(val) => formatDA(val)}
                        contentStyle={{ 
                          backgroundColor: darkMode ? '#111827' : '#FFFFFF', 
                          borderColor: darkMode ? '#374151' : '#E5E7EB',
                          color: darkMode ? '#FFFFFF' : '#111827',
                          borderRadius: '8px',
                          fontSize: '12px'
                        }}
                      />
                      <Bar dataKey="value" fill="#059669" radius={[6, 6, 0, 0]}>
                        {prevProductData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

            </div>

            {/* Pre-sales product tracking micro tables */}
            <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100 dark:border-slate-850">
                <div className="flex items-center gap-2">
                  <Package className="w-5 h-5 text-indigo-500" />
                  <h3 className="font-bold text-slate-900 dark:text-white">{t('performance_micro_label')}</h3>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-slate-200 dark:border-slate-800 text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                      <th className={`py-2.5 px-3 ${alignStart}`}>{lang === 'ar' ? 'المادة المرجعية' : 'Article Spécifique'}</th>
                      <th className={`py-2.5 px-3 ${alignEnd}`}>{lang === 'ar' ? 'الحجم الموزع (التقديري)' : 'Volume Distribué (Estimé)'}</th>
                      <th className={`py-2.5 px-3 ${alignEnd}`}>{lang === 'ar' ? 'القيمة التقديرية (خ.ر)' : 'Valeur Estimée HT'}</th>
                      <th className={`py-2.5 px-3 ${alignEnd}`}>{lang === 'ar' ? 'المساهمة في ر.أ للوكيل' : 'Contribution CA Agent'}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 text-xs font-semibold">
                    {[
                      { designation: selectedPrev.top_product, qty: selectedPrev.top_product_qty, val: selectedPrev.sales_ht * 0.45, contrib: '45.0%' },
                      { designation: "Couscous Moyen Safina Alternative", qty: Math.round(selectedPrev.volume * 0.25), val: selectedPrev.sales_ht * 0.25, contrib: '25.0%' },
                      { designation: "Gamme Famico Carton Complémentaire", qty: Math.round(selectedPrev.volume * 0.18), val: selectedPrev.sales_ht * 0.18, contrib: '18.0%' },
                      { designation: "Autres Articles Divers SILWANE", qty: Math.round(selectedPrev.volume * 0.12), val: selectedPrev.sales_ht * 0.12, contrib: '12.0%' }
                    ].map((item, idx) => (
                      <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-slate-850/50 transition-colors">
                        <td className="py-3 px-3 text-slate-900 dark:text-white font-bold">{translateProduct(item.designation, lang)}</td>
                        <td className={`py-3 px-3 text-right text-slate-500 font-semibold`}>{formatQty(item.qty)} {lang === 'ar' ? 'وحدة' : 'unités'}</td>
                        <td className="py-3 px-3 text-right text-emerald-600 dark:text-emerald-400 font-bold">{formatDA(item.val)}</td>
                        <td className="py-3 px-3 text-right text-indigo-600 dark:text-indigo-400 font-bold">{item.contrib}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        )}

        {/* ==========================================
            TAB 3: CATALOGUE & CLIENTS EXPLORER
            ========================================== */}
        {activeTab === 'explorer' && (
          <div className="space-y-6 min-w-0">
            
            {/* Twin Search Columns */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 min-w-0">
              
              {/* Product Catalog */}
              <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col min-w-0">
                <div className="pb-4 mb-4 border-b border-slate-100 dark:border-slate-850 flex flex-col md:flex-row md:items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <Package className="w-5 h-5 text-indigo-500" />
                    <h3 className="font-bold text-slate-900 dark:text-white">{t('product_catalog_label')}</h3>
                  </div>
                  
                  {/* Search input */}
                  <div className="relative w-full md:w-[200px]">
                    <Search className="w-4 h-4 text-slate-400 absolute left-2.5 top-1/2 transform -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder={t('search_placeholder_product')}
                      value={productSearch}
                      onChange={(e) => setProductSearch(e.target.value)}
                      className="w-full py-1 px-3 pl-8 text-xs font-semibold rounded-lg bg-slate-100 dark:bg-slate-850 border border-transparent dark:border-slate-800 text-slate-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                </div>

                <div className="overflow-x-auto flex-1" style={{ maxHeight: '500px' }}>
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-slate-200 dark:border-slate-800 text-[10px] uppercase font-bold text-slate-400 tracking-wider sticky top-0 bg-white dark:bg-slate-900">
                        <th className={`py-2.5 px-3 ${alignStart}`}>{t('ranking')}</th>
                        <th className="py-2.5 px-3">Désignation</th>
                        <th className={`py-2.5 px-3 ${alignEnd}`}>{t('volume_units')}</th>
                        <th className="py-2.5 px-3 text-right">CA Net (HT)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 text-xs font-semibold">
                      {filteredProducts.length === 0 ? (
                        <tr>
                          <td colSpan="4" className="py-5 text-center text-slate-400 font-medium">
                            Aucun produit ne correspond à votre filtre.
                          </td>
                        </tr>
                      ) : (
                        filteredProducts.map((p, idx) => (
                          <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-slate-850/50 transition-colors">
                            <td className="py-3 px-3 text-slate-400">#{p.rank}</td>
                            <td className="py-3 px-3 text-slate-900 dark:text-white font-bold">{translateProduct(p.designation, lang)}</td>
                            <td className="py-3 px-3 text-right text-slate-500">{formatQty(p.volume)}</td>
                            <td className="py-3 px-3 text-right text-indigo-600 dark:text-indigo-400 font-bold">{formatDA(p.revenue_ht)}</td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Client List */}
              <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col min-w-0">
                <div className="pb-4 mb-4 border-b border-slate-100 dark:border-slate-850 flex flex-col md:flex-row md:items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <Users className="w-5 h-5 text-indigo-500" />
                    <h3 className="font-bold text-slate-900 dark:text-white">{t('client_accounts_label')}</h3>
                  </div>

                  {/* Search input */}
                  <div className="relative w-full md:w-[200px]">
                    <Search className="w-4 h-4 text-slate-400 absolute left-2.5 top-1/2 transform -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder={t('search_placeholder_client')}
                      value={clientSearch}
                      onChange={(e) => setClientSearch(e.target.value)}
                      className="w-full py-1 px-3 pl-8 text-xs font-semibold rounded-lg bg-slate-100 dark:bg-slate-850 border border-transparent dark:border-slate-800 text-slate-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                </div>

                <div className="overflow-x-auto flex-1" style={{ maxHeight: '500px' }}>
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-slate-200 dark:border-slate-800 text-[10px] uppercase font-bold text-slate-400 tracking-wider sticky top-0 bg-white dark:bg-slate-900">
                        <th className="py-2.5 px-3">Code</th>
                        <th className="py-2.5 px-3">Intitulé Client</th>
                        <th className="py-2.5 px-3 text-right">Nbr Factures</th>
                        <th className="py-2.5 px-3 text-right">Achats Globaux HT</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 text-xs font-semibold">
                      {filteredClients.length === 0 ? (
                        <tr>
                          <td colSpan="4" className="py-5 text-center text-slate-400 font-medium">
                            Aucun compte client ne correspond à votre recherche.
                          </td>
                        </tr>
                      ) : (
                        filteredClients.map((c, idx) => (
                          <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-slate-850/50 transition-colors">
                            <td className="py-3 px-3 text-slate-400 font-bold">{c.code}</td>
                            <td className="py-3 px-3 text-slate-900 dark:text-white font-bold">{c.name}</td>
                            <td className="py-3 px-3 text-right text-slate-500">{c.deliveries}</td>
                            <td className="py-3 px-3 text-right text-emerald-600 dark:text-emerald-400 font-bold">{formatDA(c.purchases_ht)}</td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

            </div>

          </div>
        )}

        {/* ==========================================
            TAB: REGIONAL MATRIX
            ========================================== */}
        {activeTab === 'matrix' && (
          <div className="space-y-6 animate-fadeIn min-w-0">
            
            {/* Header section with toggle */}
            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">{t('matrix_title')}</h3>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400">{t('matrix_subtitle')}</p>
              </div>
              
              {/* Toggle switch for display values */}
              <div className="flex p-0.5 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700/50 self-start md:self-auto">
                <button
                  onClick={() => setMatrixView('value')}
                  className={`px-3 py-1.5 text-xs font-bold rounded-md transition-all flex items-center gap-1.5 cursor-pointer ${
                    matrixView === 'value'
                      ? 'bg-indigo-600 text-white shadow-sm'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <DollarSign className="w-3.5 h-3.5" />
                  <span>{t('currency_view')}</span>
                </button>
                <button
                  onClick={() => setMatrixView('percentage')}
                  className={`px-3 py-1.5 text-xs font-bold rounded-md transition-all flex items-center gap-1.5 cursor-pointer ${
                    matrixView === 'percentage'
                      ? 'bg-indigo-600 text-white shadow-sm'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <Percent className="w-3.5 h-3.5" />
                  <span>{t('market_share_view')}</span>
                </button>
              </div>
            </div>

            {/* Main Interactive Table Card */}
            <div className="p-3.5 sm:p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden min-w-0">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-[1000px]">
                  <thead>
                    <tr className="border-b border-slate-150 dark:border-slate-800">
                      <th className={`sticky left-0 bg-white dark:bg-slate-900 z-20 shadow-[2px_0_5px_-2px_rgba(0,0,0,0.1)] border-r border-slate-200 dark:border-slate-800 py-4 px-4 font-bold text-xs uppercase tracking-wider text-slate-500 dark:text-slate-450 ${alignStart}`}>
                        {t('zone_header')}
                      </th>
                      {MATRIX_AGENTS.map(agent => (
                        <th key={agent} className={`py-4 px-3 font-bold text-xs uppercase tracking-wider text-slate-500 dark:text-slate-450 ${alignEnd}`}>
                          {agent}
                        </th>
                      ))}
                      <th className={`py-4 px-4 font-bold text-xs uppercase tracking-wider text-indigo-600 dark:text-indigo-400 bg-indigo-50/30 dark:bg-indigo-950/10 ${alignEnd}`}>
                        {t('total_zone_label')}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {REGIONAL_MATRIX.map((row, rIdx) => {
                      const zoneLabel = lang === 'ar' ? row.zone_ar : row.zone;
                      return (
                        <tr key={rIdx} className="group border-b border-slate-100 dark:border-slate-850 hover:bg-slate-50/50 dark:hover:bg-slate-850/30 transition-colors">
                          <td className={`sticky left-0 bg-white dark:bg-slate-900 group-hover:bg-slate-50 dark:group-hover:bg-slate-800/40 z-10 shadow-[2px_0_5px_-2px_rgba(0,0,0,0.1)] border-r border-slate-200 dark:border-slate-800 py-3 px-4 font-bold text-sm text-slate-800 dark:text-slate-200 transition-colors ${alignStart}`}>
                            {zoneLabel}
                          </td>
                          {MATRIX_AGENTS.map(agent => {
                            const val = row.sales[agent] || 0;
                            const share = val > 0 ? (val / row.total) * 100 : 0;
                            
                            // Check leadership highlights (highest non-zero value in row)
                            const maxRowValue = Math.max(...Object.values(row.sales));
                            const isLeader = val > 0 && val === maxRowValue;
                            
                            let cellContent = '-';
                            if (val > 0) {
                              if (matrixView === 'value') {
                                cellContent = new Intl.NumberFormat('fr-FR', { maximumFractionDigits: 0 }).format(val) + ' DA';
                              } else {
                                cellContent = share.toFixed(1) + '%';
                              }
                            }
                            
                            return (
                              <td 
                                key={agent} 
                                className={`py-3 px-3 text-xs ${alignEnd} transition-all duration-150 ${
                                  val > 0 
                                    ? isLeader 
                                      ? 'font-bold text-emerald-600 dark:text-emerald-455' 
                                      : 'font-semibold text-slate-700 dark:text-slate-300'
                                    : 'text-slate-300 dark:text-slate-700 font-medium'
                                }`}
                              >
                                {val > 0 && isLeader ? (
                                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-emerald-100/80 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-400 border border-emerald-200/40 dark:border-emerald-900/20 font-bold shadow-sm">
                                    {cellContent}
                                  </span>
                                ) : (
                                  <span>{cellContent}</span>
                                )}
                              </td>
                            );
                          })}
                          <td className={`py-3 px-4 font-bold text-sm text-indigo-600 dark:text-indigo-400 bg-indigo-50/20 dark:bg-indigo-950/5 ${alignEnd}`}>
                            {formatDA(row.total)}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Insights panel */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 min-w-0">
              
              <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
                <div className="flex items-center gap-2 pb-3 border-b border-slate-100 dark:border-slate-800">
                  <Crown className="w-5 h-5 text-amber-500" />
                  <h4 className="font-bold text-slate-900 dark:text-white">{t('matrix_insights')}</h4>
                </div>
                
                <div className="space-y-3.5">
                  <div className="flex gap-3 items-start">
                    <span className="p-1.5 rounded-lg bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 mt-0.5">
                      <MapPin className="w-4 h-4" />
                    </span>
                    <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-semibold">
                      {t('matrix_insight_1')}
                    </p>
                  </div>
                  
                  <div className="flex gap-3 items-start">
                    <span className="p-1.5 rounded-lg bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 mt-0.5">
                      <Activity className="w-4 h-4" />
                    </span>
                    <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-semibold">
                      {t('matrix_insight_2')}
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
                <div className="flex items-center gap-2 pb-3 border-b border-slate-100 dark:border-slate-800">
                  <Award className="w-5 h-5 text-indigo-500" />
                  <h4 className="font-bold text-slate-900 dark:text-white">
                    {lang === 'ar' ? 'التكامل الميداني الفعال' : 'Intégration & Exclusivité Territoriale'}
                  </h4>
                </div>
                
                <div className="space-y-3.5">
                  <div className="flex gap-3 items-start">
                    <span className="p-1.5 rounded-lg bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 mt-0.5">
                      <TrendingUp className="w-4 h-4" />
                    </span>
                    <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-semibold">
                      {t('matrix_insight_3')}
                    </p>
                  </div>
                  
                  <div className="flex gap-3 items-start">
                    <span className="p-1.5 rounded-lg bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 mt-0.5">
                      <ShieldCheck className="w-4 h-4" />
                    </span>
                    <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-semibold">
                      {t('matrix_insight_4')}
                    </p>
                  </div>
                </div>
              </div>

            </div>

          </div>
        )}

        {/* ==========================================
            TAB 4: DOCUMENTS & PDF PREVIEWER
            ========================================== */}
        {activeTab === 'documents' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 min-w-0">
            
            {/* Documents List Panel */}
            <div className="lg:col-span-5 space-y-4">
              <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
                <div className="flex items-center gap-2 pb-3 mb-3 border-b border-slate-100 dark:border-slate-850">
                  <FileText className="w-5 h-5 text-indigo-500" />
                  <h3 className="font-bold text-slate-900 dark:text-white">{t('reports_list_label')}</h3>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  {t('reports_desc')}
                </p>
              </div>

              <div className="space-y-3">
                {DATASET.documents.map((doc) => {
                  const isSelected = doc.id === selectedDocId;
                  return (
                    <div
                      key={doc.id}
                      onClick={() => setSelectedDocId(doc.id)}
                      className={`p-4 rounded-2xl border transition-all duration-200 cursor-pointer flex flex-col gap-2 relative group hover:-translate-y-0.5 ${
                        isSelected 
                          ? 'bg-indigo-600 border-indigo-600 text-white shadow-lg shadow-indigo-600/10' 
                          : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800/80 text-slate-800 dark:text-slate-200 hover:border-indigo-500/50'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-center gap-2">
                          <span className={`px-2 py-0.5 rounded text-[9px] font-bold ${
                            isSelected 
                              ? 'bg-white/20 text-white' 
                              : 'bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400'
                          }`}>
                            {doc.type}
                          </span>
                        </div>
                        <span className={`text-[10px] font-bold ${isSelected ? 'text-indigo-200' : 'text-slate-400'}`}>
                          {doc.size}
                        </span>
                      </div>


                      <div>
                        <h4 className="text-sm font-bold truncate">{lang === 'ar' ? (doc.id === 'rapport-supervision' ? 'تقرير الإشراف المالي والتحصيل' : doc.id === 'guide-kpis' ? 'دليل مؤشرات الأداء الشامل' : doc.id === 'rapport-analyse' ? 'تقرير التحليل التجاري العام' : doc.id === 'comparatif-prevendeurs' ? 'مقارنة أداء البائعين الميدانيين' : doc.id === 'comparatif-regions' ? 'المقارنة الإقليمية والتغطية الجغرافية' : 'ملخص المبيعات الجغرافي') : doc.title}</h4>
                        <p className={`text-[11px] font-semibold truncate ${isSelected ? 'text-indigo-100' : 'text-slate-400'}`}>
                          {lang === 'ar' ? 'الملف' : 'Fichier'} : {doc.name}
                        </p>
                      </div>

                      <p className={`text-[11px] leading-relaxed line-clamp-2 mt-1 ${isSelected ? 'text-indigo-100/90' : 'text-slate-500 dark:text-slate-400'}`}>
                        {lang === 'ar' ? (doc.id === 'rapport-supervision' ? 'إشراف نقدي دقيق لمؤشرات الأداء سيلوان ERP. تحذير من تركز المبيعات وتضخم الديون العالقة.' : doc.id === 'guide-kpis' ? 'وثيقة توجيهية تحدد مؤشرات الأداء وطريقة العمل الميدانية ومعايير الملاءة المالية للبائعين.' : doc.id === 'rapport-analyse' ? 'تدقيق ملخص الأداء التجاري لشهر ماي 2026. تحليل نسب الديون وخطة العمل الاستراتيجية.' : doc.id === 'comparatif-prevendeurs' ? 'تقييم متقاطع لنشاط الوكلاء التجاريين في الميدان ومتابعة مستحقات الزبائن.' : doc.id === 'comparatif-regions' ? 'خارطة التوزيع الجغرافي للمبيعات ونسبة التغطية وحصة السوق لكل بائع.' : 'ملخص موجز للمبيعات حسب المناطق الإقليمية والكميات الموزعة.') : doc.description}
                      </p>

                    </div>
                  );
                })}
              </div>
            </div>

            {/* Embedded PDF Viewer Panel */}
            <div className="lg:col-span-7 p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col min-w-0">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-4 border-b border-slate-100 dark:border-slate-850 gap-3">
                <div>
                  <h3 className="font-extrabold text-base text-slate-900 dark:text-white flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-indigo-500 animate-pulse" />
                    {t('pdf_viewer_label')}
                  </h3>
                  <p className="text-[11px] font-bold text-slate-400 truncate mt-0.5">
                    {t('active_viewing')} {selectedDoc.title} ({selectedDoc.name})
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <a
                    href={selectedDoc.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-lg bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 border border-indigo-200/50 dark:border-indigo-900/30 hover:bg-indigo-100 dark:hover:bg-indigo-900/50 transition-colors"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>{t('new_tab_label')}</span>
                  </a>

                  <a
                    href={selectedDoc.url}
                    download={selectedDoc.name}
                    className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-lg bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 border border-emerald-200/50 dark:border-emerald-900/30 hover:bg-emerald-100 dark:hover:bg-emerald-900/50 transition-colors"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>{t('download_label')}</span>
                  </a>
                </div>
              </div>

              {/* Document Display Iframe container */}
              <div className="flex-1 rounded-xl bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-850 relative overflow-hidden" style={{ minHeight: '520px' }}>
                <iframe
                  src={`${selectedDoc.url}#toolbar=1`}
                  className="w-full h-full absolute inset-0 border-0 rounded-xl"
                  title={`Visionneuse PDF SILWANE ERP - ${selectedDoc.title}`}
                >
                  <div className="p-8 text-center space-y-4">
                    <p className="text-sm font-medium text-slate-500">
                      Votre navigateur ne supporte pas la prévisualisation des PDF directement dans la page.
                    </p>
                    <a
                      href={selectedDoc.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg font-bold"
                    >
                      Ouvrir le document PDF
                    </a>
                  </div>
                </iframe>
              </div>
            </div>

          </div>
        )}

      </main>

      {/* ==========================================
          FOOTER
          ========================================== */}
      <footer className="w-full border-t border-slate-200 dark:border-slate-800/80 bg-white dark:bg-[#0B0F19] py-5 mt-10">
        <div className="max-w-[1550px] mx-auto px-4 md:px-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 dark:text-slate-400 gap-4 font-semibold">
          <p>{t('footer_text')}</p>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1"><Info className="w-3.5 h-3.5 text-indigo-500" /> {t('footer_version')}</span>
            <span className="text-indigo-600 dark:text-indigo-400">{t('footer_localized')}</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
