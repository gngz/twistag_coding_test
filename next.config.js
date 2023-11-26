/**
 * Checks if the current environment matches the given environment.
 *
 * @param {('production' | 'development')} env - The environment to check against.
 * @return {boolean} Returns true if the current environment matches the given environment, false otherwise.
 */
function isEnvironment(env) {
  return process.env.NODE_ENV === env;
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  compress: process.env.COMPRESS ?? true,
  output: isEnvironment('production') ? 'standalone' : 'export',
};

module.exports = nextConfig;
