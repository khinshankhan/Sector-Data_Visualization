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

@app.route('/visualization')
def visualization():
    '''
    dataset_name: What the data being represented is. Must be able to fill this blank: "Can you guess ______?"
    dataset_size: The number of answers in the dataset
    data: A JSON object of the data
    '''
    return render_template('visualization.html', dataset_name="the world's top 15 most populous countries", dataset_size=15, data_file='WorldPopulation.csv', chart_name="Percentage of Population of the 15 Most Populous Countries", time=60)

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
    print session
    return redirect(url_for('search', st=search, da = dat))

@app.route('/search', methods=['POST','GET'])
def search():
    st = "hi"
    result = ['hi', 'bye']
    print session
    
    if request.args.get('st') != None:
        st = request.args.get('st')
        eprint("DATA: " + str(st))
        session['querry'] = str(st)
        da = request.args.get('da'[0])
        session['data'] = da

    q = session['user']
    eprint(q)
    eprint("data1?")
    if 'querry' in session:
        eprint("DATA1")
        st = session['querry']
        session.pop('querry')
        eprint("legggoooo1")
    eprint("data2?")
    if 'data' in session:
        eprint("DATA2")
        result = session['data']
        session.pop('data')
        eprint("legggoooo2")
    return render_template('search.html', s_text = st, results = result)

if __name__ == "__main__":
    app.debug = True
    app.run()
