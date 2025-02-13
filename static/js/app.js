// static/js/app.js
const App = () => {
  const path = window.location.pathname;
  
  return (
    <ErrorBoundary>
      <React.Fragment>
        {path === '/' && <Home />}
        {path === '/test' && <RetryWrapper><Test /></RetryWrapper>}
        {path.startsWith('/results') && <RetryWrapper><Results /></RetryWrapper>}
        {path === '/about' && <About />}
        {path === '/faq' && <FAQ />}
      </React.Fragment>
    </ErrorBoundary>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(<App />);