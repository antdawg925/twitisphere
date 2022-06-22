# \\\\\\<$A$>///////\\\\\\<$A$>///////  _________  IMPORTS  _____________ \\\\\\<$A$>///////\\\\\\<$A$>///////
#                                   -----------------------------------------
from cmath import log
from flask import Flask, render_template, request, redirect, session, flash
from flask_server import app
from flask_server.models.Post_Model import Post


# XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
#                                         POST USERS POST
# ______________________________________________________________________________________________________

@app.route("/post/post", methods=["POST"])
def create_post():
    print("posting post controller")
    post_data=request.get_json()
    print("incoming post JSON data", post_data)
    data={
        "user_id": session['user_id'],
        "post" : post_data["post"]
    }
    Post.save(data)
    return ("Post has been posted!")
# ZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZ


# # XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
# #                                         GET USERS POST
# # ______________________________________________________________________________________________________

# @app.route("/users/posts")
# def get_users_posts():
    
#     print(session['user_id'], "so the shit exists!@@@@@@@@@@@@@@@@@")
#     data= {
#         "user_id": session['user_id'],
#     }
#     users_posts = Post.get_users_posts(data)

#     print(users_posts)
#     return users_posts
# # ZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZ


# XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
#                                         GET EVERY POST
# ______________________________________________________________________________________________________

@app.route("/every/post")
def get_every_post():
    
    every_post = Post.get_every_post()
    print("-------------------------------------")
    print("every post -- ", every_post)
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
    data= {
        "id": user_id,
    }
    # print("-------------------------------------")
    # print("-------------------------------------")
    # print("user id in session -- ",user_id)
    user_posts = Post.get_users_posts( )
    # print("-------------------------------------")
    # print("user posts -- ", user_posts)
    catch = {}
    for post in user_posts:
        catch.update({post["id"]: post})

    return catch

# ZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZ

# XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
#                                         GET USER AND POSTS
# ______________________________________________________________________________________________________

@app.route("/user/and/posts")
def get_user_and_posts():
    user_id = session['user_id']
    data= {
        "id": user_id,
    }
    print("-------------------------------------")
    print("-------------------------------------")
    print("user id in session -- ",user_id)
    user_and_posts = Post.get_user_and_posts( )
    print("-------------------------------------")
    print("user and posts -- ", user_and_posts)
    catch = {}
    for post in user_and_posts:
        catch.update({post["id"]: post})

    return catch

# ZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZ

# XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
#                                       ADD POINT TO A POST
# ______________________________________________________________________________________________________
@app.route("/add/point", methods=["POST"])
def add_pointC():
    post_id = request.get_json()
    # print("_____",post_id["id"])
    data={
        "user_id":session['user_id'],
        "post_id": post_id["id"]
    }
    Post.add_point(data)
    return ('point has bene added to post')



# ZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZ
