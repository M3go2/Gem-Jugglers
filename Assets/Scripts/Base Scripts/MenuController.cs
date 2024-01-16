using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.SceneManagement;

public class MenuController : MonoBehaviour
{

    private Board board;
    private GameData gameData;
    [SerializeField] string sceneToLoad;
    private int lvl;

    [Header("Animators")]
    [SerializeField] private GameObject menu;
    [SerializeField] protected Animator startAnim;
    [SerializeField] protected Animator endAnim;
    [SerializeField] protected Animator winAnim;

    protected void Start()
    {
        board = GameObject.FindWithTag("board").GetComponent<Board>();
        gameData = FindObjectOfType<GameData>();
        lvl = PlayerPrefs.GetInt("CurrentLevel", 0);
        if (menu != null)
        {
            menu.SetActive(true);
        }
    }

    /// <summary>button to start the current game</summary>
    public void buttonOK()
    {
        if (startAnim != null)
        {
            startAnim.SetBool("show", true);
        }

        StartCoroutine(GameStartCo());
    }

    private IEnumerator GameStartCo()
    {
        yield return new WaitForSeconds(1f);
        board.currentState = GameState.move;
    }

    /// <summary>called to generate new game menus</summary>
    public void toSplashWin()
    {
        SceneManager.LoadScene(sceneToLoad);
    }

    public void toSplashLose()
    {
        if (gameData != null)
        {
            SaveData thisLevel = gameData.saveData;
            if (board.scoreManager.score > thisLevel.highScores[lvl])
            {
                thisLevel.highScores[lvl] = board.scoreManager.score;
            }
        }
        SceneManager.LoadScene(sceneToLoad);
    }

    /// <summary>called when game ends</summary>
    /** 
     * Game manager handles level selection 
     * If board.lvl == gameManager.lvls.Length - 1
     * then this is the last level, use end win screen 
     * else this is a normal level, use win screen
     */
    public void winGame()
    {
        if (gameData != null && gameData.saveData != null)
        {
            SaveData thisLevel = gameData.saveData;
            if (lvl == thisLevel.Count - 1)
            {
                thisLevel.summon = true;
            }
            else
            {
                thisLevel.actives[lvl + 1] = true;
            }
            if (board.scoreManager.score > thisLevel.highScores[lvl])
            {
                thisLevel.highScores[lvl] = board.scoreManager.score;
            }

            if (board.scoreManager.stars > thisLevel.stars[lvl])
            {
                thisLevel.stars[lvl] = board.scoreManager.stars;
            }

            if (lvl >= 0 && lvl < gameData.debugData.Length)
            {
                gameData.debugData[lvl] = (lvl + 1).ToString() + ": " + board.scoreManager.reqs.counter + " (" + board.scoreManager.reqs.gameType + ")";
            }
            gameData.Save();
        }

        StartCoroutine(GameEndCo());
    }

    private IEnumerator GameEndCo()
    {
        yield return new WaitForSeconds(1f);
        // if this is the last level, play winAnim
        if (board.getLvl() == (board.world.levels[board.world.levels.Length - 1]) && winAnim != null)
        {
            board.soundManager.setBackgroundMusic(false);
            winAnim.SetBool("end", true);
            board.soundManager.PlayJumpNoise();
        }
        // else, play normal end anim
        else if (endAnim != null)
        {
            endAnim.SetBool("end", true);
            board.soundManager.PlayWinNoise();
        }
    }

    public void loseGame()
    {
        if (endAnim != null)
        {
            endAnim.SetBool("end", true);
            board.soundManager.PlayLoseNoise();
        }
    }

    public void retry()
    {
        if (endAnim != null)
        {
            endAnim.SetBool("end", false);
        }

        if (gameData != null)
        {
            SaveData thisLevel = gameData.saveData;
            if (board.scoreManager.score > thisLevel.highScores[lvl])
            {
                thisLevel.highScores[lvl] = board.scoreManager.score;
            }
        }

        board.scoreManager.clearScore();
        board.scoreManager.clearLevelGoals();

        SceneManager.LoadScene(SceneManager.GetActiveScene().name);
        // StartCoroutine(GameStartCo()); 
    }

    // Touch input handling for Android
    protected void Update()
    {
        if (Input.touchCount > 0 && Input.GetTouch(0).phase == TouchPhase.Began)
        {
            // Handle touch input
            Vector2 touchPos = Input.GetTouch(0).position;
            Ray ray = Camera.main.ScreenPointToRay(touchPos);
            RaycastHit2D hit = Physics2D.Raycast(ray.origin, ray.direction);

            if (hit.collider != null && hit.collider.gameObject == gameObject)
            {
                // Handle touch on this menu item
                // Example: buttonOK();
            }
        }
    }
}
