using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI; 

public class RandomDot : MonoBehaviour {
    [SerializeField] Sprite[] dots; 
    [SerializeField] Sprite heart; 
    private Image myImage; 
    private float timer; 
    private GameData data; 

    // Start is called before the first frame update
    void Start() {
        myImage = this.gameObject.GetComponent<Image>(); 
        data = FindObjectOfType<GameData>(); 
    }

    // Update is called once per frame
    void Update() {
        timer -= Time.deltaTime; 
        if (timer <= 0) {
            ChangeSprite(); 
            timer = 3; 
        }
    }

    private void ChangeSprite() {
        if (data.saveData.summon) {
            myImage.sprite = heart; 
        }
        else {
            int rand = Random.Range(0, dots.Length); 
            myImage.sprite = dots[rand]; 
            // Debug.Log("Sprite Changed"); 
        }
    }

}
