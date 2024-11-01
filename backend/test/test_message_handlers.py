import unittest
from api.common.message_handlers import *


ERR_DATA = {'text':'Banana'}
ERR_ANALYSE_DATA = {'text': 'https://this-link-not-exist'}
CUMPRIMENT_DATA = build_response_data(text='Hello', content={}, content_type='cumpriment', user=True)
ANALYSE_DATA = {'text':'analyse https://beautiful-soup-4.readthedocs.io/en/latest/ and thats what i found'}
ANALYSE_DATA_WHITOUT_WHITESPACE = {'text':'analyse https://beautiful-soup-4.readthedocs.io/en/latest/'}
WHO_IAM_QUESTION = {'text':'who are you'}

response_objt_who_are_you = build_response_data(text='who are you?', content={}, content_type='user', user=True)
response_objt = build_response_data()
cumpriment_check = {'text':CUMPRIMENT_RESPONSE, 'request_chat': 'cumpriment'}
response_cumpriment_check = build_response_data(text='Hello Buddy !', content={}, content_type='cumpriment', user=False)


class TestMessageHandlers(unittest.TestCase):
    base_message_handler_mock = BaseMessageHandler()
    cumpriment_handler_mock = CumprimentHandler()
    analyse_handler_mock = AnalyseHandler()
    who_iam_handler = WhoIamAmHandler()

    base_message_handler_mock.next_handlers.append(cumpriment_handler_mock)
    base_message_handler_mock.next_handlers.append(analyse_handler_mock)
    base_message_handler_mock.next_handlers.append(who_iam_handler)

    def test_error_no_process_message(self):
        self.assertEqual(
            self.base_message_handler_mock.receive_message(ERR_DATA),
            NO_PROCESSED_MESSAGE_RESPONSE
        )

    def test_process_message_by_base(self):
        self.assertEqual(
            self.base_message_handler_mock.receive_message(CUMPRIMENT_DATA),
            response_cumpriment_check
        )

    def test_cumpriment_false_return(self):
        self.assertFalse(
            self.cumpriment_handler_mock.process_message(ERR_DATA, response_objt=response_objt)
        )

    def test_build_analyse_message(self):
        self.assertIsNot(self.analyse_handler_mock.process_message(ANALYSE_DATA, response_objt=response_objt), False)

    def test_build_analyse_message_whitout_space(self):
        self.assertIsNot(self.analyse_handler_mock.process_message(ANALYSE_DATA, response_objt=response_objt), False)

    def test_build_analyse_message_error(self):
        self.assertEqual(self.analyse_handler_mock.process_message(ERR_ANALYSE_DATA, response_objt=response_objt), False)
    
    def test_build_who_i_am_message(self):
        print(self.who_iam_handler.process_message(WHO_IAM_QUESTION, response_objt=response_objt_who_are_you))

test_url = ''



if __name__ =='__main__':
    unittest.main()
