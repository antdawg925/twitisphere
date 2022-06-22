# \\\\\\<$A$>///////\\\\\\<$A$>///////  _________  IMPORTS  _____________ \\\\\\<$A$>///////\\\\\\<$A$>///////
#                                   -----------------------------------------
from flask import Flask, render_template, request, redirect, session, flash
from flask_server import app
from flask_server.models.User_Model import User
from flask_bcrypt import Bcrypt
import re 

bcrypt = Bcrypt(app)


# XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
#                                        CREATE NEW USER
# ______________________________________________________________________________________________________

@app.route('/create/user', methods=['POST'])
def create_user():
    # print('send to validation then use save model')
    # if not User.validate_info(request.form):
    #     return redirect('/')
    # if User.get_by_email({'email':request.form['email']}):
    #     flash('This email is already taken!')
    #     return redirect('/')
    user_data = request.get_json()
    print("User Data -- ",user_data)
    pw_hash = bcrypt.generate_password_hash(user_data['password'])
    # print(pw_hash, "Password is hashed!!!!!!")
    data= {
    'first_name' : user_data['first_name'],
    'last_name' : user_data['last_name'],
    'user_name' : user_data['user_name'],
    'email' : user_data['email'],
    'password' : pw_hash,
    }
    user_id = User.save(data)
    session['user_id'] = user_id
    print("user created, Session id: ",session['user_id'])
    
    # user_id = User.save(data)
    # session['user_id'] = user_id
    return ("User has been saved")
# ZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZ

# LET USER LOGIN _________________________________________________________________________________
@app.route('/login' , methods = ['POST'])
def login():
    user_data=request.get_json()
    print("incoming post JSON data", user_data)
    data={
        "email" : user_data["email"],
        "password" : user_data["password"]
    }
    User.get_by_email(data)

    print('ran query to grab info based on email')
    # if not User.validate_login(request.form):
    #     flash("Invalid Email/Password")
    #     return redirect("/")
    user = User.get_by_email(data)
    # if not user:
    #     return redirect ('/')
    # session['user_id'] = user.id
    return redirect('/dashboard')

# LOG OUT AND REMOVE USER_ID FROM SESSION _______________________________________________________
@app.route('/logout')
def logout():
    session.pop('user_id')
    return redirect('/')

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

# ZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZ

# XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
#                                        GET LOGGED IN USER
# ______________________________________________________________________________________________________
@app.route('/get/user/id')
def get_user_id():
    user_id = User.get_user_id()
    print("User id in controller",user_id)
    print("HELLOOLOLOLLLOLOLO")
    id_obj = user_id[0]
    return id_obj
# ZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZ


# XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
#                                        FOLLOW A USER
# ______________________________________________________________________________________________________
# @app.route("/follow")
# def follow(id):


# ZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZ
