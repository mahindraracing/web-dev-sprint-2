import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"

function Error() {
    return(
        <>
        <div className="bg-red-500 h-[100vh] flex justify-center items-center flex-col">
            <h1 className="font-bold text-[200px]  text-white">404</h1>
            <Button className="bg-white text-black hover:text-white hover:bg-red-700" ><Link to="/">Return to Home</Link></Button>
        </div>
        </>
    )
}

export default Error