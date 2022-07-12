# \\\\\\<$A$>///////\\\\\\<$A$>///////  _________  IMPORTS  _____________ \\\\\\<$A$>///////\\\\\\<$A$>///////
#                                  -------------------------------------------
from flask_server.config.mysqlconnection import connectToMySQL
from flask import flash, session
from flask_server.models import User_Model

schema = "twitisphere_schema"
class Point:
    def __init__( self , data ):
        self.id = data['id']
        self.user_id = data['user_id']
        self.post_id = data['post_id']

# ZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZ


# XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
#                                       ADD POINT TO POST 
# ______________________________________________________________________________________________________
    @staticmethod
    def add_point(data):
        query = "INSERT INTO twitisphere_schema.point (post_id, user_id) VALUES (%(post_id)s, %(user_id)s);"
        result = connectToMySQL(schema).query_db(query,data)
        return result
# ZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZ
  

# XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
#                                    CHECK IF LIKED ALREADY
# ______________________________________________________________________________________________________
    @classmethod
    def check_point(cls,data):
        query = "SELECT user_id FROM point WHERE post_id=%(id)s;" 
        results = connectToMySQL(schema).query_db(query,data)
        # print("%%%% check points from post -- ", results)
        return results
# ZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZ

# XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
#                                  COUNT TOTAL POINTS FOR A POST
# ______________________________________________________________________________________________________
    @staticmethod
    def count_points(data):
        query = "SELECT * FROM point WHERE post_id=%(id)s;" 
        results = connectToMySQL(schema).query_db(query,data)
        print("%%%% ALL THE POINTS FOR THIS POST -- ", results)
        return len(results)
# ZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZ
