<div align="center">

# VisionCare AI

**An AI-powered eye-care platform that screens eye images for common diseases with deep-learning models.**

![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white)
![PyTorch](https://img.shields.io/badge/PyTorch-EE4C2C?style=for-the-badge&logo=pytorch&logoColor=white)
![Flask](https://img.shields.io/badge/Flask-000000?style=for-the-badge&logo=flask&logoColor=white)
![Jupyter](https://img.shields.io/badge/Jupyter-F37626?style=for-the-badge&logo=jupyter&logoColor=white)
![PHP](https://img.shields.io/badge/PHP-777BB4?style=for-the-badge&logo=php&logoColor=white)
![Laravel](https://img.shields.io/badge/Laravel-FF2D20?style=for-the-badge&logo=laravel&logoColor=white)
![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)

</div>

---

## Overview

VisionCare AI is a capstone project that brings AI-assisted eye-disease screening to a web platform. A user uploads an eye image. A first model checks that the image actually shows an eye, then a classifier predicts whether it shows **cataract**, **diabetic retinopathy**, **glaucoma**, or a **normal** eye. The results are presented in a web app backed by a Laravel API.

The repository also contains the project's final report and defense slides.

## Features

- **Eye-or-not-eye validation** before diagnosis, to reject unrelated images.
- **Four-class eye-disease classification** (cataract, diabetic retinopathy, glaucoma, normal) using fine-tuned CNNs.
- **Model experiments** with VGG16 and ResNet18 in PyTorch, documented in Jupyter notebooks.
- **Model-serving API** built with Flask.
- **Web frontend** with image upload by drag and drop, animations, and toast notifications.
- **Laravel backend** with Docker Compose setup, migrations, and seeders.

## Tech Stack

| Area | Technology |
| --- | --- |
| Machine learning | PyTorch, torchvision (VGG16, ResNet18), Jupyter |
| Model API | Flask, Flask-CORS |
| Backend | PHP, Laravel, Docker Compose |
| Frontend | React, Vite, MUI, Tailwind CSS, GSAP, Framer Motion |

## Getting Started

### Prerequisites

- Python 3 with pip
- Docker and Docker Compose
- Node.js and npm

### Model API

```bash
git clone https://github.com/RithyBondeth/Visioncare-AI.git
cd "Visioncare-AI/Visioncare Platform/visioncare_ml"
pip install -r requirements.txt
python new_api.py
```

### Backend

```bash
cd "Visioncare-AI/Visioncare Platform/visioncare_backend"
make setup     # build and start the containers, install Composer packages
make data      # run migrations and seeders
```

### Frontend

```bash
cd "Visioncare-AI/Visioncare Platform/visioncare_frontend"
npm install
npm run dev
```

## Project Structure

```text
Visioncare-AI/
├── Visioncare Platform/
│   ├── visioncare_ml/          # Notebooks, trained models (.pth), Flask model API
│   ├── visioncare_backend/     # Laravel app, Dockerfile, docker-compose, Makefile
│   ├── visioncare_frontend/    # React web app
│   ├── Eye Images/             # Sample images per class
│   └── Profile Avatar/         # Team avatars
├── ReCapstone I Final Report.docx
└── Defense Slide.pdf
```

## Author

**Rithy Bondeth** — Full Stack Developer & AI Engineer

[![Portfolio](https://img.shields.io/badge/Portfolio-0A0A0A?style=for-the-badge&logo=vercel&logoColor=white)](https://bondeth.dev)
[![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/RithyBondeth)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/rithy-bondeth-484073282/)
