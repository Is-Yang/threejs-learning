// 创建场景对象
var scene = new THREE.Scene();

/* 使用PerspectiveCamera（透视摄像机）
* 第一个参数：fov 视野的角度，以角度为单位。
* 第二个参数：aspect 长宽比
* 第三个参数：near 近截面
* 第四个参数：far 远截面
*/
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000 );
camera.position.z = 5;

var renderer = new THREE.WebGLRenderer();

// 创建鼠标控制器
var controls = new THREE.OrbitControls(camera, renderer.domElement);

// 为场景添加背景贴图
function sceneBackground() {
    var path = "/images/";
    /**
     * 数组长度为6的图像数组
     * 指定顺序: pos-x, neg-x, pos-y, neg-y, pos-z, neg-z
     * 环境中上下左右前后六张视图图片作为立方体盒子的纹理贴图
     *  */ 
    var urls = [
        path + "posx.jpg", 
        path + "negx.jpg",
        path + "posy.jpg", 
        path + "negy.jpg",
        path + "posz.jpg", 
        path + "negz.jpg"
    ];

    // 使用CubeTextureLoader加载器
    var textureCube = new THREE.CubeTextureLoader().load( urls );
    scene.background = textureCube;
}
sceneBackground();


// 渲染视图
function readerView() {
    // 设置设备像素比 
    renderer.setPixelRatio( window.devicePixelRatio );
    // 渲染大小
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild(renderer.domElement); 
}
readerView();

// 动画效果
function animate() {
    stats.update();
    requestAnimationFrame(animate);
    // 更新控制器
    controls.update();
    renderer.render(scene, camera);
}
animate()

// 监听屏幕缩放，让场景对浏览器自适应
window.addEventListener('resize', onResize, false);
function onResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}
