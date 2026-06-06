// Go: struct + json tag；TS 用 interface/class + JSON.stringify/parse

interface Note {
  id: number;
  title: string;
  body?: string; // 对应 json:"body,omitempty"：空字符串时不序列化
}

function marshalNote(n: Note): string {
  const payload: Note = { id: n.id, title: n.title };
  if (n.body) {
    payload.body = n.body;
  }
  return JSON.stringify(payload);
}

function main(): void {
  const n: Note = { id: 1, title: '学 Go', body: '从 struct 和 json 开始' };

  const json = marshalNote(n);
  console.log('Marshal:', json);

  const decoded = JSON.parse(json) as Note;
  console.log('Unmarshal:', decoded);
  // JS 无 %p 内存地址；对象为引用类型，打印类型名近似 Go 的 %T
  console.log('Unmarshal: [对象为引用，无 %p 等价]');
  console.log('Unmarshal:', decoded.constructor.name === 'Object' ? 'Note' : decoded.constructor.name);
}

main();
