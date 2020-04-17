/**
 * 创建场景对象Scene
 *  */ 
var scene = new THREE.Scene();

/**
 * 相机设置
 * 
 * 使用PerspectiveCamera（透视摄像机）
 * 第一个参数：fov 视野的角度，以角度为单位。
 * 第二个参数：aspect 长宽比
 * 第三个参数：near 近截面
 * 第四个参数：far 远截面
 */
var fov = 45;
var aspect = window.innerWidth / window.innerHeight;
var near = 1;
var far = 1000;
var camera = new THREE.PerspectiveCamera(fov, aspect, near, far);

/**
 * 创建渲染器
 */
var renderer = new THREE.WebGLRenderer();
// 设置渲染区域尺寸
renderer.setSize(window.innerWidth, window.innerHeight);
// 设置背景颜色
renderer.setClearColor('#666')
// 将dom元素添加到body中
document.body.appendChild(renderer.domElement);


/**
 * 创建一个网格模型
 * 
 * BoxGeometry(立方体) SphereGeometry(球体)
 */
var geometry = new THREE.BoxGeometry();

// 设置材质对象MeshBasicMaterial，设置color属性颜色值
var material = new THREE.MeshBasicMaterial({ 
    color: '#fff'
})
// 创建一个Mesh(网格) 网格包含一个几何体以及作用在此几何体上的材质 将网格对象放入到我们的场景中
var mesh = new THREE.Mesh(geometry, material);
scene.add(mesh); 

/**
 *  默认情况下，物体将会添加到（0，0，0）的坐标，将使摄像机与立方体彼此在一起
 * 我们需要将摄像机稍微向外移动一些
 *  */
camera.position.z = 5;

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

animate();

window.addEventListener('resize', onResize, false);

function onResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}
