using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using System.Linq; 
using UnityEngine.Localization; 
using UnityEngine.Localization.Tables; 

public class FindMatches : MonoBehaviour {

    private Board board; 
    [SerializeField] private List<GameObject> _currentMatches; 
    public List<GameObject> currentMatches { get { return _currentMatches; } private set { _currentMatches = value; } }
    private FloatingTextManager floatingTextManager; 
    private string[] bombText; 

    [Header("Localization")] 
    [SerializeField] LocalizedStringTable _localizedStringTable;
    private StringTable _currentStringTable;

    // Start is called before the first frame update
    void Start() {
        board = GameObject.FindWithTag("board").GetComponent<Board>(); 
        floatingTextManager = board.floatingTextManager; 
        currentMatches = new List<GameObject>(); 

        bombText = new string[8];
        StartCoroutine(BombTextCo()); 
    }

    private IEnumerator BombTextCo() {

        var tableLoading = _localizedStringTable.GetTable(); 

        yield return tableLoading; 

       _currentStringTable = tableLoading; 

        bombText[0] = _currentStringTable["awesome"].LocalizedValue; 
        bombText[1] = _currentStringTable["amazing"].LocalizedValue; 
        bombText[2] = _currentStringTable["great"].LocalizedValue; 
        bombText[3] = _currentStringTable["fantastic"].LocalizedValue; 
        bombText[4] = _currentStringTable["stellar"].LocalizedValue; 
        bombText[5] = _currentStringTable["brilliant"].LocalizedValue; 
        bombText[6] = _currentStringTable["spectacular"].LocalizedValue; 
        bombText[7] = _currentStringTable["epic"].LocalizedValue; 
    }


    public void FindAllMatches() { 
        StartCoroutine(FindAllMatchesCo());  
    }

    private IEnumerator FindAllMatchesCo() {
        
        for (int i = 0; i < board.width; i++) {
            for (int j = 0; j < board.height; j++) {
                GameObject currentDot = board.allDots[i, j]; 
                if (board.allDots[i, j] != null) {
                    if (i > 0 && i < (board.width - 1)) {
                        GameObject leftDot = board.allDots[i - 1, j]; 
                        GameObject rightDot = board.allDots[i + 1, j]; 
                        if (leftDot != null && rightDot != null && leftDot != currentDot && rightDot != currentDot) {
                            if (leftDot.tag == currentDot.tag && rightDot.tag == currentDot.tag) {
                                // col/row bombs 
                                this.addRowMatches(currentDot.GetComponent<Dot>(), leftDot.GetComponent<Dot>(), rightDot.GetComponent<Dot>()); 
                                this.addColMatches(currentDot.GetComponent<Dot>(), leftDot.GetComponent<Dot>(), rightDot.GetComponent<Dot>()); 
                                // regular left/right matches
                                this.addMatches(currentDot, leftDot, rightDot); 
                                // adjacent bombs  
                                this.addAdjMatches(currentDot.GetComponent<Dot>(), leftDot.GetComponent<Dot>(), rightDot.GetComponent<Dot>()); 
                            }
                        }
                    }
                    if (j > 0 && j < board.height - 1) {
                        GameObject downDot = board.allDots[i, j - 1]; 
                        GameObject upDot = board.allDots[i, j + 1]; 
                        if (upDot != null && downDot != null && downDot != currentDot && upDot != currentDot) {
                            if (downDot.tag == currentDot.tag && upDot.tag == currentDot.tag) {
                                // col/row bombs
                                this.addRowMatches(currentDot.GetComponent<Dot>(), downDot.GetComponent<Dot>(), upDot.GetComponent<Dot>()); 
                                this.addColMatches(currentDot.GetComponent<Dot>(), downDot.GetComponent<Dot>(), upDot.GetComponent<Dot>()); 
                                // regular up/down matches
                                this.addMatches(currentDot, downDot, upDot); 
                                // adjacent bombs
                                this.addAdjMatches(currentDot.GetComponent<Dot>(), downDot.GetComponent<Dot>(), upDot.GetComponent<Dot>());
                            }
                        }
                    }
                }
            }
        }
        yield return new WaitForEndOfFrame(); 
    }

    // Adds match-3 to currentMatches
    private void addMatches(GameObject dot1, GameObject dot2, GameObject dot3) {
        if (!currentMatches.Contains(dot1)) {
            currentMatches.Add(dot1); 
        }
        if (!currentMatches.Contains(dot2)) {
            currentMatches.Add(dot2); 
        }
        if (!currentMatches.Contains(dot3)) {
            currentMatches.Add(dot3);
        }
        // update matched status 
        dot1.GetComponent<Dot>().isMatched = true;  
        dot2.GetComponent<Dot>().isMatched = true;  
        dot3.GetComponent<Dot>().isMatched = true; 
    }

    // Adds row matches to currentMatches
    private void addRowMatches(Dot dot1, Dot dot2, Dot dot3) {
        if (dot1.isRowBomb) {
            currentMatches.Union(getRowDots(dot1.y)); 
            board.BombDmgRow(dot1.y); 
        }
        if (dot2.isRowBomb) {
            currentMatches.Union(getRowDots(dot2.y)); 
            board.BombDmgRow(dot2.y); 
        }
        if (dot3.isRowBomb) {
            currentMatches.Union(getRowDots(dot3.y)); 
            board.BombDmgRow(dot3.y); 
        }
    }

    // Adds column matches to currentMatches
    private void addColMatches(Dot dot1, Dot dot2, Dot dot3) {
        if (dot1.isColBomb) {
            currentMatches.Union(getColDots(dot1.x)); 
            board.BombDmgCol(dot1.x); 
        }
        if (dot2.isColBomb) {
            currentMatches.Union(getColDots(dot2.x)); 
            board.BombDmgCol(dot2.x); 
        }
        if (dot3.isColBomb) {
            currentMatches.Union(getColDots(dot3.x)); 
            board.BombDmgCol(dot3.x); 
        }
    }

    // Adds adjacent matches to currentMatches 
    private void addAdjMatches(Dot dot1, Dot dot2, Dot dot3) {
        if (dot1.isAdjBomb) {
            currentMatches.Union(getAdjDots(dot1.x, dot1.y)); 
        }
        if (dot2.isAdjBomb) {
            currentMatches.Union(getAdjDots(dot2.x, dot2.y)); 
        }
        if (dot3.isAdjBomb) {
            currentMatches.Union(getAdjDots(dot3.x, dot3.y)); 
        }
    }

    // returns all dots in given column
    private List<GameObject> getColDots(int col) {
        List<GameObject> dots = new List<GameObject>(); 
        for (int i = 0; i < board.height; i++) {
            if (board.allDots[col, i] != null) {
                Dot dot = board.allDots[col, i].GetComponent<Dot>(); 
                if (dot.isRowBomb) {
                    dots.Union(getRowDots(i)); 
                }
                if (dot.isAdjBomb) {
                    dots.Union(getAdjDots(col, i)); 
                }
                dots.Add(board.allDots[col, i]);  
                dot.isMatched = true;  
            }
        }
        return dots; 
    }

    /// <summary>returns all dots in given row</summary>
    private List<GameObject> getRowDots(int row) {
        List<GameObject> dots = new List<GameObject>(); 
        for (int i = 0; i < board.width; i++) {
            if (board.allDots[i, row] != null) {
                Dot dot = board.allDots[i, row].GetComponent<Dot>();
                if (dot.isColBomb) {
                    dots.Union(getColDots(i)); 
                }
                if (dot.isAdjBomb) {
                    dots.Union(getAdjDots(i, row)); 
                }
                dots.Add(board.allDots[i, row]); 
                dot.isMatched = true;  
            }
        }
        return dots; 
    }

    /// <summary>returns all dots adjacent to given dot </summary>
    private List<GameObject> getAdjDots(int x, int y) {
        List<GameObject> dots = new List<GameObject>(); 
        for (int i = x - 1; i <= x + 1; i++) {
            // check if dot exists
            for (int j = y - 1; j <= y + 1; j++) {
                if (i >= 0 && i < board.width && j >= 0 && j < board.height) {
                    if (board.allDots[i, j] != null) {
                        Dot dot = board.allDots[i, j].GetComponent<Dot>(); 
                        if (dot.isColBomb && !dot.isMatched) {
                            dots.Union(getColDots(i)); 
                        }
                        if (dot.isRowBomb && !dot.isMatched) {
                            dots.Union(getRowDots(j)); 
                        }
                        dots.Add(board.allDots[i, j]); 
                        dot.isMatched = true; 
                    }
                }
            }
        }
        return dots; 
    }

    public void MatchColors(string color) {
        for (int i = 0; i < board.width; i++) {
            for (int j = 0; j < board.height; j++) {
                // Check if that piece exists 
                if (board.allDots[i, j] != null) {
                    // check tag on dot 
                    if (board.allDots[i, j].CompareTag(color)) {
                        board.allDots[i, j].GetComponent<Dot>().isMatched = true; 
                    } 
                }
            }
        }
    }

    /// <summary>returns true if there are 5 in a row or column, else false (like a T-shape or L-shape match)</summary>
    private int colRowMatch() {
        // Make a copy of currentMatches 
        List<GameObject> matchCopy = new List<GameObject>(); 
        Dot currentDot = board.currentDot; 
        // Make sure the copy contains the correct matches (current vs other Dot)
        if (currentDot.otherDot != null) {
            List<GameObject> thisMatches = new List<GameObject>(currentMatches.FindAll(x => x.tag == currentDot.tag));
            List<GameObject> otherMatches = new List<GameObject>(currentMatches.FindAll(x => x.tag == currentDot.otherDot.GetComponent<Dot>().tag));
            if (thisMatches.Count > otherMatches.Count) {
                // Debug.Log("Matches for currentDot"); 
                matchCopy = thisMatches; 
            }
            else if (otherMatches.Count > thisMatches.Count) {
                // Debug.Log("Matches for otherDot"); 
                matchCopy = otherMatches; 
            }
        }
        else {
            // Debug.Log("otherDot not found"); 
            matchCopy = new List<GameObject>(currentMatches.FindAll(x => x.tag == currentDot.tag)); 
        }

        // Cycle through all of matchCopy and decide if a bomb needs to be made 
        for (int i = 0; i < matchCopy.Count; i++) {
            // get this dot 
            Dot thisDot = matchCopy[i].GetComponent<Dot>(); 
            int col = thisDot.x;
            int row = thisDot.y; 
            int colMatch = 0; 
            int rowMatch = 0; 
            // cycle through rest of the dots 
            for (int j = 0; j < matchCopy.Count; j++) {
                // store other dot 
                Dot nextDot = matchCopy[j].GetComponent<Dot>(); 
                if (nextDot != thisDot) {
                    if (nextDot.x == col && thisDot.CompareTag(nextDot.tag)) {
                        colMatch++; 
                    }
                    if (nextDot.y == row && thisDot.CompareTag(nextDot.tag)) {
                        rowMatch++; 
                    }
                }
            } 

            if (colMatch == 4 || rowMatch == 4) {
                return 1; // color bomb
            }
            if (colMatch == 2 && rowMatch == 2) {
                return 2; // adjacent bomb
            }
            if (colMatch == 3 || rowMatch == 3) {
                return 3; // col or row bomb
            }
        }

        return 0; 
    }

    /// <summary>When bomb is needed, make a bomb here.</summary>
    public void makeBomb() {
        Dot currentDot = board.currentDot; 
        int matches = currentMatches.Count; 

        if (matches > 3) {
            // type of match
            int typeOfBomb = colRowMatch(); 
            if (typeOfBomb == 1) {
                // color bomb 
                if (currentDot != null) {
                    if (currentDot.isMatched) {
                        if (!currentDot.isColorBomb){
                            currentDot.isMatched = false; 
                            currentDot.makeColorBomb(); 
                            floatingTextMessage(); 
                            // Debug.Log("Color bomb generatd");
                        }
                    }
                    // then, is other dot matched?
                    else if (currentDot.otherDot != null) {
                        Dot otherDot = currentDot.otherDot.GetComponent<Dot>(); 
                        if (otherDot.isMatched) {
                            if (!otherDot.isColorBomb){
                                otherDot.isMatched = false; 
                                otherDot.makeColorBomb(); 
                                floatingTextMessage(); 
                                // Debug.Log("Color bomb generatd");
                            }
                        }
                    }
                }
            }
            else if (typeOfBomb == 2) {
                // adjacent bomb
                // is current dot matched? 
                if (currentDot != null) {
                    if (currentDot.isMatched) {
                        if (!currentDot.isAdjBomb){
                            currentDot.isMatched = false; 
                            currentDot.makeAdjBomb(); 
                            floatingTextMessage(); 
                            // Debug.Log("Adjacent bomb generatd");
                        }
                    }
                    // then, is other dot matched?
                    else if (currentDot.otherDot != null) {
                        Dot otherDot = currentDot.otherDot.GetComponent<Dot>(); 
                        if (otherDot.isMatched) {
                            if (!otherDot.isAdjBomb){
                                otherDot.isMatched = false; 
                                otherDot.makeAdjBomb(); 
                                floatingTextMessage(); 
                                // Debug.Log("Adjacent bomb generatd");
                            }
                        }
                    }
                }
            }
            else if (typeOfBomb == 3) {
                // row or col bomb
                int colRow = Random.Range(0, 100); 
                if (colRow < 50) {
                    // Make a row bomb
                    if (currentDot != null) {
                        if (currentDot.isMatched) {
                            if (!currentDot.isRowBomb && !currentDot.isColBomb){
                                currentDot.isMatched = false; 
                                currentDot.makeRowBomb(); 
                                floatingTextMessage(); 
                                // Debug.Log("Row bomb generatd");
                            }
                        }
                        // then, is other dot matched?
                        else if (currentDot.otherDot != null) {
                            Dot otherDot = currentDot.otherDot.GetComponent<Dot>(); 
                            if (otherDot.isMatched) {
                                if (!otherDot.isRowBomb && !otherDot.isColBomb){
                                    otherDot.isMatched = false; 
                                    otherDot.makeRowBomb(); 
                                    floatingTextMessage(); 
                                    // Debug.Log("Row bomb generatd");
                                }
                            }
                        }
                    }
                }
                else {
                    // Make a col bomb 
                    if (currentDot != null) {
                        if (currentDot.isMatched) {
                            if (!currentDot.isRowBomb && !currentDot.isColBomb){
                                currentDot.isMatched = false; 
                                currentDot.makeColBomb(); 
                                floatingTextMessage(); 
                                // Debug.Log("Column bomb generatd");
                            }
                        }
                        // then, is other dot matched?
                        else if (currentDot.otherDot != null) {
                            Dot otherDot = currentDot.otherDot.GetComponent<Dot>(); 
                            if (otherDot.isMatched) {
                                if (!otherDot.isRowBomb && !otherDot.isColBomb){
                                    otherDot.isMatched = false; 
                                    otherDot.makeColBomb(); 
                                    floatingTextMessage(); 
                                    // Debug.Log("Column bomb generatd");
                                }
                            }
                        }
                    }
                }
            }
        }
    }

    private void floatingTextMessage() {
        int message = Random.Range(0, bombText.Length); 
        floatingTextManager.Show(bombText[message] + "!", 25, Color.white, new Vector3(board.currentDot.gameObject.transform.position.x, board.currentDot.gameObject.transform.position.y, 0f), Vector3.up * 40f, 1f);
    }

    private bool ChekcForMatches() {
        for (int i = 0; i < board.width - 2; i++) {
            for (int j = 0; j < board.height - 2; j++) {
                if (board.allDots[i, j] != null) {
                    // grab this dot's tag 
                    string dotTag = board.allDots[i, j].tag; 
                    // check right and two to the right
                    if (board.allDots[i + 1, j] != null && board.allDots[i + 2, j] != null) {
                        if (board.allDots[i + 1, j].CompareTag(dotTag) && board.allDots[i + 2, j].CompareTag(dotTag)) {
                            return true; 
                        }
                    }
                    // check up and two to the up
                    if (board.allDots[i, j + 1] != null && board.allDots[i, j + 2] != null) {
                        if (board.allDots[i, j + 1].CompareTag(dotTag) && board.allDots[i, j + 2].CompareTag(dotTag)) {
                            return true; 
                        }
                    } 
                }
            }
        }
        return false; 
    }

    public bool SwitchAndCheck(int x, int y, Vector2 dir) {
        board.SwitchPieces(x, y, dir); 
        if (ChekcForMatches()) {
            board.SwitchPieces(x, y, dir); 
            return true; 
        }
        board.SwitchPieces(x, y, dir); 
        return false; 
    }

    /// <summary>finds all possible matches on board and returns one random one</summary>
    private List<GameObject> GetMatches() {
        // find all possible matches 
        List<GameObject> allMatches = new List<GameObject>();
        for (int i = 0; i < board.width - 2; i++) {
            for (int j = 0; j < board.height - 2; j++) {
                if (board.allDots[i, j] != null) {
                    if (SwitchAndCheck(i, j, Vector2.right)) {
                        // not deadlocked
                        allMatches.Add(board.allDots[i, j]); 
                    } 
                    if (SwitchAndCheck(i, j, Vector2.up)) {
                        // not deadlocked
                        allMatches.Add(board.allDots[i, j]); 
                    }
                }
            }
        }
        return allMatches; 
    }

    /// <summary>Picks a random match from a list of matches</summary>
    public GameObject RandomMatch() {
        List<GameObject> possibleMoves = this.GetMatches(); 
        if (possibleMoves.Count > 0) {
            int dotToUse = Random.Range(0, possibleMoves.Count); 
            return possibleMoves[dotToUse]; 
        }
        return null; 
    }
}
