# Spanish DAT (Divergent Association Task)

A Spanish adaptation of the [original DAT](https://datcreativity.com) that measures verbal creativity by analyzing semantic distances between words. This project implements the same methodology as the original DAT but uses Spanish FastText embeddings instead of English GloVe embeddings.

## Overview

The Divergent Association Task (DAT) is a quick measure of verbal creativity that asks participants to enter 10 words that are as different from each other as possible. The task:
- Takes 2-4 minutes to complete
- Uses semantic distances between words to measure creativity
- Provides instant feedback with scores and percentiles
- Matches the original DAT's methodology and interface

## Project Structure

```
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
```

## Technical Stack

### Backend
- Flask: Web framework
- FastText: Spanish word embeddings
- NumPy: Numerical computations
- SciPy: Statistical calculations

### Frontend
- React (via CDN, no build step)
- Tailwind CSS (via CDN)
- Babel (via CDN for JSX support)

## Setup and Installation

1. Clone the repository:
```bash
git clone https://github.com/joseluissaorin/spanish-dat.git
cd spanish-dat
```

2. Install Python dependencies:
```bash
pip install flask flask-cors fasttext numpy scipy
```

3. Run the application:
```bash
python app.py
```

4. Access the application at http://localhost:5000

Note: The Spanish FastText model will be automatically downloaded on first run.

## Key Features

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

## API Endpoints

### POST /api/validate-word
Validates a single word.

Request:
```json
{
    "word": "gato"
}
```

Response:
```json
{
    "valid": true,
    "message": ""
}
```

### POST /api/calculate-score
Calculates DAT score for a set of words.

Request:
```json
{
    "words": ["gato", "libro", "montaña", "música", "tiempo", "color", "viento"]
}
```

Response:
```json
{
    "success": true,
    "score": 82.45,
    "percentile": 73.2,
    "words": ["gato", "libro", "montaña", "música", "tiempo", "color", "viento"],
    "distances": { ... }
}
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## About the Original DAT

This is an adaptation of the [original DAT](https://datcreativity.com) developed by researchers at Harvard, McGill, and Melbourne universities. For more information about the task and its validation, see their [paper in PNAS](https://www.pnas.org/doi/10.1073/pnas.2022340118).
