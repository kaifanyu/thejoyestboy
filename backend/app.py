from flask import Flask, request, jsonify
from twilio.rest import Client
from flask_cors import CORS
import os
import json
import requests

app = Flask(__name__)
CORS(app)

USER_DATA_FILE = os.path.join(os.path.dirname(__file__), 'user_data.json')
CRED_FILE = os.path.join(os.path.dirname(__file__), 'cred.json')


def load_credentials(filepath):
    with open(filepath, "r") as file:
        return json.load(file)

# Load credentials
credentials = load_credentials("cred.json")
wms_url = "http://10.10.202.29:6969/dock"

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

        phone_number = data.get('phoneNumber', 'N/A')
        drivers_license = data.get('driversLicense', 'N/A')
        po_number = data.get('poNumber', 'N/A')
        trailer_number = data.get('trailerNumber', 'N/A')

        print(f"Received Data - Phone: {phone_number}, License: {drivers_license}, PO#: {po_number}, Trailer#: {trailer_number}")

        # Fetch all dock information
        output = wms(po_number, trailer_number)
        
        if not output:
            print("Error: No data received from WMS")
            return jsonify({"error": "Failed to fetch dock data"}), 500

        # Extract dock status and load info safely
        dock_status = output.get("dock_status", {})
        load_info = output.get("load_info", {})

        assisting_name = dock_status["assisting_personnel"]["name"]

        # Print retrieved dock status and load info
        print(f"Dock Status: {dock_status}")
        print(f"Load Info: {load_info}")

        live_load = load_info["live_load"]
        delivery = load_info["delivery"]
        pick_up = load_info["pick_up"]

        response_data = {
            "dock_status": dock_status,
            "load_info": load_info,
            "additional_info": {
                "po_num": po_number,
                "trailer_num": trailer_number,
                "phone_number": phone_number,
                "drivers_license": drivers_license,
            }
        }

        

        # Generate a message based on availability
        available_now = dock_status.get("available_now", False)
        dock_number = dock_status.get("dock_num", "Unknown")
        wait_time = dock_status.get("estimated_wait_time", "Unknown")
        duration = dock_status.get("estimated_duration", "unknown")


        message = "You have been checked in. \n"

        if live_load:
            if available_now:
                message += f"Please go to Dock {dock_number}. {assisting_name} will be assisting you.\nEstimated time: {wait_time} minutes. \nEstimated duration: {duration} minutes.\n"
            else:
                message += f"Error processing. No dock is currently available. It will be avaliable in {wait_time} minues\n"
        
        if delivery:
            message += f"Please deliver to parking spot 23.\n"
             
        if pick_up:
            message += f"Please pick up container: BSXH23429423. It is located in Zone 4.\n"

        print(f"Generated Message: {message}")

        # Optionally, send SMS notification
        send_sms(phone_number, message)

        # Return full response data
        return jsonify({
            "message": message,
            "data": response_data
        }), 200

    except Exception as e:
        print(f"Exception occurred: {e}")
        return jsonify({"error": str(e)}), 500


def wms(po_number, trailer_number):
    try:
        params = {
            "po_num": po_number,
            "trailer_num": trailer_number
        }
        print(f"Fetching WMS data with params: {params}")

        # Make the GET request
        response = requests.get(wms_url, params=params)
        
        # Check if the request was successful
        if response.status_code == 200:
            data = response.json()
            print("Received WMS Data:", data)
            return data  # Return full data instead of just dock_status
        else:
            print(f"Error: Received status code {response.status_code}, Response: {response.text}")
            return None  # Return None on failure

    except requests.exceptions.RequestException as e:
        print(f"Request failed: {e}")
        return None  # Return None if an exception occurs

if __name__ == '__main__':
    # Listen on all interfaces so this is accessible on your network
    app.run(host='0.0.0.0', port=5000, debug=True)
