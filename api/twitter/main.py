from flask import Flask
from tweet import Twitter
app = Flask(__name__, static_url_path='')

@app.route("/")
def root():
    return app.send_static_file('index.html')

@app.route("/twitter")
def twitter():
    x = Twitter("new york")
    return x.next()

if __name__ == "__main__":
    app.run()
