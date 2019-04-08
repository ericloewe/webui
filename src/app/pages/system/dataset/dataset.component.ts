import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import * as _ from 'lodash';
import { RestService, WebSocketService } from '../../../services/';
import { FieldConfig } from '../../common/entity/entity-form/models/field-config.interface';
import { helptext_system_dataset } from 'app/helptext/system/dataset';

@Component({
  selector: 'app-system-dataset',
  template : `<entity-form [conf]="this"></entity-form>`
})
export class DatasetComponent implements OnInit{

  protected resource_name: string = 'storage/dataset';
  protected volume_name: string = 'storage/volume';
  public formGroup: FormGroup;

  public fieldConfig: FieldConfig[] = [{
    type: 'select',
    name: 'pool',
    placeholder: helptext_system_dataset.pool.placeholder,
    tooltip: helptext_system_dataset.pool.tooltip,
    options: [
      {label: '---', value: null},
      { label: 'freenas-boot', value: 'freenas-boot' },
    ]
  },{
      type: 'checkbox',
      name: 'syslog',
      placeholder: helptext_system_dataset.syslog.placeholder,
      tooltip : helptext_system_dataset.syslog.tooltip
    },{
      type: 'checkbox',
      name: 'rrd',
      placeholder: helptext_system_dataset.rrd.placeholder,
      tooltip : helptext_system_dataset.rrd.tooltip
    }];

  private pool: any;
  private syslog: any;
  private rrd: any;
  constructor(private rest: RestService, private ws: WebSocketService) {}

  ngOnInit() {
    this.rest.get(this.volume_name, {}).subscribe( res => {
       if (res) {
         this.pool = _.find(this.fieldConfig, {'name': 'pool'});
         res.data.forEach( x => {
           this.pool.options.push({ label: x.name, value: x.name});
         });
       }
    });
  }

  afterInit(entityForm: any) {
    this.ws.call('systemdataset.config').subscribe(res => {
      entityForm.formGroup.controls['pool'].setValue(res.pool);
      entityForm.formGroup.controls['syslog'].setValue(res.syslog);
      entityForm.formGroup.controls['rrd'].setValue(res.rrd);
    });

    entityForm.submitFunction = this.submitFunction;
  }

  submitFunction() {
    const payload = {};
    const formvalue = _.cloneDeep(this.formGroup.value);
    payload['pool'] = formvalue.pool;
    payload['syslog'] = formvalue.syslog;
    payload['rrd'] = formvalue.rrd;
    try {
      return this.ws.call('systemdataset.update', [payload]);
    } catch(err) {
      console.log(err);
    }
  }
}
