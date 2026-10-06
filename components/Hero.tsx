import Image from "next/image";
import escritorio from "@/public/hero/escritorio.jpg";

// Foto: Unsplash (photo-1556559322-b5071efadc88), licença livre.
export default function Hero() {
  return (
    <section
      id="topo"
      className="relative isolate flex min-h-[100svh] items-center overflow-hidden bg-verde-escuro text-creme"
    >
      <Image
        src={escritorio}
        alt=""
        fill
        priority
        sizes="100vw"
        placeholder="blur"
        className="-z-20 object-cover"
      />
      {/* Véu chapado, sem degradê: tinge a foto de verde e segura o
          contraste do título em qualquer ponto da imagem. */}
      <div className="absolute inset-0 -z-10 bg-verde-escuro/60" aria-hidden="true" />

      <div className="wrap pb-16 pt-32">
        {/* No celular o título quebra sozinho; do sm pra cima, a quebra é
            fixa em três linhas para "trazem" não ficar órfão. */}
        <h1 className="titulo-hero">
          <span className="sm:block">Sites e sistemas </span>
          <span className="sm:block">que trazem </span>
          <span className="text-verde-claro">resultados</span>
        </h1>
        <p className="mt-7 max-w-[44ch] text-[1.1rem] leading-relaxed text-creme/80 sm:text-[1.25rem]">
          Landing pages, agendamento e delivery próprio para quem vive de agenda e de pedido.
        </p>
      </div>
    </section>
  );
}
