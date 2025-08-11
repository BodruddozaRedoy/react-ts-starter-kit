# React TypeScript Starter Kit

A modern CLI tool that generates a complete Vite React TypeScript project structure with pre-written components and configuration files. This package helps you quickly set up a new React project with Vite, TypeScript, modern best practices and popular libraries.

## Features

- 🚀 **Quick Setup**: Generate a complete React TypeScript project in seconds
- ⚙️ **Modern Stack**: Built with Vite, React 19, TypeScript, and ESLint
- 📁 **Organized Structure**: Well-organized folder structure following React best practices
- 🎨 **Modern UI**: Pre-built components with responsive design using tailwind
- 📝 **Code Quality**: Modern ESLint configuration with TypeScript support
- 🔧 **Multiple Options**: Support for Redux Toolkit, React Router, React Icons
- 🏗️ **Scalable Architecture**: Ready for large-scale applications

## Installation

### Global Installation (Recommended)

```bash
npm install -g react-ts-starter-kit
```

### Local Installation

```bash
npm install react-ts-starter-kit
```

## Usage

### Basic Usage

```bash
npx create-vite-react my-app
```

This will start an interactive CLI that asks for your preferences.

### Quick Setup (Skip Prompts)

```bash
create-vite-react my-app --yes
```

This will use default settings and create the project immediately.

### Available Options

The CLI will ask you about the following options:

- **TypeScript**: Add TypeScript support to your project (enabled by default)
- **React Router**: Include React Router for navigation
- **Redux Toolkit**: Include Redux Toolkit for state management
- **Package Manager**: Choose between npm, yarn, or pnpm

## Generated Project Structure

```
my-app/
├── index.html
├── src/
│   ├── components/
│   │   ├── common/
│   │   └── layout/
│   │       ├── Navbar.tsx
│   │       └── Footer.tsx
│   ├── pages/
│   │   └── Home/
│   │       └── HomePage.tsx
│   ├── layouts/
│   ├── lib/
│   ├── hooks/
│   ├── utils/
│   ├── routes/
│   ├── services/
│   ├── types/
│   ├── assets/
│   │   ├── images/
│   │   └── styles/
│   ├── redux/          # (if Redux is selected)
│   │   ├── store.ts
│   │   └── features/
│   │       └── counter/
│   │           └── counterSlice.ts
│   ├── App.tsx
│   ├── main.tsx
│   ├── index.css
│   └── vite-env.d.ts
├── package.json
├── README.md
├── .gitignore
├── .env
├── eslint.config.js
├── vite.config.ts
├── tsconfig.json
├── tsconfig.app.json
└── tsconfig.node.json
```

## Pre-built Components

The generator creates several pre-built components:

### Navbar Component
- Responsive navigation bar
- Modern TypeScript implementation
- Clean, professional design

### Footer Component
- Fixed footer with copyright information
- Professional styling

### Home Page
- Welcome message
- Clean layout with proper spacing
- TypeScript-ready structure

## Available Scripts

Once your project is created, you can run:

```bash
cd my-app
npm install
npm run dev        # Start development server
npm run build      # Build for production
npm run preview    # Preview production build
npm run lint       # Run ESLint
```

## Included Features

The generated project comes with:

- ✅ **React 19** - Latest React with modern features
- ✅ **TypeScript** - Full TypeScript support with strict mode
- ✅ **Vite** - Lightning-fast build tool and dev server
- ✅ **ESLint** - Modern flat config with React and TypeScript rules
- ✅ **React Icons** - Beautiful icon library included
- ✅ **Organized Structure** - Scalable folder architecture
- ✅ **Redux Toolkit** - State management (optional)
- ✅ **React Router** - Client-side routing (optional)

## Configuration Files

The generator includes several configuration files:

### ESLint Configuration
- Modern flat config format
- React-specific rules with hooks
- TypeScript support
- React Refresh support for Vite

### TypeScript Configuration
- Strict mode enabled
- React JSX support
- Modern ES2022+ features
- Separate configs for app and node
- Bundler mode for optimal performance

### Vite Configuration
- React plugin
- Development server on port 3000
- Source maps for debugging
- Optimized build output

## Examples

### Create a TypeScript + Redux Project

```bash
create-vite-react my-ts-redux-app
# Select: TypeScript ✅, Redux ✅, Router ✅
```

### Create a Simple TypeScript Project

```bash
create-vite-react my-simple-app
# Select: TypeScript ✅, Redux ❌, Router ✅
```

### Create a Full-Stack Ready Project

```bash
create-vite-react my-fullstack-app
# Select: TypeScript ✅, Redux ✅, Router ✅
```

## Customization

### How to Customize the Boilerplate Generator

If you want to modify the boilerplate generator itself (add new files, change templates, etc.), here's how:

#### 1. **Add New Components**
Edit `src/templates.js` and add new template functions:

```javascript
function getNewComponent(options) {
  const reactImport = options.useTypeScript ? 'import React from "react";' : '';
  
  return `${reactImport}

function NewComponent() {
  return (
    <div>
      <h1>New Component</h1>
    </div>
  );
}

export default NewComponent;`;
}
```

Then add it to the exports and include it in `src/generator.js`.

#### 2. **Add New Configuration Files**
Create new template functions and add them to the files array in `src/generator.js`:

```javascript
files.push({
  path: 'new-config.js',
  content: getNewConfig(options)
});
```

#### 3. **Add New Dependencies**
Modify the `getPackageJson` function in `src/templates.js`:

```javascript
if (options.useNewFeature) {
  dependencies["new-package"] = "^1.0.0";
}
```

#### 4. **Add New CLI Options**
Edit `bin/create-react-boilerplate.js` to add new prompts:

```javascript
{
  type: 'confirm',
  name: 'useNewFeature',
  message: 'Would you like to include New Feature?',
  default: false
}
```

### Customizing Generated Projects

After generating your project, you can:

1. **Modify Components**: Edit the pre-built components in `src/components/layout/`
2. **Add Pages**: Create new pages in `src/pages/`
3. **Customize Styles**: Modify `src/index.css`
4. **Add Dependencies**: Install additional packages as needed
5. **Configure Vite**: Modify `vite.config.ts` for build customization
6. **Add Redux Features**: Create new slices in `src/redux/features/`
7. **Add Services**: Create API services in `src/services/`
8. **Add Types**: Define TypeScript types in `src/types/`

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

If you encounter any issues or have questions, please:

1. Check the [Issues](https://github.com/yourusername/react-boilerplate-generator/issues) page
2. Create a new issue with detailed information
3. Include your Node.js version and operating system

## Changelog

### Version 1.0.2
- Updated to React 19 and latest dependencies
- Modern TypeScript configuration with separate app/node configs
- Updated ESLint to flat config format
- Improved project structure with better organization
- Added React Icons support
- Removed testing setup (can be added manually if needed)

## Learn More

You can learn more in the [Vite documentation](https://vitejs.dev/).

To learn React, check out the [React documentation](https://react.dev/).

For TypeScript, visit the [TypeScript documentation](https://www.typescriptlang.org/).

---

**Happy Coding! 🎉** 