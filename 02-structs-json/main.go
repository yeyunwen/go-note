package main

import (
	"encoding/json"
	"fmt"
	"log"
)

// Note 类似 NestJS 里的 DTO；字段 tag 控制 JSON 名，类似 class-validator + @Expose
type Note struct {
	ID    int    `json:"id"`
	Title string `json:"title"`
	Body  string `json:"body,omitempty"` // 空字符串时省略
}

func main() {
	n := Note{ID: 1, Title: "学 Go", Body: "从 struct 和 json 开始"}

	b, err := json.Marshal(n)
	if err != nil {
		log.Fatal(err)
	}
	fmt.Println("Marshal:", string(b))

	var decoded Note
	if err := json.Unmarshal(b, &decoded); err != nil {
		log.Fatal(err)
	}
	fmt.Printf("Unmarshal: %v\n", decoded)
	// 打印地址
	fmt.Printf("Unmarshal: %p\n", &decoded)
	// 打印类型
	fmt.Printf("Unmarshal: %T\n", decoded)
}
