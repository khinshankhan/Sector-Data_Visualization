from __future__ import print_function
from flask import Flask, render_template, request, flash, redirect, url_for
import json
import sys

app = Flask(__name__)

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
    st = request.form['searchtext']
    return redirect(url_for('search', st=st))

@app.route('/search', methods=['POST', 'GET'])
def search():
    st = request.args.get('st')
    result = ['hi', 'bye']
    return render_template('search.html', s_text = st, results = result)

if __name__ == "__main__":
    app.debug = True
    app.run()
