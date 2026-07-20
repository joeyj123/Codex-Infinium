"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import glossaryData from "@/data/glossary.json";
import { useNotebook } from "@/lib/NotebookContext";

// A slim right-side panel, mounted once in layout.js so it's available on
// every page and its open/closed state and active tab survive route
// navigation (the component itself never unmounts between pages). Two
// tabs: a freeform Notebook, and a searchable browser view of the same
// glossary data Forge C already highlights inline in reading text.
export default function UtilityDrawer() {
  const [open, setOpen] = useState(false);
  const [tab, setTab] = useState("notebook");

  return (
    <>
      <button
        className="drawer-toggle"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        title="Notebook & Dictionary"
      >
        {open ? "✕" : "📓"}
      </button>
      <div className={`drawer-panel ${open ? "drawer-panel-open" : ""}`}>
        <div className="drawer-tabs">
          <button
            className={`drawer-tab ${tab === "notebook" ? "drawer-tab-active" : ""}`}
            onClick={() => setTab("notebook")}
          >
            📓 Notebook
          </button>
          <button
            className={`drawer-tab ${tab === "dictionary" ? "drawer-tab-active" : ""}`}
            onClick={() => setTab("dictionary")}
          >
            📖 Dictionary
          </button>
        </div>
        <div className="drawer-body">
          {tab === "notebook" ? <NotebookTab /> : <DictionaryTab />}
        </div>
      </div>
    </>
  );
}

function NotebookTab() {
  const { notes, addNote, deleteNote, loaded } = useNotebook();
  const [draft, setDraft] = useState("");

  function submit() {
    addNote(draft);
    setDraft("");
  }

  return (
    <div className="notebook-tab">
      <textarea
        className="forge-answer-box notebook-input"
        placeholder="Jot down a note…"
        rows={3}
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
      />
      <button className="btn" style={{ marginTop: 8 }} onClick={submit} disabled={!draft.trim()}>
        Add Note
      </button>

      <div className="notebook-list">
        {!loaded ? null : notes.length === 0 ? (
          <p className="stat-line" style={{ color: "var(--muted)", marginTop: 16 }}>
            No notes yet.
          </p>
        ) : (
          notes.map((note) => (
            <div key={note.id} className="notebook-note">
              <p className="notebook-note-text">{note.text}</p>
              <div className="notebook-note-footer">
                <span className="stat-line">{new Date(note.createdAt).toLocaleString()}</span>
                <button className="btn notebook-note-delete" onClick={() => deleteNote(note.id)}>
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

function DictionaryTab() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(null);

  const q = query.trim().toLowerCase();
  const results = !q
    ? glossaryData.terms
    : glossaryData.terms.filter(
        (t) =>
          t.term.toLowerCase().includes(q) ||
          (t.aliases || []).some((a) => a.toLowerCase().includes(q))
      );

  if (selected) {
    return (
      <div className="dictionary-tab">
        <button className="btn" onClick={() => setSelected(null)}>
          ← Back to list
        </button>
        <div className="glossary-popover-term" style={{ marginTop: 14 }}>
          {selected.technical_term}
        </div>
        <p className="glossary-popover-def" style={{ marginTop: 6 }}>
          {selected.definition}
        </p>
        <button
          className="btn glossary-popover-link"
          style={{ marginTop: 10 }}
          onClick={() => router.push(`/tier/${selected.tier_introduced}/study?topic=${selected.topic_id}`)}
        >
          Read full page →
        </button>
      </div>
    );
  }

  return (
    <div className="dictionary-tab">
      <input
        className="forge-answer-box notebook-input"
        placeholder="Search terms…"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <div className="dictionary-list">
        {results.length === 0 ? (
          <p className="stat-line" style={{ color: "var(--muted)", marginTop: 16 }}>
            No terms found.
          </p>
        ) : (
          results.map((t) => (
            <button key={t.id} className="dictionary-list-item" onClick={() => setSelected(t)}>
              {t.term}
            </button>
          ))
        )}
      </div>
    </div>
  );
}
