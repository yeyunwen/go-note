package main

import (
	"encoding/json"
	"flag"
	"fmt"
	"os"
	"strings"
	"time"
)

// Go: flag 包解析命令行；本课实现 first-commit：查 GitHub 默认分支的第一次 commit 时间。
func main() {
	repo := flag.String("repo", "facebook/react", "GitHub 仓库 owner/name")
	token := flag.String("token", "", "GitHub token（默认读 GITHUB_TOKEN / gh auth token）")
	asJSON := flag.Bool("json", false, "以 JSON 输出")
	flag.Parse()

	if !strings.Contains(*repo, "/") {
		fmt.Fprintln(os.Stderr, "错误: -repo 必须是 owner/name 格式，例如 facebook/react")
		os.Exit(1)
	}

	authToken := resolveToken(*token)
	commit, err := NewClient(authToken).FirstCommit(*repo)
	if err != nil {
		fmt.Fprintln(os.Stderr, "错误:", err)
		os.Exit(1)
	}

	if *asJSON {
		out := map[string]string{
			"repo":    *repo,
			"date":    commit.Commit.Committer.Date.Format(time.RFC3339),
			"sha":     commit.SHA,
			"message": firstLine(commit.Commit.Message),
			"url":     commit.HTMLURL,
		}
		enc := json.NewEncoder(os.Stdout)
		enc.SetIndent("", "  ")
		_ = enc.Encode(out)
		return
	}

	fmt.Printf("repo:    %s\n", *repo)
	fmt.Printf("date:    %s\n", commit.Commit.Committer.Date.Format(time.RFC3339))
	fmt.Printf("sha:     %s\n", commit.SHA)
	fmt.Printf("message: %s\n", firstLine(commit.Commit.Message))
	fmt.Printf("url:     %s\n", commit.HTMLURL)
}

func firstLine(s string) string {
	if i := strings.IndexByte(s, '\n'); i >= 0 {
		return s[:i]
	}
	return s
}
