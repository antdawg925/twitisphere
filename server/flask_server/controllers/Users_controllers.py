# \\\\\\<$A$>///////\\\\\\<$A$>///////  _________  IMPORTS  _____________ \\\\\\<$A$>///////\\\\\\<$A$>///////
#                                   -----------------------------------------
from flask import Flask, render_template, request, redirect, session, flash
from flask_server import app
from flask_server.models.User_Model import User
from flask_bcrypt import Bcrypt
import re 

bcrypt = Bcrypt(app)

# XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
#                                        GET EVERY USER
# ______________________________________________________________________________________________________
@app.route("/every/user")
def get_every_user():
    every_user = User.get_every_user()
    catch = {}
    for user in every_user:
        catch.update({user["id"]: user})
    return catch
# ZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZ


# XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
#                                        GET FOLLOWS
# ______________________________________________________________________________________________________
@app.route("/follows")
def get_followsC():
    all_following = User.get_following()
    all_followers = User.get_followers()
    print("get_follows controller received query return ",all_following)
    follows = {
        "following": all_following,
        "followers": all_followers,
    }
    return follows
# ZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZ


# XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
#                                        GET LOGGED IN USER
# ______________________________________________________________________________________________________
@app.route('/user/info')
def get_user_info():
    user = User.get_user()
    print("User id in controller",user)
    print("HELLOOLOLOLLLOLOLO")
    id_obj = user[0]
    return id_obj
# ZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZ


# XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
#                                        FOLLOW A USER
# ______________________________________________________________________________________________________
@app.route("/follow", methods = ['POST'])
def follow():
    following_id = request.get_json()
    print(following_id["id"]," -- following id received in controller")
    data = {
        "following_id" : following_id["id"]
    }
    User.follow(data);
    return ("User has been followed")
# ZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZ


# XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
#                              LOG OUT AND REMOVE USER_ID FROM SESSION
# ______________________________________________________________________________________________________
# NOT IMPLEMENTED YET
@app.route('/logout')
def logout():
    session.pop('user_id')
    return "user_id popped from session"
# ZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZ