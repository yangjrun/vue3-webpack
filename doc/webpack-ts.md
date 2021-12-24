## webapck-ts开发


### typeScript配置
```
    1. npm包下载
    npm install ts-loader typescript --save-dev
    2. 初始化tsconfig.json
    tsc --init
    3.配置tsconfig.json文件
    {
        "compilerOptions": {
            // 指定ECMAScript目标版本 
            "target": "ESnext",
            // 指定生成哪个模块系统代码
            "module": "ESnext",
            // 启用所有严格类型检查选项
            "strict": true,
            // 从 tslib 导入辅助工具函数
            "importHelpers": true,
            // 决定如何处理模块。
            "moduleResolution": "node",
            // 启用实验性的ES装饰器。
            "experimentalDecorators": true,
            // 允许从没有设置默认导出的模块中默认导入。这并不影响代码的输出，仅为了类型检查。
            "allowSyntheticDefaultImports": true,
            "esModuleInterop": true,
            // 阻止 --noImplicitAny对缺少索引签名的索引对象报错。
            "suppressImplicitAnyIndexErrors": true,
            // 生成相应的 .map文件。
            "sourceMap": true,
            // 解析非相对模块名的基准目录。
            "baseUrl": ".",
            // 模块名到基于 baseUrl的路径映射的列表。
            "paths": {
            "@/*": [
                "src/*"
            ]
            },
            // 编译过程中需要引入的库文件的列表。
            "lib": [
            "esnext",
            "dom",
            ]
        },
        "include": [
            "src/**/*.ts",
        ],
        "exclude": [
            "node_modules",
        ]
    }
    4. 配置webpack ts-loader解析ts文件
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: "ts-loader",
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: [".ts", ".js"],
    }
```

### eslint和prettier校验

```
    1. eslint包下载
    cnpm install @babel/eslint-parser @typescript-eslint/parser eslint eslint-config-standard eslint-plugin-import eslint-plugin-node eslint-plugin-promise eslint-plugin-standard --save-dev
    2. prettier包下载
    cnpm install prettier --save-dev
    3. .eslintrc.js 配置
    module.exports = {
      root: true,
      parser: '@typescript-eslint/parser', // 解析一些最新的 es 语法
      parserOptions: {
        sourceType: 'module' // 模块为 ECMAScript 模块
      },

      extends: ['standard'], // 使用 standard 标准

      rules: {
        'space-before-function-paren': 0,
        'no-debugger': 'error', // 禁止在代码中使用     debugger
        quotes: ['error', 'single'], // 单引号
        semi: ['error', 'always'] // 代码需要以分号结尾
      }
    };
    4. .prettierrc.js 文件配置
    module.exports = {
      printWidth: 800, // 单行宽度限制
      tabWidth: 2, // tab 使用两个空格
      useTabs: false, // 不使用制表符缩进，使用空格缩进
      semi: true, // 代码需要分号结尾
      singleQuote: true, // 单引号
      bracketSpacing: true, // 对象左右两侧需要空格
      jsxBracketSameLine: false, // html 关闭标签换行
      arrowParens: 'avoid', // 单参数的箭头函数参数不需要括 号
      proseWrap: 'never', // 参考 https://prettier.io/  docs/en/options.html#prose-wrap
      trailingComma: 'none' // 参考 https://prettier.io/    docs/en/options.html#trailing-commas
    };

```