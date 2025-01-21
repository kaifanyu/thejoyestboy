from flask import Flask, request, jsonify
from flask_cors import CORS
import base64
import os
import json

app = Flask(__name__)

# If you only want to allow from a specific origin, keep as-is.
# If you want to allow multiple origins or local dev, you can do:
# CORS(app, resources={r"/*": {"origins": ["http://192.168.162.98:8001", "http://localhost:3000"]}})
CORS(app)

DATA_FILE = os.path.join(os.path.dirname(__file__), 'user_data.json')

# Helper function to ensure DATA_FILE exists & is valid JSON
def initialize_data_file():
    if not os.path.exists(DATA_FILE):
        # Create an empty JSON array file
        with open(DATA_FILE, 'w') as f:
            f.write('[]')
    else:
        # If file exists but is empty or invalid, rewrite as empty list
        try:
            with open(DATA_FILE, 'r') as f:
                json.load(f)  # just to verify validity
        except (json.JSONDecodeError, ValueError):
            with open(DATA_FILE, 'w') as f:
                f.write('[]')

# def read_dl():



@app.route('/submit-data', methods=['POST'])
def submit_data():
    """Endpoint that accepts JSON data and returns a base64-encoded image plus other info."""

    # 1. Validate JSON in request
    data = request.get_json(silent=True)
    if not data:
        return jsonify({"error": "Invalid or missing JSON payload"}), 400

    # Extract fields
    phone_number = data.get('phoneNumber')
    drivers_license = data.get('driversLicense')
    po_number = data.get('poNumber')
    volume = data.get('volume')
    trailerNumber = data.get('trailerNumber')
    
    # accountName = data.get('accountName')
    # Example logic: generate some results
    dock_number = "Dock-18"
    google_maps_link = "https://maps.app.goo.gl/zxV7mtxpV5D6DuEr8"

    # 2. Ensure user_data.json is ready to use
    initialize_data_file()

    # 3. Load existing data, append new record
    with open(DATA_FILE, 'r') as f:
        existing_data = json.load(f)

    existing_data.append({
        'phoneNumber': phone_number,
        'driversLicense': drivers_license,
        'poNumber': po_number,
        'volume': volume,
        'trailerNumber': trailerNumber
        # 'account_name': accountName,
    })

    with open(DATA_FILE, 'w') as f:
        json.dump(existing_data, f, indent=2)

    # 4. Safely open and encode dock18.png
    encoded_image = ""
    image_path = os.path.join(os.path.dirname(__file__), 'dock18.png')
    if os.path.exists(image_path):
        try:
            with open(image_path, 'rb') as image_file:
                encoded_image = base64.b64encode(image_file.read()).decode('utf-8')
        except Exception as e:
            print(f"Warning: Failed to read/encode {image_path}: {e}")
            # Proceed with an empty string or a placeholder image
    else:
        print(f"Warning: {image_path} not found. Returning empty 'image' field.")

    # 5. Return the response
    return jsonify({
        'image': encoded_image,
        'dockNumber': dock_number,
        'googleMapsLink': google_maps_link
    })


if __name__ == '__main__':
    # Listen on all interfaces so this is accessible on your network
    app.run(host='0.0.0.0', port=5000, debug=True)
