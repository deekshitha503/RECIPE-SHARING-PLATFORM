import { Heart, ThumbsUp, UtensilsCrossed } from "lucide-react";
import { useState } from "react";
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
        const { error } = await supabase
          .from('Favorites')
          .insert([{ recipe_id: parseInt(id) }]);
        
        if (error) throw error;
      } else {
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
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
      <Link to={`/recipe/${id}`} className="block">
        <div className="relative h-64 bg-recipe-cream">
          {image ? (
            <img src={image} alt={title} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-recipe-orange">
              <UtensilsCrossed className="h-16 w-16" />
            </div>
          )}
        </div>
        <div className="p-6">
          <h3 className="text-2xl font-semibold text-recipe-brown hover:text-recipe-orange transition-colors mb-3">
            {title}
          </h3>
          <p className="text-gray-600 text-lg line-clamp-3">{description}</p>
        </div>
      </Link>
      <div className="px-6 pb-6 pt-2 flex justify-end gap-6">
        <button
          onClick={() => setIsLiked(!isLiked)}
          className="text-recipe-orange hover:text-recipe-peach transition-colors"
          aria-label="Like recipe"
        >
          <ThumbsUp className={`h-7 w-7 ${isLiked ? "fill-current" : ""}`} />
        </button>
        <button
          onClick={handleFavoriteClick}
          className="text-recipe-orange hover:text-recipe-peach transition-colors"
          aria-label="Favorite recipe"
        >
          <Heart className={`h-7 w-7 ${isFavorite ? "fill-current" : ""}`} />
        </button>
      </div>
    </div>
  );
};