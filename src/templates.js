function getPackageJson(projectName, options) {
  const dependencies = {
    "react": "^19.1.0",
    "react-dom": "^19.1.0",
    "react-icons": "^5.5.0",
    "tailwindcss": "^4.1.11",
    "@tailwindcss/vite": "^4.1.11",
  };

  const devDependencies = {
    "@eslint/js": "^9.32.1",
    "@types/react": "^19.1.9",
    "@types/react-dom": "^19.1.7",
    "@vitejs/plugin-react": "^4.7.0",
    "eslint": "^9.32.0",
    "eslint-plugin-react-hooks": "^5.2.0",
    "eslint-plugin-react-refresh": "^0.4.20",
    "globals": "^16.3.0",
    "vite": "^7.1.0",
  };

  if (options.useRouter) {
    dependencies["react-router-dom"] = "^7.8.0";
  }

  // if (options.useStyledComponents) {
  //   dependencies["styled-components"] = "^5.3.9";
  // }

  if (options.useRedux) {
    dependencies["@reduxjs/toolkit"] = "^2.8.2";
    dependencies["react-redux"] = "^9.2.0";
  }

  if (options.useTypeScript) {
    devDependencies["@types/react"] = "^19.1.9";
    devDependencies["@types/react-dom"] = "^19.1.7";
    devDependencies["typescript"] = "^5.8.3";
    devDependencies["typescript-eslint"] = "^8.39.0";
  }

  // if (options.useTesting) {
  //   devDependencies["@testing-library/jest-dom"] = "^5.16.5";
  //   devDependencies["@testing-library/react"] = "^13.4.0";
  //   devDependencies["@testing-library/user-event"] = "^14.4.3";
  //   devDependencies["vitest"] = "^0.30.0";
  //   devDependencies["jsdom"] = "^21.1.0";
  // }

  return JSON.stringify(
    {
      name: projectName,
      version: "0.0.0",
      private: true,
      dependencies,
      devDependencies,
      scripts: {
        dev: "vite",
        build: "vite build",
        preview: "vite preview",
        lint: "eslint .",
      },
    },
    null,
    2
  );
}

function getTsConfig() {
  return JSON.stringify(
    {
      files: [],
      references: [
        { path: "./tsconfig.app.json" },
        { path: "./tsconfig.node.json" },
      ],
    },
    null,
    2
  );
}

function getViteConfig(options) {
  return `import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
})`;
}

// function getVitestConfig(options) {
//   return `import { defineConfig } from 'vitest/config'
// import react from '@vitejs/plugin-react'

// export default defineConfig({
//   plugins: [react()],
//   test: {
//     environment: 'jsdom',
//     setupFiles: ['./src/setupTests.js'],
//     globals: true
//   }
// })`;
// }

function getEslintConfig(options) {
  return `
    import js from '@eslint/js'
    import globals from 'globals'
    import reactHooks from 'eslint-plugin-react-hooks'
    import reactRefresh from 'eslint-plugin-react-refresh'
    import tseslint from 'typescript-eslint'
    import { globalIgnores } from 'eslint/config'

    export default tseslint.config([
      globalIgnores(['dist']),
      {
        files: ['**/*.{ts,tsx}'],
        extends: [
          js.configs.recommended,
          tseslint.configs.recommended,
          reactHooks.configs['recommended-latest'],
          reactRefresh.configs.vite,
        ],
        languageOptions: {
          ecmaVersion: 2020,
          globals: globals.browser,
        },
      },
    ])

  `;
}

// function getPrettierConfig() {
//   return JSON.stringify(
//     {
//       semi: true,
//       trailingComma: "es5",
//       singleQuote: true,
//       printWidth: 80,
//       tabWidth: 2,
//       useTabs: false,
//     },
//     null,
//     2
//   );
// }

function getGitignore() {
  return `# See https://help.github.com/articles/ignoring-files/ for more about ignoring files.

# dependencies
/node_modules
/.pnp
.pnp.js

# testing
/coverage

# production
/build

# misc
.DS_Store
.env.local
.env.development.local
.env.test.local
.env.production.local

npm-debug.log*
yarn-debug.log*
yarn-error.log*

# IDE
.vscode/
.idea/
*.swp
*.swo

# OS
Thumbs.db`;
}

function getReadme(projectName, options) {
  return `# ${projectName}

This project was created with React Boilerplate Generator.

## Available Scripts

In the project directory, you can run:

### \`npm start\`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### \`npm test\`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### \`npm run build\`

Builds the app for production to the \`build\` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Project Structure

\`\`\`
src/
├── components/     # Reusable components
├── pages/         # Page components
├── hooks/         # Custom React hooks
├── utils/         # Utility functions
├── assets/        # Static assets (images, styles)
${options.useRedux ? "├── store/         # Redux store and slices\n" : ""}${
    options.useTesting ? "└── __tests__/      # Test files\n" : ""
  }
\`\`\`

## Features Included

${options.useTypeScript ? "- ✅ TypeScript support\n" : ""}${
    options.useRouter ? "- ✅ React Router for navigation\n" : ""
  }${
    options.useStyledComponents ? "- ✅ Styled Components for styling\n" : ""
  }${options.useRedux ? "- ✅ Redux Toolkit for state management\n" : ""}${
    options.useTesting
      ? "- ✅ Jest and React Testing Library for testing\n"
      : ""
  }

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
`;
}

function getIndexHtml(projectName) {
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Vite + React + TS</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
`;
}

function getIndexComponent(options) {
  const reactImport = options.useTypeScript ? 'import React from "react";' : "";

  return `${reactImport}
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
`;
}

function getAppComponent(options) {
  return `
  export default function App() {
  return (
    <div>App</div>
  )
}
  `;
}

function getNavbarComponent(options) {
  const reactImport = options.useTypeScript ? 'import React from "react";' : "";
  const routerImport = options.useRouter
    ? 'import { Link } from "react-router-dom";'
    : "";
  const styledImport = options.useStyledComponents
    ? 'import styled from "styled-components";'
    : "";

  const linkComponent = options.useRouter ? "Link" : "a";
  const linkProps = options.useRouter ? "to" : "href";

  return `${reactImport}
${routerImport}
${styledImport}

function Navbar() {
  return (
    <nav style={{
      backgroundColor: "#333",
      padding: "1rem",
      color: "white"
    }}>
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        maxWidth: "1200px",
        margin: "0 auto"
      }}>
        <h1 style={{ margin: 0 }}>My App</h1>
        <ul style={{
          display: "flex",
          listStyle: "none",
          margin: 0,
          padding: 0,
          gap: "2rem"
        }}>
          <li>
            <${linkComponent} ${linkProps}="/" style={{ color: "white", textDecoration: "none" }}>
              Home
            </${linkComponent}>
          </li>
          <li>
            <${linkComponent} ${linkProps}="/about" style={{ color: "white", textDecoration: "none" }}>
              About
            </${linkComponent}>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;`;
}

function getFooterComponent(options) {
  const reactImport = options.useTypeScript ? 'import React from "react";' : "";

  return `${reactImport}

function Footer() {
  return (
    <footer style={{
      backgroundColor: "#333",
      color: "white",
      textAlign: "center",
      padding: "1rem",
      position: "fixed",
      bottom: 0,
      width: "100%"
    }}>
      <p>&copy; 2024 My App. All rights reserved.</p>
    </footer>
  );
}

export default Footer;`;
}

function getHomeComponent(options) {
  const reactImport = options.useTypeScript ? 'import React from "react";' : "";

  return `${reactImport}

function Home() {
  return (
    <div style={{
      padding: "2rem",
      maxWidth: "1200px",
      margin: "0 auto",
      marginBottom: "80px"
    }}>
      <h1>Welcome to My App</h1>
      <p>This is the home page of your React application.</p>
      <p>Start building your amazing app!</p>
    </div>
  );
}

export default Home;`;
}

function getAboutComponent(options) {
  const reactImport = options.useTypeScript ? 'import React from "react";' : "";

  return `${reactImport}

function About() {
  return (
    <div style={{
      padding: "2rem",
      maxWidth: "1200px",
      margin: "0 auto",
      marginBottom: "80px"
    }}>
      <h1>About</h1>
      <p>This is the about page of your React application.</p>
      <p>Learn more about your project here.</p>
    </div>
  );
}

export default About;`;
}

function getGlobalStyles() {
  return `
    @import "tailwindcss";
  `;
}

function getStoreConfig(options) {
  return `import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './features/counter/counterSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;`;
}

function getSliceExample(options) {
  return `import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: 0,
};

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    },
  },
});

export const { increment, decrement, incrementByAmount } = counterSlice.actions;
export default counterSlice.reducer;`;
}

function getTestExample(options) {
  return `import { render, screen } from '@testing-library/react';
import App from '../App';

test('renders welcome message', () => {
  render(<App />);
  const welcomeElement = screen.getByText(/Welcome to My App/i);
  expect(welcomeElement).toBeInTheDocument();
});`;
}

module.exports = {
  getPackageJson,
  getTsConfig,
  getViteConfig,
  // getVitestConfig,
  getEslintConfig,
  // getPrettierConfig,
  getGitignore,
  getReadme,
  getIndexHtml,
  getAppComponent,
  getIndexComponent,
  getHomeComponent,
  getAboutComponent,
  getNavbarComponent,
  getFooterComponent,
  getGlobalStyles,
  getStoreConfig,
  getSliceExample,
  getTestExample,
};
