import { dummyData } from '@/data';
import { create } from 'zustand'


export type IngredientType = {
    name: string;
    unit: "mg" | "l" | "ml" | "nos"
    quantity: number
}

export type RecipeType = {
    id: string
    title: string
    description: string
    ingredients: IngredientType[]
}

interface RecipeState {
    recipes: RecipeType[]
    archivedRecipes: RecipeType[]

    addRecipe: (recipe: RecipeType) => void;
    findRecipe: (id: string) => RecipeType | undefined;
    deleteRecipe: (id: string) => void;
    archiveRecipe: (id: string) => void;
    unarchiveRecipe: (id: string) => void;
}

export const useRecipeStore = create<RecipeState>()((set, get) => {
    return {
        recipes: dummyData,
        archivedRecipes: [],

        addRecipe: (recipe: RecipeType) => {
            const currentRecpie: RecipeType[] = get().recipes
            set(
                {
                    recipes: [...currentRecpie, recipe]
                }
            )
        },

        findRecipe: (id: string) => {
            let recipe = undefined
            const recipes = get().recipes
            recipe = recipes.find((recipe) => recipe.id === id)
            return recipe
        },

        deleteRecipe: (id: string) => {
            set((state) => ({
                recipes: state.recipes.filter((recipe) => recipe.id !== id),
                archivedRecipes: state.archivedRecipes.filter((recipe) => recipe.id !== id),
            }));
        },

        archiveRecipe: (id: string) => {
            const recipeToArchive = get().recipes.find((recipe) => recipe.id === id);
            if (recipeToArchive) {
                set((state) => ({
                    recipes: state.recipes.filter((recipe) => recipe.id !== id),
                    archivedRecipes: [...state.archivedRecipes, recipeToArchive],
                }));
            }
        },

        unarchiveRecipe: (id: string) => {
            const recipeToUnarchive = get().archivedRecipes.find((recipe) => recipe.id === id);
            if (recipeToUnarchive) {
                set((state) => ({
                    archivedRecipes: state.archivedRecipes.filter((recipe) => recipe.id !== id),
                    recipes: [...state.recipes, recipeToUnarchive],
                }));
            }
        }
    }
})

