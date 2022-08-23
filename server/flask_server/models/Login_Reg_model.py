from flask_server.config.mysqlconnection import connectToMySQL
from flask_server import app
from flask_bcrypt import Bcrypt
import re

bcrypt = Bcrypt(app)
EMAIL_REGEX = re.compile(r'^[a-zA-Z0-9.+_-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]+$') 
schema = "twitisphere_schema"

class Log_Reg:
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

# SAVE USER
    @classmethod
    def save(cls, data):
        query = "INSERT INTO user ( first_name, last_name, user_name, email, password) " \
        "VALUES (%(first_name)s , %(last_name)s , %(user_name)s, %(email)s , %(password)s );"
        result = connectToMySQL(schema).query_db(query,data)
        return result

# CHECK IF EMAIL IS USED
    @classmethod
    def check_email(cls,data):
        query = "SELECT email FROM user WHERE email=%(email)s;" 
        results = connectToMySQL(schema).query_db(query,data)
        print("%%%% check if email exists -- ", results)
        return results

# CHECK IF USERNAME IS USED
    @classmethod
    def check_user_name(cls,data):
        query = "SELECT user_name FROM user WHERE user_name=%(user_name)s;" 
        results = connectToMySQL(schema).query_db(query,data)
        print("%%%% check if userName exists -- ", results)
        return results

# GET USER BY EMAIL
    @classmethod
    def get_by_email(cls,data):
        query = "SELECT * FROM user WHERE email = %(email)s;"
        result = connectToMySQL(schema).query_db(query,data)
        return result

# VALIDATE LOGIN INFO
    @staticmethod
    def validate_login( user ):
        print('validating login info')
        is_valid = True
        if not EMAIL_REGEX.match(user['email']): 
            is_valid = False
        return is_valid




