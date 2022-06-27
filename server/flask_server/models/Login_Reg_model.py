# \\\\\\<$A$>///////\\\\\\<$A$>///////  _________  IMPORTS  _____________ \\\\\\<$A$>///////\\\\\\<$A$>///////
#                                   -----------------------------------------
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

# XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
#                                         SAVE USER
# ______________________________________________________________________________________________________
    @classmethod
    def save(cls, data):
        query = "INSERT INTO user ( first_name, last_name, user_name, email, password) " \
        "VALUES (%(first_name)s , %(last_name)s , %(user_name)s, %(email)s , %(password)s );"
        result = connectToMySQL(schema).query_db(query,data)
        return result
# ZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZ


# XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
#                                    CHECK IF EMAIL IS USED
# ______________________________________________________________________________________________________
    @classmethod
    def check_email(cls,data):
        query = "SELECT email FROM user WHERE email=%(email)s;" 
        results = connectToMySQL(schema).query_db(query,data)
        print("%%%% check if email exists -- ", results)
        return results
# ZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZ

 
# XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
#                                    CHECK IF USERNAME IS USED
# ______________________________________________________________________________________________________
    @classmethod
    def check_user_name(cls,data):
        query = "SELECT user_name FROM user WHERE user_name=%(user_name)s;" 
        results = connectToMySQL(schema).query_db(query,data)
        print("%%%% check if userName exists -- ", results)
        return results
# ZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZ


# XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
#                                        GET USER BY EMAIL
# ______________________________________________________________________________________________________    
    @classmethod
    def get_by_email(cls,data):
        query = "SELECT * FROM user WHERE email = %(email)s;"
        result = connectToMySQL(schema).query_db(query,data)
        return result
# ZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZ


# XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
#                                  VALIDATE USER REG INFO
# ______________________________________________________________________________________________________
# NOT IMPLEMENTED YET
    @staticmethod
    def validate_info(user):
        is_valid = True
        if len(user['first_name']) < 3:
            flash("First name must be at least 3 characters.")
            is_valid = False
        if len(user['last_name']) < 3:
            flash("Last name must be at least 3 characters.")
            is_valid = False
        if not EMAIL_REGEX.match(user['email']): 
            flash("Invalid email!")
            is_valid = False
        if len(user['password']) < 8:
            flash("Password must be at least 8 characters.")
            is_valid = False
        if len(user['confirm']) < 3:
            flash("Confirm password must be at least 3 characters.")
            is_valid = False
        if user['confirm'] != user['password']:
            flash("Password and confirm password do not match.")
            is_valid = False
        print('valid entered info send to bcrypt')
        return is_valid
# ZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZ


# XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
#                                    VALIDATE LOGIN INFO
# ______________________________________________________________________________________________________
    @staticmethod
    def validate_login( user ):
        print('validating login info')
        is_valid = True
        # if len(user['email']) < 3:
        #     flash("Email must be at least 3 characters.")
        #     is_valid = False
        if not EMAIL_REGEX.match(user['email']): 
            flash("Invalid email/password!")
            is_valid = False
            print('XXXXXXXXXXXX passes regex step XXXXXXXXXX')

        # if len(user['password']) < 8:
        #     flash("Password must be at least 8 characters.")
        #     is_valid = False
        return is_valid
# ZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZ




