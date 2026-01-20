import RecipeList from "@/components/recpies/recipe-list";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useRecipeStore } from "@/store/recipes";
import { Button } from "@/components/ui/button";

export default function Home() {
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const recipesPerPage = 3; // Display 3 recipes per page

    const allRecipes = useRecipeStore((state) => state.recipes);

    const filteredRecipes = allRecipes.filter(recipe =>
        recipe.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        recipe.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        recipe.ingredients.some(ingredient =>
            ingredient.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
    );

    const indexOfLastRecipe = currentPage * recipesPerPage;
    const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
    const currentRecipes = filteredRecipes.slice(indexOfFirstRecipe, indexOfLastRecipe);

    const totalPages = Math.ceil(filteredRecipes.length / recipesPerPage);

    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    return (
        <div className="flex flex-col m-5 items-center">
            <div className="w-full max-w-md mb-4">
                <Input
                    type="text"
                    placeholder="Search recipes..."
                    value={searchTerm}
                    onChange={(e) => {
                        setSearchTerm(e.target.value);
                        setCurrentPage(1); // Reset to first page on search
                    }}
                />
            </div>
            <RecipeList recipes={currentRecipes} />
            <div className="flex space-x-2 mt-4">
                <Button
                    onClick={() => paginate(currentPage - 1)}
                    disabled={currentPage === 1}
                >
                    Previous
                </Button>
                {[...Array(totalPages)].map((_, index) => (
                    <Button
                        key={index + 1}
                        onClick={() => paginate(index + 1)}
                        variant={currentPage === index + 1 ? "default" : "outline"}
                    >
                        {index + 1}
                    </Button>
                ))}
                <Button
                    onClick={() => paginate(currentPage + 1)}
                    disabled={currentPage === totalPages}
                >
                    Next
                </Button>
            </div>
        </div>
    );
}