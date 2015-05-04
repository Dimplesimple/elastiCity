import web
import sys
from elastic import ES
# from pprint import pprint
import pprint

urls = (
        '/(.*)', 'index'
        )

class index:
    def GET(self, _):
        variables = web.input(_method='get')
        location = variables['location']
        category = variables['category']
        if not category:
            result = ES().search_location(location)
        else:
            result = ES().search_location_category(location, category)

        return result

def wiki_data(location):
    result = ES().search_location(location)
    data = []
    for key, value in result.iteritems():
        data.append('<blockquote class="twitter-tweet"><h2>' +key + '</h2><br />' + value.replace('****','<br />') + '</blockquote>')
    return ' '.join(data).encode('utf-8')
        



if __name__ == "__main__":
    # app = web.application(urls, globals())
    # app.run()
    print wiki_data(sys.argv[1]).replace("'", "")

