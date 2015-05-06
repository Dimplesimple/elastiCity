# Project       : Elasticity

# This module process the CIA World Factbook data, to get Wikipedia like Infobox
# Since these are richer, guranteed for every country and surprisingly always
# in same format

from subprocess import call
from os import listdir, popen

def filter_country_data():
    """ From the CIA Country Fact book filters the requires information, currently it 
    gets the country name, Background info (a short paragraph), Geogaphy, People and Society """
    files =  filter(lambda f: len(f)==7 and f.endswith('.html'), listdir("."))
    for file in files:
        page_content = popen("html2text -style pretty -width 350 "+ file).read()
        search_pattern , data_end_pattern = 'Introduction_::', 'Government_::'
        # To add more categories, see the CIA World Factbook website for the list of Categories
        search_pattern_index = page_content.find(search_pattern)
        country_name = page_content[search_pattern_index+len(search_pattern): page_content.find('\n', search_pattern_index+ len(search_pattern))]
        data = page_content[search_pattern_index+len(search_pattern): page_content.find(data_end_pattern)]
        with open(file + '.txt', 'w') as f:
            f.write(data)

filter_country_data()
