export type RunMode = 'stdout' | 'server-demo' | 'coming-soon';
export type LessonStatus = 'ready' | 'todo';

export interface LessonMeta {
  id: string;
  title: string;
  status: LessonStatus;
  runMode: RunMode;
  nestHint: string;
  goEntry: string;
  nodeEntry: string;
  extraGoFiles?: string[];
  extraNodeFiles?: string[];
  todoDescription?: string;
}

export const curriculum: LessonMeta[] = [
  {
    id: '00-basics',
    title: '包与导出函数',
    status: 'ready',
    runMode: 'stdout',
    nestHint: '模块导出：Go 首字母大写 = 包外可见；TS 用 export',
    goEntry: 'main.go',
    nodeEntry: 'nodejs/main.ts',
    extraGoFiles: ['hello/hello.go'],
    extraNodeFiles: ['nodejs/hello/hello.ts'],
  },
  {
    id: '01-http',
    title: '标准库 HTTP、ServeMux',
    status: 'ready',
    runMode: 'server-demo',
    nestHint: 'Controller + 路由：Go ServeMux ≈ Express/Nest 路由注册',
    goEntry: 'main.go',
    nodeEntry: 'nodejs/main.ts',
  },
  {
    id: '02-structs-json',
    title: 'struct、json tag、序列化',
    status: 'ready',
    runMode: 'stdout',
    nestHint: 'DTO：struct + `json:"..."` ≈ class/interface + 序列化字段名',
    goEntry: 'main.go',
    nodeEntry: 'nodejs/main.ts',
  },
  {
    id: '03-pointers',
    title: '指针、传参',
    status: 'ready',
    runMode: 'stdout',
    nestHint: '引用语义：Go 指针传参；TS 用对象引用模拟可变状态',
    goEntry: 'main.go',
    nodeEntry: 'nodejs/main.ts',
    extraGoFiles: ['demo/pointer.go'],
    extraNodeFiles: ['nodejs/demo/pointer.ts'],
  },
  {
    id: '04-interfaces',
    title: 'interface、多态',
    status: 'ready',
    runMode: 'stdout',
    nestHint: '契约：Go 隐式实现 interface ≈ TS interface + class',
    goEntry: 'main.go',
    nodeEntry: 'nodejs/main.ts',
  },
  {
    id: '05-concurrency',
    title: 'goroutine、channel',
    status: 'todo',
    runMode: 'coming-soon',
    nestHint: '并发：goroutine/channel ≈ Promise、async、EventEmitter',
    goEntry: 'main.go',
    nodeEntry: 'nodejs/main.ts',
    todoDescription:
      '待练习：goroutine、sync.WaitGroup、channel、context.Context 取消。建议题目：并发请求 3 个 URL，收集最先返回的两个结果（context 超时 2s）。',
  },
  {
    id: '06-cli',
    title: 'flag / 小 CLI',
    status: 'todo',
    runMode: 'coming-soon',
    nestHint: '命令行参数：flag 包 ≈ process.argv / commander',
    goEntry: 'main.go',
    nodeEntry: 'nodejs/main.ts',
    todoDescription: '待练习：用 flag 解析子命令与参数，实现一个小 CLI 工具。',
  },
  {
    id: '07-db',
    title: 'database/sql 或 pgx',
    status: 'todo',
    runMode: 'coming-soon',
    nestHint: '数据访问：database/sql ≈ TypeORM / Prisma 底层驱动',
    goEntry: 'main.go',
    nodeEntry: 'nodejs/main.ts',
    todoDescription: '待练习：连接数据库，完成 CRUD 与简单查询。',
  },
  {
    id: '08-test',
    title: 'table-driven test',
    status: 'todo',
    runMode: 'coming-soon',
    nestHint: '测试：table-driven test ≈ Jest 参数化用例',
    goEntry: 'main.go',
    nodeEntry: 'nodejs/main.ts',
    todoDescription: '待练习：为已有函数编写 table-driven 单元测试。',
  },
  {
    id: 'mini',
    title: '小项目归档',
    status: 'todo',
    runMode: 'coming-soon',
    nestHint: '综合练习：短链、URL 监控、小 CLI 等完整小项目',
    goEntry: 'main.go',
    nodeEntry: 'nodejs/main.ts',
    todoDescription:
      '稍完整、可封存的小项目。学完再从零建子目录，不必和学习练习混在一起。',
  },
];
