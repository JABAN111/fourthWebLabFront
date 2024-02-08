import {Component, OnInit} from "@angular/core";
import {DatePipe} from "@angular/common";

@Component({
  selector: "clock",
  template: `
    <div>{{ currentTime | date: "HH:mm:ss" }}</div>`,
  imports: [
    DatePipe
  ],
  standalone: true
})


export class ClockComponent implements OnInit{
  currentTime: Date = new Date();
  ngOnInit() {
    setInterval(() =>{
      this.currentTime = new Date();}
  ,1000);
  }
}
