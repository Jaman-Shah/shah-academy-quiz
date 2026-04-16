import { useEffect, useState } from "react";

const UserAvatar = ({
  name = "",
  photoURL = "",
  sizeClassName = "h-20 w-20",
  textClassName = "text-2xl",
  ringClassName = "border-4 border-white/30",
  backgroundClassName = "bg-[linear-gradient(135deg,rgba(255,255,255,0.2),rgba(255,255,255,0.08))]",
  imageClassName = "",
}) => {
  const [hasImageError, setHasImageError] = useState(false);

  useEffect(() => {
    setHasImageError(false);
  }, [photoURL]);

  const trimmedName = String(name || "").trim();
  const firstLetter = trimmedName ? trimmedName.charAt(0).toUpperCase() : "U";
  const shouldShowImage = Boolean(photoURL) && !hasImageError;

  return (
    <div
      className={`flex shrink-0 items-center justify-center overflow-hidden rounded-full ${ringClassName} ${backgroundClassName} ${sizeClassName} ${textClassName} font-extrabold text-white shadow-lg shadow-slate-900/15`}
    >
      {shouldShowImage ? (
        <img
          src={photoURL}
          alt={trimmedName || "User"}
          className={`h-full w-full object-cover ${imageClassName}`}
          onError={() => setHasImageError(true)}
        />
      ) : (
        <span>{firstLetter}</span>
      )}
    </div>
  );
};

export default UserAvatar;
