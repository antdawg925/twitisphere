from cmath import log
from flask import Flask, render_template, request, redirect, session, flash
from flask_server import app
from flask_server.models.Post_Model import Post
from flask_server.models.Points_Model import Point
from flask_server.models.User_Model import User

@app.route("/post/post", methods = ['POST'])
def create_post():
    print("post controller")
    post_data=request.get_json()
    data={
        "user_id": session['user_id'],
        "post" : post_data["post"]
    }
    Post.save(data) 
    return ("Post has been posted!")

@app.route("/following/posts")
def get_every_post():
    every_post = Post.get_following_posts()
    catch = {}
    for post in every_post:
        post["points"] = Point.count_points({"id": post["id"]})
        catch.update({post["id"]: post})
    return catch 

@app.route("/users/posts")
def get_users_posts():
    user_posts = Post.get_users_posts( )
    catch = {}
    for post in user_posts:
        post["points"] = Point.count_points({"id": post["id"]})
        catch.update({post["id"]: post})
    return catch
    
 
