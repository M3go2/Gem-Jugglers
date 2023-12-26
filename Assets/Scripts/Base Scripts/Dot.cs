using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Dot : MonoBehaviour {

    [Header("Board Variables")]
    [SerializeField] int _x;
    public int x { get {return _x; } set {_x = value;} }
    [SerializeField] int _y;
    public int y { get {return _y; } set {_y = value;} } 
    private int targetX; 
    private int targetY; 
    [SerializeField] int prevX; 
    [SerializeField] int prevY; 
    [SerializeField] bool _isMatched = false;
    public bool isMatched { get { return _isMatched; } set { _isMatched = value; } } 
    [SerializeField] int _points = 20; 
    public int points { get { return _points; } protected set{ _points = value;} }
    [SerializeField] protected string type; 

    protected Board board; 
    protected FindMatches findMatches; 
    protected HintManager hintManager; 
    protected ScoreManager scoreManager; 
    public GameObject otherDot { get; protected set; } 
    protected Vector2 firstTouchPos = Vector2.zero; 
    protected Vector2 finalTouchPos = Vector2.zero;
    protected Vector2 tempPos; 
    protected SpriteRenderer mySprite; 

    [Header("Swipe Values")]
    [SerializeField] protected float swipeAngle = 0.0f; 
    [SerializeField] protected float swipeResist = 0.5f; 
    protected float moveSpeed = 0.4f; 

    [Header("Powerups")]
    [SerializeField] bool _isColBomb;
    public bool isColBomb { get { return _isColBomb; } set { _isColBomb = value;} }
    [SerializeField] bool _isRowBomb;
    public bool isRowBomb { get {return _isRowBomb; } set { _isRowBomb = value; } } 
    [SerializeField] bool _isColorBomb; 
    public bool isColorBomb { get { return _isColorBomb; } set { _isColorBomb = value; } }
    [SerializeField] bool _isAdjBomb; 
    public bool isAdjBomb { get { return _isAdjBomb; } set { _isAdjBomb = value; } }

    [SerializeField] protected GameObject rowArrow; 
    [SerializeField] protected GameObject colArrow; 
    [SerializeField] protected Sprite rainbowBomb; 
    [SerializeField] protected GameObject adjMarker; 

    // Start is called before the first frame update
    protected void Start() {
        board = GameObject.FindWithTag("board").GetComponent<Board>();
        findMatches = board.findMatches; 
        mySprite = GetComponent<SpriteRenderer>(); 
        hintManager = GameObject.FindWithTag("board").GetComponent<HintManager>(); 
        scoreManager = board.scoreManager; 

        isColBomb = false; 
        isRowBomb = false; 
        isColorBomb = false; 
        isAdjBomb = false; 

    }

    // This is for testing and debug only; and a bit of a cheat code for players who find it.
    protected void OnMouseOver() {
        if (board.currentState == GameState.move){
            if (!this.isColBomb && !this.isRowBomb && !this.isColorBomb && !this.isAdjBomb) {
                if (Input.GetKeyDown("up") || Input.GetKeyDown("down")) {
                    this.makeColBomb(); 
                    // Debug.Log("Player created a column bomb"); 
                }
                else if (Input.GetKeyDown("right") || Input.GetKeyDown("left")) {
                    this.makeRowBomb(); 
                    // Debug.Log("Player created a row bomb");
                }
                else if (Input.GetKeyDown("c")) {
                    this.makeColorBomb(); 
                    // Debug.Log("Player created a color bomb");
                }
                else if (Input.GetKeyDown("a")) {
                    this.makeAdjBomb(); 
                    // Debug.Log("Player created an adjacent bomb");
                }
            }
            else {
                if (Input.GetMouseButtonDown(1)) {
                    // unmake bombs 
                    this.unmakeBomb(); 
                }
            }
        }
    }

    /// <summary>Update is called once per frame</summary>
    protected void Update() {
        targetX = x; 
        targetY = y; 
        if (Mathf.Abs(targetX - transform.position.x) > .1) {
            // Move Towards the target
            tempPos = new Vector2(targetX, transform.position.y);
            transform.position = Vector2.Lerp(transform.position, tempPos, moveSpeed); 
            if (board.allDots[x, y] != this.gameObject) {
                board.allDots[x, y] = this.gameObject; 
            }
            findMatches.FindAllMatches(); 
        }
        else {
            // Directly set the position
            tempPos = new Vector2(targetX, transform.position.y);
            transform.position = tempPos; 
        }
        if (Mathf.Abs(targetY - transform.position.y) > .1) {
            // Move Towards the target
            tempPos = new Vector2(transform.position.x, targetY);
            transform.position = Vector2.Lerp(transform.position, tempPos, moveSpeed);  
            if (board.allDots[x, y] != this.gameObject) {
                board.allDots[x, y] = this.gameObject; 
            }
            findMatches.FindAllMatches(); 
        }
        else {
            // Directly set the position
            tempPos = new Vector2(transform.position.x, targetY);
            transform.position = tempPos; 
        }
    }

    /// <summary>checks to see if moving this dot creates a match </summary>
    public IEnumerator CheckMoveCo() {
        yield return new WaitForSeconds(0.5f); 

        if (isColorBomb) {
            // This dot is a color bomb, and the other dot is the color to destroy
            findMatches.MatchColors(otherDot.tag); 
            this.isMatched = true; 
        }
        else if (otherDot != null) {
            if (otherDot.GetComponent<Dot>().isColorBomb) {
                // The other dot is a color bomb, and this dot is the color to destroy
                findMatches.MatchColors(this.gameObject.tag); 
                otherDot.GetComponent<Dot>().isMatched = true; 
            }
        }
        
        if (otherDot != null) {
            if (!isMatched && !otherDot.GetComponent<Dot>().isMatched) {
                otherDot.GetComponent<Dot>().x = this.x;
                otherDot.GetComponent<Dot>().y = this.y; 
                x = prevX; 
                y = prevY; 
                yield return new WaitForSeconds(0.5f); 
                board.currentDot = null; 
                board.currentState = GameState.move; 
            } 
            else { 
                if (scoreManager != null) {
                    if (scoreManager.reqs.gameType == GameType.moves) {
                        scoreManager.DecreaseCounter(); 
                    } 
                    else if (scoreManager.reqs.gameType == GameType.time) {

                    }
                }
                board.DestroyMatches(); 
            }
        }
    }

    /// <summary>sets the mouse-down position</summary>
    protected void OnMouseDown() {
        // destroy the hint 
        if (hintManager != null) {
            hintManager.DestroyHint(); 
        }

        if (board.currentState == GameState.move) {
            firstTouchPos = Camera.main.ScreenToWorldPoint(Input.mousePosition); 
        }
    }

    /// <summary>sets the mouse-up position</summary>
    protected void OnMouseUp() {
        if (board.currentState == GameState.move) {
            finalTouchPos = Camera.main.ScreenToWorldPoint(Input.mousePosition); 
            CalculateAngle(); 
        }
    }

    /// <summary>calculates the angle of the mouse-down to mouse-up swipe in radians</summary>
    private void CalculateAngle() {
        if (Mathf.Abs(finalTouchPos.y - firstTouchPos.y) > swipeResist || Mathf.Abs(finalTouchPos.x - firstTouchPos.x) > swipeResist) {
            swipeAngle = Mathf.Atan2(finalTouchPos.y - firstTouchPos.y, finalTouchPos.x - firstTouchPos.x); 
            //Debug.Log((swipeAngle * Mathf.PI) + "π rad"); 
            board.currentState = GameState.wait; 
            board.currentDot = this; 
            MoveDots(); 
        }
        else {
            board.currentState = GameState.move; 
        }
    }

    /// <summary>move right, up, left, or down based on the angle of the swipe</summary>
    private void MoveDots() {
        if (swipeAngle > -(Mathf.PI/4) && swipeAngle <= (Mathf.PI/4) && x < (board.width - 1)) {
            // right swipe
            //Debug.Log("Rigth swipe"); 
            this.SwapDots(x + 1, y); 
        }
        else if (swipeAngle > (Mathf.PI/4) && swipeAngle <= (3*Mathf.PI/4) && y < (board.height - 1)) {
            // up swipe 
            //Debug.Log("Up swipe"); 
            this.SwapDots(x, y + 1); 
        }
        else if((swipeAngle > (3*Mathf.PI/4) || swipeAngle <= -(3*Mathf.PI/4)) && x > 0) {
            // left swipe 
            //Debug.Log("Left swipe"); 
            this.SwapDots(x - 1, y); 
        }
        else if (swipeAngle < -(Mathf.PI/4) && swipeAngle >= -(3*Mathf.PI/4) && y > 0) {
            // down swipe 
            //Debug.Log("Down swipe"); 
            this.SwapDots(x, y - 1); 
        }
        else {
            // invalid move
            // Debug.Log("Invalid move"); 
            board.currentState = GameState.move; 
        }
    }

    /// <summary>swaps this dot with a left, right, up, or down neighbor dot</summary>
    private void SwapDots(int x, int y) {
        otherDot = board.allDots[x, y]; 
        if (otherDot != null && !board.nullSpace(otherDot.GetComponent<Dot>())) {
            if (!board.lockedTiles[this.x, this.y] && !board.lockedTiles[otherDot.GetComponent<Dot>().x, otherDot.GetComponent<Dot>().y]) {
                    otherDot.GetComponent<Dot>().x = this.x; 
                    otherDot.GetComponent<Dot>().y = this.y; 
            }
            else {
                board.currentState = GameState.move; 
            }
            this.updatePrevXY(); 
            this.x = x;
            this.y = y;
            StartCoroutine(CheckMoveCo());
        }
        else {
            board.currentState = GameState.move; 
        }
    }

    /// <summary>turns the current dot into a column bomb</summary>
    public void makeColBomb() {
        if (!isColorBomb && !isAdjBomb && !isRowBomb) {
            isColBomb = true; 
            GameObject arrow = Instantiate(colArrow, transform.position, Quaternion.identity); 
            arrow.transform.parent = this.transform; 
        }
    }

    /// <summary>turns the current dot into a row bomb</summary>
    public void makeRowBomb() {
        if (!isColorBomb && !isAdjBomb && !isColBomb) {
            isRowBomb = true; 
            GameObject arrow = Instantiate(rowArrow, transform.position, Quaternion.identity); 
            arrow.transform.parent = this.transform; 
            }
    }

    /// <summary>turns the current dot into a rainbow bomb</summary>
    public void makeColorBomb() {
        if (!isAdjBomb && !isRowBomb && !isColBomb) {
            isColorBomb = true; 
            this.gameObject.tag = "rainbow"; 
            mySprite.sprite = rainbowBomb; 
            mySprite.color = new Color(1f, 1f, 1f, 1f); 
        }
    }

    // <summary>turns the current dot into an adjacent bomb</summary>
    public void makeAdjBomb() {
        if (!isColorBomb && !isColBomb && !isRowBomb) {
            isAdjBomb = true; 
            GameObject marker = Instantiate(adjMarker, transform.position, Quaternion.identity); 
            marker.transform.parent = this.transform;
        }
    }

    /// <summary>turns the current dot back into a (random) normal dot</summary>
    public void unmakeBomb() {
        if (isColBomb) {
            unmakeColBomb(); 
            // Debug.Log("Player returned a column bomb into a " + this.tag + " dot");
        }
        else if (isRowBomb) {
            unmakeRowBomb(); 
            // Debug.Log("Player returned a row bomb into a " + this.tag + " dot");
        }
        else if (isAdjBomb) {
            unmakeAdjBomb(); 
            // Debug.Log("Player returned an adjacent bomb into a " + this.tag + " dot");
        }
        else if (isColorBomb) {
            unmakeColorBomb(); 
            // Debug.Log("Player returned a color bomb into a " + this.tag + " dot");
        }
        else {
            // Debug.Log("No bomb detected.");
        }
    }

    protected void unmakeColBomb() {
        isColBomb = false; 
        GameObject arrow = this.transform.GetChild(0).gameObject;
        Destroy(arrow);  
    }

    protected void unmakeRowBomb() {
        isRowBomb = false; 
        GameObject arrow = this.transform.GetChild(0).gameObject;
        Destroy(arrow);  
    }

    protected void unmakeAdjBomb() {
        isAdjBomb = false; 
        GameObject marker = this.transform.GetChild(0).gameObject;
        Destroy(marker); 
    }

    protected void unmakeColorBomb() {
        isColorBomb = false; 
        GameObject[] dots = board.dots; 
        GameObject dotToUse = Instantiate(dots[Random.Range(0, dots.Length)], transform.position, Quaternion.identity);
        this.gameObject.tag = dotToUse.tag; 
        mySprite.sprite = dotToUse.GetComponent<SpriteRenderer>().sprite; 
        Destroy(dotToUse);
    }

    /// <summary>set previous x- and y-value to current x- and y-value </summary>
    public void updatePrevXY() {
        prevX = x; 
        prevY = y; 
    }

}