/**
 * Palavra que aparece "selecionada", como se alguém tivesse arrastado o
 * clique esquerdo por cima dela. A tarja verde varre da esquerda para a
 * direita uma vez, ao carregar.
 *
 * São duas cópias empilhadas: a de baixo é o texto normal; a de cima, já
 * destacada, é revelada por clip-path. Sem JavaScript.
 */
export default function Selecao({ children }: { children: string }) {
  return (
    <span className="relative inline-block whitespace-nowrap">
      <span>{children}</span>
      <span className="selecao-tarja" aria-hidden="true">
        {children}
      </span>
    </span>
  );
}
