
from flask_server.config.mysqlconnection import connectToMySQL
from flask import flash, session
from flask_server.models import User_Model

schema = "twitisphere_schema"
class Post:
    def __init__( self , data ):
        self.id = data['id']
        self.post = data['post']
        self.created_at = data['created_at']
        self.updated_at = data['updated_at']
        self.user_id = data['user_id']

    @classmethod
    def save(cls, data):
        print("save post model")
        query = "INSERT INTO post ( post, user_id ) VALUES (%(post)s, %(user_id)s);"
        result = connectToMySQL(schema).query_db(query,data)
        return result

    @classmethod
    def get_following_posts(cls):
        query = "SELECT * FROM twitisphere_schema.post LEFT JOIN follows ON following_id=user_id LEFT JOIN user ON  following_id = user.id where follower_user_id= " + str(session['user_id']) + ";"
        results = connectToMySQL(schema).query_db(query)
        print(results,"******************")
        return results
        
    @classmethod
    def get_users_posts(cls):
        query = "SELECT * FROM twitisphere_schema.post where user_id= " + str(session['user_id']) + ";" 
        results = connectToMySQL(schema).query_db(query)
        return results
