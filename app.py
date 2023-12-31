from flask import Flask, render_template, redirect, url_for, request, session
import secrets
from utils import Heart
import json
import copy
app = Flask(__name__)
secret_key = secrets.token_hex(16)
app.config['SECRET_KEY'] = secret_key


@app.route('/')
def main_page():

    return render_template('main/main.html')

@app.route('/cell_automata')
def cell_automata():
    n = 5
    col_cell = [0] * n
    cell_field = [col_cell] * n
    return render_template('main/cell_automata.html', 
                           cell_field=cell_field)

@app.route('/linkHandler', methods=['POST'])
def linkHandler():
    if request.method == 'POST':
        link_input = request.json
    session['links'] = dict(link_input)['links']
    print("I", link_input)
    Heart(dict(link_input))

    return redirect(url_for('heart_automata'))

@app.route('/heart-start', methods=['POST'])
def start_block():
    if request.method == 'POST':
        input = request.json
    session['quantity'] = int(input['quantity'])


    return redirect(url_for('heart_automata'))

@app.route('/heart', methods=['GET', 'POST'])
def heart_automata():
    n = 4
    flag_is_started = False
    flag_is_submitted = False
    if "quantity" in session:
        n = session.get('quantity', 4)
        flag_is_started = True

    if "links" in session:
        flag_is_submitted = True

    nodes = list()
    input_list = list()
    config = "top: auto; left: auto"
    default_list = [["0", config]] * n

    if "config" in session:
        for index, output in enumerate(session.get("config", "top: auto; left: auto")):
           nodes.append([session.get("value", "0")[index], output])
        # nodes = copy.deepcopy([session.get("value", "0"), ])

    else:
        for output in default_list:
            nodes.append(output)

    if request.method == 'POST':
        raw_input = request.json
        input_list = raw_input['config']
        input_value = raw_input['value']
        temp_value = Heart(list(input_value))
        session["config"] = input_list
        session["value"] = temp_value
        print("B", temp_value)
        print("A", input_list)
        for index, value in enumerate(nodes):
            nodes[index] = [list(temp_value)[index], value[1]]
        redirect(url_for('heart_automata'))

    print("R", nodes)
    link_list = session.get('links', None)
    return render_template('main/heart.html', 
                           nodes=nodes,
                           link_list=link_list, 
                           flag_is_started=flag_is_started,
                           flag_is_submitted=flag_is_submitted)
                          # node_value_list=node_value_list)

@app.route('/test')
def test_page():
    
    return render_template('main/test.html')

if __name__ == '__main__':
    app.run()
