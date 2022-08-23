from flask import Flask
from flask_server import app
from flask_server.models.User_Model import User
import re 

@app.route("/every/user")
def get_every_user():
    every_user = User.get_every_user()
    catch = {}
    for user in every_user:
        catch.update({user["id"]: user})
    return catch

#  GET LOGGED IN USER
@app.route('/user/info')
def get_user_info():
    user = User.get_user()
    print("User id in controller",user)
    id_obj = user[0]
    return id_obj


