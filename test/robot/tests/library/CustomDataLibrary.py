from faker import Faker

class CustomDataLibrary:
    def __init__(self):
        self.faker = Faker("pt_BR")
    
    def generate_full_name(self):
        return self.faker.name()
    
    def generate_first_name(self):
        return self.faker.first_name()

    def generate_email(self):
        return self.faker.email()

    def generate_phone(self):
        return '(12) 9 8888-7777'
