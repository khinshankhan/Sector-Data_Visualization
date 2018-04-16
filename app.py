from flask import Flask, render_template, request, flash
import json

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
    '''
    dataset_name: What the data being represented is. Must be able to fill this blank: "Can you guess ______?"
    dataset_size: The number of answers in the dataset
    data: A JSON object of the data
    '''
    return render_template('visualization.html', dataset_name="the world's top 10 most populous countries", dataset_size=10, data_file='WorldPopulation.csv', chart_name="Percentage of Population of the 10 Most Populous Countries", time=60)

if __name__ == "__main__":
    app.debug = True
    app.run()
