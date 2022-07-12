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
#                                        GET LOGGED IN USER
# ______________________________________________________________________________________________________
@app.route('/user/info')
def get_user_info():
    user = User.get_user()
    # print("User id in controller",user)
    id_obj = user[0]
    return id_obj
# ZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZ


