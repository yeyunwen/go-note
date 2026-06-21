# go-note

Go 学习练习仓库（不是某个产品项目）。按主题分目录，每个目录可单独运行。

## 环境

- Go 1.24+（见 `go.mod`）
- Node.js 18+、pnpm 9+（对照示例与 `web/`，见根目录 `pnpm-workspace.yaml`）
- 运行某一课（Go）：`go run ./01-http`
- 运行某一课（Node）：`pnpm install` 后 `pnpm run 01`（或 `pnpm exec tsx 01-http/nodejs/main.ts`）

## 交互式网站

仓库内 `web/` 提供 Go / Node 双栏对照浏览与**本地在线运行**（需本机已安装 Go 与 Node）。

### 在线预览（GitHub Pages）

推送 `main` 分支后，GitHub Actions 自动部署静态站点：

**https://yeyunwen.github.io/go-note/**

GitHub Pages 为静态预览（浏览/编辑代码）；「运行 Go / Node」需在本地启动完整环境。

首次使用请在仓库 **Settings → Pages → Build and deployment** 中将 Source 设为 **GitHub Actions**。

### 本地开发（含代码执行）

```bash
# 在仓库根目录（pnpm workspace 一次安装全部依赖）
pnpm install
pnpm run web
# 或：cd web && pnpm dev
```

浏览器打开 Vite 提示的地址（默认 `http://localhost:5173`）。站点通过 `executor`（`:3001`）在临时目录执行代码，超时 5s。

| 能力 | GitHub Pages | 本地 `pnpm run web` |
|------|----------------|---------------------|
| 浏览 / 编辑代码 | 支持 | 支持 |
| 运行 Go / Node | 不支持 | 支持（`00`–`04`） |
| `01-http` 演示版 | 仅浏览 | 可运行 |
| `05`–`08`、`mini` | 占位说明 | 占位说明 |

课程内容在构建时由 `web/scripts/sync-lessons.ts` 从各章目录同步，无需维护第二份源码。修改章节目录后重新 `pnpm dev` 或 `pnpm sync`（在 `web/` 目录）即可更新网站。

## 目录

| 目录 | 内容 | Go | Node |
|------|------|-----|------|
| `00-basics/hello` | 包与导出函数 | `go run ./00-basics` | `pnpm run 00` |
| `01-http` | 标准库 HTTP、`ServeMux` | `go run ./01-http` | `pnpm run 01` |
| `02-structs-json` | struct、json tag、序列化 | `go run ./02-structs-json` | `pnpm run 02` |
| `03-pointers` | 指针、传参 | `go run ./03-pointers` | `pnpm run 03` |
| `04-interfaces` | interface、多态 | `go run ./04-interfaces` | `pnpm run 04` |
| `05-concurrency` | goroutine、channel（待写） | — |
| `06-cli` | flag / 小 CLI（查 GitHub 首次 commit） | `go run ./06-cli` | `pnpm run 06` |
| `07-db` | database/sql 或 pgx（待写） | — |
| `08-test` | table-driven test（待写） | — |
| `mini/` | 稍完整的小项目归档（可选） | — |

## 和 NestJS 的对照（备忘）

| NestJS | Go |
|--------|-----|
| Module / Provider | `internal/` 包 + 构造函数注入 |
| Controller | `handler` + `chi` / `gin` |
| DTO | struct + `` `json:"..."` `` |
| 全局异常过滤器 | 中间件里统一写错误响应 |
| `async/await` | 多数同步；并发用 goroutine |

## 进度

- [x] `00-basics` — hello
- [x] `01-http` — 本地 :8080
- [x] `02-structs-json`
- [x] `03-pointers`
- [x] `04-interfaces`
- [ ] `05-concurrency`
- [x] `06-cli` — first-commit CLI
- [ ] `mini/` 小项目
