#!/usr/bin/env python3
"""
Spanish Adaptation of the Divergent Association Task (DAT)
=======================================================

This is a Spanish adaptation of the original DAT (https://datcreativity.com). 
The application measures verbal creativity by analyzing semantic distances between words
provided by users.

Project Structure:
----------------
spanish-dat/
├── static/                  # Static files served by Flask
│   ├── js/                 # JavaScript files
│   │   ├── components/     # React components
│   │   │   ├── Logo.js
│   │   │   ├── Navigation.js
│   │   │   ├── Layout.js
│   │   │   └── WordGrid.js
│   │   ├── pages/          # Page components
│   │   │   ├── Home.js
│   │   │   ├── Test.js
│   │   │   ├── Results.js
│   │   │   ├── About.js
│   │   │   └── FAQ.js
│   │   └── app.js         # Main React application
│   └── css/               # CSS styles (optional)
├── templates/             # Flask templates
│   └── index.html        # Main HTML template
└── app.py                # Flask application

Technical Stack:
--------------
Backend:
- Flask: Web framework
- FastText: Spanish word embeddings
- NumPy: Numerical computations
- SciPy: Statistical calculations

Frontend:
- React (via CDN, no build step)
- Tailwind CSS (via CDN)
- Babel (via CDN for JSX support)

Key Features:
-----------
1. Word Validation:
   - Single word check
   - Lowercase enforcement
   - Spanish vocabulary verification
   - No proper nouns or technical terms

2. Scoring System:
   - Uses first 7 valid words
   - Calculates pairwise semantic distances
   - Computes average distance score
   - Determines percentile rank

3. User Interface:
   - Matches original DAT design
   - Client-side routing
   - Real-time word validation
   - Interactive results display

Usage:
-----
1. Install dependencies:
   pip install flask flask-cors fasttext numpy scipy

2. Run the application:
   python app.py

3. Access the application:
   http://localhost:5000

Notes:
-----
- The FastText model is automatically downloaded on first run
- Scores are normalized to match the original DAT distribution
- The application uses client-side routing for a smooth user experience
"""

from flask import Flask, request, jsonify, render_template, send_from_directory
from flask_cors import CORS
import os
import numpy as np
import fasttext
import fasttext.util
from scipy.stats import norm
import logging
import traceback

# --- Configuration ---
MODEL_LANG = 'es'
MODEL_FILENAME = f"cc.{MODEL_LANG}.300.bin"

# Configure logging
logging.basicConfig(
    level=logging.DEBUG,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# Download and load Spanish FastText model
if not os.path.exists(MODEL_FILENAME):
    logger.info("Downloading Spanish FastText model...")
    try:
        fasttext.util.download_model(MODEL_LANG, if_exists='ignore')
    except Exception as e:
        logger.error(f"Error downloading FastText model: {str(e)}")
        raise

logger.info("Loading FastText model...")
try:
    ft = fasttext.load_model(MODEL_FILENAME)
    logger.info("Model loaded successfully.")
except Exception as e:
    logger.error(f"Error loading FastText model: {str(e)}")
    raise

# Build vocabulary set
try:
    vocab = set(ft.get_words())
    logger.info(f"Vocabulary loaded with {len(vocab)} words")
except Exception as e:
    logger.error(f"Error building vocabulary: {str(e)}")
    raise

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

def is_valid_word(word):
    """Validates if a word meets the criteria."""
    try:
        if not word:
            return False, "La palabra está vacía."
        if " " in word:
            return False, "La palabra contiene espacios."
        if word != word.lower():
            return False, "La palabra debe estar en minúsculas."
        if word not in vocab:
            return False, f"La palabra '{word}' no está en nuestro diccionario."
        return True, ""
    except Exception as e:
        logger.error(f"Error validating word '{word}': {str(e)}")
        return False, "Error interno validando la palabra."

def cosine_distance(word1, word2):
    """Calculates semantic distance between words."""
    try:
        vec1 = ft.get_word_vector(word1)
        vec2 = ft.get_word_vector(word2)
        cosine_sim = np.dot(vec1, vec2) / (np.linalg.norm(vec1) * np.linalg.norm(vec2))
        return 1 - cosine_sim
    except Exception as e:
        logger.error(f"Error calculating distance between '{word1}' and '{word2}': {str(e)}")
        raise

def compute_distances(words):
    """Computes all pairwise distances between words."""
    distances = {}
    for i, word1 in enumerate(words):
        distances[word1] = {}
        for word2 in words[i+1:]:
            distance = float(cosine_distance(word1, word2))
            distances[word1][word2] = round(distance * 100)
    return distances

def compute_DAT_score(words):
    """Computes the DAT score using the first 7 valid words."""
    selected_words = words[:7]
    distances = []
    for i in range(len(selected_words)):
        for j in range(i + 1, len(selected_words)):
            distances.append(float(cosine_distance(selected_words[i], selected_words[j])))
    avg_distance = float(np.mean(distances))
    return avg_distance * 100

def calculate_percentile(score, mean=78, std=10):
    """Calculates percentile based on normal distribution."""
    return float(norm.cdf(score, loc=mean, scale=std) * 100)

@app.route('/api/validate-word', methods=['POST'])
def validate_word():
    word = request.json.get('word', '').strip()
    valid, message = is_valid_word(word)
    return jsonify({
        'valid': valid,
        'message': message
    })

@app.route('/api/calculate-score', methods=['POST'])
def calculate_score():
    try:
        logger.info("Received calculate-score request")
        request_data = request.get_json()
        if not request_data:
            logger.error("No JSON data received in request")
            return jsonify({
                'success': False,
                'error': "No se recibieron datos."
            }), 400

        words = request_data.get('words', [])
        logger.info(f"Processing {len(words)} words")
        
        if not words:
            logger.error("No words received in request")
            return jsonify({
                'success': False,
                'error': "No se recibieron palabras."
            }), 400

        valid_words = []
        errors = []
        
        # Validate words
        for i, word in enumerate(words, 1):
            try:
                word = word.strip()
                valid, message = is_valid_word(word)
                if valid:
                    valid_words.append(word)
                else:
                    errors.append(f"Palabra {i}: {message}")
            except Exception as e:
                logger.error(f"Error processing word {i} ({word}): {str(e)}")
                errors.append(f"Palabra {i}: Error interno")

        if len(valid_words) < 7:
            logger.error(f"Insufficient valid words: {len(valid_words)} < 7")
            return jsonify({
                'success': False,
                'error': "Se necesitan al menos 7 palabras válidas.",
                'errors': errors
            }), 400
        
        try:
            logger.info("Calculating DAT score")
            score = compute_DAT_score(valid_words)
            logger.info("Calculating percentile")
            percentile = calculate_percentile(score)
            logger.info("Computing distances")
            distances = compute_distances(valid_words[:7])
            
            logger.info("Score calculation completed successfully")
            return jsonify({
                'success': True,
                'score': round(score, 2),
                'percentile': round(percentile, 2),
                'words': valid_words[:7],
                'distances': distances
            })
        except Exception as e:
            logger.error(f"Error in score calculation: {str(e)}\n{traceback.format_exc()}")
            return jsonify({
                'success': False,
                'error': "Error al calcular la puntuación. Por favor, inténtelo de nuevo."
            }), 500
            
    except Exception as e:
        logger.error(f"Unexpected error in calculate_score: {str(e)}\n{traceback.format_exc()}")
        return jsonify({
            'success': False,
            'error': "Error interno del servidor. Por favor, inténtelo de nuevo."
        }), 500

@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve(path):
    # First try to find a static file
    if path and os.path.exists(os.path.join(app.static_folder, path)):
        return send_from_directory(app.static_folder, path)
    # Otherwise return the index.html for client-side routing
    return render_template('index.html')

if __name__ == '__main__':
    # Enable full debug output
    app.config['PROPAGATE_EXCEPTIONS'] = True
    app.run(host="0.0.0.0", port=5000, debug=True, use_reloader=False)