using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Dot : MonoBehaviour
{
    [Header("Board Variables")]
    [SerializeField] int _x;
    public int x { get { return _x; } set { _x = value; } }
    [SerializeField] int _y;
    public int y { get { return _y; } set { _y = value; } }
    private int targetX;
    private int targetY;
    [SerializeField] int prevX;
    [SerializeField] int prevY;
    [SerializeField] bool _isMatched = false;
    public bool isMatched { get { return _isMatched; } set { _isMatched = value; } }
    [SerializeField] int _points = 20;
    public int points { get { return _points; } protected set { _points = value; } }
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
    public bool isColBomb { get { return _isColBomb; } set { _isColBomb = value; } }
    [SerializeField] bool _isRowBomb;
    public bool isRowBomb { get { return _isRowBomb; } set { _isRowBomb = value; } }
    [SerializeField] bool _isColorBomb;
    public bool isColorBomb { get { return _isColorBomb; } set { _isColorBomb = value; } }
    [SerializeField] bool _isAdjBomb;
    public bool isAdjBomb { get { return _isAdjBomb; } set { _isAdjBomb = value; } }

    [SerializeField] protected GameObject rowArrow;
    [SerializeField] protected GameObject colArrow;
    [SerializeField] protected Sprite rainbowBomb;
    [SerializeField] protected GameObject adjMarker;

    // Start is called before the first frame update
    protected void Start()
    {
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

    // Update is called once per frame
    protected void Update()
    {
        targetX = x;
        targetY = y;

        if (Input.GetMouseButtonDown(0))
        {
            Vector2 touchPos = Camera.main.ScreenToWorldPoint(Input.mousePosition);
            HandleInput(touchPos);
        }

        if (Input.touchCount > 0)
        {
            Vector2 touchPos = Camera.main.ScreenToWorldPoint(Input.GetTouch(0).position);
            HandleInput(touchPos);
        }

        if (Mathf.Abs(targetX - transform.position.x) > .1)
        {
            // Move Towards the target
            tempPos = new Vector2(targetX, transform.position.y);
            transform.position = Vector2.Lerp(transform.position, tempPos, moveSpeed);
            if (board.allDots[x, y] != this.gameObject)
            {
                board.allDots[x, y] = this.gameObject;
            }
            findMatches.FindAllMatches();
        }
        else
        {
            // Directly set the position
            tempPos = new Vector2(targetX, transform.position.y);
            transform.position = tempPos;
        }

        if (Mathf.Abs(targetY - transform.position.y) > .1)
        {
            // Move Towards the target
            tempPos = new Vector2(transform.position.x, targetY);
            transform.position = Vector2.Lerp(transform.position, tempPos, moveSpeed);
            if (board.allDots[x, y] != this.gameObject)
            {
                board.allDots[x, y] = this.gameObject;
            }
            findMatches.FindAllMatches();
        }
        else
        {
            // Directly set the position
            tempPos = new Vector2(transform.position.x, targetY);
            transform.position = tempPos;
        }
    }

    private void HandleInput(Vector2 inputPos)
    {
        if (board.currentState == GameState.move)
        {
            firstTouchPos = inputPos;
        }
        else if (board.currentState == GameState.wait)
        {
            finalTouchPos = inputPos;
            CalculateAngle();
        }
    }

    private void CalculateAngle()
    {
        if (Mathf.Abs(finalTouchPos.y - firstTouchPos.y) > swipeResist || Mathf.Abs(finalTouchPos.x - firstTouchPos.x) > swipeResist)
        {
            swipeAngle = Mathf.Atan2(finalTouchPos.y - firstTouchPos.y, finalTouchPos.x - firstTouchPos.x);
            board.currentState = GameState.wait;
            board.currentDot = this;
            MoveDots();
        }
        else
        {
            board.currentState = GameState.move;
        }
    }

    private void MoveDots()
    {
        if (swipeAngle > -(Mathf.PI / 4) && swipeAngle <= (Mathf.PI / 4) && x < (board.width - 1))
        {
            this.SwapDots(x + 1, y);
        }
        else if (swipeAngle > (Mathf.PI / 4) && swipeAngle <= (3 * Mathf.PI / 4) && y < (board.height - 1))
        {
            this.SwapDots(x, y + 1);
        }
        else if ((swipeAngle > (3 * Mathf.PI / 4) || swipeAngle <= -(3 * Mathf.PI / 4)) && x > 0)
        {
            this.SwapDots(x - 1, y);
        }
        else if (swipeAngle < -(Mathf.PI / 4) && swipeAngle >= -(3 * Mathf.PI / 4) && y > 0)
        {
            this.SwapDots(x, y - 1);
        }
        else
        {
            board.currentState = GameState.move;
        }
    }

    private void SwapDots(int x, int y)
    {
        otherDot = board.allDots[x, y];
        if (otherDot != null && !board.nullSpace(otherDot.GetComponent<Dot>()))
        {
            if (!board.lockedTiles[this.x, this.y] && !board.lockedTiles[otherDot.GetComponent<Dot>().x, otherDot.GetComponent<Dot>().y])
            {
                otherDot.GetComponent<Dot>().x = this.x;
                otherDot.GetComponent<Dot>().y = this.y;
            }
            else
            {
                board.currentState = GameState.move;
            }
            this.updatePrevXY();
            this.x = x;
            this.y = y;
            StartCoroutine(CheckMoveCo());
        }
        else
        {
            board.currentState = GameState.move;
        }
    }

    public IEnumerator CheckMoveCo()
    {
        yield return new WaitForSeconds(0.5f);

        if (isColorBomb)
        {
            findMatches.MatchColors(otherDot.tag);
            this.isMatched = true;
        }
        else if (otherDot != null)
        {
            if (otherDot.GetComponent<Dot>().isColorBomb)
            {
                findMatches.MatchColors(this.gameObject.tag);
                otherDot.GetComponent<Dot>().isMatched = true;
            }
        }

        if (otherDot != null)
        {
            if (!isMatched && !otherDot.GetComponent<Dot>().isMatched)
            {
                otherDot.GetComponent<Dot>().x = this.x;
                otherDot.GetComponent<Dot>().y = this.y;
                x = prevX;
                y = prevY;
                yield return new WaitForSeconds(0.5f);
                board.currentDot = null;
                board.currentState = GameState.move;
            }
            else
            {
                if (scoreManager != null)
                {
                    if (scoreManager.reqs.gameType == GameType.moves)
                    {
                        scoreManager.DecreaseCounter();
                    }
                    else if (scoreManager.reqs.gameType == GameType.time)
                    {

                    }
                }
                board.DestroyMatches();
            }
        }
    }

    protected void OnMouseOver()
    {
        if (board.currentState == GameState.move)
        {
            if (!this.isColBomb && !this.isRowBomb && !this.isColorBomb && !this.isAdjBomb)
            {
                if (Input.GetKeyDown("up") || Input.GetKeyDown("down"))
                {
                    this.makeColBomb();
                }
                else if (Input.GetKeyDown("right") || Input.GetKeyDown("left"))
                {
                    this.makeRowBomb();
                }
                else if (Input.GetKeyDown("c"))
                {
                    this.makeColorBomb();
                }
                else if (Input.GetKeyDown("a"))
                {
                    this.makeAdjBomb();
                }
            }
            else
            {
                if (Input.GetMouseButtonDown(1))
                {
                    this.unmakeBomb();
                }
            }
        }
    }

    protected void OnMouseDown()
    {
        if (hintManager != null)
        {
            hintManager.DestroyHint();
        }

        if (board.currentState == GameState.move)
        {
            firstTouchPos = Camera.main.ScreenToWorldPoint(Input.mousePosition);
        }
    }

    protected void OnMouseUp()
    {
        if (board.currentState == GameState.move)
        {
            finalTouchPos = Camera.main.ScreenToWorldPoint(Input.mousePosition);
            CalculateAngle();
        }
    }

    public void makeColBomb()
    {
        if (!isColorBomb && !isAdjBomb && !isRowBomb)
        {
            isColBomb = true;
            GameObject arrow = Instantiate(colArrow, transform.position, Quaternion.identity);
            arrow.transform.parent = this.transform;
        }
    }

    public void makeRowBomb()
    {
        if (!isColorBomb && !isAdjBomb && !isColBomb)
        {
            isRowBomb = true;
            GameObject arrow = Instantiate(rowArrow, transform.position, Quaternion.identity);
            arrow.transform.parent = this.transform;
        }
    }

    public void makeColorBomb()
    {
        if (!isAdjBomb && !isRowBomb && !isColBomb)
        {
            isColorBomb = true;
            this.gameObject.tag = "rainbow";
            mySprite.sprite = rainbowBomb;
            mySprite.color = new Color(1f, 1f, 1f, 1f);
        }
    }

    public void makeAdjBomb()
    {
        if (!isColorBomb && !isColBomb && !isRowBomb)
        {
            isAdjBomb = true;
            GameObject marker = Instantiate(adjMarker, transform.position, Quaternion.identity);
            marker.transform.parent = this.transform;
        }
    }

    public void unmakeBomb()
    {
        if (isColBomb)
        {
            unmakeColBomb();
        }
        else if (isRowBomb)
        {
            unmakeRowBomb();
        }
        else if (isAdjBomb)
        {
            unmakeAdjBomb();
        }
        else if (isColorBomb)
        {
            unmakeColorBomb();
        }
        else
        {
            // No bomb detected.
        }
    }

    protected void unmakeColBomb()
    {
        isColBomb = false;
        GameObject arrow = this.transform.GetChild(0).gameObject;
        Destroy(arrow);
    }

    protected void unmakeRowBomb()
    {
        isRowBomb = false;
        GameObject arrow = this.transform.GetChild(0).gameObject;
        Destroy(arrow);
    }

    protected void unmakeAdjBomb()
    {
        isAdjBomb = false;
        GameObject marker = this.transform.GetChild(0).gameObject;
        Destroy(marker);
    }

    protected void unmakeColorBomb()
    {
        isColorBomb = false;
        GameObject[] dots = board.dots;
        GameObject dotToUse = Instantiate(dots[Random.Range(0, dots.Length)], transform.position, Quaternion.identity);
        this.gameObject.tag = dotToUse.tag;
        mySprite.sprite = dotToUse.GetComponent<SpriteRenderer>().sprite;
        Destroy(dotToUse);
    }

    public void updatePrevXY()
    {
        prevX = x;
        prevY = y;
    }
}
