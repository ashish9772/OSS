import { Component, OnInit, Input } from '@angular/core';

const colrMap = {
  'nightFade': {
    bg: 'bg-night-fade',
    countClr: 'text-white',
    titleClr: 'text-secondary',
    textClr: 'text-white'
  },
  'dark': {
    bg: 'bg-premium-dark',
    countClr: 'text-warning',
    titleClr: 'text-white',
    textClr: 'text-white'
  },
  'green': {
    bg: 'bg-happy-green',
    countClr: 'text-dark',
    titleClr: 'text-white',
    textClr: 'text-white'  
  },
  'arielle': {
    bg: 'bg-arielle-smile',
    countClr: 'text-dark',
    titleClr: 'text-white',
    textClr: 'text-white'  

  }
}
@Component({
  selector: 'app-widget',
  templateUrl: './widget.component.html',
  styleUrls: ['./widget.component.scss']
})
export class WidgetComponent implements OnInit {

  appearance = "column";
  theme = colrMap.arielle;
  @Input('appearance')
  set setAppearance(value: string){
    this.appearance = value || this.appearance;
  }

  @Input('theme')
  set setBg(value: string){
    this.theme = colrMap[value] || this.theme;
  }

  @Input('data') data = null;
  constructor() { }

  ngOnInit(): void {
  }

}
