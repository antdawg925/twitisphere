from flask_server.config.mysqlconnection import connectToMySQL
from flask import session

schema = "twitisphere_schema"
class Follow:
    def __init__( self , data ):
        self.id = data['id']
        self.follower_user_id = data['follower_user_id']
        self.following_id = data['following_id']
        self.created_at = data['created_at']
        self.updated_at = data['updated_at']

# FOLLOW A USER
    @classmethod
    def follow(cls, data):
        query = "INSERT INTO twitisphere_schema.follows (follower_user_id, following_id) " \
        "VALUES (" + str(session["user_id"]) + ", %(following_id)s );"
        result = connectToMySQL(schema).query_db(query,data)
        return result

#  GET FOLLOWING
    @classmethod
    def get_following(cls):
        query = "SELECT * FROM twitisphere_schema.follows LEFT JOIN twitisphere_schema.user on following_id=user.id " \
            " WHERE follower_user_id="+ str(session['user_id']) + ";" 
        results = connectToMySQL(schema).query_db(query)
        return results

#   GET FOLLOWER
    @classmethod
    def get_followers(cls):
        query = "SELECT * FROM twitisphere_schema.follows LEFT JOIN twitisphere_schema.user on follower_user_id=user.id " \
            " WHERE following_id="+ str(session['user_id']) + ";" 
        results = connectToMySQL(schema).query_db(query)
        return results

#  CHECK IF FOLLOWING
    @classmethod
    def check_following(cls,data):
        query = "SELECT follower_user_id FROM follows WHERE following_id=%(id)s;" 
        results = connectToMySQL(schema).query_db(query,data)
        return results
