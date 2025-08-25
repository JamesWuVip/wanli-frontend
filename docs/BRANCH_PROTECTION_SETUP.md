# 分支保护规则配置指南

## 📋 概述

为确保 GitFlow 工作流程的安全性和代码质量，需要在 GitHub 仓库中配置分支保护规则。

## 🛡️ 分支保护规则配置

### 1. Main 分支保护规则

**路径**: Settings → Branches → Add rule

**分支名称模式**: `main`

**必需配置**:
- ✅ **Require a pull request before merging**
  - ✅ Require approvals: `1`
  - ✅ Dismiss stale PR approvals when new commits are pushed
  - ✅ Require review from code owners
  - ✅ Restrict pushes that create files larger than 100MB

- ✅ **Require status checks to pass before merging**
  - ✅ Require branches to be up to date before merging
  - **必需的状态检查**:
    - `CI / test (pull_request)`
    - `CI / build (pull_request)`
    - `CI / lint (pull_request)`
    - `CI / type-check (pull_request)`
    - `Security / audit (pull_request)`
    - `Performance / bundle-size (pull_request)`

- ✅ **Require conversation resolution before merging**

- ✅ **Require signed commits**

- ✅ **Require linear history**

- ✅ **Include administrators**

- ✅ **Restrict pushes**
  - 只允许特定用户/团队推送
  - 建议限制为: `maintainers`, `admins`

- ✅ **Allow force pushes**: ❌ (禁用)

- ✅ **Allow deletions**: ❌ (禁用)

### 2. Staging 分支保护规则

**路径**: Settings → Branches → Add rule

**分支名称模式**: `staging`

**必需配置**:
- ✅ **Require status checks to pass before merging**
  - ✅ Require branches to be up to date before merging
  - **必需的状态检查**:
    - `CI / test`
    - `CI / build`
    - `CI / lint`
    - `Deploy / staging`

- ✅ **Restrict pushes**
  - 只允许 GitHub Actions 和管理员推送
  - 允许: `github-actions[bot]`, `maintainers`

- ✅ **Allow force pushes**: ❌ (禁用)

- ✅ **Allow deletions**: ❌ (禁用)

### 3. Develop 分支保护规则

**路径**: Settings → Branches → Add rule

**分支名称模式**: `develop`

**必需配置**:
- ✅ **Require a pull request before merging**
  - ✅ Require approvals: `1`
  - ✅ Dismiss stale PR approvals when new commits are pushed

- ✅ **Require status checks to pass before merging**
  - ✅ Require branches to be up to date before merging
  - **必需的状态检查**:
    - `CI / test (pull_request)`
    - `CI / build (pull_request)`
    - `CI / lint (pull_request)`
    - `CI / type-check (pull_request)`

- ✅ **Require conversation resolution before merging**

- ✅ **Allow force pushes**: ❌ (禁用)

- ✅ **Allow deletions**: ❌ (禁用)

## 🔧 GitHub Actions 权限配置

### 1. Actions 权限设置

**路径**: Settings → Actions → General

**配置**:
- ✅ **Actions permissions**: Allow all actions and reusable workflows
- ✅ **Fork pull request workflows**: Require approval for first-time contributors
- ✅ **Workflow permissions**: Read and write permissions
- ✅ **Allow GitHub Actions to create and approve pull requests**: ✅

### 2. Secrets 配置

**路径**: Settings → Secrets and variables → Actions

**必需的 Secrets**:
```
VERCEL_TOKEN          # Vercel 部署令牌
VERCEL_ORG_ID         # Vercel 组织 ID
VERCEL_PROJECT_ID     # Vercel 项目 ID
FLY_API_TOKEN         # Fly.io API 令牌
GITHUB_TOKEN          # GitHub 令牌 (自动提供)
```

**环境变量**:
```
NODE_ENV              # 环境标识
VITE_API_BASE_URL     # API 基础 URL
VITE_APP_TITLE        # 应用标题
VITE_APP_VERSION      # 应用版本
```

## 🚀 自动化配置验证

### 验证脚本

创建以下脚本验证分支保护规则是否正确配置：

```bash
#!/bin/bash
# verify-branch-protection.sh

echo "🔍 验证分支保护规则..."

# 检查 main 分支保护
echo "检查 main 分支保护规则..."
gh api repos/:owner/:repo/branches/main/protection --jq '.required_status_checks.strict'

# 检查 staging 分支保护
echo "检查 staging 分支保护规则..."
gh api repos/:owner/:repo/branches/staging/protection --jq '.restrictions'

# 检查 develop 分支保护
echo "检查 develop 分支保护规则..."
gh api repos/:owner/:repo/branches/develop/protection --jq '.required_pull_request_reviews'

echo "✅ 分支保护规则验证完成"
```

## 📋 配置检查清单

### Main 分支
- [ ] PR 审查要求已启用
- [ ] 状态检查要求已配置
- [ ] 管理员包含在规则中
- [ ] 推送限制已设置
- [ ] 强制推送已禁用
- [ ] 分支删除已禁用

### Staging 分支
- [ ] 状态检查要求已配置
- [ ] 推送限制已设置（仅 Actions）
- [ ] 强制推送已禁用
- [ ] 分支删除已禁用

### Develop 分支
- [ ] PR 审查要求已启用
- [ ] 状态检查要求已配置
- [ ] 强制推送已禁用
- [ ] 分支删除已禁用

### Actions 配置
- [ ] Actions 权限已正确设置
- [ ] 必需的 Secrets 已配置
- [ ] 环境变量已设置
- [ ] Workflow 权限已配置

## 🚨 重要注意事项

1. **配置顺序**: 先配置 Actions 权限和 Secrets，再设置分支保护规则

2. **状态检查**: 确保工作流程至少运行一次后再添加状态检查要求

3. **权限管理**: 定期审查和更新推送权限，确保最小权限原则

4. **备份配置**: 记录所有配置更改，便于问题排查和恢复

5. **测试验证**: 配置完成后进行完整的工作流程测试

## 📞 故障排除

### 常见问题

**问题**: 状态检查失败
**解决**: 检查 GitHub Actions 工作流程配置和 Secrets

**问题**: 无法推送到受保护分支
**解决**: 确认用户权限和推送限制设置

**问题**: PR 无法合并
**解决**: 检查审查要求和状态检查配置

---

**配置完成后，请运行验证脚本确保所有规则正确生效。**
