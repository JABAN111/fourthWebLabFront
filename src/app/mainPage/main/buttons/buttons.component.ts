// import {Component, OnInit} from '@angular/core';
// import {MultiSelectModule} from "primeng/multiselect";
// import {FormsModule} from "@angular/forms";
// import {SliderModule} from "primeng/slider";
// import {ChipsModule} from "primeng/chips";
// import {ButtonModule} from "primeng/button";
// import {RippleModule} from "primeng/ripple";
// import {ImageComponent} from "../canvas/image.component";
//
// @Component({
//   selector: 'buttons',
//   templateUrl: 'buttons.component.html',
//   standalone: true,
//   imports: [
//     MultiSelectModule,
//     FormsModule,
//     SliderModule,
//     ChipsModule,
//     ButtonModule,
//     RippleModule,
//   ],
//   // styleUrls: ['./point-form.component.css']
// })
// export class ButtonsComponent implements OnInit{
//   xOptions = ['-3', '-2', '-1', '0', '1', '2', '3', '4', '5'];
//   selectedX: string = '';
//
//   selectedY: number = 2.5;
//
//   private imageComponent: ImageComponent = ImageComponent.getImageComponentInstance();
//   radiusOptions = ['-3', '-2', '-1', '0', '1', '2', '3', '4', '5'];
//   selectedRadius: string[] = [];
//   constructor() {}
//
//   ngOnInit(): void {
//     this.imageComponent = ImageComponent.getImageComponentInstance();
//   }
//
//
//   //функция , которая будет проверять выбрана ли одна R и если одна, то сетить радиус
//   updateRadius(){
//     if(this.selectedRadius.length != 1){
//       return;
//     }
//     this.imageComponent.setRadius(+this.selectedRadius[0]);
//   }
//
//   submitForm() {
//     // Handle form submission logic here
//     console.log('Form submitted:', { selectedX: this.selectedX, selectedY: this.selectedY, selectedRadius: this.selectedRadius });
//   }
// }
