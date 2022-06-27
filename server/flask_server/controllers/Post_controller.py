# \\\\\\<$A$>///////\\\\\\<$A$>///////  _________  IMPORTS  _____________ \\\\\\<$A$>///////\\\\\\<$A$>///////
#                                   -----------------------------------------
from cmath import log
from flask import Flask, render_template, request, redirect, session, flash
from flask_server import app
from flask_server.models.Post_Model import Post
from flask_server.models.User_Model import User


# XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
#                                         POST USERS POST
# ______________________________________________________________________________________________________
@app.route("/post/post", methods=["POST"])
def create_post():
    post_data=request.get_json()
    data={
        "user_id": session['user_id'],
        "post" : post_data["post"]
    }
    Post.save(data)
    return ("Post has been posted!")
# ZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZ


# XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
#                                         GET EVERY POST
# ______________________________________________________________________________________________________
@app.route("/every/post")
def get_every_post():
    every_post = Post.get_every_post()
    catch = {}
    for post in every_post:
        catch.update({post["id"]: post})
    return catch
# ZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZ


# XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
#                                         GET USERS POST
# ______________________________________________________________________________________________________
@app.route("/users/posts")
def get_users_posts():
    user_id = session['user_id']
    user_posts = Post.get_users_posts( )
    catch = {}
    for post in user_posts:
        catch.update({post["id"]: post})
    return catch
# ZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZ

