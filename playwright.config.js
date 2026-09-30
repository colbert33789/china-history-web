module.exports = {
  testDir: './tests',
  testMatch: 'e2e.spec.js',
  timeout: 30000,
  retries: 1,
  reporter: [['list']],
  use: {
    baseURL: 'http://localhost:8000',
    viewport: { width: 1440, height: 900 },
    screenshot: 'only-on-failure',
    // 本机浏览器缺系统库时，通过 PW_LIBS 指定补丁库目录（只作用于浏览器进程）
    launchOptions: process.env.PW_LIBS
      ? { env: { ...process.env, LD_LIBRARY_PATH: process.env.PW_LIBS } }
      : {},
  },
  webServer: {
    command: 'python3 -m http.server 8000',
    url: 'http://localhost:8000',
    reuseExistingServer: true,
    timeout: 15000,
  },
};
