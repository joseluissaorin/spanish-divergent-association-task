// static/js/pages/Results.js
const Results = () => {
  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const encodedData = urlParams.get('data');
    if (encodedData) {
      setData(JSON.parse(decodeURIComponent(encodedData)));
    }
  }, []);

  if (!data) return <div>Cargando...</div>;

  return (
    <Layout>
      <div className="max-w-2xl mx-auto text-center">
        <h1 className="text-4xl font-bold mb-4">
          Tu puntuación es {data.score}, mayor que el {data.percentile}% de las personas
          que han completado esta prueba
        </h1>

        <WordGrid words={data.words} distances={data.distances} />

        <p className="text-gray-600 mb-8">
          La puntuación media es 78, y la mayoría de las personas obtienen entre 74 y 82. 
          La puntuación más baja fue 24 y la más alta 96 en nuestra muestra publicada. 
          Aunque las puntuaciones pueden variar teóricamente de 0 a 200, en la práctica 
          varían de 6 a 110 después de millones de respuestas en línea.
        </p>

        <div className="space-x-4">
          <a
            href="/test"
            className="bg-gray-900 text-white px-6 py-2 rounded hover:bg-gray-800"
          >
            Intentar de nuevo
          </a>
          <button
            onClick={() => {
              const text = `Mi puntuación en el DAT en español: ${data.score} (mayor que el ${data.percentile}% de los participantes)`;
              navigator.clipboard.writeText(text);
              alert('¡Resultado copiado!');
            }}
            className="border border-gray-900 px-6 py-2 rounded hover:bg-gray-100"
          >
            Copiar resultado
          </button>
        </div>
      </div>
    </Layout>
  );
};

// Make Results component globally available
window.Results = Results;