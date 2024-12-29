import { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { RecipeCard } from "@/components/RecipeCard";
import { supabase } from "@/integrations/supabase/client";

const Index = () => {
  const [recipes, setRecipes] = useState<any[]>([]);
  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);
  const [favorites, setFavorites] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<'search' | 'favorites'>('search');

  useEffect(() => {
    fetchRecipes();
    fetchFavorites();
  }, []);

  const fetchRecipes = async () => {
    try {
      const { data, error } = await supabase
        .from('Recipe Space')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      setRecipes(data || []);
      console.log('Recipes fetched:', data);
    } catch (error) {
      console.error('Error fetching recipes:', error);
    }
  };

  const fetchFavorites = async () => {
    try {
      const { data: favoritesData, error: favoritesError } = await supabase
        .from('Favorites')
        .select(`
          recipe_id,
          "Recipe Space" (*)
        `);
      
      if (favoritesError) throw favoritesError;
      
      const favoriteRecipes = favoritesData?.map(fav => fav['Recipe Space']) || [];
      const favoriteIds = favoritesData?.map(fav => fav.recipe_id?.toString()) || [];
      
      setFavorites(favoriteRecipes.filter(Boolean));
      setFavoriteIds(favoriteIds.filter(Boolean));
      console.log('Favorites fetched:', favoriteRecipes);
    } catch (error) {
      console.error('Error fetching favorites:', error);
    }
  };

  const handleFavoriteToggle = async (id: string, isFavorite: boolean) => {
    await fetchFavorites();
    console.log(`Favorites updated for recipe ${id}, isFavorite: ${isFavorite}`);
  };

  return (
    <div className="min-h-screen bg-recipe-cream">
      <Header />
      <main className="container mx-auto px-6 pt-24 pb-12">
        <div className="flex justify-center gap-6 mb-12">
          <button
            onClick={() => setActiveTab('search')}
            className={`px-10 py-4 rounded-2xl font-semibold text-xl transition-all ${
              activeTab === 'search'
                ? 'bg-recipe-orange text-white shadow-lg'
                : 'bg-white text-recipe-orange hover:bg-recipe-orange/10'
            }`}
          >
            Recipe Search
          </button>
          <button
            onClick={() => setActiveTab('favorites')}
            className={`px-10 py-4 rounded-2xl font-semibold text-xl transition-all ${
              activeTab === 'favorites'
                ? 'bg-recipe-orange text-white shadow-lg'
                : 'bg-white text-recipe-orange hover:bg-recipe-orange/10'
            }`}
          >
            Favorites
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-8">
          {activeTab === 'search' && recipes.map((recipe) => (
            <RecipeCard 
              key={recipe.id} 
              id={recipe.id.toString()}
              title={recipe['Recipe Title']}
              description={recipe['Recipe Description'] || ''}
              onFavoriteToggle={handleFavoriteToggle}
              initialFavorite={favoriteIds.includes(recipe.id.toString())}
            />
          ))}
          
          {activeTab === 'favorites' && favorites.map((recipe) => (
            <RecipeCard 
              key={recipe.id}
              id={recipe.id.toString()}
              title={recipe['Recipe Title']}
              description={recipe['Recipe Description'] || ''}
              onFavoriteToggle={handleFavoriteToggle}
              initialFavorite={true}
            />
          ))}
        </div>
      </main>
    </div>
  );
};

export default Index;