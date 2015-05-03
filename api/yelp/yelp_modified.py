# -*- coding: utf-8 -*-
"""
Yelp API v2.0 code sample.
This program demonstrates the capability of the Yelp API version 2.0
by using the Search API to query for businesses by a search term and location,
and the Business API to query additional information about the top result
from the search query.
Please refer to http://www.yelp.com/developers/documentation for the API documentation.
This program requires the Python oauth2 library, which you can install via:
`pip install -r requirements.txt`.
Sample usage of the program:
`python sample.py --term="bars" --location="San Francisco, CA"`
"""
import argparse
import json
import pprint
import sys
import urllib
import urllib2

import oauth2

class AuthoriYelp:
    API_HOST = 'api.yelp.com'
    SEARCH_LIMIT = 10
    SEARCH_PATH = '/v2/search/'
    BUSINESS_PATH = '/v2/business/'
    
    # OAuth credential placeholders that must be filled in by users.
    
    CONSUMER_KEY = 'uUaaBFCf-6yMx0HuinrURA'
    CONSUMER_SECRET = '6axQlVcKxTq960lhBLqVCTAdBaA'
    TOKEN = 'VD4HSBcLaZtsDtnKKf1uPHwJv-sXQyfi'
    TOKEN_SECRET = '9GAXHsrWewuAb0v6r8d9PCWuweo'


def request(host, path, url_params=None):
    """Prepares OAuth authentication and sends the request to the API.
    Args:
        host (str): The domain host of the API.
        path (str): The path of the API after the domain.
        url_params (dict): An optional set of query parameters in the request.
    Returns:
        dict: The JSON response from the request.
    Raises:
        urllib2.HTTPError: An error occurs from the HTTP request.
    """
    url_params = url_params or {}
    url = 'http://{0}{1}?'.format(host, urllib.quote(path.encode('utf8')))
    
    consumer = oauth2.Consumer(AuthoriYelp.CONSUMER_KEY, AuthoriYelp.CONSUMER_SECRET)
    oauth_request = oauth2.Request(method="GET", url=url, parameters=url_params)

    oauth_request.update(
        {
            'oauth_nonce': oauth2.generate_nonce(),
            'oauth_timestamp': oauth2.generate_timestamp(),
            'oauth_token': AuthoriYelp.TOKEN,
            'oauth_consumer_key': AuthoriYelp.CONSUMER_KEY
        }
    )
    token = oauth2.Token(AuthoriYelp.TOKEN, AuthoriYelp.TOKEN_SECRET)
    oauth_request.sign_request(oauth2.SignatureMethod_HMAC_SHA1(), consumer, token)
    signed_url = oauth_request.to_url()
    
    #print u'Querying {0} ...'.format(url)

    conn = urllib2.urlopen(signed_url, None)
    try:
        response = json.loads(conn.read()) # data is saved as json here
    finally:
        conn.close()

    return response

def search(term, location):
    """Query the Search API by a search term and location.
    Args:
        term (str): The search term passed to the API.
        location (str): The search location passed to the API.
    Returns:
        dict: The JSON response from the request.
    """
    
    url_params = {
        'term': term.replace(' ', '+'),
        'location': location.replace(' ', '+'),
        'limit': AuthoriYelp.SEARCH_LIMIT
    }

    return request(AuthoriYelp.API_HOST, AuthoriYelp.SEARCH_PATH, url_params=url_params)

def get_business(business_id):
    """Query the Business API by a business ID.
    Args:
        business_id (str): The ID of the business to query.
    Returns:
        dict: The JSON response from the request.
    """
    business_path = AuthoriYelp.BUSINESS_PATH + business_id

    return request(AuthoriYelp.API_HOST, business_path)

def query_api(term, location):
    """Queries the API by the input values from the user.
    Args:
        term (str): The search term to query.
        location (str): The location of the business to query.
    """
    response = search(term, location)

    businesses = response.get('businesses')

    if not businesses:
        print u'No businesses for {0} in {1} found.'.format(term, location)
        return
    else:
        return businesses

    

def yelp_main(DEFAULT_LOCATION,DEFAULT_TERM):
    parser = argparse.ArgumentParser()

    parser.add_argument('-q', '--term', dest='term', default=DEFAULT_TERM, type=str, help='Search term (default: %(default)s)')
    parser.add_argument('-l', '--location', dest='location', default=DEFAULT_LOCATION, type=str, help='Search location (default: %(default)s)')

    input_values = parser.parse_args()
    #print "here is the input values: %s" % input_values

    try:
        result = query_api(input_values.term, input_values.location)
    except urllib2.HTTPError as error:
        sys.exit('Encountered HTTP error {0}. Abort program.'.format(error.code))
    
    return result

if __name__ == '__main__':

    DEFAULT_LOCATION = raw_input("Please input the city: ")
    DEFAULT_TERM = raw_input("Please input your food type: ")
    
    # This is the function call, yelp_main(para1,para2)  para1 is the location and para2 is the food type, if food type is not provided, just empty string
    # data is saved as Json type
    businesses = yelp_main(DEFAULT_LOCATION,DEFAULT_TERM)
    
    # No need to read the following code, just for check purpus
    
    print u'{0} businesses found'.format(len(businesses))
    
    for num in range(0,len(businesses)):
    
        business_id = businesses[num]['id']
        response = get_business(business_id)

        print u'Result for business "{0}" found and the rank is {1}'.format(business_id,num+1)
    
        pprint.pprint(response, indent=2)
        
        print "Here is the block ++++++++++++++++++++++++++++++++++ \n\n\n"
