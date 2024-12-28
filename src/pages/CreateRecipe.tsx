import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";

const CreateRecipe = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here we'll add the logic to save the recipe
    toast({
      title: "Recipe Created",
      description: "Your recipe has been successfully created!",
    });
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-recipe-cream">
      <Header />
      <main className="container mx-auto px-4 pt-24 pb-12">
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold text-recipe-brown mb-6">Create New Recipe</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                Recipe Title
              </label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Enter recipe title"
                required
              />
            </div>
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                Recipe Description
              </label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Enter recipe description"
                required
                className="min-h-[200px]"
              />
            </div>
            <div className="flex justify-end space-x-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate("/")}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-recipe-orange hover:bg-recipe-peach text-white"
              >
                Create Recipe
              </Button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default CreateRecipe;