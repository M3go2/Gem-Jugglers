using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI; 
using UnityEngine.Localization.Settings; 
using UnityEngine.Localization; 
using UnityEngine.Localization.Tables; 
using UnityEngine.SceneManagement; 

public class GameColors {
    public static Color[] bgColors = {
        new Color(0.235493f, 0.2646766f, 0.3396226f, 1f), //    0: blue-black
        new Color(0.2470588f, 0.2431373f, 0.3137255f, 1f), //   1: off-blue
        new Color(0.2588235f, 0.2196079f, 0.282353f, 1f), //    2: off-purple
        new Color(0.2705882f, 0.2f, 0.2588235f, 1f), //         3: purple 
        new Color(0.3137255f, 0.1294118f, 0.1764706f, 1f), //   4: pale-red
        new Color(0.369f, 0f, 0.0115967f, 1f) //                5: blood-red
        }; 

    public static Color[] moveColors = {
        new Color(0f, 0.872f, 0.1591406f, 1f), //   0: move, green
        new Color(1f, 0.6806262f, 0f, 1f), //       1: wait, orange
        new Color(0.1933962f, 0.86737f, 1f, 1f) //  2: other, blue
    }; 
}

public class SettingsController : MonoBehaviour {

    private Board board; 
    [SerializeField] private SoundManager soundManager; 
    [SerializeField] private GameObject pauseMenu; 
    [SerializeField] private GameData data; 
    [SerializeField] private Dropdown dropdown;
    [SerializeField] private bool paused = false; 
    [SerializeField] string sceneToLoad; 

    [Header("Sound")]
    [SerializeField] Image musicVol; 
    [SerializeField] Image effectVol; 
    [SerializeField] Text allSounds; 
    [SerializeField] Sprite unmute; 
    [SerializeField] Sprite mute; 

    [Header("Localization")] 
    [SerializeField] private LocalizedStringTable _localizedStringTable;
    private StringTable _currentStringTable;
    private string muteLabel; 
    private string unmuteLabel; 

    private IEnumerator Start() {
        board = this.gameObject.GetComponent<Board>(); 
        soundManager = GameObject.FindWithTag("sound").GetComponent<SoundManager>(); 
        data = FindObjectOfType<GameData>(); 
        pauseMenu.SetActive(false); 

        // Wait for the localization system to initialize, loading Locales, preloading, etc.
        yield return LocalizationSettings.InitializationOperation;

        var tableLoading = _localizedStringTable.GetTable(); 

        yield return tableLoading; 

       _currentStringTable = tableLoading;

        List<Dropdown.OptionData> options = new List<Dropdown.OptionData>(); 

        int selected = PlayerPrefs.GetInt("Locale", 0); 
        for (int i = 0; i < LocalizationSettings.AvailableLocales.Locales.Count; i++) {
            var locale = LocalizationSettings.AvailableLocales.Locales[i]; 
            if (LocalizationSettings.AvailableLocales.Locales[selected] == locale) {
                selected = i;
            }
            string localizedLocal = _currentStringTable[locale.name].LocalizedValue; 
            options.Add(new Dropdown.OptionData(localizedLocal)); 
        }

        ChangeLanguage(); 

        dropdown.options = options; 
        dropdown.value = selected; 
        dropdown.onValueChanged.AddListener(LocaleSelected); 

        muteLabel = _currentStringTable["mute_label"].LocalizedValue; 
        unmuteLabel = _currentStringTable["unmute_label"].LocalizedValue; 

        allSounds.text = muteLabel; 
    }

    static void LocaleSelected(int index) {
        LocalizationSettings.SelectedLocale = LocalizationSettings.AvailableLocales.Locales[index]; 
        PlayerPrefs.SetInt("Locale", index); 
    }

    public void LanguageDropDown(int value) {
        PlayerPrefs.SetInt("Locale", value);
        ChangeLanguage(); 
    }

    private void ChangeLanguage() {
        // This variable selects the language. For example, the first language in the table is English, so 0 = English. 
        int i = PlayerPrefs.GetInt("Locale", 0); 

        // This part changes the language
        LocalizationSettings.SelectedLocale = LocalizationSettings.AvailableLocales.Locales[i];
    }

    
    public void PauseGame() {
        paused = !paused; 
    }

    private void Update() {
        if (paused && !pauseMenu.activeInHierarchy) {
            pauseMenu.SetActive(true); 
            // Debug.Log("Make pause menu active"); 
            if (board != null) {
                board.currentState = GameState.pause; 
            }
        }
        if (!paused && pauseMenu.activeInHierarchy) {
            pauseMenu.SetActive(false); 
            if (board != null) {
                board.currentState = GameState.move; 
            }
        }

        if (soundManager.isBackgroundMusicOn()) {
            musicVol.sprite = unmute; 
        }
        else {
            musicVol.sprite = mute; 
        }
        if (soundManager.isSoundEffectsOn()) {
            effectVol.sprite = unmute; 
        }
        else {
            effectVol.sprite = mute; 
        }

        if (soundManager.isAllSoundsOn()) {
            allSounds.text = muteLabel; 
        }
        else {
            allSounds.text = unmuteLabel; 
        }
    }

    public void MusicSounds() {
        if (soundManager != null) {
            if (soundManager.isBackgroundMusicOn()) {
                soundManager.setBackgroundMusic(false); 
            }
            else {
                soundManager.setBackgroundMusic(true); 
            }
        }
    }

    public void EffectSounds() {
        if (soundManager != null) {
            if (soundManager.isSoundEffectsOn()) {
                soundManager.setSoundEffects(false); 
            }
            else {
                soundManager.setSoundEffects(true); 
            }
        }
    }

    public void AllSounds() {
        if (soundManager != null) {
            if (soundManager.isAllSoundsOn()) {
                soundManager.setAllSounds(false); 
            }
            else {
                soundManager.setAllSounds(true); 
            }
        }
    }

    public void ResetProgress() {
        data.ClearSave(); 
        SceneManager.LoadScene(sceneToLoad); 
    }
}
