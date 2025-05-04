#include "TextureBuilder.h"
#include "common.h"  // Should already be included in other files
#include "scene1.h"// Include the scene headers
#include "scene2.h"
#include <windows.h>  // Required for OutputDebugString
Vector3f eye, center, up;


int WIDTH = 1280;
int HEIGHT = 720;
GLuint tex;
char title[] = "Lost in the landscape";

// 3D Projection Options
GLdouble fovy = 45.0;
GLdouble aspectRatio = (GLdouble)WIDTH / (GLdouble)HEIGHT;
GLdouble zNear = 0.1;
GLdouble zFar = 100;
bool cam = true;
Vector Eye(20, 5, 20);
Vector At(0, 0, 0);
Vector Up(0, 1, 0);

int cameraZoom = 0;

bool isFirstPerson = false;  // Toggle between first-person and third-person view
float third_person_distance = 5.0f;  // Distance of the camera behind the player in third-person view

bool isAscending = false;   // Initialize ascending state
bool isDescending = false;  // Initialize descending state

//mouse

bool isJumping = false;      // To track if the jump is ongoing
float jumpHeight = 0.0f;     // Current height of the jump
float penguinSpeedY = 0.0f;  // Vertical speed (used for jumping)
const float initialHeight = 1.8f; // Ground height
const float maxHeight = 5.0f;     // Peak jump height



//mouse

float lastMouseX = WIDTH / 2.0f; // Store the last mouse position (initialize to center)
float lastMouseY = HEIGHT / 2.0f;
const float sensitivity = 0.3f;  // Mouse sensitivity


//Timer
float remainingTime = 0.0f; // Initialized remaining time
float totalGameTime = 60.0f; // Set the total game duration
float gameStartTime = 0.0f;
bool isGameOver = false;

//Game Win and Lose
bool isGameLost = false; // Flag to track if the player lost the game
bool isGameWon = false; // Flag to track if the player won the game




// Model Variables
Model_3DS model_house;
Model_3DS model_tree;
Model_3DS model_goal;
Model_3DS model_card;
Model_3DS model_player;
Model_3DS model_player2;
Model_3DS model_room;
Model_3DS model_newroom;
Model_3DS model_key;
Model_3DS model_clock;
Model_3DS model_ghost;

GLTexture tex_key;
GLTexture tex_key1;
GLTexture tex_key2;
GLTexture tex_key3;
GLTexture tex_key4;
GLTexture tex_clock1;
GLTexture tex_clock2;




// Textures
GLTexture tex_ground;
GLTexture tex_card;
GLTexture tex_player;
GLTexture tex_trap;

//
bool isTransitioning = false;
float transitionStartTime = 0.0f;


//Setup Camera
Camera camera(playerPosition.x, 1.8f, playerPosition.z, playerPosition.x, 1.8f, playerPosition.z - 1, 0.0f, 1.0f, 0.0f);
//Camera camera(20, 5, 20, 0, 0, 0, 0, 1, 0);
void setupCamera() {
    glMatrixMode(GL_PROJECTION);
    glLoadIdentity();
    gluPerspective(60, 640 / 480, 0.001, 1000);

    glMatrixMode(GL_MODELVIEW);
    glLoadIdentity();
    camera.look();
}




//=======================================================================
// Lighting Configuration Function
//=======================================================================
void InitLightSource()
{
    glEnable(GL_LIGHTING);
    glEnable(GL_LIGHT0);

    GLfloat ambient[] = { 0.1f, 0.1f, 0.1f, 1.0f };
    glLightfv(GL_LIGHT0, GL_AMBIENT, ambient);

    GLfloat diffuse[] = { 0.5f, 0.5f, 0.5f, 1.0f };
    glLightfv(GL_LIGHT0, GL_DIFFUSE, diffuse);

    GLfloat specular[] = { 1.0f, 1.0f, 1.0f, 1.0f };
    glLightfv(GL_LIGHT0, GL_SPECULAR, specular);

    GLfloat light_position[] = { 0.0f, 10.0f, 0.0f, 1.0f };
    glLightfv(GL_LIGHT0, GL_POSITION, light_position);
}
void updatePenguinJump() {
    if (isJumping) {
        penguinSpeedY -= 0.05f;           // Reduced gravity for slower jump descent
        float translationY = penguinSpeedY * 0.5f; // Calculate translation

        playerPosition.y += translationY; // Adjust vertical position

        // Translate the camera by the same amount
        if (isFirstPerson) {
            eye.y += translationY;   // Move the camera's eye up or down
            center.y += translationY; // Move the camera's center up or down
        }

        if (playerPosition.y <= initialHeight) { // Reset when touching the ground
            translationY = initialHeight - playerPosition.y; // Adjustment if below ground
            playerPosition.y = initialHeight;

            // Stop the jump
            isJumping = false;
            penguinSpeedY = 0.0f;

            // Reset camera to ground level
            if (isFirstPerson) {
                eye.y += translationY;   // Adjust eye back to ground
                center.y += translationY; // Adjust center back to ground
            }
        }

        glutPostRedisplay();            // Redraw the scene
    }
}

void startJump() {
    if (!isJumping) {
        isJumping = true;
        penguinSpeedY = 0.7f; // Increased initial upward speed for higher jump
    }
}

void InitMaterial()
{
    // Enable Material Tracking
    glEnable(GL_COLOR_MATERIAL);

    // Sich will be assigneet Material Properties whd by glColor
    glColorMaterial(GL_FRONT, GL_AMBIENT_AND_DIFFUSE);

    // Set Material's Specular Color
    // Will be applied to all objects
    GLfloat specular[] = { 1.0f, 1.0f, 1.0f, 1.0f };
    glMaterialfv(GL_FRONT, GL_SPECULAR, specular);

    // Set Material's Shine value (0->128)
    GLfloat shininess[] = { 96.0f };
    glMaterialfv(GL_FRONT, GL_SHININESS, shininess);
}

//=======================================================================
// OpenGL Configuration Function
//=======================================================================
void myInit(void)
{
    initializeScene1Audio();
    initializeAudio();
    glClearColor(0.0, 0.0, 0.0, 0.0);
    glMatrixMode(GL_PROJECTION);
    glLoadIdentity();
    gluPerspective(fovy, aspectRatio, zNear, zFar);
    glMatrixMode(GL_MODELVIEW);
    //gluLookAt(Eye.x, Eye.y, Eye.z, At.x, At.y, At.z, Up.x, Up.y, Up.z);

    InitLightSource();
    InitMaterial();

    glEnable(GL_DEPTH_TEST);
      glEnable(GL_NORMALIZE);
}

//=======================================================================
// Keyboard Function
//=======================================================================
void myKeyboard(unsigned char button, int x, int y)
{
    switch (button)
    {
    case 'w': movePlayer('w'); break;
    case 's': movePlayer('s');  break;
    case 'a': movePlayer('a');  break;
    case 'd': movePlayer('d'); break;
    case '1': // Switch to Scene 1
        if (isScene2) {
            stopScene2Music(); // Stop Scene 2 music
        }
        isScene2 = false;
        glutDisplayFunc(myDisplayScene1);
        playBackgroundMusic("sounds/scene1.wav"); // Play Scene 1 music
        break;

    case '2': // Switch to Scene 2
        if (!isScene2) {
            stopBackgroundMusic(); // Stop Scene 1 music
        }
        isScene2 = true;
        glutDisplayFunc(myDisplayScene2);
        // Music for Scene 2 will be handled in the display function
        break;
    case '5': // Toggle between third-person and first-person
        isFirstPerson = true;  // Toggle camera view mode
        updateCamera();
        break;
    case '6': // Toggle between third-person and first-person
        isFirstPerson = false;  // Toggle camera view mode
        updateCamera();
        break;
    case 'j':
        startJump();
        break;
        break;

    case 27:
        exit(0);
        break;
    default:
        break;
    }

    glutPostRedisplay();
}

//=======================================================================
// Mouse Function
////=======================================================================
void myMouse(int x, int y) {
    // Calculate the mouse movement difference
    float offsetX = x - lastMouseX;

    // Update last mouse position
    lastMouseX = x;

    // Apply sensitivity and update rotation angles
    playerRotationY += offsetX * sensitivity; // Horizontal mouse movement affects yaw

    
    // Request redisplay for immediate rendering updates
    glutPostRedisplay();
}

//=======================================================================
// Reshape Function
//=======================================================================
void myReshape(int w, int h)
{
    if (h == 0) {
        h = 1;
    }

    WIDTH = w;
    HEIGHT = h;

    // set the drawable region of the window
    glViewport(0, 0, w, h);

    // set up the projection matrix 
    glMatrixMode(GL_PROJECTION);
    glLoadIdentity();
    gluPerspective(fovy, (GLdouble)WIDTH / (GLdouble)HEIGHT, zNear, zFar);

    // go back to modelview matrix so we can move the objects about
    glMatrixMode(GL_MODELVIEW);
    glLoadIdentity();
    gluLookAt(Eye.x, Eye.y, Eye.z, At.x, At.y, At.z, Up.x, Up.y, Up.z);
}

//=======================================================================
// Assets Loading Function
//=======================================================================
void LoadAssets()
{

    model_goal.Load("Models/goal/goal.3DS");
    model_card.Load("Models/card/card.3ds");
    model_player.Load("Models/character/Girltest.3ds");
    model_player2.Load("Models/character2/character.3ds");
    model_room.Load("Models/room/room.3DS"); 


    tex_player.Load("Models/character/Mavis_D.bmp");


    for (int i = 0; i < model_player.numMaterials; i++) {
        model_player.Materials[i].tex = tex_player; // Assign the texture
        model_player.Materials[i].textured = true;     // Mark material as textured
    }
    for (int i = 0; i < model_player2.numMaterials; i++) {
        model_player2.Materials[i].tex = tex_player; // Assign the texture
        model_player2.Materials[i].textured = true;     // Mark material as textured
    }
    model_tree.Load("Models/tree/Tree.3ds");
    tex_ground.Load("Textures/ground2.bmp");
    tex_trap.Load("Textures/trap.bmp");
    loadBMP(&tex, "Textures/blu-sky-3.bmp", true);
    tex_key.Load("Models/key/key_color.bmp");
    model_key.Load("Models/key/key.3ds");
    for (int i = 0; i < model_key.numMaterials; i++) {
        model_key.Materials[i].tex = tex_key; // Assign the texture
        model_key.Materials[i].textured = true;     // Mark material as textured
    }


    model_clock.Load("Models/clock/clock.3ds");
    tex_clock1.Load("Models/clock/Clock_wire_255255255_BaseColor.bmp");
    tex_clock2.Load("Models/clock/Emmision.bmp");
    for (int i = 0; i < model_clock.numMaterials; i++) {
        model_clock.Materials[i].tex = tex_clock1; // Assign the texture
        model_clock.Materials[i].textured = true;     // Mark material as textured

    }
    model_newroom.Load("Models/newroom/newroom.3ds");
    model_ghost.Load("Models/ghost/ghost.3ds");

}
float previousTime = 0.0f;
float deltaTime = 0.0f;
void updateDeltaTime() {
    float currentTime = glutGet(GLUT_ELAPSED_TIME) / 1000.0f; // Time in seconds
    deltaTime = currentTime - previousTime;
    previousTime = currentTime;
}
void updateCameraShake() {
    static float lastShakeOffsetX = 0.0f, lastShakeOffsetY = 0.0f, lastShakeOffsetZ = 0.0f;

    if (isCameraShaking) {
        cameraShakeTime += deltaTime;

        if (cameraShakeTime <= shakeDuration) {
            // Generate random offsets
            float offsetX = ((rand() % 200) - 100) / 100.0f * shakeIntensity;
            float offsetY = ((rand() % 200) - 100) / 100.0f * shakeIntensity;
            float offsetZ = ((rand() % 200) - 100) / 100.0f * shakeIntensity;

            // Undo previous offsets
            camera.applyShake(-lastShakeOffsetX, -lastShakeOffsetY, -lastShakeOffsetZ);

            // Apply new offsets
            camera.applyShake(offsetX, offsetY, offsetZ);

            // Store current offsets
            lastShakeOffsetX = offsetX;
            lastShakeOffsetY = offsetY;
            lastShakeOffsetZ = offsetZ;
        }
        else {
            // Stop shaking after duration
            camera.applyShake(-lastShakeOffsetX, -lastShakeOffsetY, -lastShakeOffsetZ);
            isCameraShaking = false;
        }
    }
}
float getCurrentTime() {
    return glutGet(GLUT_ELAPSED_TIME) / 1000.0f; // Convert milliseconds to seconds
}
// Function to set up orthographic projection for 2D rendering
void setOrthographicProjection() {
    // Get the window dimensions
    GLint viewport[4];
    glGetIntegerv(GL_VIEWPORT, viewport);
    int windowWidth = viewport[2];
    int windowHeight = viewport[3];

    // Set up orthographic projection
    glMatrixMode(GL_PROJECTION);
    glPushMatrix();
    glLoadIdentity();
    gluOrtho2D(0.0, 1.0, 0.0, 1.0); // Normalized coordinates
    glMatrixMode(GL_MODELVIEW);
    glPushMatrix();
    glLoadIdentity();
}

// Restore the previous projection
void restorePerspectiveProjection() {
    glMatrixMode(GL_PROJECTION);
    glPopMatrix();
    glMatrixMode(GL_MODELVIEW);
    glPopMatrix();
}

// Main transition rendering function
void renderTransitionScreen() {
    // Set a spooky background color (dark purple)
    glClearColor(0.05f, 0.0f, 0.1f, 1.0f); // Dark purple
    glClear(GL_COLOR_BUFFER_BIT | GL_DEPTH_BUFFER_BIT);

    // Enable depth testing and blending for 3D rendering and transparent effects
    glEnable(GL_DEPTH_TEST);
    glEnable(GL_BLEND);
    glBlendFunc(GL_SRC_ALPHA, GL_ONE_MINUS_SRC_ALPHA);

    // Set up perspective projection for 3D rendering
    glMatrixMode(GL_PROJECTION);
    glLoadIdentity();
    gluPerspective(45.0f, (float)WIDTH / (float)HEIGHT, 0.1f, 100.0f);

    glMatrixMode(GL_MODELVIEW);
    glLoadIdentity();

    // Position the camera to look at the scene
    gluLookAt(0.0f, 2.0f, 5.0f,  // Camera position
        0.0f, 1.0f, 0.0f,  // Look-at point
        0.0f, 1.0f, 0.0f); // Up direction

    // Calculate elapsed time since transition started for ghost animation
    float elapsed = getCurrentTime() - transitionStartTime;

    // Position and animate the ghost model
    float ghostX = sin(elapsed * 0.5f) * 1.5f; // Horizontal floating animation
    float ghostY = 1.0f + sin(elapsed * 2.0f) * 0.2f; // Vertical bobbing animation
    float ghostZ = -2.0f;

    glPushMatrix();
    glTranslatef(ghostX, ghostY, ghostZ);

    // Rotate the ghost slightly for a more dynamic appearance
    float ghostRotation = elapsed * 20.0f;
    glRotatef(ghostRotation, 0.0f, 1.0f, 0.0f);

    // Render the ghost model (assuming model_ghost is already loaded)
    model_ghost.Draw();
    glPopMatrix();

    // Set up 2D orthographic projection for text rendering
    glMatrixMode(GL_PROJECTION);
    glPushMatrix();
    glLoadIdentity();
    gluOrtho2D(0.0, 1.0, 0.0, 1.0);
    glMatrixMode(GL_MODELVIEW);
    glPushMatrix();
    glLoadIdentity();

    // Flicker effect for text color (orange-like hue)
    float intensity = 0.5f + 0.5f * sin(elapsed * 8.0f);
    glColor3f(intensity, intensity * 0.5f, 0.0f); // Flickering orange color

    // Pulsing scale effect (simulated by changing text position slightly)
    float pulse = 0.005f * sin(elapsed * 5.0f);

    // Render the Halloween-themed message
    renderText(0.35f + pulse, 0.5f + pulse, "Teleporting to the castle...");

    // Restore previous projection matrix for 2D rendering
    glMatrixMode(GL_PROJECTION);
    glPopMatrix();
    glMatrixMode(GL_MODELVIEW);
    glPopMatrix();

    // Disable blending and depth testing after rendering
    glDisable(GL_BLEND);
    glDisable(GL_DEPTH_TEST);

    // Swap buffers to display the transition screen
    glutSwapBuffers();
}


void gameLoop() {
    updateDeltaTime(); // Ensure deltaTime is updated

    updateTimer(); // Always update the timer first
    // Display Timer
    displayTimer(remainingTime);

    if (isTransitioning) {
        // Calculate the elapsed time since the transition started
        float elapsedTime = getCurrentTime() - transitionStartTime;
        if (elapsedTime > 3.0f) { // 3-second transition
            isTransitioning = false;
            isScene2 = true; // Switch to Scene 2
            
            
        }
        else {
            renderTransitionScreen(); // Render the transition screen
            return; // Skip other updates and rendering during the transition
        }
    }

    // Call jumpPlayer with deltaTime
 
   
    updateCameraShake();
    // Render the current scene
    if (isScene2) {
        myDisplayScene2();
        if (checkClockCollision(playerPosition)) {
            printf("Clock collision detected!\n");
        }
        //printf("x roation %f",playerRotationX);
        //printf("y roation %f", playerRotationY);


    }
    else {
        myDisplayScene1();
    }
}


void timerFunction(int value) {
    updatePenguinJump();  // Update jump logic if needed
    glutPostRedisplay();  // Force the display to refresh
    glutTimerFunc(16, timerFunction, 0);  // Repeat every 16 ms (~60 FPS)
}

void displayTimer(float timeLeft) {
    timeLeft = (timeLeft < 0) ? 0 : timeLeft; // Clamp timer to 0
    glDisable(GL_LIGHTING);
    glMatrixMode(GL_PROJECTION);
    glPushMatrix();                // Save current projection matrix
    glLoadIdentity();
    gluOrtho2D(0, WIDTH, 0, HEIGHT); // Set orthographic projection

    glMatrixMode(GL_MODELVIEW);
    glPushMatrix();                // Save current model-view matrix
    glLoadIdentity();

    glColor3f(1.0f, 0.0f, 0.0f); // Red color
    glRasterPos2i(700, HEIGHT - 30); // Top-left corner
    char timerText[50];
    sprintf(timerText, "Time Left: %.0f sec", timeLeft);
    for (int i = 0; timerText[i] != '\0'; i++) {
        glutBitmapCharacter(GLUT_BITMAP_HELVETICA_18, timerText[i]);
    }
    glEnable(GL_LIGHTING); // Re-enable lighting
    glPopMatrix();                 // Restore model-view matrix
    glMatrixMode(GL_PROJECTION);
    glPopMatrix();                 // Restore projection matrix
}


void updateTimer() {
    float currentTime = glutGet(GLUT_ELAPSED_TIME) / 1000.0f; // Current time in seconds
    float elapsedTime = currentTime - gameStartTime;          // Time elapsed since start
    remainingTime = totalGameTime - elapsedTime;             // Calculate remaining time
    if (remainingTime < 0) {
        remainingTime = 0; // Clamp to zero
        isGameOver = true; // Trigger game over
    }
}

void renderGameLoseScreen() {
    // Set background color
    glClearColor(0.0f, 0.0f, 0.0f, 1.0f); // Black background
    glClear(GL_COLOR_BUFFER_BIT | GL_DEPTH_BUFFER_BIT);

    // Set up 2D orthographic projection
    setOrthographicProjection();

    // Draw "Game Lose" text
    glColor3f(1.0f, 0.0f, 0.0f); // Red color
    glRasterPos2f(0.4f, 0.5f);
    const char* text = "Game Lose";
    for (const char* c = text; *c != '\0'; ++c) {
        glutBitmapCharacter(GLUT_BITMAP_TIMES_ROMAN_24, *c);
    }

    // Restore perspective projection
    restorePerspectiveProjection();

    glutSwapBuffers();
}


void renderGameWinScreen() {
    glClear(GL_COLOR_BUFFER_BIT | GL_DEPTH_BUFFER_BIT);

    // Set up 2D orthographic projection
    setOrthographicProjection();

    // Draw "Game Win" text
    glColor3f(0.0f, 1.0f, 0.0f); // Green color
    glRasterPos2f(0.4f, 0.5f);
    const char* text = "Game Win";
    for (const char* c = text; *c != '\0'; ++c) {
        glutBitmapCharacter(GLUT_BITMAP_TIMES_ROMAN_24, *c);
    }

    // Restore perspective projection
    restorePerspectiveProjection();

    glutSwapBuffers();
}


bool checkGameWinConditions() {
    return areAllCollectiblesCollected() && areAllKeysCollected() && remainingTime > 0.0f;
}


//=======================================================================
// Main Function
//=======================================================================
void main(int argc, char** argv)
{
    glutInit(&argc, argv);

    glutInitDisplayMode(GLUT_DOUBLE | GLUT_RGB | GLUT_DEPTH);

    glutInitWindowSize(WIDTH, HEIGHT);

    glutInitWindowPosition(100, 150);

    glutCreateWindow(title);
    glutTimerFunc(16, timerFunction, 0);

    remainingTime = totalGameTime; // Initialize remaining time


    // Set default display function to render Scene 1
    glutDisplayFunc(myDisplayScene1); // Start with Scene 1
    isScene2 = false; // Ensure Scene 1 is the default scene

    glutKeyboardFunc(myKeyboard);

    glutPassiveMotionFunc(myMouse);
    glutReshapeFunc(myReshape);

    myInit();

    LoadAssets();

    glEnable(GL_DEPTH_TEST);
    glEnable(GL_LIGHTING);
    glEnable(GL_LIGHT0);
    glEnable(GL_NORMALIZE);
    glEnable(GL_COLOR_MATERIAL);
    glColorMaterial(GL_FRONT, GL_AMBIENT_AND_DIFFUSE);
    glShadeModel(GL_SMOOTH);

    // Initialize the game timer here
    gameStartTime = glutGet(GLUT_ELAPSED_TIME) / 1000.0f;

    glutMainLoop();
}