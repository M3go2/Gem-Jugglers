using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.SceneManagement; 

public class LevelSelection : MonoBehaviour {
    [SerializeField] string sceneToLoad; 
    [SerializeField] GameObject[] panels; 
    [SerializeField] GameObject currentPanel; 
    [SerializeField] int page; 
    private GameData data; 
    [SerializeField] int currentLevel = 0; 

    // Start is called before the first frame update
    void Start() {
        data = FindObjectOfType<GameData>(); 
        for (int i = 0; i < panels.Length; i++) {
            panels[i].SetActive(false); 
        }
        if (data != null && data.saveData != null) {
            for (int i = 0; i < data.saveData.actives.Length; i++) {
                if (data.saveData.actives[i]) {
                    currentLevel = i; 
                }
            }
        }

        page = Mathf.FloorToInt(currentLevel / 6); 
        currentPanel = panels[page]; 
        currentPanel.SetActive(true); 
    }

    // Update is called once per frame
    void Update() {
        
    }

    public void toStart() {
        SceneManager.LoadScene(sceneToLoad); 
    }

    public void PageLeft() {
        if (page > 0) {
            currentPanel.SetActive(false); 
            page--; 
            currentPanel = panels[page]; 
            currentPanel.SetActive(true); 
        }
    }

    public void PageRight() {
        if (page < panels.Length - 1) {
            currentPanel.SetActive(false); 
            page++; 
            currentPanel = panels[page]; 
            currentPanel.SetActive(true); 
        }
    }
}
