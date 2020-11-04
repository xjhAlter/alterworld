// 鼠标抬起事件
document.body.onmouseup = function (e) {
  // 获取坐标
  let x = e.pageX - 10
  let y = e.pageY - 10

  // 获取随机颜色
  let color = 'rgb(' + Math.floor(Math.random() * 255) + ',' + Math.floor(Math.random() * 255) + ',' + Math.floor(Math.random() * 255) + ')'

  // 分别创建所需要的元素节点
  let heart = document.createElement('div')
  let left = document.createElement('div')
  let right = document.createElement('div')
  let under = document.createElement('div')
  heart.style = `width:20px;height:20px;opacity:1;position:absolute;z-index:4096;transition:2s;left:${x}px;top:${y}px;`
  left.style = `width: 10px;height: 10px;border-radius: 100%;position: absolute;background:${color}`
  right.style = `width: 10px;height: 10px;border-radius: 100%;position: absolute;right:0;background:${color}`
  under.style = `width: 10px;height: 10px;position: absolute;top: 5px;left: 5px;transform: rotate(45deg);background:${color}`

  // 将创建的元素添加到容器中
  heart.appendChild(left)
  heart.appendChild(right)
  heart.appendChild(under)
  document.body.appendChild(heart)

  setTimeout(() => {
    heart.style.transform = 'translateY(-100px)'
    heart.style.opacity = '0'
    setTimeout(() => {
      document.body.removeChild(heart)
    }, 2000)
  }, 0)
}
