import { useState } from "react";
import { Header } from "@/components/Header";
import { SearchBar } from "@/components/SearchBar";
import { RecipeCard } from "@/components/RecipeCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Temporary mock data
const mockRecipes = [
  {
    id: "1",
    title: "Chocolate Chip Cookies",
    description: "Classic homemade chocolate chip cookies that are soft, chewy, and loaded with chocolate chips.",
  },
  {
    id: "2",
    title: "Spaghetti Carbonara",
    description: "Traditional Italian pasta dish with eggs, cheese, pancetta, and black pepper.",
  },
  // Add more mock recipes as needed
];

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [favorites] = useState(mockRecipes.slice(0, 1)); // Temporary: first recipe as favorite

  const filteredRecipes = mockRecipes.filter((recipe) =>
    recipe.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
            <div className="mb-8">
              <SearchBar onSearch={setSearchQuery} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredRecipes.map((recipe) => (
                <RecipeCard key={recipe.id} {...recipe} />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="favorites">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {favorites.map((recipe) => (
                <RecipeCard key={recipe.id} {...recipe} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Index;