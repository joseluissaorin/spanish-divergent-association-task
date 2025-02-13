// static/js/pages/FAQ.js
const FAQ = () => (
    <Layout>
      <div className="max-w-2xl mx-auto prose">
        <h1 className="text-3xl font-bold mb-6">Preguntas frecuentes</h1>
  
        <details className="mb-4">
          <summary className="font-semibold cursor-pointer">
            ¿Una prueba tan simple puede medir realmente la creatividad?
          </summary>
          <p className="mt-2">
            Nuestra prueba mide solo una parte del complejo proceso de la creatividad.
            Nos centramos en la creatividad verbal y el pensamiento divergente. En nuestros
            estudios, las puntuaciones correlacionan con otras medidas de creatividad.
          </p>
        </details>
  
        <details className="mb-4">
          <summary className="font-semibold cursor-pointer">
            ¿Por qué solo es válida la primera puntuación?
          </summary>
          <p className="mt-2">
            Una vez que ves las distancias entre las palabras, es más fácil aumentar o
            disminuir artificialmente tu puntuación. En nuestros estudios, los participantes
            no reciben retroalimentación sobre su puntuación o las distancias entre palabras,
            y sus puntuaciones son bastante consistentes cuando repiten la prueba dos
            semanas después.
          </p>
        </details>
  
        <details className="mb-4">
          <summary className="font-semibold cursor-pointer">
            ¿Cómo se calcula la distancia entre las palabras?
          </summary>
          <p className="mt-2">
            Utilizamos el modelo FastText en español, que analiza cómo se usan las palabras
            en conjunto en miles de millones de páginas web. Las palabras que aparecen en
            contextos similares tienen distancias más cortas entre ellas.
          </p>
        </details>
  
        <details className="mb-4">
          <summary className="font-semibold cursor-pointer">
            ¿Por qué se usan solo 7 de las 10 palabras?
          </summary>
          <p className="mt-2">
            Si requiriéramos 10 palabras válidas, no podríamos calcular una puntuación si
            hubiera un solo error ortográfico. Requerir solo 7 de las 10 permite cierta
            redundancia: puedes proporcionar hasta 3 palabras inválidas y aún recibir una
            puntuación.
          </p>
        </details>
  
        <details className="mb-4">
          <summary className="font-semibold cursor-pointer">
            Obtuve una puntuación baja. ¿Significa que no soy creativo?
          </summary>
          <p className="mt-2">
            Una puntuación baja simplemente significa que obtuviste una puntuación baja
            en esta medida particular. Hay muchos tipos y aspectos diferentes de la
            creatividad que esta prueba no mide. Ninguna prueba individual puede capturar
            completamente la creatividad.
          </p>
        </details>
      </div>
    </Layout>
  );

// Make FAQ component globally available
window.FAQ = FAQ;