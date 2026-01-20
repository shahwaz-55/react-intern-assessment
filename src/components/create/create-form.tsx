import { useFieldArray, useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { v4 as uuidv4 } from 'uuid';
import { useState } from "react";

import { Button } from "@/components/ui/button"

import { Textarea } from "@/components/ui/textarea"

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "../ui/form"
import { Input } from "../ui/input"
import { useRecipeStore } from "@/store/recipes";

const recipeSchema = z.object({
    name: z.string().min(1, "Recipe name is required"),
    description: z.string().min(1, "Description is required"),
    ingredients: z.array(
        z.object({
            name: z.string().min(1, "Ingredient name is required"),
            unit: z.enum(["mg", "l", "ml", "nos"]),
            quantity: z.coerce.number().min(1, "Quantity must be at least 1"),
        })
    ).min(1, "At least one ingredient is required"),
})

type RecipeFormValues = z.infer<typeof recipeSchema>

export default function CreateForm() {
    const addRecipe = useRecipeStore((state) => state.addRecipe);
    const [showSuccess, setShowSuccess] = useState(false);

    const form = useForm<RecipeFormValues>({
        resolver: zodResolver(recipeSchema),
        defaultValues: {
            name: "",
            description: "",
            ingredients: [{ name: "", unit: "nos", quantity: 1 }],
        },
    })

    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: "ingredients",
    });

    const handleSubmit = (values: RecipeFormValues) => {
        addRecipe({
            id: uuidv4(),
            title: values.name,
            description: values.description,
            ingredients: values.ingredients,
        });
        form.reset();
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 3000); // Hide success message after 3 seconds
    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(handleSubmit)}
                className="space-y-4 max-w-md"
            >
                <FormField<RecipeFormValues>
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Recipe Name</FormLabel>
                            <FormControl>
                                <Input placeholder="Enter recipe name" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField<RecipeFormValues>
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                                <Textarea placeholder="Enter description" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div>
                    <FormLabel>Ingredients</FormLabel>
                    {fields.map((field, index) => (
                        <div key={field.id} className="flex space-x-2 mb-2">
                            <FormField<RecipeFormValues>
                                control={form.control}
                                name={`ingredients.${index}.name`}
                                render={({ field }) => (
                                    <FormItem className="flex-1">
                                        <FormControl>
                                            <Input placeholder="Ingredient name" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField<RecipeFormValues>
                                control={form.control}
                                name={`ingredients.${index}.quantity`}
                                render={({ field }) => (
                                    <FormItem className="w-24">
                                        <FormControl>
                                            <Input type="number" placeholder="Qty" {...field} value={Number(field.value)} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField<RecipeFormValues>
                                control={form.control}
                                name={`ingredients.${index}.unit`}
                                render={({ field }) => (
                                    <FormItem className="w-24">
                                        <FormControl>
                                            <select {...field} value={field.value as string} className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                                                <option value="mg">mg</option>
                                                <option value="l">l</option>
                                                <option value="ml">ml</option>
                                                <option value="nos">nos</option>
                                            </select>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button type="button" variant="destructive" onClick={() => remove(index)}>
                                Remove
                            </Button>
                        </div>
                    ))}
                    <Button type="button" onClick={() => append({ name: "", unit: "nos", quantity: 1 })}>
                        Add Ingredient
                    </Button>
                </div>

                <Button type="submit">Create Recipe</Button>
                {showSuccess && (
                    <div className="mt-4 p-3 bg-green-100 text-green-700 rounded">
                        Recipe created successfully!
                    </div>
                )}
            </form>
        </Form>
    )
}
