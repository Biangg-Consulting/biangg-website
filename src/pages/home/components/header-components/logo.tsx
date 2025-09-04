import { Link } from "react-router-dom";
import BianggLogo from "@/assets/biangg-n.png";

export const Logo = () => {
    return (
        <Link to="/" className="flex gap-3 items-center">
            <img
                src={BianggLogo}
                alt="Biangg Logo"
                className="w-24 h-24"
            />
        </Link>
    );
};
