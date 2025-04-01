from flask import Flask, jsonify, request
from flask_pymongo import PyMongo
from flask_cors import CORS  # Import CORS
from werkzeug.security import check_password_hash

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Use your actual password instead of <db_password> (SuperSeceret)
app.config["MONGO_URI"] = "mongodb+srv://LyftMyBag:SuperSecret@lyftmybag.3hifm.mongodb.net/LyftMyBag?retryWrites=true&w=majority&appName=LyftMyBag"

mongo = PyMongo(app)

# Route for user login
@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()

    # Get email and password from the request
    email = data.get('username')
    password = data.get('password')

    if not email or not password:
        return jsonify({"error": "Email and password are required"}), 400

    # Check if the user exists in the 'users' collection
    user = mongo.db.users.find_one({'email': email})  # ERROR: Connection issue?

    if not user or user['password'] != password:
        return jsonify({"error": "Invalid email or password"}), 401

    return jsonify({"message": "Login successful", "user": user['email']}), 200

if __name__ == '__main__':
    app.run(debug=True)