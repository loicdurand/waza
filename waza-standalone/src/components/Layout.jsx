import { NavLink, Outlet } from 'react-router-dom';
import useI18nStore from '../stores/i18nStore';

const Layout = ({ children }) => {
  const { t } = useI18nStore();
  const activeLinkStyle = {
    fontWeight: 'bold',
    textDecoration: 'underline',
  };

  return (
    <div
      className="min-h-screen font-sans bg-cover bg-center flex flex-col" // Added flex-col
      style={{ backgroundImage: "url('/images/rrose-bg.jpg')" }}
    >
      {/* Overlay for readability */}
      <div className="flex-grow bg-opacity-60 flex flex-col"> {/* Added flex-grow and flex-col */}
        {/* Main content area wrapped in a floating card */}
        <main className="container mx-auto px-6 py-8 flex-grow"> {/* Added flex-grow */}
                  <header className="glass">
          <nav className="container mx-auto px-6 py-3">
            <ul className="flex items-center justify-start space-x-6">
              <li>
                <h1 className="text-xl font-bold mr-6">{t('Waza')}</h1>
              </li>
              <li>
                <NavLink
                  to="/"
                  style={({ isActive }) => isActive ? activeLinkStyle : undefined}
                  className="hover:text-gray-600"
                >
                  {t('dashboard')}
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/materials"
                  style={({ isActive }) => isActive ? activeLinkStyle : undefined}
                  className="hover:text-gray-600"
                >
                  {t('materials')}
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/settings"
                  style={({ isActive }) => isActive ? activeLinkStyle : undefined}
                  className="hover:text-gray-600"
                >
                  {t('settings')}
                </NavLink>
              </li>
            </ul>
          </nav>
        </header>
          <div className="big-card glass p-8 rounded-2xl min-h-[calc(100vh-180px)]"> {/* Increased padding, shadow, rounded corners, min-height */}
            {children}
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;
