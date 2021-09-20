# AntDesign

## 1. 技术栈

- 框架 react
- 测试 jest+enzyme
- 检查 eslint
- 打包 webpack + gulp
- 文档 bisheng
- 钩子 Husky

## 2. 源码目录

- .husky git 钩子
- \_site 网站
- components 组件
- docs 文档
- dist 打包生成的文件
- es es6
- lib es5
- scripts 脚本
- site 组件预览项目
- tests 测试
- typing 类型定义

## 3. 内容

- webpack 配置
- storybook 文档和组件编写
- 单元测试+E2E 快照测试+ 代码覆盖率
- eslint + prettier + editorconfig
- git hook
- 编译发布
- 持续集成

# 一、创建项目

## 1. 创建文件夹

```shell
mkdir antd && cd antd
npm init -y
```

## 2. package.json

```json
{
  "name": "@gyh/antd",
  "version": "1.1.2",
  "description": "React组件库",
  "main": "lib/index.js",
  "module": "es/index.js",
  "unpkg": "dist/antd.js",
  "typings": "lib/index.d.ts",
  "files": ["dist", "es", "lib"],
  "scripts": {
    "build": "webpack",
    "storybook": "start-storybook -p 7006",
    "build-storybook": "build-storybook",
    "test:unit": "jest --config unit.jest.js",
    "test:e2e": "jest --config e2e.jest.js",
    "test": "npm run test:unit && npm run test:e2e",
    "compile": "gulp compile",
    "patch": "npm version patch"
  },
  "publishConfig": {
    "access": "public",
    "registry": "http://registry.npmjs.org"
  },
  "keywords": ["react", "Component"],
  "author": "guoyanhong",
  "license": "MIT",
  "dependencies": {
    "react": "^17.0.2",
    "react-dom": "^17.0.2"
  },
  "peerDependencies": {
    "react": "^17.0.2",
    "react-dom": "^17.0.2"
  },
  "devDependencies": {
    "@typescript-eslint/parser": "^4.31.1",
    "and": "^0.0.3",
    "eslint": "^7.32.0",
    "eslint-config-airbnb": "^18.2.1",
    "eslint-plugin-import": "^2.24.2",
    "eslint-plugin-jsx-a11y": "^6.4.1",
    "eslint-plugin-react": "^7.25.2",
    "eslint-plugin-react-hooks": "^4.2.0",
    "husky": "^7.0.2",
    "@babel/core": "^7.15.5",
    "@babel/plugin-transform-runtime": "^7.15.0",
    "@babel/plugin-transform-typescript": "^7.15.4",
    "@babel/preset-env": "^7.15.6",
    "@babel/preset-react": "^7.14.5",
    "@commitlint/cli": "^13.1.0",
    "@commitlint/config-conventional": "^13.1.0",
    "@storybook/addon-essentials": "^6.3.8",
    "@storybook/react": "^6.3.8",
    "@types/enzyme": "^3.10.9",
    "@types/jest": "^27.0.1",
    "@types/jest-environment-puppeteer": "^4.4.1",
    "@types/jest-image-snapshot": "^4.3.1",
    "@types/node": "^16.9.2",
    "@types/puppeteer": "^5.4.4",
    "@types/react": "^17.0.21",
    "@types/react-dom": "^17.0.9",
    "@wojtekmaj/enzyme-adapter-react-17": "^0.6.3",
    "autoprefixer": "^10.3.4",
    "babel-loader": "^8.2.2",
    "commitizen": "^4.2.4",
    "css-loader": "^6.2.0",
    "cz-customizable": "^6.3.0",
    "enzyme": "^3.11.0",
    "eslint-config-prettier": "^8.3.0",
    "eslint-plugin-prettier": "^4.0.0",
    "gulp": "^4.0.2",
    "gulp-babel": "^8.0.0",
    "gulp-typescript": "^6.0.0-alpha.1",
    "jest": "^27.2.0",
    "jest-environment-puppeteer": "^5.0.4",
    "jest-image-snapshot": "^4.5.1",
    "jest-puppeteer": "^5.0.4",
    "less": "^4.1.1",
    "less-loader": "^10.0.1",
    "merge2": "^1.4.1",
    "mini-css-extract-plugin": "^2.3.0",
    "postcss-loader": "^6.1.1",
    "prettier": "^2.4.1",
    "puppeteer": "^10.2.0",
    "rimraf": "^3.0.2",
    "typescript": "^4.4.3",
    "webpack": "^5.53.0",
    "webpack-cli": "^4.8.0"
  }
}
```

# 二、配置 webpack

## 2.1 安装依赖

```shell
yarn
```

## 2.2 webpack.config.js

```js
const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const cwd = process.cwd()

module.exports = {
  mode: 'development', //开发模式
  devtool: false, //关闭生成sourcemap
  entry: {
    antd: './index.js'
  },
  output: {
    path: path.resolve('dist'), //输出到dist目录
    filename: '[name].js', //打包后的文件 antd.css
    library: 'antd', //打包后库的名字
    libraryTarget: 'umd' //打包后模块的格式 umd amd cmd commonjs commonjs window
  },
  externals: {
    //组件库代码其实是不需要打包react 和react-dom进去的
    react: {
      //外部依赖
      root: 'React',
      commonjs2: 'react',
      commonjs: 'react',
      amd: 'react'
    },
    'react-dom': {
      root: 'ReactDOM',
      commonjs2: 'react-dom',
      commonjs: 'react-dom',
      amd: 'react-dom'
    }
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'] //指定扩展名
    // alias: {
    //     antdesign: cwd
    // }
  },
  module: {
    rules: [
      {
        test: /\.(j|t)sx?$/, //配置如何加载js ts jsx tsx
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader, //把这些CSS收集起来后面通过插件写入单独的antd.css
          {
            loader: 'css-loader', //处理@import和url
            options: {
              sourceMap: true
            }
          },
          {
            loader: 'postcss-loader', //加厂商前缀
            options: {
              postcssOptions: {
                plugins: ['autoprefixer']
              },
              sourceMap: true
            }
          }
        ]
      },
      {
        test: /\.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              sourceMap: true
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: ['autoprefixer']
              },
              sourceMap: true
            }
          },
          {
            loader: 'less-loader', //把less编译 成css
            options: {
              lessOptions: {
                javascriptEnabled: true
              },
              sourceMap: true
            }
          }
        ]
      },
      {
        //webpack5里file-loaer url-loader已经废弃 了
        test: /\.(png|jpg|jpeg|gif|svg)(\?v=\d+\.\d+\.\d+)?$/i,
        type: 'asset' //静态文件不再需要配置loader
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css'
    })
  ]
}
```

## 2.3 babel.config.js

```js
module.exports = {
  presets: [
    '@babel/preset-react',
    [
      '@babel/preset-env',
      {
        modules: 'auto',
        targets: {
          browsers: ['last 2 versions', 'Firefox ESR', '> 1%', 'ie >= 11']
        }
      }
    ]
  ],
  plugins: [
    [
      '@babel/plugin-transform-typescript',
      {
        isTSX: true
      }
    ],
    ['@babel/plugin-transform-runtime']
  ]
}
```

## 2.4 .gitignore

```gitignore
*.iml
.idea/
.ipr
.iws
*~
~*
*.diff
*.patch
*.bak
.DS_Store
Thumbs.db
.project
.*proj
.svn/
*.swp
*.swo
*.log
*.log.*
*.json.gzip
node_modules/
.buildpath
.settings
npm-debug.log
nohup.out
_site
_data
dist
report.html
/lib
/es
elasticsearch-*
config/base.yaml
/.vscode/
/coverage
yarn.lock
package-lock.json
components/**/*.js
components/**/*.jsx
!components/**/__tests__/**/*.js
!components/**/__tests__/**/*.js.snap
/.history
*.tmp

# Docs templates
site/theme/template/Color/ColorPicker.jsx
site/theme/template/IconDisplay/*.js
site/theme/template/IconDisplay/*.jsx
site/theme/template/IconDisplay/fields.js
site/theme/template/Home/**/*.jsx
site/theme/template/utils.jsx
site/theme/template/Layout/Footer.jsx
site/theme/template/Layout/Header/**/*.jsx
site/theme/template/Layout/SiteContext.jsx
site/theme/template/Content/Article.jsx
site/theme/template/Content/EditButton.jsx
site/theme/template/Resources/*.jsx
site/theme/template/Resources/**/*.jsx
site/theme/template/NotFound.jsx
scripts/previewEditor/index.html
components/version/version.tsx

# Image snapshot diff
__diff_output__/
__image_snapshots__/
/jest-stare
/imageSnapshots
/imageDiffSnapshots
storybook-static

sh.exe.stackdump
/snapshots
/diffSnapshots

```

## 2.5tsconfig.json

```json
{
  "compilerOptions": {
    "strictNullChecks": true,
    "module": "esnext",
    "moduleResolution": "node",
    "esModuleInterop": true,
    "experimentalDecorators": true,
    "jsx": "react",
    "noUnusedParameters": true,
    "noUnusedLocals": true,
    "noImplicitAny": true,
    "target": "es6",
    "lib": ["dom", "es2017"],
    "skipLibCheck": true,
    "types": ["node"]
  },
  "exclude": ["node_modules", "lib", "es"]
}
```

## 2.6 index.js

```js
module.exports = require('./components')
```

## 2.7 components\index.tsx

```tsx
import Button from './button'
export { ButtonProps } from './button'
export { Button }
```

## 2.8 button\index.tsx

```tsx
import Button from './button'
export default Button
export { ButtonProps } from './button'
```

## 2.9 button.tsx

```tsx
import React, { ButtonHTMLAttributes } from 'react'
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

const Button: React.FC<ButtonProps> = props => {
  const { children } = props
  return <button type='button'>{children}</button>
}

export default Button

// 如果你导出的是type，会保证在编译去掉
export { ButtonProps }
```

# 三、storybook

## 3.1 安装

```shell
yarn add @storybook/addon-essentials @storybook/react -D
```

## 3.2 storybook\main.js

```js
module.exports = {
  stories: [
    '../components/Introduction.stories.mdx',
    '../components/Install.stories.mdx',
    '../components/Components.stories.mdx',
    '../components/**/*.stories.mdx',
    '../components/**/*.stories.@(js|jsx|ts|tsx)'
  ],
  addons: ['@storybook/addon-essentials']
}
```

## 3.3 Introduction.stories.mdx

```mdx
<Meta title='开始/介绍' />

## Ant Design of React

antd 是基于 Ant Design 设计体系的 React UI 组件库，主要用于研发企业级中后台产品。
```

## 3.4 Install.stories.mdx

```mdx
<Meta title='开始/安装使用' />

## 安装

使用 npm 或 yarn 安装

## 浏览器引入

在浏览器中使用 script 和 link 标签直接引入文件，并使用全局变量 ant
我们在 npm 发布包内的 antd/dist 目录下提供了 antd.js

## 示例
```

## 3.5 Components.stories.mdx

```mdx
<Meta title='开始/组件总览' />

## 组件总览

antd 是基于 Ant Design 设计体系的 React UI 组件库，主要用于研发企业级中后台产品。

## 通用

- Button 按钮
- Icon 图标
- Typography 排版

## 布局

- Divider 分割线
- Grid 栅格
- Layout 布局
- Space 间距

## 导航

- Affix 固钉
- Breadcrumb 面包屑
- Dropdown 下拉菜单
- Menu 导航菜单
- Pagination 分页
- PageHeader 页头
- Steps 步骤条

## 数据录入

- AutoComplete 自动完成
- Checkbox 多选框
- Cascader 级联选择
- DatePicker 日期选择框
- Form 表单
- InputNumber 数字输入框
- Input 输入框
- Mentions 提及
- Rate 评分
- Radio 单选框
- Switch 开关
- Slider 滑动输入条
- Select 选择器
- TreeSelect 树选择
- Transfer 穿梭框
- TimePicker 时间选择框
- Upload 上传

## 数据展示

- Avatar 头像
- Badge 徽标数
- Comment 评论
- Collapse 折叠面板
- Carousel 走马灯
- Card 卡片
- Calendar 日历
- Descriptions 描述列表
- Empty 空状态
- Image 图片
- List 列表
- Popover 气泡卡片
- Statistic 统计数值
- Tree 树形控件
- Tooltip 文字提示
- Timeline 时间轴
- Tag 标签
- Tabs 标签页
- Table 表格

## 反馈

- Alert 警告提示
- Drawer 抽屉
- Modal 对话框
- Message 全局提示
- Notification 通知提醒框
- Progress 进度条
- Popconfirm 气泡确认框
- Result 结果
- Spin 加载中
- Skeleton 骨架屏

## 其他

- Anchor 锚点
- BackTop 回到顶部
- ConfigProvider 全局化配置
```

## 3.6 button.stories.tsx

```tsx
import { ComponentMeta, ComponentStory } from '@storybook/react'

import Button from '.'
import React from 'react'

// 元数据，button描述信息
export default {
  title: '通用/Button',
  component: Button
} as ComponentMeta<typeof Button>

const Template: ComponentStory<typeof Button> = args => <Button {...args} />

export const Basic = Template.bind({})
Basic.args = {
  children: '按钮'
}
```

## 3.7 package.json

```json
    "storybook": "start-storybook -p 7006",
    "build-storybook": "build-storybook",
```

# 四、测试

## 4.1 安装

- jest 是一个令人愉快的 JavaScript 测试框架
- Enzyme 用于 React 的 JS 测试工具
- puppeteer 是一个控制 headless Chrome 的 Node.js API
- jest-image- snapshot 执行图像比较的 Jest 匹配器，对于视觉回归测试非常有用

```shell
yarn add jest @types/jest @wojtekmaj/enzyme-adapter-react-17 puppetter @types/puppetter jest-environment-puppetter @types/jest-environment-puppetter jest-puppetter jest-image-snapshot @types/jest-image-snapshot -D

yarn add enzyme @types/enzyme -D
```

## 4.2 tests\setup.js

tests\setup.js

```js
const React = require('react')
const Enzyme = require('enzyme')

const Adapter = require('@wojtekmaj/enzyme-adapter-react-17')
Enzyme.configure({ adapter: new Adapter() })
```

## 4.3 tests\index.html

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Amazing Antd</title>
    <style>
      body {
        border: 5px solid #1890ff;
      }
    </style>
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>
```

## 4.4 unit.jest.js

```js
module.exports = {
  verbose: true,
  testEnvironment: 'jsdom', //运行测试的环境
  setupFiles: ['./tests/setup.js'],
  testMatch: ['**/unit/**/*.(spec|test).(js|ts|jsx|tsx)'],
  collectCoverage: true,
  collectCoverageFrom: [
    'components/**/*.(js|ts|jsx|tsx)',
    '!components/**/*.stories.(js|ts|jsx|tsx)',
    '!components/**/*.(spec|test).(js|ts|jsx|tsx)'
  ]
}
```

## 4.5 e2e.jest.js

```js
module.exports = {
  verbose: true,
  testEnvironment: 'jest-environment-puppeteer',
  setupFiles: ['./tests/setup.js'],
  preset: 'jest-puppeteer',
  testMatch: ['**/e2e/**/*.(spec|test).(j|t)sx']
}
```

## 4.6 unit\index.test.tsx

```tsx
import Button from '..'
import React from 'react'
import { mount } from 'enzyme'
describe('测试Button', () => {
  it('测试是Button是否能够正确挂载', () => {
    //挂载组件的过程不可抛错误
    expect(() => mount(<Button>Follow</Button>)).not.toThrow()
  })
})
```

## 4.7 snapshot.spec.tsx

```tsx
import React from 'react'
import ReactDOMServer from 'react-dom/server'
import { configureToMatchImageSnapshot } from 'jest-image-snapshot'
import Button from '..'
const toMatchSnapshot = configureToMatchImageSnapshot({
  customSnapshotsDir: `${process.cwd()}/snapshots`,
  customDiffDir: `${process.cwd()}/diffSnapshots`
})
expect.extend({ toMatchSnapshot })
describe('测试Buttoon快照', () => {
  it('测试快照是否正确', async () => {
    await jestPuppeteer.resetPage()
    await page.goto(`file://${process.cwd()}/tests/index.html`)
    const html = ReactDOMServer.renderToString(<Button>按钮222</Button>)
    await page.evaluate(innerHTML => {
      document.querySelector('#root').innerHTML = innerHTML
    }, html)
    const screenshot = await page.screenshot() //生成一张新的快照
    expect(screenshot).toMatchSnapshot() //比较 新的快照和老的快照是否相相同
  })
})
//reacdt单元测试 testLibrary  antd
```

## 4.8 jest-puppetter.config.js

```js
module.exports = {
  launch: {
    headless: true
  },
  browserContext: 'default'
}
```

## 4.9 package.json

```shell
    "test:unit": "jest --config unit.jest.js",
    "test:e2e": "jest --config e2e.jest.js",
    "test": "npm run test:unit && npm run test:e2e",
```

# 五、eslint

- elsint 是一个插件话并且可配置的 JavaScript 预发规则和代码风格的检查工具
- eslint-config-airbnb Airbnb 提供的 eslint 配置

## 5.1 安装

```shell
 yarn add @typescript-eslint/parser elsint eslint-plugin-import eslint-plugin-react eslint-plugin-react-hooks eslint-plugin-jsx eslint-config-airbnb -D

```

## 5.2 .eslintrc

.eslintrc.js

```js
module.exports =
```

## 5.3 .eslintignore

## 5.4 packag.json

# 六、prettier

## 6.1 安装依赖

## 6.2 .eslintrc.js

## 6.3 prettierrc

## 6.4 button\index.tsx

## 6.5 settings.json

# 七、editorconfig

## 7.1 .editorconfig

# 八、git hook

- Git 钩子能在特定的重要动作发生时触发自定义的脚本
- husky 可以让我们向项目中方便添加 git hooks
- lint-staged 用于实现每次提交只检查本次提交所修改的文件

## 8.1 安装

```shell
yarn add husky -D
npm set-script prepare "husky install"
npm run prepare
```

## 8.2 pre-commit

- pre-commit 在 git add 提交之后，然后执行 git commit 时执行，脚本执行没报错就继续提交，反之就驳回提交的操作
- 可以在 git commit 之前检查代码，保证所有提交到版本库中的代码都是符合规定的

### 8.2.1 安装脚本

```shell
npx husky add .husky/pre-commit "npx lint-staged"
```

### 8.2.2 .lintstagedrc

```lintstagedrc
{
  "*.{js,ts,jsx,tsx}": "eslint"
}
```

## 8.3 commit-msg

### 8.3.1 安装依赖

### 8.3.2 安装脚本

### 8.3.3 cz-config.js

## 8.4 pre-push

# 九、编译发布

- rimraf 是 node 版本的 rm -rf
- gulp 将开发流程中让人痛苦或耗时的任务自动化，从而减少你所浪费的时间、创造更大的价值
- merge2 合并多个流为同一个

## 9.1 安装依赖

```shell
yarn add rimraf gulp gulp-typescript gulp-babel merge2 -D

npm verson patch
npm publish
cat ~/.npmrc
```

## 9.2 gulpfile.js

```js
const gulp = require('gulp') //定义执行任务
const path = require('path') //处理路径
const rimraf = require('rimraf') //删除跑路的 rm -rf
const ts = require('gulp-typescript')
const babel = require('gulp-babel')
const merge2 = require('merge2') //Promise.all
const { compilerOptions } = require('./tsconfig.json')

const tsConfig = {
  noUnusedParameters: true, //不能有未使用的参数
  noUnusedLocals: true, //不能有未使用的本地变量
  strictNullChecks: true, //严格的Null检查
  target: 'es6', //编译 的目标
  jsx: 'react', //jsx如何处理preserve 保留不处理  react变成React.createElement()
  moduleResolution: 'node', //模块的查找规则 node
  declaration: true, //生成声明文件 d.ts
  allowSyntheticDefaultImports: true, //允许 默认导入
  ...compilerOptions
}
const babelConfig = require('./babel.config')
//准备好要编译 的文件
//glob 文件匹配模板，类似于正则
const source = [
  'components/**/*.{js,ts,jsx,tsx}',
  '!components/**/*.stories.{js,ts,jsx,tsx}',
  '!components/**/e2e/*',
  '!components/**/unit/*'
]
//C:\aproject\antd\components
const base = path.join(process.cwd(), 'components')
function getProjectPath (filePath) {
  return path.join(process.cwd(), filePath)
}
//C:\aproject\antd\lib
const libDir = getProjectPath('lib')
//C:\aproject\antd\es
const esDir = getProjectPath('es')
/**
 * 执行编译
 * @param {*} modules 是否要转换模块
 */
function compile (modules) {
  const targeDir = modules === false ? esDir : libDir
  rimraf.sync(targeDir) //删除老的内容 rm -rf
  //把文件匹配模式传给gulp,gulp会按这个模式把文件匹配了出来
  //ts转译后会生成二个流，一个流是JS一个流是类型声明d.ts
  const { js, dts } = gulp.src(source, { base }).pipe(ts(tsConfig))
  const dtsStream = dts.pipe(gulp.dest(targeDir))
  let jsStream = js
  if (modules) {
    //如果要转成ES5，就用babel进行转义
    jsStream = js.pipe(babel(babelConfig))
  }
  jsStream = jsStream.pipe(gulp.dest(targeDir))
  return merge2([jsStream, dtsStream])
}
gulp.task('compile-with-es', done => {
  console.log('compile to es')
  compile(false).on('finish', done)
})
gulp.task('compile-with-lib', done => {
  console.log('compile to js')
  compile().on('finish', done)
})
gulp.task('compile', gulp.parallel('compile-with-es', 'compile-with-lib'))
```

## 9.3 package.json

```json


```

# 十、持续集成

## 10.1 .travis.yml
