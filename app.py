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

dsn = ""
dss = ""
dsf = ""
cn = ""
@app.route('/quiz/<val>', methods=['POST','GET'])
def quiz(val):
    ooh = val.split('_')
    value = ooh[0]
    time = ooh[1]
    size = ooh[2]
    global dsn
    global dss
    global dsf
    global cn
    # when value is:
    #1 = countries, 2 = cars, 3 = songs
    dss = int(size)
    if(value == '1'):
        dsn = "the world's top %d most populous countries"%(dss)
        cn = "Percentage of Population of the %d Most Populous Countries"%(dss)
        dsf = 'WorldPopulation.csv'
        hide_map = False
    elif(value == '2'):
        dsn = "the world's top %d most popular male baby names of 2008"%(dss)
        cn = "Percentage of Popularity of World's %d Male Baby names"%(dss)
        dsf = 'top_male_baby_names2008.csv'
        hide_map = True
    elif(value == '3'):
        dsn = "the world's top %d most popular female baby names of 2008"%(dss)
        cn = "Percentage of Popularity of World's %d Female Baby names"%(dss)
        dsf = 'top_female_baby_names2008.csv'
        hide_map = True
    elif(value == '4'):
        dsn = "the world's top %d most danceable songs of 2017"%(dss)
        cn = "Percentage of Danceability of World's %d Songs (2017)"%(dss)
        dsf = 'top_music2017.csv'
        hide_map = True
    elif(value == '5'):
        dsn = "The world's top %d countries with greatest population change"%(dss)
        cn = "Top %d countries with the greatest change in population from 1960 to 2016"%(dss)
        dsf = 'DeltaPopulation.csv'
        hide_map = False
        
    return render_template('quiz.html', hide_map = hide_map, dataset_name=dsn, dataset_size=dss, data_file=dsf, chart_name=cn, time=int(time))

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
