# \\\\\\<$A$>///////\\\\\\<$A$>///////  _________  IMPORTS  _____________ \\\\\\<$A$>///////\\\\\\<$A$>///////
#                                   -----------------------------------------
import flask_server
from flask_server.controllers import Users_controllers
from flask_server.controllers import Post_controller
from flask_server.controllers import Login_Reg_controller
from flask_server.controllers import Points_controller
from flask_server.controllers import Follows_controller
from flask_server import app

if __name__ == "__main__":
    app.run()
