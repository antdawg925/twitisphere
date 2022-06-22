from flask_server.config.mysqlconnection import connectToMySQL
from flask import flash, session
import re

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

# GET USER ID WITH USERNAME _________________________________________________________________________________________________
    @classmethod
    def get_user_id(cls):
        print('getting individual user')
        query = "SELECT user.id FROM user WHERE id="+ str(session['user_id']) + ";"
        result = connectToMySQL(schema).query_db(query)
        print('***********+++++++***********', result)
        print("got user id")
        return result


# SAVE USER_________________________________________________________________________________________________
    @classmethod
    def save(cls, data):
        query = "INSERT INTO user ( first_name, last_name, user_name, email, password) " \
        "VALUES (%(first_name)s , %(last_name)s , %(user_name)s, %(email)s , %(password)s );"
        result = connectToMySQL(schema).query_db(query,data)
        print('***********************', result)
        print('saved the new user to database')
        return result

# GET EVERY USER ____________________________________________________________________________________
    @classmethod
    def get_every_user(cls):
        print('retrieving every user (*Model -get_every_user*)')
        query = "SELECT * FROM twitisphere_schema.user;" 
        results = connectToMySQL(schema).query_db(query)
        # print("** RESULTS FOR EVERY POST QUERY **", results)
        # posts = []
        # for post in results:
        #     posts.append( cls(post) )
        #     print("list of the posts-",posts)
        return results


# VALIDATE USER REG INFO______________________________________________________________________________________
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

# VALIDATE LOGIN INFO________________________________________________________________________________________
    @staticmethod
    def validate_login( user ):
        print('validating login info')
        is_valid = True
        if len(user['email']) < 3:
            flash("Email must be at least 3 characters.")
            is_valid = False
        if not EMAIL_REGEX.match(user['email']): 
            flash("Invalid email/password!")
            is_valid = False
            print('passes regex step')
        if len(user['password']) < 8:
            flash("Password must be at least 8 characters.")
            is_valid = False
        return is_valid
