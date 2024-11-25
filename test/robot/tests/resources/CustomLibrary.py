from urllib.parse import urlparse

class CustomLibrary:
    def __init__(self):
        pass

    def parse_url(self, url):
        """Analisa uma URL e retorna os componentes como um objeto ParseResult."""
        parsed_url = urlparse(url)
        return parsed_url
