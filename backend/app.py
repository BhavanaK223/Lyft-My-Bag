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
    print(data)  # Debugging line to check the incoming data
    print()

    # Get email and password from the request
    email = data.get('email')
    password = data.get('password')

    if not email or not password:
        return jsonify({"error": "Email and password are required"}), 400

    # Check if the user exists in the 'users' collection
    user = mongo.db.users.find_one({'email': email})  # ERROR: Connection issue?

    if not user or user['password'] != password:
        return jsonify({"error": "Invalid email or password"}), 401

    return jsonify({"message": "Login successful", "user": user['email']}), 200

# Route for user registration
@app.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    print()
    print(data)  # Debugging line to check the incoming data
    print()

    # Get user details from the request
    firstName = data.get('firstName')
    lastName = data.get('lastName')
    email = data.get('registeredEmail')
    password = data.get('registeredPassword')
    
    # checks if parsed correctly
    if not firstName or not lastName or not email or not password:
        return jsonify({"error": "All fields are required"}), 400

    # Check if the user already exists
    existing_user = mongo.db.users.find_one({'email': email})
    if existing_user:
        return jsonify({"error": "User already exists"}), 409

    # Insert the new user into the 'users' collection
    # Save new user to MongoDB
    mongo.db.users.insert_one({
        "firstName": firstName,
        "lastName": lastName,
        "email": email,
        "password": password  # Plain text for now (consider hashing later)
    })

    return jsonify({"message": "User registered successfully"}), 201


if __name__ == '__main__':
    app.run(debug=True)