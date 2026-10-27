import { useReducer, useEffect, useState, useMemo, useCallback } from 'react'
import useFetchPhotos from '../hooks/useFetchPhotos.js'
import {
  favouritesReducer,
  loadFavourites,
  saveFavourites,
  TOGGLE_FAVOURITE,
} from '../hooks/favouritesReducer.js'
import PhotoCard from './PhotoCard.jsx'

export default function Gallery() {
  const { photos, loading, error } = useFetchPhotos()
  const [query, setQuery] = useState('')
  const [favourites, dispatch] = useReducer(favouritesReducer, [], loadFavourites)

  useEffect(() => {
    saveFavourites(favourites)
  }, [favourites])

  const handleSearch = useCallback((e) => {
    setQuery(e.target.value)
  }, [])

  const handleToggle = useCallback((id) => {
    dispatch({ type: TOGGLE_FAVOURITE, id })
  }, [])

  const filteredPhotos = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return photos
    return photos.filter((p) => p.author.toLowerCase().includes(q))
  }, [photos, query])

  return (
    <main className="mx-auto max-w-7xl px-4 py-8">
      <h1 className="mb-6 text-3xl font-bold">Photo Gallery</h1>

      <input
        type="search"
        value={query}
        onChange={handleSearch}
        placeholder="Search by author name"
        aria-label="Search photos by author name"
        className="mb-8 w-full rounded-lg border border-slate-300 bg-white px-4 py-2 focus:border-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-200 sm:max-w-sm"
      />

      {loading && (
        <div className="flex justify-center py-20" role="status" aria-label="Loading photos">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-slate-300 border-t-slate-700" />
        </div>
      )}

      {error && (
        <p role="alert" className="rounded-lg bg-red-50 p-4 text-red-700">
          Could not load photos: {error}
        </p>
      )}

      {!loading && !error && filteredPhotos.length === 0 && (
        <p className="py-10 text-center text-slate-500">No photos match "{query}".</p>
      )}

      {!loading && !error && filteredPhotos.length > 0 && (
        <ul className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {filteredPhotos.map((photo) => (
            <PhotoCard
              key={photo.id}
              photo={photo}
              isFavourite={favourites.includes(photo.id)}
              toggleFavourite={handleToggle}
            />
          ))}
        </ul>
      )}
    </main>
  )
}