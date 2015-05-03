from tweepy import Stream
from tweepy import OAuthHandler
from tweepy.streaming import StreamListener

class listener(StreamListener):
        def on_data(self, data):
            self.result = data
            return False

        def on_error(self, status):
            print status

class Twitter:
    ckey = 'jtlS31wC95Xli3CZMO4OidTH1'
    csecret = 'iCy6evhz0lGnOjNMCTnkxN5y9Cuh86ndyGpkIAX23HPIFCEdr3'
    atoken = '74636828-qW06kurl1F2AtM2x23izzSCWWNUggpWkzjA2aqeJP'
    asecret = 'zsZR0CiT8PWkhOdSrXaVDRSVOWo4JuxOhjOmL2IkFz36o'
    auth = OAuthHandler(ckey, csecret)
    auth.set_access_token(atoken, asecret)
    listener = listener()
    twitterStream = Stream(auth, listener)

    def __init__(self, city):
        self.city = city

    def __iter__(self):
        return self

    def next(self):
        self.twitterStream.filter(track=[self.city])
        return self.listener.result


    
   



