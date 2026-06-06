# go-note — Agent 约定

本仓库是 Go 学习练习项目。编写或修改代码时，请始终与 README 中的 NestJS/Node 对照目标保持一致。

## 核心规则：Go 与 Node.js 成对编写

**凡在本仓库新增或修改 Go 示例代码，必须同时提供一份等价的 Node.js 对照实现。**

### 要求

1. **行为一致**：两份代码演示同一概念，输入/输出或副作用应对得上（允许语言惯用写法不同）。
2. **同主题目录**：Node 代码放在对应章节目录下的 `nodejs/` 子目录，例如：
   - Go：`04-interfaces/main.go`
   - Node：`04-interfaces/nodejs/main.ts`
3. **语言选择**：优先 **TypeScript**（便于与 NestJS 概念对照）；若该课刻意展示纯 JS 特性，可用 `.mjs` / `.js`，并在文件头注释说明原因。
4. **可运行**：Node 侧应能直接运行或附带最短运行说明（如在章节目录 `README.md` 或 `nodejs/package.json` 中写 `node main.mjs` / `npx tsx main.ts`）。
5. **简要对照**：Node 文件顶部用 1～3 行注释标出与 Go 的对应关系（如「`interface Storer` ≈ Nest Injectable 契约」）；避免冗长教程式注释。
6. **同步修改**：只改 Go 而不更新 Node 对照视为未完成；删课或重命名时，同步处理 `nodejs/` 侧文件。

### 不必做的事

- 不要为对照代码引入与本课无关的框架（除非该课主题就是 Nest/Express 等）。
- 不要复制粘贴大段重复注释；对照点写清即可。
- 不要提交 `node_modules/`；需要依赖时在 `nodejs/package.json` 中声明，并在说明里写安装命令。

### 示例目录结构

```text
04-interfaces/
  main.go           # Go 示例
  nodejs/
    main.ts         # Node/TS 对照
    package.json    # 仅在该课需要依赖时添加
```

### 对照编写时的默认类比（备忘）

| Go | Node / NestJS |
|----|----------------|
| `struct` + `` `json:"..."` `` | DTO / interface 字段 |
| `interface` + 隐式实现 | `interface` + `implements`（可选） |
| 指针接收者方法 | `class` 实例方法 / `this` |
| `error` 返回值 | `throw` / `Result` 式处理（示例里可简化） |
| `goroutine` / `channel` | `Promise` / `async` / `EventEmitter` 等（按课说明） |

## 其他约定

- 保持各章可独立运行：`go run ./<章节目录>`。
- 提交信息遵循 Conventional Commits；仅在用户明确要求时执行 `git commit`。
- 回复用户时使用简体中文。
