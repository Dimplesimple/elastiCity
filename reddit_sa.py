import web
# from pprint import pprint
import pprint
import json
import urllib2
import pickle
import sys


# '/(.*)', 'index'
urls = (
        '/reddit', 'reddit'
        )

class reddit:
    def GET(self):
        variables = web.input(_method='get')
        location = variables['location']
        output = reddit_data(location)
        return output.replace("'","")


def reddit_data(location):
    url ="http://www.reddit.com/search.json?q=" + location 
    search_result = json.loads(urllib2.urlopen(url).read())
    # pickle.dump(search_result, open('search_london', 'wb'))
    # search_result = pickle.load(open('search_london', 'rb'))
    data = []
    for elem in search_result['data']['children']:
        data.append('<blockquote class="twitter-tweet">' + elem['data']['title'] + '</blockquote>')

    return ' '.join(data).encode('utf-8')
    # return ' '.join(data)


if __name__ == "__main__":
    # app = web.application(urls, globals())
    # app.run()
    print reddit_data(sys.argv[1]).replace("'", "")


