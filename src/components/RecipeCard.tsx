import { Heart, ThumbsUp, UtensilsCrossed } from "lucide-react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

interface RecipeCardProps {
  id: string;
  title: string;
  description: string;
  image?: string;
  onFavoriteToggle: (id: string, isFavorite: boolean) => void;
  initialFavorite?: boolean;
}

export const RecipeCard = ({ 
  id, 
  title, 
  description, 
  image, 
  onFavoriteToggle,
  initialFavorite = false 
}: RecipeCardProps) => {
  const [isFavorite, setIsFavorite] = useState(initialFavorite);
  const [isLiked, setIsLiked] = useState(false);

  const handleFavoriteClick = async () => {
    const newFavoriteState = !isFavorite;
    try {
      if (newFavoriteState) {
        // Add to favorites
        const { error } = await supabase
          .from('Favorites')
          .insert([{ recipe_id: parseInt(id) }]);
        
        if (error) throw error;
      } else {
        // Remove from favorites
        const { error } = await supabase
          .from('Favorites')
          .delete()
          .eq('recipe_id', parseInt(id));
        
        if (error) throw error;
      }
      
      setIsFavorite(newFavoriteState);
      onFavoriteToggle(id, newFavoriteState);
      console.log(`Recipe ${id} ${newFavoriteState ? 'favorited' : 'unfavorited'}`);
    } catch (error) {
      console.error('Error updating favorite:', error);
    }
  };

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
        <div className="mt-4 flex justify-end gap-4">
          <button
            onClick={() => setIsLiked(!isLiked)}
            className="text-recipe-orange hover:text-recipe-peach transition-colors"
            aria-label="Like recipe"
          >
            <ThumbsUp className={`h-6 w-6 ${isLiked ? "fill-current" : ""}`} />
          </button>
          <button
            onClick={handleFavoriteClick}
            className="text-recipe-orange hover:text-recipe-peach transition-colors"
            aria-label="Favorite recipe"
          >
            <Heart className={`h-6 w-6 ${isFavorite ? "fill-current" : ""}`} />
          </button>
        </div>
      </div>
    </div>
  );
};