//declaração da variável de entrada 
int digital = 7;
// maneira alternativa
//#define digital 7

void setup() {
  // iniciar a porta serial
  Serial.begin (9600);
  // declarar pin digital  como entrada
  pinMode( digital, INPUT );
  
  
}

void loop() {
  //nível lógico 0
 if (digitalRead(digital)){
   Serial.println (0);
 
 }
 else {
  //nível lógico 1
  Serial.println (1);

  
  
  
 }
delay (1000);
  

}
