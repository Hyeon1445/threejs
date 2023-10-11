export class PreventDragClick {
  constructor(canvas) {
    this.mouseMoved;
    let clickStartX;
    let clickStartY;
    let clickStartTime;
    canvas.addEventListener("mousedown", (e) => {
      clickStartX = e.clickStartX;
      clickStartY = e.clickStartY;
      clickStartTime = Date.now();
    });

    canvas.addEventListener("mouseup", (e) => {
      const xGap = Math.abs(e.clickStartX - clickStartX);
      const yGap = Math.abs(e.clickStartY - clickStartY);
      const timeGap = Date.now() - clickStartTime;

      this.mouseMoved = xGap > 5 || yGap > 5 || timeGap > 500;
    });
  }
}
