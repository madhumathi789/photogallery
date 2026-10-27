import { memo } from "react";
function HeartIcon({ filled }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill={filled ? "currentColor" : "none"}
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-6 h-6"
        >
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
        </svg>
    );
}
function PhotoCard({ photo, isFavourite, toggleFavourite }) {
    const src=`https://picsum.photos/id/${photo.id}/600/400`;
    return (
<li className="bg-white rounded-lg shadow-md overflow-hidden relative">
    <img src={src} alt={photo.author} loading="lazy" className="w-full h-48 object-cover" />
    <div className="flex items-center justify-between px-4 py-3">
        <span className="truncate text-gray-700 text-sm">{photo.author}</span>
        <button type="button" onClick={()=>toggleFavourite(photo.id)}
         aria-pressed={isFavourite}
        aria-label={isFavourite ? "Remove from favourites" : "Add to favourites"} 
        className={`round-full p-1 transition-colors duration-300 ${isFavourite ? "text-red-500" : "text-gray-400 hover:text-red-500"}`} 
        >
        <HeartIcon filled={isFavourite} />
        </button></div>
       </li>
    );
}
export default memo(PhotoCard);