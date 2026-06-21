package main

import (
	"os"
	"os/exec"
	"strings"
)

// resolveToken 依次尝试：-token 参数、GITHUB_TOKEN、GH_TOKEN、gh auth token。
func resolveToken(explicit string) string {
	if explicit != "" {
		return explicit
	}
	if v := os.Getenv("GITHUB_TOKEN"); v != "" {
		return v
	}
	if v := os.Getenv("GH_TOKEN"); v != "" {
		return v
	}
	return ghAuthToken()
}

func ghAuthToken() string {
	out, err := exec.Command("gh", "auth", "token").Output()
	if err != nil {
		return ""
	}
	return strings.TrimSpace(string(out))
}
