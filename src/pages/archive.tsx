import { useRecipeStore } from "@/store/recipes";
import ArchivedRecipieCard from "@/components/recpies/archived-recipe-card";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import RecipeInfo from "@/components/recpies/recipe-info";

export default function Archive() {
    const archivedRecipes = useRecipeStore((state) => state.archivedRecipes);

    return (
        <div className="flex flex-col m-5 items-center">
            <h1 className="text-2xl font-bold mb-4">Archived Recipes</h1>
            {archivedRecipes.length === 0 ? (
                <p>No archived recipes found.</p>
            ) : (
                <div className="flex gap-3 flex-col">
                    {archivedRecipes.map((recipe) => (
                        <Dialog key={recipe.id}>
                            <DialogTrigger asChild>
                                <div>
                                    <ArchivedRecipieCard
                                        id={recipe.id}
                                        title={recipe.title}
                                        description={recipe.description}
                                    />
                                </div>
                            </DialogTrigger>
                            <RecipeInfo id={recipe.id} />
                        </Dialog>
                    ))}
                </div>
            )}
        </div>
    );
}