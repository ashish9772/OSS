import { Component, OnInit, Inject } from '@angular/core';
import { FORMLY_CONFIG } from '../../constants';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent implements OnInit {

  constructor(@Inject(FORMLY_CONFIG) config: string) {
    console.log(config)
   }

  ngOnInit(): void {
  }

}
