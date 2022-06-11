import * as THREE from "three";
import { OrbitControls } from "./jsm/controls/OrbitControls.js";

let scene, camera, renderer, pointLight, controls;

window.addEventListener("load", init);

function init() {
    // シーンを追加
    scene = new THREE.Scene();

    // カメラを追加
    camera = new THREE.PerspectiveCamera(
        50,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
    );
    camera.position.set(0, 0, 500);

    // レンダラーを追加
    renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    document.body.appendChild(renderer.domElement);

    // テクスチャを追加
    let textures = new THREE.TextureLoader().load("./textures/earth.jpeg");

    // ジオメトリを作成
    let ballGeometry = new THREE.SphereGeometry(100, 64, 32);

    // マテリアルを作成
    let ballMaterial = new THREE.MeshPhysicalMaterial({ map: textures });

    // メッシュ化
    let ballMesh = new THREE.Mesh(ballGeometry, ballMaterial);
    scene.add(ballMesh);

    // 平行光源を追加してみよう
    let directionalLight = new THREE.DirectionalLight(0xffffff, 2);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);

    // ポイント光源を追加してみよう
    pointLight = new THREE.PointLight(0xffffff, 1);
    pointLight.position.set(-200, -200, -200);
    scene.add(pointLight);

    // ポイント光源の特定
    let pointLightHelper = new THREE.PointLightHelper(pointLight, 30);
    scene.add(pointLightHelper);

    // マウス操作ができるようにする
    controls = new OrbitControls(camera, renderer.domElement);

    window.addEventListener("resize", onWindowResize);

    animate();
}

// ブラウザのリサイズに対応
function onWindowResize() {
    // レンダラーのサイズを随時更新
    renderer.setSize(window.innerWidth, window.innerHeight);

    // カメラのアスペクト比を正す
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix();
}

function animate() {
    // ポイント光源を球の周りを巡回させよう
    pointLight.position.set(
        200 * Math.sin(Date.now() / 500),
        200 * Math.sin(Date.now() / 1000),
        200 * Math.cos(Date.now() / 500)
    );

    // レンダリングしてみよう
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
}
