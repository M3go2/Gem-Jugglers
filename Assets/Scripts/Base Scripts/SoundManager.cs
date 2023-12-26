using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class SoundManager : MonoBehaviour {

    [SerializeField] private AudioSource destroyNoise; 
    [SerializeField] private AudioSource winNoise; 
    [SerializeField] private AudioSource loseNoise; 
    [SerializeField] private AudioSource jumpNoise; 
    [SerializeField] private AudioSource backgroundMusic; 
    private bool soundEffectsOn = true; 
    private bool allSoundsOn = true; 
    private float backgroundVolumeScale = 0.5f; 

    private void Start() {
        LoadSettings(); 
        backgroundMusic.Play(); 
    }

    private void LoadSettings() {
        this.setBackgroundMusicVol(PlayerPrefs.GetFloat("MusicVol", 1)); 
        this.setSoundEffectsVol(PlayerPrefs.GetFloat("EffectsVol", 1)); 

        if (PlayerPrefs.GetInt("AllSound", 1) == 1) {
            allSoundsOn = true;
        }
        else {
            allSoundsOn = false; 
        }
        if (PlayerPrefs.GetInt("Music", 1) == 1) {
            backgroundMusic.mute = false; 
        }
        else {
            backgroundMusic.mute = true; 
        }
        if (PlayerPrefs.GetInt("Effects", 1) == 1) {
            soundEffectsOn = true; 
        }
        else {
            soundEffectsOn = false; 
        }
        this.setSoundEffects(soundEffectsOn); 
        this.setAllSounds(allSoundsOn); 
    }

    public void PlayDestroyNoise() {
        if (soundEffectsOn) {
            destroyNoise.Play(); 
        }
    }
    
    public void PlayWinNoise() {
        if (soundEffectsOn) {
            winNoise.Play(); 
        }
    }

    public void PlayLoseNoise() {
        if (soundEffectsOn) {
            loseNoise.Play(); 
        }
    }

    public void PlayJumpNoise() {
        jumpNoise.Play(); 
    }

    public void setBackgroundMusic(bool on) {
        if (on) {
            backgroundMusic.mute = false; 
            PlayerPrefs.SetInt("Music", 1); 
            PlayerPrefs.SetInt("AllSound", 1); 
        }
        else {
            backgroundMusic.mute = true; 
            PlayerPrefs.SetInt("Music", 0); 
        }
    }

    public bool isBackgroundMusicOn() {
        return !backgroundMusic.mute; 
    }

    public void setSoundEffects(bool on) {
        soundEffectsOn = on; 
        if (on) {
            destroyNoise.mute = false; 
            winNoise.mute = false; 
            loseNoise.mute = false;  
            PlayerPrefs.SetInt("Effects", 1); 
            PlayerPrefs.SetInt("AllSound", 1); 
        }
        else {
            destroyNoise.mute = true; 
            winNoise.mute = true; 
            loseNoise.mute = true; 
            PlayerPrefs.SetInt("Effects", 0); 
        }
    }

    public void setAllSounds(bool on) {
        setSoundEffects(isSoundEffectsOn()); 
        allSoundsOn = on; 
        if (on) {
            setBackgroundMusic(isBackgroundMusicOn()); 
            jumpNoise.mute = false; 
            PlayerPrefs.SetInt("AllSound", 1); 
        }
       else {
            setBackgroundMusic(on); 
            jumpNoise.mute = true; 
            PlayerPrefs.SetInt("AllSound", 0); 
        }
    }

    public bool isSoundEffectsOn() {
        return soundEffectsOn; 
    }

    public bool isAllSoundsOn() {
        return allSoundsOn; 
    }

    public void setBackgroundMusicVol(float volume) {
        backgroundMusic.volume = volume * backgroundVolumeScale; 
        PlayerPrefs.SetFloat("MusicVol", volume); 
    }

    public void setSoundEffectsVol(float volume) {
        destroyNoise.volume = volume; 
        winNoise.volume = volume; 
        loseNoise.volume = volume; 
        PlayerPrefs.SetFloat("EffectsVol", volume); 
    }
}
