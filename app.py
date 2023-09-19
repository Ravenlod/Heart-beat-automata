from flask import Flask, render_template, redirect, url_for

app = Flask(__name__)


@app.route('/')
def main_page():

    return render_template('main.html')


if __name__ == '__main__':
    app.run()
