class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-white py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-max mx-auto">
            <main className="sm:flex">
              <p className="text-4xl font-bold text-red-600 sm:text-5xl">Error</p>
              <div className="sm:ml-6">
                <div className="sm:border-l sm:border-gray-200 sm:pl-6">
                  <h1 className="text-4xl font-bold text-gray-900 tracking-tight sm:text-5xl">
                    Algo salió mal
                  </h1>
                  <p className="mt-1 text-base text-gray-500">
                    Por favor, intenta recargar la página o desactivar las extensiones del navegador.
                  </p>
                </div>
                <div className="mt-6 flex space-x-3 sm:border-l sm:border-transparent sm:pl-6">
                  <button
                    onClick={() => window.location.reload()}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                  >
                    Recargar página
                  </button>
                  <a
                    href="/"
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                  >
                    Volver al inicio
                  </a>
                </div>
              </div>
            </main>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

// Make ErrorBoundary component globally available
window.ErrorBoundary = ErrorBoundary; 