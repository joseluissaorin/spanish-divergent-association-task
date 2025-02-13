const NavLink = ({ to, active, children }) => (
  <a
    href={to}
    className={`hover:text-gray-900 border-b-2 pb-1 ${
      active ? 'border-gray-900 text-gray-900' : 'border-transparent'
    }`}
  >
    {children}
  </a>
);

const Navigation = () => {
  const currentPath = window.location.pathname;
  const isActive = (path) => currentPath === path;

  return (
    <nav className="flex justify-center space-x-6 mb-12 text-gray-500 text-sm">
      <NavLink to="/" active={isActive('/')}>Home</NavLink>
      <NavLink to="/test" active={isActive('/test')}>Take the test</NavLink>
      <NavLink to="/about" active={isActive('/about')}>About</NavLink>
      <NavLink to="/faq" active={isActive('/faq')}>FAQ</NavLink>
    </nav>
  );
};

// Make Navigation component globally available
window.Navigation = Navigation;