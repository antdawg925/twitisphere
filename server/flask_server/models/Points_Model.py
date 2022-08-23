from flask_server.config.mysqlconnection import connectToMySQL
from flask_server.models import User_Model

schema = "twitisphere_schema"
class Point:
    def __init__( self , data ):
        self.id = data['id']
        self.user_id = data['user_id']
        self.post_id = data['post_id']

    @staticmethod
    def add_point(data):
        query = "INSERT INTO twitisphere_schema.point (post_id, user_id) VALUES (%(post_id)s, %(user_id)s);"
        result = connectToMySQL(schema).query_db(query,data)
        return result

    @classmethod
    def check_point(cls,data):
        query = "SELECT user_id FROM point WHERE post_id=%(id)s;" 
        results = connectToMySQL(schema).query_db(query,data)
        # print("%%%% check points from post -- ", results)
        return results
        
    @staticmethod
    def count_points(data):
        query = "SELECT * FROM point WHERE post_id=%(id)s;" 
        results = connectToMySQL(schema).query_db(query,data)
        print("%%%% ALL THE POINTS FOR THIS POST -- ", results)
        return len(results)
# =======
# from flask_server.config.mysqlconnection import connectToMySQL
# from flask import flash, session
# from flask_server.models import User_Model

# schema = "twitisphere_schema"
# class Point:
#     def __init__( self , data ):
#         self.id = data['id']
#         self.user_id = data['user_id']
#         self.post_id = data['post_id']



# # ADD POINT TO POST 
#     @classmethod
#     def add_point(cls, data):
#         query = "INSERT INTO twitisphere_schema.point (post_id, user_id) VALUES (%(post_id)s, %(user_id)s);"
#         result = connectToMySQL(schema).query_db(query,data)
#         return result
  

# # CHECK IF LIKED ALREADY
#     @classmethod
#     def check_point(cls,data):
#         query = "SELECT user_id FROM point WHERE post_id=%(id)s;" 
#         results = connectToMySQL(schema).query_db(query,data)
#         print("%%%% check points from post -- ", results)
#         return results
#     @classmethod
#     def count_points(cls,data):
#         query = "SELECT * FROM point WHERE post_id=%(id)s;" 
#         results = connectToMySQL(schema).query_db(query,data)
#         print("%%%% ALL THE POINTS FOR THIS POST -- ", results)
#         return results
# >>>>>>> 91512047f40fa574ecd0252a9c91ebaa4a7ccd78
