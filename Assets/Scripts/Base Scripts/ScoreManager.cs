using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;
using UnityEngine.Localization;
using UnityEngine.Localization.Tables;

[System.Serializable]
public class BlankGoal
{
    [SerializeField] int _numNeeded;
    public int numNeeded { get { return _numNeeded; } set { _numNeeded = value; } }
    public int numCollected { get; set; }
    [SerializeField] GameObject goalObject;
    public Sprite sprite { get { return goalObject.GetComponent<SpriteRenderer>().sprite; } private set { sprite = value; } }
    public Color color { get { return goalObject.GetComponent<SpriteRenderer>().color; } private set { color = value; } }
    public string tag { get { return goalObject.tag; } private set { tag = value; } }
    public bool isComplete { get { return numCollected >= numNeeded; } private set { isComplete = value; } }
}

public enum GameType
{
    moves, time
}

[System.Serializable]
public class EndGameReqs
{
    [SerializeField] GameType _gameType;
    public GameType gameType { get { return _gameType; } private set { _gameType = value; } }
    [SerializeField] int _counter;
    public int counter { get { return _counter; } set { _counter = value; } }
}
public class ScoreManager : MonoBehaviour
{

    private Board board;
    private MenuController menuController;

    [Header("Score Manager")]
    [SerializeField] Text scoreText;
    [SerializeField] Image scoreBar;
    public int score { get; private set; }
    private int lastScore;
    private int scoreGoal;
    public int stars { get; private set; }

    [Header("Background Manager")]
    [SerializeField] Image background;
    public int bgTier { get; private set; }

    [Header("Goal Manager")]
    [SerializeField] int level;
    [SerializeField] Text levelText;
    [SerializeField] BlankGoal[] levelGoals;
    private List<GoalPanel> currentGoals;
    [SerializeField] GameObject goalPrefab;
    [SerializeField] GameObject goalStartParent;
    [SerializeField] GameObject goalGameParent;

    [Header("Endgame Manager")]
    [SerializeField] GameObject reqMoveText;
    [SerializeField] GameObject reqTimeText;
    [SerializeField] GameObject winPanel;
    [SerializeField] Text winScore;
    [SerializeField] Text winEndScore;
    [SerializeField] GameObject[] winStars;
    [SerializeField] GameObject losePanel;
    [SerializeField] Text loseScore;
    [SerializeField] Image reqBar;
    [SerializeField] Text counterText;
    public EndGameReqs reqs { get; private set; }
    private int counter;
    private float timer;

    [Header("Localization")]
    [SerializeField] private LocalizedStringTable _localizedStringTable;
    private StringTable _currentStringTable;
    private string lvlLabel;
    private string scoreLabel;

    // Start is called before the first frame update
    void Start()
    {
        board = GameObject.FindWithTag("board").GetComponent<Board>();
        menuController = board.gameObject.GetComponent<MenuController>();
        level = PlayerPrefs.GetInt("CurrentLevel", 0) + 1;
        currentGoals = new List<GoalPanel>();
        score = 0;
        stars = 0;

        for (int i = 0; i < winStars.Length; i++)
        {
            winStars[i].SetActive(false);
        }

        // background.color = GameColors.bgColors[0]; 
        // bgTier = 0; 

        Level myLvl = board.getLvl();
        if (myLvl != null)
        {
            // score
            scoreGoal = myLvl.scoreGoal;
/*            background.color = myLvl.backgroundColor;
*/            // goals 
            levelGoals = myLvl.levelGoals;
            this.clearLevelGoals();
            // endgame 
            reqs = myLvl.reqs;
        }

        StartCoroutine(SetUpCo());
    }

    private IEnumerator SetUpCo()
    {
        var tableLoading = _localizedStringTable.GetTable();

        yield return tableLoading;

        _currentStringTable = tableLoading;

        lvlLabel = _currentStringTable["level_:"].LocalizedValue;
        scoreLabel = _currentStringTable["score"].LocalizedValue;

        SetUpGoals();
        SetUpReqs();
    }

    // Update is called once per frame
    void Update()
    {
        if (reqs.gameType == GameType.time && counter > 0)
        {
            timer -= Time.deltaTime;
            if (timer <= 0)
            {
                DecreaseCounter();
                timer = 1;
            }
        }
    }

    /// <summary>Increases score by given amount <paramref name="amt"/></summary>
    public void IncreaseScore(int amt)
    {

        score += amt;
        // for(int i = 0; i < scoreGoal; i++) {
        //     if (score > board.balance * i && stars < i + 1) {
        //         stars++; 
        //     }
        // }

        UpdateScore();
        // ChangeBackgroundColor(); 

    }

    private void SetUpGoals()
    {
        levelText.text = lvlLabel + " " + level;

        for (int i = 0; i < levelGoals.Length; i++)
        {
            // create a new goal panel at the goalIntroParent position 
            GameObject startGoal = Instantiate(goalPrefab, goalStartParent.transform);
            startGoal.transform.SetParent(goalStartParent.transform);

            // create a new goal panel at the goalGameParent position
            GameObject gameGoal = Instantiate(goalPrefab, goalGameParent.transform);
            gameGoal.transform.SetParent(goalGameParent.transform);

            // set the image and text of the goal 
            GoalPanel startPanel = startGoal.GetComponent<GoalPanel>();
            startPanel.sprite = levelGoals[i].sprite;
            startPanel.color = levelGoals[i].color;
            startPanel.text = levelGoals[i].numCollected.ToString() + "/" + levelGoals[i].numNeeded;

            GoalPanel gamePanel = gameGoal.GetComponent<GoalPanel>();
            gamePanel.sprite = levelGoals[i].sprite;
            gamePanel.color = levelGoals[i].color;
            gamePanel.text = levelGoals[i].numCollected.ToString() + "/" + levelGoals[i].numNeeded;

            // add this goal to list of current goals
            currentGoals.Add(gamePanel);
        }
    }

    public void UpdateGoals()
    {
        int goalsCompleted = 0;
        for (int i = 0; i < levelGoals.Length; i++)
        {
            currentGoals[i].text = levelGoals[i].numCollected.ToString() + "/" + levelGoals[i].numNeeded;
            if (levelGoals[i].isComplete)
            {
                goalsCompleted++;
                currentGoals[i].text = levelGoals[i].numNeeded.ToString() + "/" + levelGoals[i].numNeeded;
            }
        }

        if (goalsCompleted >= levelGoals.Length)
        {
            if (menuController != null)
            {
                // Debug.Log("You win!"); 
                WinGame();
            }
        }
    }

    public void compareGoal(string goal)
    {
        for (int i = 0; i < levelGoals.Length; i++)
        {
            if (goal == levelGoals[i].tag)
            {
                levelGoals[i].numCollected++;
            }
        }
    }

    private void SetUpReqs()
    {
        counter = reqs.counter;
        if (reqs.gameType == GameType.moves)
        {
            reqMoveText.SetActive(true);
            reqTimeText.SetActive(false);
        }
        else if (reqs.gameType == GameType.time)
        {
            reqMoveText.SetActive(false);
            reqTimeText.SetActive(true);
            timer = 1;
        }
        else
        {

        }
        counterText.text = counter.ToString();
        winPanel.SetActive(false);
        losePanel.SetActive(false);
    }

    public void DecreaseCounter()
    {

        if (board.currentState != GameState.pause)
        {
            counter--;
            counterText.text = counter.ToString();
        }

        if (reqBar != null)
        {
            reqBar.fillAmount = (float)counter / (float)reqs.counter;
        }

        if (counter <= 0)
        {
            // Debug.Log("You lose :("); 
            LoseGame();
        }
    }

    public void WinGame()
    {
        board.currentState = GameState.win;
        losePanel.SetActive(false);
        winPanel.SetActive(true);
        winScore.text = score.ToString();
        winEndScore.text = score.ToString();
        setStars();
        menuController.winGame();
    }

    public void LoseGame()
    {
        board.currentState = GameState.lose;
        losePanel.SetActive(true);
        winPanel.SetActive(false);
        counter = 0;
        counterText.text = counter.ToString();
        loseScore.text = score.ToString();
        menuController.loseGame();
    }

    private void UpdateScore()
    {
        if (board != null && scoreBar != null)
        {
            scoreText.text = scoreLabel + " " + score;
            scoreBar.fillAmount = (float)score / (float)(board.balance * scoreGoal);
        }
    }

    private void setStars()
    {
        float weight = board.balance * scoreGoal;
        if (score > (int)(weight))
        {
            stars = 3;
        }
        else if (score > (int)(weight / 3))
        {
            stars = 2;
        }
        else if (score > (int)(weight / 4))
        {
            stars = 1;
        }
        else
        {
            stars = 0;
        }

        for (int i = 0; i < stars; i++)
        {
            winStars[i].SetActive(true);
        }
    }

    /// <summary>Checks for score and changes background color </summary>
    private void ChangeBackgroundColor()
    {
        if (score > board.balance * scoreGoal && bgTier < 5)
        {
            ChangeBackgroundColor(5);
        }
        else if (score > board.balance * scoreGoal / .8 && bgTier < 4)
        {
            ChangeBackgroundColor(4);
        }
        else if (score > board.balance * scoreGoal / .6 && bgTier < 3)
        {
            ChangeBackgroundColor(3);
        }
        else if (score > board.balance * scoreGoal / .4 && bgTier < 2)
        {
            ChangeBackgroundColor(2);
        }
        else if (score > board.balance * scoreGoal / .2 && bgTier < 1)
        {
            ChangeBackgroundColor(1);
        }
    }

    /// <summary>Changes the background color to match the current tier</summary>
    private void ChangeBackgroundColor(int tier)
    {
        if (tier > 0 && tier < (GameColors.bgColors.Length) && bgTier != tier)
        {
            background.color = GameColors.bgColors[tier];
            bgTier = tier;
            // Debug.Log("Background tier increased to " + tier); 
        }
    }

    /// <summary>clear score </summary>
    public void clearScore()
    {
        score = 0;
    }

    public void clearLevelGoals()
    {
        foreach (BlankGoal goal in levelGoals)
        {
            goal.numCollected = 0;
        }
    }
}
