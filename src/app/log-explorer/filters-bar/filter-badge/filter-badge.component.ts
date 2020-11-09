import {Component, Input, OnInit} from '@angular/core';
import {ClickhouseService} from '../../../_services/clickhouse.service';
import {Meta} from '../../../_models/ClickhouseResponse';
import {Filter, filterOpToString, stringToFilterOp} from '../../../_models/Filter';

@Component({
  selector: 'app-filter-badge',
  templateUrl: './filter-badge.component.html',
  styleUrls: ['./filter-badge.component.scss']
})
export class FilterBadgeComponent implements OnInit {

  @Input() filter: Filter;

  key = '';
  value: any;
  op = '';

  editMode = false;
  fields: Meta[] = [];

  constructor(private clickhouseService: ClickhouseService) { }

  ngOnInit(): void {
    this.key = this.filter.field;
    this.value = this.filter.value;
    this.op = filterOpToString(this.filter.op);
    this.clickhouseService.tableStructure$.subscribe(s => this.fields = s);
  }

  removeFilter(k): void {
    this.clickhouseService.removeFilter(k);
  }

  updateFilter(updatedValue: string, updatedOp: string): void {
    this.clickhouseService.updateFilters(this.key, updatedValue, stringToFilterOp(updatedOp));
  }

  isStringFilter(): boolean {
    return ClickhouseService.isStringType(this.filter);
  }

}
