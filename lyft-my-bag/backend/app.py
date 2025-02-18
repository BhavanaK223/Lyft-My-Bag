# Test file to practice 
'''
MongoDB = Daba base to hold data (user data)
Flask = Framework possibility
    - Older but easier
    - Less overhead
    - More control
    

C++?
.Net is a Micosoft framework that is supposed to be good for web development
    Straight forware
'''
from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable Cross-Origin Resource Sharing for React

@app.route('/api/data')
def get_data():
    return jsonify({'message': 'Hello from Flask backend!'})

if __name__ == '__main__':
    app.run(debug=True, port=5000)  # Run on port 5000

