import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { helptext_system_certificates } from 'app/helptext/system/certificates';
import * as _ from 'lodash';
import { WebSocketService } from '../../../../services/';
import { EntityUtils } from '../../../common/entity/utils';

@Component({
  selector: 'certificate-list',
  template: `<entity-table [title]="title" [conf]="this"></entity-table>`
})
export class CertificateListComponent {

  public title = "Certificates";
  protected queryCall = "certificate.query";
  protected wsDelete = "certificate.delete";
  protected route_add: string[] = ['system', 'certificates', 'add'];
  protected route_add_tooltip: string = helptext_system_certificates.list.tooltip_add;
  protected route_success: string[] = [ 'system', 'certificates' ];

  protected entityList: any;

  constructor(protected router: Router, protected aroute: ActivatedRoute,
    protected ws: WebSocketService, public snackBar: MatSnackBar) {
  }

  public columns: Array < any > = [
    { name: helptext_system_certificates.list.column_name, prop: 'name'},
    { name: helptext_system_certificates.list.column_issuer, prop: 'issuer'},
    { name: helptext_system_certificates.list.column_distinguished_name, prop: 'DN'},
    { name: helptext_system_certificates.list.column_from, prop: 'from'},
    { name: helptext_system_certificates.list.column_until, prop: 'until'},
  ];

  public config: any = {
    paging: true,
    sorting: { columns: this.columns },
    deleteMsg: {
      title: 'Certificate',
      key_props: ['name']
    },
  }

  afterInit(entityList: any) {
    this.entityList = entityList;
  }

  dataHandler(entityList: any) {
    for (let i = 0; i < entityList.rows.length; i++) {
      if (_.isObject(entityList.rows[i].issuer)) {
        entityList.rows[i].issuer = entityList.rows[i].issuer.name;
      }
    }
  }

  isActionVisible(actionId: string, row: any) {
    if (actionId === 'export_certificate' && row.CSR !== null) {
      return false;
    } else if (actionId === 'export_private_key' && row.CSR !== null) {
      return false;
    }

    return true;
  }

  getActions(row) {
    return [{
        id: "View",
        label: helptext_system_certificates.list.action_view,
        onClick: (row) => {
          this.router.navigate(new Array('').concat(["system", "certificates", "view", row.id]))
        }
      },
      {
        id: "export_certificate",
        label: helptext_system_certificates.list.action_export_certificate,
        onClick: (row) => {
          this.ws.call('certificate.query', [[["id", "=", row.id]]]).subscribe((res) => {
            if (res[0]) {
              this.ws.call('core.download', ['filesystem.get', [res[0].certificate_path], res[0].name + '.crt']).subscribe(
                (res) => {
                  this.snackBar.open(helptext_system_certificates.list.snackbar_open_window_message, helptext_system_certificates.list.snackbar_open_window_action, {
                    duration: 5000
                  });
                  window.open(res[1]);
                },
                (res) => {
                  new EntityUtils().handleError(this, res);
                }
              );
            }
          })
        }
      },
      {
        id: "export_private_key",
        label: helptext_system_certificates.list.action_export_private_key,
        onClick: (row) => {
          this.ws.call('certificate.query', [[["id", "=", row.id]]]).subscribe((res) => {
            if (res[0]) {
              this.ws.call('core.download', ['filesystem.get', [res[0].privatekey_path], res[0].name + '.key']).subscribe(
                (res) => {
                  this.snackBar.open(helptext_system_certificates.list.snackbar_open_window_message, helptext_system_certificates.list.snackbar_open_window_action, {
                    duration: 5000
                  });
                  window.open(res[1]);
                },
                (res) => {
                  new EntityUtils().handleError(this, res);
                }
              );
            }
          })
        }
      },
      {
        id: "delete",
        label: helptext_system_certificates.list.action_delete,
        onClick: (row) => {
          this.entityList.doDelete(row);
        }
      }];
  }
}
