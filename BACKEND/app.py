import os
from flask import Flask, request, jsonify, render_template
from PIL import Image
import io  # for handling binary image data
import numpy as np
import tensorflow as tf
from tensorflow.keras.preprocessing import image
import requests
import uuid
import json

app = Flask(__name__)

# Get the directory of the current script
script_dir = os.path.dirname(os.path.abspath(__file__))

# Load the ML model using the absolute path
model_path = os.path.join(script_dir, 'medscan_model.h5')
model = tf.keras.models.load_model(model_path)

# Read API key from config file
base_dir = os.path.dirname(__file__)
abs_file = os.path.join(base_dir, 'translation_key.json')
with open(abs_file) as config_file:
    config = json.load(config_file)
    key = config.get('TRANSLATOR_API_KEY')

# Translation endpoint details
endpoint = "https://api.cognitive.microsofttranslator.com"
location = "southeastasia"
path = '/translate'
constructed_url = endpoint + path

# Route handler for root URL
@app.route('/')
def home():
    return "Welcome to the MedScan Backend!"

# Function to preprocess the image
def preprocess_image(image_data):
    img = Image.open(io.BytesIO(image_data))  # Open image from binary data
    img = img.resize((224, 224))  # Resize image to match model input shape
    img_array = image.img_to_array(img)
    img_array = np.expand_dims(img_array, axis=0)
    return img_array

# Define image dimensions expected by the model
img_width, img_height = 224, 224

# Function to translate text
def translate_text(text_to_translate, target_language):
    # Define translation parameters
    params = {
        'api-version': '3.0',
        'from': 'en',
        'to': [target_language]
    }

    # Define request headers
    headers = {
        'Ocp-Apim-Subscription-Key': key,
        'Ocp-Apim-Subscription-Region': location,
        'Content-type': 'application/json',
        'X-ClientTraceId': str(uuid.uuid4())
    }

    # Define request body
    body = [{'text': text_to_translate}]

    # Make a request to the translation API
    translation_request = requests.post(constructed_url, params=params, headers=headers, json=body)
    translation_response = translation_request.json()

    translated_text = translation_response[0]['translations'][0]['text'] if translation_response else ''

    return translated_text

@app.route('/predict', methods=['POST'])
def predict():
    if request.method == 'POST':
        # Get the uploaded image file (corrected key: 'image')
        uploaded_file = request.files.get('image')
        if uploaded_file and uploaded_file.filename != '':
            # Read the uploaded image data
            image_data = uploaded_file.read()

            # Preprocess the image (assuming image data is binary)
            preprocessed_image = preprocess_image(image_data)

            # Make predictions
            predictions = model.predict(preprocessed_image)
            # ... rest of your prediction logic (unchanged)

            # Assuming predictions is a list of classes with corresponding probabilities
            print(predictions)
            pill_mapping = {
                0: 'Amoxicillin 500 MG',
                1: 'Aprepitant 80 MG',
                2: 'Ramipril 5 MG',
                3: 'Oseltamivir 45 MG',
                4: 'Mycophenolate mofetil 250 MG',
                5: 'Sitagliptin 50 MG',
                6: 'Duloxetine 30 MG',
                7: 'Calcitriol 00025 MG',
                8: 'Carvedilol 3.125 MG',
                9: 'Celecoxib 200 MG',
                10: 'Atomoxetine 25 MG',
                11: 'Benzonatate 100 MG',
                12: 'Montelukast 10 MG',
                13: 'Montelukast 10 MG',
                14: 'Tadalafil 5 MG',
                15: 'Saxagliptin 5 MG',
                16: 'Prasugrel 10 MG',
                17: 'Montelukast 10 MG',
                18: 'Apixaban 2.5 MG',
                19: 'Eltrombopag 25 MG',
                
                # Add more mappings as needed
            }

            predicted_index = np.argmax(predictions)
            predicted_pill = pill_mapping.get(predicted_index, 'Unknown')

            print("Predicted Pill:", predicted_pill)

            result = {
                'name': predicted_pill  # Replace with your class prediction
                # 'probability': '0.95'  # Replace with the probability
            }
            return jsonify(result)
        else:
            return jsonify({'error': 'No image uploaded'})

    return jsonify({'error': 'An error occurred'})  # Generic error message

@app.route('/translate', methods=['POST'])
def translate_breakdown():
    # Extract text to be translated from the request
    data = request.get_json()
    text_to_translate = data['text']
    target_language = data['to']

    # Translate each part separately
    translated_quick_summary = translate_text(text_to_translate['quickSummary'], target_language)
    translated_composition = translate_text(text_to_translate['composition'], target_language)
    translated_pill_uses = translate_text(text_to_translate['pillUses'], target_language)
    translated_side_effects = translate_text(text_to_translate['sideEffects'], target_language)

    # Return the translated breakdowns
    return jsonify({
        'quickSummary': translated_quick_summary,
        'composition': translated_composition,
        'pillUses': translated_pill_uses,
        'sideEffects': translated_side_effects
    })

if __name__ == '__main__':
    app.run(debug=True)
