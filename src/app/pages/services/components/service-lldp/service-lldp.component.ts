import { ApplicationRef, Component, Injector } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as _ from 'lodash';

import { RestService, WebSocketService } from '../../../../services/';
import { FieldConfig } from '../../../common/entity/entity-form/models/field-config.interface';
import helptext from '../../../../helptext/services/components/service-lldp';

@Component({
  selector : 'lldp-edit',
  template : `<entity-form [conf]="this"></entity-form>`
})

export class ServiceLLDPComponent {
  protected resource_name: string = 'services/lldp';
  protected route_success: string[] = [ 'services' ];

  public fieldConfig: FieldConfig[] = [
    {
      type : 'checkbox',
      name : 'lldp_intdesc',
      placeholder : helptext.lldp_intdesc_placeholder,
      tooltip: helptext.lldp_intdesc_tooltip,
    },
    {
      type : 'input',
      name : 'lldp_country',
      placeholder : helptext.lldp_country_placeholder,
      tooltip: helptext.lldp_country_tooltip,
    },
    {
      type : 'input',
      name : 'lldp_location',
      placeholder : helptext.lldp_location_placeholder,
      tooltip: helptext.lldp_location_tooltip
    },
  ];

  constructor(protected router: Router, protected route: ActivatedRoute,
              protected rest: RestService, protected ws: WebSocketService,
              protected _injector: Injector, protected _appRef: ApplicationRef,
              ) {}

  afterInit(entityEdit: any) { }
}
