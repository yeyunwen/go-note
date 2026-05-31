package main

import "fmt"

// NestJS 里类似：定义接口类型，不同 Service 实现同一契约

type Storer interface {
	Save(title string) error
}

type MemoryStore struct {
	notes []string
}

func (m *MemoryStore) Save(title string) error {
	m.notes = append(m.notes, title)
	return nil
}

func (m *MemoryStore) List() []string {
	return m.notes
}

// FileStore 故意不实现 List，只实现 Storer 也能赋给 interface

type FileStore struct{}

func (f *FileStore) Save(title string) error {
	fmt.Println("[file] save:", title)
	return nil
}

func createNote(s Storer, title string) error {
	return s.Save(title)
}

func main() {
	mem := &MemoryStore{}
	_ = createNote(mem, "第一条")
	_ = createNote(mem, "第二条")
	fmt.Println("memory:", mem.List())

	file := &FileStore{}
	_ = createNote(file, "写入文件（示例打印）")

	// 类型断言：只有确定具体类型时才用
	if m, ok := interface{}(mem).(*MemoryStore); ok {
		fmt.Println("断言成功，条数:", len(m.List()))
	}
}
