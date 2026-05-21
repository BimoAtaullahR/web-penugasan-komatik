import test, { after, before } from "node:test";
import assert from "node:assert/strict";

let useFavoritesStore;

before(async () => {
  const module = await import("../packages/favorites-store/src/index.js");
  useFavoritesStore = module.useFavoritesStore;
});

test("Zustand store: addFavorite adds a Jersey ID to favorites", async () => {
  const store = useFavoritesStore.getState();
  store.addFavorite(123);
  
  assert.ok(store.isFavorite(123));
  assert.ok(store.getFavorites().includes(123));
});

test("Zustand store: removeFavorite removes a Jersey ID from favorites", async () => {
  const store = useFavoritesStore.getState();
  store.addFavorite(456);
  store.removeFavorite(456);
  
  assert.ok(!store.isFavorite(456));
});

test("Zustand store: isFavorite returns true only for added items", async () => {
  const store = useFavoritesStore.getState();
  store.addFavorite(789);
  
  assert.ok(store.isFavorite(789));
  assert.ok(!store.isFavorite(999));
});

test("Zustand store: getFavorites returns array of all favorite IDs", async () => {
  const store = useFavoritesStore.getState();
  store.addFavorite(111);
  store.addFavorite(222);
  
  const favorites = store.getFavorites();
  assert.ok(favorites.includes(111));
  assert.ok(favorites.includes(222));
  assert.equal(typeof favorites, "object");
});
