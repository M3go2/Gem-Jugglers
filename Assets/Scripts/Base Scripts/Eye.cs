using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Eye : Dot
{
    // Start is called before the first frame update
    new protected void Start()
    {
        base.Start(); 
        this.type = "eye"; 
    }

    /// <summary>turns the current dot back into a (random) eye dot</summary>
    new protected void unmakeColorBomb() {
        isColorBomb = false; 
        GameObject[] eyes = base.board.eyes; 
        GameObject dotToUse = Instantiate(eyes[Random.Range(0, eyes.Length)], transform.position, Quaternion.identity);
        this.gameObject.tag = dotToUse.tag; 
        mySprite.sprite = dotToUse.GetComponent<SpriteRenderer>().sprite; 
        Destroy(dotToUse);
    }
}
