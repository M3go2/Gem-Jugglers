using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Gem : Dot
{
    // Start is called before the first frame update
    new protected void Start()
    {
        base.Start(); 
        this.type = "gem"; 
    }

}
