const NextFederationPlugin = require('@module-federation/nextjs-mf/lib/NextFederationPlugin');

module.exports = {
  webpack(config, options) {
    if (!options.isServer) {
      config.plugins.push(
        new NextFederationPlugin({
          name: 'remote',
          remotes: {
            app3: `app3@${getRemoteEntryUrl(3003)}`,
            federated_styles: `federated_styles@${getRemoteEntryUrl(3004)}`,
          },
          filename: 'static/chunks/remoteEntry.js',
          exposes: {
            './nextjs-remote-component': './components/nextjs-remote-component.js',
            './nextjs-remote-page': './pages/index.js',
          },
          shared: {
            react: {
              requiredVersion: false,
              singleton: true,
            },
          },
          extraOptions: {
            skipSharingNextInternals: true,
          },
        }),
      );
    }
    return config;
  },
  // your original next.config.js export
  reactStrictMode: true,
};

function getRemoteEntryUrl(port) {
    const { CODESANDBOX_SSE, HOSTNAME = '' } = process.env;

    // Check if the example is running on codesandbox
    // https://codesandbox.io/docs/environment
    if (!CODESANDBOX_SSE) {
        return `//localhost:${port}/remoteEntry.js`;
    }

    const parts = HOSTNAME.split('-');
    const codesandboxId = parts[parts.length - 1];

    return `//${codesandboxId}-${port}.sse.codesandbox.io/remoteEntry.js`;
}
