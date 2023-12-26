using UnityEngine;

public class LocalizationValues : MonoBehaviour {
 
    public string Level;

    void Start() {
        Level = (PlayerPrefs.GetInt("CurrentLevel", 0) + 1).ToString(); 
    }

}
