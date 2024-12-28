import { Heart } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

interface RecipeCardProps {
  id: string;
  title: string;
  description: string;
  image?: string;
}

export const RecipeCard = ({ id, title, description, image }: RecipeCardProps) => {
  const [isFavorite, setIsFavorite] = useState(false);

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative h-48 bg-recipe-cream">
        {image ? (
          <img src={image} alt={title} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-recipe-orange">
            <UtensilsCrossed className="h-12 w-12" />
          </div>
        )}
      </div>
      <div className="p-4">
        <Link to={`/recipe/${id}`}>
          <h3 className="text-xl font-semibold text-recipe-brown hover:text-recipe-orange transition-colors">
            {title}
          </h3>
        </Link>
        <p className="mt-2 text-gray-600 line-clamp-2">{description}</p>
        <div className="mt-4 flex justify-end">
          <button
            onClick={() => setIsFavorite(!isFavorite)}
            className="text-recipe-orange hover:text-recipe-peach transition-colors"
          >
            <Heart className={`h-6 w-6 ${isFavorite ? "fill-current" : ""}`} />
          </button>
        </div>
      </div>
    </div>
  );
};