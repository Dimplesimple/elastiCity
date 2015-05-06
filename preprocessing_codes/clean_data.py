import re
import os
import shelve

database = dict()
db_file_name = 'wikitravel_country_city.db'

def fetch_wikitravel_data():
    """ fetches the data based on topics from the Wikitravel corpora """

    title = set()
    dirName = '/home/ap/wikidata'
    # dirName = '/home/ap/wikidata_small'
    for file in os.listdir(dirName):

        with open(dirName + "/" + file) as f:
            city_info = dict()
            topic = ''
            topic_data = []
            # by default the city name is the filename, which is mostly
            # correct, but I try to obtain it from the page also, which might fail sometime
            title = file
            for line in f:
                data = re.sub(r'\[.*?\]','', line)

                if data[:7] == "****** ": 
                    # html2text uses * conversion of the headers, which means H1 is generally *x7
                    title = data.strip('\n').strip('*').strip(' ')
                    continue
                if data[:6] == "***** ": 
                    # New topic starts, better save the data from the previous one
                    if topic:
                        city_info[topic] = ''.join(topic_data)

                    # clear the topic data collection list
                    topic_data = [] 
                    topic = data.strip('\n').strip('*').strip(' ')

                    continue
                topic_data.append(data)
            # add the city data to the database 
            database[title] = city_info


if __name__ == "__main__":
    fetch_wikitravel_data()
