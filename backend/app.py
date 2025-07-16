from flask import Flask, jsonify
from flask_cors import CORS
from api.routes import api_bp

app = Flask(__name__)
CORS(app)  # 处理跨域请求

# 注册蓝图
app.register_blueprint(api_bp, url_prefix='/api')

@app.route('/')
def index():
    return jsonify({"message": "Welcome to Flask-Vue API"})

if __name__ == '__main__':
    app.run(debug=True, host='localhost', port=5000)