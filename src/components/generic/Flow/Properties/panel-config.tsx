import { SelectProps } from '@cloudscape-design/components';

export function dataFeaturesOptions(objectType: string): SelectProps.Options {
  let features = [
    {
      label: 'Customer Data',
      options: [
        {
          label: 'Stored',
          value: 'cd_stored',
          description: 'This component stores customer data',
        },
        {
          label: 'Processed',
          value: 'cd_processed',
          description: 'This component processes customer data',
        },
      ],
    },
    {
      label: 'Personal Identifiable Information (PII)',
      options: [
        {
          label: 'Stored',
          value: 'pii_stored',
          description: 'This component stores PII',
        },
        {
          label: 'Processed',
          value: 'pii_processed',
          description: 'This component processes PII',
        },
      ],
    },
    {
      label: 'Logs, credentials, encryption',
      disabled: objectType === 'datastore' ? false : true, // enable only for datastores
      options: [
        {
          label: 'Store logs',
          value: 'lce_store_logs',
          description: 'This component stores logs',
        },
        {
          label: 'Stores credentials',
          value: 'lce_store_credentials',
          description: 'This component stores credentials',
        },
        {
          label: 'Data is signed',
          value: 'lce_data_signed',
          description: 'This component digitally signs the data',
        },
        {
          label: 'Data is encrypted at rest',
          value: 'lce_data_encrypted_at_rest',
          description: 'This component uses encryption at rest',
        },
      ],
    },
    {
      label: 'Data exchange format',
      disabled: objectType === 'process' || objectType === 'biDirectional' ? false : true, // enable only for processes and links (data flows)
      options: [
        {
          label: 'JSON',
          value: 'df_json',
          description: 'Text-based data format',
          labelTag: 'human-readable',
        },
        {
          label: 'XML',
          value: 'df_xml',
          description: 'Text-based, partially binary',
          labelTag: 'human-readable',
        },
        {
          label: 'YAML',
          value: 'df_yaml',
          description: 'Text-based data format',
          labelTag: 'human-readable',
        },
        {
          label: 'CSV',
          value: 'df_csv',
          description: 'Text-based data format',
          labelTag: 'human-readable',
        },
        {
          label: 'Thrift',
          value: 'df_thrift',
          description: 'Binary data format',
        },
        {
          label: 'Other',
          value: 'df_other',
          description: 'Other dataformat',
        },
      ],
    },
  ];
  return features.filter(f => !f.disabled);
};

export function techFeaturesOptions(objectType: string): SelectProps.Options {
  let features = [
    {
      label: 'Architecture',
      disabled: ((objectType==='process') ? false:true), // enable only for processes
      options: [
        {
          label: 'Serverless',
          value: 'ts_serverless',
          description: 'This component uses serverless computing',
        },
        {
          label: 'Containers',
          value: 'ts_containers',
          description: 'This component uses containers',
        },
        {
          label: 'VMs',
          value: 'ts_vm',
          description: 'This component uses VMs',
        },
      ],
    },
    {
      label: 'OS and programming languages',
      disabled: ((objectType==='process') ? false:true), // enable only for processes
      options: [
        {
          label: 'Linux',
          value: 'os_linux',
          description: 'This component uses Linux',
        },
        {
          label: 'iOS',
          value: 'os_ios',
          description: 'This component uses iOS',
        },
        {
          label: 'Android',
          value: 'os_android',
          description: 'This component uses Android',
        },
        {
          label: 'Other OS',
          value: 'os_other',
          description: 'This component uses other OS',
        },
        {
          label: 'Java',
          value: 'lan_java',
          description: 'This component uses Java',
        },
        {
          label: 'Ruby',
          value: 'lan_ruby',
          description: 'This component uses Ruby',
        },
        {
          label: 'Python',
          value: 'lan_python',
          description: 'This component uses Python',
        },
        {
          label: 'Javascript',
          value: 'lan_js',
          description: 'This component uses Javascript',
        },
        {
          label: 'Other language',
          value: 'lan_other',
          description: 'This component uses other language',
        },
      ],
    },
    {
      label: 'Data storage and querying',
      disabled: ((objectType==='datastore') ? false:true), // enable only for datastores
      options: [
        {
          label: 'MySQL',
          value: 'dsq_mysql',
          description: 'This component uses MySQL',
        },
        {
          label: 'MongoDB',
          value: 'dsq_mongodb',
          description: 'This component uses MongoDB',
        },
        {
          label: 'Azure SQL Synapse',
          value: 'dsq_azure',
          description: 'This component uses Azure SQL Synapse',
        },
        {
          label: 'PostgresSQL',
          value: 'dsq_postgres',
          description: 'This component uses PostgresSQL',
        },
        {
          label: 'Redshift',
          value: 'dsq_redshift',
          description: 'This component uses Redshift',
        },
      ],
    },
    {
      label: 'Backend frameworks',
      disabled: ((objectType==='process') ? false:true), // enable only for processes and links (data flows)
      options: [
        {
          label: 'Node.js',
          value: 'bf_nodejs',
          description: 'This component uses Node.js',
        },
        {
          label: 'Ruby on Rails',
          value: 'bf_ruby',
          description: 'This component uses Ruby on Rails',
        },
        {
          label: 'Django',
          value: 'bf_django',
          description: 'This component uses Django (Python)',
        },
        {
          label: 'Spring',
          value: 'bf_spring',
          description: 'This component uses Spring (Java)',
        },
        {
          label: '.NET',
          value: 'bf_dotnet',
          description: 'This component uses .NET',
        },
        {
          label: 'Laravel',
          value: 'bf_laravel',
          description: 'This component uses Laravel (PHP)',
        },
        {
          label: 'Other backend framework',
          value: 'bf_other',
          description: 'This component uses other backend framework',
        },
      ],
    },
    {
      label: 'Frontend frameworks',
      disabled: ((objectType==='actor') ? false:true), // enable only for external actors
      options: [
        {
          label: 'React',
          value: 'ff_react',
          description: 'This component uses React',
        },
        {
          label: 'jQuery',
          value: 'ff_jquery',
          description: 'This component uses jQuery',
        },
        {
          label: 'BackboneJS',
          value: 'ff_backbone',
          description: 'This component uses BackboneJS',
        },
        {
          label: 'Vue.js',
          value: 'ff_vue',
          description: 'This component uses Vue.js',
        },
        {
          label: 'Angular',
          value: 'ff_angular',
          description: 'This component uses Angular',
        },
        {
          label: 'Other frontend framework',
          value: 'ff_other',
          description: 'This component uses other frontend framework',
        },
      ],
    },
    {
      label: 'Other features',
      options: [
        {
          label: 'Third-party software',
          value: 'of_3rdparty',
          description: 'This component uses third-party software',
        },
        {
          label: 'File uploads',
          value: 'of_file_uploads',
          description: 'This component implements a file upload feature',
        },
        {
          label: 'Admin dashboard/console',
          value: 'of_admin_dashboard',
          description: 'This component implements an admin dashboard',
        },
      ],
    },
  ];
  return features.filter(f => !f.disabled);
};

export function securityFeaturesOptions(objectType: string): SelectProps.Options {
  let features = [
    {
      label: 'Authentication',
      disabled: ((objectType==='datastore' || objectType==='process' || objectType==='actor') ? false:true), // enable only for datastores, processes, external actors
      options: [
        {
          label: 'OpenID',
          value: 'authn_openid',
          description: 'This component uses OpenID',
        },
        {
          label: 'SAML',
          value: 'authn_saml',
          description: 'This component uses SAML',
        },
        {
          label: 'Other',
          value: 'authn_other',
          description: 'This component uses other authentication standard',
        },
        {
          label: 'None',
          value: 'authn_none',
          description: 'This component does NOT use any authentication standard',
        },
      ],
    },
    {
      label: 'Authorization',
      options: [
        {
          label: 'OAuth 2.0',
          value: 'authz_oauth',
          description: 'This component uses OAuth 2.0',
        },
        {
          label: 'Other',
          value: 'authz_other',
          description: 'This component uses other authorization standard',
        },
        {
          label: 'None',
          value: 'authz_none',
          description: 'This component does NOT use any authorization standard',
        },
      ],
    },
    {
      label: 'Secret & session management',
      options: [
        {
          label: 'Implements secret management',
          value: 'ssm_secrets',
          description: 'This component implements secrets management',
        },
        {
          label: 'Implements session management',
          value: 'ssm_session',
          description: 'This component implements session management',
        },
      ],
    },
  ];
  return features.filter(f => !f.disabled);
};