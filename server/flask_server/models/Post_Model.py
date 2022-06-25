# \\\\\\<$A$>///////\\\\\\<$A$>///////  _________  IMPORTS  _____________ \\\\\\<$A$>///////\\\\\\<$A$>///////
#                                   -----------------------------------------
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

# ZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZ


# XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
#                                         SAVE POST
# ______________________________________________________________________________________________________
    @classmethod
    def save(cls, data):
        query = "INSERT INTO post ( post, user_id ) VALUES (%(post)s, %(user_id)s);"
        result = connectToMySQL(schema).query_db(query,data)
        return result
# ZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZ


# XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
#                                       ADD POINT TO POST 
# ______________________________________________________________________________________________________
    @classmethod
    def add_point(cls, data):
        query = "INSERT INTO twitisphere_schema.point (post_id, user_id) VALUES (%(post_id)s, %(user_id)s);"
        result = connectToMySQL(schema).query_db(query,data)
        return result
# ZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZ


# XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
#                                         GET EVERY POSTS
# ______________________________________________________________________________________________________
    @classmethod
    def get_every_post(cls):
        query = "SELECT * FROM twitisphere_schema.post LEFT JOIN point ON point.user_id LEFT JOIN user ON post.user_id = user.id;" 
        results = connectToMySQL(schema).query_db(query)
        return results
# ZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZ


# XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
#                                        GET USERS POSTS 
# ______________________________________________________________________________________________________
    @classmethod
    def get_users_posts(cls):
        query = "SELECT * FROM twitisphere_schema.post where user_id= " + str(session['user_id']) + ";" 
        results = connectToMySQL(schema).query_db(query)
        return results
# ZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZ

