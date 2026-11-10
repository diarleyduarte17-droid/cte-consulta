export type Cte = {
  chave: string;
  numero: string;
  emitidaEm: string;
  emitente: { nome: string; cnpj: string };
  tomador?: { nome: string; cnpj: string };
  notasVinculadas: string[];
  valorTotal?: number;
};

const digitos = (valor: string) => valor.replace(/\D/g, "");

export function normalizarCte(input: Cte): Cte {
  const chave = digitos(input.chave);
  if (chave.length !== 44) throw new Error("Chave do CT-e deve ter 44 dígitos.");
  return {
    ...input,
    chave,
    emitente: { ...input.emitente, cnpj: digitos(input.emitente.cnpj) },
    tomador: input.tomador && { ...input.tomador, cnpj: digitos(input.tomador.cnpj) },
    notasVinculadas: [...new Set(input.notasVinculadas.map(digitos).filter((chaveNfe) => chaveNfe.length === 44))],
  };
}

export function filtrarCtes(ctes: Cte[], busca: string): Cte[] {
  const termo = busca.trim().toLowerCase();
  const numeros = digitos(busca);
  return ctes.filter((cte) => {
    const texto = [cte.numero, cte.emitente.nome, cte.tomador?.nome].filter(Boolean).join(" ").toLowerCase();
    return texto.includes(termo)
      || (numeros.length >= 8 && [cte.chave, cte.emitente.cnpj, cte.tomador?.cnpj, ...cte.notasVinculadas].some((v) => v?.includes(numeros)));
  });
}
