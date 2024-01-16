# Cloud Code Authoring
This module allows users to author, modify, and deploy Cloud Code scripts directly from the Unity Editor.

> NOTE: Cloud Code Authoring is only supported on Unity 2021.3 and above.

### Deployment Window
The Deployment Window is a core feature of the Deployment package.

The purpose of the Deployment Window is to allow all services
to have a single cohesive interface for Deployment needs.

The Deployment Window provides a uniform deployment interface for all services. 
It allows you to upload cloud assets for your respective cloud service.

For more information, consult the [com.unity.services.deployment](https://docs.unity3d.com/Packages/com.unity.services.deployment@latest) package documentation.

### Cloud Code Assets
Right-click on the `Project Window` then select `Create > Cloud Code Script` to create a Cloud Code Script.

The Deployment Window automatically detects these files to be deployed at a later time.

For more information on how to create and modify Cloud Code Assets,
please see the [Cloud Code assets](./cloud_code_assets.md) documentation.

### Javascript Project
Cloud Code offers Javascript as a development language.
In order to provide the expected toolset for Javascript development, this package contains some specific Javascript tooling.

For more information about Javascript projects, refer to the Javascript Project [documentation](./javascript_project.md).

For the best experience please make sure that you have NodeJS installed and that you configure it as per the documentation. 
