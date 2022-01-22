from math import sin, cos, sqrt, atan2, radians 

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

from datetime import datetime, time
from django.utils import timezone
def available(begin_time, end_time, check_time=None):
    # If check time is not given, default to current UTC time
    if(begin_time and end_time):
            
        check_time = check_time or timezone.localtime(timezone.now()).time()
        begin_time = datetime.strptime(begin_time, '%H:%M:%S').time()
        end_time = datetime.strptime(end_time, '%H:%M:%S').time()
        print(begin_time, end_time, check_time)
        if begin_time < end_time:
            return check_time >= begin_time and check_time <= end_time
        else: # crosses midnight
            return check_time >= begin_time or check_time <= end_time
    return False
