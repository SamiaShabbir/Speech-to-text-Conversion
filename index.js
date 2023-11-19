<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>Speech recognition example</title>
  </head>
  <body>
    <h1>Speech recognition example</h1>
    <script>
      // Import SpeechRecognition object
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

      // Create an instance of SpeechRecognition
      const recognition = new SpeechRecognition();

      // Start recognition
      recognition.start();
    </script>
  </body>
</html>
