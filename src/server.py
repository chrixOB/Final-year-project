from flask import Flask, request, jsonify
from flask_cors import CORS
import requests

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

@app.route('/run-python', methods=['POST'])
def run_python():
    code = request.json.get('code', '')
    try:
        exec_globals = {}
        exec(code, exec_globals)
        output = "\n".join(f"{key}: {value}" for key, value in exec_globals.items())
        return output, 200
    except Exception as e:
        return str(e), 400

if __name__ == '__main__':
    app.run(debug=True)
