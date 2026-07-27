"use client";

import { createContext, useContext, useEffect, useState } from "react";

const NotebookContext = createContext(null);

const STORAGE_KEY = "codex_infinium_notebook";

// Freeform notes for the Utility Drawer's Notebook tab. Kept in its own
// localStorage key, separate from progress/settings/onboarding data, so
// clearing any of those never touches a user's notes.
export function NotebookProvider({ children }) {
  const [notes, setNotes] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setNotes(JSON.parse(raw));
    } catch (e) {
      console.error("Could not load notebook", e);
    }
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (!loaded) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
    } catch (e) {
      console.error("Could not save notebook", e);
    }
  }, [notes, loaded]);

  function addNote(text) {
    const trimmed = text.trim();
    if (!trimmed) return;
    setNotes((prev) => [{ id: `${Date.now()}-${Math.random().toString(36).slice(2)}`, text: trimmed, createdAt: Date.now() }, ...prev]);
  }

  function deleteNote(id) {
    setNotes((prev) => prev.filter((n) => n.id !== id));
  }

  return (
    <NotebookContext.Provider value={{ notes, addNote, deleteNote, loaded }}>
      {children}
    </NotebookContext.Provider>
  );
}

export function useNotebook() {
  const ctx = useContext(NotebookContext);
  if (!ctx) throw new Error("useNotebook must be used within NotebookProvider");
  return ctx;
}
