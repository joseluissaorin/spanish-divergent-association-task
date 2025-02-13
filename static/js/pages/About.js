// static/js/pages/About.js
const About = () => (
    <Layout>
      <div className="max-w-2xl mx-auto prose">
        <h1 className="text-3xl font-bold mb-6">Sobre la prueba DAT</h1>
        
        <div className="bg-gray-50 p-4 rounded-lg mb-8">
          <p className="text-sm">
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
            La adaptación mantiene la metodología original pero utiliza tecnología adaptada al español.
          </p>
        </div>

        <h2 className="text-2xl font-bold mb-4">¿Qué mide la prueba?</h2>
        <p>
          El DAT es una medida rápida de creatividad verbal y pensamiento divergente: 
          la capacidad de generar ideas diversas ante situaciones abiertas. La prueba evalúa 
          específicamente la fluidez para generar conceptos semánticamente distantes.
        </p>
  
        <p>
          La tarea consiste en proponer 10 palabras que sean lo más diferentes posible entre sí.
          Por ejemplo, "perro" y "gato" son semánticamente cercanas por ser mascotas comunes, 
          mientras que "libro" y "montaña" son más distantes en significado. Las personas con mayor 
          creatividad tienden a proponer palabras con mayores distancias semánticas entre sí.
        </p>
  
        <h2 className="text-2xl font-bold mt-8 mb-4">¿Cómo funciona?</h2>
        <p>
          La prueba analiza las distancias semánticas entre palabras utilizando modelos de 
          procesamiento de lenguaje natural. Estos modelos examinan cómo las palabras se utilizan 
          en contextos similares en grandes corpus de texto en español.
        </p>
  
        <h2 className="text-2xl font-bold mt-8 mb-4">¿Qué nos dice la investigación?</h2>
        <p>
          Los estudios han demostrado que las personas que obtienen puntuaciones más altas en el DAT 
          suelen mostrar:
        </p>

        <ul className="list-disc pl-5 space-y-2">
          <li>Mayor capacidad para encontrar usos novedosos y variados para objetos cotidianos</li>
          <li>Facilidad para establecer conexiones entre conceptos aparentemente no relacionados</li>
          <li>Mejor desempeño en la resolución de problemas que requieren insight</li>
          <li>Mayor creatividad en actividades cotidianas</li>
        </ul>
  
        <h2 className="text-2xl font-bold mt-8 mb-4">Validación científica</h2>
        <p>
          La versión original del DAT ha sido validada con más de 9,000 participantes de 98 países, 
          y sus resultados han sido publicados en la prestigiosa revista{' '}
          <a 
            href="https://www.pnas.org/doi/10.1073/pnas.2022340118"
            className="text-gray-900 underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            PNAS
          </a>
          . Esta adaptación al español utiliza la misma metodología, sustituyendo los embeddings 
          GloVe en inglés por embeddings FastText entrenados específicamente con texto en español.
        </p>
  
        <p className="mt-4">
          La brevedad de la prueba (menos de dos minutos) y su puntuación automatizada la hacen 
          especialmente útil para investigación en línea y estudios con grandes muestras de 
          participantes hispanohablantes.
        </p>
      </div>
    </Layout>
  );

// Make About component globally available
window.About = About;