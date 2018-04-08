from flask import Flask, render_template, request, flash

app = Flask(__name__)

@app.route('/')
def root():
    return render_template('home.html')

@app.route('/about')
def about():
    return render_template('about.html')

@app.route('/visualization')
def visualization():
    return render_template('visualization.html')

if __name__ == "__main__":
    app.debug = True
    app.run()
