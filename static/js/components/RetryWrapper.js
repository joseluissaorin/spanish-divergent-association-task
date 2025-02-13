const RetryWrapper = ({ children, onError }) => {
  const [error, setError] = React.useState(null);
  const [retryCount, setRetryCount] = React.useState(0);
  const maxRetries = 3;

  const handleRetry = () => {
    if (retryCount < maxRetries) {
      setRetryCount(prev => prev + 1);
      setError(null);
    }
  };

  React.useEffect(() => {
    if (error && onError) {
      onError(error);
    }
  }, [error]);

  if (error) {
    return (
      <div className="rounded-md bg-red-50 p-4 my-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-red-800">
              Error al procesar la solicitud
            </h3>
            <div className="mt-2 text-sm text-red-700">
              <p>{error.message}</p>
            </div>
            {retryCount < maxRetries && (
              <div className="mt-4">
                <button
                  type="button"
                  onClick={handleRetry}
                  className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  Intentar de nuevo ({maxRetries - retryCount} intentos restantes)
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return React.cloneElement(children, {
    onError: setError,
    retryCount,
  });
};

// Make RetryWrapper component globally available
window.RetryWrapper = RetryWrapper; 