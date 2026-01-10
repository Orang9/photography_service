import { Link, useNavigate } from "react-router-dom";
import { User } from "lucide-react";
import Button from "../../components/common/Button";
import { useAuth } from "../../context/AuthContext";

export default function Navbar() {
  const { user, isLoggedIn, onLogout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate("/login");
  };

  return (
    <nav className="sticky top-0 z-50 bg-[#E8D4C3]/90 backdrop-blur-md border-b border-[#6B7280]">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold text-[#13273F]">
          aynfaal<span className="text-[#4E0000]">.</span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <Link to="/">Home</Link>

          {isLoggedIn ? (
            <>
              <Link to="/history">History</Link>
              <Link to="/booking">Booking</Link>

              <Button
                variant="[#13273F]"
                onClick={handleLogout}
                className="px-4 py-2 text-sm border-2"
              >
                Logout
              </Button>

              <Link to="/profile">
                <User className="cursor-pointer" />
              </Link>
            </>
          ) : (
            <Link to="/login">
              <Button variant="outline" className="px-5 py-2">
                Masuk
              </Button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
