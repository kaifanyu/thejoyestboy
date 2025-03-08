import requests

# Define API endpoint
url = "https://wise.logisticsteam.com/v2/valleyview/bam/window-checkin/entry-ticket/search"

# Headers for the request
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

# Function to look up an entry number
def lookup_entry(entry_number):
    payload = {
        "excludeStatuses": ["New"],
        "paging": {"pageNo": 1, "limit": 10},
        "carrierId": None,
        "fuzzyEntryId": entry_number
    }

    try:
        response = requests.post(url, headers=headers, json=payload)
        response.raise_for_status()  # Raises an error for HTTP errors
        return response.json()  # Return JSON response
    except requests.exceptions.RequestException as e:
        return {"error": str(e)}

# Example usage
entry_number = "ET-465628"
result = lookup_entry(entry_number)

# Print response
print(result)
