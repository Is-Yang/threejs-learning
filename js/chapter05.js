var scene = new THREE.Scene;

var camera = new THREE.PerspectiveCamera(105, window.innerWidth / window.innerHeight, 1, 1000);
// 创建一个三维向量 (0, 0, 0) - (x, y, z)
camera.target = new THREE.Vector3(0, 0, 0)

// 创建一个缓冲几何体
var geometry = new THREE.SphereBufferGeometry(100, 50, 40);
geometry.scale(1, 1, -1);

// 加载图片
var texture = new THREE.TextureLoader().load('/images/fullview.jpg');
// 设置材质对象，设置图片集合
var material = new THREE.MeshBasicMaterial({
    map: texture
})
// 将几何体，与材质放入网格中
var mesh = new THREE.Mesh(geometry, material);
scene.add(mesh)

/**
 * 创建渲染器三部曲
 * 设置像素比
 * 设置渲染视图的大小
 * 将节点追加到dom中
 *  */ 
var renderer = new THREE.WebGLRenderer();
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

animate();

window.addEventListener('resize', onResize, false);

function onResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}


// 监听鼠标按下
document.addEventListener( 'mousedown', onPointerStart, false );
// 监听鼠标移动
document.addEventListener( 'mousemove', onPointerMove, false );
// 监听鼠标释放
document.addEventListener( 'mouseup', onPointerUp, false );

// 监听鼠标缩放
document.addEventListener('wheel', onDocumentMouseWheel, false);

// 监听触摸开始
document.addEventListener( 'touchstart', onPointerStart, false );
// 监听触摸移动
document.addEventListener( 'touchmove', onPointerMove, false );
// 监听触摸结束
document.addEventListener( 'touchend', onPointerUp, false );


var isUserInteracting = false,
    onMouseDownMouseX = 0, onMouseDownMouseY = 0,
    lon = 0, onMouseDownLon = 0,
    lat = 0, onMouseDownLat = 0,
    phi = 0, theta = 0;

function onPointerStart( event ) {

    isUserInteracting = true;

    var clientX = event.clientX || event.touches[ 0 ].clientX;
    var clientY = event.clientY || event.touches[ 0 ].clientY;

    onMouseDownMouseX = clientX;
    onMouseDownMouseY = clientY;

    onMouseDownLon = lon;
    onMouseDownLat = lat;

}

function onPointerMove( event ) {

    if ( isUserInteracting === true ) {

        var clientX = event.clientX || event.touches[ 0 ].clientX;
        var clientY = event.clientY || event.touches[ 0 ].clientY;

        lon = ( onMouseDownMouseX - clientX ) * 0.1 + onMouseDownLon;
        lat = ( clientY - onMouseDownMouseY ) * 0.1 + onMouseDownLat;

    }

}

function onPointerUp() {
    isUserInteracting = false;
}

function onDocumentMouseWheel() {
    var fov = camera.fov + event.deltaY * 0.05;
    camera.fov = THREE.MathUtils.clamp( fov, 10, 75 );
    camera.updateProjectionMatrix();
}

function animate() {
    requestAnimationFrame( animate );
    update();
}

function update() {

    if ( isUserInteracting === false ) {
        lon += 0.1;
    }

    lat = Math.max( - 85, Math.min( 85, lat ) );
    phi = THREE.MathUtils.degToRad( 90 - lat );
    theta = THREE.MathUtils.degToRad( lon );

    camera.target.x = 500 * Math.sin( phi ) * Math.cos( theta );
    camera.target.y = 500 * Math.cos( phi );
    camera.target.z = 500 * Math.sin( phi ) * Math.sin( theta );

    camera.lookAt( camera.target );

    renderer.render( scene, camera );
}
