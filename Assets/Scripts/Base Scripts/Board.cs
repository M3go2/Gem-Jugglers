using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI; 

public enum GameState {
    wait, move, win, lose, pause
}

public enum TileType {
    breakable, blank, locked, blocking, cancer, normal 
    // jelly, blank, licorice, icing, chocolate, background
}

[System.Serializable]
public class Tile { 
    [SerializeField] int _x; 
    public int x { get { return _x; } set { _x = value; } }
    [SerializeField] int _y; 
    public int y { get { return _y; } set { _y = value; } }
    [SerializeField] TileType _tile;
    public TileType tile { get { return _tile; } set { _tile = value; } }
}

public class Board : MonoBehaviour {

    [Header("World")]
    [SerializeField] internal World world; 
    [SerializeField] int lvl; 

    [Header("Board properites")]
    public GameState currentState = GameState.pause; 
    [SerializeField] int _width = 7; 
    public int width { get { return _width; } private set { _width = value; } }
    [SerializeField] int _height = 10;  
    public int height { get { return _height; } private set { _height = value; } }
    [SerializeField] int offset = 20; 
    public int eyeRatio { get; private set; } = 0;
    public int balance { get; private set; } = 500; // controls the pace at which the game moves

    private BackgroundTile[,] allTiles; 
    [SerializeField] GameObject[,] _allDots; 
    public GameObject[,] allDots { get { return _allDots; } private set { _allDots = value; } } 
    internal FindMatches findMatches { get; private set; }
    internal ScoreManager scoreManager { get; private set; } 
    internal SoundManager soundManager { get; private set; } 
    internal FloatingTextManager floatingTextManager { get; private set; }
    private int streakValue = 1; 
    private bool cancerDmg = false; 

    [Header("Board components")]
    [SerializeField] Dot _currentDot; 
    public Dot currentDot { get { return _currentDot; } set { _currentDot = value; } }
    [SerializeField] Image moveIndicatorImage;  
    [SerializeField] Tile[] boardLayout; 
    public BackgroundTile[,] breakableTiles { get; private set; }
    public bool[,] blankSpaces { get; private set; }
    public BackgroundTile[,] lockedTiles { get; private set; } 
    public BackgroundTile[,] blockingTiles { get; private set; }
    public BackgroundTile[,] cancerTiles { get; private set; }

    [Header("Component prefabs")]
    [SerializeField] GameObject tilePrefab; 
    [SerializeField] GameObject breakableTilePrefab; 
    [SerializeField] GameObject lockedTilePrefab; 
    [SerializeField] GameObject blockingTilePrefab; 
    [SerializeField] GameObject cancerTilePrefab; 
    [SerializeField] GameObject destroyEffect; 
    [SerializeField] float particleLifetime = 0.5f; 
    private float refillDelay = 0.5f; 

    [Header("Dot types")]
    [SerializeField] GameObject[] _dots; 
    public GameObject[] dots { get { return _dots; } private set { _dots = value; } }
    [SerializeField] GameObject[] _eyes; 
    public GameObject[] eyes { get {return _eyes; } private set { _eyes = value; } }

    // Awake. It's probably before start, right? 
    private void Awake() {
        lvl = PlayerPrefs.GetInt("CurrentLevel", 0); 
        if (world != null) {
            if (world.levels[lvl] != null) {
                Level myLvl = world.levels[lvl]; 
                width = myLvl.width; 
                height = myLvl.height; 
                boardLayout = myLvl.boardLayout; 
                dots = myLvl.dots; 
                eyes = myLvl.eyes; 
                balance = myLvl.balance; 
            }
        }
    }

    // Start is called before the first frame update
    void Start() {

        // initialize arrays
        allTiles = new BackgroundTile[width, height]; 
        allDots = new GameObject[width, height]; 
        breakableTiles = new BackgroundTile[width, height]; 
        blankSpaces = new bool[width, height]; 
        lockedTiles = new BackgroundTile[width, height]; 
        blockingTiles = new BackgroundTile[width, height]; 
        cancerTiles = new BackgroundTile[width, height]; 

        // child and peer objects
        findMatches = gameObject.GetComponent<FindMatches>(); 
        scoreManager = gameObject.GetComponent<ScoreManager>(); 
        soundManager = FindObjectOfType<SoundManager>(); 
        floatingTextManager = FindObjectOfType<FloatingTextManager>(); 

        GameData data = FindObjectOfType<GameData>(); 
        if (data != null && data.saveData.summon) {
            eyeRatio = world.levels[lvl].eyeRatio; 
        }

        SetUp(); 

        currentState = GameState.pause; 
    }

    /// <summary>Creates board, tiles, and dots on board </summary>
    private void SetUp() {

        // place blank tiles
        GenerateBlankTiles(); 
        // place blocking tiles
        GenerateBlockingTiles(); 
        // place cancer tiles 
        GenerateCancerTiles(); 

        // set up board
        for (int i = 0; i < width; i++) {
            for (int j = 0; j < height; j++) {
                if (!nullSpace(i, j)) {
                    Vector2 tempPos = new Vector2(i, j); 
                    // create a backgroundTile
                    GameObject backgroundTile = Instantiate(tilePrefab, tempPos, Quaternion.identity); 
                    backgroundTile.transform.parent = this.transform; 
                    backgroundTile.name = "tile (" + i + ", " + j + ")"; 

                    // create a dot, pick a random type, check for matches, and add it to the array 
                    tempPos = new Vector2(i, j + offset); 
                    int dotToUse = Random.Range(0, dots.Length);
                    int maxIterations = 0; 
                    while(MatchesAt(i, j, dots[dotToUse]) && maxIterations < 100) {
                        dotToUse = Random.Range(0, dots.Length);
                        maxIterations++; 
                    }
                    maxIterations = 0; 

                    GameObject dotObj = Instantiate(dots[dotToUse], tempPos, Quaternion.identity);
                    Dot dot = dotObj.GetComponent<Dot>(); 
                    dot.x = i; 
                    dot.y = j; 
                    dot.updatePrevXY(); 
                    dotObj.transform.parent = this.transform; 
                    //dot.name = "dot (" + i + ", " + j + ")";
                    allDots[i, j] = dotObj;
                } 
            }
        }

        // place breakable background tiles
        GenerateBreakableTiles(); 
        // place locked tiles 
        GenerateLockedTiles(); 
    }

    void Update() {
        if (Input.GetKeyDown("s")) {
            ShuffleBoard(); 
            // Debug.Log("s"); 
        }

     /*   if (currentState == GameState.move) {
            moveIndicatorImage.color = GameColors.moveColors[0]; 
        }
        else if(currentState == GameState.wait) {
            moveIndicatorImage.color = GameColors.moveColors[1]; 
        }
        else {
            moveIndicatorImage.color = GameColors.moveColors[2];
        }*/
    }

    /// <summary>Generates a breakable tile at all positions marked breakable</summary>
    private void GenerateBreakableTiles() {
        // look at all tiles in layout
        for (int i = 0; i < boardLayout.Length; i++) {
            // if tile is breakable
            if (boardLayout[i].tile == TileType.breakable) {
                // create breakable tile at that position 
                Vector2 tempPos = new Vector2(boardLayout[i].x, boardLayout[i].y); 
                GameObject tile = Instantiate(breakableTilePrefab, tempPos, Quaternion.identity);
                breakableTiles[boardLayout[i].x, boardLayout[i].y] = tile.GetComponent<BackgroundTile>(); 
                tile.transform.parent = this.transform; 
            }
        }
    }

    private void GenerateBlankTiles() {
        // look at all tiles in layout
        for (int i = 0; i < boardLayout.Length; i++) {
            // if tile is blank
            if (boardLayout[i].tile == TileType.blank) {
                // generate blank tile
                blankSpaces[boardLayout[i].x, boardLayout[i].y] = true; 
            }
        }
    }

    private void GenerateLockedTiles() {
        // look at all tiles in layout 
        for (int i = 0; i < boardLayout.Length; i++) {
            // if tile is locked 
            if (boardLayout[i].tile == TileType.locked) {
                // create locked tile at that position 
                Vector2 tempPos = new Vector2(boardLayout[i].x, boardLayout[i].y); 
                GameObject tile = Instantiate(lockedTilePrefab, tempPos, Quaternion.identity);
                lockedTiles[boardLayout[i].x, boardLayout[i].y] = tile.GetComponent<BackgroundTile>(); 
                tile.transform.parent = this.transform; 
            }
        }
    }

    private void GenerateBlockingTiles() {
        // look at all tiles in layout 
        for (int i = 0; i < boardLayout.Length; i++) {
            // if tile is blocking 
            if (boardLayout[i].tile == TileType.blocking) {
                // create locked tile at that position 
                Vector2 tempPos = new Vector2(boardLayout[i].x, boardLayout[i].y); 
                GameObject tile = Instantiate(blockingTilePrefab, tempPos, Quaternion.identity);
                blockingTiles[boardLayout[i].x, boardLayout[i].y] = tile.GetComponent<BackgroundTile>(); 
                tile.transform.parent = this.transform; 
            }
        }
    }

    private void GenerateCancerTiles() {
        // look at all tiles in layout 
        for (int i = 0; i < boardLayout.Length; i++) {
            // if tile is cancer 
            if (boardLayout[i].tile == TileType.cancer) {
                // create locked tile at that position 
                Vector2 tempPos = new Vector2(boardLayout[i].x, boardLayout[i].y); 
                GameObject tile = Instantiate(cancerTilePrefab, tempPos, Quaternion.identity);
                cancerTiles[boardLayout[i].x, boardLayout[i].y] = tile.GetComponent<BackgroundTile>(); 
                tile.transform.parent = this.transform; 
            }
        }
    }

    /// <summary>Returns true if adding this dot in this position would generate a match</summary>
    private bool MatchesAt(int x, int y, GameObject dot) {
        if (x > 1 && y > 1) {
            if (allDots[x - 1, y] != null && allDots[x - 2, y] != null){
                if (allDots[x - 1, y].tag == dot.tag && allDots[x - 2, y].tag == dot.tag) {
                return true; 
                }
            }
            if (allDots[x, y - 1] != null && allDots[x, y - 2] != null) {
                if (allDots[x, y - 1].tag == dot.tag && allDots[x, y - 2].tag == dot.tag) {
                    return true; 
                } 
            }
        }
        else if (x <= 1 || y <= 1) {
            if (y > 1) {
                if (allDots[x, y - 1] != null && allDots[x, y - 2] != null) {
                    if (allDots[x, y - 1].tag == dot.tag && allDots[x, y - 2].tag == dot.tag) {
                        return true; 
                    }
                }
            }
            else if (x > 1) {
                if (allDots[x - 1, y] != null && allDots[x - 2, y] != null) {
                    if (allDots[x - 1, y].tag == dot.tag && allDots[x - 2, y].tag == dot.tag) {
                        return true; 
                    }
                }
            }
        }
        return false; 
    }

    /// <summary>Checks findMatches for bomb-making, adds score, breaks breakable tiles, then destroys matched dot</summary>
    private void DestroyMatchesAt(int x, int y) {
        Dot dot = allDots[x, y].GetComponent<Dot>(); 
        if (dot.isMatched) {

            // checks if a tile needs to be broken, then breaks it
            if (breakableTiles[x, y] != null) {
                breakableTiles[x, y].TakeDmg(1); 
                if (breakableTiles[x, y].hp <= 0) {
                    if (scoreManager != null) {
                        scoreManager.IncreaseScore(breakableTiles[x, y].points * streakValue); 
                    }
                   breakableTiles[x, y] = null; 
                }
            }

            // checks if a tile needs to be unlocked, then unlocks it
            if (lockedTiles[x, y] != null) {
                lockedTiles[x, y].TakeDmg(1); 
                if (lockedTiles[x, y].hp <= 0) {
                    if (scoreManager != null) {
                        scoreManager.IncreaseScore(lockedTiles[x, y].points * streakValue); 
                    }
                    lockedTiles[x, y] = null; 
                }
            }

            // checks if an adjacent tile needs to be broken, then breaks it 
            DamageBlocking(x, y); 
            DamageCancer(x, y); 

            if (scoreManager != null) {
                // add the broken dot to the score 
                scoreManager.IncreaseScore(dot.points * streakValue); 
                scoreManager.compareGoal(allDots[x, y].tag); 
                scoreManager.UpdateGoals(); 
            }

            // does sound manager exist? 
            if (soundManager != null) {
                soundManager.PlayDestroyNoise(); 
            }
            // create a dot destroy particle then destroy the dot
            GameObject particle = Instantiate(destroyEffect, allDots[x, y].transform.position, Quaternion.identity);
            Destroy(particle, particleLifetime); 
            if (allDots[x, y] != null) {
                Destroy(allDots[x, y]); 
            }
            allDots[x, y] = null; 
        }
    }

    /// <summary>Streamline tile damage script? Might have some dangling reference issues with tile arrays</summary>
    private void DamageTile(BackgroundTile tile) {
        tile.TakeDmg(1); 
        if (tile.hp <= 0) {
            if (scoreManager != null) {
                scoreManager.IncreaseScore(tile.points * streakValue); 
            }
            tile = null; 
        }
    }

    private void DamageBlocking(int x, int y) {
        if (x > 0) {
            if (blockingTiles[x - 1, y]) {
                blockingTiles[x - 1, y].TakeDmg(1); 
                if (blockingTiles[x - 1, y].hp <= 0) {
                    if (scoreManager != null) {
                        scoreManager.IncreaseScore(blockingTiles[x - 1, y].points * streakValue); 
                    }
                    blockingTiles[x - 1, y] = null; 
                }
            }
        }
        if (x < width - 1) {
            if (blockingTiles[x + 1, y]) {
                blockingTiles[x + 1, y].TakeDmg(1); 
                if (blockingTiles[x + 1, y].hp <= 0) {
                    if (scoreManager != null) {
                        scoreManager.IncreaseScore(blockingTiles[x + 1, y].points * streakValue); 
                    }
                    blockingTiles[x + 1, y] = null; 
                }
            }
        }
        if (y > 0) {
            if (blockingTiles[x, y - 1]) {
                blockingTiles[x, y - 1].TakeDmg(1); 
                if (blockingTiles[x, y - 1].hp <= 0) {
                    if (scoreManager != null) {
                        scoreManager.IncreaseScore(blockingTiles[x, y - 1].points * streakValue); 
                    }
                    blockingTiles[x, y - 1] = null; 
                }
            }
        }
        if (y < height - 1) {
            if (blockingTiles[x, y + 1]) {
                blockingTiles[x, y + 1].TakeDmg(1); 
                if (blockingTiles[x, y + 1].hp <= 0) {
                    if (scoreManager != null) {
                        scoreManager.IncreaseScore(blockingTiles[x, y + 1].points * streakValue); 
                    }
                    blockingTiles[x, y + 1] = null; 
                }
            }
        }
    }

    private void DamageCancer(int x, int y) {
        if (x > 0) {
            if (cancerTiles[x - 1, y]) {
                cancerTiles[x - 1, y].TakeDmg(1); 
                if (cancerTiles[x - 1, y].hp <= 0) {
                    if (scoreManager != null) {
                        scoreManager.IncreaseScore(cancerTiles[x - 1, y].points * streakValue); 
                    }
                    cancerTiles[x - 1, y] = null; 
                    cancerDmg = true; 
                }
            }
        }
        if (x < width - 1) {
            if (cancerTiles[x + 1, y]) {
                cancerTiles[x + 1, y].TakeDmg(1); 
                if (cancerTiles[x + 1, y].hp <= 0) {
                    if (scoreManager != null) {
                        scoreManager.IncreaseScore(cancerTiles[x + 1, y].points * streakValue); 
                    }
                    cancerTiles[x + 1, y] = null; 
                    cancerDmg = true; 
                }
            }
        }
        if (y > 0) {
            if (cancerTiles[x, y - 1]) {
                cancerTiles[x, y - 1].TakeDmg(1); 
                if (cancerTiles[x, y - 1].hp <= 0) {
                    if (scoreManager != null) {
                        scoreManager.IncreaseScore(cancerTiles[x, y - 1].points * streakValue); 
                    }
                    cancerTiles[x, y - 1] = null; 
                    cancerDmg = true; 
                }
            }
        }
        if (y < height - 1) {
            if (cancerTiles[x, y + 1]) {
                cancerTiles[x, y + 1].TakeDmg(1); 
                if (cancerTiles[x, y + 1].hp <= 0) {
                    if (scoreManager != null) {
                        scoreManager.IncreaseScore(cancerTiles[x, y + 1].points * streakValue); 
                    }
                    cancerTiles[x, y + 1] = null; 
                    cancerDmg = true; 
                }
            }
        }
    }

    /// <summary>Loops through the entire board and destroys matches</summary>
    public void DestroyMatches() {
        if (currentDot != null) {
            findMatches.makeBomb(); 
        }

        findMatches.currentMatches.Clear();
        for (int i = 0; i < width; i++) {
            for (int j = 0; j < height; j++) {
                if (allDots[i, j] != null) {
                    DestroyMatchesAt(i, j); 
                }
            }
        }
        StartCoroutine(DecreaseRowCo()); 
    }

    /// <summary>Makes dots fall when the dot under them is null</summary>
    private IEnumerator DecreaseRowCo() {
        for (int i = 0; i < width; i ++) {
            for (int j = 0; j < height; j ++) {
                //if the current spot isn't blank and is empty. . . 
                if(allDots[i,j] == null && !nullSpace(i, j)) {
                    //loop from the space above to the top of the column
                    for (int k = j + 1; k < height; k++) {
                        //if a dot is found. . .
                        if(allDots[i, k] != null) {
                            //move that dot to this empty space
                            allDots[i, k].GetComponent<Dot>().y = j;
                            //set that spot to be null
                            allDots[i, k] = null;
                            //break out of the loop;
                            break;
                        }
                    }
                }
            }
        }
		yield return new WaitForSeconds(refillDelay * 0.5f);
		StartCoroutine(FillBoardCo());
	}

    /// <summary>Refills dots from the top of the board</summary>
    private void RefillBoard() {
        for (int i = 0; i < width; i++) {
            for (int j = 0; j < height; j++) {
                if (allDots[i, j] == null && !nullSpace(i, j)) {
                    Vector2 tempPos = new Vector2(i, j + offset); 
                    int dice = Random.Range(0, 100); 
                    int dotToUse = Random.Range(0, dots.Length); 
                    GameObject chosen = null; 
                    if (dice >= eyeRatio) {
                        chosen = dots[dotToUse]; 
                    }
                    else {
                        chosen = eyes[dotToUse]; 
                    }
                    GameObject dot = Instantiate(chosen, tempPos, Quaternion.identity); 
                    dot.transform.parent = this.transform; 
                    allDots[i, j] = dot; 
                    dot.GetComponent<Dot>().x = i; 
                    dot.GetComponent<Dot>().y = j; 
                    dot.GetComponent<Dot>().updatePrevXY(); 
                }
            }
        }
    }

    /// <summary>Loops through board and determine if there are still matches on board</summary>
    private bool MatchesOnBoard() {
        for (int i = 0; i < width; i++) {
            for (int j = 0; j < height; j++) {
                if (allDots[i, j] != null) {
                    if (allDots[i, j].GetComponent<Dot>().isMatched) {
                        return true; 
                    }
                }
            }
        }
        return false; 
    }

    /// <summary>If there are still matches on the board, destroy them</summary>
    private IEnumerator FillBoardCo() {
        RefillBoard(); 
        yield return new WaitForSeconds(refillDelay * 0.5f); 

        while(MatchesOnBoard()) {
            streakValue++; 
            DestroyMatches(); 
            yield return new WaitForSeconds(refillDelay); 
        }
        findMatches.currentMatches.Clear(); 
        currentDot = null; 

        SpawnCancerTiles(); 

        if (isDeadLocked()) {
            Debug.Log("Deadlocked!"); 
            ShuffleBoard(); 
        }

        yield return new WaitForSeconds(refillDelay); 
        cancerDmg = false; 

        if (currentState == GameState.wait) {
            currentState = GameState.move; 
        }
        streakValue = 1; 
    }

    public void SwitchPieces(int x, int y, Vector2 dir) {
        // take other piece and save it in holder 
        GameObject holder = allDots[x + (int)dir.x, y + (int)dir.y] as GameObject; 
        if (holder != null) {
            allDots[x + (int)dir.x, y + (int)dir.y] = allDots[x, y];
            allDots[x, y] = holder; 
        }
    }

    private bool isDeadLocked() {
        for (int i = 0; i < width - 2; i++) {
            for (int j = 0; j < height - 2; j++) {
                if (allDots[i, j] != null) {
                    if (findMatches.SwitchAndCheck(i, j, Vector2.right)) {
                        // not deadlocked
                        return false; 
                    } 
                    if (findMatches.SwitchAndCheck(i, j, Vector2.up)) {
                        // not deadlocked
                        return false; 
                    }
                }
            }
        }
        // is deadlocked
        return true; 
    }

    public void BombDmgRow(int row) {
        for (int i = 0; i < width; i++) {
            if (blockingTiles[i, row] != null) {
                blockingTiles[i, row].TakeDmg(1);
                if (blockingTiles[i, row].hp <= 0) {
                    blockingTiles[i, row] = null; 
                }
            }
        }
    }

    public void BombDmgCol(int col) {
        for (int j = 0; j < height; j++) {
            if (blockingTiles[col, j] != null) {
                blockingTiles[col, j].TakeDmg(1); 
                if (blockingTiles[col, j].hp <= 0) {
                    blockingTiles[col, j] = null; 
                }
            }
        }
    }

    /// <summary>Records every piece on the board, randomly suffles them, and then, if deadlocked, calls ShuffleBoard() again.</summary>
    private IEnumerator ShuffleBoardCo() {
        // Create a list of dots on the board 
        List<GameObject> newBoard = new List<GameObject>(); 
        yield return new WaitForSeconds(refillDelay); 

        // Add every piece to this list 
        for (int i = 0; i < width; i++) {
            for (int j = 0; j < height; j++) {
                if (allDots[i, j] != null) {
                    newBoard.Add(allDots[i, j]); 
                }
            }
        }

        yield return new WaitForSeconds(refillDelay);

        //for ever spot on the board . . . 
        for (int k = 0; k < width; k++) {
            for (int l = 0; l < height; l++) {
                if (!nullSpace(k, l)) {
                    // pick random number (dot)
                    int dotToUse = Random.Range(0, newBoard.Count); 
                    // Make sure using this dot here doesn't create a match 
                    int maxIterations = 0; 
                    while(MatchesAt(k, l, newBoard[dotToUse]) && maxIterations < 100) {
                        dotToUse = Random.Range(0, newBoard.Count);
                        maxIterations++; 
                    }
                    maxIterations = 0; 
                    // assign new x and y for dot
                    newBoard[dotToUse].GetComponent<Dot>().x = k; 
                    newBoard[dotToUse].GetComponent<Dot>().y = l; 
                    // put new dot on its place on the board
                    allDots[k, l] = newBoard[dotToUse]; 
                    // remove dot from pool of unassigned dots
                    newBoard.Remove(newBoard[dotToUse]); 
                }
            }
        }

        // check for deadlock 
        if (isDeadLocked()) {
            ShuffleBoard(); 
        }
    }

    private void SpawnCancerTiles() {
        for (int i = 0; i < width; i++) {
            for (int j = 0; j < height; j++) {
                if (cancerTiles[i, j] && !cancerDmg) {
                    Debug.Log("Spawn cancer tile");
                    SpawnCancerTile(); 
                    return; 
                }
            }
        }
    }

    private Vector2 CancerAdjacent(int x, int y) {
        // have a dot to the right, return right direction
        if (x < width - 1 && allDots[x + 1, y]) {
            return Vector2.right; 
        }
        // have a dot to the left, return left direction
        if (x > 0 && allDots[x - 1, y]) {
            return Vector2.left; 
        }
        if (y < height - 1 && allDots[x, y + 1]) {
            return Vector2.up; 
        }
        if (y > 0 && allDots[x, y - 1]) {
            return Vector2.down; 
        }

        return Vector2.zero; 
    }

    private void SpawnCancerTile() {
        bool cancer = false; 
        int loops = 0; 

        while (!cancer && loops < (width * height)) {
            // choose a random spot on the board
            int newX = Random.Range(0, width); 
            int newY = Random.Range(0, height); 
            // if a cancer piece exists at this spot, try to spawn a new one
            if (cancerTiles[newX, newY]) {
                Vector2 adj = CancerAdjacent(newX, newY); 
                if (adj != Vector2.zero) {
                    // Destroy the dot at chosen position
                    Destroy(allDots[newX + (int)adj.x, newY + (int)adj.y]); 
                    Vector2 tempPos = new Vector2(newX + adj.x, newY + adj.y); 
                    GameObject tile = Instantiate(cancerTilePrefab, tempPos, Quaternion.identity); 
                    tile.transform.parent = this.transform; 
                    cancerTiles[(int)tempPos.x, (int)tempPos.y] = tile.GetComponent<BackgroundTile>(); 
                    cancer = true; 
                }
            }
            loops++; 
        }
    }

    private IEnumerator WaitForSecondsCo() {
        yield return new WaitForSeconds(refillDelay); 
    }

    public Level getLvl() {
        if (lvl >= 0 && lvl < world.levels.Length) {
            return world.levels[lvl]; 
        }
        else {
            return null; 
        }
    }

    public void ShuffleBoard() {
        StartCoroutine(ShuffleBoardCo()); 
    }

    public bool nullSpace(int i, int j) {
        if (blankSpaces[i, j] || blockingTiles[i, j] || cancerTiles[i, j]) {
            return true; 
        }
        else {
            return false; 
        }
    }

    public bool nullSpace(Dot dot) {
        return nullSpace(dot.x, dot.y); 
    }
}