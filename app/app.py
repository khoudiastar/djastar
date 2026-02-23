from flask import Flask, render_template, jsonify
import os
import socket
import datetime
import random

app = Flask(__name__)

# Liste des passions de Khoudia
PASSIONS = [
    {
        "name": "DevOps",
        "icon": "🚀",
        "color": "#ff6b6b",
        "description": "Infrastructure as Code, CI/CD, Automation",
        "technologies": ["Docker", "Kubernetes", "Jenkins", "Terraform"]
    },
    {
        "name": "Cloud Computing",
        "icon": "☁️",
        "color": "#4ecdc4",
        "description": "AWS, GCP, Architecture Cloud Native",
        "technologies": ["EC2", "S3", "Lambda", "CloudFormation"]
    },
    {
        "name": "3D & Animation",
        "icon": "🎨",
        "color": "#45b7d1",
        "description": "Three.js, WebGL, Creative Coding",
        "technologies": ["Three.js", "Blender", "WebGL"]
    },
    {
        "name": "Open Source",
        "icon": "🌍",
        "color": "#96ceb4",
        "description": "Contributions, Communities, Sharing",
        "technologies": ["GitHub", "GitLab", "Open Source"]
    },
    {
        "name": "Innovation",
        "icon": "💡",
        "color": "#ffeaa7",
        "description": "Nouvelles technologies, R&D, Créativité",
        "technologies": ["AI/ML", "IoT", "Blockchain"]
    }
]

@app.route('/')
def index():
    return render_template('index.html', 
                         name="Khoudia",
                         passions=PASSIONS,
                         hostname=socket.gethostname())

@app.route('/api/passions')
def get_passions():
    return jsonify(PASSIONS)

@app.route('/health')
def health():
    return jsonify({
        "status": "healthy",
        "timestamp": datetime.datetime.now().isoformat(),
        "version": os.environ.get('VERSION', '1.0.0'),
        "container": socket.gethostname()
    })

@app.route('/api/random-quote')
def random_quote():
    quotes = [
        "Le code est poésie ✨",
        "L'automatisation est libératrice 🚀",
        "Les conteneurs sont des LEGO pour adultes 🐳",
        "Le cloud n'est pas dans le ciel, mais dans les data centers ☁️",
        "DevOps is the way! 🔧",
        "Kubernetes: parce que nommer ses enfants est difficile 🎯",
        "La 3D donne vie aux rêves 🌟",
        "Khoudia, la magie du code ✨"
    ]
    return jsonify({"quote": random.choice(quotes)})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
