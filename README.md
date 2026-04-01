# AI Model Guide · AI 模型选型指南

面向中文读者的 **主流大模型选型参考**：以单页静态站形式整理八大平台（国内五家、海外三家）、数十款模型的能力标签、典型场景与快速对照，便于在选型时快速缩小范围。

**在线访问：** [ai-model-guide.vercel.app](https://ai-model-guide.vercel.app)

---

## 这个项目能做什么

| 模块 | 说明 |
|------|------|
| **各平台现役模型** | 国内（豆包、Kimi、DeepSeek、通义、MiniMax）与海外（ChatGPT、Claude、Gemini）分栏展示；含开源/闭源标识、主力模型线与「最适合」摘要。 |
| **筛选与费用** | 按中文优先、代码、推理、多模态、开源、Agent、费用等维度筛选；「费用」视图下可按公开 API 计价量级排序（示意，以各平台官网为准）。 |
| **按场景选模型** | 十余类常见任务（对话、编程、Agent、多模态、私有化等）给出首选组合与简短理由。 |
| **快速对照表** | 需求 → 首选 / 备选 → 一句话理由，适合打印或截图备忘。 |

页面内数据与观点为 **2026 年一季度** 左右的整理快照；模型迭代快，**请以各厂商官方文档与计费页为准**。

---

## 技术说明

- **形态**：纯静态站点，入口为根目录 [`index.html`](index.html)；样式与交互内联于同一文件，无前端构建步骤即可部署。
- **本地预览**：使用 [`serve`](https://github.com/vercel/serve) 在 `4173` 端口提供静态文件（见 `package.json` 的 `dev` / `start`）。
- **资源**：平台 Logo 位于 `assets/logos/`；若需从 [Simple Icons](https://simpleicons.org/) 等源重新生成图标，可运行 `npm run build:logos`（依赖 `sharp`，见 [`scripts/build-logos.mjs`](scripts/build-logos.mjs)）。
- **路由**：[`vercel.json`](vercel.json) 将路径重写至 `index.html`，便于 SPA 式托管；纯静态目录部署时直接打开 `index.html` 亦可。

---

## 本地开发

```bash
npm install
npm run dev
```

浏览器打开 <http://localhost:4173>。

---

## 部署（Vercel）

本仓库使用 [Vercel](https://vercel.com) 部署：根目录已含 [`vercel.json`](vercel.json)，连接 Git 仓库或 `vercel` CLI 即可；重写规则会把路径指向 `index.html`。

若迁到其他静态托管，上传除 `node_modules` 外的目录并保留 `assets/` 与 `index.html` 即可（其他平台需自行配置等价重写，否则用根路径访问即可）。

---

## 声明

本站为个人整理的学习与参考材料，**与所列平台无关联**。API 价格、模型名称与能力描述会随官方更新而变化；使用本页信息前请自行核对官方渠道。

---

## 仓库结构（摘要）

```
├── index.html          # 页面与内联脚本、样式
├── assets/logos/       # 平台 Logo
├── scripts/            # 可选：Logo 构建脚本
├── vercel.json
└── package.json
```
