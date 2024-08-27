import unittest
import requests



class TestApiEndpoints (unittest.TestCase):
    def test_analyse(self):
        data = {'message_text':'analyse https://docs.python.org/3/library/unittest.html'}
        result = requests.post('http://127.0.0.1:5000/analyse', json=data)
        print(result.url)
        print(type(result.content))
        print(result.content)

    def test_analyse_error_url(self):
        data = {'message_text':'analyse https://wrong_url'}
        result = requests.post('http://127.0.0.1:5000/analyse', json=data)
        print(result.url)
        print(type(result.content))
        print(result.content)
    
    def test_analyse_error_without_url(self):
        data = {'message_text':'analyse wrong_url_without'}
        result = requests.post('http://127.0.0.1:5000/analyse', json=data)
        print(result.url)
        print(type(result.content))
        print(result.content)


if __name__ =='__main__':
    try:
        result = requests.get('http://127.0.0.1:5000/analyse')
        print("Server Not On")
    except:
        unittest.main()