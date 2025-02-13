// Using global React instance
const Layout = ({ children }) => (
  <div className="min-h-screen bg-white">
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Logo />
      <Navigation />
      {children}
    </div>
  </div>
);

// Make Layout component globally available
window.Layout = Layout;