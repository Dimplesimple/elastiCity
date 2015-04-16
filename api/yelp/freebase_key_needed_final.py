# -*- coding: utf-8 -*-
"""
Spyder Editor

This is a temporary script file.
"""

import json
import urllib

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
def get_freebase_info(city_name):
    '''
    this function is used to extract the exact info we want
    '''
    freebase_dic = {}
    city_data = get_city_attractions(city_name)
    freebase_dic['attractions'] = city_data['property']['/location/location/contains']
    freebase_dic['latitude'] = city_data['property']['/location/location/geolocation']['values'][0]['property']['/location/geocode/latitude']['values'][0]['value']
    freebase_dic['longitude'] = city_data['property']['/location/location/geolocation']['values'][0]['property']['/location/geocode/longitude']['values'][0]['value']
    return freebase_dic
    
if __name__ == '__main__':
    '''
    just call the function get_freebase_info(city_name) and input the city_name, here is the sample
    '''
    city_name = raw_input("Please input the city: ")
    print get_freebase_info(city_name)['attractions']
    print get_freebase_info(city_name)['latitude']
    print get_freebase_info(city_name)['longitude']