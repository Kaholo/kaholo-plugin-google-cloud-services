# kaholo-plugin-google-cloud-services
Kaholo plugin to manage service useage in Google Cloud.

## Settings
1. Credentials (Vault) **Optional** - Default google cloud credentials to authenticate with

## Method: List Services
Lists all services enabled in the specified project.

### Parameters:
1. Credentials (Vault) **Optional** - Google cloud credentials to authenticate with in this specific call to the method.
2. Project ID (string) **Required** - The ID of the project to list it's enabled services.

## Method: Enable Service
Enable the service specified on the specified project.

### Parameters:
1. Credentials (Vault) **Optional** - Google cloud credentials to authenticate with in this specific call to the method.
2. Project ID (string) **Required** - The ID of the project to enable a service on.
3. Service (string) **Required** - The name of the service to enable.

## Method: Disable Service
Disable the service specified on the specified project.

### Parameters:
1. Credentials (Vault) **Optional** - Google cloud credentials to authenticate with in this specific call to the method.
2. Project ID (string) **Required** - The ID of the project to disable a service on.
3. Service (string) **Required** - The name of the service to disable.