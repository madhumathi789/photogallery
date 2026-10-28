export const TOGGLE_FAVOURITE="TOGGLE_FAVOURITE";
const STORAGE_KEY="gallery-favourites";

export function favouritesReducer(state, action) {
    switch (action.type) {
        case TOGGLE_FAVOURITE:
            return state.includes(action.id)
                ? state.filter((id) => id !== action.id)
                : [...state, action.id];
        default:
            return state;
    }
}

export function loadFavourites() {
    try {
        const saved=localStorage.getItem(STORAGE_KEY);
        return saved?JSON.parse(saved) : [];
    } catch {
        return [];
    }
}

export function saveFavourites(favourites) {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(favourites));
    } catch {
    }
}