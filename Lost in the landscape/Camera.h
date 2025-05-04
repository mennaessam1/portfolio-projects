#pragma once
#include "Vector.h"

#ifndef M_PI
#define M_PI 3.14159265358979323846
#endif
#define DEG2RAD(a) (a * 0.0174532925)
//#include <common.h>


extern Vector3f eye, center, up;

class Camera {
public:


	Camera(float eyeX, float eyeY, float eyeZ,
		float centerX, float centerY, float centerZ,
		float upX, float upY, float upZ) {
		eye = Vector3f(eyeX, eyeY, eyeZ);
		center = Vector3f(centerX, centerY, centerZ);
		up = Vector3f(upX, upY, upZ);
	}

	void moveX(float d) {
		Vector3f right = up.cross(center - eye).unit();
		eye = eye + right * d;
		center = center + right * d;
	}

	void moveY(float d) {
		eye = eye + up.unit() * d;
		center = center + up.unit() * d;
	}

	void moveZ(float d) {
		Vector3f view = (center - eye).unit();
		eye = eye + view * d;
		center = center + view * d;
	}

	void rotateX(float a) {
		Vector3f view = (center - eye).unit();
		Vector3f right = up.cross(view).unit();
		view = view * cos(DEG2RAD(a)) + up * sin(DEG2RAD(a));
		up = view.cross(right);
		center = eye + view;
	}

	void rotateY(float a) {
		Vector3f view = (center - eye).unit();
		Vector3f right = up.cross(view).unit();
		view = view * cos(DEG2RAD(a)) + right * sin(DEG2RAD(a));
		right = view.cross(up);
		center = eye + view;
	}

	void look() {
		gluLookAt(
			eye.x, eye.y, eye.z,
			center.x, center.y, center.z,
			up.x, up.y, up.z
		);
	}
	void applyShake(float offsetX, float offsetY, float offsetZ) {
		eye.x += offsetX;
		eye.y += offsetY;
		eye.z += offsetZ;

		center.x += offsetX;
		center.y += offsetY;
		center.z += offsetZ;
	}
};

//Camera camera(passX, 1.8f, passZ - 0.2, passX, 1.8f, passZ - 1, 0.0f, 1.0f, 0.0f);
