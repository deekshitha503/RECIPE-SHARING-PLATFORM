import { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { RecipeCard } from "@/components/RecipeCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { supabase } from "@/integrations/supabase/client";

const Index = () => {
  const [recipes, setRecipes] = useState<any[]>([]);
  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);
  const [favorites, setFavorites] = useState<any[]>([]);

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
      <main className="container mx-auto px-4 pt-24 pb-12">
        <Tabs defaultValue="search" className="w-full">
          <TabsList className="w-full max-w-md mx-auto mb-8">
            <TabsTrigger value="search" className="w-1/2">Recipe Search</TabsTrigger>
            <TabsTrigger value="favorites" className="w-1/2">Favorites</TabsTrigger>
          </TabsList>
          
          <TabsContent value="search">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recipes.map((recipe) => (
                <RecipeCard 
                  key={recipe.id} 
                  id={recipe.id.toString()}
                  title={recipe['Recipe Title']}
                  description={recipe['Recipe Description'] || ''}
                  onFavoriteToggle={handleFavoriteToggle}
                  initialFavorite={favoriteIds.includes(recipe.id.toString())}
                />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="favorites">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {favorites.map((recipe) => (
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
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Index;