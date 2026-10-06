/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

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
    ];
  },
};

export default nextConfig;
