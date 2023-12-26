using UnityEngine;
using UnityEngine.UI; 

public class FloatingText
{
    public bool active { get; private set; }
    [SerializeField] GameObject _go;
    public GameObject go { get { return _go; } set { _go = value; } }
    public Text txt { get { return go.GetComponent<Text>(); } }
    public Vector3 motion { get; set; } 
    public float duration  { get; set; } 
    public float lastShown { get; private set; } 

    public void Show() {
        active = true;
        lastShown = Time.time;
        go.SetActive(active); 
    }

    public void Hide() {
        active = false;
        go.SetActive(active); 
    }

    public void UpdateFloatingText() {
        if (!active) {
            return; 
        }

        if (Time.time - lastShown > duration) {
            Hide(); 
        }

        go.transform.position += motion * Time.deltaTime; 
    }
}
