import {ElementRef, Inject, Injectable} from '@angular/core';
import {UserService} from "./UserService";
import {Result} from "../Utils/Result";
import {User} from "../Utils/User";

@Injectable()
export class CanvasService {
  w = 300;
  h = 300;
  private hatchWidth: number = 20 / 2;
  private hatchGap: number = 56;

  //default value: 2
  private currentRadius = 2;

  constructor(private ctx: CanvasRenderingContext2D | null, private canvas: ElementRef<HTMLCanvasElement>, @Inject(Result) private results: Result[]) {
  }

  sections = [
    {
      name: 'first_quarter',
      draw: () => {
        this.ctx?.beginPath();
        this.ctx!.fillStyle = "#0b04D5";

        this.ctx?.moveTo(this.w / 2, this.h / 2);
        this.ctx?.arc(this.w / 2, this.h / 2, this.hatchGap * 2, 0, -Math.PI / 2, true);

        this.ctx?.fill();
        this.ctx?.stroke();
      }
    },
    {
      name: "third_quarter",
      draw: () => {
        this.ctx?.beginPath();
        this.ctx!.fillStyle = "#0b04D5";

        this.ctx?.moveTo(this.w / 2 - this.hatchGap * 2, this.h / 2);
        this.ctx?.lineTo(this.w / 2, this.h / 2 + this.hatchGap);
        this.ctx?.lineTo(this.w / 2, this.h / 2);

        this.ctx?.fill();
        this.ctx?.stroke();
      }
    },
    {
      name: "fourth_quarter",
      draw: () => {
        this.ctx?.beginPath();
        this.ctx!.fillStyle = "#0B04D5";

        this.ctx?.moveTo(this.w / 2, this.h / 2 + this.hatchGap);
        this.ctx?.lineTo(this.w / 2 + this.hatchGap * 2, this.h / 2 + this.hatchGap);
        this.ctx?.lineTo(this.w / 2 + this.hatchGap * 2, this.h / 2);
        this.ctx?.lineTo(this.w / 2, this.h / 2);

        this.ctx?.fill();
        this.ctx?.stroke();
      }
    }
  ];

  setRadius(newRadius: number) {
    this.currentRadius = newRadius;
    this.drawCanvas();
  }

  drawCanvas(): void {
    if (this.ctx) {
      this.ctx.clearRect(0, 0, this.w, this.h);
      this.ctx.lineWidth = 2;
      this.ctx.strokeStyle = 'black';
      for (const section of this.sections) {
        section.draw();
      }
      this.drawAxesAndHatch()
      this.numCord();
    }
  }

  mouseHandler(event: MouseEvent,user:User) {
    const rect = this.canvas.nativeElement.getBoundingClientRect();
    this.mouse.x = event.clientX - rect.left;
    this.mouse.y = event.clientY - rect.top;
    return this.clickingProcessing(this.mouse.x, this.mouse.y,user);
  }

  clickingProcessing(clickedX: number, clickedY: number,user:User) {
    const w = this.canvas.nativeElement.width;
    const h = this.canvas.nativeElement.height;

    const x = ((((clickedX - w / 2) / this.hatchGap) / 2) * this.currentRadius).toFixed(3);
    const y = ((-((clickedY - h / 2) / this.hatchGap) / 2) * this.currentRadius).toFixed(3);
    let resultToSend: Result = new Result(+x, +y, this.currentRadius, new Date(), null, user);
    return {
      x: parseFloat(x),
      y: parseFloat(y),
      resultToSend: resultToSend
    };
  }

  numCord(): void {
    if (this.currentRadius === null)
      return;
    this.ctx!.font = "20px Segue UI";
    this.ctx!.fillStyle = "black";
    const indent: number = 20;
    //ось x, положительная часть
    this.ctx?.fillText(`${this.currentRadius / 2}`, this.w / 2 + this.hatchGap, this.h / 2 + indent);
    this.ctx?.fillText(`${this.currentRadius}`, this.w / 2 + this.hatchGap * 2, this.h / 2 + indent);

    //ось x, отрицательная часть
    this.ctx?.fillText(`${-this.currentRadius / 2}`, this.w / 2 - this.hatchGap, this.h / 2 + indent);
    this.ctx?.fillText(`${-this.currentRadius}`, this.w / 2 - this.hatchGap * 2, this.h / 2 + indent);

    //ось y, положительная часть
    this.ctx?.fillText(`${this.currentRadius / 2}`, this.w / 2 + indent, this.h / 2 - this.hatchGap);
    this.ctx?.fillText(`${this.currentRadius}`, this.w / 2 + indent, this.h / 2 - this.hatchGap * 2);

    //ось y, отрицательная часть
    this.ctx?.fillText(`${-this.currentRadius / 2}`, this.w / 2 + indent, this.h / 2 + this.hatchGap);
    this.ctx?.fillText(`${-this.currentRadius}`, this.w / 2 + indent, this.h / 2 + this.hatchGap * 2);
  }

  drawAxesAndHatch(): void {
    // y ось
    this.ctx?.beginPath();
    this.ctx?.moveTo(this.w / 2, 0);
    this.ctx?.lineTo(this.w / 2 - 10, 15);
    this.ctx?.moveTo(this.w / 2, 0);
    this.ctx?.lineTo(this.w / 2 + 10, 15);
    this.ctx?.moveTo(this.w / 2, 0);
    this.ctx?.lineTo(this.w / 2, this.h);
    this.ctx?.stroke();
    this.ctx?.closePath();

    // x ось
    this.ctx?.beginPath();
    this.ctx?.moveTo(this.w, this.h / 2);
    this.ctx?.lineTo(this.w - 15, this.h / 2 - 10);
    this.ctx?.moveTo(this.w, this.h / 2);
    this.ctx?.lineTo(this.w - 15, this.h / 2 + 10);
    this.ctx?.moveTo(this.w, this.h / 2);
    this.ctx?.lineTo(0, this.h / 2);
    this.ctx?.stroke();
    this.ctx?.closePath();

    //штрихи
    this.ctx?.beginPath();
    this.ctx?.moveTo(this.w / 2 - this.hatchWidth, this.h / 2 - this.hatchGap);
    this.ctx?.lineTo(this.w / 2 + this.hatchWidth, this.h / 2 - this.hatchGap);
    this.ctx?.moveTo(this.w / 2 - this.hatchWidth, this.h / 2 - this.hatchGap * 2);
    this.ctx?.lineTo(this.w / 2 + this.hatchWidth, this.h / 2 - this.hatchGap * 2);
    this.ctx?.moveTo(this.w / 2 - this.hatchWidth, this.h / 2 + this.hatchGap);
    this.ctx?.lineTo(this.w / 2 + this.hatchWidth, this.h / 2 + this.hatchGap);
    this.ctx?.moveTo(this.w / 2 - this.hatchWidth, this.h / 2 + this.hatchGap * 2);
    this.ctx?.lineTo(this.w / 2 + this.hatchWidth, this.h / 2 + this.hatchGap * 2);
    this.ctx?.moveTo(this.w / 2 - this.hatchGap, this.h / 2 - this.hatchWidth);
    this.ctx?.lineTo(this.w / 2 - this.hatchGap, this.h / 2 + this.hatchWidth);
    this.ctx?.moveTo(this.w / 2 - this.hatchGap * 2, this.h / 2 - this.hatchWidth);
    this.ctx?.lineTo(this.w / 2 - this.hatchGap * 2, this.h / 2 + this.hatchWidth);
    this.ctx?.moveTo(this.w / 2 + this.hatchGap, this.h / 2 - this.hatchWidth);
    this.ctx?.lineTo(this.w / 2 + this.hatchGap, this.h / 2 + this.hatchWidth);
    this.ctx?.moveTo(this.w / 2 + this.hatchGap * 2, this.h / 2 - this.hatchWidth);
    this.ctx?.lineTo(this.w / 2 + this.hatchGap * 2, this.h / 2 + this.hatchWidth);
    this.ctx?.stroke();
    this.ctx?.closePath();
  }
  addOldDotsOnPage(){
    for (let result of this.results){
      this.printDotOnGraphByResult(result);
    }
  }
  zoomIn() {
    this.canvas.nativeElement.height += 100;
    this.h += 100;
    this.hatchGap += 15;

    this.canvas.nativeElement.width += 100;
    this.w += 100;

    this.drawCanvas();
    this.addOldDotsOnPage();
  }
  zoomToDefault() {
    this.canvas.nativeElement.height = 300;
    this.h = 300;
    this.hatchGap = 56;

    this.canvas.nativeElement.width = 300;
    this.w = 300;
    this.drawCanvas();
    this.addOldDotsOnPage();
  }
  clearAll() {
    this.drawCanvas();
    this.results = [];
  }

  printDotOnGraphByResult(result: Result) {
    this.printDotOnGraph(result.x, result.y, result.hit);
  }

  printDotOnGraph(xCenter: number, yCenter: number, isHit: boolean | null): void {
    if (isHit !== null) {
      this.ctx!.fillStyle = isHit ? '#1AFF00' : '#ff0000';
    } else
      this.ctx!.fillStyle = '#eaca07'
    let x: number = this.w / 2 + xCenter * this.hatchGap * (2 / (this.currentRadius as number));
    let y: number = this.h / 2 - yCenter * this.hatchGap * (2 / (this.currentRadius as number));

    this.ctx?.beginPath();
    this.ctx?.arc(x, y, 3, 0, 2 * Math.PI);
    this.ctx?.fill();

    this.ctx?.closePath();
  }

  mouse: { x: number, y: number } = {
    x: 0,
    y: 0
  };
}
