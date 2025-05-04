//////////////////////////////////////////////////////////////////////
//
// OpenGL Texture Class
// by: Matthew Fairfax
//
// GLTexture.h: interface for the GLTexture class.
// This class loads a texture file and prepares it
// to be used in OpenGL. It can open a bitmap or a
// targa file. The min filter is set to mipmap b/c
// they look better and the performance cost on
// modern video cards in negligible. I leave all of
// the texture management to the application. I have
// included the ability to load the texture from a
// Visual Studio resource. The bitmap's id must be
// be surrounded by quotation marks (i.e. "Texture.bmp").
// The targa files must be in a resource type of "TGA"
// (including the quotes). The targa's id must be
// surrounded by quotation marks (i.e. "Texture.tga").
//
// Usage:
// GLTexture tex;
// GLTexture tex1;
// GLTexture tex3;
//
// tex.Load("texture.bmp"); // Loads a bitmap
// tex.Use();				// Binds the bitmap for use
// 
// tex1.LoadFromResource("texture.tga"); // Loads a targa
// tex1.Use();				 // Binds the targa for use
//
// // You can also build a texture with a single color and use it
// tex3.BuildColorTexture(255, 0, 0);	// Builds a solid red texture
// tex3.Use();				 // Binds the targa for use
//
//////////////////////////////////////////////////////////////////////

// GLTexture.h
#ifndef GLTEXTURE_H
#define GLTEXTURE_H

#include <windows.h>
#include <gl\gl.h>
#include <gl\glu.h>
#include "GLAUX.H"

class GLTexture
{
public:
    char* texturename;
    unsigned int texture[1];
    int width;
    int height;
    void Use();
    void BuildColorTexture(unsigned char r, unsigned char g, unsigned char b);
    void LoadTGAResource(char* name);
    void LoadBMPResource(char* name);
    void LoadFromResource(char* name);
    void LoadTGA(char* name);
    void LoadBMP(char* name);  // Declare, don't define
    void Load(char* name);

    GLTexture();
    virtual ~GLTexture();
};

#endif // GLTEXTURE_H
