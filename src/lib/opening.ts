"use client";
import { useSyncExternalStore } from "react";

/*
  The opening (loader) tells the rest of the page when the curtain is up,
  so the hero's entrance plays when it can actually be seen.
*/
const EVENT = "cs:opened";
let opened = false;

export function markOpened() {
  if (opened) return;
  opened = true;
  window.dispatchEvent(new Event(EVENT));
}

function subscribe(cb: () => void) {
  window.addEventListener(EVENT, cb);
  return () => window.removeEventListener(EVENT, cb);
}

export function useOpened() {
  return useSyncExternalStore(subscribe, () => opened, () => false);
}
