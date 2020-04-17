/**
 * 创建场景对象Scene
 */
var scene = new THREE.Scene();

/**
 * 创建网格模型
 */
// 创建一个立方体几何对象Geometry 长-宽-高
var geometry = new THREE.BoxGeometry(100, 100, 100); 
 // 材质对象Material 一种阴影分明的材质
var material = new THREE.MeshLambertMaterial({
    color: 0xff1100
});
// 网格模型对象Mesh
var mesh = new THREE.Mesh(geometry, material); 
// 网格模型添加到场景中
scene.add(mesh); 


/**
 * 光源设置
 */
// 点光源 光照强度
var point = new THREE.PointLight(0xffffff);
point.position.set(100, 200, 300); // 点光源位置
// 点光源添加到场景中
scene.add(point); 
// 环境光
var ambient = new THREE.AmbientLight(0x666666);
scene.add(ambient);

/**
 * 相机设置
 */
// 窗口宽度
var width = window.innerWidth; 
// 窗口高度
var height = window.innerHeight; 
// 窗口宽高比
var k = width / height;
// 三维场景显示范围控制系数，系数越大，显示的范围越大
var s = 200; 

/**
 * 
 * 创建相机对象, 参数对应如下
 * 
 * left — 摄像机视锥体左侧面。
 * right — 摄像机视锥体右侧面。
 * top — 摄像机视锥体上侧面。
 * bottom — 摄像机视锥体下侧面。
 * near — 摄像机视锥体近端面。
 * far — 摄像机视锥体远端面。
 */
var camera = new THREE.OrthographicCamera(-s * k, s * k, s, -s, 1, 1000);
camera.position.set(200, 300, 200); // 设置相机位置
camera.lookAt(scene.position); // 设置相机方向(指向的场景对象)

/**
 * 创建渲染器对象
 */
var renderer = new THREE.WebGLRenderer();
renderer.setSize(width, height); //设置渲染区域尺寸
renderer.setClearColor(0xb9d3ff, 1); //设置背景颜色
document.body.appendChild(renderer.domElement); //body元素中插入canvas对象

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
    requestAnimationFrame(animate);
    // 更新控制器
    controls.update();
    renderer.render(scene, camera);
}

animate()