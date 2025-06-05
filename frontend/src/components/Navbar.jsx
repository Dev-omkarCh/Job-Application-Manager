import { Briefcase, Menu, Sun, X } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {

    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [activeTab, setActiveTab] = useState("Add New");

    const navigationItems = [
        { name: "Home", active: false, to: "/" },
        { name: "Applications", active: false, to:"/applications" },
        { name: "Add New", active: true, to:"/add"},
        { name: "Analytics", active: false, to:"/analytics"},
    ];

    return (
        <> 
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center justify-between px-6 py-4 border-b border-slate-700">
            <div className="flex items-center space-x-8">
            <div className="flex items-center space-x-2">
                <Briefcase className="h-6 w-6 text-blue-400" />
                <span className="text-xl font-semibold text-blue-400">JobTrackr</span>
            </div>
            <div className="flex space-x-6">
                {navigationItems.map((item) => (
                <Link
                    to={item.to}
                    key={item.name}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    item.active ? "text-blue-400 bg-slate-800" : "text-slate-300 hover:text-white hover:bg-slate-800"
                    }`}
                >
                    {item.name}
                </Link>
                ))}
            </div>
            </div>
            <Button variant="ghost" size="icon" className="text-slate-300 hover:text-white">
            <Sun className="h-5 w-5" />
            </Button>
        </nav>

        {/* Mobile Navigation */}
        <nav className="md:hidden flex items-center justify-between px-4 py-3 border-b border-slate-700">
            <div className="flex items-center space-x-2">
            <Briefcase className="h-6 w-6 text-blue-400" />
            <span className="text-xl font-semibold text-blue-400">JobTrackr</span>
            </div>
            <div className="flex items-center space-x-2">
            <Button variant="ghost" size="icon" className="text-slate-300 hover:text-white">
                <Sun className="h-5 w-5" />
            </Button>
            <Button
                variant="ghost"
                size="icon"
                className="text-slate-300 hover:text-white"
                onClick={() => setIsDrawerOpen(true)}
            >
                <Menu className="h-5 w-5" />
            </Button>
            </div>
        </nav>
        {/* Mobile Drawer */}
      {isDrawerOpen && (
        <>
          {/* Backdrop */}
          <div className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden" onClick={() => setIsDrawerOpen(false)} />

          {/* Drawer */}
          <div className="fixed top-0 left-0 right-0 bg-slate-900 border-b border-slate-700 z-50 md:hidden animate-in slide-in-from-top duration-300">
            <div className="flex items-center justify-between px-4 py-3 border-b border-slate-700">
              <div className="flex items-center space-x-2">
                <Briefcase className="h-6 w-6 text-blue-400" />
                <span className="font-semibold text-blue-400 text-xl">JobTrackr</span>
              </div>
              
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsDrawerOpen(false)}
                className="text-slate-300 hover:text-white"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>

            <div className="p-4 space-y-2">
              {navigationItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.to}
                  className={`flex flex-col w-full text-left px-4 py-3 rounded-md text-sm font-medium transition-colors ${
                    item.active ? "text-blue-400" : "text-slate-300 hover:text-white hover:bg-slate-700"
                  }`}
                  onClick={() => {
                    setActiveTab(item.name)
                    setIsDrawerOpen(false)
                  }}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        </>
      )}
        </>
    )
};

export default Navbar
