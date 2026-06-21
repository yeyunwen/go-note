# 06-cli

用 `flag` 写一个小 CLI：**查询 GitHub 仓库默认分支上最早那次 commit 的时间**（无需 clone、不用翻页）。

## 运行

```bash
# 仓库根目录
go run ./06-cli
go run ./06-cli -repo facebook/react
go run ./06-cli -repo torvalds/linux -json

pnpm run 06
pnpm run 06 -- --repo facebook/react
```

## 参数

| 参数 | 默认值 | 说明 |
|------|--------|------|
| `-repo` | `facebook/react` | `owner/name` |
| `-token` | 自动检测 | 依次读 `-token`、`GITHUB_TOKEN`、`GH_TOKEN`、`gh auth token` |

> **注意**：未带 token 时 GitHub 对同一 IP 限流很严（约 60 次/小时）。本机装了 [GitHub CLI](https://cli.github.com/) 且已 `gh auth login` 时会自动用其 token；否则请 `export GITHUB_TOKEN=...`。
| `-json` | `false` | JSON 输出 |

## 原理

GitHub commits API 按时间倒序返回。先请求 `per_page=1` 从 `Link` 头拿到最后一页页码，再取该页第一条即为最早 commit。
