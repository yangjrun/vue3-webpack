## webpack分包

```
    1. npm包下载
    cnpm install glob webpack-merge html-webpack-plugin --save-dev
    2. 新增总入口文件夹和分包文件夹
    entries
        page1
            index.html
            main.ts
        page2
            index.html
            main.ts
    2. 修改webpack entry 入口
    entry: () => {
      const entryFiles = glob.sync(path.resolve(__dirname, '../*'));
      const map = {};
      entryFiles.forEach(filePath => {
        const entryName = filePath.substring(filePath.lastIndexOf('/') + 1);
        map[entryName] = {
          import: filePath + '/main.ts',
          filename: entryName + '\\[name].[hash:7].js'
        };
      });
      return map;
    };
    3. plugins 新增html-webpack-plugin 插件


    plugins: [].concat(() => 
    {
      const entryFiles = glob.sync(ENTRIES_PATH + '/*');
      console.log('HTML_TEMPLATE_PATH', HTML_TEMPLATE_PATH);
      const entryHtmlPluginArray = [];
      entryFiles.forEach(filePath => {
        const entryName = filePath.substring(filePath.lastIndexOf('/') + 1);
        let conf = {
          template: HTML_TEMPLATE_PATH,
          filename: entryName + '\\index.html',
          chunks: [entryName],
          inject: true
        };
        // production 生产模式下配置
        if (process.env.NODE_ENV === 'production') {
          conf = merge(conf, {
            chunks: ['manifest', 'vendor'],
            minify: {
              removeComments: true,
              collapseWhitespace: true,
              removeAttributeQuotes: true
            },
            chunksSortMode: 'auto'
          });
        }
        entryHtmlPluginArray.push(new HtmlWebpackPlugin(conf));
      });
      return entryHtmlPluginArray;
    })
```