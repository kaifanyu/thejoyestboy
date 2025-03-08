import requests

# Define API endpoint
url = "https://wise.logisticsteam.com/v2/valleyview/bam/window-checkin/entry-ticket/search"

# Headers for authentication and request settings
headers = {
    "Authorization": "37ed4eef-5722-4ea6-b711-ee3642ec47d6",
    "Accept-Language": "en-US,en;q=0.9",
    "Sec-Ch-Ua-Platform": "\"Windows\"",
    "Sec-Ch-Ua": "\"Chromium\";v=\"133\", \"Not(A:Brand\";v=\"99\"",
    "Screen": "wms.windowCheckin.newEntry.entryList",
    "Wise-Company-Id": "ORG-1",
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/133.0.0.0 Safari/537.36",
    "Accept": "application/json, text/plain, */*",
    "Content-Type": "application/json;charset=UTF-8",
    "Wise-Facility-Id": "F1",
    "X-Channel": "WEB",
    "Origin": "https://wise.logisticsteam.com",
    "Sec-Fetch-Site": "same-origin",
    "Sec-Fetch-Mode": "cors",
    "Sec-Fetch-Dest": "empty",
    "Referer": "https://wise.logisticsteam.com/v2/",
    "Accept-Encoding": "gzip, deflate, br",
}

# Minimal test payload (empty but valid format)
test_payload = {}

# Send a POST request to test write access
try:
    response = requests.post(url, headers=headers, json=test_payload)
    response.raise_for_status()  # Will raise an error for 4xx and 5xx responses

    # Print response status
    print(f"Status Code: {response.status_code}")
    print("Response:", response.json())

except requests.exceptions.HTTPError as errh:
    print(f"HTTP Error: {errh}")
except requests.exceptions.ConnectionError as errc:
    print(f"Error Connecting: {errc}")
except requests.exceptions.Timeout as errt:
    print(f"Timeout Error: {errt}")
except requests.exceptions.RequestException as err:
    print(f"Request Exception: {err}")
