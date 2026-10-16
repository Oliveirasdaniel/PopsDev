// Validação dos dados do checkout. Usada no formulário (para avisar
// antes de enviar) e de novo na rota da API (que é a que vale).

export const soDigitos = (v: string) => v.replace(/\D/g, "");

/** Confere os dois dígitos verificadores do CPF. */
export function cpfValido(valor: string) {
  const cpf = soDigitos(valor);
  if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) return false;

  const digito = (ate: number) => {
    let soma = 0;
    for (let i = 0; i < ate; i++) soma += Number(cpf[i]) * (ate + 1 - i);
    const resto = (soma * 10) % 11;
    return resto === 10 ? 0 : resto;
  };
  return digito(9) === Number(cpf[9]) && digito(10) === Number(cpf[10]);
}

/** DDD + número, com ou sem o 9: 10 ou 11 dígitos. */
export const telefoneValido = (v: string) => /^\d{10,11}$/.test(soDigitos(v));

export const emailValido = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());

export type DadosCheckout = { plano: string; nome: string; email: string; cpf: string; telefone: string };

/** Devolve o primeiro problema encontrado, ou `null` se está tudo certo. */
export function problemaNosDados(d: Partial<DadosCheckout>): string | null {
  if (!d.nome || d.nome.trim().split(/\s+/).length < 2) return "Informe nome e sobrenome.";
  if (!d.email || !emailValido(d.email)) return "E-mail inválido.";
  if (!d.cpf || !cpfValido(d.cpf)) return "CPF inválido.";
  if (!d.telefone || !telefoneValido(d.telefone)) return "Telefone inválido. Use DDD + número.";
  return null;
}
