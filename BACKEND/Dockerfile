# Use the Python 3.11 slim image as base
FROM python:3.11-slim-buster

# Set the working directory inside the container
WORKDIR /app

# Copy requirements.txt
COPY ./requirements.txt /app

# Install dependencies
RUN pip install -r requirements.txt

# Copy the rest of the application code to the working directory
COPY . .

# Expose the port that the app will run on
EXPOSE 5000

# Set the environment variable FLASK_APP to app.py
ENV FLASK_APP=app.py

# Start the app
CMD ["flask", "run", "--host", "0.0.0.0"]
