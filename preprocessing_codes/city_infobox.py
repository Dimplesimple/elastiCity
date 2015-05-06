# test of the data for a single city, only infobox
import re 
import json
import pickle
import sys
from wikitools import *

# ***************** NOTE ****************************************
# Change the following parameter to 1 if you want to run the 
# fetching of wikipedia articles, it might take couple of minutes
download_new_data = 1
# *************************

        
def get_infobox(title):
    """ returns the infobox for the given page, if exists """
    wikiobj = wiki.Wiki("http://en.wikipedia.org/w/api.php")
    params_infobox = {'action':'query', 'prop':'revisions', 'rvprop':'content', 'rvsection':'0', 'continue':'', 'titles':title}
    result = api.APIRequest(wikiobj, params_infobox).query()['query']['pages']
    rv = result[result.keys()[0]]['revisions']
    print rv[0]['*']




# This will call the entry point of the file
if __name__ == "__main__":
    get_infobox(sys.argv[1])

