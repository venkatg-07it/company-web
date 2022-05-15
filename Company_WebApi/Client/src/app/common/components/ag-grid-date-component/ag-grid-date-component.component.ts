
import {Component, ElementRef, ViewChild} from '@angular/core';

import {IDateParams} from '@ag-grid-community/core';
import {IDateAngularComp} from '@ag-grid-community/angular';

// we'll be using the globally provided flatpickr for our example
declare var flatpickr : any;

@Component({
  selector: 'app-ag-grid-date-component',
  templateUrl: './ag-grid-date-component.component.html',
  styleUrls: ['./ag-grid-date-component.component.css']
})
export class AgGridDateComponentComponent implements IDateAngularComp  {

  @ViewChild("flatpickrEl", {read: ElementRef}) flatpickrEl: ElementRef | undefined;
  @ViewChild("eInput", {read: ElementRef}) 
  eInput: ElementRef | undefined;
  private date: Date = new Date();
  private params: IDateParams | undefined;
  private picker: any;

  agInit(params: IDateParams): void {
      this.params = params;
  }

  ngAfterViewInit(): void {
      this.picker = flatpickr(this.flatpickrEl?.nativeElement, {
          onChange: this.onDateChanged.bind(this),
          wrap: true
      });

      this.picker.calendarContainer.classList.add('ag-custom-component-popup');
  }

  ngOnDestroy() {
      console.log(`Destroying DateComponent`);
  }

  onDateChanged(selectedDates: any) {
      this.date = selectedDates[0] || null;
      this.params?.onDateChanged();
  }

  getDate(): Date {
      return this.date;
  }

  setDate(date: Date): void {
      this.date = date || null;
      this.picker.setDate(date);
  }

  setInputPlaceholder(placeholder: string): void {
      this.eInput?.nativeElement.setAttribute('placeholder', placeholder);
  }

  setInputAriaLabel(label: string): void {
      this.eInput?.nativeElement.setAttribute('aria-label', label);
  }

}
