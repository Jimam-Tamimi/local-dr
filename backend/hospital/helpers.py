from math import sin, cos, sqrt, atan2, radians
from msilib import init_database

# approximate radius of earth in km

def distance(chords1:dict, chords2:dict):
    R = 6373.0
    
    lat1 = radians(chords1['lat'])
    lon1 = radians(chords1['lng'])
    lat2 = radians(chords2['lat'])
    lon2 = radians(chords2['lng']) 

    dlon = lon2 - lon1
    dlat = lat2 - lat1

    a = sin(dlat / 2)**2 + cos(lat1) * cos(lat2) * sin(dlon / 2)**2
    c = 2 * atan2(sqrt(a), sqrt(1 - a))

    distance = R * c
    return distance

# print(distance({'lat': 3, 'lng':3}, {'lat': 4, 'lng':3}))