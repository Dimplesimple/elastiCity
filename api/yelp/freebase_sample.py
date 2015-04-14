# -*- coding: utf-8 -*-
"""
Created on Mon Apr 13 21:49:07 2015

@author: ZY
"""

import json
import urllib
import pprint

goal ='https://www.googleapis.com/freebase/v1/topic/en/london?filter=%2Flocation/'

api_key = 'AIzaSyBVurMCQaHBP4Y9UBqXnjrhbLOZiLigltc'
service_url = 'https://www.googleapis.com/freebase/v1/topic/en'
topic_id = '/london'
params = {
  'key': api_key,
  'filter': '/location'
}
url = service_url + topic_id + '?' + urllib.urlencode(params)
print url
topic = json.loads(urllib.urlopen(url).read())
pprint.pprint(topic)
'''
for propert in topic['property']:
  print propert + ':'
  for value in topic['property'][propert]['values']:
    print ' - ' + value['text']
'''
    
    