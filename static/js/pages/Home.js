const Home = () => (
  <Layout>
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">
        La Prueba de Asociación Divergente mide la creatividad verbal en menos de 4 minutos
      </h1>

      <p className="mb-8">
        Consiste en pensar en 10 palabras sin relación entre sí. Las personas más creativas 
        tienden a pensar en palabras con mayores "distancias" entre ellas, mostrando un 
        pensamiento más divergente.
      </p>

      <div className="mb-8">
        <a
          href="/test"
          className="inline-block bg-gray-900 text-white px-6 py-2 rounded-md hover:bg-gray-800"
        >
          Realizar la prueba (2-4 minutos)
        </a>
      </div>

      <p className="text-gray-600">
        Recomendamos que{' '}
        <a href="/test" className="text-gray-900 underline">realices la prueba</a>
        {' '}antes de{' '}
        <a href="/about" className="text-gray-900 underline">aprender más sobre ella</a>.
        También puedes leer el{' '}
        <a 
          href="https://www.pnas.org/doi/10.1073/pnas.2022340118"
          className="text-gray-900 underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          artículo original
        </a>
        {' '}sobre la prueba.
      </p>
    </div>
  </Layout>
);

// Make Home component globally available
window.Home = Home;