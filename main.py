from flask import Flask, render_template, url_for, request, flash, session, redirect, jsonify
from dotenv import load_dotenv

from util import json_response
import mimetypes
import queires
from os import urandom
from functools import wraps
import password_util
from flask import jsonify

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


@app.route("/api/boards/public")
@json_response
def get_public_boards():
    """
    All the boards
    """
    return queires.get_public_boards()


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
    id = queires.write_new_board(request.get_json()['title'])
    return jsonify(id)


@app.route("/api/new_card", methods=['POST'])
def add_new_card():
    data = queires.write_new_card(request.get_json())
    return request.get_json()


@app.route("/api/rename_board", methods=['POST'])
def rename_board():
    data = request.get_json()
    writed_data = queires.rename_element(data, 'boards')
    return writed_data


@app.route('/api/rename_card', methods=['POST'])
def rename_card():
    data = request.get_json()
    return jsonify(queires.rename_element(data, 'cards'))


@app.route("/api/rename_column", methods=['POST'])
def rename_column():
    data = request.get_json()
    updated_data = queires.rename_board(data, 'statuses')
    return updated_data


@app.route("/api/getStatuses", methods=["POST"])
def get_statuses():
    data = request.get_json()
    statuses = queires.get_statuses(data['boardId'])
    return jsonify(statuses)


@app.route("/api/default_columns", methods=['POST'])
def write_default_columns():
    id = request.get_json()
    print(id)
    return jsonify(queires.write_def_cols(id['boardId']))

@app.route("/api/column", methods=['POST'])
def add_column():
    data = request.get_json()
    return jsonify(queires.add_new_column(data))


@app.route("/api/change_card_status", methods=['POST'])
def change_card_status():
    queires.change_card_status(request.get_json()['card_id'], request.get_json()['card_status'])
    return request.get_json()


@app.route("/register", methods=['GET', 'POST'])
def register():
    if request.method == 'GET':
        return render_template('register.html')
    else:
        username = request.form.get('username')
        known_username = queires.get_user_by_email(username)
        if known_username:
            flash("Username already exists, please choose another one!")
            return redirect('/register')
        else:
            password = request.form.get('password')
            hashed_password = password_util.hash_password(str(password))
            queires.add_new_user(username, hashed_password)
            flash("Successful registration. Log in to continue.")
            return redirect(url_for('login'))


@app.route("/login", methods = ['GET', 'POST'])
@already_logged_in
def login():
    if request.method == 'GET':
        return render_template('login.html')
    else:
        email_input = request.form.get('email')
        password_input = request.form.get('password')
        user_details = queires.get_user_by_email(email_input)

        if not user_details: #ha nincs ilyen user
            flash("No such username")
            return redirect(url_for('login'))
        else:
            password_verified = password_util.verify_password(password_input, user_details[0]['password'])
            if not password_verified: #ha nem oké a jelszó
                flash("Wrong username or password")
                return redirect(url_for('login'))
            else:
                session['id'] = user_details[0]['id']
                session['username'] = user_details[0]['username']
                session['password'] = user_details[0]['password']
                session['logged_in'] = True
                return redirect(url_for('index'))


@app.route("/logout")
def logout():
    session.clear()
    flash("You have been logged out")
    return render_template('login.html')


@app.route("/api/change_card_order", methods=['POST'])
def change_card_order():
    data = request.get_json()
    if len(data) == 2:
        queires.change_card_order(data['card_id'], data['order_status'])
    else:
        queires.change_cards_order(data['card_status'], data['order_status'], data['board_status'], data['status'])

    return request.get_json()


def main():
    app.run(debug=True)

    # Serving the favicon
    with app.app_context():
        app.add_url_rule('/favicon.ico', redirect_to=url_for('static', filename='favicon/favicon.ico'))


if __name__ == '__main__':
    main()
