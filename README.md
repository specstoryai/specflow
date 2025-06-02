# SpecFlow: A New Standard for Spec-Driven AI Development

## Introduction

**SpecFlow** is a modern, AI-aware standard for **specification-driven software development**. It offers a structured yet fluid framework for evolving ideas into robust systems, embracing iteration, learning, and tight feedback loops.

Inspired by projects like [Cursor Memory Bank](https://github.com/vanzan01/cursor-memory-bank), [AI Taskmaster](https://github.com/eyaltoledano/claude-task-master), and [SpecStory](https://specstory.com), SpecFlow introduces **seven collaborative modes** of work, each with a specific intent and associated documentation. The result is a system that enables both humans and AI to work with shared understanding, persistent memory, and clear execution boundaries.

Unlike traditional waterfall-style specifications, **SpecFlow doesn’t expect you to define everything up front.** It helps you shape intent, track evolution, and stay aligned over time — whether you're working alone, with teammates, or with an AI assistant.

---

## Modes of Work

Each **mode** reflects a specific mindset and intent. You can move fluidly between modes — they are not linear phases.

| Mode     | Purpose                                      | Primary Artifact |
|----------|----------------------------------------------|------------------|
| IDEA     | Explore new ideas or extensions              | `IDEA.md`        |
| ROADMAP  | Organize and plan multi-session work         | `ROADMAP.md`     |
| DESIGN   | Explore architecture, UI, logic, behavior    | `DESIGN.md`      |
| FOCUS    | Define the goal of the current session       | `FOCUS.md`       |
| BUILD    | Develop code, features, systems              | — uses `FOCUS.md` |
| REFLECT  | Review work, update state, log changes       | `CHANGELOG.md`, updates `MEMORY.md` |
| ARCHIVE  | Store historical materials                   | `ARCHIVE/`       |

### Global Canonical File: `MEMORY.md`

- This file **reflects the current, as-built state** of the system.
- It should be **updated in the REFLECT mode** after each BUILD session.
- All other files may contain ideas, partials, or abandoned directions — `MEMORY.md` is the ground truth.

---

## The SpecFlow Modes in Detail

### 1. IDEA – *From Spark to Seed*
**Capture the spark.**

- For new projects or new features in existing projects.
- May contain hypotheses, pain points, inspiration, and goals.
- **File**: `IDEA.md`
- **Mindset**: “This might be worth building.”

---

### 2. ROADMAP – *From Vision to Sessions*
**See the whole field.**

- Break down big ideas into multi-session paths.
- Track known unknowns, sequence work, define next steps.
- **File**: `ROADMAP.md`
- **Mindset**: “Here’s how we’ll get there over time.”

> 💡 **PLAN is always happening, but ROADMAP gives it shape.**

---

### 3. DESIGN – *Make the Invisible Visible*
**Explore possibilities before writing code.**

- Describe interfaces, systems, interactions, workflows.
- UI sketches, architecture diagrams, logic models.
- **File**: `DESIGN.md`
- **Mindset**: “Let’s figure out what this thing should be.”

---

### 4. FOCUS – *Frame the Session*
**From big picture to right now.**

- Created before a BUILD session, updated across time.
- Contains current goals, scope, and relevant context pulled from IDEA, ROADMAP, and DESIGN.
- **File**: `FOCUS.md`
- **Mindset**: “Here’s what we’re doing right now.”

> 🧠 If the Memory Bank is long-term memory, FOCUS is short-term working memory.

---

### 5. BUILD – *Make It Real*
**Write code. Compose behavior. Implement features.**

- This is where the building happens.
- **Uses** `FOCUS.md` as its task list and working plan.
- Changes are recorded afterward during REFLECT — not during BUILD.

---

### 6. REFLECT – *Review and Integrate*
**Close the loop.**

- What just happened? What worked? What changed?
- Update:
  - `CHANGELOG.md`: documents what changed in this session.
  - `MEMORY.md`: update the definitive, as-built record.
- Optionally update ROADMAP or start a new FOCUS.
- **Mindset**: “Let’s integrate what we’ve learned.”

---

### 7. ARCHIVE – *Stay Light, Store the Past*
**Preserve work without cluttering the present.**

- Completed or discarded materials go here.
- Archive old ideas, designs, FOCUS files, and changelogs.
- **Folder**: `ARCHIVE/`

---

## File Responsibilities

| File / Folder      | Description                                                                 |
|--------------------|-----------------------------------------------------------------------------|
| `IDEA.md`          | Initial spark: what you're trying to build and why                          |
| `ROADMAP.md`       | The evolving multi-session path forward                                     |
| `DESIGN.md`        | UI, architecture, and behavior-level design notes                           |
| `FOCUS.md`         | Specific goals for this dev session — critical for AI & human alignment     |
| `CHANGELOG.md`     | A human-readable log of what changed session-by-session                    |
| `MEMORY.md`        | The **canonical**, up-to-date record of the current system                  |
| `ARCHIVE/`         | Holds previous versions of the above, or discarded/obsolete documents       |

> ⚠️ **Only `MEMORY.md` should be treated as definitive.** Other files may contain ideas that were never implemented or were superseded.

---

## The SpecFlow Loop

1. **IDEA** → Explore and sketch the opportunity.
2. **ROADMAP** → Plan the work over multiple sessions.
3. **DESIGN** → Clarify structure, UI, flow, and behavior.
4. **FOCUS** → Define a short-term target.
5. **BUILD** → Write code and make progress.
6. **REFLECT** → Capture what happened and update the project state (`CHANGELOG.md` + `MEMORY.md`).
7. **ARCHIVE** → Store non-canonical history to keep things clean.

---

## Getting Started

1. Create a folder with the following files:  
   `IDEA.md`, `ROADMAP.md`, `DESIGN.md`, `MEMORY.md`, `CHANGELOG.md`
2. For each development session, create a fresh `FOCUS.md`.
3. After each BUILD, update `CHANGELOG.md` and reflect changes into `MEMORY.md`.
4. Move outdated artifacts into `ARCHIVE/` as needed.

---

## Conclusion

**SpecFlow** brings modern development back in sync with how we actually think and build: iteratively, contextually, and with increasing clarity. It’s built for AI-enhanced workflows and human collaboration alike.

By capturing **what’s happening**, **what we learned**, and **what actually exists**, SpecFlow makes every session easier to re-enter and every contributor more effective — without sacrificing agility or speed.

👉 To get started or contribute to the standard, visit [**specflow.com**](https://specflow.com)
