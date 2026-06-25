// ─── Pricing ────────────────────────────────────────────────────────────────

export interface PricingTier {
  id: string;
  name: string;
  label: string;
  platformFee: number | "custom";
  maxAmount: number | null;
  minAmount: number;
  features: string[];
  highlighted?: boolean;
}

export const PRICING_TIERS: PricingTier[] = [
  {
    id: "starter",
    name: "Starter Account",
    label: "Free",
    platformFee: 0,
    maxAmount: null,
    minAmount: 0,
    features: [
      "Create secure deal drafts",
      "Send secure deal links",
      "Invite the other party",
      "Preview deal terms",
      "Preview protection fees",
    ],
  },
  {
    id: "standard",
    name: "Standard Protected Deal",
    label: "$2.99 per deal",
    platformFee: 2.99,
    maxAmount: 1001,
    minAmount: 0,
    features: [
      "Secure deal link",
      "Written agreement record",
      "Protected payment workflow",
      "Evidence timeline",
      "Proof upload",
      "Approve or dispute flow",
    ],
  },
  {
    id: "plus",
    name: "Plus Protected Deal",
    label: "$4.99 per deal",
    platformFee: 4.99,
    maxAmount: 2500,
    minAmount: 1001.01,
    highlighted: true,
    features: [
      "Everything in Standard",
      "Higher deal limit (up to $2,500)",
      "Stronger safety review",
      "Evidence packet included",
      "Recommended verification",
    ],
  },
  {
    id: "secure_max",
    name: "Secure Max Protected Deal",
    label: "$9.99 per deal",
    platformFee: 9.99,
    maxAmount: 5000,
    minAmount: 2500.01,
    features: [
      "Everything in Plus",
      "Highest standard deal limit (up to $5,000)",
      "Enhanced verification prompts",
      "Priority dispute packet",
      "Manual review triggers for risk factors",
    ],
  },
  {
    id: "manual",
    name: "Manual Review",
    label: "Custom",
    platformFee: "custom",
    maxAmount: null,
    minAmount: 5000.01,
    features: [
      "Verified or business users only",
      "Manual compliance review",
      "Custom approval process",
      "Provider eligibility required",
    ],
  },
];

export function getPlatformFee(amount: number): number | "custom" {
  if (amount <= 1001) return 2.99;
  if (amount <= 2500) return 4.99;
  if (amount <= 5000) return 9.99;
  return "custom";
}

export function getPricingTier(amount: number): PricingTier {
  if (amount <= 1001) return PRICING_TIERS[1];
  if (amount <= 2500) return PRICING_TIERS[2];
  if (amount <= 5000) return PRICING_TIERS[3];
  return PRICING_TIERS[4];
}

export const PROVIDER_FEES: Record<string, { label: string; rate: number; flat: number }> = {
  bank: { label: "Bank Transfer (ACH / Wire)", rate: 0.0025, flat: 0 },
  card: { label: "Credit / Debit Card", rate: 0.029, flat: 0.30 },
  escrow: { label: "Certified Escrow Partner", rate: 0.01, flat: 0 },
};

export function estimateProviderFee(amount: number, methodId: string): number {
  const m = PROVIDER_FEES[methodId];
  if (!m) return 0;
  return amount * m.rate + m.flat;
}

// ─── Deals ───────────────────────────────────────────────────────────────────

export type DealStatus =
  | "draft"
  | "pending_terms"
  | "pending_funding"
  | "active"
  | "pending_approval"
  | "approved"
  | "disputed"
  | "completed"
  | "cancelled";

export type DisputeStatus = "open" | "under_review" | "resolved" | "escalated";

export interface Deal {
  id: string;
  title: string;
  counterparty: string;
  amount: number;
  currency: string;
  status: DealStatus;
  createdAt: string;
  deadline: string;
  safetyScore: number;
  dealType: string;
  description: string;
  termsAccepted: boolean;
  funded: boolean;
  proofSubmitted: boolean;
}

export interface Dispute {
  id: string;
  dealId: string;
  dealTitle: string;
  filedBy: string;
  reason: string;
  status: DisputeStatus;
  filedAt: string;
  amount: number;
}

export interface EvidenceItem {
  id: string;
  type: "file" | "message" | "payment" | "signature" | "system";
  title: string;
  description: string;
  timestamp: string;
  author: string;
  verified: boolean;
}

export const MOCK_DEALS: Deal[] = [
  {
    id: "deal-001",
    title: "Software Development Contract",
    counterparty: "Nexus Digital Ltd.",
    amount: 45000,
    currency: "USD",
    status: "active",
    createdAt: "2026-06-01",
    deadline: "2026-08-15",
    safetyScore: 87,
    dealType: "Service Contract",
    description:
      "Full-stack development of e-commerce platform with payment integration.",
    termsAccepted: true,
    funded: true,
    proofSubmitted: false,
  },
  {
    id: "deal-002",
    title: "Real Estate Earnest Money",
    counterparty: "Harborview Properties",
    amount: 120000,
    currency: "USD",
    status: "pending_approval",
    createdAt: "2026-06-10",
    deadline: "2026-07-01",
    safetyScore: 94,
    dealType: "Real Estate",
    description: "Earnest money deposit for 3BR property at 142 Lakeshore Dr.",
    termsAccepted: true,
    funded: true,
    proofSubmitted: true,
  },
  {
    id: "deal-003",
    title: "Brand Partnership Agreement",
    counterparty: "Apex Media Group",
    amount: 18500,
    currency: "USD",
    status: "pending_funding",
    createdAt: "2026-06-14",
    deadline: "2026-09-30",
    safetyScore: 71,
    dealType: "Partnership",
    description: "12-month brand ambassador and content licensing agreement.",
    termsAccepted: true,
    funded: false,
    proofSubmitted: false,
  },
  {
    id: "deal-004",
    title: "Equipment Supply Deal",
    counterparty: "Sterling Industrial Co.",
    amount: 67250,
    currency: "USD",
    status: "disputed",
    createdAt: "2026-05-20",
    deadline: "2026-06-30",
    safetyScore: 42,
    dealType: "Supply Agreement",
    description: "Purchase of CNC machinery and installation services.",
    termsAccepted: true,
    funded: true,
    proofSubmitted: true,
  },
  {
    id: "deal-005",
    title: "Consulting Retainer",
    counterparty: "Prime Strategy Partners",
    amount: 9600,
    currency: "USD",
    status: "draft",
    createdAt: "2026-06-18",
    deadline: "2026-12-31",
    safetyScore: 55,
    dealType: "Consulting",
    description: "Strategic advisory retainer — 8 hours/month for 6 months.",
    termsAccepted: false,
    funded: false,
    proofSubmitted: false,
  },
];

export const MOCK_DISPUTES: Dispute[] = [
  {
    id: "disp-001",
    dealId: "deal-004",
    dealTitle: "Equipment Supply Deal",
    filedBy: "You",
    reason: "Equipment delivered 3 weeks late with missing components.",
    status: "under_review",
    filedAt: "2026-06-15",
    amount: 67250,
  },
  {
    id: "disp-002",
    dealId: "deal-007",
    dealTitle: "Marketing Campaign Services",
    filedBy: "Bright Media LLC",
    reason: "Deliverables did not meet agreed specifications.",
    status: "resolved",
    filedAt: "2026-05-02",
    amount: 12400,
  },
];

export const MOCK_EVIDENCE: EvidenceItem[] = [
  {
    id: "ev-001",
    type: "system",
    title: "Deal Created",
    description: "Deal terms drafted and saved.",
    timestamp: "2026-06-01T09:00:00Z",
    author: "System",
    verified: true,
  },
  {
    id: "ev-002",
    type: "signature",
    title: "Terms Accepted — You",
    description: "You reviewed and accepted the deal terms.",
    timestamp: "2026-06-02T11:32:00Z",
    author: "You",
    verified: true,
  },
  {
    id: "ev-003",
    type: "signature",
    title: "Terms Accepted — Nexus Digital Ltd.",
    description: "Counterparty reviewed and accepted the deal terms.",
    timestamp: "2026-06-02T14:15:00Z",
    author: "Nexus Digital Ltd.",
    verified: true,
  },
  {
    id: "ev-004",
    type: "payment",
    title: "Funds Protected",
    description: "$45,000 USD secured via third-party escrow partner.",
    timestamp: "2026-06-03T10:00:00Z",
    author: "System",
    verified: true,
  },
  {
    id: "ev-005",
    type: "message",
    title: "Milestone Update",
    description: "Phase 1 (API integration) completed and delivered.",
    timestamp: "2026-06-15T16:45:00Z",
    author: "Nexus Digital Ltd.",
    verified: false,
  },
  {
    id: "ev-006",
    type: "file",
    title: "Proof Submitted",
    description: "delivery_confirmation_phase1.pdf uploaded.",
    timestamp: "2026-06-16T09:30:00Z",
    author: "Nexus Digital Ltd.",
    verified: true,
  },
];

export const STATUS_CONFIG: Record<
  DealStatus,
  { label: string; color: string; bg: string }
> = {
  draft: {
    label: "Draft",
    color: "text-[#6b7fa3]",
    bg: "bg-[#1a2d4f]",
  },
  pending_terms: {
    label: "Pending Terms",
    color: "text-[#e8c96a]",
    bg: "bg-[#3a2e0a]",
  },
  pending_funding: {
    label: "Pending Funding",
    color: "text-[#e8c96a]",
    bg: "bg-[#3a2e0a]",
  },
  active: {
    label: "Active",
    color: "text-[#22c55e]",
    bg: "bg-[#052e16]",
  },
  pending_approval: {
    label: "Pending Approval",
    color: "text-[#e8c96a]",
    bg: "bg-[#3a2e0a]",
  },
  approved: {
    label: "Approved",
    color: "text-[#22c55e]",
    bg: "bg-[#052e16]",
  },
  disputed: {
    label: "Disputed",
    color: "text-[#ef4444]",
    bg: "bg-[#450a0a]",
  },
  completed: {
    label: "Completed",
    color: "text-[#22c55e]",
    bg: "bg-[#052e16]",
  },
  cancelled: {
    label: "Cancelled",
    color: "text-[#6b7fa3]",
    bg: "bg-[#1a2d4f]",
  },
};
