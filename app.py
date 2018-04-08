import os
from flask import Flask, render_template, session, redirect, url_for, request, flash

app = Flask(__name__)

@app.route('/')
def route_root():
    return render_template('home.html')

@app.route('/about')
def route_about():
    return render_template('about.html')

@app.route('/visualization')
def route_visualization():
    return render_template('visualization.html')

if __name__ == "__main__":
    app.debug = True
    app.run()
