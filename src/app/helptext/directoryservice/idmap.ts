import { T } from '../../translate-marker';
import { Validators } from '@angular/forms';

export default {
idmap_ad_range_low_name : 'idmap_ad_range_low',
idmap_ad_range_low_placeholder : T('Range Low'),
idmap_ad_range_low_tooltip : T('Beginning UID/GID number for which this system is\
 authoritative. UID/GID values below Range Low or higher than Range High are ignored.'),

idmap_ad_range_high_name : 'idmap_ad_range_high',
idmap_ad_range_high_placeholder : T('Range High'),
idmap_ad_range_high_tooltip : T('Ending UID/GID number for which this system is\
 authoritative. UID/GID values below Range Low or higher than Range High are ignored.'),

idmap_ad_schema_mode_name : 'idmap_ad_schema_mode',
idmap_ad_schema_mode_placeholder : T('Schema mode'),
idmap_ad_schema_mode_tooltip : T('Choose the schema to use with LDAP authentication for\
 SMB shares. The LDAP server must be configured with Samba attributes to use a Samba Schema.'),
idmap_ad_schema_mode_options:
[{
label: 'rfc2307',
value: 'rfc2307',
}, {
label: 'sfu',
value: 'sfu',
}, {
label: 'sfu20',
value: 'sfu20',
}],

idmap_autorid_range_low_name : 'idmap_autorid_range_low',
idmap_autorid_range_low_placeholder : T('Range Low'),
idmap_autorid_range_low_tooltip : T('Beginning UID/GID number for which this system is\
 authoritative. UID/GID values below Range Low or higher than Range High are ignored.'),

idmap_autorid_range_high_name : 'idmap_autorid_range_high',
idmap_autorid_range_high_placeholder : T('Range High'),
idmap_autorid_range_high_tooltip : T('Ending UID/GID number for which this system is\
 authoritative. UID/GID values below Range Low or higher than Range High are ignored.'),

idmap_autorid_rangesize_name : 'idmap_autorid_rangesize',
idmap_autorid_rangesize_placeholder : T('Range Size'),
idmap_autorid_rangesize_tooltip : T('Define the number of UIDS/GIDS available per domain\
 range. The minimum is <i>2000</i> and the recommended default is <i>100000</i>.'),

idmap_autorid_readonly_name : 'idmap_autorid_readonly',
idmap_autorid_readonly_placeholder : T('Read Only'),
idmap_autorid_readonly_tooltip : T('Set to make the module <i>read-only</i>. No new ranges\
 are allocated or new mappings created in the idmap pool.'),

idmap_autorid_ignore_builtin_name : 'idmap_autorid_ignore_builtin',
idmap_autorid_ignore_builtin_placeholder : T('Ignore Builtin'),
idmap_autorid_ignore_builtin_tooltip : T('Set to ignore mapping requests for the <i>BUILTIN</i>\
 domain.'),

idmap_fruit_range_low_name : 'idmap_fruit_range_low',
idmap_fruit_range_low_placeholder : T('Range Low'),
idmap_fruit_range_low_tooltip: T('Beginning UID/GID number for which this system is\
 authoritative. UID/GID values below Range Low or higher than Range High are ignored.'),

idmap_fruit_range_high_name : 'idmap_fruit_range_high',
idmap_fruit_range_high_placeholder : T('Range High'),
idmap_fruit_range_high_tooltip: T('Ending UID/GID number for which this system is\
 authoritative. UID/GID values below Range Low or higher than Range High are ignored.'),

idmap_ldap_range_low_name : 'idmap_ldap_range_low',
idmap_ldap_range_low_placeholder : T('Range Low'),
idmap_ldap_range_low_tooltip: T('Beginning UID/GID number for which this system is\
 authoritative. UID/GID values below Range Low or higher than Range High are ignored.'),

idmap_ldap_range_high_name : 'idmap_ldap_range_high',
idmap_ldap_range_high_placeholder : T('Range High'),
idmap_ldap_range_high_tooltip : T('Ending UID/GID number for which this system is\
 authoritative. UID/GID values below Range Low or higher than Range High are ignored.'),

idmap_ldap_basedn_name: 'idmap_ldap_ldap_base_dn',
idmap_ldap_basedn_placeholder: T('Base DN'),
idmap_ldap_basedn_tooltip: T('The directory base suffix to use for SID/uid/gid\
 mapping entries. Example: dc=test,dc=org. When undefined, idmap_ldap defaults to using the ldap idmap\
 suffix option from <a href="https://www.freebsd.org/cgi/man.cgi?query=smb.conf"\
 target="_blank">smb.conf</a>.'),

idmap_ldap_userdn_name : 'idmap_ldap_ldap_user_dn',
idmap_ldap_userdn_placeholder: T('User DN'),
idmap_ldap_userdn_tooltip: T('User Distinguished Name (DN) to use for authentication.'),

idmap_ldap_url_name : 'idmap_ldap_ldap_url',
idmap_ldap_url_placeholder: T('URL'),
idmap_ldap_url_tooltip: T('LDAP server to use for SID/uid/gid map entries. When\
 undefined, idmap_ldap uses *ldap://localhost/*.\
 Example: <i>ldap://ldap.netscape.com/o=Airius.com</i>.'),

idmap_ldap_ssl_name : 'idmap_ldap_ssl',
idmap_ldap_ssl_placeholder: T('Encryption Mode'),
idmap_ldap_ssl_tooltip: T('Choose an encryption mode to use with LDAP.'),
idmap_ldap_ssl_options: 
[{
label: 'Off',
value: 'off',
}, {
label: 'SSL',
value: 'ssl',
}, {
label: 'TLS',
value: 'tls',
}],

idmap_ldap_cert_name : '',
idmap_ldap_cert_placeholder: T('Certificate'),
idmap_ldap_cert_tooltip: T('Select the certificate of the Active Directory server\
 if SSL connections are used. When no certificates are available, move to the Active Directory server and\
 create a Certificate Authority and Certificate. Import the certificate to this system using the\
 System/Certificates menu.'),

idmap_nss_range_low_name : 'idmap_nss_range_low',
idmap_nss_range_low_placeholder: T('Range Low'),
idmap_nss_range_low_tooltip: T('Beginning UID/GID number for which this system is\
 authoritative. UID/GID values below Range Low or higher than Range High are ignored.'),

idmap_nss_range_high_name : 'idmap_nss_range_high',
idmap_nss_range_high_placeholder: T('Range High'),
idmap_nss_range_high_tooltip: T('Ending UID/GID number for which this system is\
 authoritative. UID/GID values below Range Low or higher than Range High are ignored.'),

idmap_rfc2307_range_low_name : 'idmap_rfc2307_range_low',
idmap_rfc2307_range_low_placeholder: T('Range Low'),
idmap_rfc2307_range_low_tooltip: T('Beginning UID/GID number for which this system is\
 authoritative. UID/GID values below Range Low or higher than Range High are ignored.'),

idmap_rfc2307_range_high_name : 'idmap_rfc2307_range_high',
idmap_rfc2307_range_high_placeholder: T('Range High'),
idmap_rfc2307_range_high_tooltip: T('Ending UID/GID number for which this system is\
 authoritative. UID/GID values below Range Low or higher than Range High are ignored.'),

idmap_rfc2307_ldap_server_name : 'idmap_rfc2307_ldap_server',
idmap_rfc2307_ldap_server_placeholder: T('LDAP Server'),
idmap_rfc2307_ldap_server_tooltip: T('Select the type of LDAP server to use. This can be the\
 LDAP server provided by the Active Directory server or a stand-alone LDAP server.'),

idmap_rfc2307_bpuser_name : 'idmap_rfc2307_bind_path_user',
idmap_rfc2307_bpuser_placeholder: T('User Bind Path'),
idmap_rfc2307_bpuser_tooltip: T('The search base where user objects can be found in the\
 LDAP server.'),

idmap_rfc2307_bpgroup_name : 'idmap_rfc2307_bind_path_group',
idmap_rfc2307_bpgroup_placeholder: T('Group Bind Path'),
idmap_rfc2307_bpgroup_tooltip: T('The search base where group objects can be found in\
 the LDAP server.'),

idmap_rfc2307_user_cn_name : 'idmap_rfc2307_user_cn',
idmap_rfc2307_user_cn_placeholder: T('User CN'),
idmap_rfc2307_user_cn_tooltip: T('Set to query the cn instead of uid attribute for the user name in LDAP.'),

idmap_rfc2307_cn_realm_name : 'idmap_rfc2307_cn_realm',
idmap_rfc2307_cn_realm_placeholder: T('CN Realm'),
idmap_rfc2307_cn_realm_tooltip: T('Append <i>@realm</i> to <i>cn</i> in LDAP queries for\
 both groups and users when User CN is set).'),

idmap_rfc2307_ldap_domain_name : 'idmap_rfc2307_ldap_domain',
idmap_rfc2307_ldap_domain_placeholder: T('LDAP Domain'),
idmap_rfc2307_ldap_domain_tooltip: T('The domain to access the Active Directory server when\
 using the LDAP server inside the Active Directory server.'),

idmap_rfc2307_ldap_url_name : 'idmap_rfc2307_ldap_url',
idmap_rfc2307_ldap_url_placeholder: T('LDAP URL'),
idmap_rfc2307_ldap_url_tooltip: T('The LDAP URL for accessing the LDAP server when using\
 a stand-alone LDAP server.'),

idmap_rfc2307_ldap_user_dn_name : 'idmap_rfc2307_ldap_user_dn',
idmap_rfc2307_ldap_user_dn_placeholder: T('LDAP User DN'),
idmap_rfc2307_ldap_user_dn_tooltip: T('User Distinguished Name to use for authentication.'),

idmap_rfc2307_ldap_user_dn_pw_name : 'idmap_rfc2307_ldap_user_dn_password',
idmap_rfc2307_ldap_user_dn_pw_placeholder: T('LDAP User DN Password'),
idmap_rfc2307_ldap_user_dn_pw_tooltip: T('Password associated with the LDAP User DN.'),

idmap_rfc2307_ldap_realm_name : 'idmap_rfc2307_ldap_realm',
idmap_rfc2307_ldap_realm_placeholder: T('LDAP Realm'),
idmap_rfc2307_ldap_realm_tooltip: T('Performs authentication from an LDAP server.'),

idmap_rfc2307_ssl_name : 'idmap_rfc2307_ssl',
idmap_rfc2307_ssl_placeholder: T('Encryption Mode'),
idmap_rfc2307_ssl_tooltip: T('Choose an encryption mode.'),
idmap_rfc2307_ssl_options:
[{
label: 'Off',
value: 'off',
}, {
label: 'SSL',
value: 'ssl',
}, {
label: 'TLS',
value: 'tls',
}],

idmap_rfc2307_cert_name : '',
idmap_rfc2307_cert_placeholder: T('Certificate'),
idmap_rfc2307_cert_tooltip: T('Select the certificate of the Active Directory server\
 if SSL connections are used. When no certificates are available, move to the Active Directory server and\
 create a Certificate Authority and Certificate. Import the certificate to this system using the\
 System/Certificates menu.'),

idmap_rid_range_low_name : 'idmap_rid_range_low',
idmap_rid_range_low_placeholder: T('Range Low'),
idmap_rid_range_low_tooltip: T('Beginning UID/GID number for which this system is\
 authoritative. UID/GID values below Range Low or higher than Range High are ignored.'),

idmap_rid_range_high_name : 'idmap_rid_range_high',
idmap_rid_range_high_placeholder: T('Range High'),
idmap_rid_range_high_tooltip: T('Ending UID/GID number for which this system is\
 authoritative. UID/GID values below Range Low or higher than Range High are ignored.'),

idmap_script_range_low_name : 'idmap_script_range_low',
idmap_script_range_low_placeholder: T('Range Low'),
idmap_script_range_low_tooltip: T('Beginning UID/GID number for which this system is\
 authoritative. UID/GID values below Range Low or higher than Range High are ignored.'),

idmap_script_range_high_name : 'idmap_script_range_high',
idmap_script_range_high_placeholder: T('Range High'),
idmap_script_range_high_tooltip: T('Ending UID/GID number for which this system is\
 authoritative. UID/GID values below Range Low or higher than Range High are ignored.'),

idmap_script_name : 'idmap_script_script',
idmap_script_placeholder: T('Script'),
idmap_script_tooltip: T('Configure an external program to perform ID mapping. See\
 <a href="http://samba.org.ru/samba/docs/man/manpages/idmap_script.8.html"\
 target="_blank">idmap_script(8)</a> for more details.'),

idmap_tdb_range_low_name : 'idmap_tdb_range_low',
idmap_tdb_range_low_placeholder: T('Range Low'),
idmap_tdb_range_low_tooltip: T('Beginning UID/GID number for which this system is\
 authoritative. UID/GID values below Range Low or higher than Range High are ignored.'),

idmap_tdb_range_high_name : 'idmap_tdb_range_high',
idmap_tdb_range_high_placeholder: T('Range High'),
idmap_tdb_range_high_tooltip: T('Ending UID/GID number for which this system is\
 authoritative. UID/GID values below Range Low or higher than Range High are ignored.'),

idmap_tdb2_range_low_name : 'idmap_tdb2_range_low',
idmap_tdb2_range_low_placeholder: T('Range Low'),
idmap_tdb2_range_low_tooltip: T('Beginning UID/GID number for which this system is\
 authoritative. UID/GID values below Range Low or higher than Range High are ignored.'),

idmap_tdb2_range_high_name: 'idmap_tdb2_range_high',
idmap_tdb2_range_high_placeholder: T('Range High'),
idmap_tdb2_range_high_tooltip: T('Ending UID/GID number for which this system is\
 authoritative. UID/GID values below Range Low or higher than Range High are ignored.'),

idmap_tdb2_script_name : 'idmap_tdb2_script',
idmap_tdb2_script_placeholder: T('Script'),
idmap_tdb2_script_tooltip: T('Configure an external program for ID mapping instead of\
 using the <i>tdb</i> counter. Mappings are stored in the\
 <a href="http://samba.org.ru/samba/docs/man/manpages/idmap_tdb2.8.html"\
 target="_blank">idmap_tdb2</a> database'),

idmap_range_comparison_error: "Range low is greater than range high.",
idmap_range_overlap_error: "Range overlapped with the default range: ["
}