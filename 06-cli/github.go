package main

import (
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"regexp"
	"strconv"
	"strings"
	"time"
)

// Commit 对应 GitHub REST API 返回的 commit 对象（只取需要的字段）。
type Commit struct {
	SHA    string `json:"sha"`
	Commit struct {
		Committer struct {
			Date time.Time `json:"date"`
		} `json:"committer"`
		Message string `json:"message"`
	} `json:"commit"`
	HTMLURL string `json:"html_url"`
}

// Client 调用 GitHub API 查询默认分支上的最早 commit。
type Client struct {
	httpClient *http.Client
	token      string
}

func NewClient(token string) *Client {
	return &Client{
		httpClient: &http.Client{Timeout: 30 * time.Second},
		token:      token,
	}
}

// FirstCommit 返回默认分支上时间最早的那次 commit。
func (c *Client) FirstCommit(repo string) (*Commit, error) {
	lastPage, err := c.lastCommitPage(repo)
	if err != nil {
		return nil, err
	}

	commits, err := c.fetchCommits(repo, lastPage)
	if err != nil {
		return nil, err
	}
	if len(commits) == 0 {
		return nil, fmt.Errorf("仓库 %s 没有 commit", repo)
	}

	return &commits[0], nil
}

func (c *Client) lastCommitPage(repo string) (int, error) {
	url := fmt.Sprintf("https://api.github.com/repos/%s/commits?per_page=1", repo)
	resp, err := c.doGet(url)
	if err != nil {
		return 0, err
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		return 0, readAPIError(resp)
	}

	// Link: <...page=21523>; rel="last"
	re := regexp.MustCompile(`page=(\d+)>; rel="last"`)
	if m := re.FindStringSubmatch(resp.Header.Get("Link")); len(m) == 2 {
		return strconv.Atoi(m[1])
	}

	return 1, nil
}

func (c *Client) fetchCommits(repo string, page int) ([]Commit, error) {
	url := fmt.Sprintf("https://api.github.com/repos/%s/commits?per_page=1&page=%d", repo, page)
	resp, err := c.doGet(url)
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		return nil, readAPIError(resp)
	}

	var commits []Commit
	if err := json.NewDecoder(resp.Body).Decode(&commits); err != nil {
		return nil, err
	}
	return commits, nil
}

func (c *Client) doGet(url string) (*http.Response, error) {
	req, err := http.NewRequest(http.MethodGet, url, nil)
	if err != nil {
		return nil, err
	}
	req.Header.Set("Accept", "application/vnd.github+json")
	req.Header.Set("User-Agent", "go-note-first-commit")
	if c.token != "" {
		req.Header.Set("Authorization", "Bearer "+c.token)
	}
	return c.httpClient.Do(req)
}

func readAPIError(resp *http.Response) error {
	body, _ := io.ReadAll(io.LimitReader(resp.Body, 512))
	msg := strings.TrimSpace(string(body))
	if msg == "" {
		return fmt.Errorf("github api: %s", resp.Status)
	}
	if resp.StatusCode == http.StatusForbidden && strings.Contains(strings.ToLower(msg), "rate limit") {
		return fmt.Errorf(`github api 限流（未认证 IP 每小时约 60 次）

请任选其一后再试：
  export GITHUB_TOKEN=$(gh auth token)
  go run ./06-cli -token <你的 token>

若未安装 gh：GitHub → Settings → Developer settings → Personal access tokens

原始响应: %s`, msg)
	}
	return fmt.Errorf("github api: %s — %s", resp.Status, msg)
}
