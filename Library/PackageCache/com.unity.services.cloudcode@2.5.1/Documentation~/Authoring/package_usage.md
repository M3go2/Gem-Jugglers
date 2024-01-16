# Package Usage

## Overview
The Cloud Code Authoring module is the Cloud Code
integration with the Deployment package

It allows for creation, modification and deployment of 
cloud code scripts.

For the best use of this module, the Deployment package must be
installed.

For more details regarding the Deployment package, check its documentation.

## Intended Usage
The Cloud Code Authoring module was developed to enable users to upload scripts 
from the Unity Editor to the Dashboard. 

Scripts existing in the editor allows users 
to treat their source control as the source of truth.

This means that rollbacks, bisection and other common version-control
operations become trivial.  
For instance keeping client C# scripts in sync with CloudCode scripts
becomes a simple task.

## File Authoring
Cloud code scripts can be authored by clicking on `Create > Cloud Code Script`, 
setting the name as with C# scripts and hitting `Return key`. 

Once created it should be visible in the `Project Window` 
and in the Deployment Window.

## File Modification
In order to edit a file, double click on the file in the 
`Project Window` or open the Deployment Window and right click 
on the file and chose `Open` in the context menu. 

The file should be opened in the IDE of your preference. 
To change the preferred IDE go to `Preferences > External Tools > External Script Editor`.

## File Deployment
File deployment is done through the Deployment Window UI available
in the com.unity.services.deployment package.

For more details, check the com.unity.services.deployment package documentation.

## Cloud Code Authoring
For more information about the package and specific features please consult [documentation](./index.md).

