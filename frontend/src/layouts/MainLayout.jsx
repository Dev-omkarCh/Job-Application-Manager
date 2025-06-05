// src/layouts/MainLayout.jsx
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { Sun, Moon } from 'lucide-react';
import useThemeStore from '../store/themeStore';
import useLogout from '@/hooks/useLogout';

const MainLayout = () => {
  const { theme, toggleTheme } = useThemeStore();
  const {loading, logout} = useLogout();

  const handleLogout = () => {
     logout();
  }

  return (
    <div className="drawer lg:drawer-open bg-base-100 min-h-screen">
      <input id="nav-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col">
        {/* Navbar */}
        <div className="w-full navbar bg-base-200 px-4">
          <div className="flex-1 lg:hidden">
            <label htmlFor="nav-drawer" className="btn btn-square btn-ghost">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none"
                viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </label>
          </div>
          <div className="flex-1 font-bold text-xl">Job Tracker</div>
          <div className="flex-none">
            <button className="btn btn-ghost btn-circle" onClick={toggleTheme}>
              {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
            </button>
            <button className="btn btn-ghost" onClick={handleLogout}>Logout</button>
          </div>
        </div>

        {/* Main content */}
        <div className="p-4">
          <Outlet />
        </div>
      </div>

      {/* Sidebar */}
      <div className="drawer-side">
        <label htmlFor="nav-drawer" className="drawer-overlay"></label>
        <aside className="w-64 bg-base-100 text-base-content">
          <div className="p-4 text-xl font-bold">Menu</div>
          <ul className="menu p-4">
            <li><NavLink to="/home">Applications</NavLink></li>
            <li><NavLink to="/home/add">Add Application</NavLink></li>
            <li><NavLink to="/home/analysis">Analytics</NavLink></li>
          </ul>
        </aside>
      </div>
    </div>
  );
};

export default MainLayout;
