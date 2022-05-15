import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IField } from '../../model/i-field';
import { IFieldConfig } from '../../model/i-field-config';

@Component({
  selector: 'app-text-box',
  templateUrl: './text-box.component.html',
  styleUrls: ['./text-box.component.css']
})
export class TextBoxComponent implements IField {

  config: IFieldConfig = {
    name: '',
    type: ''
  };
  
  constructor() { }
  
 

  ngOnInit(): void {
  }

}
