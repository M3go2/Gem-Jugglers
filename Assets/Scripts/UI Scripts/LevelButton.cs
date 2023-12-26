using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI; 

public class LevelButton : MonoBehaviour {

    [Header("Active Stuff")]
    [SerializeField] bool active;  
    [SerializeField] int stars;
    [SerializeField] GameObject lockStatus; 
    private Button myButton; 

    [Header("Level UI")]
    [SerializeField] Image[] starImages;  
    [SerializeField] Text levelText; 
    [SerializeField] int lvl; 
    [SerializeField] GameObject confirmPanel; 

    private GameData gameData; 

    // Start is called before the first frame update
    void Start() {
        myButton = GetComponent<Button>(); 
        gameData = FindObjectOfType<GameData>(); 

        LoadData(); 

        ActivateStars(); 
        ShowLevel();
        DecideSprite(); 
    }

    private void LoadData() {
        if (gameData != null && gameData.saveData != null) {
            if (gameData.saveData.actives[lvl]) {
                active = true; 
                stars = gameData.saveData.stars[lvl];
            } 
            else {
                active = false; 
            }
        } 
        if (lvl == 0) {
            active = true; 
        }
    }

    private void ActivateStars() {
        // turn all stars off 
        for (int i = 0; i < starImages.Length; i++) {
            starImages[i].enabled = false; 
        }
        // turn on stars that should be on
        for (int i = 0; i < stars; i++) {
            starImages[i].enabled = true; 
        }
    }

    private void DecideSprite() {
        if (active) {
            lockStatus.SetActive(false); 
            levelText.gameObject.SetActive(true); 
            myButton.enabled = true; 
        }
        else {
            lockStatus.SetActive(true);  
            levelText.gameObject.SetActive(false);
            myButton.enabled = false; 
        }
    }

    void ShowLevel() {
        levelText.text = (lvl + 1).ToString(); 
    }

    // Update is called once per frame
    void Update() {
        
    }

    public void ConfirmPanel() {
        confirmPanel.GetComponent<ConfirmPanel>().lvl = this.lvl; 
        confirmPanel.SetActive(true); 
    }
}
