using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using System; 
using System.IO; 
using System.Runtime.Serialization.Formatters.Binary; 

[Serializable]
public class SaveData {
    public bool[] actives { get; private set; } 
    public int[] highScores { get; private set; } 
    public int[] stars { get; private set; }
    public bool summon { get; internal set; } = false;

    public SaveData(int lvls) {
        actives = new bool[lvls]; 
        stars = new int[lvls];
        highScores = new int[lvls]; 
        actives[0] = true; 
    }

    public int Count {
        get { 
            if (stars.Length == highScores.Length && stars.Length == actives.Length) {
            return stars.Length; 
            }
            else {
                return -1; 
            }
        }
    }

}

public class GameData : MonoBehaviour {

    public static GameData gameData; 
    [SerializeField] internal World world; 
    public SaveData saveData; 
    public string[] debugData; 
    
    void Awake() {
        if (gameData == null) {
            DontDestroyOnLoad(this.gameObject); 
            gameData = this; 
        }
        else {
            Destroy(this.gameObject); 
        }

        Load(); 
    }
    public void Save() {
        // create a binary formatter that can read binary files 
        BinaryFormatter formatter = new BinaryFormatter(); 

        // open file stream 
        FileStream file = File.Open(Application.persistentDataPath + "/player.dat", FileMode.Create); 

        // create a copy of save data
        SaveData data = new SaveData(world.levels.Length);
        data = saveData;  


        // write the save data to the file
        formatter.Serialize(file, data); 

        // close data stream *important*
        file.Close(); 

        // Debug.Log("Saved"); 
        SaveDebugData(); 
    }

    public void Load() {
        // Check if the save game file exists 
        if (File.Exists(Application.persistentDataPath + "/player.dat")) {
            // create a binary formatter 
            BinaryFormatter formatter = new BinaryFormatter(); 
            FileStream file = File.Open(Application.persistentDataPath + "/player.dat", FileMode.Open); 

            saveData = formatter.Deserialize(file) as SaveData; 

            file.Close(); 

            // if saveData is corrupted or from an old version of the game, shoot an error
            // if (saveData.Count != world.levels.Length) {
            //     // For now, write old file under a new name 

            //     FileStream fileBkp = File.Open(Application.persistentDataPath + "/playerbkp.dat", FileMode.Create);
            //     SaveData bkpData = new SaveData(world.levels.Length); 
            //     bkpData = saveData; 
            //     formatter.Serialize(fileBkp, bkpData); 
            //     fileBkp.Close(); 

            //     // Load fresh save
            //     Debug.Log("Save corrupted or from wrong version: fresh save created");
            //     ClearSave(); 
            //     Load(); 
            // }

            // Debug.Log("Save loaded from file"); 
        }
        else { 
            Debug.Log("No saves found: fresh save created"); 
            ClearSave(); 
            Load(); 
        }
        if (File.Exists(Application.persistentDataPath + "/playerdebug.txt")) {
            // Read debug Data
            debugData = System.IO.File.ReadAllLines(Application.persistentDataPath + "/playerdebug.txt"); 
        }
        else {
            debugData = new String[world.levels.Length];
            SaveDebugData(); 
        }
    }

    public async void SaveDebugData() {
        await File.WriteAllLinesAsync(Application.persistentDataPath + "/playerdebug.txt", debugData); 
    }

    private void OnDisable() {
        Save(); 
    }

    private void OnApplicationPause() {
        Save(); 
    }

    private void OnApplicationQuit() {
        Save(); 
    }

    // Update is called once per frame
    void Update()
    {
        
    }

    public void ClearSave() {
        bool summoned = saveData.summon; 
        saveData = new SaveData(world.levels.Length); 
        saveData.summon = summoned; 
        Save(); 
        Debug.Log("Save cleared"); 
    }
}
