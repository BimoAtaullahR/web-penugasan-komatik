import { create } from "zustand";

const STORAGE_KEY = "@komatik/favorites";

export const useFavoritesStore = create((set, get) => ({
  favorites: new Set(),
  isHydrated: false,

  addFavorite: (jerseyId) =>
    set((state) => {
      const newFavorites = new Set(state.favorites);
      newFavorites.add(jerseyId);
      if (typeof window !== "undefined") {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(Array.from(newFavorites)));
      }
      return { favorites: newFavorites };
    }),

  removeFavorite: (jerseyId) =>
    set((state) => {
      const newFavorites = new Set(state.favorites);
      newFavorites.delete(jerseyId);
      if (typeof window !== "undefined") {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(Array.from(newFavorites)));
      }
      return { favorites: newFavorites };
    }),

  isFavorite: (jerseyId) => {
    const state = get();
    return state.favorites.has(jerseyId);
  },

  getFavorites: () => {
    const state = get();
    return Array.from(state.favorites);
  },

  setFavorites: (favorites) =>
    set({
      favorites: new Set(favorites)
    }),

  hydrate: () => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        try {
          const favorites = JSON.parse(stored);
          set({ favorites: new Set(favorites), isHydrated: true });
        } catch (e) {
          set({ isHydrated: true });
        }
      } else {
        set({ isHydrated: true });
      }
    } else {
      set({ isHydrated: true });
    }
  }
}));

