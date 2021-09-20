1. 这里使用 gulp 的必要性？

- 为了适应不同的应用环境

2. dist、es、lib 区别

- dist webpack 打包出来 ES5，可以直接在浏览器中使用
- es gulp 编译出来的 es6
- lib gulp 编译出来的 es5 代码

3. 为啥不能只用 webpack 要 gulp，为啥不用 rollup

- 样式用 gulp 编译更快，不用加密，可以只用 webpack

4. 为什么会使用 gulp 和 webpack？

- gulp 是为了执行工作流的，编译 lib 和 es 保留目录层级，便于按需家在。
- webpack 打包的，是打包 dist 目录的，bundle 的方案。不相干

5. ts-loader 好像不如 babel-loader
   不用 style-loader？ style-loader 是开发时用的，上线或者组件库不会 style-loader

6. 组件库一般需要做 polyfill 吗？
   看你兼容的环境
7.
