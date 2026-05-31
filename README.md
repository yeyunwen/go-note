# go-note

Go 学习练习仓库（不是某个产品项目）。按主题分目录，每个目录可单独运行。

## 环境

- Go 1.24+（见 `go.mod`）
- 运行某一课：`go run ./01-http`

## 目录

| 目录 | 内容 | 运行 |
|------|------|------|
| `00-basics/hello` | 包与导出函数 | `go run ./00-basics` |
| `01-http` | 标准库 HTTP、`ServeMux` | `go run ./01-http` |
| `02-structs-json` | struct、json tag、序列化 | `go run ./02-structs-json` |
| `03-pointers` | 指针、传参 | `go run ./03-pointers` |
| `04-interfaces` | interface、多态 | `go run ./04-interfaces` |
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
