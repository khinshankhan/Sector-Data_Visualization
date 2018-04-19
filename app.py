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
    
'''
@app.route('/searchjs', methods=['POST'])
def searchjs():
    #eprint("fiend")
    
    search = request.form['queryy']
    #eprint(search)
    #session['querry'] = search
    #q = session['user']
    #session.modified = True
    eprint(q)
    dat = request.form.getlist('data[]')
    #session['data'] = dat
    eprint (session)
    return redirect(url_for('search', st=search, da = dat))
'''

@app.route('/search', methods=['POST','GET'])
def search():
    st = "hi"
    result = ['hi', 'bye']
    eprint (session)
    st = session['q']
    session.pop('q')
    result = session['d']
    session.pop('d')
    
    return render_template('search.html', s_text = st, results = result)

@app.route('/s', methods=['POST','GET'])
def s():
    session["q"]= request.form['queryy']
    session["d"] = request.form.getlist('data[]')
    return "hi"

if __name__ == "__main__":
    app.debug = True
    app.run()
