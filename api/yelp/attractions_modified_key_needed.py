# -*- coding: utf-8 -*-
"""
Spyder Editor

This is a temporary script file.
"""

import json
import urllib
import pprint

class FREEBASE_KEY():
    '''
    please input the api_key here
    '''
    api_key = '1111'

def get_city_id(city_name):
    query = city_name
    service_url = 'https://www.googleapis.com/freebase/v1/search'
    params = {
            'query': query,
            'key': FREEBASE_KEY.api_key,
    }
    url = service_url + '?' + urllib.urlencode(params)
    response = json.loads(urllib.urlopen(url).read())
    return response['result'][0]['id'] 
    """
    This function query the freebase and get the topic id of input city
    """
def get_city_attractions(city_name):
    topic_id = get_city_id(city_name)
    service_url = 'https://www.googleapis.com/freebase/v1/topic'
    params = {
      'filter': '/location/location',
      'key': FREEBASE_KEY.api_key,
    }
    url = service_url + topic_id + '?' + urllib.urlencode(params)
    topic = json.loads(urllib.urlopen(url).read())
    return topic
    """
    Notic:
    Eden, please note that if you need the attractions, call: get_city_attractions(topic_id)['property']['/location/location/contains']
    geo info call: get_city_attractions(topic_id)['/location/location/geolocation']
    """
if __name__ == '__main__':
    '''
    just call the function get_city_attractions() and input the city_name
    '''
    city_name = raw_input("Please input the city: ")

    pprint.pprint(get_city_attractions(city_name))
    pprint.pprint(get_city_attractions(city_name)['property']['/location/location/contains'])
    pprint.pprint(get_city_attractions(city_name)['property']['/location/location/geolocation'])
