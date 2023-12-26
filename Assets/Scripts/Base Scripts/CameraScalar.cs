using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class CameraScalar : MonoBehaviour {
    private Board board; 
    private float cameraOffset = -10; 
    [SerializeField] float aspectRaio = 1.25f;
    private float padding = 3f; 
    [SerializeField] float xOffset = -1f; 
    [SerializeField] float yOffset = 0f; 

    // Start is called before the first frame update
    void Start() {
        board = FindObjectOfType<Board>(); 
        if (board != null) {
            RepositionCamera(board.width - 1, board.height - 1); 
        }
    }

    public void RepositionCamera(int x, int y) {
        Vector3 tempPos = new Vector3(x / 2 + xOffset, (y / 2) + yOffset, cameraOffset);
        transform.position = tempPos; 
        if (board.width >= board.height) {
            Camera.main.orthographicSize = (board.width / 2 + padding); 
        }
        else {
            Camera.main.orthographicSize = board.height / 2 + padding / aspectRaio; 
        }
    }
}
