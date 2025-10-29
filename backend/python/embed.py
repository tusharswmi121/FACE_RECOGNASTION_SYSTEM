#!/usr/bin/env python3
import argparse
import json
import sys
import os
import face_recognition

def main():
    parser = argparse.ArgumentParser(description="Generate 128-D face embedding using Dlib-ResNet")
    parser.add_argument("--image", required=True, help="Path to input image")
    args = parser.parse_args()

    image_path = args.image
    if not os.path.exists(image_path):
        sys.stderr.write(f"❌ Image not found: {image_path}\n")
        sys.exit(1)

    # Load image (face_recognition automatically handles RGB and resizing)
    try:
        image = face_recognition.load_image_file(image_path)
        encodings = face_recognition.face_encodings(image)

        if len(encodings) == 0:
            sys.stderr.write("❌ No face detected\n")
            sys.exit(1)

        # Take the first face found
        embedding = encodings[0].tolist()

        print(json.dumps({"embedding": embedding}))
    except Exception as e:
        sys.stderr.write(f"❌ Error processing image: {str(e)}\n")
        sys.exit(1)

if __name__ == "__main__":
    main()
