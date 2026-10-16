/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,

  // Cabeçalhos de segurança em todas as respostas: o site não pode ser
  // embutido em iframe de outro domínio (clickjacking no checkout), o
  // navegador não "adivinha" tipo de arquivo e o endereço completo não
  // vaza para sites externos clicados daqui.
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Content-Security-Policy", value: "frame-ancestors 'none'; base-uri 'self'; form-action 'self'; object-src 'none'" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=()" },
        ],
      },
      // Respostas da API nunca ficam em cache (status de pagamento).
      { source: "/api/:path*", headers: [{ key: "Cache-Control", value: "no-store" }] },
    ];
  },

  // Atalho fácil de lembrar para o CRM (que roda na Heroku) enquanto
  // crm.popsdev.tech não está no DNS. Temporário (307): o destino muda
  // quando o subdomínio estiver no ar.
  async redirects() {
    return [
      {
        source: "/crm",
        destination: "https://popsdev-crm-883f15b6b477.herokuapp.com/entrar",
        permanent: false,
      },
      // Os planos viraram a seção da home; o endereço antigo continua valendo.
      { source: "/planos", destination: "/#planos", permanent: true },
    ];
  },
};

export default nextConfig;
