Installation Steps
    Initialize Node 
       Initialize Node with command "npm init"
    
    Installe and configure Prettier in dev 
        Command: npm i --save-dev prettier
        Config File: adding .prettierrc file that contain this object 
            {
                "semi": true,
                "singleQuote": true
            } 

        Script: Modify package.json in scripts object add this script 
            "prettier": "prettier --config .prettierrc dist/**/*.js --write"

    Installe and configure ESLint, ESlint Config Prettier and ESLint Prettier Plugin in dev 
        Commands: 
            npm i --save-dev eslint
            npm i --save-dev eslint-config-prettier
            npm i --save-dev eslint-plugin-prettier
        Config File: adding .eslintrc file that contain this object
            {
                "parserOptions": {
                    "ecmaVersion": "latest"
                },
                "env": {
                    "es6": true
                },    
                "rules": {
                    "semi": ["error", "always"],
                    "quotes": ["error", "double"]
                }
            }
    
        Scripts: Modify package.json in scripts object add
        "lint": "eslint dist/**/*.js",
        "lintf": "eslint dist/**/*.js --fix"

        Notes: if you execuite npm run prettier or npm run lint or npm run lintf will not work now because no dist yet

    Install and configure typescript
        Commands:
            npm i --save-dev typescript
            npm i --save-dev ts-node
            npm i --save-dev @types/node
            npx tsc --init

        tsconig: 
                {
                    "compilerOptions": {    
                        "target": "ES6",
                        "lib": ["ES6"],
                        "rootDir": "./src",
                        "outDir": "./dist",
                        "esModuleInterop": true,
                        "strict": true,
                        "noImplicitAny": true,
                    },"exclude": [
                        "node_modules"
                    ]
                }

not completed and missing steps
@todo         