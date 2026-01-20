import { useNavigate } from "react-router-dom"
import { Button } from "./ui/button"

const pageLinks = [
    {
        path: "/",
        label: "home",
    },
    {
        path: "/create",
        label: "create",
    },
    {
        path: "/archive",
        label: "archive",
    },
]

export function Navigation() {

    const navigate = useNavigate()

    return <nav className="flex gap-3 justify-center">
        {pageLinks?.map(link => (
            <Button  variant='outline' onClick={() => navigate(link.path)}>
                {link.label}
            </Button>
        ))}
    </nav>

}