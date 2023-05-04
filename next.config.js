module.exports = {
    reactStrictMode: true,
    env: {
      BASE_URL: process.env.BASE_URL,
    },
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'm.media-amazon.com',
          port: '',
          pathname: '/images/**',
        }
      ]
    }
  }