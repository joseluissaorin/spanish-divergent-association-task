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
        setErrors({ submit: data.error || 'No se pudo calcular la puntuación. Por favor, inténtalo de nuevo.' });
      }
    } catch (error) {
      setErrors({ submit: 'Hubo un problema al procesar tu respuesta. Por favor, inténtalo de nuevo.' });
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
        <h2 className="text-xl font-semibold mb-6">¿Cómo funciona la prueba?</h2>
        
        <p className="mb-6">
          Tu tarea es escribir 10 palabras que sean lo más <strong>diferentes</strong> posible 
          entre sí. Piensa en palabras que tengan significados y usos muy distintos.
        </p>

        <div className="mb-8">
          <h3 className="font-semibold mb-2">Reglas importantes</h3>
          <ul className="list-decimal pl-5 space-y-2">
            <li>Usa solo <strong>palabras individuales</strong> en español (sin espacios).</li>
            <li>Escribe solo <strong>sustantivos comunes</strong> (cosas, objetos o conceptos).</li>
            <li>Evita nombres propios (personas, lugares, marcas).</li>
            <li>No uses términos técnicos o muy especializados.</li>
            <li>Genera las palabras por ti mismo/a (no mires a tu alrededor).</li>
          </ul>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg mb-8">
          <h3 className="font-semibold mb-2">Participación en investigación</h3>
          <label className="flex items-start space-x-2">
            <input
              type="checkbox"
              checked={consent}
              onChange={(e) => setConsent(e.target.checked)}
              className="mt-1 rounded border-gray-300"
            />
            <span className="text-sm">
              Acepto que mis respuestas anónimas se utilicen con fines de investigación científica 
              sobre creatividad y procesos cognitivos.
            </span>
          </label>
        </div>

        <details className="mb-8">
          <summary className="cursor-pointer text-gray-600 hover:text-gray-900">
            Más información sobre el estudio
          </summary>
          <div className="mt-2 pl-4 text-sm text-gray-600">
            <p className="mb-2">
              Esta es una adaptación al español del Divergent Association Task (DAT) original, 
              desarrollado por investigadores de las universidades de Harvard, McGill y Melbourne.
            </p>
            <p>
              Los datos anónimos se utilizarán para estudiar la creatividad verbal en español 
              y su relación con otros procesos cognitivos. Ningún dato personal es recolectado 
              ni almacenado.
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
                placeholder="Escribe un sustantivo"
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
              Calcular mi puntuación
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