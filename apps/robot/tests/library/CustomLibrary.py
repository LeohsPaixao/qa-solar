from urllib.parse import urlparse

class CustomLibrary:
    def __init__(self):
        pass

    def parse_url(self, url):
        """Analisa uma URL e retorna os componentes como um objeto ParseResult."""
        parsed_url = urlparse(url)
        return parsed_url
    
    def get_from_list(self, lst, index):
        """Retorna o elemento da lista no índice especificado."""
        return lst[index]

    def get_list_length(self, lst):
        """Retorna o comprimento da lista."""
        return len(lst)
