#pragma once
#include <glut.h>
#include <corecrt_math.h>
#include <iostream>


class Vector
{
public:
    GLdouble x, y, z;

    // Default constructor
    Vector() {
        x = 0;
        y = 0;
        z = 0;
    }

    // Parameterized constructor
    Vector(GLdouble _x, GLdouble _y, GLdouble _z) : x(_x), y(_y), z(_z) {}

    // Overloading the += operator to add a value to all vector coordinates
    void operator +=(float value)
    {
        x += value;
        y += value;
        z += value;
    }
};
class Vector3f {
public:
	float x, y, z;

	Vector3f(float _x = 0.0f, float _y = 0.0f, float _z = 0.0f) {
		x = _x;
		y = _y;
		z = _z;
	}

	Vector3f operator+(Vector3f& v) {
		return Vector3f(x + v.x, y + v.y, z + v.z);
	}

	Vector3f operator-(Vector3f& v) {
		return Vector3f(x - v.x, y - v.y, z - v.z);
	}

	Vector3f operator*(float n) {
		return Vector3f(x * n, y * n, z * n);
	}

	Vector3f operator/(float n) {
		return Vector3f(x / n, y / n, z / n);
	}

	Vector3f unit() {
		return *this / sqrt(x * x + y * y + z * z);
	}

	Vector3f cross(Vector3f v) {
		return Vector3f(y * v.z - z * v.y, z * v.x - x * v.z, x * v.y - y * v.x);
	}

	void print() const {
		std::cout << "Vector3f(" << x << ", " << y << ", " << z << ")" << std::endl;
	}

	Vector3f subtract(const Vector3f& other) const {
		return Vector3f(x - other.x, y - other.y, z - other.z);
	}

};





#pragma once
