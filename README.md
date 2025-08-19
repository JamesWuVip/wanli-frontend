# Wanli Frontend

万里学院前端应用 - Vue 3 + TypeScript + Vite

## 项目描述

这是万里学院的前端应用，提供用户界面用于课程学习、作业提交、成绩查看等功能。

## 技术栈

- **Vue 3** - 渐进式JavaScript框架
- **TypeScript** - 类型安全的JavaScript超集
- **Vite** - 现代前端构建工具
- **Vue Router** - Vue.js官方路由管理器
- **Pinia** - Vue状态管理库
- **Element Plus** - Vue 3组件库
- **Axios** - HTTP客户端库
- **Vitest** - 单元测试框架
- **ESLint + Prettier** - 代码质量和格式化工具

## 快速开始

### 环境要求

- Node.js 20.19.0+ 或 22.12.0+
- npm 或 yarn

### 本地开发

1. 克隆项目
```bash
git clone https://github.com/JamesWuVip/wanli-frontend.git
cd wanli-frontend
```

2. 安装依赖
```bash
npm install
```

3. 配置环境变量
```bash
# 创建 .env.development 文件
VITE_API_BASE_URL=http://localhost:8080/api
VITE_APP_TITLE=万里学院
```

4. 启动开发服务器
```bash
npm run dev
```

## 部署

### Fly.io 部署

项目已配置 fly.toml 文件，支持自动部署到 Fly.io 平台。

```bash
fly deploy
```

### 环境变量

生产环境需要配置以下环境变量：

- `VITE_API_BASE_URL`: 后端API地址
- `VITE_APP_TITLE`: 应用标题
- `NODE_ENV`: 环境类型

## 项目结构

```
src/
├── api/          # API接口定义
├── assets/       # 静态资源
├── components/   # 公共组件
├── router/       # 路由配置
├── stores/       # 状态管理
├── types/        # TypeScript类型定义
├── views/        # 页面组件
├── App.vue       # 根组件
└── main.ts       # 应用入口
```