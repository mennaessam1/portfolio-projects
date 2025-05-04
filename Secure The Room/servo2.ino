#include <Servo.h>
Servo myservo;

void setup() {
  myservo.attach(9);
 
}

void loop() {
  int out; 
  int out2;
  out = digitalRead(8);
  out2 = digitalRead(10);
  if (out == HIGH){
    myservo.write(0); 
    
    // Rotate the servo to 180 degrees
    }// Wait for 2 seconds (adjustable)
  if (out2 == HIGH){
    myservo.write(90); 
    
    // Rotate the servo to 180 degrees
    }// Wait for 2 seconds (adjustable)
}
