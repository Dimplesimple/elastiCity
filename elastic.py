from elasticsearch import Elasticsearch
from elasticsearch import helpers
from datetime import datetime
import os

import shelve


def unselve_database(database):
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

class ES:

    def __init__(self):
        """ This method calls the required initiatlization for the
        index. Build the index, and does the bulk insert """

        # self.travel_dump = travel_dump
        self.i_travel = "i_travel"
        self.doc_type   = "travel"

        self.es = Elasticsearch()
        
        # Build the index, this module takes care of the pre-existing index
        # and only updates the mapping if index already exists
        # self.create_index()

        # Bulk insert. This uses, new helper bulk module, and thus does not
        # need to load in chunks. 
        # self.bulk_insert()
        
        
        # Search only for the location, can be city/province/country
        # result = self.search_location('timbuktu')
        # result = self.search_location_category('timbuktu', 'Eat')
        # print result


        # Search for the city and the category


    def create_index(self):
        """ This method creates the i_novels index with the custom json
        mapping """
        
        try:
            # self.es.delete(index=self.i_travel)
            self.es.indices.create(index=self.i_travel)#, body=self.get_schema())
            # Create the index. It throws the error if the index is already present, thus the try block
        except Exception as e:
            # This exception means index already exists, thus we should only
            # update the mappings instead of recreating the mappings
            print e # Error while creating index

    def format_action(self, id, value):
        """ This method returns the correct format for the bulk action """

        return {
                "_index" : self.i_travel,
                "_type"  : self.doc_type,
                "_id"    : id,
                "_source":value
                }

    def bulk_insert(self):
        count = 1
        for key, value in self.travel_dump.iteritems():
            try:
                self.es.index(index=self.i_travel, doc_type=self.doc_type, id=key.lower(), body=value)
            except Exception as e:
                print count, key, e
                count += 1 # Total count of records which could not be inserted due to mal-formed data

    def bulk_insert_using_helper(self, max_size):
        """ This module bulk inserts the given max_size number of records
        in the "i_travel" index """
        actions = []
        for key,value in self.travel_dump.iteritems():
            actions.append(self.format_action(key, value))

        # This method uses Helper bulk function, which uses Streaming bulk
        # and thus it does not require breaking up of bulk insert into 
        # sizeable chunks, and thus also does not require periodic refersh
        return helpers.bulk(self.es,actions, stats_only=True)

    def all_location_category(self):
        res = self.es.search(index=self.i_travel, body={"query": {"match_all": {}}})
        for hit in res['hits']['hits']:
            print hit['_id']

    def search_location(self, location):
        try:
            result = self.es.get(index=self.i_travel, doc_type=self.doc_type, id=location)
            source = result['_source']
            return source
        except:
            return None
        # res = self.es.search(index=self.i_travel, body={"query": {"match_all": {}}})
        # print type(res)
        # print res.keys()
        # print type(res['hits'])
        # print res['hits'].keys()
        # print type(res['hits']['hits'])
        # print len(res['hits']['hits'])
        # print type(res['hits']['hits'][0])
        # for k in res['hits']['hits']:
            # k = res['hits']['hits'][i]
            # print k['_id']
            # print k['_source']

        # print("Got %d Hits:" % res['hits']['total'])
        # for hit in res['hits']['hits']:
            # print("%(timestamp)s %(author)s: %(text)s" % hit["_source"])

    def search_location_category(self, location, category):
        try:
            source = self.search_location(location)
            return source[category]
        except:
            return None

    def Run_Elastic_Search():
        es = Elasticsearch()

        # doc = {
        #     'author': 'kimchy',
        #     'text': 'Elasticsearch: cool. bonsai cool.',
        #     'timestamp': datetime(2010, 10, 10, 10, 10, 10)
        # }
        doc = topic_list()
        # res = es.index(index="test-index-1", doc_type='travel', id=2, body=doc)
        # print(res['created'])
        return

        res = es.get(index="test-index-1", doc_type='travel', id=2)
        # print(res['_source'])

        es.indices.refresh(index="test-index-1")

        res = es.search(index="test-index-1", body={"query": {"match_all": {}}})
        # print("Got %d Hits:" % res['hits']['total'])
        # for hit in res['hits']['hits']:
            # print("%(timestamp)s %(author)s: %(text)s" % hit["_source"])


def topic_list():
    database = dict()
    unselve_database(database)
    topic_list = open('./topic_list.txt').read().splitlines()
    return database
    # print topic_list
    # print len(database.keys())
    # print database.keys()[:10]
    # city = 'Timbuktu'
    # print


if __name__ == "__main__":
    # Run_Elastic_Search()
    # e = ES(1000, topic_list())
    e = ES()
    print e.all_location_category()
    # print e.search_location_category('chile', 'Work')
    # topic_list()

