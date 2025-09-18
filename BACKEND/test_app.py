import unittest
from app import app

class TestApp(unittest.TestCase):

    def setUp(self):
        self.app = app.test_client()
        self.app.testing = True

    # def test_predict_endpoint_with_valid_image(self):
    #     # Create a sample image file for testing
    #     with open('sample_image.jpg', 'rb') as f:
    #         # Send a POST request to the /predict endpoint with the sample image
    #         response = self.app.post('/predict', data={'image': f})
    #         data = response.get_json()
    #         # Check if the response contains the 'name' key indicating the predicted pill
    #         self.assertIn('name', data)

    def test_predict_endpoint_with_no_image(self):
        # Send a POST request to the /predict endpoint without providing an image
        response = self.app.post('/predict')
        data = response.get_json()
        # Check if the response contains an error message
        self.assertIn('error', data)

    def test_translate_endpoint_with_valid_data(self):
        # Sample data for translation
        data = {
            'text': {
                'quickSummary': 'Some text',
                'composition': 'Some text',
                'pillUses': 'Some text',
                'sideEffects': 'Some text'
            }
        }
           
