import os
from pymongo import MongoClient
from pymongo.server_api import ServerApi
from bson.objectid import ObjectId


class LiveCrud:

    client = MongoClient('mongoipaddress',  27017, username="mongo user", password="lol")

    newdb = client["Cisco_Live"]
    #collection = newdb['table']

    def get(self, table):

        collection = self.newdb[table]
        queryInfo = []

        for query in collection.find({}):
            query['_id'] = str(query['_id'])
            query['id'] = query['_id']
            del query['_id']
            queryInfo.append(query)

        return queryInfo

    def get_by_id(self, id, table):

        collection = self.newdb[table]
        try:
            query = collection.find_one({'_id': ObjectId(id)})
            query['id'] = str(query['_id'])
            del query['_id']

            return query

        except:

            return {'status': 'not found'}

    def create(self, data, table):

        collection = self.newdb[table]
        insert = collection.insert_one(data)
        return collection.find_one({'_id': insert.inserted_id})

    def update(self, id, data, table):

        collection = self.newdb[table]

        try:

            #collection.find_one_and_update({'_id': id}, {'$set': data})
            #updt = collection.find_one({'_id': ObjectId(id)})
            #updt['id'] = str(updt['_id'])
            #del updt['_id']

            return collection.find_one_and_update({'_id': ObjectId(id)}, {'$set': data})
            #return updt

        except:

            return {'status': 'not found'}

    def delete(self, id, table):

        collection = self.newdb[table]
        remove = collection.find_one({'_id': ObjectId(id)})

        if remove is not None:

            collection.delete_one({'_id': ObjectId(id)})

            return {'status': 'deleted'}

        else:

            return {'status': 'not found'}
