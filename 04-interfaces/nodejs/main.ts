// Go: interface 隐式实现 + 类型断言；TS 用 interface + class + instanceof

interface Storer {
  save(title: string): void;
}

class MemoryStore implements Storer {
  private notes: string[] = [];

  save(title: string): void {
    this.notes.push(title);
  }

  list(): string[] {
    return this.notes;
  }
}

// 只实现 Storer，不实现 list — 与 Go FileStore 一致
class FileStore implements Storer {
  save(title: string): void {
    console.log('[file] save:', title);
  }
}

function createNote(s: Storer, title: string): void {
  s.save(title);
}

function main(): void {
  const mem = new MemoryStore();
  createNote(mem, '第一条');
  createNote(mem, '第二条');
  console.log('memory:', mem.list());

  const file = new FileStore();
  createNote(file, '写入文件（示例打印）');

  // 类型收窄：对应 Go 的 m, ok := x.(*MemoryStore)
  if (mem instanceof MemoryStore) {
    console.log('断言成功，条数:', mem.list().length);
  }
}

main();
