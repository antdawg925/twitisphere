# \\\\\\<$A$>///////\\\\\\<$A$>///////  _________  IMPORTS  _____________ \\\\\\<$A$>///////\\\\\\<$A$>///////
#                                   -----------------------------------------
from flask_server.config.mysqlconnection import connectToMySQL
from flask import flash, session
from flask_server import app
from flask_bcrypt import Bcrypt
import re

bcrypt = Bcrypt(app)
EMAIL_REGEX = re.compile(r'^[a-zA-Z0-9.+_-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]+$') 
schema = "twitisphere_schema"

class User:
    def __init__( self , data ):
        self.id = data['id']
        self.first_name = data['first_name']
        self.last_name = data['last_name']
        self.user_name = data['user_name']
        self.email = data['email']
        self.password = data['password']
        self.bio = data['bio']
        self.location = data['location']
        self.image = data['image']
        self.bd = data['bd']
        self.created_at = data['created_at']
        self.updated_at = data['updated_at']


# XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
#                                        GET USER 
# ______________________________________________________________________________________________________
    @classmethod
    def get_user(cls):
        query = "SELECT * FROM twitisphere_schema.user WHERE user.id=" + str(session['user_id']) + ";"  
        results = connectToMySQL(schema).query_db(query)
        if not results:
            return[]
        return results
# ZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZ


# XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
#                                        FOLLOW A USER
# ______________________________________________________________________________________________________
    @classmethod
    def follow(cls, data):
        query = "INSERT INTO twitisphere_schema.follows (follower_user_id, following_id) " \
        "VALUES (" + str(session["user_id"]) + ", %(following_id)s );"
        result = connectToMySQL(schema).query_db(query,data)
        return result
# ZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZ


# XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
#                                     GET EVERY USER
# ______________________________________________________________________________________________________
    @classmethod
    def get_every_user(cls):
        query = "SELECT * FROM twitisphere_schema.user;" 
        results = connectToMySQL(schema).query_db(query)
        return results
# ZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZ


# XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
#                                     GET FOLLOWING
# ______________________________________________________________________________________________________
    @classmethod
    def get_following(cls):
        query = "SELECT * FROM twitisphere_schema.follows LEFT JOIN twitisphere_schema.user on following_id=user.id " \
            " WHERE follower_user_id="+ str(session['user_id']) + ";" 
        results = connectToMySQL(schema).query_db(query)
        return results
# ZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZ


# XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
#                                     GET FOLLOWER
# ______________________________________________________________________________________________________
    @classmethod
    def get_followers(cls):
        query = "SELECT * FROM twitisphere_schema.follows LEFT JOIN twitisphere_schema.user on following_id=user.id " \
            " WHERE following_id="+ str(session['user_id']) + ";" 
        results = connectToMySQL(schema).query_db(query)
        return results
# ZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZ




