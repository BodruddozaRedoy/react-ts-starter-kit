const fs = require('fs-extra');
const path = require('path');
const { 
  getPackageJson, 
  getTsConfig, 
  getViteConfig,
  getVitestConfig,
  getEslintConfig,
  // getPrettierConfig,
  getGitignore,
  getReadme,
  getIndexHtml,
  getAppComponent,
  getIndexComponent,
  getHomeComponent,
  // getAboutComponent,
  getNavbarComponent,
  getFooterComponent,
  getGlobalStyles,
  getStoreConfig,
  getSliceExample,
  getTestExample,
  // getEnvironmentData
} = require('./templates');

async function generateBoilerplate(projectName, options) {
  const projectPath = path.resolve(process.cwd(), projectName);
  
  // Create project directory
  await fs.ensureDir(projectPath);
  
  // Create directory structure
  const directories = [
    'src',
    'src/components',
    'src/components/common',
    'src/components/layout',
    'src/pages',
    'src/pages/Home',
    'src/layouts',
    'src/lib',
    'src/hooks',
    'src/utils',
    'src/routes',
    'src/services',
    'src/types',
    'src/assets',
    'src/assets/images',
    'src/assets/styles',
    'public'
  ];

  if (options.useRedux) {
    directories.push('src/redux');
    directories.push('src/redux/features');
    directories.push('src/redux/features/counter');
  }

  if (options.useTesting) {
    directories.push('src/__tests__');
  }

  for (const dir of directories) {
    await fs.ensureDir(path.join(projectPath, dir));
  }

  // Generate files
  const files = [
    {
      path: 'package.json',
      content: getPackageJson(projectName, options)
    },
    {
      path: 'README.md',
      content: getReadme(projectName, options)
    },
    {
      path: '.gitignore',
      content: getGitignore()
    },
    {
      path: 'index.html',
      content: getIndexHtml(projectName)
    },
    {
      path: 'src/main.tsx',
      content: getIndexComponent(options)
    },
    {
      path: 'src/App.tsx',
      content: getAppComponent(options)
    },
    {
      path: 'src/vite-env.d.ts',
      content: `/// <reference types="vite/client" />`
    },
    {
      path: 'src/components/layout/Navbar.tsx',
      content: getNavbarComponent(options)
    },
    {
      path: 'src/components/layout/Footer.tsx',
      content: getFooterComponent(options)
    },
    {
      path: 'src/pages/Home/HomePage.tsx',
      content: getHomeComponent(options)
    },
    // {
    //   path: 'src/pages/About.js',
    //   content: getAboutComponent(options)
    // },
    {
      path: 'src/index.css',
      content: getGlobalStyles()
    },
    {
      path: '.env',
      content: ""
    }
  ];

  // Add Vite configuration
  files.push({
    path: 'vite.config.ts',
    content: getViteConfig(options)
  });

  // Add TypeScript configuration if selected
  if (options.useTypeScript) {
    files.push({
      path: 'tsconfig.json',
      content: getTsConfig()
    });
    
    files.push({
      path: 'tsconfig.node.json',
      content: JSON.stringify({
        compilerOptions: {
          tsBuildInfoFile: "./node_modules/.tmp/tsconfig.node.tsbuildinfo",
          target: "ES2023",
          lib: ["ES2023"],
          module: "ESNext",
          skipLibCheck: true,
      
          // Bundler mode
          moduleResolution: "bundler",
          allowImportingTsExtensions: true,
          verbatimModuleSyntax: true,
          moduleDetection: "force",
          noEmit: true,
      
          // Linting
          strict: true,
          noUnusedLocals: true,
          noUnusedParameters: true,
          erasableSyntaxOnly: true,
          noFallthroughCasesInSwitch: true,
          noUncheckedSideEffectImports: true
        },
        include: ["vite.config.ts"]
      }, null, 2)
    });
    files.push({
      path: 'tsconfig.app.json',
      content: JSON.stringify({
        compilerOptions: {
          tsBuildInfoFile: "./node_modules/.tmp/tsconfig.app.tsbuildinfo",
          target: "ES2022",
          useDefineForClassFields: true,
          lib: ["ES2022", "DOM", "DOM.Iterable"],
          module: "ESNext",
          skipLibCheck: true,
      
          // Bundler mode
          moduleResolution: "bundler",
          allowImportingTsExtensions: true,
          verbatimModuleSyntax: true,
          moduleDetection: "force",
          noEmit: true,
          jsx: "react-jsx",
      
          // Linting
          strict: true,
          noUnusedLocals: true,
          noUnusedParameters: true,
          erasableSyntaxOnly: true,
          noFallthroughCasesInSwitch: true,
          noUncheckedSideEffectImports: true
        },
        include: ["src"]
      }, null, 2)
    });
  }

  // Add Redux files if selected
  if (options.useRedux) {
    files.push({
      path: 'src/redux/store.ts',
      content: getStoreConfig(options)
    });
    files.push({
      path: 'src/redux/features/counter/counterSlice.ts',
      content: getSliceExample(options)
    });
  }

  // Add testing files if selected
  // if (options.useTesting) {
  //   files.push({
  //     path: 'vitest.config.js',
  //     content: getVitestConfig(options)
  //   });
  //   files.push({
  //     path: 'src/__tests__/App.test.js',
  //     content: getTestExample(options)
  //   });
  //   files.push({
  //     path: 'src/setupTests.js',
  //     content: `import '@testing-library/jest-dom';`
  //   });
  // }

  // Add configuration files
  files.push({
    path: 'eslint.config.js',
    content: getEslintConfig(options)
  });
  // files.push({
  //   path: '.prettierrc',
  //   content: getPrettierConfig()
  // });

  // Write all files
  for (const file of files) {
    const filePath = path.join(projectPath, file.path);
    await fs.ensureDir(path.dirname(filePath));
    await fs.writeFile(filePath, file.content);
  }

  console.log(`Created ${files.length} files in ${projectName}/`);
}

module.exports = {
  generateBoilerplate
}; 