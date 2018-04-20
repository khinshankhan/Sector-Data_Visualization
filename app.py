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

@app.route('/search', methods=['POST','GET'])
def search():
    st = "hi"
    result = ['hi', 'bye']
    
    return render_template('search.html', s_text = st, results = result)

@app.route('/searchjs', methods=['POST','GET'])
def searchjs():
    asdf = request.form['q']
    eprint(asdf)
    '''
    eprint("point 1")
    asdf = request.args.get('d[][]')
    eprint("point 2")
    l = len(asdf)
    eprint("point 3")
    eprint(l)
    eprint("point 4")
    '''
    return "Hi"

@app.route('/s', methods=['POST','GET'])
def s():
    #session["d"] = request.form.getlist('data[]')
    return "hi"

if __name__ == "__main__":
    app.debug = True
    app.run()
