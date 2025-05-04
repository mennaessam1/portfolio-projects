#pragma once
//#include "TextureBuilder.h"
#include "Model_3DS.h"
#include "GLTexture.h"
#include "Camera.h"
#include <glut.h>

#ifndef M_PI
#define M_PI 3.14159265358979323846
#endif
#define DEG2RAD(a) (a * 0.0174532925)

extern int WIDTH, HEIGHT;
extern GLuint tex;
extern char title[];
extern GLdouble fovy, aspectRatio, zNear, zFar;
extern Vector Eye;
extern Vector At;
extern Vector Up;

//Camera 
extern Vector3f eye, center, up;
extern float playerRotationX;
extern float playerRotationY;

extern Vector3f playerPosition;
//extern float player_movement_speed;  // Speed at which the player moves

extern int cameraZoom;
extern bool cam;
extern bool isFirstPerson;
extern Camera camera;

extern Model_3DS model_house;
extern Model_3DS model_tree;
extern Model_3DS model_goal;
extern Model_3DS model_player;
extern Model_3DS model_player2;
extern Model_3DS model_card;
extern Model_3DS model_room;

extern int score;


extern Vector3f previousPlayerPosition;
//scene 2

extern bool isScene2;

extern Model_3DS model_key;
extern Model_3DS model_clock;
extern Model_3DS model_newroom;
extern Model_3DS model_ghost;


extern float gameStartTime; // Declare it as extern for use in other files
extern float remainingTime; // Shared timer variable
extern float totalGameTime;
void updateTimer();

void displayTimer(float timeLeft);

extern bool isGameLost;
extern bool isGameWon;

void renderGameLoseScreen();
void renderGameWinScreen();


extern bool isMusicPlaying;
extern GLTexture tex_key;
extern GLTexture tex_key1;
extern GLTexture tex_key2;
extern GLTexture tex_key3;
extern GLTexture tex_key4;

extern bool isCameraShaking ;
extern float cameraShakeTime;
extern float shakeDuration ; // Duration of the shake in seconds
extern float shakeIntensity ; // Intensity of the shake

extern bool isJumping;

extern bool isTransitioning ;
extern float transitionStartTime;

extern float getCurrentTime();

void renderText(float x, float y, const char* text);




extern const float initialHeight;
extern const float maxHeight;
extern float playerHeight;
extern GLTexture tex_clock1;
extern GLTexture tex_clock2;
extern GLTexture tex_ground;
extern GLTexture tex_player;
extern GLTexture tex_card;
extern GLTexture tex_trap;
void InitLightSource();
void InitMaterial();
void myInit(void);
void LoadAssets();
void updateCamera();
void movePlayer(char c);
void myDisplayScene1();

void myDisplayScene2();
void setupCamera();
void rotatePlayer(float deltaX, float deltaY);
//void renderText(float x, float y, char* text);


