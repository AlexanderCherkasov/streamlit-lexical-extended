import { defineConfig, devices } from '@playwright/test'

const PORT = process.env.STREAMLIT_TEST_PORT ? Number(process.env.STREAMLIT_TEST_PORT) : 8599

export default defineConfig({
  testDir: './tests',
  fullyParallel: false,
  timeout: 60_000,
  expect: { timeout: 15_000 },
  use: {
    baseURL: `http://127.0.0.1:${PORT}`,
    trace: 'on-first-retry',
  },
  webServer: {
    command:
      "bash -lc 'cd frontend && npm run build && cd .. && ./venv/bin/python -m streamlit run example.py --server.port " +
      PORT +
      " --server.address 127.0.0.1 --server.headless true'",
    url: `http://127.0.0.1:${PORT}`,
    reuseExistingServer: !process.env.CI,
    cwd: __dirname + '/../',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
})
