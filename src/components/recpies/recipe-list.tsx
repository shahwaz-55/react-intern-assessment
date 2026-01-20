import { type RecipeType } from "@/store/recipes"
import RecipieCard from "./recipe-card"
import RecipeInfo from "./recipe-info"
import { Dialog, DialogTrigger } from "../ui/dialog"

interface RecipeListProps {
    recipes: RecipeType[];
}

export default function RecipeList({ recipes }: RecipeListProps) {
    if (recipes.length === 0) {
        return (
            <div className="text-center py-8 text-gray-500">
                No recipes found.
            </div>
        );
    }

    return <div className="flex gap-3 flex-col">
        {recipes.map(recipe => (<>
            <Dialog key={recipe.id}>
                <DialogTrigger asChild>
                    <div>
                        <RecipieCard id={recipe.id} title={recipe.title} description={recipe.description} />
                    </div>
                </DialogTrigger>
                <RecipeInfo id={recipe.id} />
            </Dialog>
        </>
        ))}
    </div>
}