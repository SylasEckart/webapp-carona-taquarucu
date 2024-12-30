
import withPWA from 'next-pwa';
// eslint-disable-next-line no-undef
const prod = process.env.NODE_ENV === 'production';

const config = withPWA({
  dest: 'public',
  disable: !prod,
  register: true,
  skipWaiting: true,
})({
  reactStrictMode: true,
});

export default config;
