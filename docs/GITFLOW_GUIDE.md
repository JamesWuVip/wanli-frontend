# GitFlow 工作流程指南

## 📋 概述

本项目采用 GitFlow 分支模型，确保代码质量和部署安全。所有代码变更必须遵循以下流程：

```
develop → staging → main
```

## 🌳 分支结构

### 主要分支

- **`main`** - 生产分支
  - 只接受来自 `staging` 分支的合并
  - 自动部署到生产环境 (Vercel + Fly.io)
  - 受保护，需要 PR 审查

- **`staging`** - 测试分支
  - 接受来自 `develop` 分支的自动合并
  - 自动部署到测试环境
  - 用于集成测试和验收测试

- **`develop`** - 开发分支
  - 日常开发的主分支
  - 功能分支合并的目标
  - 推送时自动触发测试和合并到 staging

### 辅助分支

- **`feature/<feature-name>`** - 功能开发分支
  - 从 `develop` 创建
  - 合并回 `develop`
  - 完成后删除

- **`fix/<fix-name>`** - Bug修复分支
  - 从 `develop` 创建
  - 合并回 `develop`
  - 完成后删除

- **`hotfix/<hotfix-name>`** - 紧急修复分支
  - 从 `main` 创建
  - 同时合并到 `main` 和 `develop`
  - 用于生产环境紧急修复

## 🔄 自动化工作流

### 1. Develop → Staging 自动流程

当代码推送到 `develop` 分支时：

1. **自动测试**
   - ESLint 代码检查
   - TypeScript 类型检查
   - 单元测试
   - 构建测试

2. **自动合并到 Staging**
   - 测试通过后自动合并到 `staging`
   - 切换环境配置到测试环境 (`.env.test`)
   - 推送到 `staging` 分支

3. **自动部署测试环境**
   - 构建测试版本
   - 部署到测试环境
   - 运行冒烟测试

### 2. Staging → Main 手动流程

从 `staging` 到 `main` 需要手动创建 PR：

1. **创建 Pull Request**
   ```bash
   # 从 staging 分支创建 PR 到 main
   gh pr create --base main --head staging --title "Release: staging to main"
   ```

2. **自动验证**
   - 全面测试套件
   - 安全审计
   - 打包大小检查
   - E2E 测试（如配置）

3. **人工审查**
   - 代码审查
   - 测试验收
   - 产品确认

4. **合并后自动部署**
   - 切换到生产环境配置 (`.env.production`)
   - 创建发布标签
   - 部署到 Vercel 和 Fly.io

## 🛡️ 分支保护规则

### Main 分支保护
- ✅ 需要 PR 审查
- ✅ 需要状态检查通过
- ✅ 需要分支为最新
- ✅ 限制推送权限
- ✅ 限制强制推送
- ✅ 需要管理员审查

### Staging 分支保护
- ✅ 需要状态检查通过
- ✅ 自动合并来自 develop
- ✅ 限制直接推送

### Develop 分支保护
- ✅ 需要 PR 审查
- ✅ 需要状态检查通过

## 🚀 开发工作流程

### 新功能开发

1. **创建功能分支**
   ```bash
   git checkout develop
   git pull origin develop
   git checkout -b feature/user-authentication
   ```

2. **开发和提交**
   ```bash
   # 遵循 Conventional Commits 规范
   git commit -m "feat(auth): implement user login functionality"
   ```

3. **推送和创建 PR**
   ```bash
   git push origin feature/user-authentication
   gh pr create --base develop --head feature/user-authentication
   ```

4. **合并到 Develop**
   - PR 审查通过后合并
   - 删除功能分支

5. **自动流程触发**
   - 推送到 develop 自动触发测试
   - 测试通过后自动合并到 staging
   - 自动部署到测试环境

### Bug 修复

1. **创建修复分支**
   ```bash
   git checkout develop
   git checkout -b fix/login-validation-error
   ```

2. **修复和测试**
   ```bash
   git commit -m "fix(auth): resolve login validation error"
   ```

3. **合并流程**
   - 同新功能开发流程

### 紧急修复 (Hotfix)

1. **从 Main 创建 Hotfix**
   ```bash
   git checkout main
   git pull origin main
   git checkout -b hotfix/critical-security-fix
   ```

2. **修复和测试**
   ```bash
   git commit -m "fix(security): patch critical vulnerability"
   ```

3. **同时合并到 Main 和 Develop**
   ```bash
   # 创建到 main 的 PR
   gh pr create --base main --head hotfix/critical-security-fix
   
   # 合并后，同步到 develop
   git checkout develop
   git merge main
   git push origin develop
   ```

## 🔧 环境配置管理

### 自动环境切换

- **Develop → Staging**: 自动切换到 `.env.test`
- **Staging → Main**: 自动切换到 `.env.production`

### 环境变量文件

```
.env.development  # 开发环境
.env.test        # 测试环境 (staging)
.env.production  # 生产环境 (main)
```

## 📋 检查清单

### 开发者检查清单

- [ ] 代码遵循项目规范
- [ ] 单元测试覆盖新功能
- [ ] ESLint 和 TypeScript 检查通过
- [ ] 提交信息遵循 Conventional Commits
- [ ] PR 描述清晰完整

### 审查者检查清单

- [ ] 代码质量符合标准
- [ ] 测试用例充分
- [ ] 安全性考虑
- [ ] 性能影响评估
- [ ] 文档更新（如需要）

### 发布检查清单

- [ ] 所有测试通过
- [ ] 测试环境验证完成
- [ ] 产品功能确认
- [ ] 性能测试通过
- [ ] 安全审计完成
- [ ] 回滚方案准备

## 🚨 紧急情况处理

### 生产环境问题

1. **立即回滚**
   ```bash
   # 回滚到上一个稳定版本
   git checkout main
   git reset --hard <last-stable-commit>
   git push --force-with-lease origin main
   ```

2. **创建 Hotfix**
   - 按照 Hotfix 流程修复
   - 加急审查和部署

### 测试环境问题

1. **停止自动合并**
   - 暂时禁用 develop → staging 工作流

2. **修复后重新启用**
   - 确认修复后重新启用自动流程

## 📞 联系和支持

- **技术负责人**: [联系信息]
- **DevOps 团队**: [联系信息]
- **紧急联系**: [24/7 联系方式]

---

**注意**: 严格遵循此工作流程，确保代码质量和部署安全。任何偏离标准流程的操作都需要技术负责人批准。
