from flask import Flask, render_template, url_for, request
from dotenv import load_dotenv
import json

from util import json_response
import mimetypes
import queires

mimetypes.add_type('application/javascript', '.js')
app = Flask(__name__)
load_dotenv()

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
    if request.method == 'POST':
        print(request.get_json())
        data = queires.write_new_board(request.get_json()['title'])
        return request.get_json()


@app.route("/api/change_card_status", methods=['POST'])
def change_card_status():
    queires.change_card_status(request.get_json()['card_id'], request.get_json()['card_status'])
    print(request.get_json())
    return request.get_json()


def main():
    app.run(debug=True)

    # Serving the favicon
    with app.app_context():
        app.add_url_rule('/favicon.ico', redirect_to=url_for('static', filename='favicon/favicon.ico'))


if __name__ == '__main__':
    main()
