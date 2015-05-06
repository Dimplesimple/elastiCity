import os
import shelve
import sys


def unselve_database():
    """ This method looks for the shelve db object, and uses that 
    to retrieve the dictionary """
    db_file_name = 'wikitravel_country_city.db'
    if os.path.exists(db_file_name):
        db = shelve.open(db_file_name)
        try:
            # update method uses async update of the dictionary
            # and is very fast for bulk upload 
            database.update(db)
        finally:
            db.close() 
    else:
        raise Exception("The dictionary db file does not exist")

def search_city(city_name):
    if city_name in db_keys:
        return database[city_name]

def search_city_category(city_name, category):
    if city_name in db_keys:
        if category in database[city_name]:
            return database[city_name][category]


if __name__ == "__main__":
    database = dict()
    unselve_database()
    db_keys = database.keys()
    # example usage
    # print search_city_category('Sydney', 'See')
    print search_city_category(sys.argv[1], sys.argv[2])
