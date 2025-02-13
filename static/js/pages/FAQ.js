// static/js/pages/FAQ.js
const FAQ = () => (
    <Layout>
      <div className="max-w-2xl mx-auto prose">
        <h1 className="text-3xl font-bold mb-6">Preguntas frecuentes</h1>
  
        <details className="mb-4">
          <summary className="font-semibold cursor-pointer hover:text-gray-900">
            ¿Una prueba tan breve puede medir realmente la creatividad?
          </summary>
          <div className="mt-2 pl-4">
            <p>
              El DAT mide específicamente un aspecto de la creatividad: la capacidad de generar 
              ideas semánticamente distantes (pensamiento divergente verbal). Los estudios han 
              demostrado que esta capacidad correlaciona significativamente con otras medidas 
              establecidas de creatividad.
            </p>
            <p className="mt-2">
              Sin embargo, la creatividad es un fenómeno complejo que incluye múltiples aspectos 
              como la originalidad, la flexibilidad y la elaboración de ideas. El DAT se centra 
              en medir uno de estos aspectos de manera eficiente y objetiva.
            </p>
          </div>
        </details>
  
        <details className="mb-4">
          <summary className="font-semibold cursor-pointer hover:text-gray-900">
            ¿Por qué solo es válido el primer intento?
          </summary>
          <div className="mt-2 pl-4">
            <p>
              Al ver la matriz de distancias entre palabras en los resultados, es posible 
              aprender a manipular artificialmente la puntuación. En los estudios de validación, 
              los participantes no recibieron retroalimentación sobre las distancias entre palabras, 
              y sus puntuaciones mostraron consistencia al repetir la prueba después de dos semanas.
            </p>
          </div>
        </details>
  
        <details className="mb-4">
          <summary className="font-semibold cursor-pointer hover:text-gray-900">
            ¿Cómo se calculan las distancias entre palabras?
          </summary>
          <div className="mt-2 pl-4">
            <p>
              Utilizamos embeddings de FastText en español, un modelo de procesamiento de lenguaje 
              natural entrenado con miles de millones de textos en español. El modelo representa 
              cada palabra como un vector matemático basado en sus contextos de uso. La distancia 
              entre dos palabras se calcula como la distancia coseno entre sus vectores.
            </p>
            <p className="mt-2">
              Este método es una adaptación del utilizado en el DAT original, que emplea embeddings 
              GloVe para el inglés. Ambos enfoques permiten cuantificar objetivamente las distancias 
              semánticas entre palabras.
            </p>
          </div>
        </details>
  
        <details className="mb-4">
          <summary className="font-semibold cursor-pointer hover:text-gray-900">
            ¿Por qué se utilizan solo 7 de las 10 palabras?
          </summary>
          <div className="mt-2 pl-4">
            <p>
              Esta decisión metodológica permite cierta flexibilidad: puedes cometer hasta tres 
              errores (palabras no válidas o errores ortográficos) y aun así recibir una puntuación 
              válida. Si requiriéramos las 10 palabras, un solo error invalidaría toda la prueba.
            </p>
            <p className="mt-2">
              Los estudios de validación han demostrado que 7 palabras son suficientes para obtener 
              una medida confiable del pensamiento divergente.
            </p>
          </div>
        </details>
  
        <details className="mb-4">
          <summary className="font-semibold cursor-pointer hover:text-gray-900">
            Mi puntuación fue baja, ¿significa que no soy creativo/a?
          </summary>
          <div className="mt-2 pl-4">
            <p>
              En absoluto. El DAT mide específicamente la capacidad de generar palabras semánticamente 
              distantes, que es solo un aspecto del pensamiento divergente verbal. La creatividad es 
              un fenómeno mucho más amplio que incluye múltiples habilidades y se manifiesta de 
              diversas formas.
            </p>
            <p className="mt-2">
              Existen muchas formas de creatividad que esta prueba no evalúa, como la creatividad 
              visual, musical, kinestésica o la capacidad de resolver problemas de manera innovadora. 
              Una puntuación baja simplemente indica una oportunidad para desarrollar este aspecto 
              específico del pensamiento divergente.
            </p>
          </div>
        </details>

        <div className="bg-gray-50 p-4 rounded-lg mt-8">
          <p className="text-sm">
            Para más información sobre la metodología y validación del DAT original, puedes consultar el{' '}
            <a 
              href="https://www.pnas.org/doi/10.1073/pnas.2022340118"
              className="text-gray-900 underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              artículo científico
            </a>
            {' '}publicado en PNAS o visitar la{' '}
            <a 
              href="https://datcreativity.com"
              className="text-gray-900 underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              página oficial del DAT
            </a>.
          </p>
        </div>
      </div>
    </Layout>
  );

// Make FAQ component globally available
window.FAQ = FAQ;