import unittest
from api.common.scrappers import *


test_url = "https://beautiful-soup-4.readthedocs.io/en/latest/#"
test_url_2 = 'https://www.youtube.com/'


class TestGetScrapper(unittest.TestCase):
    def test_get_function(self):
        soup = get_from_url(test_url)
        if soup != False:
            soup.prettify()
            print(soup)
        else:
            return
        
    def test_get_function_2(self):
        soup = get_from_url(test_url_2)
        if soup != False:
            soup.prettify()
            print(soup)
        else:
            return
        
    def test_get_all_links(self):
        soup = get_from_url(test_url_2)
        if soup != False: 
            get_all_links(soup)

    def test_get_separate_all_links(self):
        soup = get_from_url(test_url_2)
        if soup != False:
            links = get_all_links(soup)
            print(separate_all_links(links))

