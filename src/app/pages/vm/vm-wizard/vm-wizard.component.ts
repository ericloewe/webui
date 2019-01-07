import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RestService, WebSocketService, NetworkService } from '../../../services';
import { FormGroup, Validators } from '@angular/forms';
import { Wizard } from '../../common/entity/entity-form/models/wizard.interface';
import { EntityWizardComponent } from '../../common/entity/entity-wizard/entity-wizard.component';
import { MessageService } from '../../common/entity/entity-form/services/message.service';
import * as _ from 'lodash';

import { VmService } from '../../../services/vm.service';
import { AppLoaderService } from '../../../services/app-loader/app-loader.service';
import { MatDialog } from '@angular/material';
import { T } from '../../../translate-marker';
import { DialogService } from '../../../services/dialog.service';
import helptext from '../../../helptext/vm/vm-wizard/vm-wizard';

@Component({
  selector: 'app-vm-wizard',
  template: '<entity-wizard [conf]="this"></entity-wizard>',
  providers : [ VmService ]
})
export class VMWizardComponent {

  protected addWsCall = 'vm.create';
  public route_success: string[] = ['vm'];
  public summary = {};
  isLinear = true;
  firstFormGroup: FormGroup;
  protected dialogRef: any;
  objectKeys = Object.keys;
  summary_title = "VM Summary";

  entityWizard: any;
  public res;

  protected wizardConfig: Wizard[] = [

    {
      label: helptext.wizard_type_label,
      fieldConfig: [

        {
          type: 'select',
          name: 'wizard_type',
          required: true,
          placeholder: helptext.wizard_type_placeholder,
          tooltip: helptext.wizard_type_tooltip,
          options: helptext.wizard_type_options,
          validation : [ Validators.required ],
          value: 'vm'
        },
      ]
    },

    {
      label: helptext.os_label,
      fieldConfig: [
        {
          type: 'select',
          name: 'os',
          required: true,
          placeholder: helptext.os_placeholder,
          tooltip: helptext.os_tooltip,
          options: helptext.os_options,
          validation : helptext.os_validation,
        },
      { type: 'input',
        name : 'name',
        placeholder : helptext.name_placeholder,
        tooltip : helptext.name_tooltip,
        validation : helptext.name_validation,
        required: true,
        blurStatus: true,
        blurEvent: this.blurEvent,
        parent: this
      },
      { type: 'select',
        name : 'bootloader',
        placeholder : helptext.bootloader_placeholder,
        tooltip : helptext.bootloader_tooltip,
        options: []
      },
      { type: 'checkbox',
        name : 'autostart',
        placeholder : helptext.autostart_placeholder,
        tooltip : helptext.autostart_tooltip,
        value: true
      },
      { type: 'checkbox',
      name : 'enable_vnc',
      placeholder : helptext.enable_vnc_placeholder,
      tooltip : helptext.enable_vnc_tooltip,
      value: true,
      isHidden: false
    }
      ]
    },
    {
      label: helptext.vcpus_label,
      fieldConfig: [{
          type: 'input',
          name: 'vcpus',
          placeholder: helptext.vcpus_placeholder,
          inputType: 'number',
          min: 1,
          validation : [ Validators.required, Validators.min(1), Validators.max(16) ],
          tooltip: helptext.vcpus_tooltip,
        },
        {
          type: 'input',
          name: 'memory',
          placeholder: helptext.memory_placeholder,
          inputType: 'number',
          min: 128,
          validation : helptext.memory_validation,
          required: true,
          blurStatus: true,
          blurEvent: this.blurEvent2,
          parent: this,
          tooltip: helptext.memory_tooltip,
        },
      ]
    },
    {
      label: helptext.disks_label,
      fieldConfig: [
        {
          type: 'radio',
          name: 'disk_radio',
          tooltip: helptext.disk_radio_tooltip,
          options: helptext.disk_radio_options,
          value: true,
        },
        {
          type: 'input',
          name: 'volsize',
          placeholder : helptext.volsize_placeholder,
          tooltip: helptext.volsize_tooltip,
          isHidden: false,
          blurStatus: true,
          blurEvent: this.blurEvent3,
          parent: this,
          validation: helptext.volsize_validation,
          required: true
        },
        {
          type: 'paragraph',
          name: 'pool_detach_warning',
          paraText: helptext.pool_detach_warning_paraText,
        },
        {
          type: 'explorer',
          name: 'datastore',
          tooltip: helptext.datastore_tooltip,
          options: [],
          isHidden: false,
          initial: '/mnt',
          explorerType: 'directory',
          validation: [Validators.required],
          required: true
        },
        {
          type: 'select',
          name: 'hdd_type',
          placeholder: helptext.hdd_type_placeholder,
          tooltip: helptext.hdd_type_tooltip,
          isHidden: false,
          options : helptext.hdd_type_options,
          value: helptext.hdd_type_value
        },
        {
          type: 'select',
          name: 'hdd_path',
          placeholder: helptext.hdd_path_placeholder,
          tooltip: helptext.hdd_path_tooltip,
          isHidden: true,
          options:[]
        },
      ]
    },
    {
      label: helptext.NIC_label,
      fieldConfig: [
        {
          name : 'NIC_type',
          placeholder : helptext.NIC_type_placeholder,
          tooltip : helptext.NIC_type_tooltip,
          type: 'select',
          options : [],
          validation : helptext.NIC_type_validation,
          required: true,
        },
        {
          name : 'NIC_mac',
          placeholder : helptext.NIC_mac_placeholder,
          tooltip : helptext.NIC_mac_tooltip,
          type: 'input',
          value : helptext.NIC_mac_value,
          validation : helptext.NIC_mac_validation,
        },
        {
          name : 'nic_attach',
          placeholder : helptext.nic_attach_placeholder,
          tooltip : helptext.nic_attach_tooltip,
          type: 'select',
          options : [],
          validation : helptext.nic_attach_validation,
          required: true,
        },
      ]
    },
    {
      label: helptext.media_label,
      fieldConfig: [
        {
          type: 'explorer',
          name: 'iso_path',
          placeholder : helptext.iso_path_placeholder,
          initial: '/mnt',
          tooltip: helptext.iso_path_tooltip,
          validation : helptext.iso_path_validation,
          required: true,
        },
        {
          type: 'checkbox',
          name: 'upload_iso_checkbox',
          placeholder : helptext.upload_iso_checkbox_placeholder,
          tooltip: helptext.upload_iso_checkbox_tooltip,
          value: false,
        },
        {
          type: 'explorer',
          name: 'upload_iso_path',
          placeholder : helptext.upload_iso_path_placeholder,
          initial: '/mnt',
          tooltip: helptext.upload_iso_path_tooltip,
          explorerType: 'directory',
          isHidden: true,
          validation : helptext.upload_iso_path_validation,
        },
        {
          type: 'upload',
          name: 'upload_iso',
          placeholder : helptext.upload_iso_placeholder,
          tooltip: helptext.upload_iso_tooltip,
          isHidden: true,
          acceptedFiles: '.img,.iso',
          fileLocation: '',
          validation : helptext.upload_iso_validation,
          message: this.messageService
        },
      ]
    },
  ]

  protected releaseField: any;
  protected currentServerVersion: any;
  private datastore: any;
  private nic_attach: any;
  private nicType:  any;
  private bootloader: any;

  constructor(protected rest: RestService, protected ws: WebSocketService,
    public vmService: VmService, public networkService: NetworkService,
    protected loader: AppLoaderService, protected dialog: MatDialog,
    public messageService: MessageService,private router: Router,
    private dialogService: DialogService) {

  }

  preInit(entityWizard: EntityWizardComponent){
    this.entityWizard = entityWizard;
  }
  afterInit(entityWizard: EntityWizardComponent) {

    this.ws.call("pool.dataset.query",[[["type", "=", "VOLUME"]]]).subscribe((zvols)=>{
      zvols.forEach(zvol => {
        _.find(this.wizardConfig[3].fieldConfig, {name : 'hdd_path'}).options.push(
          {
            label : zvol.id, value : zvol.id
          }
        );   
      });
    });

    ( < FormGroup > entityWizard.formArray.get([0]).get('wizard_type')).valueChanges.subscribe((res) => {
      if (res === 'docker') {
        this.router.navigate(new Array('/').concat(['vm','dockerwizard']))
      }
    });

    ( < FormGroup > entityWizard.formArray.get([1]).get('bootloader')).valueChanges.subscribe((bootloader) => {
      if(bootloader === "UEFI_CSM"){
        _.find(this.wizardConfig[1].fieldConfig, {name : 'enable_vnc'})['isHidden'] = true;
      } else {
        _.find(this.wizardConfig[1].fieldConfig, {name : 'enable_vnc'})['isHidden'] = false;
      }


    });


    ( < FormGroup > entityWizard.formArray.get([1]).get('os')).valueChanges.subscribe((res) => {
      this.summary[T('Guest Operating System')] = res;
      ( < FormGroup > entityWizard.formArray.get([1])).get('name').valueChanges.subscribe((name) => {
        this.summary[T('Name')] = name;
      });
      ( < FormGroup > entityWizard.formArray.get([2])).get('vcpus').valueChanges.subscribe((vcpus) => {
        this.summary[T('Number of CPUs')] = vcpus;
      });
      ( < FormGroup > entityWizard.formArray.get([2])).get('memory').valueChanges.subscribe((memory) => {
        this.summary[T('Memory')] = memory + ' MiB';
      });

      ( < FormGroup > entityWizard.formArray.get([3])).get('volsize').valueChanges.subscribe((volsize) => {
        this.summary[T('Hard Disk Size')] = volsize + ' GiB';
      });

      ( < FormGroup > entityWizard.formArray.get([3])).get('disk_radio').valueChanges.subscribe((disk_radio)=>{
        if(this.summary[T('Hard Disk')] || this.summary[T('Hard Disk Size')]){
          delete this.summary[T('Hard Disk')];
          delete this.summary[T('Hard Disk Size')];
        }
        if(disk_radio) {
          this.summary[T('Hard Disk Size')] = ( < FormGroup > entityWizard.formArray.get([3])).controls['volsize'].value + ' Gib';
            ( < FormGroup > entityWizard.formArray.get([3])).get('volsize').valueChanges.subscribe((volsize) => {
              this.summary[T('Hard Disk Size')] = volsize + ' GiB';
            });
        } else {
          this.summary[T('Hard Disk')] = ( < FormGroup > entityWizard.formArray.get([3])).controls['hdd_path'].value;
            ( < FormGroup > entityWizard.formArray.get([3])).get('hdd_path').valueChanges.subscribe((existing_hdd_path)=>{
              this.summary[T('Hard Disk')] = existing_hdd_path;
            })
        }
      });

      ( < FormGroup > entityWizard.formArray.get([3])).get('datastore').valueChanges.subscribe((datastore)=>{
        if(datastore !== undefined && datastore !== "" && datastore !== "/mnt"){
          _.find(this.wizardConfig[3].fieldConfig, {'name' : 'datastore'}).hasErrors = false;
          _.find(this.wizardConfig[3].fieldConfig, {'name' : 'datastore'}).errors = null;
        const volsize = ( < FormGroup > entityWizard.formArray.get([3])).controls['volsize'].value * 1073741824;
        this.ws.call('filesystem.statfs',[datastore]).subscribe((stat)=> {
          _.find(this.wizardConfig[3].fieldConfig, {'name' : 'volsize'})['hasErrors'] = false;
          _.find(this.wizardConfig[3].fieldConfig, {'name' : 'volsize'})['errors'] = '';
         if (stat.free_bytes < volsize ) {
          ( < FormGroup > entityWizard.formArray.get([3])).controls['volsize'].setValue(Math.floor(stat.free_bytes / (1073741824)));
         } else if (stat.free_bytes > 40*1073741824) {
              const vm_os = ( < FormGroup > entityWizard.formArray.get([1]).get('os')).value;
              if (vm_os === "Windows"){
                  ( < FormGroup > entityWizard.formArray.get([3])).controls['volsize'].setValue(volsize/1073741824);
              } else {
                  ( < FormGroup > entityWizard.formArray.get([3])).controls['volsize'].setValue(volsize/1073741824);
              };
        } else if (stat.free_bytes > 10*1073741824) {
              const vm_os = ( < FormGroup > entityWizard.formArray.get([1]).get('os')).value;
              ( < FormGroup > entityWizard.formArray.get([3])).controls['volsize'].setValue(volsize/1073741824);
          };
        });
      } else {
        if(datastore === '/mnt'){
          ( < FormGroup > entityWizard.formArray.get([3])).controls['datastore'].setValue(null);
          _.find(this.wizardConfig[3].fieldConfig, {'name' : 'datastore'}).hasErrors = true;
          _.find(this.wizardConfig[3].fieldConfig, {'name' : 'datastore'}).errors = `Virtual Machine storage are not allowed on temporary file storage, ${datastore}`;
        }
        if(datastore === ''){
          ( < FormGroup > entityWizard.formArray.get([3])).controls['datastore'].setValue(null);
          _.find(this.wizardConfig[3].fieldConfig, {'name' : 'datastore'}).hasErrors = true;
          _.find(this.wizardConfig[3].fieldConfig, {'name' : 'datastore'}).errors = `Please select a valid path`;
        }
      }
      });
      ( < FormGroup > entityWizard.formArray.get([5]).get('iso_path')).valueChanges.subscribe((iso_path) => {
        this.summary[T('Installation Media')] = iso_path;
      });
      this.messageService.messageSourceHasNewMessage$.subscribe((message)=>{
        ( < FormGroup > entityWizard.formArray.get([5]).get('iso_path')).setValue(message);
      })
      this.ws.call('vm.get_available_memory').subscribe((available_memory)=>{
        if (available_memory > 512 * 1048576) {
          this.res = res;
          this.populate_ds();
          if (res === 'Windows') {
            ( < FormGroup > entityWizard.formArray.get([2])).controls['vcpus'].setValue(2);
            ( < FormGroup > entityWizard.formArray.get([2])).controls['memory'].setValue(4096);
            ( < FormGroup > entityWizard.formArray.get([3])).controls['volsize'].setValue(40);
          }
          else {
            ( < FormGroup > entityWizard.formArray.get([2])).controls['vcpus'].setValue(1);
            ( < FormGroup > entityWizard.formArray.get([2])).controls['memory'].setValue(512);
            ( < FormGroup > entityWizard.formArray.get([3])).controls['volsize'].setValue(10);
          }

        } else {
          if (res === 'Windows') {
            ( < FormGroup > entityWizard.formArray.get([2])).controls['vcpus'].setValue(2);
            ( < FormGroup > entityWizard.formArray.get([2])).controls['memory'].setValue(0);
            ( < FormGroup > entityWizard.formArray.get([3])).controls['volsize'].setValue(40);
          }
          else {
            ( < FormGroup > entityWizard.formArray.get([2])).controls['vcpus'].setValue(1);
            ( < FormGroup > entityWizard.formArray.get([2])).controls['memory'].setValue(0);
            ( < FormGroup > entityWizard.formArray.get([3])).controls['volsize'].setValue(10);
          }

        }
      })

    });
    ( < FormGroup > entityWizard.formArray.get([3]).get('disk_radio')).valueChanges.subscribe((res) => {
      if (res){
        _.find(this.wizardConfig[3].fieldConfig, {name : 'volsize'})['isHidden'] = false;
        _.find(this.wizardConfig[3].fieldConfig, {name : 'datastore'})['isHidden'] = false;
        _.find(this.wizardConfig[3].fieldConfig, {name : 'hdd_path'})['isHidden'] = true;
        _.find(this.wizardConfig[3].fieldConfig, {name : 'hdd_type'})['isHidden'] = false;
      } else {
        _.find(this.wizardConfig[3].fieldConfig, {name : 'volsize'})['isHidden'] = true;
        _.find(this.wizardConfig[3].fieldConfig, {name : 'datastore'})['isHidden'] = true;
        _.find(this.wizardConfig[3].fieldConfig, {name : 'hdd_path'})['isHidden'] = false;
        _.find(this.wizardConfig[3].fieldConfig, {name : 'hdd_type'})['isHidden'] = true;
      }

    });
    ( < FormGroup > entityWizard.formArray.get([5]).get('upload_iso_checkbox')).valueChanges.subscribe((res) => {
      if (res){
        _.find(this.wizardConfig[5].fieldConfig, {name : 'upload_iso'})['isHidden'] = false;
        _.find(this.wizardConfig[5].fieldConfig, {name : 'upload_iso_path'})['isHidden'] = false;
      } else {
        _.find(this.wizardConfig[5].fieldConfig, {name : 'upload_iso'})['isHidden'] = true;
        _.find(this.wizardConfig[5].fieldConfig, {name : 'upload_iso_path'})['isHidden'] = true;
      }

    });
    ( < FormGroup > entityWizard.formArray.get([5]).get('upload_iso_path')).valueChanges.subscribe((res) => {
      if (res){
        _.find(this.wizardConfig[5].fieldConfig, {name : 'upload_iso'}).fileLocation = res;
      }

    });
    this.populate_ds();

    this.networkService.getAllNicChoices().subscribe((res) => {
      this.nic_attach = _.find(this.wizardConfig[4].fieldConfig, {'name' : 'nic_attach'});
      res.forEach((item) => {
        this.nic_attach.options.push({label : item[1], value : item[0]});
      });
      ( < FormGroup > entityWizard.formArray.get([4])).controls['nic_attach'].setValue(
        this.nic_attach.options[0].value
      )
      this.ws.call('vm.random_mac').subscribe((mac_res)=>{
        ( < FormGroup > entityWizard.formArray.get([4])).controls['NIC_mac'].setValue(mac_res);
      });

    });
    this.ws.call('notifier.choices', [ 'VM_NICTYPES' ]).subscribe((res) => {
          this.nicType = _.find(this.wizardConfig[4].fieldConfig, {name : "NIC_type"});
          res.forEach((item) => {
            this.nicType.options.push({label : item[1], value : item[0]});
          });
        ( < FormGroup > entityWizard.formArray.get([4])).controls['NIC_type'].setValue(
          this.nicType.options[0].value
        )
        });

      this.ws.call('notifier.choices', [ 'VM_BOOTLOADER' ]).subscribe((res) => {
        this.bootloader = _.find(this.wizardConfig[1].fieldConfig, {name : 'bootloader'});
        res.forEach((item) => {
          this.bootloader.options.push({label : item[1], value : item[0]})
        });
      ( < FormGroup > entityWizard.formArray.get([1])).controls['bootloader'].setValue(
        this.bootloader.options[0].value
      )
      });
  }
  getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}
blurEvent(parent){
  const vm_name = parent.entityWizard.formGroup.value.formArray[1].name
  parent.ws.call('vm.query', [[["name","=",vm_name]]]).subscribe((vm_wizard_res)=>{
    if(vm_wizard_res.length > 0){
      _.find(parent.wizardConfig[0].fieldConfig, {'name' : 'name'})['hasErrors'] = true;
      _.find(parent.wizardConfig[0].fieldConfig, {'name' : 'name'})['errors'] = `Virtual machine ${vm_wizard_res[0].name} already exists.`;
      parent.entityWizard.formArray.get([1]).get('name').setValue("");

    }
  })
}

blurEvent2(parent){
  const vm_memory_requested = parent.entityWizard.formGroup.value.formArray[2].memory
  const vm_name = parent.entityWizard.formGroup.value.formArray[1].name
  parent.ws.call('vm.get_available_memory').subscribe((vm_memory_available)=>{
    if( vm_memory_requested *1048576> vm_memory_available){
      _.find(parent.wizardConfig[2].fieldConfig, {'name' : 'memory'})['hasErrors'] = true;
      _.find(parent.wizardConfig[2].fieldConfig, {'name' : 'memory'})['errors'] = `Cannot allocate ${vm_memory_requested} Mib to virtual machine: ${vm_name}.`;
      parent.entityWizard.formArray.get([2]).get('memory').setValue(0);
    } else{
      _.find(parent.wizardConfig[2].fieldConfig, {'name' : 'memory'})['hasErrors'] = false;
      _.find(parent.wizardConfig[2].fieldConfig, {'name' : 'memory'})['errors'] = '';
    }
  })
}
blurEvent3(parent){
  if(parent.entityWizard.formArray.controls[3].value.volsize > 0 ) {
    const volsize = parent.entityWizard.formArray.controls[3].value.volsize * 1073741824;
    const datastore = parent.entityWizard.formArray.controls[3].value.datastore;
    const vm_name = parent.entityWizard.formGroup.value.formArray[1].name;
    if(datastore !== undefined && datastore !== "" && datastore !== "/mnt"){
    parent.ws.call('filesystem.statfs',[datastore]).subscribe((stat)=> {
      if (stat.free_bytes < volsize ) {
        _.find(parent.wizardConfig[3].fieldConfig, {'name' : 'volsize'})['hasErrors'] = true;
        _.find(parent.wizardConfig[3].fieldConfig, {'name' : 'volsize'})['errors'] = `Cannot allocate ${volsize / (1073741824)} Gib to for storage virtual machine: ${vm_name}.`;
        parent.entityWizard.formArray.get([3]).get('volsize').setValue(0);
       } else {
        _.find(parent.wizardConfig[3].fieldConfig, {'name' : 'volsize'})['hasErrors'] = false;
        _.find(parent.wizardConfig[3].fieldConfig, {'name' : 'volsize'})['errors'] = '';
        const vm_os = parent.entityWizard.formArray.controls[1].os;
        if (vm_os === "Windows"){
          parent.entityWizard.formArray.get([3]).get('volsize').setValue(volsize/1073741824);
        } else {
          parent.entityWizard.formArray.get([3]).get('volsize').setValue(volsize/1073741824);
        };
       }
    })
  }
}
}
populate_ds(this) {
  this.ws.call('pool.dataset.query').subscribe((filesystem_res)=>{
    this.datastore = _.find(this.wizardConfig[3].fieldConfig, { name : 'datastore' });
    for (const idx in filesystem_res) {
      if(!filesystem_res[idx].name.includes("/") && !filesystem_res[idx].name.includes("freenas-boot")){
        this.datastore.options.push(
          {label : filesystem_res[idx].name, value : filesystem_res[idx].name});
      }
    };
    if (this.datastore.options.length > 0) {
      this.entityWizard.formArray.get([3]).controls['datastore'].setValue('/mnt/'+this.datastore.options[0].value);
      if (this.res) {
        if (this.datastore.options[0].value !== undefined && this.datastore.options[0].value!==""){
        this.ws.call('filesystem.statfs',['/mnt/'+this.datastore.options[0].value]).subscribe((stat)=> {
          let storage = 10*1073741824
          if (this.res === "Windows") { 
            storage = 40*1073741824;
          }
          if (storage && stat.free_bytes < storage ) {
            this.entityWizard.formArray.get([3]).controls['volsize'].setValue(Math.floor(stat.free_bytes/(1073741824))); 
          };
         });
        };
      }
    }
    

  });
};

async customSubmit(value) {
    value.datastore = value.datastore.replace('/mnt/','')
    const hdd = value.datastore+"/"+value.name.replace(/\s+/g, '-')+"-"+Math.random().toString(36).substring(7);
    const vm_payload = {}
    const zvol_payload = {}

    // zvol_payload only applies if the user is creating one
    zvol_payload['create_zvol'] = true
    zvol_payload["zvol_name"] = hdd
    zvol_payload["zvol_volsize"] = value.volsize * 1024 * 1000 * 1000;

    vm_payload["vm_type"]= "Bhyve";
    vm_payload["memory"]= value.memory;
    vm_payload["name"] = value.name;
    vm_payload["vcpus"] = value.vcpus;
    vm_payload["memory"] = value.memory;
    vm_payload["bootloader"] = value.bootloader;
    vm_payload["autoloader"] = value.autoloader;
    vm_payload["autostart"] = value.autostart;
    vm_payload["devices"] = [
      {"dtype": "NIC", "attributes": {"type": value.NIC_type, "mac": value.NIC_mac, "nic_attach":value.nic_attach}},
      {"dtype": "DISK", "attributes": {"path": hdd, "type": "AHCI", "sectorsize": 0}},
      {"dtype": "CDROM", "attributes": {"path": value.iso_path}},
    ]
    if(value.enable_vnc &&value.bootloader !== "UEFI_CSM"){
      await this.create_vnc_device(vm_payload);
    };
    this.loader.open();
    if( value.hdd_path ){
      for (const device of vm_payload["devices"]){
        if (device.dtype === "DISK"){
          device.attributes.path = '/dev/zvol/'+ value.hdd_path;
        };
      };
      this.ws.call('vm.create', [vm_payload]).subscribe(vm_res => {
        this.loader.close();
        this.router.navigate(['/vm']);
    },(error) => {
      this.loader.close();
      this.dialogService.errorReport(T("Error creating VM."), error.reason, error.trace.formatted);
    });

    } else {
      for (const device of vm_payload["devices"]){
        if (device.dtype === "DISK"){          
          const orig_hdd = device.attributes.path;
          const create_zvol = zvol_payload['create_zvol']
          const zvol_name = zvol_payload['zvol_name']
          const zvol_volsize = zvol_payload['zvol_volsize']

          device.attributes.path = '/dev/zvol/' + orig_hdd
          device.attributes.type = value.hdd_type;
          device.attributes.create_zvol = create_zvol
          device.attributes.zvol_name = zvol_name
          device.attributes.zvol_volsize = zvol_volsize
        };
      };
      this.ws.call('vm.create', [vm_payload]).subscribe(vm_res => {
        this.loader.close();
        this.router.navigate(['/vm']);
      },(error) => {
        this.loader.close();
        this.dialogService.errorReport(T("Error creating VM."), error.reason, error.trace.formatted);
      });
    }
}

  async create_vnc_device(vm_payload: any) {
    await this.ws.call('interfaces.ip_in_use', [{"ipv4": true}]).toPromise().then( res=>{
      vm_payload["devices"].push(
        {
          "dtype": "VNC", "attributes": {
            "wait": true,
            "vnc_port": String(this.getRndInteger(5553,6553)),
            "vnc_resolution": "1024x768",
            "vnc_bind": res[0].address,
            "vnc_password": "",
            "vnc_web": true
          }
        }
    );
    });
  }
}
