
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { PlusCircle, LogOut } from "lucide-react";
import { useAuth } from "@/features/auth/context/AuthContext";
import { useNavigate, NavLink } from "react-router-dom";
import AddAssignerForm from "./AddAssignerForm";

export default function Header() {
  const { logout, isLoading } = useAuth();
  const navigate = useNavigate();
  const [isAddAssignerOpen, setIsAddAssignerOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  if (isLoading) {
    return (
      <header className="bg-beige-100 shadow-sm border-b border-beige-300">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="h-8 w-24 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-10 w-10 rounded-full bg-gray-200 animate-pulse"></div>
        </div>
      </header>
    );
  }

  return (
    <header className="bg-beige-100 shadow-sm border-b border-beige-300">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center">
          <h1 className="text-xl font-bold text-beige-800 mr-6">
            <NavLink to="/">Kanban</NavLink>
          </h1>
          
          <nav className="hidden md:flex space-x-4">
            <NavLink 
              to="/" 
              end
              className={({ isActive }) => 
                isActive 
                  ? "text-sm font-medium text-gray-800" 
                  : "text-sm font-medium text-gray-500 hover:text-gray-800"
              }
            >
              Dashboard
            </NavLink>
            <NavLink 
              to="/projects" 
              className={({ isActive }) => 
                isActive 
                  ? "text-sm font-medium text-gray-800" 
                  : "text-sm font-medium text-gray-500 hover:text-gray-800"
              }
            >
              Projects
            </NavLink>
            <NavLink 
              to="/calendar" 
              className={({ isActive }) => 
                isActive 
                  ? "text-sm font-medium text-gray-800" 
                  : "text-sm font-medium text-gray-500 hover:text-gray-800"
              }
            >
              Calendar
            </NavLink>
            <NavLink 
              to="/reports" 
              className={({ isActive }) => 
                isActive 
                  ? "text-sm font-medium text-gray-800" 
                  : "text-sm font-medium text-gray-500 hover:text-gray-800"
              }
            >
              Reports
            </NavLink>
          </nav>
        </div>
        
        <div className="flex items-center gap-3">
          <Button
            size="sm"
            className="hidden md:flex bg-amber-600 hover:bg-amber-700"
            onClick={() => setIsAddAssignerOpen(true)}
          >
            <PlusCircle className="h-4 w-4 mr-1" />
            Add Assigner
          </Button>

          <Button 
            variant="ghost" 
            size="icon" 
            className="ml-2 text-gray-500 hover:text-gray-700"
            onClick={handleLogout}
          >
            <LogOut className="h-5 w-5" />
          </Button>
        </div>
      </div>
      <AddAssignerForm open={isAddAssignerOpen} onClose={() => setIsAddAssignerOpen(false)} />
    </header>
  );
}
