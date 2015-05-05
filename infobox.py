import web
import sys
import pprint
from wp_info import *
from wp_article import *

urls = (
        '/(.*)', 'index'
        )

class index:
    def GET(self, _):
        variables = web.input(_method='get')
        location = variables['location']
        output = infobox_data(location)
        return output

def infobox_data(location):
    result =  infobox(wp_article.dump(str(location)))
    datadic = {}
    for line in  result.split('\n'):
        if line[:2] == '{{':
            continue
        if line[:2] == '| ':
            vals = line[2:].split('=') 
            key = vals[0]
            value = ' '.join(vals[1:])
            value = value.translate(None, '{}[]#!()')
            datadic[key.strip(' ')] = value.strip(' ')
    data = []
    for key, value in datadic.iteritems():
        if key == 'titlestyle': continue
        if not value: continue

        data.append('<blockquote style="background-color: black; opacity: 0.7; color: white; text-align: left;"><h2>' +key + '</h2><br />' + value.replace('****','<br />') + '</blockquote>')
    # fix_encoding = lambda s: s.decode('utf8', 'ignore')
    return ' '.join(data)
    # return ' '.join(data).decode('utf-8', 'ignore')



if __name__ == "__main__":
    # app = web.application(urls, globals())
    # app.run()
    print infobox_data(sys.argv[1]).replace("'", "")

