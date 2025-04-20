from flask import Flask, jsonify, request
from flask_pymongo import PyMongo
from flask_cors import CORS  # Import CORS
from werkzeug.security import check_password_hash
from bson.objectid import ObjectId


app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Use your actual password instead of <db_password> (SuperSecret)
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
    user = mongo.db.users.find_one({'email': email}) 

    if not user or user['password'] != password:
        return jsonify({"error": "Invalid email or password"}), 401

    return jsonify({
        "message": "Login successful", 
        "user": {
            "userId": str(user['_id']),
            "firstName": user['firstName'],
            "lastName": user['lastName'],
            "email": user['email']}    
        }), 200

# User registration
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

# User Info Retrieval
@app.route('/profile', methods=['POST'])
def get_profile():
    data = request.get_json()

    if not data or 'email' not in data:
        return jsonify({"error": "Email is required"}), 400

    email = data['email']
    user = mongo.db.users.find_one({'email': email})

    if not user:
        return jsonify({"error": "User not found"}), 404

    return jsonify({
        "userId": str(user['_id']),
        "firstName": user['firstName'],
        "lastName": user['lastName'],
        "email": user['email']
    }), 200


# Creating a trip request
@app.route('/requests', methods=['POST'])
def create_trip():
    data = request.get_json()
    print("data received:")
    print(data)  # Debugging line to check the incoming data
    print()

    trip = {
        # "user_id": ObjectId(user_id),
        "email": data.get("email"),
        "firstName": data.get("firstName"),
        "lastName": data.get("lastName"),
        "date": data.get("date"),
        "time": data.get("time"),
        "duration": data.get("duration"),
        "destinationType": data.get("destinationType"),
        "destinationName": data.get("destinationName"),
        "address": data.get("address"),
        "compensation": data.get("compensation"),
        "seatsAvailable": data.get("seatsAvailable"),
        "additionalNotes": data.get("additionalNotes"),
    }

    mongo.db.trips.insert_one(trip)
    print(trip)
    return jsonify({"message": "Trip saved!"}), 201

# Join a trip request
@app.route('/join-trip', methods=['POST'])
def join_trip():
    data = request.json
    trip_id = data.get('trip_id')
    rider_email = data.get('rider_email')

    if not trip_id or not rider_email:
        return jsonify({"error": "Missing trip_id or rider_email"}), 400

    print("trip_id:")
    print(ObjectId(trip_id))
    trip = mongo.db.trips.find_one({"_id": ObjectId(trip_id)})

    if not trip:
        return jsonify({"error": "Trip not found"}), 404

    if int(trip['seatsAvailable']) <= 0:
        return jsonify({"error": "Trip is full"}), 400

    if 'riders' in trip and rider_email in trip['riders']:
        return jsonify({"error": "Already joined this trip"}), 400

    # Update trip: add rider + decrease seats
    mongo.db.trips.update_one(
        {"_id": ObjectId(trip_id)},
        {
            "$addToSet": {"riders": rider_email},
            "$inc": {"seatsAvailable": -1}
        }
    )

    return jsonify({"message": "Successfully joined the trip"}), 200

@app.route('/leave-trip', methods=['POST'])
def leave_trip():
    data = request.json
    trip_id = data.get('trip_id')
    rider_email = data.get('rider_email')

    if not trip_id or not rider_email:
        return jsonify({"error": "Missing trip_id or rider_email"}), 400

    trip = mongo.db.trips.find_one({"_id": ObjectId(trip_id)})

    if not trip:
        return jsonify({"error": "Trip not found"}), 404

    if 'riders' not in trip or rider_email not in trip['riders']:
        return jsonify({"error": "Not a member of this trip"}), 400

    # Update trip: remove rider + increase seats
    mongo.db.trips.update_one(
        {"_id": ObjectId(trip_id)},
        {
            "$pull": {"riders": rider_email},
            "$inc": {"seatsAvailable": 1}
        }
    )

    return jsonify({"message": "Successfully left the trip"}), 200

# List all trips
@app.route('/api/trips', methods=['GET'])
def get_public_trips():
    trips = list(mongo.db.trips.find({}))  # or just {} to get *all* trips
    for trip in trips:
        trip['_id'] = str(trip['_id'])
        #trip['email'] = str(trip['email']) # if you want to show who posted
    return jsonify(trips)
    
# List trips by User Email
@app.route('/api/user-trips', methods=['GET'])
def get_user_trips_by_email():
    email = request.args.get("email")
    if not email:
        return jsonify({"error": "Email required"}), 400

    trips = list(mongo.db.trips.find({"email": email}))
    for trip in trips:
        trip['_id'] = str(trip['_id'])

    return jsonify(trips), 200

if __name__ == '__main__':
    app.run(debug=True)