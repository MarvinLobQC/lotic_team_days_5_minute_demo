// ── State ──
const state = { timestep: -1, phase: 0 }; // -1 = intro slide
const PHASES = 3; // 0=inputs, 1=steps, 2=decision

// ── Document previews ──
const DOCUMENTS = {
  damage_report: {
    title: "Landlord's Damage Report",
    meta: "Claim 456-LW-26002847-3 \u00b7 Reported 15.06.2026 \u00b7 Core System",
    body: `
      <div class="doc-section-heading">Policy Information</div>
      <div class="doc-field"><span class="doc-label">Claim number:</span> 456-LW-26002847-3</div>
      <div class="doc-field"><span class="doc-label">Coverage type:</span> Tap Water, Dwelling (Leitungswasser, Wohngeb\u00e4ude)</div>
      <div class="doc-field"><span class="doc-label">Policyholder:</span> Sabine Meier</div>
      <div class="doc-field"><span class="doc-label">Policy number:</span> WG-2019-004812</div>
      <div class="doc-field"><span class="doc-label">Insured address:</span> Schillerstra\u00dfe 17, 80336 Munich</div>
      <div class="doc-separator"></div>
      <div class="doc-section-heading">Loss Details</div>
      <div class="doc-field"><span class="doc-label">Loss date:</span> 12.06.2026</div>
      <div class="doc-field"><span class="doc-label">Date reported:</span> 15.06.2026</div>
      <div class="doc-field"><span class="doc-label">Loss location:</span> Schillerstra\u00dfe 17, Ground Floor Right, 80336 Munich</div>
      <div class="doc-field"><span class="doc-label">Loss cause:</span> Tap water</div>
      <div class="doc-field"><span class="doc-label">Property rented out:</span> <strong>Yes</strong></div>
      <div class="doc-field"><span class="doc-label">Tenant:</span> Marco Bauer</div>
      <div class="doc-separator"></div>
      <div class="doc-section-heading">Description of Damage</div>
      <div class="doc-text">My tenant reported that water leaked in the kitchen and the floor was damaged. There is significant damage to the flooring and the baseboards are swollen. The apartment is rented out. I was not present when the damage occurred and only learned about it when my tenant called me on the evening of 12 June.</div>
      <div class="doc-separator"></div>
      <div class="doc-section-heading">Consequential Damage</div>
      <div class="doc-text">Significant damage to the laminate floor in the kitchen. Baseboards along the kitchen counter wall are visibly swollen. Lower wall area shows early signs of moisture.</div>
      <div class="doc-separator"></div>
      <div class="doc-section-heading">Affected Areas</div>
      <div class="doc-field"><span class="doc-label">Rooms:</span> Kitchen</div>
      <div class="doc-field"><span class="doc-label">Estimated area:</span> approx. 12 m\u00b2</div>
      <div class="doc-field"><span class="doc-label">Floor type:</span> Laminate</div>
      <div class="doc-field"><span class="doc-label">Photos attached:</span> No</div>
      <div class="doc-separator"></div>
      <div class="doc-section-heading">Additional Information</div>
      <div class="doc-field"><span class="doc-label">Cause of damage known:</span> No</div>
      <div class="doc-field"><span class="doc-label">Were any repairs or works carried out recently:</span> No</div>
      <div class="doc-field"><span class="doc-label">Emergency measures taken:</span> Tenant mopped up the water immediately</div>
      <div class="doc-field"><span class="doc-label">Access for inspection:</span> Available \u2014 tenant is on site</div>
    `
  },
  cost_estimate: {
    title: "Cost Estimate KV-2026-0891",
    meta: "M\u00fcller Bau GmbH \u00b7 14.06.2026 \u00b7 E-Mail",
    body: `
      <div class="doc-letterhead">
        <strong>M\u00fcller Bau GmbH</strong><br>
        Bayerstra\u00dfe 5, 80335 Munich<br>
        Tel: 089 / 123 456 78 \u00b7 Fax: 089 / 123 456 79<br>
        info@mueller-bau.de \u00b7 www.mueller-bau.de<br>
        <span style="font-size:0.7rem; color:#6b7280;">HRB 142587 \u00b7 Munich District Court \u00b7 VAT ID: DE 198 234 567</span>
      </div>
      <div class="doc-separator"></div>
      <div class="doc-field"><span class="doc-label">To:</span> Sabine Meier, Schillerstra\u00dfe 17, 80336 Munich</div>
      <div class="doc-separator"></div>
      <div class="doc-field"><span class="doc-label">Estimate No.:</span> KV-2026-0891</div>
      <div class="doc-field"><span class="doc-label">Date:</span> 14.06.2026</div>
      <div class="doc-field"><span class="doc-label">Location:</span> Schillerstra\u00dfe 17, EG rechts, 80336 Munich</div>
      <div class="doc-field"><span class="doc-label">Claim reference:</span> 456-LW-26002847-3</div>
      <div class="doc-separator"></div>
      <div class="doc-text"><strong>Subject: Cost estimate for water damage repair \u2014 kitchen</strong></div>
      <div class="doc-text" style="margin-top:8px;">Dear Ms Meier,</div>
      <div class="doc-text">following our on-site inspection on 13.06.2026, we provide the following cost estimate for the repair of the water damage in the kitchen of the ground floor apartment:</div>
      <div class="doc-separator"></div>
      <table class="doc-table">
        <thead><tr><th>Pos.</th><th>Description</th><th>Qty</th><th>Amount</th></tr></thead>
        <tbody>
          <tr><td>1</td><td>Remove damaged laminate flooring, kitchen</td><td>12 m\u00b2</td><td>\u20ac960.00</td></tr>
          <tr><td>2</td><td>Supply and install new laminate flooring, kitchen (material: oak-style, click system, AC4)</td><td>12 m\u00b2</td><td>\u20ac1,440.00</td></tr>
          <tr><td>3</td><td>Remove swollen baseboards, kitchen (along counter wall and window wall)</td><td>14 lm</td><td>\u20ac280.00</td></tr>
          <tr><td>4</td><td>Supply and install new MDF baseboards, painted white, kitchen</td><td>14 lm</td><td>\u20ac520.00</td></tr>
          <tr><td>5</td><td>Painting touch-up, lower wall area (emulsion paint, up to 50 cm height)</td><td>8 m\u00b2</td><td>\u20ac480.00</td></tr>
          <tr><td>6</td><td>Disposal of damaged materials (laminate, baseboards, packaging)</td><td>flat rate</td><td>\u20ac320.00</td></tr>
        </tbody>
        <tfoot>
          <tr><td colspan="3"><strong>Total (net)</strong></td><td><strong>\u20ac4,000.00</strong></td></tr>
          <tr><td colspan="3">VAT 19%</td><td>\u20ac760.00</td></tr>
          <tr><td colspan="3"><strong>Total (gross)</strong></td><td><strong>\u20ac4,760.00</strong></td></tr>
        </tfoot>
      </table>
      <div class="doc-separator"></div>
      <div class="doc-text"><strong>Notes:</strong></div>
      <ul class="doc-list">
        <li>Technical drying is <strong>not included</strong> in this estimate. A separate assessment by a drying specialist is recommended before repair begins.</li>
        <li>Estimated duration of repair work: 2\u20133 working days (after drying is complete).</li>
        <li>This estimate is valid for 30 days from the date above.</li>
        <li>The apartment should be vacated during the flooring work.</li>
      </ul>
      <div class="doc-text" style="margin-top:12px;">Kind regards,<br>Thomas M\u00fcller<br>M\u00fcller Bau GmbH</div>
    `
  },
  leak_detection: {
    title: "Leak Detection Report",
    meta: "Aquatec Leak Detection GmbH \u00b7 20.06.2026 \u00b7 E-Mail",
    body: `
      <div class="doc-letterhead">
        <strong>Aquatec Leak Detection GmbH</strong><br>
        Isarweg 22, 80331 Munich<br>
        Tel: 089 / 987 654 32 \u00b7 info@aquatec-leckortung.de<br>
        <span style="font-size:0.7rem; color:#6b7280;">Certified leak detection \u00b7 DIN EN 13187 \u00b7 DVGW W 392</span>
      </div>
      <div class="doc-separator"></div>
      <div class="doc-section-heading">Report Details</div>
      <div class="doc-field"><span class="doc-label">Report No.:</span> LO-2026-4471</div>
      <div class="doc-field"><span class="doc-label">Date of inspection:</span> 19.06.2026</div>
      <div class="doc-field"><span class="doc-label">Location:</span> Schillerstra\u00dfe 17, EG rechts, 80336 Munich</div>
      <div class="doc-field"><span class="doc-label">Commissioned by:</span> Sabine Meier (landlord)</div>
      <div class="doc-field"><span class="doc-label">Claim reference:</span> 456-LW-26002847-3</div>
      <div class="doc-field"><span class="doc-label">Inspector:</span> Dipl.-Ing. Andreas Huber</div>
      <div class="doc-separator"></div>
      <div class="doc-section-heading">1. Scope of Inspection</div>
      <div class="doc-text">On-site inspection of the ground floor apartment (right side) to identify the source of the reported water damage in the kitchen area. Methods employed: visual inspection, infrared thermography, electronic moisture measurement (CM method).</div>
      <div class="doc-separator"></div>
      <div class="doc-section-heading">2. Moisture Readings</div>
      <div class="doc-text">Moisture readings were taken at 14 measurement points across the kitchen floor and adjacent areas. Results:</div>
      <table class="doc-table" style="margin-top:8px;">
        <thead><tr><th>Location</th><th>Reading (CM%)</th><th>Status</th></tr></thead>
        <tbody>
          <tr><td>Kitchen \u2014 centre of room</td><td>3.2%</td><td>Elevated</td></tr>
          <tr><td>Kitchen \u2014 near dishwasher</td><td>5.8%</td><td>Critical</td></tr>
          <tr><td>Kitchen \u2014 under counter</td><td>4.1%</td><td>Elevated</td></tr>
          <tr><td>Kitchen \u2014 near entrance</td><td>1.4%</td><td>Normal</td></tr>
          <tr><td>Hallway (adjacent)</td><td>1.1%</td><td>Normal</td></tr>
        </tbody>
      </table>
      <div class="doc-text" style="margin-top:8px; font-size:0.75rem; color:#6b7280;">Reference value for laminate on screed: \u2264 2.0% CM (normal). Readings above 3.0% indicate active moisture intrusion.</div>
      <div class="doc-separator"></div>
      <div class="doc-section-heading">3. Source Identification</div>
      <div class="doc-text">The highest moisture concentration was found in the immediate vicinity of the dishwasher. Upon inspection of the appliance, the following was determined:</div>
      <ul class="doc-list">
        <li>The water originated from the <strong>back of the dishwasher</strong>.</li>
        <li>The <strong>inlet hose had come loose</strong> from the dishwasher connection.</li>
        <li>No damage to the building\u2019s water supply pipes was detected.</li>
        <li>The <strong>dishwasher belongs to the tenant</strong> and is not part of the rented property\u2019s fixtures.</li>
      </ul>
      <div class="doc-text" style="margin-top:8px;">The building\u2019s own plumbing (supply and drain lines) was tested and found to be intact. The water meter showed no unexplained consumption.</div>
      <div class="doc-separator"></div>
      <div class="doc-section-heading">4. Conclusion</div>
      <div class="doc-text">The leak detection revealed that the water originated from the back of the dishwasher. The inlet hose had come loose from the connection. The dishwasher belongs to the tenant.</div>
      <div class="doc-separator"></div>
      <div class="doc-section-heading">5. Drying Recommendation</div>
      <div class="doc-text">Technical drying is required before any repair work begins. Estimated scope:</div>
      <ul class="doc-list">
        <li>2 drying units for the kitchen area</li>
        <li>Estimated duration: 6\u201310 equipment days</li>
        <li>Follow-up moisture measurement required before repair clearance</li>
      </ul>
      <div class="doc-text" style="margin-top:12px;">Dipl.-Ing. Andreas Huber<br>Aquatec Leak Detection GmbH</div>
    `
  },
  tenant_email: {
    title: "E-Mail from Tenant Marco Bauer",
    meta: "30.06.2026 \u00b7 E-Mail",
    body: `
      <div class="doc-email-header">
        <div class="doc-field"><span class="doc-label">From:</span> marco.bauer@email.de</div>
        <div class="doc-field"><span class="doc-label">To:</span> claims@insurance-company.de</div>
        <div class="doc-field"><span class="doc-label">Date:</span> 30.06.2026, 14:22</div>
        <div class="doc-field"><span class="doc-label">Subject:</span> Re: Claim 456-LW-26002847-3 \u2014 Liability insurance details</div>
      </div>
      <div class="doc-separator"></div>
      <div class="doc-text">Dear Sir or Madam,</div>
      <div class="doc-text" style="margin-top:8px;">thank you for your message regarding the water damage in the apartment at Schillerstra\u00dfe 17. I understand you need my private liability insurance details in connection with this matter.</div>
      <div class="doc-text" style="margin-top:8px;">As requested, here are the details:</div>
      <div class="doc-text" style="margin: 12px 0; padding: 14px 16px; background: rgba(59,130,246,0.05); border-radius: 6px; border: 1px solid rgba(59,130,246,0.1);">
        <strong>Insurer:</strong> Allianz Versicherungs-AG<br>
        <strong>Policy number:</strong> PHV-2025-884721<br>
        <strong>Active since:</strong> 01.01.2025<br>
        <strong>Type:</strong> Private liability insurance (Privathaftpflichtversicherung)<br>
        <strong>Policyholder:</strong> Marco Bauer
      </div>
      <div class="doc-text">My private liability insurance is with Allianz, policy number PHV-2025-884721. The policy has been active since 01.01.2025. I have attached a copy of the insurance confirmation for your records.</div>
      <div class="doc-text" style="margin-top:12px;">I am of course available if you need any further information. You can reach me at this email address or by phone at 0176 / 234 567 89.</div>
      <div class="doc-text" style="margin-top:16px;">Kind regards,<br>Marco Bauer<br><span style="font-size:0.75rem; color:#6b7280;">Schillerstra\u00dfe 17, EG rechts<br>80336 Munich</span></div>
      <div class="doc-separator"></div>
      <div class="doc-text" style="font-size:0.75rem; color:#6b7280;">Attachment: Allianz_PHV_Versicherungsschein_Bauer.pdf (124 KB)</div>
    `
  },
  drying_invoice: {
    title: "Drying Invoice RE-2026-3341",
    meta: "BTT Drying Technology GmbH \u00b7 10.07.2026 \u00b7 E-Mail",
    body: `
      <div class="doc-letterhead">
        <strong>BTT Bau- und Trocknungstechnik GmbH</strong><br>
        Industriestra\u00dfe 9, 85748 Garching bei M\u00fcnchen<br>
        Tel: 089 / 555 123 00 \u00b7 Fax: 089 / 555 123 01<br>
        info@btt-trocknung.de \u00b7 www.btt-trocknung.de<br>
        <span style="font-size:0.7rem; color:#6b7280;">HRB 201934 \u00b7 Munich District Court \u00b7 VAT ID: DE 287 456 123</span>
      </div>
      <div class="doc-separator"></div>
      <div class="doc-field"><span class="doc-label">Invoice to:</span> Sabine Meier, Schillerstra\u00dfe 17, 80336 Munich</div>
      <div class="doc-separator"></div>
      <div class="doc-field"><span class="doc-label">Invoice No.:</span> RE-2026-3341</div>
      <div class="doc-field"><span class="doc-label">Date:</span> 10.07.2026</div>
      <div class="doc-field"><span class="doc-label">Location:</span> Schillerstra\u00dfe 17, EG rechts, 80336 Munich</div>
      <div class="doc-field"><span class="doc-label">Claim reference:</span> 456-LW-26002847-3</div>
      <div class="doc-field"><span class="doc-label">Drying period:</span> 01.07.2026 \u2013 08.07.2026</div>
      <div class="doc-separator"></div>
      <div class="doc-text"><strong>Subject: Invoice for technical drying services \u2014 water damage, kitchen</strong></div>
      <div class="doc-separator"></div>
      <table class="doc-table">
        <thead><tr><th>Pos.</th><th>Description</th><th>Qty</th><th>Amount</th></tr></thead>
        <tbody>
          <tr><td>1</td><td>Equipment delivery, setup and commissioning \u2014 2\u00d7 Dryfast DF800 drying units</td><td>1</td><td>\u20ac280.00</td></tr>
          <tr><td>2</td><td>Technical drying \u2014 kitchen area, 12 m\u00b2 (2 units, 8 equipment days @ \u20ac95.00/day per unit, capped)</td><td>8 days</td><td>\u20ac760.00</td></tr>
          <tr><td>3</td><td>Moisture monitoring \u2014 on-site visits with CM measurement (01.07, 04.07, 08.07)</td><td>3 visits</td><td>\u20ac210.00</td></tr>
          <tr><td>4</td><td>Equipment removal and final moisture measurement with protocol</td><td>1</td><td>\u20ac130.00</td></tr>
          <tr><td>5</td><td>Electricity flat rate for drying equipment operation</td><td>8 days</td><td>\u20ac100.00</td></tr>
        </tbody>
        <tfoot>
          <tr><td colspan="3"><strong>Total (net)</strong></td><td><strong>\u20ac1,480.00</strong></td></tr>
          <tr><td colspan="3">VAT 19%</td><td>\u20ac281.20</td></tr>
          <tr><td colspan="3"><strong>Total (gross)</strong></td><td><strong>\u20ac1,761.20</strong></td></tr>
        </tfoot>
      </table>
      <div class="doc-separator"></div>
      <div class="doc-section-heading">Drying Protocol Summary</div>
      <table class="doc-table" style="margin-top:4px;">
        <thead><tr><th>Date</th><th>Reading (CM%)</th><th>Status</th></tr></thead>
        <tbody>
          <tr><td>01.07.2026 (start)</td><td>5.8%</td><td>Critical</td></tr>
          <tr><td>04.07.2026 (interim)</td><td>3.1%</td><td>Elevated</td></tr>
          <tr><td>08.07.2026 (final)</td><td>1.7%</td><td>Normal \u2014 target reached</td></tr>
        </tbody>
      </table>
      <div class="doc-text" style="margin-top:12px;">Final moisture reading on 08.07.2026 confirmed that target values (\u2264 2.0% CM) have been reached. The area is cleared for repair work.</div>
      <div class="doc-separator"></div>
      <div class="doc-text" style="font-size:0.75rem; color:#6b7280;">Payment due within 14 days of invoice date. Bank: Sparkasse M\u00fcnchen \u00b7 IBAN: DE89 7025 0150 0012 3456 78</div>
    `
  }
};

// ── Icons ──
const KIND_ICONS = {
  claim_reported: "\ud83d\udccb",
  document: "\ud83d\udcc4",
  note: "\ud83d\udcdd",
  payment: "\ud83d\udcb3",
  inquiry_answer: "\u2709\ufe0f"
};

const STEP_ICONS = {
  tool_call: "\ud83d\udd27",
  document: "\ud83d\udcc4",
  reasoning: "\ud83e\udde0",
  decision: "\u2696\ufe0f",
  subagent: "\ud83d\udee1\ufe0f"
};

const STATE_CLASSES = {
  no_recourse: "state-no-recourse",
  gathering_information: "state-gathering",
  below_threshold: "state-below-threshold",
  recourse_detected: "state-detected"
};

// ── Navigation ──
const OUTRO = () => DEMO_DATA.timesteps.length; // special index for outro slide

function advance() {
  const maxTs = DEMO_DATA.timesteps.length - 1;
  if (state.timestep === -1) {
    state.timestep = 0;
    state.phase = 0;
  } else if (state.timestep === OUTRO()) {
    return; // Already at outro, can't go further
  } else if (state.phase < PHASES - 1) {
    state.phase++;
  } else if (state.timestep < maxTs) {
    state.timestep++;
    state.phase = 0;
  } else {
    // At last timestep, last phase — move to outro
    state.timestep = OUTRO();
    state.phase = 0;
  }
  render();
}

function back() {
  if (state.timestep === -1) return;
  if (state.timestep === OUTRO()) {
    // Go back from outro to last timestep, last phase
    state.timestep = DEMO_DATA.timesteps.length - 1;
    state.phase = PHASES - 1;
  } else if (state.phase > 0) {
    state.phase--;
  } else if (state.timestep > 0) {
    state.timestep--;
    state.phase = PHASES - 1;
  } else {
    state.timestep = -1;
    state.phase = 0;
  }
  render();
}

function reset() {
  state.timestep = -1;
  state.phase = 0;
  render();
}

function isAtEnd() {
  return state.timestep === OUTRO();
}

function isAtStart() {
  return state.timestep === -1;
}

// ── Render: Timeline ──
function renderTimeline() {
  const el = document.getElementById("timeline");
  const ts = DEMO_DATA.timesteps;

  let html = '<div class="timeline-heading">Case Timeline</div>';

  ts.forEach((t, i) => {
    let cls = "timeline-item";
    if (state.timestep === -1) cls += " future";
    else if (state.timestep === OUTRO()) cls += " visited";
    else if (i < state.timestep) cls += " visited";
    else if (i === state.timestep) cls += " active";
    else cls += " future";

    const stateClass = STATE_CLASSES[t.recourseState] || "";
    const showState = state.timestep === OUTRO() || (state.timestep >= 0 && i <= state.timestep);

    html += `
      <div class="${cls}">
        <div class="timeline-date">${t.date}</div>
        <div class="timeline-trigger lang-de">${t.trigger}</div>
        ${showState ? `<span class="timeline-state ${stateClass}">${t.recourseStateLabel}</span>` : ""}
      </div>
    `;
  });

  el.innerHTML = html;
}

// ── Render: Inputs (Phase 0) ──
function renderInputs(ts) {
  let html = "";

  html += `<div class="highlight-banner">${ts.highlight}</div>`;

  html += '<div class="section-heading">New Case Data</div>';

  ts.inputs.forEach(inp => {
    const icon = KIND_ICONS[inp.kind] || "\ud83d\udcc1";
    const clickable = inp.docId ? " input-card-clickable" : "";
    const onclick = inp.docId ? ` onclick="openDocument('${inp.docId}')"` : "";
    html += `
      <div class="input-card${clickable}"${onclick}>
        <div class="input-header">
          <span class="input-icon">${icon}</span>
          <span class="input-label">${inp.label}</span>
          ${inp.docId ? '<span class="input-view-hint">View</span>' : ""}
          <span class="input-channel">${inp.channel}</span>
        </div>
        ${inp.detail ? `<div class="input-detail">${inp.detail}</div>` : ""}
        ${inp.quote ? `
          <div class="input-quote">
            \u201e${inp.quote}\u201c
            ${inp.quoteSource ? `<span class="input-quote-source">\u2014 ${inp.quoteSource}</span>` : ""}
          </div>
        ` : ""}
      </div>
    `;
  });

  return html;
}

// ── Render: Steps (Phase 1) ──
function renderSteps(ts) {
  let html = '<div class="section-heading">Agent Evaluation</div>';
  html += '<div class="steps-trace">';

  ts.steps.forEach(step => {
    const icon = STEP_ICONS[step.kind] || "\u2022";
    const statusCls = step.status ? ` status-${step.status}` : "";

    html += `
      <div class="step-item kind-${step.kind}${statusCls}">
        <div class="step-header">
          <span class="step-kind-badge">${step.kindLabel}</span>
          <span class="step-title">${step.title}</span>
          ${step.model ? `<span class="step-model-badge">${step.model}</span>` : ""}
        </div>
        ${step.detail ? `<div class="step-detail">${step.detail}</div>` : ""}
        ${step.quote ? `
          <div class="step-quote">
            \u201e${step.quote}\u201c
            ${step.quoteSource ? `<span class="step-quote-source">\u2014 ${step.quoteSource}</span>` : ""}
          </div>
        ` : ""}
        ${step.checks ? renderVerificationChecks(step) : ""}
      </div>
    `;
  });

  html += "</div>";

  // Agent output card
  if (ts.agentOutput) {
    html += `
      <div class="agent-output-card">
        <div class="agent-output-label">Agent Action</div>
        <div class="agent-output-text">${ts.agentOutput.label}</div>
        <div class="agent-output-detail">${ts.agentOutput.detail}</div>
      </div>
    `;
  }

  return html;
}

function renderVerificationChecks(step) {
  let html = '<div class="verification-checks">';

  step.checks.forEach(c => {
    const cls = `check-${c.outcome}`;
    const icon = c.outcome === "pass" ? "\u2713" : c.outcome === "concern" ? "\u26a0" : "\u2717";

    html += `
      <div class="check-item ${cls}">
        <span class="check-icon">${icon}</span>
        <div>
          <span class="check-label">${c.label}</span>
          <div class="check-detail">${c.detail}</div>
        </div>
      </div>
    `;
  });

  if (step.result) {
    html += `<div class="verification-result">\u2713 ${step.result}</div>`;
  }

  html += "</div>";
  return html;
}

// ── Render: Decision (Phase 2) ──
function renderDecision(ts) {
  const d = ts.decision;
  let html = '<div class="section-heading">Result</div>';

  html += '<div class="decision-card">';

  // Badges
  html += '<div class="decision-badges">';
  html += `<span class="verdict-badge verdict-${d.verdict}">${d.verdictLabel}</span>`;
  html += `<span class="certainty-badge certainty-${d.certainty}">Confidence: ${d.certainty}</span>`;
  html += `<span class="recourse-type-badge">${d.recourseType}</span>`;
  html += "</div>";

  // Amount
  if (d.amountEur) {
    html += `<div class="decision-amount">Recourse claim: ${formatEur(d.amountEur)}</div>`;
  }

  // Rationale
  html += `<div class="decision-rationale">${d.rationale}</div>`;

  // Next steps
  if (d.nextSteps && d.nextSteps.length > 0) {
    html += '<ul class="decision-next-steps">';
    d.nextSteps.forEach(s => {
      html += `<li>${s}</li>`;
    });
    html += "</ul>";
  }

  html += "</div>";

  // Findings
  if (ts.findings && ts.findings.length > 0) {
    html += '<div class="section" style="margin-top: 16px;">';
    html += '<div class="section-heading">Findings</div>';
    html += '<div class="findings-grid">';
    ts.findings.forEach(f => {
      html += `
        <div class="finding-item">
          <div class="finding-severity sev-${f.severity}"></div>
          <div class="finding-content">
            <div class="finding-category">${f.category}</div>
            <div class="finding-label">${f.label}</div>
            ${f.value ? `<div class="finding-value">${f.value}</div>` : ""}
            ${f.detail ? `<div class="finding-detail">${f.detail}</div>` : ""}
          </div>
        </div>
      `;
    });
    html += "</div></div>";
  }

  // Success card for final timestep — recourse forwarded
  if (ts.recourseState === "recourse_detected") {
    const s = DEMO_DATA.summary;
    html += `
      <div class="success-card">
        <div class="success-amount">${formatEur(s.totalClaimEur)}</div>
        <div class="success-label">Recourse potential detected — forwarded to ${s.forwardedTo}</div>
        <div class="success-details">
          <strong>${s.recourseType}</strong> &middot;
          Counterparty: <strong>${s.counterparty}</strong> &middot;
          Policy: <strong>${s.policyNumber}</strong>
        </div>
      </div>
    `;
  }

  return html;
}

// ── Render: Controls ──
function renderControls() {
  const el = document.getElementById("controls");
  const totalPhases = DEMO_DATA.timesteps.length * PHASES;
  const currentPhase = state.timestep * PHASES + state.phase + 1;

  const phaseLabels = ["Inputs", "Evaluation", "Result"];
  const isIntro = state.timestep === -1;
  const isOutro = state.timestep === OUTRO();

  let progressText;
  let progressPct = 0;
  if (isIntro) {
    progressText = 'Introduction';
    progressPct = 0;
  } else if (isOutro) {
    progressText = 'Status & Outlook';
    progressPct = 100;
  } else {
    progressText = `Step <strong>${state.timestep + 1}/${DEMO_DATA.timesteps.length}</strong> &middot; ${phaseLabels[state.phase]}`;
    progressPct = Math.round((currentPhase / totalPhases) * 100);
  }

  let nextLabel = "Next";
  if (isIntro) nextLabel = "Start Demo";

  el.innerHTML = `
    <button id="btn-back" ${isAtStart() ? "disabled" : ""} onclick="back()">
      \u2190 Back <span class="key-hint">\u2190</span>
    </button>
    <div class="progress-indicator">
      ${progressText}
      <div class="progress-bar-wrap">
        <div class="progress-bar-fill" style="width: ${progressPct}%"></div>
      </div>
    </div>
    <button id="btn-next" class="btn-primary" ${isAtEnd() ? "disabled" : ""} onclick="advance()">
      ${nextLabel} \u2192 <span class="key-hint" style="color: rgba(255,255,255,0.6); background: rgba(255,255,255,0.15); border-color: rgba(255,255,255,0.2);">\u2192</span>
    </button>
    <button onclick="reset()" style="margin-left: 8px;">
      Reset <span class="key-hint">R</span>
    </button>
  `;
}

// ── Render: Header ──
function renderHeader() {
  const c = DEMO_DATA.claim;
  document.getElementById("header").innerHTML = `
    <div>
      <div class="header-title">Recourse Agent</div>
      <div class="header-subtitle">Continuous Monitoring</div>
    </div>
    <div style="width:1px; height:24px; background:rgba(255,255,255,0.15); margin: 0 4px;"></div>
    <div class="header-meta">
      <span>Claim <strong>${c.claimNumber}</strong></span>
      <span>Policyholder <strong>${c.policyholder}</strong></span>
      <span>Location <strong>${c.lossLocation}</strong></span>
    </div>
  `;
}

// ── Render: Intro slide ──
function renderIntro() {
  const intro = DEMO_DATA.intro;
  let html = `
    <div class="intro-slide">
      <div class="intro-header">
        <div class="intro-title">${intro.title}</div>
        <div class="intro-subtitle">${intro.subtitle}</div>
      </div>

      <div class="intro-section">
        <div class="intro-section-title">What is Recourse?</div>
        <div class="intro-text">${intro.what}</div>
      </div>

      <div class="intro-section">
        <div class="intro-section-title">Common Recourse Types</div>
        <div class="intro-cards">
          ${intro.types.map(t => `
            <div class="intro-card">
              <div class="intro-card-label">${t.label}</div>
              <div class="intro-card-detail">${t.detail}</div>
            </div>
          `).join("")}
        </div>
      </div>

      <div class="intro-section">
        <div class="intro-section-title">Three Possible Agent Outputs</div>
        <div class="intro-cards">
          ${intro.outputs.map(o => `
            <div class="intro-card intro-card-output">
              <div class="intro-card-label">${o.label}</div>
              <div class="intro-card-detail">${o.detail}</div>
            </div>
          `).join("")}
        </div>
      </div>

      <div class="intro-cta">${intro.cta}</div>
    </div>
  `;
  return html;
}

// ── Render: Waterfall chart ──
function renderWaterfall(data, recourseAmount) {
  const chartW = 560;
  const chartH = 220;
  const padTop = 30;
  const padBottom = 60;
  const padLeft = 10;
  const padRight = 10;
  const barAreaH = chartH - padTop - padBottom;

  const total = data[0].value;
  const barW = 80;
  const gap = (chartW - padLeft - padRight - data.length * barW) / (data.length - 1);

  const colors = {
    total: "#4a4a4a",
    decrease: "#c62828",
    pending: "#b8860b",
    subtotal: "#1d5a9b"
  };

  const bgColors = {
    total: "#e8e6e2",
    decrease: "#fce8e8",
    pending: "#fff8e1",
    subtotal: "#eaf1f9"
  };

  // Compute running position for each bar
  let running = 0;
  const bars = data.map(d => {
    let y0, y1, displayVal;
    if (d.type === "total") {
      y0 = 0;
      y1 = d.value;
      running = d.value;
      displayVal = d.value;
    } else if (d.type === "subtotal") {
      y0 = 0;
      y1 = running;
      displayVal = running;
    } else {
      const absVal = Math.abs(d.value);
      y0 = running - absVal;
      y1 = running;
      running -= absVal;
      displayVal = absVal;
    }
    return { ...d, y0, y1, displayVal };
  });

  const scale = (v) => padTop + barAreaH - (v / total) * barAreaH;

  let svg = `<svg viewBox="0 0 ${chartW} ${chartH}" style="width:100%;max-width:${chartW}px;display:block;margin:0 auto;">`;

  // Draw connector lines between bars
  for (let i = 0; i < bars.length - 1; i++) {
    const x1 = padLeft + i * (barW + gap) + barW;
    const x2 = padLeft + (i + 1) * (barW + gap);
    const nextBar = bars[i + 1];
    const connectorY = scale(nextBar.type === "subtotal" ? bars[i].y0 : nextBar.y1);
    svg += `<line x1="${x1}" y1="${connectorY}" x2="${x2}" y2="${connectorY}" stroke="#d6d3d1" stroke-width="1" stroke-dasharray="4,3"/>`;
  }

  // Draw bars
  bars.forEach((b, i) => {
    const x = padLeft + i * (barW + gap);
    const yTop = scale(b.y1);
    const yBot = scale(b.y0);
    const h = yBot - yTop;
    const color = colors[b.type];
    const bg = bgColors[b.type];

    svg += `<rect x="${x}" y="${yTop}" width="${barW}" height="${h}" fill="${bg}" stroke="${color}" stroke-width="1.5" rx="3"/>`;

    // Value label above bar
    const labelY = yTop - 8;
    const prefix = b.type === "decrease" || b.type === "pending" ? "\u2212" : "";
    svg += `<text x="${x + barW / 2}" y="${labelY}" text-anchor="middle" fill="${color}" font-size="14" font-weight="700" font-family="-apple-system,BlinkMacSystemFont,sans-serif">${prefix}${b.displayVal}</text>`;

    // Label below chart
    const words = b.label.split(" ");
    const lineH = 13;
    const startY = chartH - padBottom + 16;
    words.forEach((word, wi) => {
      svg += `<text x="${x + barW / 2}" y="${startY + wi * lineH}" text-anchor="middle" fill="#57534e" font-size="11" font-family="-apple-system,BlinkMacSystemFont,sans-serif">${word}</text>`;
    });
  });

  svg += `</svg>`;

  // Amount callout below chart
  svg += `<div style="text-align:center;margin-top:14px;font-size:0.84rem;color:var(--text-secondary);">Expected recourse from the 65 identified claims: <strong style="color:var(--accent);font-size:1rem;">${recourseAmount}</strong></div>`;

  return svg;
}

// ── Render: Outro slide ──
function renderOutro() {
  const o = DEMO_DATA.outro;
  let html = `
    <div class="outro-slide">
      <div class="outro-header">
        <div class="outro-title">${o.title}</div>
        <div class="outro-date">${o.date}</div>
      </div>

      <div class="outro-section">
        <div class="outro-timeline-card">
          <div class="outro-timeline-label">${o.timeline.label}</div>
          <div class="outro-timeline-detail">${o.timeline.detail}</div>
        </div>
      </div>

      <div class="outro-section">
        <div class="intro-section-title">Backtest on Historic Claims</div>
        <div class="outro-text">${o.backtest}</div>
      </div>

      <div class="outro-section">
        <div class="intro-section-title">Results So Far</div>
        <div class="outro-waterfall">
          ${renderWaterfall(o.waterfall, o.recourseAmount)}
        </div>
      </div>
    </div>
  `;
  return html;
}

// ── Main render ──
function render() {
  const content = document.getElementById("content");

  if (state.timestep === -1) {
    content.innerHTML = `<div class="section phase-visible">${renderIntro()}</div>`;
    content.scrollTop = 0;
    renderTimeline();
    renderControls();
    return;
  }

  if (state.timestep === OUTRO()) {
    content.innerHTML = `<div class="section phase-visible">${renderOutro()}</div>`;
    content.scrollTop = 0;
    renderTimeline();
    renderControls();
    return;
  }

  const ts = DEMO_DATA.timesteps[state.timestep];
  let html = "";

  // Phase 0: Inputs (always visible once shown)
  html += `<div class="section phase-visible">`;
  html += renderInputs(ts);
  html += "</div>";

  // Phase 1: Steps
  if (state.phase >= 1) {
    html += `<div class="section phase-visible">`;
    html += renderSteps(ts);
    html += "</div>";
  }

  // Phase 2: Decision
  if (state.phase >= 2) {
    html += `<div class="section phase-visible">`;
    html += renderDecision(ts);
    html += "</div>";
  }

  content.innerHTML = html;

  // Scroll to top on new timestep, otherwise scroll to show latest phase
  if (state.phase === 0) {
    content.scrollTop = 0;
  } else {
    // Smooth scroll to the last section
    const sections = content.querySelectorAll(".section");
    if (sections.length > 0) {
      sections[sections.length - 1].scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  renderTimeline();
  renderControls();
}

// ── Formatting ──
function formatEur(amount) {
  return amount.toLocaleString("de-DE", {
    style: "currency",
    currency: "EUR"
  });
}

// ── Keyboard ──
document.addEventListener("keydown", (e) => {
  // Close modal first if open
  if (e.key === "Escape") {
    closeDocument();
    return;
  }
  // Don't navigate when modal is open
  const modal = document.getElementById("doc-modal");
  if (modal && modal.classList.contains("visible")) return;

  if (e.key === "ArrowRight" || e.key === " ") {
    e.preventDefault();
    advance();
  } else if (e.key === "ArrowLeft") {
    e.preventDefault();
    back();
  } else if (e.key === "r" || e.key === "R") {
    e.preventDefault();
    reset();
  }
});

// ── Document viewer modal ──
function openDocument(docId) {
  const doc = DOCUMENTS[docId];
  if (!doc) return;

  const modal = document.getElementById("doc-modal");
  document.getElementById("doc-modal-title").textContent = doc.title;
  document.getElementById("doc-modal-meta").textContent = doc.meta;
  document.getElementById("doc-modal-body").innerHTML = doc.body;
  modal.classList.add("visible");
}

function closeDocument() {
  document.getElementById("doc-modal").classList.remove("visible");
}

// ── Init ──
document.addEventListener("DOMContentLoaded", () => {
  renderHeader();
  render();

  // Close modal on backdrop click or Escape
  document.getElementById("doc-modal").addEventListener("click", (e) => {
    if (e.target.id === "doc-modal") closeDocument();
  });
});
