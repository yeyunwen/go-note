package main

import (
	"fmt"
	"net/http"
	"net/http/httptest"
)

// 网站演示版：用 httptest 模拟请求，无需启动长跑服务器
func main() {
	mux := http.NewServeMux()

	mux.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "text/plain; charset=utf-8")
		_, _ = w.Write([]byte("Hello from Go local server!\n"))
	})

	mux.HandleFunc("/healthz", func(w http.ResponseWriter, r *http.Request) {
		w.WriteHeader(http.StatusOK)
		_, _ = w.Write([]byte("ok"))
	})

	for _, path := range []string{"/", "/healthz"} {
		req := httptest.NewRequest(http.MethodGet, path, nil)
		rec := httptest.NewRecorder()
		mux.ServeHTTP(rec, req)
		fmt.Printf("GET %s -> %d %q\n", path, rec.Code, rec.Body.String())
	}
}
