const Home = () => (
  <Layout>
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">
        Prueba de Asociación Divergente (DAT): una medida rápida de creatividad verbal
      </h1>

      <p className="mb-6">
        Esta prueba consiste en generar 10 palabras que sean lo más diferentes posible entre sí. 
        Las personas con mayor creatividad suelen proponer palabras más distantes semánticamente, 
        lo que refleja un pensamiento más divergente.
      </p>

      <div className="mb-8">
        <a
          href="/test"
          className="inline-block bg-gray-900 text-white px-6 py-2 rounded-md hover:bg-gray-800"
        >
          Realizar la prueba (2-4 minutos)
        </a>
      </div>

      <div className="bg-gray-50 p-4 rounded-lg mb-8 text-sm">
        <p className="font-semibold mb-2">Sobre esta adaptación:</p>
        <p>
          Esta es una adaptación al español del{' '}
          <a 
            href="https://datcreativity.com"
            className="text-gray-900 underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Divergent Association Task (DAT)
          </a>
          {' '}original, desarrollado por investigadores de las universidades de Harvard, McGill y Melbourne. 
          La adaptación utiliza embeddings FastText en español en lugar de los embeddings GloVe en inglés del original, 
          manteniendo la misma metodología y sistema de puntuación.
        </p>
      </div>

      <p className="text-gray-600">
        Te sugerimos{' '}
        <a href="/test" className="text-gray-900 underline">realizar la prueba</a>
        {' '}antes de{' '}
        <a href="/about" className="text-gray-900 underline">leer más detalles sobre ella</a>.
        También puedes consultar el{' '}
        <a 
          href="https://www.pnas.org/doi/10.1073/pnas.2022340118"
          className="text-gray-900 underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          artículo científico original
        </a>
        {' '}publicado en PNAS.
      </p>
    </div>
  </Layout>
);

// Make Home component globally available
window.Home = Home;