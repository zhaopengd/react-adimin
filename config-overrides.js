// const {override, fixBabelImports} = require('customize-cra');
// module.exports = override(
//     fixBabelImports('import', {//配置 bable-plugin-import
//       libraryName: 'antd',  //针对antd
//       libraryDirectory: 'es', //源码文件夹中的es文件夹
//       style: 'css',//自动打包相关的css
//     }),
//   );

const {override, fixBabelImports, addLessLoader} = require('customize-cra');

module.exports = override(
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: true,
  }),
  addLessLoader({
    javascriptEnabled: true,
    modifyVars: {'@primary-color': '#1DA57A'},
  }),
);