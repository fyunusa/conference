import json
import requests

# Function to get the latitude and longitude of an address using MapQuest API
def get_geocode(address):
    api_key = 'kJWAsPGVWtqTOYwjFVtSrzyKD0RQpZW5'
    url = f'http://www.mapquestapi.com/geocoding/v1/address?key={api_key}&location={address}'

    try:
        response = requests.get(url)
        data = response.json()
        if data['results']:
            location = data['results'][0]['locations'][0]['latLng']
            return {'lat': location['lat'], 'lon': location['lng']}
        else:
            raise Exception('Address not found.')
    except Exception as error:
        print(error)
        raise error

# Load JSON data from file
with open('conference.json', 'r') as file:
    conference_data = json.load(file)

conferences = conference_data['conferences']

# Loop through conferences and add lat and lon
for conference in conferences:
    if 'lat' not in conference:
        address = conference['address']
        geocode = get_geocode(address)
        conference['lat'] = geocode['lat']
        conference['lon'] = geocode['lon']

# Save updated JSON data back to file
with open('conference.json', 'w') as file:
    json.dump(conference_data, file, indent=4)

print("Latitude and longitude added to conference records.")
