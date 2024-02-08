import {AfterViewInit, Component, ElementRef, ViewChild} from "@angular/core";
import {HeaderComponent} from "../header/header.component";
import {SliderModule} from "primeng/slider";
import {FormsModule} from "@angular/forms";
import {MultiSelectModule} from "primeng/multiselect";
import {RippleModule} from "primeng/ripple";
import {ButtonModule} from "primeng/button";

@Component({
  selector: "main",
  standalone: true,
  imports: [
    HeaderComponent,
    SliderModule,
    FormsModule,
    MultiSelectModule,
    RippleModule,
    ButtonModule,
  ],
  templateUrl: "mainPage.component.html"
})

export class MainPageComponent implements AfterViewInit{
  @ViewChild('myCanvas', {static: true})
  canvas!: ElementRef<HTMLCanvasElement>;
  private ctx!: CanvasRenderingContext2D | null;
   w = 300;
   h = 300;
  private hatchWidth: number = 20 / 2;
  private hatchGap: number = 56;
  //default value: 2
  private currentRadius = 2;


  ngAfterViewInit(): void {
    this.ctx = this.canvas.nativeElement.getContext('2d');
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
      this.numCoord();

    }
  }

  mouseHandler(event:MouseEvent){
    console.log("мы в мышке");
    const rect = this.canvas.nativeElement.getBoundingClientRect();
    this.mouse.x = event.clientX - rect.left;
    this.mouse.y = event.clientY - rect.top;
    return this.clickingProcessing(this.mouse.x, this.mouse.y);
  }
  clickingProcessing(clickedX: number, clickedY: number): { x: number, y: number } {
    const w = this.canvas.nativeElement.width;
    const h = this.canvas.nativeElement.height;

    const x = ((((clickedX - w / 2) / this.hatchGap) / 2) * this.currentRadius).toFixed(3);
    const y = ((-((clickedY - h / 2) / this.hatchGap) / 2) * this.currentRadius).toFixed(3);

    // Assuming you have a function 'sendCoordinates' defined somewhere.
    // this.sendCoordinates(parseFloat(x), parseFloat(y));
    this.printDotOnGraph(+x,+y,true);
    return {
      x: parseFloat(x),
      y: parseFloat(y),
    };
  }
  numCoord(): void {
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
    this.ctx?.fillText(`${this.currentRadius / 2}`, this.w / 2 + indent, this.h / 2 + this.hatchGap);
    this.ctx?.fillText(`${this.currentRadius}`, this.w / 2 + indent, this.h / 2 + this.hatchGap * 2);
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
  sections = [
    {
      name: 'first_quarter',
      draw: () => {
        this.ctx?.beginPath();
        this.ctx!.fillStyle = "#0B04D5";
        this.ctx?.moveTo(this.w / 2, this.h / 2 - this.hatchGap * 2);
        this.ctx?.lineTo(this.w / 2 + this.hatchGap, this.h / 2 - this.hatchGap * 2);
        this.ctx?.lineTo(this.w / 2 + this.hatchGap, this.h / 2);
        this.ctx?.lineTo(this.w / 2, this.h / 2);

        this.ctx?.fill();
        this.ctx?.stroke();
      }
    },
    {
      name: "second_quarter",
      draw: () => {
        this.ctx?.beginPath();
        this.ctx!.fillStyle = "#0B04D5";

        this.ctx?.moveTo(this.w / 2, this.h / 2 - this.hatchGap);
        this.ctx?.lineTo(this.w / 2 - this.hatchGap, this.h / 2);
        this.ctx?.lineTo(this.w / 2, this.h / 2);

        this.ctx?.fill();
        this.ctx?.stroke();
      }
    },
    {
      name: "third_quarter",
      draw: () => {
        this.ctx?.beginPath()
        this.ctx!.fillStyle = "#0B04D5"

        this.ctx?.moveTo(this.w / 2, this.h / 2);
        this.ctx?.arc(this.w / 2, this.h / 2, this.hatchGap * 2, Math.PI, Math.PI / 2, true);

        this.ctx?.fill();
        this.ctx?.stroke();
      }
    }
  ];
  setRadius(newRadius: number) {
    console.log("Пришло значение = " + newRadius);
    this.currentRadius = newRadius;
    this.drawCanvas();
  }
  xOptions = ['-3', '-2', '-1', '0', '1', '2', '3', '4', '5'];
  selectedX: string[] = ['0'];

  selectedY: number = 2.5;

  radiusOptions = ['-3', '-2', '-1','0', '1', '2', '3', '4', '5'];
  selectedRadius: string[] = [];

  zoomIn(){
    this.canvas.nativeElement.height += 100;
    this.h += 100;

    this.canvas.nativeElement.width += 100;
    this.w += 100;
    this.drawCanvas();
  }

  zoomToDefault(){
    this.canvas.nativeElement.height = 300;
    this.h = 300;

    this.canvas.nativeElement.width = 300;
    this.w = 300;
    this.drawCanvas();
  }
  updateRadius(){
    let radius = this.validatorValue(this.selectedRadius)
    if(radius){
      this.setRadius(radius);
    }
  }
  validatorValue(selectedOption: string[]){
    if(selectedOption.length != 1){
      //заменить бы
      throw new Error("invalid radius");
    }
    return +selectedOption[0];
  }
  clearAll(){
    this.drawCanvas();
  }
  submitForm() {
    let x = this.validatorValue(this.selectedX);
    let y = this.selectedY;
    if(x != null || y != null) {
      //временно always true
      this.printDotOnGraph(x, y, true);
    }
    // Handle form submission logic here
    console.log('Form submitted:', { selectedX: this.selectedX, selectedY: this.selectedY, selectedRadius: this.selectedRadius });
  }

  printDotOnGraph(xCenter:  number, yCenter: number, isHit: boolean | null): void {
    if (isHit !== null){
      this.ctx!.fillStyle = isHit ? '#1AFF00' : '#ff0000';
    }
    else
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
