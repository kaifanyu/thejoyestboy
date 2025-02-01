from flask import Flask, request, jsonify
from twilio.rest import Client
from flask_cors import CORS
import os
import json

app = Flask(__name__)
CORS(app)

USER_DATA_FILE = os.path.join(os.path.dirname(__file__), 'user_data.json')
CRED_FILE = os.path.join(os.path.dirname(__file__), 'cred.json')


def load_credentials(filepath):
    with open(filepath, "r") as file:
        return json.load(file)

# Load credentials
credentials = load_credentials("cred.json")

# Assign values to variables
ACCOUNT_SID = credentials.get("account_sid")
API_SID = credentials.get("api_sid")
API_SECRET = credentials.get("api_secret")
FROM_NUMBER = credentials.get("from_number")

# Initialize Twilio client
client = Client(API_SID, API_SECRET, ACCOUNT_SID)

def send_sms(to_number, message):
    try:
        # Send SMS
        message = client.messages.create(
            body=message,
            from_=FROM_NUMBER,
            to=to_number
        )
        print(f"Message sent successfully! SID")
    except Exception as e:
        print(f"Failed to send message: {e}")

account_to_checkin = {
    "Kings Hawaiian": "Check - in Window DK165",
    "Oversees Trading": "Check - in Window DK165",
    "Roar Beverages (Pick - Up)": "Check - in Window DK165",
    "Orgain": "Check - in Window DK165",
    "Bay 2": "Check - in Window DK165",
    "NZXT": "Check - in Window DK18 (LTL's)",
    "Boostev": "Check - in Window DK18 (LTL's)",
    "Elevate": "Check - in Window DK18 (LTL's)",
    "TCL": "Check - in Window DK18 (LTL's)",
    "TPV USA": "Check - in Window DK18 (LTL's)",
    "Simple modern": "Check - in Window DK18 (LTL's)",
    "Southern Wine": "Check - in Window DK18 (LTL's)",
    "DIVINELY NECTAR INC": "Check - in Window DK18 (LTL's)",
    "GIMME HEALTH FOODS, INC": "Check - in Window DK18 (LTL's)",
    "KACE TEA LLC": "Check - in Window DK18 (LTL's)",
    "Gurunanda": "Check - in Window DK 93 (NO LTL's, Send to DK 18)",
    "Karaka": "Check - in Window DK 93 (NO LTL's, Send to DK 18)",
    "Tytus": "Check - in Window DK 93 (NO LTL's, Send to DK 18)",
    "Academy UF": "Check - in Window DK 93 (NO LTL's, Send to DK 18)",
    "Roar Beverages (Delivery)": "Check - in Window DK 93 (NO LTL's, Send to DK 18)",
    "Razor": "Check - in Window DK 93 (NO LTL's, Send to DK 18)",
    "DPS": "Check - in Window DK 93 (NO LTL's, Send to DK 18)",
    "Preferred Brands": "Check - in Window DK 93 (NO LTL's, Send to DK 18)",
    "SG Footwear": "Check - in Window DK 93 (NO LTL's, Send to DK 18)",
    "Ascena": "Check - in Window DK 93 (NO LTL's, Send to DK 18)",
    "Crate & Barrel": "Check - in Window DK 93 (NO LTL's, Send to DK 18)",
    "Flag & Anthem (DEL Only)": "Check - in Window DK 93 (NO LTL's, Send to DK 18)",
    "NorthStar": "Check - in Window DK 93 (NO LTL's, Send to DK 18)",
    "Murrieta Rhino": "Check - in Window DK 93 (NO LTL's, Send to DK 18)",
    
    "Vita Coco": "Check - in Window DK 144",
    "Come Ready": "Check - in Window DK 144",
    "Ingredient Bothers": "Check - in Window DK 144",
    "BUDDHIST TZU CHI FOUNDATION": "Check - in Window DK 144",
    "MAMMA CHIA": "Check - in Window DK 144",
    "TAWA SERVICES INC": "Check - in Window DK 144",
    "UNICHEM ENTERPRISE": "Check - in Window DK 144",
    "WALONG MARKET INC": "Check - in Window DK 144",
    "Sans": "Check - in Window DK 144"
}


# Load user data
def load_user_data():
    with open("user_data.json", "r") as file:
        return json.load(file)

# Helper function to ensure USER_DATA_FILE exists & is valid JSON
def initialize_data_file():
    if not os.path.exists(USER_DATA_FILE):
        # Create an empty JSON array file
        with open(USER_DATA_FILE, 'w') as f:
            f.write('[]')
    else:
        # If file exists but is empty or invalid, rewrite as empty list
        try:
            with open(USER_DATA_FILE, 'r') as f:
                json.load(f)  # just to verify validity
        except (json.JSONDecodeError, ValueError):
            with open(USER_DATA_FILE, 'w') as f:
                f.write('[]')



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
    trailerNumber = data.get('trailerNumber')
    
    # 2. Ensure user_data.json is ready to use
    initialize_data_file()

    # 3. Load existing data, append new record
    with open(USER_DATA_FILE, 'r') as f:
        existing_data = json.load(f)

    existing_data.append({
        'phoneNumber': phone_number,
        'driversLicense': drivers_license,
        'poNumber': po_number,
        'trailerNumber': trailerNumber
    })

    with open(USER_DATA_FILE, 'w') as f:
        json.dump(existing_data, f, indent=2)

    # 5. Return the response
    return jsonify("200 OK")


@app.route("/search", methods=["POST"])
def search():
    data = request.get_json()

    if not data:
        return jsonify({"error": "Invalid request, no data received"}), 400

    print("Received data:", data)

    # Extract search parameters
    query_type, query_value = list(data.items())[0]

    # Load user data from JSON
    user_data = load_user_data()

    print("THIS: ", query_type, "ths: ", query_value)
    # Filter users based on search query
    results = [
        user for user in user_data 
        if str(user.get(query_type, "")).lower() == str(query_value).lower()
    ]

    if results:
        return jsonify(results)
    else:
        return jsonify([])

@app.route('/yms', methods=['POST'])
def yms():
    try:
        # Parse JSON data from request
        data = request.json
    
        phone_number = data.get('phoneNumber')
        drivers_license = data.get('driversLicense')
        po_number = data.get('poNumber')
        trailerNumber = data.get('trailerNumber')
        message = f"You have been checked in. You are live-loading from Walmart. Please go to Dock 18. The process will take approximately 2 hours." 

        send_sms(phone_number, message)
        # Return a success response
        return jsonify({"message": "Check-in successful!"}), 200

    except Exception as e:
        print("❌ Error processing request:", str(e))
        return jsonify({"error": "Failed to process request"}), 500

if __name__ == '__main__':
    # Listen on all interfaces so this is accessible on your network
    app.run(host='0.0.0.0', port=5000, debug=True)
