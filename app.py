from flask import Flask, render_template, request, flash
import json

app = Flask(__name__)

@app.route('/')
def root():
    return render_template('home.html')

@app.route('/about')
def about():
    return render_template('about.html')

@app.route('/visualization')
def visualization():
    f = open("./static/data/WorldPopulation.csv")
    content = f.read()
    close(f)
    return render_template('visualization.html', dataset_name="World Population", dataset_size=len(j_data), data=content)

if __name__ == "__main__":
    app.debug = True
    app.run()
