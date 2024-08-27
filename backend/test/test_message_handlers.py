import unittest
from api.common.message_handlers import *


ERR_DATA = {'message_text':'Banana'}
CUMPRIMENT_DATA = {'message_text':'Hello'}
ANALYSE_DATA = {'message_text':'analyse https://beautiful-soup-4.readthedocs.io/en/latest/ and thats what i found'}
ANALYSE_DATA_WHITOUT_WHITESPACE = {'message_text':'analyse https://beautiful-soup-4.readthedocs.io/en/latest/'}
response_objt = {'text':''}
cumpriment_check = {'text':CUMPRIMENT_RESPONSE}


class TestMessageHandlers(unittest.TestCase):
    base_message_handler_mock = BaseMessageHandler()
    cumpriment_handler_mock = CumprimentHandler()
    analyse_handler_mock = AnalyseHandler()

    base_message_handler_mock.next_handlers.append(cumpriment_handler_mock)

    def test_error_no_process_message(self):
        self.assertEqual(
            self.base_message_handler_mock.receive_message(ERR_DATA),
            NO_PROCESSED_MESSAGE_RESPONSE
        )

    def test_process_message_by_base(self):
        self.assertEqual(
            self.base_message_handler_mock.receive_message(CUMPRIMENT_DATA),
            cumpriment_check
        )

    def test_cumpriment_message(self):
        self.assertEqual(
            self.cumpriment_handler_mock.process_message(CUMPRIMENT_DATA, response_objt=response_objt),
            cumpriment_check
        )

    def test_cumpriment_false_return(self):
        self.assertFalse(
            self.cumpriment_handler_mock.process_message(ERR_DATA, response_objt=response_objt)
        )

    def test_build_message(self):
        print(self.analyse_handler_mock.process_message(ANALYSE_DATA, response_objt=response_objt))

    def test_build_message_whitout_space(self):
        print(self.analyse_handler_mock.process_message(ANALYSE_DATA_WHITOUT_WHITESPACE, response_objt=response_objt))

test_url = ''

class TestGetScrapper(unittest.TestCase):
    def test_get_function(self):
        get_from_url('https://beautiful-soup-4.readthedocs.io/en/latest/')



if __name__ =='__main__':
    unittest
