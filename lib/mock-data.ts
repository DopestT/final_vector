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
