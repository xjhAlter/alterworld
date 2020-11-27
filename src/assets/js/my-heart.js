// 鼠标抬起事件
document.body.onmouseup = function (e) {
  if (e.button !== 0) return // 只有鼠标左键点击触发
  // 获取坐标
  let x = e.pageX + 5
  let y = e.pageY - 5

  // 获取随机颜色
  let color = 'rgb(' + Math.floor(Math.random() * 255) + ',' + Math.floor(Math.random() * 255) + ',' + Math.floor(Math.random() * 255) + ')'

  // 分别创建所需要的元素节点
  let heart = document.createElement('div')
  let left = document.createElement('div')
  let right = document.createElement('div')
  let under = document.createElement('div')
  heart.style = `width:15px;height:15px;opacity:1;position:absolute;z-index:4096;transition:2s;transform: rotate(45deg);left:${x}px;top:${y}px;`
  left.style = `width: 10px;height: 10px;border-radius: 50%;position: absolute;left:0;top:5px;background:${color}`
  right.style = `width: 10px;height: 10px;border-radius: 50%;position: absolute;left:5px;top:0;background:${color}`
  under.style = `width: 10px;height: 10px;position: absolute;left:5px;top: 5px;background:${color}`

  // 将创建的元素添加到容器中
  heart.appendChild(left)
  heart.appendChild(right)
  heart.appendChild(under)
  document.body.appendChild(heart)

  setTimeout(() => {
    heart.style.transform = 'translateY(-100px) rotate(45deg)'
    heart.style.opacity = '0'
    setTimeout(() => {
      document.body.removeChild(heart)
    }, 2000)
  }, 0)
}
