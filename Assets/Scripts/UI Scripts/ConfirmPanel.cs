using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI; 
using UnityEngine.SceneManagement; 
using UnityEngine.Localization; 
using UnityEngine.Localization.Tables; 

public class ConfirmPanel : MonoBehaviour {

    [Header("Level Info")]
    [SerializeField] string sceneToLoad; 
    private GameData gameData; 
    [SerializeField] int _lvl; 
    public int lvl { get { return _lvl ;} set { _lvl = value; } }
    private int stars; 
    private int highScore; 
    [SerializeField] World world; 

    [Header("UI stuff")]
    [SerializeField] Image[] starImages; 
    [SerializeField] Text highScoreText; 
    [SerializeField] Text flavorText; 
    [SerializeField] Text lvlNumText; 

    [Header("Localization")] 
    [SerializeField] private LocalizedStringTable _localizedStringTable;
    private StringTable _currentStringTable;
    private string lvlLabel; 

    // Start is called before the first frame update
    private void Start() {
        gameData = FindObjectOfType<GameData>(); 

        lvl = PlayerPrefs.GetInt("CurrentLevel", 0);
        StartCoroutine(SetUpCo()); 
        LoadData(); 
        Cancel(); 
    }

    void OnEnable() {
        gameData = FindObjectOfType<GameData>(); 
        LoadData(); 
        StartCoroutine(SetUpCo()); 
    }

    private IEnumerator SetUpCo() {
        var tableLoading = _localizedStringTable.GetTable(); 

        yield return tableLoading; 

       _currentStringTable = tableLoading; 

        lvlLabel = _currentStringTable["level_0"].LocalizedValue; 
        // Debug.Log("Level translated: " + lvlLabel); 

        UpdateLevelNum(); 
        UpdateHighScore(); 
        ActivateStars(); 
        LoadFlavorText();  
    }

    private void UpdateLevelNum() {
        lvlNumText.text = lvlLabel + " " + (lvl + 1).ToString(); 
    }

    private void ActivateStars() {
        for (int i = 0; i < starImages.Length; i++) {
            starImages[i].enabled = false; 
        }
        for (int i = 0; i < stars; i++) {
            starImages[i].enabled = true; 
        }
    }

    private void UpdateHighScore() {
        highScoreText.text = highScore.ToString();
    }

    private void LoadFlavorText() {
        if (world != null) {
            
            string tempFlavor = ""; 
            for (int i = 0; i < world.levels[lvl].flavorText.Length - 1; i++) {
                tempFlavor = tempFlavor + world.levels[lvl].flavorText[i] + "\n"; 
            }
            tempFlavor = tempFlavor + world.levels[lvl].flavorText[world.levels[lvl].flavorText.Length - 1];
            flavorText.text = tempFlavor;  
        }
    }

    private void LoadData() {
        if (gameData != null) {
            if (lvl <= gameData.saveData.Count){
                SaveData thisLevel = gameData.saveData; 
                stars = thisLevel.stars[lvl]; 
                highScore = thisLevel.highScores[lvl]; 
            }
            else {
                Debug.Log("Level not found");
                stars = 0; 
                highScore = 0; 
            }
        }
        else {
            Debug.Log("GameData not found"); 
        }
    }

    // Update is called once per frame
    void Update() {

    }

    public void Cancel() {
        this.gameObject.SetActive(false); 
    }

    public void Play() {
        PlayerPrefs.SetInt("CurrentLevel", lvl);
        SceneManager.LoadScene(sceneToLoad); 
    }
}
