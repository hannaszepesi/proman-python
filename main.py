from flask import Flask, render_template, url_for, request, flash, session, redirect
from dotenv import load_dotenv
import json

import data_manager
from util import json_response
import mimetypes
import queires
from os import urandom
from functools import wraps


mimetypes.add_type('application/javascript', '.js')
app = Flask(__name__)
app.secret_key = urandom(24)
load_dotenv()


def login_required(function):
    @wraps(function)
    def wrap(*args, **kwargs):
        if 'id' in session:
            return function(*args, **kwargs)
        else:
            flash("You are not logged in")
            return redirect(url_for('login'))
    return wrap


def already_logged_in(function):
    @wraps(function)
    def wrap(*args, **kwargs):
        if 'id' not in session:
            return function(*args, **kwargs)
        else:
            flash(f"You are already logged in, {session['username']}")
            return redirect(url_for('login_page'))
    return wrap

@app.route("/")
def index():
    """
    This is a one-pager which shows all the boards and cards
    """
    return render_template('index.html')


@app.route("/api/boards")
@json_response
def get_boards():
    """
    All the boards
    """
    return queires.get_boards()


@app.route("/api/boards/<int:board_id>/cards/")
@json_response
def get_cards_for_board(board_id: int):
    """
    All cards that belongs to a board
    :param board_id: id of the parent board
    """
    return queires.get_cards_for_board(board_id)


@app.route("/api/new_board", methods=['POST'])
def add_new_board():
    data = queires.write_new_board(request.get_json()['title'])
    return request.get_json()


@app.route("/api/rename_board", methods=['POST'])
def rename_board():
    data = request.get_json()
    writed_data = queires.rename_board(data)
    return writed_data



@app.route("/api/change_card_status", methods=['POST'])
def change_card_status():
    queires.change_card_status(request.get_json()['card_id'], request.get_json()['card_status'])
    print(request.get_json())
    return request.get_json()

@app.route("/api/register", methods=['POST'])
def register_user():
    pass


@app.route("/login", methods = ['GET', 'POST'])
@already_logged_in
def login():
    if request.method == 'GET':
        return render_template('login.html')
    else:
        email_input = request.form.get('email')
        password_input = request.form.get('password')
        user_details = queires.get_user_by_email(email_input)
        print(user_details)

        if not user_details: #ha nincs ilyen user
            flash("No such username")
            return redirect(url_for('login'))
        else:
            password_verified = password_util.verify_password(password_input, user_details['hashed_password'])
            if not password_verified: #ha nem oké a jelszó
                flash("Wrong username or password")
                return redirect(url_for('login'))
            else:
                session['id'] = user_details['user_id']
                session['username'] = user_details['username']
                session['password'] = user_details['hashed_password']
                session['logged_in'] = True
                return redirect(url_for('index'))


@app.route("/api/logout", methods=['POST'])
def logout():
    pass


def main():
    app.run(debug=True)

    # Serving the favicon
    with app.app_context():
        app.add_url_rule('/favicon.ico', redirect_to=url_for('static', filename='favicon/favicon.ico'))


if __name__ == '__main__':
    main()
