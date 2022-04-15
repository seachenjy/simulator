/*
 * @Author: sea
 * @Email: 364095436@qq.com
 * @Date: 2022-03-02 12:36:32
 * @LastEditTime: 2022-03-06 21:19:28
 * @FilePath: /simulator/action/action.go
 */
package action

import (
	"github.com/go-vgo/robotgo"
)

// 协议
type IncomingMessage struct {
	T string `json:"t"` //类型 move, scroll, click, rand, input, key
	X int    `json:"x"` //位置 X
	Y int    `json:"y"` //位置 Y
	S string `json:"s"` //输入字符串
	K []int  `json:"k"` //按键
}

func (job IncomingMessage) Run() bool {
	switch job.T {

	case "move":
		return robotgo.MoveSmooth(job.X, job.Y, 1.0, 2.0)

	case "left_click":
		robotgo.Click("left")
		return true

	case "right_click":
		robotgo.Click("right")
		return true

	case "scroll":
		robotgo.ScrollSmooth(job.Y)
		return true

	case "input":
		robotgo.TypeStr(job.S)
		return true

	default:
		return false
	}
}
