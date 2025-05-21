from flask import Flask, render_template, request, jsonify
import requests
import os

app = Flask(__name__)

API_KEY = os.getenv("GEMINI_API_KEY")  # Ou defina diretamente aqui (não recomendado em produção)
GEMINI_URL = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key={API_KEY}"

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/chat', methods=['POST'])
def chat():
    user_input = request.json.get('message')

    payload = {
        "contents": [
            {
                "parts": [
                    {
                        "text": user_input
                    }
                ]
            }
        ]
    }

    headers = {
        "Content-Type": "application/json"
    }

    try:
        response = requests.post(GEMINI_URL, headers=headers, json=payload)
        data = response.json()
        reply = data["candidates"][0]["content"]["parts"][0]["text"]
        return jsonify({"response": reply})
    except Exception as e:
        return jsonify({"response": "Erro ao conectar à API: " + str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
