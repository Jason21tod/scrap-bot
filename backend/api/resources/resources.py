from flask_restful import Resource, reqparse
from api.common.message_handlers import BaseMessageHandler, CumprimentHandler, AnalyseHandler
from bs4 import BeautifulSoup
import requests


class AnalyseSite(Resource):
    message_handler = BaseMessageHandler()
    cumpriment_handler = CumprimentHandler()
    analyse_handler = AnalyseHandler()
    message_handler.next_handlers.append(cumpriment_handler)
    message_handler.next_handlers.append(analyse_handler)

    def post(self) -> dict:
        parser = reqparse.RequestParser()
        parser.add_argument('text', type=str, required=True, help='Message text invalid')
        args = parser.parse_args()
        data = self.message_handler.receive_message(args)
        return data

    def make_data_return(self, url):
        document = requests.get(url).text
        soup = self.retriever.retrieve(soup=BeautifulSoup(document, features='html.parser'))
        return soup