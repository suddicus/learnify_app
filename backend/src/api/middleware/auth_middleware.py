# ⚠️ PARTIAL: Basic structure, needs completion
from functools import wraps
from flask import request, jsonify
from config import Config


def require_api_key(f):
    """
    Decorator to require API key authentication

    Checks for 'Authorization' header with format: 'Bearer YOUR_API_KEY'
    Returns 401 if missing or invalid

    TODO: Complete this middleware
    - Extract the Authorization header from request
    - Check if header exists and starts with 'Bearer '
    - Extract the API key (token after 'Bearer ')
    - Validate against Config.VALID_API_KEYS
    - Return proper error responses for missing/invalid keys
    """
    @wraps(f)
    def decorated_function(*args, **kwargs):
        # TODO: Implement API key validation logic here
        # Currently returns 401 for all requests since validation is not implemented
        
        # Start of Implementation v1
        auth_header = request.headers.get('Authorization')

        if not auth_header or not auth_header.startswith("Bearer "):
            return jsonify({
                'error': {
                    'code': 'HTTP_401_UNAUTHORIZED',
                    'message': 'Missing or invalid Authorization header'
                }
            }), 401

        token = auth_header.split(" ")[1]
        if token != Config.VALID_API_KEYS[0]:
            return jsonify({
                'error': {
                    'code': 'HTTP_401_UNAUTHORIZED',
                    'message': 'Invalid token'
                }
            }), 401

    return decorated_function