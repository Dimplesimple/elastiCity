import web
# from pprint import pprint
import pprint
import json
import urllib2
import pickle
import sys
import freebase_key_needed_final

# '/(.*)', 'index'
urls = (
        '/freebase', 'freebase'
        )

class freebase:
    def GET(self):
        variables = web.input(_method='get')
        location = variables['location']
        output = freebase_key_needed_final.main(location)
        return output.replace("'","")




if __name__ == "__main__":
    app = web.application(urls, globals())
    app.run()


