import abc
from .scrappers import *

NO_PROCESSED_MESSAGE_RESPONSE = "I don't understand what you're saying, sorry :C... Maybe, you could digit ''Help'' and i Help you with it"
CUMPRIMENT_RESPONSE = 'Hello Buddy !'
ANALYSE_RESPONSE = 'Analysing... \n\n'
WHO_IAM = """
Im Jason Scrapbot, Created by Gian ( or Jason if u want ;) )

All my functionalites are made to get infos from the sites, if you want
to support, pls, help on github with a pull request: 
"""


def build_response_data(text= '', content= {}, content_type= '', user= False):
    data = {
        'text':text,
        'user': user,
        'content': content,
        'content_type': content_type
    }
    return data


class Handler(abc.ABC):
    """
    Class That Represents the handlers of messages.
    Every Handler should have a next(s) handler(s) or just a empty return.
    """
    def __init__(self) -> None:
        super().__init__()
        self.next_handlers: list[MessageHandler] = []


class MessageHandler(Handler):
    """Class that process a message on the server."""
    @abc.abstractmethod
    def process_message(self, content, response_objt):
        print('receiving content: ', content, '- in ', self.__str__())
        """Method that process the message or pass to the next handlers"""
        pass

class BaseMessageHandler(Handler):
    def receive_message(self, data):
        """Receive the message data and send it to next handlers"""
        print("Receiving Message...")
        for handler in self.next_handlers:
            response_objt = build_response_data()
            text = handler.process_message(
                content=data,
                response_objt=response_objt
                )
            if type(text) != bool:
                print('Response returned -> ', text)
                return text
            else:
                pass
        print('ERROR - No response found ')
        response_objt['content_type'] = 'no_response_found'
        response_objt['text'] = NO_PROCESSED_MESSAGE_RESPONSE
        return response_objt


class CumprimentHandler(MessageHandler):
    def __init__(self) -> None:
        super().__init__()
    
    def process_message(self, content, response_objt):
        super().process_message(content, response_objt)
        if 'hello'.capitalize() in content['text'].capitalize():
            response_objt['text'] = CUMPRIMENT_RESPONSE
            response_objt['content_type'] = 'cumpriment'
            return response_objt
        else:
            return False


class AnalyseHandler(MessageHandler):
    def __init__(self) -> None:
        super().__init__()
    
    def process_message(self, content, response_objt):
        super().process_message(content, response_objt)
        if 'analyse'.capitalize() in content['text'].capitalize():
            response_objt['text'] = ANALYSE_RESPONSE
            response_objt['content_type'] = 'analyse'
            return self.build_message(content, response_objt)
        else:
            return False
        
    def build_message(self, content, response_objt):
        """Build the messages and return"""
        if 'http' in content['text']:
            url = self.format_url(content)
            soup = get_from_url(url)
            return self.make_verifications(soup, response_objt)
        else:
            response_objt['text'] += 'Please provide a valid link, i could not find'
            return response_objt
    
    def make_verifications(self, soup, response_objt):
        """Make Soup Verifications"""
        if not soup: return self.build_no_soup_response(response_objt)
        return self.build_soup_response(soup, response_objt)

    def build_soup_response(self, soup, response_objt):
        """Use BeautifullSoup object to format the text"""
        response_objt['text'] += f'Here is it ;)  \n\n'
        response_objt['content']['title'] = f"{soup.title.contents}"
        response_objt['content']['lang'] = f"{soup.html.attrs['lang']}"
        response_objt['content']['links'] = separate_all_links(get_all_links(soup))
        return response_objt

    def build_no_soup_response(self, response_objt):
        """Return a 'error text' in text field"""
        response_objt['text'] += 'I couldnt analyse that link, maybe the server is down ?'
        return response_objt

    def format_url(self, content):
        """Method that find and format url in the message"""
        http_location = content['text'].find('http')
        formated_http = content['text'][http_location::]
        space_index = formated_http.find(' ')
        if space_index == -1:
            return formated_http
        return formated_http[:space_index]


class WhoIamAmHandler(MessageHandler):
    def __init__(self) -> None:
        super().__init__()

    def process_message(self, content, response_objt):
        super().process_message(content, response_objt)
        if 'who are you'.capitalize() in content['text'].capitalize():
            response_objt['text'] = WHO_IAM
            response_objt['content_type'] = 'who_i_am'
            response_objt['content']['respository_link'] = "https://github.com/Jason21tod/scrap-bot"
            return response_objt
        else:
            return False
        
