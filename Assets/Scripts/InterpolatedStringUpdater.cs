using UnityEngine;
using UnityEngine.Localization.SmartFormat.Extensions;
using UnityEngine.Localization.SmartFormat.PersistentVariables;  
using UnityEngine.Localization.Settings; 
using Random = UnityEngine.Random;

public class InterpolatedStringUpdater : MonoBehaviour {
    private void Start() {

        // Get our GlobalVariablesSource
        var source = LocalizationSettings.StringDatabase.SmartFormatter.GetSourceExtension<PersistentVariablesSource>();

        // Get the specific global variables
        var currentLevel = source["global"]["level"] as StringVariable; 


        // Update the global variable
        currentLevel.Value = (PlayerPrefs.GetInt("CurrentLevel", 0) + 1).ToString(); 

    }

}