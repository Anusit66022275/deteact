# server เรียกใช้ API
from flask import Flask, request, jsonify, send_from_directory
from ultralytics import YOLO
import os
import uuid
from flask_cors import CORS


app = Flask(__name__)
CORS(app) 

model = YOLO("yolov8m.pt")


os.makedirs("uploads", exist_ok=True)#เก็บภาพก่อน detect
os.makedirs("runs/detect/predict", exist_ok=True)#เก็บภาพหลัง detect

@app.route('/detect', methods=['POST'])
def detect():
    if 'file' not in request.files:
        return jsonify({"error": "No file part"}), 400

    file = request.files['file']
    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400

    
    print(" Received file:", file.filename)

    
    ext = os.path.splitext(file.filename)[1].lower()
    print(" File extension:", ext)

    if ext not in [".jpg", ".jpeg", ".png", ".bmp", ".webp", ".tif", ".tiff"]:
        return jsonify({"error": "Unsupported file type"}), 400

    
    new_filename = f"{uuid.uuid4()}{ext}"
    file_path = os.path.join('uploads', new_filename)
    file.save(file_path)

    try:
        
        results = model(file_path, save=True, project="runs/detect", name="predict", exist_ok=True)

        # เตรียมภาพส่งกลับ client
        output_path = f"runs/detect/predict/{new_filename}"
        if not os.path.exists(output_path):
            return jsonify({"error": "Output file not found"}), 500

        
        output_url = f"http://localhost:5000/runs/detect/predict/{new_filename}"
        print(" Detection completed. URL:", output_url)
        return jsonify({"output_url": output_url}), 200

    except Exception as e:
        import traceback
        print(traceback.format_exc())
        return jsonify({"error": str(e)}), 500


@app.route('/runs/detect/predict/<filename>')
def serve_detected_image(filename):
    return send_from_directory("runs/detect/predict", filename)

if __name__ == '__main__':
    app.run(debug=True, port=5000)
            