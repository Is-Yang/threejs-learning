

init();
animate();
var scene, camera, renderer, controls;

function init() {
    // 创建场景
    scene = new THREE.Scene;
    // 创建透视照相机
    var fov = 75,
        aspect = window.innerWidth / window.innerHeight,
        near = 0.1,
        far = 100;
    camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    camera.position.z = 0.01;

    var textures = getTextureFromFile('/images/sun_temple_stripe.jpg', 6);

    // 几何体
    var geometry = new THREE.BoxGeometry(1, 1, 1);
    geometry.scale(-1, 1, 1);
    // 材质
    var material = [];
    for (let i = 0; i < 6; i++) {
        material.push(new THREE.MeshBasicMaterial({ map: textures[i]}))
    }

    // 网格
    var mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh)

    // 创建渲染器
    renderer= new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    document.body.appendChild(renderer.domElement);

    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableZoom = false;
    controls.enablePan = false;
    controls.enableDamping = true;

}

window.addEventListener('resize', onWindowResize, false);

function getTextureFromFile(imgUrl, num) {
    var textureData = [];
    for (let i = 0; i < num; i++) {
        textureData[ i ] = new THREE.Texture();
    }

    var imageObj = new Image();
    imageObj.onload = function () {
        var imageWidth = imageObj.height;
        for (let i = 0; i < textureData.length; i++) {
            var canvas = document.createElement('canvas');
            var context = canvas.getContext('2d');
            canvas.width = imageWidth;
            canvas.height = imageWidth;
            context.drawImage(imageObj, imageWidth*i, 0, imageWidth, imageWidth, 0, 0, imageWidth, imageWidth);
            textureData[i].image = canvas;
            textureData[i].needsUpdate = true;
        }
    };

    imageObj.src = imgUrl;

    return textureData;
}

function animate() {
    requestAnimationFrame(animate);
    controls.update();
    // 执行渲染
    renderer.render(scene, camera);
}

// 透视浏览器窗口自适应
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
}
