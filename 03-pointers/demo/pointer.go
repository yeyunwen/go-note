package demo

import "fmt"

func increase(a *int) {
	*a++
	fmt.Println("increase: 值=", *a, "地址=", a)
}

func Run() {
	a := 1
	fmt.Println("before: 值=", a, "地址=", &a)
	increase(&a)
	fmt.Println("after:  值=", a, "地址=", &a)
}
