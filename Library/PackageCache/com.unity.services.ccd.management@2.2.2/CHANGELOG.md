# Changelog

All notable changes to this package will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## [2.2.2] - 2023-01-27
### Changed
* InternalUploadAsync changed to use a signed URL to upload content
* CreateEntryAsync, CreateOrUpdateEntryByPathAsync, UpdateEntryAsync and UpdateEntryByPathAsync changed to request a signed URL if an upload is needed based on IsUpToDate
* Fix issue with GetReleaseDiff and GetReleaseDiffEntries sending empty release num query params
* Fix issue with GetOrgAsync and GetOrgUsageAsync sending badly formatted body in request 

## [2.2.1] - 2022-08-02
### Added
* Add SetTimeout to CcdManagement to allow configuring timeouts for API calls
* Added GetEntriesAsync(EntryOptions, string, int) which should be the preferred method of getting entries
* ListEnvironmentsByProjectAsync and GetEnvironmentByNameAsync method
* MockHttpRequest for writing unit tests
* Unit tests for EnvironmentsApi

### Changed
* SetDefaultEnvironmentIfNotExists changed to use ListEnvironmentsByProjectAsync
* Added new TryCatchRequest to allow skipping SetDefaultEnvironmentIfNotExists for routes without an Environment
* Moved updates of accessToken and projectId from CcdManagement.Instance to an Action that can be removed for testing

## [2.1.0] - 2022-04-28
* Added support for Environments. To change the environment, use the `SetEnvironmentId` call. Environment IDs can be found in the Unity Dashboard under `Projects` > `Project Settings` > `Environments`. If no environment is set, the default environment of a project will be used.

## [2.0.4] - 2022-04-13
* Bumping patch version due to promotion errors
## [2.0.3] - 2022-04-06
* Updated Core and NewtonsoftJson dependencies

## [2.0.2] - 2022-02-28
* Updated Core and NewtonsoftJson dependencies

## [2.0.1] - 2022-01-18
### Added
- Endpoints with configurable `Options` objects as parameters
- Better error and exception handling
- CCD Sample Window to demonstrate package usage
### Changed
- Tests to reflect new endpoint changes
### Removed
- Old endpoints
- Old sample

## [1.0.0-pre.2] - 2021-09-02
* Removing unused files
* Updating README

## [1.0.0-pre.1] - 2021-08-24
* Upgrading to preview version

## [0.1.0-preview] - 2021-08-23
* First internal release
