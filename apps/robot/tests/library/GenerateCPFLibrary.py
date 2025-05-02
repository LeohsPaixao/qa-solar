import random

class GenerateCPFLibrary:
    def generate_valid_cpf(self):
        """Gera um CPF válido aleatório."""
        def calculate_digit(cpf):
            weights = range(len(cpf) + 1, 1, -1)
            total = sum(int(digit) * weight for digit, weight in zip(cpf, weights))
            remainder = total % 11
            return str(11 - remainder if remainder > 1 else 0)

        cpf_base = [random.randint(0, 9) for _ in range(9)]
        cpf_base.append(int(calculate_digit(cpf_base)))
        cpf_base.append(int(calculate_digit(cpf_base)))
        return "".join(map(str, cpf_base))
