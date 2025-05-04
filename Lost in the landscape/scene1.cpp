#include "scene1.h"  // This should already include "common.h"
#include <math.h>
#include <vector>
#include "scene2.h"
#include "SDL.h"
#include "SDL_mixer.h"
Mix_Chunk* collisionSound = nullptr;
Mix_Chunk* cardCollectSound = nullptr;
Mix_Chunk* clockCollisionSound = nullptr;
Vector3f playerPosition(0.0f, 1.8f, 0.0f);  // Starting position of the player
float playerRotationY = 0.0f;  // Yaw rotation (looking left/right)
float playerRotationX = 0.0f;  // Pitch rotation (looking up/down)
float playerRotation;
float player_movement_speed = 0.5;
float playerSpeed = 0.5f;  // Movement speed of the player
bool isScene2 = false;
bool isMusicPlaying = false;

// Speed at which the player moves
int score = 0;
float playerHeight = 1.8f; // Initial player height
float roomMinX = -20.0f;  // Adjust based on room size
float roomMaxX = 20.0f;
float roomMinZ = -40.0f;
float roomMaxZ = 40.0f;
struct Wall {
    Vector3f start;  // Start point of the wall
    Vector3f end;    // End point of the wall
};
std::vector<Vector3f> secondWallPoints = {
    {12.79f, 1.80f, 25.44f}, {12.43f, 1.80f, 25.10f}, {12.07f, 1.80f, 24.75f}, {11.71f, 1.80f, 24.40f},
    {11.35f, 1.80f, 24.05f}, {10.99f, 1.80f, 23.70f}, {10.63f, 1.80f, 23.36f}, {10.27f, 1.80f, 23.01f},
    {9.92f, 1.80f, 22.66f}, {9.56f, 1.80f, 22.31f}, {9.20f, 1.80f, 21.96f}, {8.84f, 1.80f, 21.62f},
    {8.48f, 1.80f, 21.27f}, {8.12f, 1.80f, 20.92f}, {7.76f, 1.80f, 20.57f}, {7.40f, 1.80f, 20.22f},
    {7.04f, 1.80f, 19.88f}, {6.68f, 1.80f, 19.53f}, {6.32f, 1.80f, 19.18f}, {5.97f, 1.80f, 18.83f},
    {5.61f, 1.80f, 18.48f}, {5.25f, 1.80f, 18.14f}, {4.89f, 1.80f, 17.79f}, {4.53f, 1.80f, 17.44f},
    {4.17f, 1.80f, 17.09f}, {3.81f, 1.80f, 16.74f}, {3.45f, 1.80f, 16.40f}, {3.09f, 1.80f, 16.05f},
    {2.73f, 1.80f, 15.70f}, {2.38f, 1.80f, 15.35f}, {2.02f, 1.80f, 15.00f}, {1.66f, 1.80f, 14.66f},
    {1.30f, 1.80f, 14.31f}, {0.94f, 1.80f, 13.96f}, {0.58f, 1.80f, 13.61f}, {0.22f, 1.80f, 13.26f},
    {-0.14f, 1.80f, 12.92f}, {-0.49f, 1.80f, 12.56f}, {-0.85f, 1.80f, 12.21f}, {-1.20f, 1.80f, 11.86f},
    {-1.55f, 1.80f, 11.50f}, {-1.91f, 1.80f, 11.15f}, {-2.26f, 1.80f, 10.80f}, {-2.61f, 1.80f, 10.44f},
    {-2.97f, 1.80f, 10.09f}, {-3.32f, 1.80f, 9.73f}, {-3.67f, 1.80f, 9.38f}, {-4.03f, 1.80f, 9.03f},
    {-4.38f, 1.80f, 8.67f}, {-4.73f, 1.80f, 8.32f}, {-5.09f, 1.80f, 7.97f}, {-5.44f, 1.80f, 7.61f},
    {-5.80f, 1.80f, 7.26f}, {-6.15f, 1.80f, 6.91f}, {-6.50f, 1.80f, 6.55f}, {-6.86f, 1.80f, 6.20f},
    {-7.21f, 1.80f, 5.85f}, {-7.56f, 1.80f, 5.49f}, {-7.92f, 1.80f, 5.14f}, {-8.27f, 1.80f, 4.79f},
    {-8.62f, 1.80f, 4.43f}, {-8.98f, 1.80f, 4.08f}, {-9.33f, 1.80f, 3.72f}, {-9.68f, 1.80f, 3.37f},
    {-10.04f, 1.80f, 3.02f}, {-10.39f, 1.80f, 2.66f}, {-10.74f, 1.80f, 2.31f}, {-11.10f, 1.80f, 1.96f},
    {-11.45f, 1.80f, 1.60f}, {-11.81f, 1.80f, 1.25f}, {-12.16f, 1.80f, 0.90f}, {-12.51f, 1.80f, 0.54f},
    {-12.87f, 1.80f, 0.19f}, {-13.22f, 1.80f, -0.16f}, {-13.57f, 1.80f, -0.52f}, {-13.93f, 1.80f, -0.87f},
    {-14.28f, 1.80f, -1.23f}, {-14.63f, 1.80f, -1.58f}, {-14.99f, 1.80f, -1.93f}, {-15.34f, 1.80f, -2.29f},
    {-15.69f, 1.80f, -2.64f}, {-16.05f, 1.80f, -2.99f}, {-16.40f, 1.80f, -3.35f}, {-16.76f, 1.80f, -3.70f},
    {-17.11f, 1.80f, -4.05f}, {-17.46f, 1.80f, -4.41f}, {-17.82f, 1.80f, -4.76f}, {-18.17f, 1.80f, -5.11f}
};
std::vector<Vector3f> thirdWallPoints = {
    {-17.26f, 1.80f, -5.11f}, {-17.54f, 1.80f, -5.53f}, {-17.82f, 1.80f, -5.94f}, {-18.10f, 1.80f, -6.35f},
    {-18.38f, 1.80f, -6.77f}, {-18.08f, 1.80f, -7.17f}, {-17.79f, 1.80f, -7.57f}, {-17.49f, 1.80f, -7.97f},
    {-17.19f, 1.80f, -8.37f}, {-16.89f, 1.80f, -8.77f}, {-16.59f, 1.80f, -9.17f}, {-16.97f, 1.80f, -9.51f},
    {-17.34f, 1.80f, -9.84f}, {-17.71f, 1.80f, -10.17f}, {-18.09f, 1.80f, -10.51f}, {-18.46f, 1.80f, -10.84f},
    {-18.83f, 1.80f, -11.17f}, {-19.21f, 1.80f, -11.50f}, {-19.10f, 1.80f, -11.99f}, {-18.76f, 1.80f, -12.35f},
    {-18.41f, 1.80f, -12.71f}, {-18.07f, 1.80f, -13.07f}, {-17.72f, 1.80f, -13.44f}, {-17.51f, 1.80f, -13.89f},
    {-17.29f, 1.80f, -14.34f}, {-16.88f, 1.80f, -14.06f}, {-16.47f, 1.80f, -13.77f}, {-16.54f, 1.80f, -14.27f},
    {-16.61f, 1.80f, -14.76f}, {-16.68f, 1.80f, -15.26f}, {-16.74f, 1.80f, -15.75f}, {-16.85f, 1.80f, -16.24f},
    {-16.95f, 1.80f, -16.73f}, {-17.05f, 1.80f, -17.22f}, {-17.15f, 1.80f, -17.71f}, {-17.25f, 1.80f, -18.20f},
    {-17.18f, 1.80f, -17.70f}, {-17.10f, 1.80f, -17.21f}, {-17.03f, 1.80f, -16.72f}, {-16.96f, 1.80f, -16.22f},
    {-16.48f, 1.80f, -16.35f}, {-15.99f, 1.80f, -16.48f}, {-15.51f, 1.80f, -16.61f}, {-15.43f, 1.80f, -17.10f},
    {-15.07f, 1.80f, -17.45f}, {-14.72f, 1.80f, -17.81f}, {-14.36f, 1.80f, -18.16f}, {-14.26f, 1.80f, -18.65f},
    {-14.16f, 1.80f, -19.14f}, {-14.07f, 1.80f, -19.63f}, {-13.97f, 1.80f, -20.12f}, {-13.87f, 1.80f, -20.61f},
    {-13.77f, 1.80f, -21.10f}, {-13.67f, 1.80f, -21.59f}, {-13.57f, 1.80f, -22.08f}, {-13.21f, 1.80f, -22.42f},
    {-12.84f, 1.80f, -22.76f}, {-12.48f, 1.80f, -23.11f}, {-12.11f, 1.80f, -23.45f}, {-11.75f, 1.80f, -23.79f},
    {-11.39f, 1.80f, -24.13f}, {-11.02f, 1.80f, -24.47f}, {-10.66f, 1.80f, -24.82f}, {-10.29f, 1.80f, -25.16f},
    {-9.93f, 1.80f, -25.50f}, {-9.56f, 1.80f, -25.84f}, {-9.20f, 1.80f, -26.19f}, {-8.83f, 1.80f, -26.53f},
    {-8.47f, 1.80f, -26.87f}, {-8.09f, 1.80f, -27.20f}, {-7.71f, 1.80f, -27.52f}, {-7.33f, 1.80f, -27.85f},
    {-6.96f, 1.80f, -28.18f}, {-6.58f, 1.80f, -28.50f}, {-6.20f, 1.80f, -28.83f}, {-5.82f, 1.80f, -29.16f},
    {-5.44f, 1.80f, -29.48f}, {-5.06f, 1.80f, -29.81f}, {-4.68f, 1.80f, -30.14f}, {-4.31f, 1.80f, -30.46f},
    {-3.93f, 1.80f, -30.79f}, {-3.55f, 1.80f, -31.12f}, {-3.17f, 1.80f, -31.44f}, {-2.79f, 1.80f, -31.77f},
    {-2.41f, 1.80f, -32.10f}, {-2.03f, 1.80f, -32.42f}, {-1.66f, 1.80f, -32.75f}, {-1.28f, 1.80f, -33.08f},
    {-0.90f, 1.80f, -33.40f}, {-0.63f, 1.80f, -33.83f}, {-0.32f, 1.80f, -34.22f}, {-0.01f, 1.80f, -34.61f},
    {0.30f, 1.80f, -35.00f}, {0.62f, 1.80f, -35.39f}, {0.93f, 1.80f, -35.78f}, {1.24f, 1.80f, -36.17f},
    {1.55f, 1.80f, -36.56f}, {1.87f, 1.80f, -36.95f}, {2.18f, 1.80f, -37.34f}, {2.49f, 1.80f, -37.73f},
    {2.81f, 1.80f, -38.12f}, {3.12f, 1.80f, -38.51f}, {3.43f, 1.80f, -38.90f}, {3.74f, 1.80f, -39.29f},
    {4.06f, 1.80f, -39.68f}, {4.37f, 1.80f, -40.07f}, {4.68f, 1.80f, -40.46f}
};
std::vector<Vector3f> sixthWallPoints = {
    {12.15f, 1.80f, 23.75f}, {12.15f, 1.80f, 23.75f}, {12.57f, 1.80f, 23.48f}, {12.99f, 1.80f, 23.21f},
    {13.41f, 1.80f, 22.94f}, {13.83f, 1.80f, 22.66f}, {14.25f, 1.80f, 22.39f}, {14.67f, 1.80f, 22.12f},
    {15.09f, 1.80f, 21.85f}, {15.51f, 1.80f, 21.58f}, {15.93f, 1.80f, 21.30f}, {16.35f, 1.80f, 21.03f},
    {16.76f, 1.80f, 20.76f}, {17.18f, 1.80f, 20.49f}, {17.60f, 1.80f, 20.21f}, {18.02f, 1.80f, 19.94f},
    {18.44f, 1.80f, 19.67f}, {18.86f, 1.80f, 19.40f}, {19.28f, 1.80f, 19.12f}, {19.70f, 1.80f, 18.85f},
    {20.12f, 1.80f, 18.58f}, {20.54f, 1.80f, 18.31f}
};
std::vector<Vector3f> fifthWallPoints = {
    {20.10f, 1.80f, 15.46f}, {19.79f, 1.80f, 15.06f}, {19.49f, 1.80f, 14.66f}, {19.18f, 1.80f, 14.27f},
    {18.87f, 1.80f, 13.87f}, {18.57f, 1.80f, 13.48f}, {18.26f, 1.80f, 13.08f}, {17.96f, 1.80f, 12.69f},
    {17.65f, 1.80f, 12.29f}, {17.34f, 1.80f, 11.90f}, {16.96f, 1.80f, 11.58f}, {16.57f, 1.80f, 11.26f},
    {16.19f, 1.80f, 10.94f}, {15.80f, 1.80f, 10.62f}, {15.42f, 1.80f, 10.31f}, {15.03f, 1.80f, 9.99f},
    {14.65f, 1.80f, 9.67f}, {14.26f, 1.80f, 9.35f}, {13.87f, 1.80f, 9.03f}, {13.53f, 1.80f, 8.66f},
    {13.19f, 1.80f, 8.30f}, {12.85f, 1.80f, 7.93f}, {12.51f, 1.80f, 7.57f}, {12.17f, 1.80f, 7.20f},
    {11.83f, 1.80f, 6.83f}, {11.49f, 1.80f, 6.47f}, {11.15f, 1.80f, 6.10f}, {10.81f, 1.80f, 5.73f},
    {10.47f, 1.80f, 5.37f}, {10.13f, 1.80f, 5.00f}, {9.79f, 1.80f, 4.64f}, {9.38f, 1.80f, 4.35f},
    {8.98f, 1.80f, 4.06f}, {8.57f, 1.80f, 3.77f}, {8.16f, 1.80f, 3.48f}, {7.75f, 1.80f, 3.19f},
    {7.35f, 1.80f, 2.90f}, {6.97f, 1.80f, 2.57f}, {6.59f, 1.80f, 2.24f}, {6.21f, 1.80f, 1.92f},
    {5.83f, 1.80f, 1.59f}, {5.45f, 1.80f, 1.26f}, {5.07f, 1.80f, 0.94f}, {4.70f, 1.80f, 0.61f},
    {4.32f, 1.80f, 0.28f}, {3.94f, 1.80f, -0.04f}, {3.56f, 1.80f, -0.37f}, {3.18f, 1.80f, -0.70f},
    {2.80f, 1.80f, -1.02f}, {2.42f, 1.80f, -1.35f}, {2.05f, 1.80f, -1.68f}, {1.67f, 1.80f, -2.00f},
    {1.29f, 1.80f, -2.33f}, {0.91f, 1.80f, -2.66f}, {0.53f, 1.80f, -2.98f}, {0.19f, 1.80f, -3.35f},
    {-0.16f, 1.80f, -3.71f}, {-0.50f, 1.80f, -4.07f}, {-0.84f, 1.80f, -4.43f}, {-1.19f, 1.80f, -4.80f},
    {-1.53f, 1.80f, -5.16f}, {-1.88f, 1.80f, -5.52f}, {-2.22f, 1.80f, -5.88f}, {-2.57f, 1.80f, -6.25f},
    {-2.91f, 1.80f, -6.61f}, {-3.23f, 1.80f, -7.00f}, {-3.55f, 1.80f, -7.38f}, {-3.87f, 1.80f, -7.77f},
    {-4.18f, 1.80f, -8.15f}, {-4.50f, 1.80f, -8.54f}, {-4.82f, 1.80f, -8.92f}, {-5.14f, 1.80f, -9.31f},
    {-5.47f, 1.80f, -9.68f}, {-5.81f, 1.80f, -10.05f}, {-6.14f, 1.80f, -10.42f}, {-6.48f, 1.80f, -10.79f},
    {-6.81f, 1.80f, -11.16f}, {-7.15f, 1.80f, -11.54f}, {-7.48f, 1.80f, -11.91f}, {-7.82f, 1.80f, -12.28f},
    {-8.15f, 1.80f, -12.65f}, {-8.49f, 1.80f, -13.02f}
};
std::vector<Vector3f> seventhWallPoints = {
    {4.51f, 1.80f, -37.89f}, {4.88f, 1.80f, -37.56f}, {5.26f, 1.80f, -37.24f}, {5.64f, 1.80f, -36.91f},
    {6.02f, 1.80f, -36.58f}, {6.40f, 1.80f, -36.26f}, {6.78f, 1.80f, -35.93f}, {7.16f, 1.80f, -35.60f},
    {7.53f, 1.80f, -35.28f}, {7.91f, 1.80f, -34.95f}, {8.29f, 1.80f, -34.62f}, {8.67f, 1.80f, -34.30f},
    {9.05f, 1.80f, -33.97f}, {9.43f, 1.80f, -33.64f}, {9.80f, 1.80f, -33.32f}, {10.18f, 1.80f, -32.99f},
    {10.18f, 1.80f, -32.99f}, {10.18f, 1.80f, -32.99f}, {10.18f, 1.80f, -32.99f}
};
std::vector<Vector3f> fourthWallPoints = {
    {-11.22f, 1.80f, -11.98f}, {-10.82f, 1.80f, -12.28f}, {-10.41f, 1.80f, -12.57f}, {-10.01f, 1.80f, -12.87f},
    {-9.61f, 1.80f, -13.17f}, {-9.21f, 1.80f, -13.46f}, {-8.80f, 1.80f, -13.76f}, {-8.40f, 1.80f, -14.05f},
    {-8.00f, 1.80f, -14.35f}, {-7.59f, 1.80f, -14.65f}, {-7.21f, 1.80f, -14.97f}, {-6.83f, 1.80f, -15.29f},
    {-6.45f, 1.80f, -15.62f}, {-6.07f, 1.80f, -15.94f}, {-5.69f, 1.80f, -16.27f}, {-5.31f, 1.80f, -16.59f},
    {-4.93f, 1.80f, -16.92f}, {-4.55f, 1.80f, -17.24f}, {-4.17f, 1.80f, -17.57f}, {-3.79f, 1.80f, -17.89f},
    {-3.41f, 1.80f, -18.22f}, {-3.06f, 1.80f, -18.57f}, {-2.71f, 1.80f, -18.93f}, {-2.36f, 1.80f, -19.29f},
    {-2.01f, 1.80f, -19.65f}, {-1.66f, 1.80f, -20.00f}, {-1.31f, 1.80f, -20.36f}, {-0.96f, 1.80f, -20.72f},
    {-0.61f, 1.80f, -21.08f}, {-0.26f, 1.80f, -21.43f}, {0.09f, 1.80f, -21.79f}, {0.44f, 1.80f, -22.15f},
    {0.79f, 1.80f, -22.50f}, {1.14f, 1.80f, -22.86f}, {1.49f, 1.80f, -23.22f}, {1.84f, 1.80f, -23.58f},
    {2.19f, 1.80f, -23.93f}, {2.54f, 1.80f, -24.29f}, {2.89f, 1.80f, -24.65f}, {3.24f, 1.80f, -25.00f},
    {3.59f, 1.80f, -25.36f}, {3.94f, 1.80f, -25.72f}, {4.28f, 1.80f, -26.08f}, {4.63f, 1.80f, -26.43f},
    {4.98f, 1.80f, -26.79f}, {5.33f, 1.80f, -27.15f}, {5.68f, 1.80f, -27.51f}, {6.03f, 1.80f, -27.86f},
    {6.38f, 1.80f, -28.22f}, {6.73f, 1.80f, -28.58f}, {7.08f, 1.80f, -28.93f}, {7.43f, 1.80f, -29.29f},
    {7.78f, 1.80f, -29.65f}, {8.13f, 1.80f, -30.01f}, {8.48f, 1.80f, -30.36f}, {8.83f, 1.80f, -30.72f},
    {9.18f, 1.80f, -31.08f}, {9.53f, 1.80f, -31.43f}, {9.88f, 1.80f, -31.79f}, {10.23f, 1.80f, -32.15f},
    {10.58f, 1.80f, -32.51f}, {10.93f, 1.80f, -32.86f}, {11.28f, 1.80f, -33.22f}, {11.63f, 1.80f, -33.58f}
};


int cameraMode = 0; // 1 for third-person, 0 for first-person
Vector cameraOffset(0.0f, 2.0f, 5.0f);  // Camera offset for third-person view (adjust as needed)
float cameraDistance = 5.0f;  // Distance for third-person camera
struct Trap {
    float x, z;  // Position of the trap
    bool isTriggered; // Whether the trap has already been triggered
};

std::vector<Trap> traps = {
    {-10.0f, -5.0f, false},
    {5.0f, 10.0f, false},
    {-15.0f, 15.0f, false},
    {0.0f, -10.0f, false}
};
struct Collectible {
    float x, z;  // Position of the collectible
    bool isCollected; // Whether the collectible has been collected
};

std::vector<Collectible> collectibles = {
    {-10.0f, 10.0f, false},
    {5.0f, -15.0f, false},
    {0.0f, 5.0f, false},
    {12.0f, -8.0f, false}
};

bool goalVisible = false;  // To track whether the goal should be visible
float vectorLength(const Vector3f& v) {
    return sqrt(v.x * v.x + v.y * v.y + v.z * v.z);
}
float dotProduct(const Vector3f& v1, const Vector3f& v2) {
    return v1.x * v2.x + v1.y * v2.y + v1.z * v2.z;
}
Vector3f crossProduct(const Vector3f& v1, const Vector3f& v2) {
    return Vector3f(
        v1.y * v2.z - v1.z * v2.y,
        v1.z * v2.x - v1.x * v2.z,
        v1.x * v2.y - v1.y * v2.x
    );
}
bool isCollidingWithSeventhWall(Vector3f position) {
    for (size_t i = 0; i < seventhWallPoints.size() - 1; ++i) {
        Vector3f start = seventhWallPoints[i];
        Vector3f end = seventhWallPoints[i + 1];

        Vector3f wallVector = { end.x - start.x, end.y - start.y, end.z - start.z };
        Vector3f playerToStart = { position.x - start.x, position.y - start.y, position.z - start.z };

        float wallLengthSquared = wallVector.x * wallVector.x + wallVector.y * wallVector.y + wallVector.z * wallVector.z;
        float projectionFactor = (playerToStart.x * wallVector.x + playerToStart.y * wallVector.y + playerToStart.z * wallVector.z) / wallLengthSquared;

        if (projectionFactor >= 0.0f && projectionFactor <= 1.0f) {
            Vector3f closestPoint = {
                start.x + projectionFactor * wallVector.x,
                start.y + projectionFactor * wallVector.y,
                start.z + projectionFactor * wallVector.z
            };

            float distanceSquared = (position.x - closestPoint.x) * (position.x - closestPoint.x) +
                (position.y - closestPoint.y) * (position.y - closestPoint.y) +
                (position.z - closestPoint.z) * (position.z - closestPoint.z);

            float collisionThresholdSquared = 0.5f * 0.5f;
            if (distanceSquared < collisionThresholdSquared) {
                return true;
            }
        }
    }
    return false;
}



void initializeAudio() {
    static bool isInitialized = false;
    if (isInitialized) return; // Prevent reinitializing SDL_mixer
    if (SDL_Init(SDL_INIT_AUDIO) < 0) {
        printf("SDL could not initialize! SDL_Error: %s\n", SDL_GetError());
        return;
    }
    if (Mix_OpenAudio(44100, MIX_DEFAULT_FORMAT, 2, 2048) < 0) {
        printf("SDL_mixer could not initialize! SDL_mixer Error: %s\n", Mix_GetError());
        return;
    }
    isInitialized = true; // Mark as initialized
}
void cleanupAudio() {
    Mix_CloseAudio();
    SDL_Quit();
}
Mix_Music* bgMusic = nullptr;

void playBackgroundMusic(const char* path) {
    if (isMusicPlaying) return; // Prevent restarting the music
    bgMusic = Mix_LoadMUS(path);
    if (bgMusic == nullptr) {
        printf("Failed to load background music! SDL_mixer Error: %s\n", Mix_GetError());
        return;
    }
    Mix_PlayMusic(bgMusic, -1); // Loop indefinitely
    isMusicPlaying = true; // Mark music as playing
}

void stopBackgroundMusic() {
    Mix_HaltMusic();
    if (bgMusic != nullptr) {
        Mix_FreeMusic(bgMusic);
        bgMusic = nullptr;
    }
    isMusicPlaying = false; // Mark music as stopped
}
void initializeScene1Audio() {
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
    // Load card collect sound
    cardCollectSound = Mix_LoadWAV("sounds/collect.wav");
    if (!cardCollectSound) {
        printf("Failed to load card collect sound! SDL_mixer Error: %s\n", Mix_GetError());
    }

    // Load trap sound
    collisionSound = Mix_LoadWAV("sounds/trap.wav");
    if (!collisionSound) {
        printf("Failed to load trap sound! SDL_mixer Error: %s\n", Mix_GetError());
    }
    clockCollisionSound = Mix_LoadWAV("sounds/clock.wav");
    if (!clockCollisionSound) {
        printf("Failed to load trap sound! SDL_mixer Error: %s\n", Mix_GetError());
    }


    isInitialized = true;
}
bool isCollidingWithSixthWall(Vector3f position) {
    for (size_t i = 0; i < sixthWallPoints.size() - 1; ++i) {
        Vector3f start = sixthWallPoints[i];
        Vector3f end = sixthWallPoints[i + 1];

        Vector3f wallVector = { end.x - start.x, end.y - start.y, end.z - start.z };
        Vector3f playerToStart = { position.x - start.x, position.y - start.y, position.z - start.z };

        float wallLengthSquared = wallVector.x * wallVector.x + wallVector.y * wallVector.y + wallVector.z * wallVector.z;
        float projectionFactor = (playerToStart.x * wallVector.x + playerToStart.y * wallVector.y + playerToStart.z * wallVector.z) / wallLengthSquared;

        if (projectionFactor >= 0.0f && projectionFactor <= 1.0f) {
            Vector3f closestPoint = {
                start.x + projectionFactor * wallVector.x,
                start.y + projectionFactor * wallVector.y,
                start.z + projectionFactor * wallVector.z
            };

            float distanceSquared = (position.x - closestPoint.x) * (position.x - closestPoint.x) +
                (position.y - closestPoint.y) * (position.y - closestPoint.y) +
                (position.z - closestPoint.z) * (position.z - closestPoint.z);

            float collisionThresholdSquared = 0.5f * 0.5f;
            if (distanceSquared < collisionThresholdSquared) {
                return true;
            }
        }
    }
    return false;
}
bool isCollidingWithFourthWall(Vector3f position) {
    for (size_t i = 0; i < fourthWallPoints.size() - 1; ++i) {
        Vector3f start = fourthWallPoints[i];
        Vector3f end = fourthWallPoints[i + 1];

        Vector3f wallVector = { end.x - start.x, end.y - start.y, end.z - start.z };
        Vector3f playerToStart = { position.x - start.x, position.y - start.y, position.z - start.z };

        float wallLengthSquared = wallVector.x * wallVector.x + wallVector.y * wallVector.y + wallVector.z * wallVector.z;
        float projectionFactor = (playerToStart.x * wallVector.x + playerToStart.y * wallVector.y + playerToStart.z * wallVector.z) / wallLengthSquared;

        if (projectionFactor >= 0.0f && projectionFactor <= 1.0f) {
            Vector3f closestPoint = {
                start.x + projectionFactor * wallVector.x,
                start.y + projectionFactor * wallVector.y,
                start.z + projectionFactor * wallVector.z
            };

            float distanceSquared = (position.x - closestPoint.x) * (position.x - closestPoint.x) +
                (position.y - closestPoint.y) * (position.y - closestPoint.y) +
                (position.z - closestPoint.z) * (position.z - closestPoint.z);

            float collisionThresholdSquared = 0.5f * 0.5f;
            if (distanceSquared < collisionThresholdSquared) {
                return true;
            }
        }
    }
    return false;
}
bool isCollidingWithFifthWall(Vector3f position) {
    for (size_t i = 0; i < fifthWallPoints.size() - 1; ++i) {
        Vector3f start = fifthWallPoints[i];
        Vector3f end = fifthWallPoints[i + 1];

        Vector3f wallVector = { end.x - start.x, end.y - start.y, end.z - start.z };
        Vector3f playerToStart = { position.x - start.x, position.y - start.y, position.z - start.z };

        float wallLengthSquared = wallVector.x * wallVector.x + wallVector.y * wallVector.y + wallVector.z * wallVector.z;
        float projectionFactor = (playerToStart.x * wallVector.x + playerToStart.y * wallVector.y + playerToStart.z * wallVector.z) / wallLengthSquared;
        if (projectionFactor >= 0.0f && projectionFactor <= 1.0f) {
            Vector3f closestPoint = {
                start.x + projectionFactor * wallVector.x,
                start.y + projectionFactor * wallVector.y,
                start.z + projectionFactor * wallVector.z
            };

            float distanceSquared = (position.x - closestPoint.x) * (position.x - closestPoint.x) +
                (position.y - closestPoint.y) * (position.y - closestPoint.y) +
                (position.z - closestPoint.z) * (position.z - closestPoint.z);

            float collisionThresholdSquared = 0.5f * 0.5f;
            if (distanceSquared < collisionThresholdSquared) {
                return true;
            }
        }
    }
    return false;
}
bool isCollidingWithThirdWall(Vector3f position) {
    for (size_t i = 0; i < thirdWallPoints.size() - 1; ++i) {
        Vector3f start = thirdWallPoints[i];
        Vector3f end = thirdWallPoints[i + 1];

        Vector3f wallVector = { end.x - start.x, end.y - start.y, end.z - start.z };
        Vector3f playerToStart = { position.x - start.x, position.y - start.y, position.z - start.z };

        float wallLengthSquared = wallVector.x * wallVector.x + wallVector.y * wallVector.y + wallVector.z * wallVector.z;
        float projectionFactor = (playerToStart.x * wallVector.x + playerToStart.y * wallVector.y + playerToStart.z * wallVector.z) / wallLengthSquared;

        if (projectionFactor >= 0.0f && projectionFactor <= 1.0f) {
            Vector3f closestPoint = {
                start.x + projectionFactor * wallVector.x,
                start.y + projectionFactor * wallVector.y,
                start.z + projectionFactor * wallVector.z
            };

            float distanceSquared = (position.x - closestPoint.x) * (position.x - closestPoint.x) +
                (position.y - closestPoint.y) * (position.y - closestPoint.y) +
                (position.z - closestPoint.z) * (position.z - closestPoint.z);

            float collisionThresholdSquared = 0.5f * 0.5f;
            if (distanceSquared < collisionThresholdSquared) {
                return true;
            }
        }
    }
    return false;
}
bool isCollidingWithSecondWall(Vector3f position) {
    for (size_t i = 0; i < secondWallPoints.size() - 1; ++i) {
        Vector3f start = secondWallPoints[i];
        Vector3f end = secondWallPoints[i + 1];

        Vector3f wallVector = { end.x - start.x, end.y - start.y, end.z - start.z };
        Vector3f playerToStart = { position.x - start.x, position.y - start.y, position.z - start.z };

        float wallLengthSquared = wallVector.x * wallVector.x + wallVector.y * wallVector.y + wallVector.z * wallVector.z;
        float projectionFactor = (playerToStart.x * wallVector.x + playerToStart.y * wallVector.y + playerToStart.z * wallVector.z) / wallLengthSquared;

        if (projectionFactor >= 0.0f && projectionFactor <= 1.0f) {
            Vector3f closestPoint = {
                start.x + projectionFactor * wallVector.x,
                start.y + projectionFactor * wallVector.y,
                start.z + projectionFactor * wallVector.z
            };

            float distanceSquared = (position.x - closestPoint.x) * (position.x - closestPoint.x) +
                (position.y - closestPoint.y) * (position.y - closestPoint.y) +
                (position.z - closestPoint.z) * (position.z - closestPoint.z);

            float collisionThresholdSquared = 0.5f * 0.5f;
            if (distanceSquared < collisionThresholdSquared) {
                return true;
            }
        }
    }
    return false;
}

//=======================================================================
// Display Function for Scene 1
//=======================================================================
void RenderGround()
{
    glDisable(GL_LIGHTING);	// Disable lighting 

    glColor3f(0.6, 0.6, 0.6);	// Dim the ground texture a bit

    glEnable(GL_TEXTURE_2D);	// Enable 2D texturing

    glBindTexture(GL_TEXTURE_2D, tex_ground.texture[0]);	// Bind the ground texture

    glPushMatrix();
    glBegin(GL_QUADS);
    glNormal3f(0, 1, 0);	// Set quad normal direction.
    glTexCoord2f(0, 0);		// Set tex coordinates ( Using (0,0) -> (5,5) with texture wrapping set to GL_REPEAT to simulate the ground repeated grass texture).
    glVertex3f(-50, 0, -50);
    glTexCoord2f(5, 0);
    glVertex3f(50, 0, -50);
    glTexCoord2f(5, 5);
    glVertex3f(50, 0, 50);
    glTexCoord2f(0, 5);
    glVertex3f(-50, 0, 50);
    glEnd();
    glPopMatrix();

    glEnable(GL_LIGHTING);	// Enable lighting again for other entites coming throung the pipeline.

    glColor3f(1, 1, 1);	// Set material back to white instead of grey used for the ground texture.

}
bool allCardsCollected() {
    for (const Collectible& collectible : collectibles) {
        if (!collectible.isCollected) {
            return false;  // If any card is not collected, return false
        }
    }
    return true;  // All cards are collected
}

//Camera camera(playerPosition.x, 1.8f, playerPosition.y - 0.2,
// playerPosition.x, 1.8f, playerPosition.z - 1, 0.0f, 1.0f, 0.0f);


void movePlayer(char direction) {
    // Define the boundaries based on the ground and walls
    float minX = -48.0f; // Left boundary (adjusted slightly for player size)
    float maxX = 48.0f;  // Right boundary (adjusted slightly for player size)
    float minZ = -48.0f; // Back boundary (adjusted slightly for player size)
    float maxZ = 48.0f;  // Front boundary (adjusted slightly for player size)
    //printf("y rotation: %f", playerRotationY);
    float radiansY = DEG2RAD(playerRotationY);
    Vector3f forward(
        -sin(radiansY), // X-component (negative for forward movement)
        0.0f,           // Y-component (no vertical movement)
        -cos(radiansY)  // Z-component (negative for forward movement into the screen)
    );

    Vector3f right(
        cos(radiansY),  // X-component of right direction
        0.0f,           // Y remains constant
        sin(radiansY)   // Z-component of right direction
    );

    // Movement logic
    Vector3f movement(0.0f, 0.0f, 0.0f);
    // Calculate new position based on direction
    //Vector3f newPosition = playerPosition;
    switch (direction) {
    case 'w': // Move forward
        movement = forward * -player_movement_speed;
        break;
    case 's': // Move backward
        movement = forward * player_movement_speed;
        break;
    case 'a': // Move left (strafe)
        movement = right * -player_movement_speed;
        break;
    case 'd': // Move right (strafe)
        movement = right * player_movement_speed;
        break;
    }
    Vector3f newPosition = playerPosition + movement;

    // Check if the new position is within the boundaries of the ground and walls


    if (!isScene2) {
        if (newPosition.x >= minX && newPosition.x <= maxX &&
            newPosition.z >= minZ && newPosition.z <= maxZ) {
            playerPosition = newPosition;
            // Check for trap collision
            for (Trap& trap : traps) {
                float distance = sqrt(pow(newPosition.x - trap.x, 2) + pow(newPosition.z - trap.z, 2));

                if (distance < 2.0f) {  // If the player is near a trap
                    if (!trap.isTriggered) {  // Only penalize if the trap wasn't triggered already
                        printf("Player hit a trap!\n");
                        score -= 1;  // Penalize player score
                        if (collisionSound) {
                            Mix_PlayChannel(-1, collisionSound, 0);
                        }
                        trap.isTriggered = true;  // Mark trap as triggered
                    }
                }
                else {
                    trap.isTriggered = false;  // Reset the trap state when the player is away
                }
            }
            // Check for collectible collision
            for (Collectible& collectible : collectibles) {
                float distance = sqrt(pow(newPosition.x - collectible.x, 2) + pow(newPosition.z - collectible.z, 2));

                if (distance < 4.0f && !collectible.isCollected) {  // If the player is near the collectible and it hasn't been collected
                    printf("Player collected an item!\n");
                    collectible.isCollected = true;  // Mark the collectible as collected
                    score += 1;  // Increase score for collecting an item
                    if (cardCollectSound) {
                        Mix_PlayChannel(-1, cardCollectSound, 0);
                    }
                    break;
                }
            }

            // If all cards are collected, show the goal
            if (allCardsCollected()) {
                goalVisible = true;  // Make goal visible once all cards are collected
            }

            // Check for goal collision
            if (allCardsCollected()) {
                float goalDistance = sqrt(pow(newPosition.x - 0.0f, 2) + pow(newPosition.z - 10.0f, 2));  // Assume goal is at (0, 10)
                if (goalDistance < 5.0f) {  // Collision with the goal
                    printf("Goals Collected!\n");

                    // Optionally, reset or move to the next level
                    isTransitioning = true;
                    transitionStartTime = getCurrentTime(); // Record the start time of the transition
                    //playerPosition= Vector3f(12.72f, 1.8f, 18.67f);
                    playerPosition = Vector3f(12.72f, 1.8f, 18.67f);
                    playerRotationX = 0.0f;
                    playerRotationY = -140.0f;
                }
            }

            // Update the player position if within bounds
        }
    }
    else {
        if (!isCollidingWithSecondWall(newPosition) &&
            !isCollidingWithThirdWall(newPosition) && !isCollidingWithFourthWall(newPosition) &&
            !isCollidingWithFifthWall(newPosition) &&
            !isCollidingWithSixthWall(newPosition) &&
            !isCollidingWithSeventhWall(newPosition)) {
            if (checkClockCollision(newPosition)) {
                playerPosition = previousPlayerPosition; // Revert to the previous position
                score -= 1; // Penalize the player
                if (clockCollisionSound) {
                    Mix_PlayChannel(-1, clockCollisionSound, 0);
                }
                printf("Collided with a clock! Score: %d\n", score);
            }
            else {
                playerPosition = newPosition; // Update position
            }
        }
    }
    printf("Player Position: X = %.2f, Y = %.2f, Z = %.2f\n",
        playerPosition.x, playerPosition.y, playerPosition.z);
    updateCamera();
    glutPostRedisplay();

}


void renderText(float x, float y, const char* text) {
    // Save the current matrix mode and viewport
    glMatrixMode(GL_PROJECTION);
    glPushMatrix();
    glLoadIdentity();
    gluOrtho2D(0, 1024, 0, 768); // Set up an orthographic projection with the same size as your window

    glMatrixMode(GL_MODELVIEW);
    glPushMatrix();
    glLoadIdentity();
    // Set the text position based on the window size
    glRasterPos2f(x, y);

    // Render each character
    for (const char* c = text; *c != '\0'; c++) {
        glutBitmapCharacter(GLUT_BITMAP_HELVETICA_18, *c);
    }

    // Restore the matrix mode and previous state
    glPopMatrix();
    glMatrixMode(GL_PROJECTION);
    glPopMatrix();
    glMatrixMode(GL_MODELVIEW);
}

void cleanupScene1Audio() {
    if (collisionSound) {
        Mix_FreeChunk(collisionSound);
        collisionSound = nullptr;
    }
    Mix_CloseAudio();
    SDL_Quit();
}
void RenderTraps() {
    glDisable(GL_LIGHTING);  // Disable lighting for the traps

    glEnable(GL_TEXTURE_2D); // Enable 2D texturing for traps
    glBindTexture(GL_TEXTURE_2D, tex_trap.texture[0]); // Bind the trap texture

    // Loop through the trap positions and draw them
    for (const Trap& trap : traps) {
        glPushMatrix();
        glTranslatef(trap.x, 0.1f, trap.z);  // Position the trap

        glScalef(1.0f, 1.0f, 1.0f);  // Adjust the scale to match your trap texture size
        glBegin(GL_QUADS);
        glNormal3f(0, 1, 0);  // Set normal for flat ground
        glTexCoord2f(0, 0); glVertex3f(-1.0f, 0.0f, -1.0f);
        glTexCoord2f(1, 0); glVertex3f(1.0f, 0.0f, -1.0f);
        glTexCoord2f(1, 1); glVertex3f(1.0f, 0.0f, 1.0f);
        glTexCoord2f(0, 1); glVertex3f(-1.0f, 0.0f, 1.0f);
        glEnd();
        glPopMatrix();
    }

    glEnable(GL_LIGHTING);  // Re-enable lighting after rendering traps
}
void RenderCollectibles() {
    for (const Collectible& collectible : collectibles) {
        if (!collectible.isCollected) {  // Only render if not collected
            glPushMatrix();  // Save the current transformation state

            glTranslatef(collectible.x, 0.5f, collectible.z);  // Position the collectible
            glScalef(2.0f, 2.0f, 2.0f);  // Scale the collectible model to a consistent size

            // Draw the collectible model (card model in this case)
            model_card.Draw();

            glPopMatrix();  // Restore the previous transformation state
        }
    }
}

void RenderGoal() {
    if (goalVisible) {
        // Position the goal at (0, 0, 10) for example
        glPushMatrix();
        glTranslatef(0.0f, 4.0f, 10.0f);  // Goal position
        glScalef(2.0f, 2.0f, 2.0f);  // Scale the goal model if needed

        model_goal.Draw();  // Draw the goal model
        glPopMatrix();
    }
}

void RenderTrees() {
    // Define the boundaries of the scene
    float sceneMinX = -48.0f;
    float sceneMaxX = 48.0f;
    float sceneMinZ = -48.0f;
    float sceneMaxZ = 48.0f;

    float treeSpacing = 10.0f; // Spacing between trees

    // Render trees along the X-axis boundaries
    for (float x = sceneMinX; x <= sceneMaxX; x += treeSpacing) {
        // Trees along the front boundary (Max Z)
        glPushMatrix();
        glTranslatef(x, 0.0f, sceneMaxZ);
        glScalef(3.0f, 3.0f, 3.0f);
        model_tree.Draw();
        glPopMatrix();

        // Trees along the back boundary (Min Z)
        glPushMatrix();
        glTranslatef(x, 0.0f, sceneMinZ);
        glScalef(3.0f, 3.0f, 3.0f);
        model_tree.Draw();
        glPopMatrix();
    }

    // Render trees along the Z-axis boundaries
    for (float z = sceneMinZ; z <= sceneMaxZ; z += treeSpacing) {
        // Trees along the left boundary (Min X)
        glPushMatrix();
        glTranslatef(sceneMinX, 0.0f, z);
        glScalef(3.0f, 3.0f, 3.0f);
        model_tree.Draw();
        glPopMatrix();

        // Trees along the right boundary (Max X)
        glPushMatrix();
        glTranslatef(sceneMaxX, 0.0f, z);
        glScalef(3.0f, 3.0f, 3.0f);
        model_tree.Draw();
        glPopMatrix();
    }
}


void updateCamera() {
    // Convert player rotation to radians
    float radiansY = DEG2RAD(playerRotationY);

    // Calculate the forward direction based on player's rotation
    Vector3f forward(
        -sin(radiansY), // X-component of forward direction
        0.0f,           // Y-component (no vertical movement)
        -cos(radiansY)  // Z-component of forward direction
    );

    // Set camera positions based on the current view mode
    if (isFirstPerson) {
        // First-person view: Camera at player's eye level
        eye = playerPosition + Vector3f(0.0f, 3.5f, 0.0f);  // Slightly above the player's position
        center = eye - forward - Vector3f(0.0f, 0.4f, 0.0f);                     // Look directly forward

    }
    else {
        // Third-person view: Camera behind and above the player
        eye = playerPosition + forward * 5.0f + Vector3f(0.0f, 5.0f, 0.0f); // Offset backward and upward
        center = playerPosition + Vector3f(0.0f, 3.0f, 0.0f);              // Look at the player's position
    }

    // Update the view
    camera.look();
}

void drawPlayer()
{
    if (!isScene2) {
        glPushMatrix();
        glTranslatef(playerPosition.x, playerPosition.y, playerPosition.z);
        glRotatef(playerRotationY, 0.0f, 1.0f, 0.0f); // Yaw (rotate around the Y-axis)
        glRotatef(playerRotationX, 1.0f, 0.0f, 0.0f); // Pitch (rotate around the X-axis)
        glScalef(200, 200, 200);
        model_player.Draw();
        glPopMatrix();
        updateCamera();
    }
    else {
        glPushMatrix();
        glTranslatef(playerPosition.x, playerPosition.y, playerPosition.z);
        glRotatef(playerRotationY, 0.0f, 1.0f, 0.0f); // Yaw (rotate around the Y-axis)
        glRotatef(playerRotationX, 1.0f, 0.0f, 0.0f); // Pitch (rotate around the X-axis)
        glScalef(0.065f, 0.065f, 0.065f);
        model_player2.Draw();
        glPopMatrix();
        updateCamera();
    }
}

void drawSky()
{
    glPushMatrix();
    GLUquadricObj* qobj = gluNewQuadric();
    glTranslated(50, 0, 0);
    glRotated(90, 1, 0, 1);
    glBindTexture(GL_TEXTURE_2D, tex);
    gluQuadricTexture(qobj, true);
    gluQuadricNormals(qobj, GL_SMOOTH);
    gluSphere(qobj, 200, 200, 200);
    gluDeleteQuadric(qobj);
    glPopMatrix();
}

bool areAllCollectiblesCollected() {
    for (const auto& collectible : collectibles) {
        if (!collectible.isCollected) {
            return false; // If any collectible is not collected, return false
        }
    }
    return true; // All collectibles are collected
}


void myDisplayScene1(void)
{

    glClear(GL_COLOR_BUFFER_BIT | GL_DEPTH_BUFFER_BIT);

    // Check if the game is won
    if (areAllCollectiblesCollected() && areAllKeysCollected() && remainingTime > 0.0f) {
        isGameWon = true;
        glutDisplayFunc(renderGameWinScreen); // Switch to the "Game Win" screen
        return; // Prevent further rendering
    }

    // Check if the game is lost
    if (remainingTime <= 0.0f && !areAllCollectiblesCollected()) {
        isGameLost = true;
        glutDisplayFunc(renderGameLoseScreen); // Switch to the "Game Lose" screen
        return; // Prevent further rendering
    }

    GLfloat lightIntensity[] = { 0.7, 0.7, 0.7, 1.0f };
    GLfloat lightPosition[] = { 0.0f, 100.0f, 0.0f, 0.0f };
    glLightfv(GL_LIGHT0, GL_POSITION, lightPosition);
    glLightfv(GL_LIGHT0, GL_AMBIENT, lightIntensity);
    
    float currentTime = glutGet(GLUT_ELAPSED_TIME) / 1000.0f;
    float elapsedTime = currentTime - gameStartTime;
    remainingTime = totalGameTime - elapsedTime;
    displayTimer(remainingTime);

    setupCamera();
    // Draw Ground
    RenderGround();
    // Render Traps
    RenderTraps();

    // Draw Collectibles
    RenderCollectibles();

    //Render Goal
    RenderGoal();
    RenderTrees();

    // Draw player model
    drawPlayer();

    // Skybox (same for both scenes for now)
    drawSky();

    //render score text
    glColor3f(0.0f, 0.0f, 0.0f); // Set text color to white
    char scoreText[20];
    sprintf(scoreText, "Score: %d", score);
    renderText(20, 740, scoreText); // Adjusted to display at the top left
    initializeAudio();
    playBackgroundMusic("sounds/scene1.wav");

    glutSwapBuffers();
}