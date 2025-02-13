// static/js/pages/Test.js
const Test = () => {
  // Initialize state from localStorage or default values
  const [words, setWords] = React.useState(() => {
    const savedWords = localStorage.getItem('dat_words');
    return savedWords ? JSON.parse(savedWords) : Array(10).fill('');
  });
  const [errors, setErrors] = React.useState({});
  const [consent, setConsent] = React.useState(() => {
    return localStorage.getItem('dat_consent') === 'true';
  });
  const [showDetails, setShowDetails] = React.useState(false);

  // Save words to localStorage whenever they change
  React.useEffect(() => {
    localStorage.setItem('dat_words', JSON.stringify(words));
  }, [words]);

  // Save consent to localStorage whenever it changes
  React.useEffect(() => {
    localStorage.setItem('dat_consent', consent);
  }, [consent]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/calculate-score', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ words, consent })
      });
      
      const data = await response.json();
      if (data.success) {
        // Clear stored words after successful submission
        localStorage.removeItem('dat_words');
        window.location.href = `/results?data=${encodeURIComponent(JSON.stringify(data))}`;
      } else {
        setErrors({ submit: data.error || 'Error al calcular la puntuación' });
      }
    } catch (error) {
      setErrors({ submit: 'Error al calcular la puntuación' });
    }
  };

  // Clear saved words button
  const handleClear = () => {
    setWords(Array(10).fill(''));
    localStorage.removeItem('dat_words');
    setErrors({});
  };

  return (
    <Layout>
      <div className="max-w-2xl mx-auto">
        <h2 className="text-xl font-semibold mb-6">Instrucciones</h2>
        
        <p className="mb-6">
          Por favor, introduce 10 palabras que sean lo más <strong>diferentes</strong> posible 
          entre sí, en todos los significados y usos de las palabras.
        </p>

        <div className="mb-8">
          <h3 className="font-semibold mb-2">Reglas</h3>
          <ul className="list-decimal pl-5 space-y-2">
            <li>Solo <strong>palabras individuales</strong> en español.</li>
            <li>Solo <strong>sustantivos</strong> (ej., cosas, objetos, conceptos).</li>
            <li>No nombres propios (ej., no personas o lugares específicos).</li>
            <li>No vocabulario especializado (ej., no términos técnicos).</li>
            <li>Piensa en las palabras por tu cuenta (ej., no mires objetos a tu alrededor).</li>
          </ul>
        </div>

        <div className="mb-8">
          <h3 className="font-semibold mb-2">Consentimiento</h3>
          <label className="flex items-start space-x-2">
            <input
              type="checkbox"
              checked={consent}
              onChange={(e) => setConsent(e.target.checked)}
              className="mt-1 rounded border-gray-300"
            />
            <span className="text-sm">
              ¿Contribuir con tus respuestas anónimas a nuestra investigación?
            </span>
          </label>
        </div>

        <details className="mb-8">
          <summary className="cursor-pointer text-gray-600">
            Detalles del estudio (1 min)
          </summary>
          <div className="mt-2 pl-4 text-sm text-gray-600">
            <p className="mb-2">
              Esta es una adaptación al español del Divergent Association Task original,
              desarrollado por investigadores de Harvard, McGill y Melbourne.
            </p>
            <p>
              Los datos se utilizarán para investigar la creatividad verbal en español
              y su relación con otros procesos cognitivos.
            </p>
          </div>
        </details>

        <form onSubmit={handleSubmit} className="space-y-4">
          {words.map((word, i) => (
            <div key={i}>
              <input
                type="text"
                value={word}
                onChange={(e) => {
                  const newWords = [...words];
                  newWords[i] = e.target.value.toLowerCase();
                  setWords(newWords);
                }}
                placeholder="Introduce un sustantivo"
                className="w-full p-2 border rounded focus:ring-1 focus:ring-gray-900"
                required
              />
              {errors[i] && (
                <p className="text-red-500 text-sm mt-1">{errors[i]}</p>
              )}
            </div>
          ))}

          {errors.submit && (
            <p className="text-red-500 text-center">{errors.submit}</p>
          )}

          <div className="mt-8 space-y-4">
            <button
              type="submit"
              className="w-full bg-gray-900 text-white py-2 rounded hover:bg-gray-800"
            >
              Enviar
            </button>
            
            {words.some(word => word !== '') && (
              <button
                type="button"
                onClick={handleClear}
                className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700"
              >
                Borrar todas las palabras
              </button>
            )}
          </div>
        </form>
      </div>
    </Layout>
  );
};

// Make Test component globally available
window.Test = Test;