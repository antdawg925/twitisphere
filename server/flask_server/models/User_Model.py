
from flask_server.config.mysqlconnection import connectToMySQL
from flask import flash, session
from flask_server import app
from flask_bcrypt import Bcrypt
import re

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

    @classmethod
    def get_user(cls):
        query = "SELECT * FROM twitisphere_schema.user WHERE user.id=" + str(session['user_id']) + ";"  
        results = connectToMySQL(schema).query_db(query)
        if not results:
            return[]
        return results

    @classmethod
    def get_every_user(cls):
        query = "SELECT * FROM twitisphere_schema.user;" 
        results = connectToMySQL(schema).query_db(query)
        return results

