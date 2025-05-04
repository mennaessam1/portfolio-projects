#include "scene2.h"
#include "scene1.h"
#include <vector>
#include "common.h"
#include "SDL.h"
#include "SDL_mixer.h"


Mix_Music* scene2Music = nullptr;
bool isScene2MusicPlaying = false;

Mix_Chunk* keyCollectSound = nullptr;


void initializeScene2Audio() {
    static bool isInitialized = false;
    if (isInitialized) return;
    if (SDL_Init(SDL_INIT_AUDIO) < 0) {
        printf("SDL could not initialize! SDL_Error: %s\n", SDL_GetError());
        return;
    }
    if (Mix_OpenAudio(44100, MIX_DEFAULT_FORMAT, 2, 2048) < 0) {
        printf("SDL_mixer could not initialize! SDL_mixer Error: %s\n", Mix_GetError());
        return;
    }

    // Load key collect sound
    keyCollectSound = Mix_LoadWAV("sounds/collect.wav");
    if (!keyCollectSound) {
        printf("Failed to load key collect sound! SDL_mixer Error: %s\n", Mix_GetError());
    }

    // Load clock collision sound
    

    isInitialized = true;
}

void playScene2Music(const char* path) {
    if (isScene2MusicPlaying) return; // Avoid restarting the music

    scene2Music = Mix_LoadMUS(path);
    if (scene2Music == nullptr) {
        printf("Failed to load Scene 2 music! SDL_mixer Error: %s\n", Mix_GetError());
        return;
    }
    Mix_PlayMusic(scene2Music, -1); // Loop indefinitely
    isScene2MusicPlaying = true;
}

void stopScene2Music() {
    Mix_HaltMusic();
    if (scene2Music != nullptr) {
        Mix_FreeMusic(scene2Music);
        scene2Music = nullptr;
    }
    isScene2MusicPlaying = false;
}

void cleanupScene2Audio() {
    Mix_CloseAudio();
    SDL_Quit();
}
// Light position (initialize with default values)
GLfloat lightPosition[] = { playerPosition.x, playerPosition.y, playerPosition.z, 1.0f };





struct Key {
    Vector3f position;
    bool isCollected;
};

std::vector<Key> keys = {
    {{2.55f, 5.0f, -31.03f}, false},
     {{-10.0f, 3.0f, -18.0f}, false},
    {{-10.25f, 5.0f, -4.40f}, false}
};

Vector3f keyPosition(-4.13f, 3.0f, 4.38f);  // Static position for the key
Vector3f keyPosition2(-10.0f, 3.0f, -18.0f);  // Static position for the key
Vector3f keyPosition3(2.55f, 5.0f, -31.03f);  // Static position for the key
Vector3f keyPosition4(-10.25f, 5.0f, -4.40f);  // Static position for the key

Vector3f clockPosition(1.61f, 2.5f, 6.48f);  // Static position for the key
Vector3f clockPosition2(-7.12f, 2.5f, -6.29f);  // Static position for the key
Vector3f clockPosition3(-3.83f, 2.5f, -26.14);  // Static position for the key

Vector3f previousPlayerPosition = playerPosition; // Store the last valid position
void checkKeyCollisions() {
    float collisionDistance = 1.5f; // Adjust as needed
    for (auto& key : keys) {
        if (!key.isCollected) {
            float distance = sqrt(pow(playerPosition.x - key.position.x, 2) +
                pow(playerPosition.y - key.position.y, 2) +
                pow(playerPosition.z - key.position.z, 2));
            if (distance < collisionDistance) {
                key.isCollected = true;  // This is where the key is marked as collected
                score += 1;
                printf("Key collected! Score: %d\n", score);
                if (keyCollectSound) {
                    Mix_PlayChannel(-1, keyCollectSound, 0);
                }
            }
        }
    }
}


bool isCameraShaking = false;
float cameraShakeTime = 0.0f;
float shakeDuration = 2.0f; // Duration of the shake in seconds
float shakeIntensity = 0.2f; // Intensity of the shake

bool checkClockCollision(Vector3f position) {
    Vector3f clockPositions[] = { clockPosition, clockPosition2, clockPosition3 };
    float collisionDistance = 1.5f;

    for (const auto& clock : clockPositions) {
        float distance = sqrt(pow(position.x - clock.x, 2) + pow(position.z - clock.z, 2));
        if (distance < collisionDistance) {
            isCameraShaking = true;
            cameraShakeTime = 0.0f; // Reset shake time
            return true;
           
        }
    }
    return false;
}

//=======================================================================
// Display Function for Scene 2
//=======================================================================
void RenderGround2()
{
    glDisable(GL_LIGHTING);	// Disable lighting 

    glColor3f(0.6, 0.6, 0.6);	// Dim the ground texture a bit

    glEnable(GL_TEXTURE_2D);	// Enable 2D texturing

    glBindTexture(GL_TEXTURE_2D, tex_ground.texture[0]);	// Bind the ground texture

    glPushMatrix();
    glBegin(GL_QUADS);
    glNormal3f(0, 1, 0);	// Set quad normal direction.
    glTexCoord2f(0, 0);		// Set tex coordinates ( Using (0,0) -> (5,5) with texture wrapping set to GL_REPEAT to simulate the ground repeated grass texture).
    glVertex3f(-20, 0, -20);
    glTexCoord2f(5, 0);
    glVertex3f(20, 0, -20);
    glTexCoord2f(5, 5);
    glVertex3f(20, 0, 20);
    glTexCoord2f(0, 5);
    glVertex3f(-20, 0, 20);
    glEnd();
    glPopMatrix();

    glEnable(GL_LIGHTING);	// Enable lighting again for other entites coming throung the pipeline.

    glColor3f(1, 1, 1);	// Set material back to white instead of grey used for the ground texture.
}

void displayScore(int score) {
    glColor3f(1.0, 1.0, 1.0);
    glRasterPos2i(10, HEIGHT - 30);  // Position the text on the screen
    char scoreText[50];
    sprintf(scoreText, "Score: %d", score);
    for (int i = 0; scoreText[i] != '\0'; i++) {
        glutBitmapCharacter(GLUT_BITMAP_HELVETICA_18, scoreText[i]);
    }
}
void updateLightPosition() {
    lightPosition[0] = playerPosition.x;      // Match X position of the player
    lightPosition[1] = playerPosition.y; // Position light slightly above the player
    lightPosition[2] = playerPosition.z;      // Match Z position of the player
    printf("lightpos x : %f , y: %f , z: %f\n", lightPosition[0], lightPosition[1], lightPosition[2]);
    glLightfv(GL_LIGHT0, GL_POSITION, lightPosition);
}


void setupLighting() {
    // Set light properties for yellow light
    GLfloat lightAmbient[] = { 0.2f, 0.2f, 0.0f, 1.0f };  // Dim yellow ambient light
    GLfloat lightDiffuse[] = { 1.0f, 1.0f, 0.0f, 1.0f };  // Bright yellow diffuse light
    GLfloat lightSpecular[] = { 1.0f, 1.0f, 0.0f, 1.0f }; // Yellow specular highlights

    GLfloat constantAttenuation = 1.0f;  // Base intensity
    GLfloat linearAttenuation = 0.2f;   // Moderate distance fade
    GLfloat quadraticAttenuation = 0.1f; // Stronger fade at larger distances

    glLightfv(GL_LIGHT0, GL_DIFFUSE, lightDiffuse);
    glLightfv(GL_LIGHT0, GL_AMBIENT, lightAmbient);
    glLightfv(GL_LIGHT0, GL_SPECULAR, lightSpecular);
    glLightf(GL_LIGHT0, GL_CONSTANT_ATTENUATION, constantAttenuation);
    glLightf(GL_LIGHT0, GL_LINEAR_ATTENUATION, linearAttenuation);
    glLightf(GL_LIGHT0, GL_QUADRATIC_ATTENUATION, quadraticAttenuation);
    // Apply attenuation settings to control light spread
    glLightf(GL_LIGHT0, GL_CONSTANT_ATTENUATION, 1.0f);   // Base intensity
    glLightf(GL_LIGHT0, GL_LINEAR_ATTENUATION, 0.1f);    // Gradual fade with distance
    glLightf(GL_LIGHT0, GL_QUADRATIC_ATTENUATION, 0.05f); // Faster fade over greater distances
}

bool areAllKeysCollected() {
    for (const auto& key : keys) {
        if (!key.isCollected) {
            return false; // If any key is not collected, return false
        }
    }
    return true; // All keys are collected
}




void updateKeyLighting() {
    float proximityDistance = 5.0f; // Distance within which the light increases

    for (int i = 0; i < keys.size(); ++i) {
        if (!keys[i].isCollected) {
            float distance = sqrt(pow(playerPosition.x - keys[i].position.x, 2) +
                pow(playerPosition.y - keys[i].position.y, 2) +
                pow(playerPosition.z - keys[i].position.z, 2));

            // Calculate light intensity: no light if far, very bright if near
            float intensity = (proximityDistance - distance) / proximityDistance;
            intensity = intensity < 0.0f ? 0.0f : (intensity > 2.0f ? 2.0f : intensity); // Clamp with a higher maximum

            if (intensity > 0.0f) {
                // Enable dynamic lighting for the key
                glEnable(GL_LIGHT0 + i);
                GLfloat lightPosition[] = { keys[i].position.x, keys[i].position.y + 2.0f, keys[i].position.z, 1.0f };
                GLfloat lightDiffuse[] = { intensity * 20.0f, 0.0f, 0.0f, 1.0f }; // Bright red light
                GLfloat lightAmbient[] = { intensity * 20.0f, 0.0f, 0.0f, 1.0f }; // Dim ambient red glow
                GLfloat lightSpecular[] = { intensity * 20.0f, 0.0f, 0.0f, 1.0f }; // Red specular highlights

                glLightfv(GL_LIGHT0 + i, GL_POSITION, lightPosition);
                glLightfv(GL_LIGHT0 + i, GL_DIFFUSE, lightDiffuse);
                glLightfv(GL_LIGHT0 + i, GL_AMBIENT, lightAmbient);
                glLightfv(GL_LIGHT0 + i, GL_SPECULAR, lightSpecular);



            }
            else {
                glDisable(GL_LIGHT0 + i); // Disable light if the key is far away
            }
        }
        else {
            glDisable(GL_LIGHT0 + i); // Disable light for collected keys
        }
    }
    if (!keys[0].isCollected) {
        float distance = sqrt(pow(playerPosition.x - keys[0].position.x, 2) +
            pow(playerPosition.y - keys[0].position.y, 2) +
            pow(playerPosition.z - keys[0].position.z, 2));

        // Calculate light intensity: no light if far, very bright if near
        float intensity = (proximityDistance - distance) / proximityDistance;
        intensity = intensity < 0.0f ? 0.0f : (intensity > 2.0f ? 2.0f : intensity); // Clamp with a higher maximum

        if (intensity > 0.0f) {
            // Enable dynamic lighting for the key
            glEnable(GL_LIGHT0 + 5);
            GLfloat lightPosition[] = { keys[0].position.x, keys[0].position.y + 2.0f, keys[0].position.z, 1.0f };
            GLfloat lightDiffuse[] = { intensity * 20.0f, 0.0f, 0.0f, 1.0f }; // Bright red light
            GLfloat lightAmbient[] = { intensity * 20.0f, 0.0f, 0.0f, 1.0f }; // Dim ambient red glow
            GLfloat lightSpecular[] = { intensity * 20.0f, 0.0f, 0.0f, 1.0f }; // Red specular highlights

            glLightfv(GL_LIGHT0 + 5, GL_POSITION, lightPosition);
            glLightfv(GL_LIGHT0 + 5, GL_DIFFUSE, lightDiffuse);
            glLightfv(GL_LIGHT0 + 5, GL_AMBIENT, lightAmbient);
            glLightfv(GL_LIGHT0 + 5, GL_SPECULAR, lightSpecular);



        }
        else {
            glDisable(GL_LIGHT0 + 5); // Disable light if the key is far away
        }
    }
    else {
        glDisable(GL_LIGHT0 + 5); // Disable light for collected keys
    }

}void myDisplayScene2(void) {
    glClear(GL_COLOR_BUFFER_BIT | GL_DEPTH_BUFFER_BIT);

    // Check if the game is won
    if (areAllCollectiblesCollected() && areAllKeysCollected() && remainingTime > 0.0f) {
        isGameWon = true;
        glutDisplayFunc(renderGameWinScreen); // Switch to the "Game Win" screen
        return; // Prevent further rendering
    }

    // Check if the game is lost
    if (remainingTime <= 0.0f && !areAllKeysCollected()) {
        isGameLost = true;
        glutDisplayFunc(renderGameLoseScreen); // Switch to the "Game Lose" screen
        return; // Prevent further rendering
    }

    initializeScene2Audio();
    if (!isScene2MusicPlaying) {
        playScene2Music("sounds/scene2.wav");
    }
    updateKeyLighting();

    
    float currentTime = glutGet(GLUT_ELAPSED_TIME) / 1000.0f;
    float elapsedTime = currentTime - gameStartTime;
    remainingTime = totalGameTime - elapsedTime;
    displayTimer(remainingTime);

    // Enable lighting
    glEnable(GL_LIGHTING);
    glEnable(GL_LIGHT0);
    glEnable(GL_NORMALIZE);

    // 1. Set up the PROJECTION matrix for perspective (only done once per frame)
    glMatrixMode(GL_PROJECTION);  // Switch to projection matrix
    glLoadIdentity();             // Reset projection matrix
    gluPerspective(45.0, (double)WIDTH / (double)HEIGHT, 1.0, 100.0);  // Set perspective (example)

    // 2. Set up the MODELVIEW matrix for transformations (camera, objects)
    glMatrixMode(GL_MODELVIEW);   // Switch to model-view matrix
    glLoadIdentity();             // Reset model-view matrix

    setupLighting();
    // 3. Set up the camera transformation (position and direction of the camera)
    setupCamera();  // Ensure this applies gluLookAt or similar to set the camera view

    // 4. Set the light position AFTER the camera is set
    updateLightPosition();  // Now the light will move with the player

    //// 5. Optionally, visualize the light position for debugging
    //glPushMatrix();
    //glDisable(GL_LIGHTING);  // Temporarily disable lighting for visualization
    //glTranslatef(lightPosition[0], lightPosition[1], lightPosition[2]);
    //glColor3f(1.0f, 1.0f, 0.0f);  // Yellow color for the debug sphere
    //glutSolidSphere(0.2f, 20, 20);  // Small sphere at light position
    //glEnable(GL_LIGHTING);
    //glPopMatrix();

    // Draw the ground
    RenderGround2();

    checkKeyCollisions();

    // Check if all keys are collected
    if (areAllKeysCollected()) {
        // Update the player's position
        playerPosition.x = 12.83f;
        playerPosition.y = 1.80f;
        playerPosition.z = -7.50f;

        // Optionally, print a message to confirm
        printf("All keys collected! Player moved to new position: X = %.2f, Y = %.2f, Z = %.2f\n",
            playerPosition.x, playerPosition.y, playerPosition.z);
    }



    // Render the player (with specific material properties)
    GLfloat playerAmbient[] = { 0.3f, 0.3f, 0.3f, 1.0f };
    GLfloat playerDiffuse[] = { 1.0f, 0.8f, 0.6f, 1.0f };
    GLfloat playerSpecular[] = { 1.0f, 1.0f, 1.0f, 1.0f };
    GLfloat playerShininess[] = { 50.0f };

    glMaterialfv(GL_FRONT, GL_AMBIENT, playerAmbient);
    glMaterialfv(GL_FRONT, GL_DIFFUSE, playerDiffuse);
    glMaterialfv(GL_FRONT, GL_SPECULAR, playerSpecular);
    glMaterialfv(GL_FRONT, GL_SHININESS, playerShininess);


    checkKeyCollisions();

    // Draw room model
    glPushMatrix();
    glTranslatef(15.0f, 0.2f, 20.0f);
    glRotated(45, 0, 1, 0);
    glScalef(35.0f, 35.0f, 25.0f);
    model_room.Draw();
    glPopMatrix();

 

    glPushMatrix();
    glTranslatef(clockPosition3.x + 15.0f, 0.0f, clockPosition3.z + 15.0f);
    glRotated(45, 0, 1, 0);
    glScalef(5.0f, 5.0f, 5.0f);
    model_newroom.Draw();
    glPopMatrix();


    for (const auto& key : keys) {
        if (!key.isCollected) {
            glPushMatrix();
            glTranslatef(key.position.x, key.position.y, key.position.z);
            glScalef(3.0f, 3.0f, 3.0f);
            model_key.Draw();
            glPopMatrix();
        }
    }

    glPushMatrix();
    glTranslatef(clockPosition.x, clockPosition.y, clockPosition.z);
    model_clock.Draw();
    glPopMatrix();

    glPushMatrix();
    glTranslatef(clockPosition2.x, clockPosition2.y, clockPosition2.z);
    model_clock.Draw();
    glPopMatrix();

    glPushMatrix();
    glTranslatef(clockPosition3.x, clockPosition3.y, clockPosition3.z);
    model_clock.Draw();
    glPopMatrix();

    // Draw player model and other objects...
    drawPlayer();

    glColor3f(0.0f, 0.0f, 0.0f); // Set text color to white
    char scoreText[20];
    sprintf(scoreText, "Score: %d", score);
    renderText(20, 740, scoreText); // Adjusted to display at the top left

    // Swap buffers to display the rendered scene
    glutSwapBuffers();
}