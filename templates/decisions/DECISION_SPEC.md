# Product Decision Record Specification v2.0

## Overview
A streamlined decision tracking system for product development, optimized for product managers working with AI-powered implementation. Focuses on strategic, architectural, and design decisions that shape the product, not implementation details.

## How to Use This Spec

This specification enables you to extract and document decisions from various sources, such as AI chat transcripts captured with [SpecStory](https://specstory.com):

**With AI Assistants:**
```
Review <transcript/document> and based on @DECISION_SPEC.md extract decisions
that were made and write them to DECISIONS.md
```

## Core Schema

### Required Fields (All Decisions)

```yaml
id: string                    # Unique identifier (e.g., "DEC-0142")
description: string           # 1-2 line summary of the decision
type: enum                    # Decision category (see Types below)
status: enum                  # Lifecycle stage: draft | decided | deprecated
owner: object
  id: string                  # Unique identifier
  name: string                # Display name
  role: string                # Role at time of decision

created_at: datetime          # When record was created
decided_at: datetime          # When decision was finalized (null if draft)
```

### Recommended Fields

```yaml
rationale: object
  problem: string             # What problem does this solve?
  context: string             # Current situation and constraints
  goals: array[string]        # What we're trying to achieve
  assumptions: array[string]  # Key assumptions we're making

alternatives: array[object]   # Options considered (optional for obvious decisions)
  - name: string
  - pros: array[string]
  - cons: array[string]
  - reason_rejected: string   # Why we didn't choose this

impact: object
  scope: array[string]        # Components, features, or user segments affected
  risks: array[string]        # Potential downsides
  benefits: array[string]     # Expected positive outcomes

links: object
  requirements: array[string]     # Related requirement IDs
  supersedes: array[string]       # Decisions this replaces
  dependencies: array[string]     # Decisions this depends on
  artifacts: array[string]        # URLs to mockups, docs, diagrams
```

### Optional Fields

```yaml
review_due: datetime          # When to revisit this decision
participants: array[string]   # Others involved in the decision
tags: array[string]          # Searchable tags
confidence: number           # 0-1 confidence score
ai_assisted: boolean         # If AI helped generate options/analysis
```

## Decision Types

### requirements
Feature definitions, user stories, acceptance criteria
```yaml
# Type-specific extensions:
user_story: string
acceptance_criteria: array[string]
target_personas: array[string]
priority: enum               # p0 | p1 | p2 | p3
success_metrics: array[object]
  - metric: string
  - target: string
  - measurement: string
```

### architecture
System structure, data flows, integration patterns
```yaml
# Type-specific extensions:
components_affected: array[string]
data_flow_changes: string
scalability_impact: string
integration_points: array[string]
performance_targets: object
  - latency: string
  - throughput: string
  - availability: string
```

### design
UX patterns, UI components, interaction flows
```yaml
# Type-specific extensions:
design_rationale: string
user_research: object
  - method: string
  - participants: number
  - key_findings: array[string]
mockups: array[string]       # URLs to design artifacts
accessibility_notes: string
brand_alignment: string
```

### strategy
Business model, pricing, market positioning, roadmap
```yaml
# Type-specific extensions:
business_impact: object
  - revenue_impact: string
  - market_opportunity: string
  - competitive_advantage: string
okr_alignment: array[string]
rollout_strategy: string
success_criteria: array[string]
```

### compliance
Security, privacy, legal, regulatory requirements
```yaml
# Type-specific extensions:
compliance_type: enum        # security | privacy | legal | regulatory
requirements_met: array[string]
audit_notes: string
data_classification: enum    # public | internal | confidential | restricted
approval_required: array[string]
```

### custom
For decisions that don't fit other categories
```yaml
# Must define what fields matter:
custom_type: string          # Your own type name
custom_fields: object        # Whatever fields you need
```

## Status Transitions

```
draft → decided → deprecated
  ↓        ↓
(deleted) (superseded by new decision)
```

- **draft**: Work in progress, not yet final
- **decided**: Active decision in effect
- **deprecated**: No longer valid, replaced or obsolete

## Examples

### Minimal Decision (Requirements)
```yaml
id: DEC-0201
description: Add guest checkout option to reduce cart abandonment
type: requirements
status: decided
owner:
  id: pm-001
  name: Sarah Chen
  role: Product Manager

created_at: 2025-08-06T09:00:00Z
decided_at: 2025-08-06T11:00:00Z

rationale:
  problem: 23% cart abandonment at account creation
  goals:
    - Reduce friction
    - Increase conversion
  assumptions:
    - Guest users will convert to accounts later

user_story: As a first-time buyer, I want to complete purchase without creating an account
acceptance_criteria:
  - Guest checkout option visible on cart page
  - Email capture for order confirmation
  - Option to create account post-purchase
priority: p0
```

### Architecture Decision
```yaml
id: DEC-0142
description: Adopt event-driven architecture for order fulfillment
type: architecture
status: decided
owner:
  id: pm-004
  name: Taylor Nguyen
  role: Product Architect

created_at: 2025-08-05T12:00:00Z
decided_at: 2025-08-06T10:00:00Z

rationale:
  problem: Monolithic fulfillment blocking async integrations
  context: Multiple partners need webhook-based updates
  goals:
    - Decouple fulfillment logic
    - Enable async retries
  assumptions:
    - Team familiar with event patterns
    - Kafka available

alternatives:
  - name: Keep current monolith
    pros:
      - No migration
      - Simple
    cons:
      - Hard to extend
      - Downtime risk
    reason_rejected: Too fragile for partner integrations
  
  - name: Synchronous microservices
    pros:
      - Familiar pattern
      - Direct responses
    cons:
      - Tight coupling
      - Cascade failures
    reason_rejected: Doesn't solve async requirement

impact:
  scope:
    - fulfillment-service
    - partner-gateway
  risks:
    - Migration complexity
    - Learning curve
  benefits:
    - Better fault isolation
    - Easier partner onboarding

components_affected:
  - order-service
  - inventory
  - shipping
integration_points:
  - Partner webhooks
  - Internal event bus
scalability_impact: Support 10x current order volume

links:
  requirements:
    - REQ-202
    - REQ-203
  artifacts:
    - https://miro.com/arch-diagram
    - https://docs/rfc/events.md
```

### Design Decision
```yaml
id: DEC-0311
description: Implement progressive disclosure for advanced search filters
type: design
status: decided
owner:
  id: d-002
  name: Alex Kim
  role: Lead Designer

created_at: 2025-08-01T10:00:00Z
decided_at: 2025-08-03T14:00:00Z

design_rationale: Reduce cognitive load while maintaining power user features
user_research:
  method: Usability testing
  participants: 12
  key_findings:
    - Users overwhelmed by 20+ filters
    - Most users need only 3-4 filters
    - Power users want all options accessible

mockups:
  - https://figma.com/search-v2

impact:
  scope:
    - search-page
    - mobile-app
  benefits:
    - Cleaner UI
    - Faster task completion
    - Better mobile experience
```

## Query Patterns

### Common Queries
- Show all requirements decisions for Q3
- Find architecture decisions affecting service X
- List deprecated decisions in the last 30 days
- Show decisions pending review
- Find all decisions by product area/tag
- Show decision history for feature Y

### Decision Graph Queries
- What decisions led to this feature?
- Which decisions depend on DEC-0142?
- Show all active decisions for checkout flow
- Find conflicting decisions

## Integration Guidelines

### For Product Managers
1. Log decisions as you make them, not retroactively
2. Start with minimal fields, add detail as needed
3. Link to artifacts (Figma, Docs, Jira) rather than duplicating
4. Use tags for your product area/team

### For AI Assistants
1. Reference decision IDs when implementing features
2. Flag when implementation deviates from decisions
3. Suggest decision updates when context changes
4. Auto-link code changes to relevant decisions

### For Teams
1. Review decisions during sprint planning
2. Deprecate outdated decisions explicitly
3. Use decision log for onboarding new members
4. Treat decisions as living documents

## Best Practices

### DO
- Keep descriptions concise and scannable
- Link liberally to source documents
- Record "why" more than "what"
- Update status when decisions change
- Use consistent tags across team

### DON'T
- Document implementation details
- Create decisions for temporary bugs/fixes
- Duplicate information from linked artifacts
- Leave zombie decisions in "draft" forever
- Create decisions for obvious choices

