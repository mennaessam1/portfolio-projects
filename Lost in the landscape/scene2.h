// scene2.h
#ifndef SCENE2_H
#include "common.h"
#define SCENE2_H
bool checkClockCollision(Vector3f position);
void myDisplayScene2();  // Declare the display function for scene 2
void playScene2Music(const char* path);
void stopScene2Music();
bool areAllKeysCollected();
#endif  // SCENE2_H