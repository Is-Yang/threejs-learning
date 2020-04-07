# threejs-learning

### 安装依赖
```javascript
  npm install three
```

### 搭建本地服务器  Node.js server
```javascript
  npm install http-server -g

  // 在文件目录下运行
  http-server . -p 8000
```

### 浏览器WebGL兼容性检查 WebGL.js
```javascript
  if (!THREE.WEBGL.isWebGLAvailable()) {
      var warning = THREE.WEBGL.getWebGLErrorMessage();
      document.getElementById('container').appendChild(warning);
  }

  // 浏览器控制台输入此命令，可以查看three.js版本号
  THREE.REVISION
```
-----


> 在Three.js中，要渲染物体到网页中，我们需要3个组建：场景（scene）、相机（camera）和渲染器（renderer）。有了这三样东西，才能将物体渲染到网页中去。

- 场景（scene）： 模型、灯光等
- 相机（camera）： 观察场景的视角
- 渲染器（renderer）： 场景渲染输出的目标

----

### 辅助工具
- stats.js ： 在动画运行时，该库可以在一个图形中显示画面每秒传输帧数
```javascript
// html添加div元素，用于显示图形
<div id="stats-output"></div>

// js初始化
var stats = new Stats();
// 如果参数设置为“0”，那么我们检测的是画面每秒传输帧数（fps），如果参数设置为1，则检测的是画面渲染时间
stats.setMode(0);
stats.domElement.style.position = 'absolute';
stats.domElement.style.left = '0px';
stats.domElement.style.top = '0px';
document.getElementById("stats-output").appendChild(stats.domElement);

// 在动画方法中调用
stats.update();
```

- dat.gui.js ： 简化实验流程，改变代码变量的界面组件
```javascript

// 创建一个对象，用于需要改变的属性
var controls = new function() {
    this.rotationSpeed = 0.02;
}

// 将对象传递给dat.GUI, 并设置属性的取值范围
var gui = new dat.GUI();
gui.add(controls, 'rotationSpeed', 0, 0.5)

// 执行渲染动画操作
function animate() {
    stats.update();
    // 循环的绘制
    requestAnimationFrame(animate);
    mesh.rotation.x += controls.rotationSpeed;
    mesh.rotation.y += controls.rotationSpeed;

    renderer.render( scene, camera );
}
```

### 场景对浏览器的自适应
```javascript
// 透视投影相机PerspectiveCamera自适应渲染
window.addEventListener('resize', onResize, false);
function onResize() {
    // 重置渲染器输出画布canvas尺寸
    renderer.setSize(window.innerWidth, window.innerHeight);
    // 通常是使用画布的宽/画布的高。默认值是1
    camera.aspect = window.innerWidth / window.innerHeight;
    // 更新摄像机投影
    camera.updateProjectionMatrix();
}
```

```javascript
// 正投影相机OrthographicCamera自适应渲染
window.addEventListener('resize', onResize, false);
function onResize() {
    // 三维场景显示范围控制系数，系数越大，显示的范围越大
    var s = 200; 

    // 重置渲染器输出画布canvas尺寸
    renderer.setSize(window.innerWidth,window.innerHeight);
    // 重置相机投影的相关参数
    k = window.innerWidth/window.innerHeight;//窗口宽高比
    camera.left = -s*k;
    camera.right = s*k;
    camera.top = s;
    camera.bottom = -s;
    // 更新摄像机投影
    camera.updateProjectionMatrix ();
};
```

### 鼠标操作控件 OrbitControls.js
```javascript
/**
 * 创建鼠标控件对象
 */
var controls = new THREE.OrbitControls(camera, renderer.domElement);

// 方法一，使用监听鼠标、键盘事件
// function render() {
//     // 执行渲染操作
//     renderer.render(scene,camera);
// }
// render();
// // 创建控件对象
// var controls = new THREE.OrbitControls(camera,renderer.domElement);
// controls.addEventListener('change', render);


// 方法二requestAnimationFrame动画去执行渲染操作
function animate() {
    requestAnimationFrame( animate );
    // 更新控制器
    controls.update();
    renderer.render( scene, camera );
}

animate()
```
