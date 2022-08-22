from flask import Flask, render_template, request, redirect, session, flash
from flask_server import app
from flask_server.models.Follows_model import Follow
#                                        GET FOLLOWS
@app.route("/follows")
def get_followsC():
    all_following = Follow.get_following()
    all_followers = Follow.get_followers()
    # print("get_follows controller received query return ",all_following)
    follows = {
        "following": all_following,
        "followers": all_followers,
    }
    return follows

 
#                                        FOLLOW A USER
@app.route("/follow", methods = ['POST'])
def follow():
    # ----------- So you cant follow yourself -----------
    following_id = request.get_json()
    if(following_id["id"] == session["user_id"]):
        # print("You cant follow yourself, sorry")
        error={
                 "error":"You cant follow yourself!"
             }
        return error
    # ----------- Check if following -----------
    followers = Follow.check_following(following_id)
    print("Got followers back ! --", followers)
    for value in followers:
        # print(value["follower_user_id"])
        if(value["follower_user_id"] == session["user_id"]):
            # print("I think he already follow them!")
            error={
                "error":"You already follow them!"
            }
            return error
    data = {
        "following_id" : following_id["id"]
    }
    Follow.follow(data);
    return ("User has been followed")
