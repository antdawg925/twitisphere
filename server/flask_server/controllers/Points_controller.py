# \\\\\\<$A$>///////\\\\\\<$A$>///////  _________  IMPORTS  _____________ \\\\\\<$A$>///////\\\\\\<$A$>///////
#                                   -----------------------------------------
from cmath import log
from flask import Flask, render_template, request, session
from flask_server import app
from flask_server.models.Post_Model import Post
from flask_server.models.Points_Model import Point

 
# XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
#                                     ADD POINT TO A POST
# ____________________________________________________________________________________________________
@app.route("/add/point", methods=["POST"])
def add_point():
    post_id = request.get_json()
    #Check if already liked 
    followers = Point.check_point(post_id)
    # print("Got followers back ! --", followers)
    for value in followers:
        # print(value["user_id"])
        if(value["user_id"] == session["user_id"]):
            # print("I think he already liked this!")
            error={
                "error":"You already liked this post!"
            }
            return error
    data={
        "user_id":session['user_id'],
        "post_id": post_id["id"]
    }
    Point.add_point(data)
    return ('point has bene added to post')
# ZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZ


# XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
#                            COUNT UP POINTS FOR A POST
# ______________________________________________________________________________________________________
@app.route("/count/points", methods=["POST"])
def count_point():
    post_id = request.get_json()
    print(post_id['id'])
    data={
        "id": post_id['id']
    }
    points = {
        "points": len(Point.count_points(data))
    }
    print("$$$$$$$$$$",points)
    return points
# ZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZ

