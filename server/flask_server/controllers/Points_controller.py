from flask import  request, session
from flask_server import app
from flask_server.models.Points_Model import Point
 
@app.route("/add/point", methods=["POST"])
def add_point():
    post_id = request.get_json()
    followers = Point.check_point(post_id)
    for value in followers:
        if(value["user_id"] == session["user_id"]):
            error={
                "error":"You already liked this post!"
            }
            return error
    data={
        "user_id": session['user_id'],
        "post_id": post_id["id"]
    }
    Point.add_point(data)
    return ('point has bene added to post')

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

