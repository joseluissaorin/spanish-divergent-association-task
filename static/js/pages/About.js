// static/js/pages/About.js
const About = () => (
    <Layout>
      <div className="max-w-2xl mx-auto prose">
        <h1 className="text-3xl font-bold mb-6">Sobre la prueba</h1>
        
        <p>
          La Prueba de Asociación Divergente es una medida rápida de la creatividad verbal y el
          pensamiento divergente: la capacidad de generar soluciones diversas a problemas abiertos.
        </p>
  
        <p>
          La prueba consiste en pensar en 10 palabras que sean lo más diferentes posible entre sí.
          Por ejemplo, las palabras "gato" y "perro" son similares, pero "gato" y "libro" no lo son.
          Las personas más creativas tienden a generar palabras que tienen mayores distancias entre ellas.
        </p>
  
        <p>
          Estas distancias se calculan examinando con qué frecuencia las palabras se usan juntas
          en contextos similares. Aunque la prueba mide solo una parte del complejo proceso de la
          creatividad, las investigaciones han encontrado que las personas que obtienen puntuaciones
          más altas tienden a:
        </p>
  
        <ul className="list-disc pl-5 space-y-2">
          <li>Encontrar usos más novedosos y variados para objetos comunes</li>
          <li>Establecer conexiones entre conceptos distantes</li>
          <li>Resolver más problemas de insight y analíticos</li>
          <li>Mostrar mayor creatividad en la vida cotidiana</li>
        </ul>
  
        <h2 className="text-2xl font-bold mt-8 mb-4">Validación</h2>
        <p>
          Hemos validado esta prueba con más de 9,000 participantes de 98 países.
          La versión en español utiliza el mismo procedimiento que el original pero
          con embeddings de FastText en español en lugar de GloVe en inglés.
        </p>
  
        <p>
          Las personas completan la prueba en menos de dos minutos y la puntuación es
          automática, lo que la hace ideal para pruebas en línea y muestras grandes.
        </p>
      </div>
    </Layout>
  );

// Make About component globally available
window.About = About;