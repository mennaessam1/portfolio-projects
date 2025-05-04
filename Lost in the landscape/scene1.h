// scene1.h
#ifndef SCENE1_H
#define SCENE1_H
#include "common.h"

void drawPlayer();

void renderText(float x, float y, const char* text);
void updateCamera();
void updateHotelAnimation(int value);

void drawSky();
void initializeScene1Audio();
void initializeAudio();
void cleanupAudio();
void playBackgroundMusic(const char* path);
void stopBackgroundMusic();

bool areAllCollectiblesCollected();

void myDisplayScene1();  // Declare the display function for scene 1

#endif  // SCENE1_H
