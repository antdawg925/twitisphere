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
     # need to save users id to be able to save the post to that user. 
        # self.user_id = data['user_id']

# SAVE POST _________________________________________________________________________________________________
    @classmethod
    def save(cls, data):
        query = "INSERT INTO post ( post, user_id ) VALUES (%(post)s, %(user_id)s);"
        result = connectToMySQL(schema).query_db(query,data)
        print('*********************** schema post result --', result)
        print('saved the new user to database')
        return result

# ADD POINT TO POST _________________________________________________________________________________________________
    @classmethod
    def add_point(cls, data):
        query = "INSERT INTO twitisphere_schema.point (post_id, user_id) VALUES (%(post_id)s, %(user_id)s);"
        result = connectToMySQL(schema).query_db(query,data)
        # print('*********************** schema post result --', result)
        # print('saved the new user to database')
        return result

# GET EVERY POSTS ____________________________________________________________________________________
    @classmethod
    def get_every_post(cls):
        # print('retrieving every post (*Model -get_every_post*);')
        query = "SELECT * FROM twitisphere_schema.post LEFT JOIN point ON point.user_id;" 
        results = connectToMySQL(schema).query_db(query)
        # print("** RESULTS FOR EVERY POST QUERY **", results)
        return results


# GET USERS POSTS 
# ___________________________________________________________________________________
    @classmethod
    def get_users_posts(cls):
        # print('retrieving users posts (*Model -get_users_posts*)')
        query = "SELECT * FROM twitisphere_schema.post where user_id= " + str(session['user_id']) + ";" 
        # print("QUERY -- ", query)
        results = connectToMySQL(schema).query_db(query)
        # print("** RESULTS FOR EVERY USERS POSTS QUERY **", results)
        return results


# GET USER AND POST ____________________________________________________________________________________
    @classmethod
    def get_user_and_posts(cls):
        # print('-----retrieving user and posts--------')
        query = "SELECT * FROM twitisphere_schema.post LEFT JOIN user ON user.id = post.user_id where user.id=" + str(session['user_id']) + ";"  
        results = connectToMySQL(schema).query_db(query)
        # print("get_user_and_posts -- ",results)

        if not results:
            return[]

        return results