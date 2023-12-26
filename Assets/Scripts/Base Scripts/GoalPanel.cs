using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI; 

public class GoalPanel : MonoBehaviour {
    
    [SerializeField] Image _image; 
    public Sprite sprite { get { return _image.sprite; } set { _image.sprite = value; } }
    public  Color color { get {return _image.color; } set { _image.color = value; } } 
    [SerializeField] Text _text; 
    public string text { get { return _text.text; } set { _text.text = value; } }

}
