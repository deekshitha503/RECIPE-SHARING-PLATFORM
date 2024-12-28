import { UtensilsCrossed } from "lucide-react";
import { Link } from "react-router-dom";

export const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 bg-white shadow-md z-50">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <UtensilsCrossed className="h-8 w-8 text-recipe-orange" />
          <span className="text-2xl font-semibold text-recipe-brown">My Secret Recipes</span>
        </Link>
        <Link
          to="/create"
          className="bg-recipe-orange text-white px-4 py-2 rounded-md hover:bg-recipe-peach transition-colors"
        >
          Create Recipe
        </Link>
      </div>
    </header>
  );
};