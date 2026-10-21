const DEMO_DATA = {
  claim: {
    claimNumber: "456-LW-26002847-3",
    title: "Tap Water — Rented Apartment",
    policyholder: "Sabine Meier",
    tenant: "Marco Bauer",
    lossDate: "12.06.2026",
    reportDate: "15.06.2026",
    lossLocation: "Schillerstra\u00dfe 17, Ground Floor, 80336 Munich"
  },

  summary: {
    totalClaimEur: 5480.00,
    forwardedTo: "Recourse Department",
    counterparty: "Allianz Versicherungs-AG",
    policyNumber: "PHV-2025-884721",
    recourseType: "Tenant Recourse"
  },

  intro: {
    title: "Recourse Agent Demo",
    subtitle: "How the agent monitors a claim over time",
    what: "Recourse (Regress) is the legal right of an insurer to reclaim the cost of a paid claim from the responsible party. When AXA pays a damage, but the damage was caused by a third party(e.g. tenant, tradesperson, neighbour) we can recover part or all of the cost.",
    types: [
      { label: "Tenant Recourse", detail: "Damage originates from the tenant's sphere. Requires the tenant's liability insurance unless gross negligence." },
      { label: "Tradesperson Recourse", detail: "Damage caused by defective work from an external contractor." },
      { label: "Neighbour Recourse", detail: "Damage originates from a neighbouring property." }
    ],
    outputs: [
      { icon: "\u2014", label: "No Recourse", detail: "No third-party causation identified." },
      { icon: "\ud83d\udcdd", label: "Activity for Clerk", detail: "Agent requests missing information from the claims handler." },
      { icon: "\u2192", label: "Forward to Recourse Dept.", detail: "Recourse potential confirmed. Case handed to specialists." }
    ],
    cta: "Press Next to walk through a live case \u2192"
  },

  outro: {
    title: "Current Status & Outlook",
    date: "As of 21.10.2026",
    timeline: {
      label: "Going live in production in the next 2 weeks",
      detail: "The agent will run continuously on all new tap water claims with dwelling components."
    },
    backtest: "Over the past month, we used the agent to review historic 2023 claims to identify cases where the statute of limitations (Verj\u00e4hrung) expires this year.",
    waterfall: [
      { label: "Recovery requests opened", value: 217, type: "total" },
      { label: "Unsuccessful", value: -81, type: "decrease" },
      { label: "Under investigation", value: -71, type: "pending" },
      { label: "Recourse requested", value: 65, type: "subtotal" }
    ],
    recourseAmount: "\u20ac380k"
  },

  timesteps: [
    // ── Timestep 1: 15.06.2026 — Damage reported, no recourse signal ──
    {
      id: "step-1",
      date: "15.06.2026",
      trigger: "Claim reported",
      recourseState: "no_recourse",
      recourseStateLabel: "No Recourse",
      inputs: [
        {
          kind: "claim_reported",
          kindLabel: "Claim Report",
          label: "Landlord's damage report",
          detail: "Tap water damage in the kitchen of a rented apartment. Water on the floor, damage to flooring and baseboards.",
          channel: "Core System",
          docId: "damage_report"
        },
        {
          kind: "document",
          kindLabel: "Document",
          label: "Cost estimate: \u20ac4,000.00",
          detail: "M\u00fcller Bau GmbH, KV-2026-0891. Repair of kitchen floor and baseboards.",
          channel: "E-Mail",
          docId: "cost_estimate"
        }
      ],
      steps: [
        {
          kind: "tool_call",
          kindLabel: "Tool Call",
          title: "ViewDocument \u2014 Landlord's damage report",
          detail: "Reading the claim report to identify damage cause and potential third-party involvement.",
          output: "Tap water damage in kitchen. Cause: unknown. No third party mentioned. Property is rented out. Damage forecast: \u20ac4,000.00."
        },
        {
          kind: "reasoning",
          kindLabel: "Reasoning",
          title: "No recourse indicator found",
          detail: "The property is rented out, which means tenant recourse could be relevant if the cause points to the tenant's sphere. However, the damage report only describes water in the kitchen without specifying a cause. There is no mention of a third party, a tenant's appliance, or any identifiable source. Without a specific cause, there is no basis for recourse at this time."
        },
        {
          kind: "decision",
          kindLabel: "Decision",
          title: "No recourse potential detected",
          detail: "Standard claim handling continues. No action required from the recourse perspective."
        }
      ],
      decision: {
        verdict: "no_recourse",
        verdictLabel: "No Recourse",
        certainty: "high",
        recourseType: "\u2014",
        rationale: "The claim report describes a water damage in the kitchen without identifiable third-party causation. Without further information about the damage cause, there is no recourse potential.",
        nextSteps: [
          "This would not be shown to the clerk. The Agent operates in the background"
        ]
      },
      highlight: "Water in the kitchen, no indicators of third-party causation. Agent detects no recourse."
    },

    // ── Timestep 2: 22.06.2026 — Leak detection report arrives ──
    {
      id: "step-2",
      date: "22.06.2026",
      trigger: "Leak detection report received",
      recourseState: "gathering_information",
      recourseStateLabel: "Gathering Info",
      inputs: [
        {
          kind: "document",
          kindLabel: "Document",
          label: "Leak detection report",
          detail: "Aquatec Leak Detection GmbH. Cause identified: loose inlet hose on the tenant's dishwasher.",
          channel: "E-Mail",
          docId: "leak_detection",
          quote: "The leak detection revealed that the water originated from the back of the dishwasher. The inlet hose had come loose from the connection. The dishwasher belongs to the tenant.",
          quoteSource: "Leak detection report, Aquatec GmbH, 20.06.2026"
        }
      ],
      steps: [
        {
          kind: "tool_call",
          kindLabel: "Tool Call",
          title: "ViewDocument \u2014 Leak detection report",
          detail: "Reading the leak detection report to identify the source of the water damage.",
          output: "Source: tenant's dishwasher. Inlet hose had come loose. Appliance belongs to the tenant."
        },
        {
          kind: "reasoning",
          kindLabel: "Reasoning",
          title: "Tenant recourse detected",
          detail: "The property is rented out and the damage originates from the tenant's own dishwasher \u2014 the cause lies in the sphere of the tenant, making tenant recourse possible. This is not gross negligence, so we can only pursue recourse if the tenant has a private liability insurance. Without liability insurance, we could only claim against the tenant directly in cases of gross negligence."
        },
        {
          kind: "decision",
          kindLabel: "Decision",
          title: "Activity created for the claims handler",
          detail: "The claims handler receives the task to request the tenant's private liability insurance details."
        }
      ],
      agentOutput: {
        label: "Activity created: Request tenant's liability insurance data",
        detail: "Please request the private liability insurance details of tenant Marco Bauer (insurer, policy number)."
      },
      decision: {
        verdict: "activity_created",
        verdictLabel: "Activity Created",
        certainty: "medium",
        recourseType: "Tenant Recourse",
        rationale: "The damage comes from the sphere of the tenant, so tenant recourse is possible. Since this is not gross negligence, we need the tenant's private liability insurance in order to evaluate recourse.",
        nextSteps: [
          "Request tenant's liability insurance data",]
      },
      highlight: "Leak detection shows: water comes from the tenant's dishwasher. The Agent creates activity in Claim Center to request liability insurance data."
    },

    // ── Timestep 3: 01.07.2026 — Clerk requests info, tenant responds, sharing agreement blocks ──
    {
      id: "step-3",
      date: "01.07.2026",
      trigger: "Tenant's liability insurance data received",
      recourseState: "below_threshold",
      recourseStateLabel: "Below Threshold",
      inputs: [
        {
          kind: "note",
          kindLabel: "Note",
          label: "Claims handler requested tenant's insurance data",
          detail: "Following the agent's activity, the claims handler contacted tenant Marco Bauer and requested his private liability insurance details.",
          channel: "Core System"
        },
        {
          kind: "inquiry_answer",
          kindLabel: "Inquiry Response",
          label: "Tenant's e-mail with liability insurance data",
          detail: "Private liability insurance with Allianz Versicherungs-AG, policy PHV-2025-884721, active since 01.01.2025.",
          channel: "E-Mail",
          docId: "tenant_email",
          quote: "My private liability insurance is with Allianz, policy number PHV-2025-884721. The policy has been active since 01.01.2025.",
          quoteSource: "E-mail from tenant Marco Bauer, 30.06.2026"
        }
      ],
      steps: [
        {
          kind: "tool_call",
          kindLabel: "Tool Call",
          title: "ViewDocument \u2014 Tenant's e-mail",
          detail: "Reading the tenant's response to extract liability insurance details.",
          output: "Insurer: Allianz Versicherungs-AG. Policy: PHV-2025-884721. Active since 01.01.2025. Active on date of loss (12.06.2026)."
        },
        {
          kind: "tool_call",
          kindLabel: "Tool Call",
          title: "GetRecourseDomainKnowledge \u2014 Tenant Recourse",
          detail: "Loading domain knowledge for tenant recourse, including which insurers participate in the sharing agreement between liability and property insurers.",
          output: "Allianz Versicherungs-AG: Participant in the sharing agreement between liability and property insurers. Threshold: \u20ac5,000 \u2014 recourse claims below this amount are excluded."
        },
        {
          kind: "reasoning",
          kindLabel: "Reasoning",
          title: "Damage amount is below the threshold",
          detail: "The tenant's liability insurance with Allianz is confirmed. However, Allianz participates in the sharing agreement between liability and property insurers, which excludes recourse claims below \u20ac5,000. The current damage forecast is \u20ac4,000 \u2014 the threshold is not met."
        },
        {
          kind: "decision",
          kindLabel: "Decision",
          title: "No recourse \u2014 threshold not met",
          detail: "All conditions for tenant recourse are met in principle, but the damage of \u20ac4,000 is below the \u20ac5,000 sharing agreement threshold."
        }
      ],
      decision: {
        verdict: "no_recourse",
        verdictLabel: "No Recourse",
        certainty: "medium",
        recourseType: "Tenant Recourse",
        rationale: "The tenant's liability insurance with Allianz is confirmed and active on the date of loss. However, Allianz participates in the sharing agreement between liability and property insurers \u2014 recourse claims are only permitted above a damage threshold of \u20ac5,000. The current damage forecast is only \u20ac4,000.",
        nextSteps: [
          "Continue monitoring damage costs. Again no activitiy or action seen by the clerk"
        ]
      },
      highlight: "Allianz liability insurance confirmed, but sharing agreement excludes recourse below \u20ac5,000 \u2014 current forecast is only \u20ac4,000."
    },

    // ── Timestep 4: 14.07.2026 — Drying invoice pushes total over €5,000 ──
    {
      id: "step-4",
      date: "14.07.2026",
      trigger: "Drying invoice received",
      recourseState: "recourse_detected",
      recourseStateLabel: "Recourse Detected",
      inputs: [
        {
          kind: "document",
          kindLabel: "Document",
          label: "Drying invoice: \u20ac1,480.00",
          detail: "BTT Drying Technology GmbH, RE-2026-3341. Technical drying of kitchen, 8 equipment days.",
          channel: "E-Mail",
          docId: "drying_invoice"
        }
      ],
      steps: [
        {
          kind: "tool_call",
          kindLabel: "Tool Call",
          title: "ViewDocument \u2014 Drying invoice",
          detail: "Reading the drying invoice to update the total damage forecast.",
          output: "\u20ac1,480.00 for technical drying. New total: \u20ac4,000 + \u20ac1,480 = \u20ac5,480.00."
        },
        {
          kind: "reasoning",
          kindLabel: "Reasoning",
          title: "Sharing agreement threshold now exceeded",
          detail: "The drying invoice raises the damage forecast to \u20ac5,480.00, exceeding the \u20ac5,000 threshold of the sharing agreement. All conditions for tenant recourse are now met: tenant liability established, liability insurance active, and damage above the threshold."
        },
        {
          kind: "decision",
          kindLabel: "Decision",
          title: "Recourse potential confirmed \u2014 forwarded to Recourse Department",
          detail: "Case is forwarded to the specialized Recourse Department. Attached: leak detection report, liability insurance data"
        }
      ],
      agentOutput: {
        label: "Case forwarded to the Recourse Department",
        detail: "Tenant recourse against Allianz (PHV-2025-884721). Damage forecast: \u20ac5,480.00. Sharing agreement threshold (\u20ac5,000) \u2014 exceeded."
      },
      decision: {
        verdict: "recourse_forwarded",
        verdictLabel: "Recourse Forwarded",
        certainty: "high",
        recourseType: "Tenant Recourse",
        amountEur: 5480.00,
        rationale: "The drying invoice raises the damage forecast to \u20ac5,480.00 \u2014 the \u20ac5,000 threshold of the sharing agreement is exceeded. All conditions for tenant recourse against Allianz are met. The case is forwarded to the Recourse Department.",
        nextSteps: [
          "Recourse Department takes over further processing"
        ]
      },
      highlight: "Drying invoice pushes damage forecast to \u20ac5,480 \u2014 threshold exceeded, recourse forwarded!"
    }
  ]
};
