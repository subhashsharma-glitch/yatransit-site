# On-Call & Shift Handover Template
### For Application Support Teams

*Use this at every shift change or on-call handover. The outgoing person fills it in, the incoming person reads it, and both talk it through for 10 minutes before signing it off.*

---

## 1. Handover details

| | |
|---|---|
| **Team / service(s) covered** | |
| **Date** | |
| **Handover time** | |
| **Outgoing engineer** | |
| **Incoming engineer** | |
| **Shift type** | Day / Night / Weekend / On-call |

---

## 2. Overall status

**Service health right now:** 🟢 Stable / 🟡 Degraded / 🔴 Major incident in progress

**Summary of the shift in two or three sentences:**

> *What happened, what's still open, and the one thing the incoming person must not miss.*

---

## 3. Open major incidents (P1 / P2)

| Ref | Service affected | Business impact | Current status | Next action | Owner | Next update due |
|---|---|---|---|---|---|---|
| | | | | | | |

*If a bridge call is running, include the link and who is leading it.*

---

## 4. Other open tickets that need attention this shift

| Ref | Priority | Summary | What's been tried | Next step | Waiting on |
|---|---|---|---|---|---|
| | | | | | |

---

## 5. Changes and releases

**In progress or completed this shift:**

| Change ref | What | Status | Rollback needed? | Checks still to do |
|---|---|---|---|---|
| | | | | |

**Scheduled during the next shift:**

| Change ref | What | Time | Who is implementing | Support needed from us |
|---|---|---|---|---|
| | | | | |

---

## 6. Known issues and workarounds

| Issue | Who is affected | Workaround | Problem / defect ref |
|---|---|---|---|
| | | | |

---

## 7. Monitoring and alerts

- **Alerts that fired and what was done:**
- **Noisy or known false alerts (safe to ignore, and why):**
- **Anything being watched closely:**

---

## 8. Batch jobs and scheduled tasks

| Job / process | Expected time | Status | Action if it fails |
|---|---|---|---|
| | | | |

---

## 9. Escalations and vendor cases

| Vendor / team | Case ref | Issue | Last contact | Next chase due |
|---|---|---|---|---|
| | | | | |

---

## 10. Actions for the incoming shift

| # | Action | Deadline | Done |
|---|---|---|---|
| 1 | | | ☐ |
| 2 | | | ☐ |
| 3 | | | ☐ |

---

## 11. Who to contact

| Role | Name | How to reach them |
|---|---|---|
| Duty / incident manager | | |
| Escalation (L3 / development) | | |
| Infrastructure / platform | | |
| Key vendor support | | |
| Business contact for critical services | | |

---

## 12. Sign-off

| | Name | Time |
|---|---|---|
| **Handed over by** | | |
| **Accepted by** | | |

☐ We talked through every open P1/P2 and every action above.
☐ The incoming engineer has access to every tool and bridge mentioned.

---

## How to run a good handover

1. **Talk, don't just send.** A document on its own gets skimmed. Spend 10 minutes going through it together, voice or video if you're remote.
2. **Lead with risk.** Start with anything that could get worse in the next few hours, not with what went well.
3. **Say what you tried.** "Restarted the service at 14:10, no change" saves the next person from repeating it.
4. **Name the owner of every open item.** If nobody owns it, it won't happen.
5. **Write deadlines as times, not phrases.** "Chase vendor by 09:00" beats "chase vendor tomorrow".
6. **Flag the noise.** Telling the incoming person which alerts are safe to ignore stops them escalating at 3am for nothing.
7. **Don't leave until it's accepted.** The handover is complete when the incoming engineer signs it off, not when you send it.

---

*This template is part of the **Major Incident & Handover Kit for Application Support Teams**, which also includes a severity matrix, a first-15-minutes incident runbook, stakeholder update messages, an escalation matrix and a post-incident review pack.*
