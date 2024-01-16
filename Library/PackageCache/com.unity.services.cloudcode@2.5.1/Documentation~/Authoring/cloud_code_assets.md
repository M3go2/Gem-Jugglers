# Cloud Code Assets

## Creation
Right-click on the `Project Window` then select `Create > Cloud Code Script` to create a Cloud Code Script.

## Parameters
Selecting a Cloud Code Script will allow you to modify its parameters in the inspector.

Be advised that changing parameters on an existing script might make existing game clients
incompatible. The client may send parameters that are incompatible, or not send required parameters.

The possible parameter types are:
* String
* Boolean
* Numeric
* JSON
* Any

More details can be found in the [Cloud Code Documentation](https://docs.unity.com/cloud-code/types-of-scripts.html).

> [!NOTE]
> The [Inspector](https://docs.unity3d.com/Manual/UsingTheInspector.html) has limited support for editing parameters; the UGS CLI can't read these parameters. If you want to use both the Editor and the CLI, use [in-script parameters](#in-script-parameters).

## In-Script Parameters

To allow a more seamless experience in your Cloud Code Scripts, you may declare 
your parameters directly in the script.

To do so, simply export the `params` object, containing each parameter name as a key, and
its type as a value. 

The `module.exports` property must have been assigned before setting the parameters.

Example:

```
module.exports.params = { "echo" : "Boolean" }
```

Alternatively, if you'd like to specify that the parameter is required,
you may specify an object containing both the `type` and `required` properties.

Example:

```
module.exports.params = { "aParam" : { "type": "String", "required": true } }
```

By default, parameters are not required.

Both formats can be combined as desired:

```
module.exports.params = { 
  "echo" : "Boolean",
  "aParam" : { "type": "String", "required": true }
 }
```

If you are using in-script parameters, they will override previously defined
inspector parameters.

In-script parameters offer a simpler alternative to declaring parameters. 
Deploying a file with in-script parameters will add the necessary parameters on the dashboard. 
At the current time, modifying in-script parameters in the dashboard is not supported.

Here is an example of a full script with in script parameters.
```js
const _ = require("lodash-4.17");

module.exports = async ({ params, context, logger }) => {

  var numSides = params["numSides"]
  const roll = rollDice(numSides);

  if (roll > numSides) {
    logger.error("The roll is greater than the number of sides: " + roll);
    throw Error("Unable to roll dice!");
  }

  return {
    sides: numSides,
    roll: roll,
  };
};

module.exports.params = {
  "numSides" : "Numeric"
}

// Functions can exist outside of the script wrapper
function rollDice(sides) {
  return _.random(1, sides);
}
```

## File Names
Cloud Code assets use their file name 
as the identifier when uploading to the service.

## Opening Cloud Code Assets

By default, your Cloud Code Asset will be opened in your currently
selected editor.

If you would like to override this behavior, navigate to
`Preferences > Cloud Code > Javascript Editor`.

From there, you can set up your desired text editor or IDE.

For advanced cases, you can specify an argument format.

The following arguments will be handled:
* $(File): File Path of the asset
* $(ProjectPath): Project Directory
* $(SolutionPath): Solution Path
* $(EditorExePath): Editor Executable Path (selected in External Tools)

A few examples of possible set ups:

* Rider (On Windows): 
  * Application: cmd.exe
  * Args: /C "$(EditorExePath) $(ProjectPath) $(File)"
* VS Code: 
  * Application: Code.exe
  * Args: $(ProjectPath) $(File)"

## Naming Restrictions
The Cloud Code service restricts the possible identifier names that can be used. 

In order to make sure your file uploads correctly, make sure to consult their [documentation](https://docs.unity.com/cloud-code/using-cloud-code.html#Script_creation). 
