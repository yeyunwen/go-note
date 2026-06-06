# go-note

Go 学习练习仓库（不是某个产品项目）。按主题分目录，每个目录可单独运行。

## 环境

- Go 1.24+（见 `go.mod`）
- Node.js 18+、pnpm 9+（对照示例与 `web/`，见根目录 `pnpm-workspace.yaml`）
- 运行某一课（Go）：`go run ./01-http`
- 运行某一课（Node）：`pnpm install` 后 `pnpm run 01`（或 `pnpm exec tsx 01-http/nodejs/main.ts`）

## 交互式网站

仓库内 `web/` 提供 Go / Node 双栏对照浏览与**本地在线运行**（需本机已安装 Go 与 Node）。

```bash
# 在仓库根目录（pnpm workspace 一次安装全部依赖）
pnpm install
pnpm run web
# 或：cd web && pnpm dev
```

浏览器打开 Vite 提示的地址（默认 `http://localhost:5173`）。站点通过 `executor`（`:3001`）在临时目录执行代码，超时 5s。

| 能力 | 说明 |
|------|------|
| `00`–`04` | 可在线运行，编辑后点「运行 Go / Node」 |
| `01-http` | **在线演示版**（httptest / mock 请求）；完整 `ListenAndServe` 版只读，本地 `go run ./01-http` |
| `05`–`08`、`mini` | 仅占位与待写说明，不可运行 |

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
| `06-cli` | flag / 小 CLI（待写） | — |
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
- [ ] `mini/` 小项目
