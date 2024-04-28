// Define the pins for the IR sensors
const int irSensorPin1 = 10;
const int irSensorPin2 = 9;

// Define the pins for the LEDs
const int ledPin1 = 13;
const int ledPin2 = 12;

void setup() {
  pinMode(irSensorPin1, INPUT);
  pinMode(irSensorPin2, INPUT);
  pinMode(ledPin1, OUTPUT);
  pinMode(ledPin2, OUTPUT);
  
  digitalWrite(ledPin1, LOW); // Ensure LED 1 is initially off
  digitalWrite(ledPin2, LOW); // Ensure LED 2 is initially off
  
  Serial.begin(9600);
}

void loop() {
  // Read the state of the first IR sensor
  int irSensorState1 = digitalRead(irSensorPin1);
  // Read the state of the second IR sensor
  int irSensorState2 = digitalRead(irSensorPin2);
  
  // Check if both IR sensors detect an object
  if (irSensorState1 == HIGH && irSensorState2 == HIGH) {
    digitalWrite(ledPin1, HIGH); // Turn on the first LED
    digitalWrite(ledPin2, HIGH); // Turn on the second LED
    Serial.println("Object detected by both sensors");
  } else {
    // Check if the first IR sensor detects an object
    if (irSensorState1 == HIGH) {
      digitalWrite(ledPin1, HIGH); // Turn on the first LED
      digitalWrite(ledPin2, LOW);  // Turn off the second LED
      Serial.println("Object detected by Sensor 1");
    } else {
      digitalWrite(ledPin1, LOW); // Turn off the first LED
    }
    
    // Check if the second IR sensor detects an object
    if (irSensorState2 == HIGH) {
      digitalWrite(ledPin2, HIGH); // Turn on the second LED
      digitalWrite(ledPin1, LOW);  // Turn off the first LED
      Serial.println("Object detected by Sensor 2");
    } else {
      digitalWrite(ledPin2, LOW); // Turn off the second LED
    }
  }
  
  delay(100); // Adjust the delay as needed
}
