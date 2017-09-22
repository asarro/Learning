import { AfterContentChecked, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IMdlTableModelItem, MdlDefaultTableModel } from '@angular-mdl/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements AfterContentChecked {
  public tableData: [ITableItem] = [
    { material: 'Acrylic (Transparent)', quantity: 25, unitPrice: 2.90, selected: true },
    { material: 'Plywood (Birch)', quantity: 50, unitPrice: 1.25, selected: false },
    { material: 'Laminate (Gold on Blue)', quantity: 10, unitPrice: 2.35, selected: false }
  ];

  public selected: Array<ITableItem> = new Array<ITableItem>();
  public tableModel = new MdlDefaultTableModel([
    { key: 'material', name: 'Material', sortable: true },
    { key: 'quantity', name: 'Quantity', sortable: true, numeric: true },
    { key: 'unitPrice', name: 'Unit price', numeric: true }
  ]);

  @Output() loadEvent = new EventEmitter<any>();
  @Input() show: boolean = false;

  constructor() {
    this.tableModel.addAll(this.tableData);
    this.selected = this.tableData.filter(data => data.selected);
  }


  selectionChanged($event) {
    this.selected = $event.value;
  }


  public ngAfterContentChecked(): void {
    this.loadEvent.emit(true);
    this.show=true;
  }
}

interface ITableItem extends IMdlTableModelItem {
  material: string;
  quantity: number;
  unitPrice: number;
}
