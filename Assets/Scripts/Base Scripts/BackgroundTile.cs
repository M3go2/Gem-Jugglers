using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class BackgroundTile : MonoBehaviour
{
    [SerializeField] int _hp = 1;
    public int hp { get { return _hp; } private set { _hp = value; } } 
    [SerializeField] int _points = 10;
    public int points { get { return _points;} private set { _points = value; } } 
    private SpriteRenderer sprite; 
    private ScoreManager scoreManager; 

    void Start() {
        scoreManager = GameObject.FindWithTag("board").GetComponent<ScoreManager>(); 
        sprite = GetComponent<SpriteRenderer>(); 
    }

    void Update() {
        if (hp <= 0) {
            if (scoreManager != null) {
                scoreManager.compareGoal(this.gameObject.tag); 
                scoreManager.UpdateGoals(); 
            }
            Destroy(this.gameObject); 
        } 
    }

    /// <summary>If this tile is breakable, subtract <paramref name="dmg"/> from this tile's current health</summary>
    /// <param name="dmg">amount of damage for this tile to take if breakable</param>
    public void TakeDmg(int dmg) {
        hp -= dmg; 
        this.TileDmg(); 
    }

    public void TakeDmg() {
        hp -= 1; 
        this.TileDmg(); 
    }

    /// <summary>Takes current sprite alpha and cut it in half</summary>
    private void TileDmg() {
        Color color = sprite.color; 
        float newAlpha = color.a * 0.5f; 
        sprite.color = new Color(color.r, color.g, color.b, newAlpha); 

    }

}
