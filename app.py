from __future__ import print_function
from flask import Flask, render_template, request, flash, redirect, url_for, session
import json
import sys

app = Flask(__name__)
app.secret_key = 'keysmithsmakekeys'

#PRINTS STUFF!!!!
def eprint(*args, **kwargs):
    print(*args, file=sys.stderr, **kwargs)
    return

@app.route('/')
def root():
    return render_template('home.html')

@app.route('/about')
def about():
    return render_template('about.html')

@app.route('/quiz')
def quiz():
    return render_template('quiz.html', dataset_name="the world's top 15 most populous countries", dataset_size=15, data_file='WorldPopulation.csv', chart_name="Percentage of Population of the 15 Most Populous Countries", time=60)

@app.route('/visualization')
def visualization():
    return render_template('visualization.html', dataset_name="World Population", data_file='WorldPopulation.csv')

query = "hi"
array = ['hi', 'bye']
@app.route('/search/<res>', methods=['POST','GET'])
def search(res):
    global query
    st = query
    global array
    result = array
    #eprint("Testing:")
    #eprint(array)
    return render_template('search.html', s_text = st, results = result)

@app.route('/searchjs', methods=['POST','GET'])
def searchjs():
    q = request.form['q']
    #eprint(q)
    d = request.form['d']
    dd = json.loads(d)
    #eprint(dd)
    
    #session["q"] = q
    #session["d"] = dd[0]

    global query
    query = q

    global array
    array = dd
    return "Hi"

@app.route('/s', methods=['POST','GET'])
def s():
    return "hi"

if __name__ == "__main__":
    app.debug = True
    app.run()
