from flask import request, session
from flask_server import app
from flask_server.models.Login_Reg_model import Log_Reg
from flask_bcrypt import Bcrypt
import re 
bcrypt = Bcrypt(app)
 

@app.route('/create/user', methods=['POST'])
def create_user():
    user_data = request.get_json()
    pw_hash = bcrypt.generate_password_hash(user_data['password'])
    data= {
    'first_name' : user_data['first_name'],
    'last_name' : user_data['last_name'],
    'user_name' : user_data['user_name'],
    'email' : user_data['email'],
    'password' : pw_hash,
    }
    user_name = Log_Reg.check_user_name(data)
    if(len(user_name) > 0 ):
        error = {
            'error':"That user name is already used!"
        }
        return error
    email = Log_Reg.check_email(data)
    if(len(email) > 0 ):
        error = {
            'error':"That email is already used!"
        }
        return error
    user_id = Log_Reg.save(data)
    session['user_id'] = user_id
    return ("User has been saved")

@app.route('/login' , methods = ['POST'])
def login():
    data = request.get_json()
    user_id = Log_Reg.get_by_email(data)
    if not bcrypt.check_password_hash( user_id[0]["password"], data["password"] ):
        return False
    if not Log_Reg.validate_login(data):
        return False
    catch={}
    for user in user_id:
        catch.update({user["id"]: user})
    session["user_id"] = user_id[0]["id"]
 
    return catch

@app.route('/logout')
def logout():
    session.clear()
    return "user_id popped from session"