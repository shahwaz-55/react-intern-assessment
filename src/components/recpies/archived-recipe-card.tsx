import { Card, CardDescription, CardTitle } from "../ui/card";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "../ui/button";
import { useRecipeStore } from "@/store/recipes";

interface ArchivedRecipieCardProps {
    id: string
    title: string;
    description: string
}

export default function ArchivedRecipieCard({ id, title, description }: ArchivedRecipieCardProps) {
    const deleteRecipe = useRecipeStore((state) => state.deleteRecipe);
    const unarchiveRecipe = useRecipeStore((state) => state.unarchiveRecipe);

    return (
        <Card className="p-3 hover:cursor-pointer flex flex-col justify-between">
            <div>
                <CardTitle>
                    {title}
                </CardTitle>
                <CardDescription>
                    {description}
                </CardDescription>
            </div>
            <div className="flex justify-end mt-2 space-x-2">
                <AlertDialog>
                    <AlertDialogTrigger asChild>
                        <Button variant="outline" size="sm">Unarchive</Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Are you sure you want to unarchive this recipe?</AlertDialogTitle>
                            <AlertDialogDescription>
                                This action will move the recipe back to the home page.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={() => unarchiveRecipe(id)}>Unarchive</AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>

                <AlertDialog>
                    <AlertDialogTrigger asChild>
                        <Button variant="destructive" size="sm">Delete</Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                                This action cannot be undone. This will permanently delete your
                                recipe and remove its data from our servers.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={() => deleteRecipe(id)}>Continue</AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </div>
        </Card>
    )
}