import {Validators} from '@angular/forms';
import { T } from '../../../translate-marker';

export default {
// Add key form
add_key_name_validation: [Validators.required],

add_key_password_placeholder: T('Root password'),
add_key_password_tooltip: T('Enter the root password to authorize this operation.'),
add_key_password_validation: [Validators.required],

// Change key form
changekey_adminpw_placeholder: T('Root Password'),
changekey_adminpw_tooltip: T('Enter the root password.'),
changekey_adminpw_validation: [Validators.required],

changekey_passphrase_placeholder: T('Passphrase'),
changekey_passphrase_tooltip: T('Enter the GELI passphrase.'),
changekey_passphrase_validation: [Validators.required],

changekey_passphrase2_placeholder: T('Verify passphrase'),
changekey_passphrase2_tooltip: T('Confirm the GELI passphrase.'),
changekey_passphrase2_validation: [Validators.required],

// Create key form
createkey_passphrase_placeholder: T('Passphrase'),
createkey_passphrase_tooltip: T('Enter the GELI passphrase.'),
createkey_passphrase_validation: [Validators.required],

createkey_passphrase2_placeholder: T('Verify passphrase'),
createkey_passphrase2_tooltip: T('Confirm the GELI passphrase.'),
createkey_passphrase2_validation: [Validators.required],

// Rekey form
rekey_password_label: T('Passphrase'),
rekey_password_placeholder: T('Root password'),
rekey_password_tooltip: T('Enter the root password to authorize this operation.'),
rekey_password_validation: [Validators.required]
}