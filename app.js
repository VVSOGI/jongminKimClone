import { Polygon } from "./polygon.js";

class App {
  constructor() {
    this.canvas = document.createElement("canvas"); // canvas 생성
    document.body.appendChild(this.canvas); // 바디에 캔버스 추가
    this.ctx = this.canvas.getContext("2d"); // context 생성

    this.pixelRatio = window.devicePixelRatio > 1 ? 2 : 1;
    // 레티나 디스플레이에 맞춰서 비율 2배로.

    window.addEventListener("resize", this.resize.bind(this), false);
    // 웹에서 리사이즈가 걸릴때마다 리사이즈 함수 실행
    this.resize(); // 최초 리사이즈 함수 실행

    this.isDown = false;
    this.moveX = 0;
    this.offsetX = 0;
    // 마우스 무브먼트 변수

    document.addEventListener("pointerdown", this.onDown.bind(this), false);
    document.addEventListener("pointermove", this.onMove.bind(this), false);
    document.addEventListener("pointerup", this.onUp.bind(this), false);
    // 마우스 클릭 중 일때, onDown함수 실행.
    // 마우스 클릭 중 움직일 때, onMove함수 실행.
    // 마우스 클릭 완료 후, onUp함수 실행.

    window.requestAnimationFrame(this.animate.bind(this));
    // 웹에서 animate함수를 빠른 시간안에 계속 실행시켜서 마치 움직이듯이 보인다.
    // 하지만 실제로는 눈으로 잡기 힘들정도로 빠르게 화면을 재 실행시키는 것.
  }

  resize() {
    this.stageWidth = document.body.clientWidth;
    this.stageHeight = document.body.clientHeight;

    this.canvas.width = this.stageWidth * this.pixelRatio;
    this.canvas.height = this.stageHeight * this.pixelRatio;
    this.ctx.scale(this.pixelRatio, this.pixelRatio);

    // 레티나 디스플레이에 맞춰서 리사이즈 해주는 함수.

    this.polygon = new Polygon(
      this.stageWidth / 2,
      this.stageHeight + this.stageHeight / 4,
      this.stageHeight / 1.3,
      15
    );
    // Polygon을 import해와서 새로운 폴리곤을 화면에 위치에 맞게 띄운다.
    // 각각 x, y, radius, side이다.
  }

  animate() {
    window.requestAnimationFrame(this.animate.bind(this));
    // 빠르게 animate 재 실행.
    this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);
    this.moveX *= 0.92;
    // moveX에 움직임을 준다. 1을 넘어가면 한없이 커지기에 1을 넘기지 않게한다.
    this.polygon.animate(this.ctx, this.moveX);
    // 폴리곤에 animate를 실행시킴과 동시에 app의 animate에서 반복 실행하여 애니메이션을 만든다.
  }

  onDown(e) {
    this.isDown = true;
    this.moveX = 0;
    this.offsetX = e.clientX;
    // 마우스 클릭 중 변수 isdown = true;
    // moveX의 움직임을 0으로 바꿈. 움직이는 도중에도 멈출 수 있다.
  }

  onMove(e) {
    if (this.isDown) {
      this.moveX = e.clientX - this.offsetX;
      this.offsetX = e.clientX;
    }
    // isDown이 트루일 때, 움직임 설정.
  }

  onUp(e) {
    this.isDown = false;
  }
}

window.onload = () => {
  new App();
  // 최초로 웹에 내용물 불러오기 위함.
};
