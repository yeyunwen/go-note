// Go: *int 指针传参；JS 无指针，用「可变引用对象」模拟同一实例被修改

type IntRef = { value: number };

function increase(a: IntRef): void {
  a.value++;
  console.log('increase: 值=', a.value, '引用对象=', a);
}

export function run(): void {
  const a: IntRef = { value: 1 };
  console.log('before: 值=', a.value, '引用对象=', a);
  increase(a);
  console.log('after:  值=', a.value, '引用对象=', a);
}
