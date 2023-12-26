using System.Collections;
using System.Collections.Generic;
using UnityEngine;

[CreateAssetMenu(fileName = "World", menuName = "Level")]
public class Level : ScriptableObject {
    // width, heigh, dots, board layout, score goals, balance
    [Header("Board Dimensions")]
    public int width; 
    public int height; 

    [Header("Starting conditions")]
    public Tile[] boardLayout; 
    public GameObject[] dots; 
    public GameObject[] eyes; 
    public int eyeRatio; 
    public int balance; 

    [Header("Score")]
    public int scoreGoal; 
    public Color backgroundColor; 

    [Header("Goals")]
    public BlankGoal[] levelGoals; 

    [Header("Endgame")] 
    public EndGameReqs reqs; 

    [Header("Story")]
    public string[] flavorText; 
}
