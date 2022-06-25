# \\\\\\<$A$>///////\\\\\\<$A$>///////  _________  IMPORTS  _____________ \\\\\\<$A$>///////\\\\\\<$A$>///////
#                                   -----------------------------------------
from flask import Flask, render_template, request, redirect, session, flash
from flask_server import app
from flask_server.models.Login_Reg_model import Log_Reg
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
    pw_hash = bcrypt.generate_password_hash(user_data['password'])
    data= {
    'first_name' : user_data['first_name'],
    'last_name' : user_data['last_name'],
    'user_name' : user_data['user_name'],
    'email' : user_data['email'],
    'password' : pw_hash,
    }
    user_id = Log_Reg.save(data)
    session['user_id'] = user_id
    return ("User has been saved")
# ZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZ


# XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
#                                       LET USER LOGIN 
# ______________________________________________________________________________________________________
@app.route('/login' , methods = ['POST'])
def login():
    data = request.get_json()
    user_id = Log_Reg.get_by_email(data)
    print(user_id,"____________________")
    if not bcrypt.check_password_hash( user_id[0]["password"], data["password"] ):
        print("Password didn't work for some reason <><><<<><><>><><><><><><><><><><><><><><><><><><")
        return False
    if not Log_Reg.validate_login(data):
        print("INVALID EMAIL FROM USER CONTROLLER")
        return False
    catch={}
    for user in user_id:
        catch.update({user["id"]: user})
    print( "******************************************" , user_id[0]["id"] )
    session["user_id"] = user_id[0]["id"]
    # if not User.validate_login(request.form):
    #     flash("Invalid Email/Password")
    #     return redirect("/")
    # if not user:
    #     return redirect ('/')
    return catch
# ZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZ

