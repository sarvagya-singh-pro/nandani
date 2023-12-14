import 'dart:io' as io;
import 'dart:typed_data';
import 'package:camera/camera.dart';
import 'package:http/http.dart' as http;
import 'package:flutter/material.dart';
import 'dart:convert';

Future<void> main() async {
  WidgetsFlutterBinding.ensureInitialized();

  // Obtain a list of the available cameras on the device.
  final cameras = await availableCameras();

  // Get a specific camera from the list of available cameras.
  final firstCamera = cameras.first;
  runApp(MaterialApp(debugShowCheckedModeBanner: false,
    initialRoute: '/',
      routes: {
      '/':(context)=>const Home(),
        '/Camera':(context)=>TakePictureScreen(
          // Pass the appropriate camera to the TakePictureScreen widget.
          camera: firstCamera,
        ),
        '/Comman':(context)=>const Comman(),
    },
  ));
}

class TakePictureScreenState extends State<TakePictureScreen> {
  late CameraController _controller;
  late Future<void> _initializeControllerFuture;

  @override
  void initState() {
    super.initState();
    // To display the current output from the Camera,
    // create a CameraController.
    _controller = CameraController(
      // Get a specific camera from the list of available cameras.
      widget.camera,
      // Define the resolution to use.
      ResolutionPreset.medium,
    );

    // Next, initialize the controller. This returns a Future.
    _initializeControllerFuture = _controller.initialize();
  }

  @override
  void dispose() {
    // Dispose of the controller when the widget is disposed.
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Take a picture'),
      backgroundColor:Colors.indigoAccent,),

      // You must wait until the controller is initialized before displaying the
      // camera preview. Use a FutureBuilder to display a loading spinner until the
      // controller has finished initializing.
      body: FutureBuilder<void>(
        future: _initializeControllerFuture,
        builder: (context, snapshot) {
          if (snapshot.connectionState == ConnectionState.done) {
            // If the Future is complete, display the preview.
            return CameraPreview(_controller);
          } else {
            // Otherwise, display a loading indicator.
            return const Center(child: CircularProgressIndicator());
          }
        },
      ),
      floatingActionButton: FloatingActionButton(
        // Provide an onPressed callback.
        onPressed: () async {
          // Take the Picture in a try / catch block. If anything goes wrong,
          // catch the error.
          try {
            // Ensure that the camera is initialized.
            await _initializeControllerFuture;

            // Attempt to take a picture and get the file `image`
            // where it was saved.
            final image = await _controller.takePicture();

            if (!mounted) return;

            // If the picture was taken, display it on a new screen.
            await Navigator.of(context).push(
              MaterialPageRoute(
                builder: (context) => DisplayPictureScreen(
                  // Pass the automatically generated path to
                  // the DisplayPictureScreen widget.
                  imagePath: image.path,
                ),
              ),
            );
          } catch (e) {
            // If an error occurs, log the error to the console.
            print(e);
          }
        },
        child: const Icon(Icons.camera_alt),
      ),
    );
  }
}

class TakePictureScreen extends StatefulWidget {
  const TakePictureScreen({
    super.key,
    required this.camera,
  });

  final CameraDescription camera;

  @override
  TakePictureScreenState createState() => TakePictureScreenState();
}
class DisplayPictureScreen extends StatefulWidget {
  final String imagePath;

  const DisplayPictureScreen({Key? key, required this.imagePath}) : super(key: key);

  @override
  _DisplayPictureScreenState createState() => _DisplayPictureScreenState();
}
class _DisplayPictureScreenState extends State<DisplayPictureScreen>  {
  String lumpy="";

  @override
  Widget build(BuildContext context) {

    return Scaffold(
      appBar: AppBar(title: const Text('Display the Picture')),
      // The image is stored as a file on the device. Use the `Image.file`
      // constructor with the given path to display the image.
      body:
      Column(
          children: <Widget>[Image.file(io.File(widget.imagePath)),  TextButton(
            onPressed: () async{
              var val= http.MultipartRequest("POST",Uri.parse("http://65cb-34-122-79-172.ngrok.io/image"));
              val.files.add(await http.MultipartFile.fromPath('file', widget.imagePath));
              try{
                var response = await val.send();
                if (response.statusCode == 200) {
                  print('Image sent successfully');
                  var res= json.decode(await response.stream.bytesToString())["predictions"][0][0]*100;

                  setState(() {.


                    lumpy = 'Lumpy: ${res.toStringAsFixed(2)} % ';
                  });
                } else {
                  print('Failed to send image. Status code: ${response.statusCode}');
                }
              }
              catch(e){
                print(e);
              }

              },
          style: ButtonStyle(backgroundColor: MaterialStateProperty.all<Color>(Colors.indigoAccent)),
              child: const Text("check for disease",style: TextStyle(color: Colors.white),),),Text(lumpy)]));

  }
}

class Comman extends StatelessWidget{
  const Comman({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        backgroundColor:Colors.indigoAccent,
        title: Row(children:<Widget>[Text("Comman Disease")]),
      ),
      body: SingleChildScrollView(child: Column( children:<Widget>[Container(
        alignment: Alignment.topCenter,
        /** Card Widget **/
        child:new SingleChildScrollView(child: Padding(
          padding: const EdgeInsets.all(8.0),
          child: Card(
            elevation: 50,
            shadowColor: Colors.black,
            color: Colors.white,
            child: SizedBox(
              width: 600,
              height: 370,
              child:  Padding(
                padding: const EdgeInsets.all(20.0),
                child: Column(
                  children: [
                      Image(image:NetworkImage("https://i.ibb.co/0JfzjWR/download.jpg")),
                     const SizedBox(
                      height: 10,
                    ), //SizedBox
                    Text(
                      'Foot Rot',
                      style: TextStyle(
                        fontSize: 30,
                        color: Colors.green[900],
                        fontWeight: FontWeight.w500,
                      ), //Textstyle
                    ), //Text
                    const SizedBox(
                      height: 10,
                    ), //SizedBox
                    const Text(
                      'Foot Rot',
                      style: TextStyle(
                        fontSize: 15,
                        color: Colors.green,
                      ), //Textstyle
                    ), //Text
                    const SizedBox(
                      height: 10,
                    ), //SizedBox
                    SizedBox(
                      width: 100,

                      child: ElevatedButton(
                        onPressed: () => 'Null',
                        style: ButtonStyle(
                            backgroundColor:
                            MaterialStateProperty.all(Colors.green)),
                        child: Padding(
                          padding: const EdgeInsets.all(4),
                          child: Row(
                            children: const [
                              Icon(Icons.touch_app),
                              Text('Visit')
                            ],
                          ),
                        ),
                      ),
                      // RaisedButton is deprecated and should not be used
                      // Use ElevatedButton instead

                      // child: RaisedButton(
                      //   onPressed: () => null,
                      //   color: Colors.green,
                      //   child: Padding(
                      //     padding: const EdgeInsets.all(4.0),
                      //     child: Row(
                      //       children: const [
                      //         Icon(Icons.touch_app),
                      //         Text('Visit'),
                      //       ],
                      //     ), //Row
                      //   ), //Padding
                      // ), //RaisedButton
                    ) //SizedBox
                  ],
                ), //Column
              ), //Padding
            ), //SizedBox
          ),
        ),), //Card
      ), Padding(
        padding: const EdgeInsets.all(8.0),
        child: Card(
          elevation: 50,
          shadowColor: Colors.black,
          color: Colors.white,
          child: SizedBox(
            width: 600,
            height: 370,
            child:  Padding(
              padding: const EdgeInsets.all(20.0),
              child: Column(
                children: [
                  Image(image:const NetworkImage("https://i.ibb.co/0JfzjWR/download.jpg")),
                  const SizedBox(
                    height: 10,
                  ), //SizedBox
                  Text(
                    'Blackleg',
                    style: TextStyle(
                      fontSize: 30,
                      color: Colors.green[900],
                      fontWeight: FontWeight.w500,
                    ), //Textstyle
                  ), //Text
                  const SizedBox(
                    height: 10,
                  ), //SizedBox
                  const Text(
                    'Blackleg',
                    style: TextStyle(
                      fontSize: 15,
                      color: Colors.green,
                    ), //Textstyle
                  ), //Text
                  const SizedBox(
                    height: 10,
                  ), //SizedBox
                  SizedBox(
                    width: 100,

                    child: ElevatedButton(
                      onPressed: () => 'Null',
                      style: ButtonStyle(
                          backgroundColor:
                          MaterialStateProperty.all(Colors.green)),
                      child: Padding(
                        padding: const EdgeInsets.all(4),
                        child: Row(
                          children: const [
                            Icon(Icons.touch_app),
                            Text('Visit')
                          ],
                        ),
                      ),
                    ),
                    // RaisedButton is deprecated and should not be used
                    // Use ElevatedButton instead

                    // child: RaisedButton(
                    //   onPressed: () => null,
                    //   color: Colors.green,
                    //   child: Padding(
                    //     padding: const EdgeInsets.all(4.0),
                    //     child: Row(
                    //       children: const [
                    //         Icon(Icons.touch_app),
                    //         Text('Visit'),
                    //       ],
                    //     ), //Row
                    //   ), //Padding
                    // ), //RaisedButton
                  ) //SizedBox
                ],
              ), //Column
            ), //Padding
          ), //SizedBox
        ),
      ),
        Padding(
          padding: const EdgeInsets.all(8.0),
          child: Card(
            elevation: 50,
            shadowColor: Colors.black,
            color: Colors.white,
            child: SizedBox(
              width: 600,
              height: 370,
              child:  Padding(
                padding: const EdgeInsets.all(20.0),
                child: Column(
                  children: [
                    Image(image:const NetworkImage("https://i.ibb.co/0JfzjWR/download.jpg")),
                    const SizedBox(
                      height: 10,
                    ), //SizedBox
                    Text(
                      'Pneumonia',
                      style: TextStyle(
                        fontSize: 30,
                        color: Colors.green[900],
                        fontWeight: FontWeight.w500,
                      ), //Textstyle
                    ), //Text
                    const SizedBox(
                      height: 10,
                    ), //SizedBox
                    const Text(
                      'Pneumonia',
                      style: TextStyle(
                        fontSize: 15,
                        color: Colors.green,
                      ), //Textstyle
                    ), //Text
                    const SizedBox(
                      height: 10,
                    ), //SizedBox
                    SizedBox(
                      width: 100,

                      child: ElevatedButton(
                        onPressed: () => 'Null',
                        style: ButtonStyle(
                            backgroundColor:
                            MaterialStateProperty.all(Colors.green)),
                        child: Padding(
                          padding: const EdgeInsets.all(4),
                          child: Row(
                            children: const [
                              Icon(Icons.touch_app),
                              Text('Visit')
                            ],
                          ),
                        ),
                      ),
                      // RaisedButton is deprecated and should not be used
                      // Use ElevatedButton instead

                      // child: RaisedButton(
                      //   onPressed: () => null,
                      //   color: Colors.green,
                      //   child: Padding(
                      //     padding: const EdgeInsets.all(4.0),
                      //     child: Row(
                      //       children: const [
                      //         Icon(Icons.touch_app),
                      //         Text('Visit'),
                      //       ],
                      //     ), //Row
                      //   ), //Padding
                      // ), //RaisedButton
                    ) //SizedBox
                  ],
                ), //Column
              ), //Padding
            ), //SizedBox
          ),
        )
      ]),),
    );
  }
  }

class Video extends StatelessWidget{
  const Video({super.key});
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        centerTitle: true,
        title: Text('Hello'),
      )

    );
  }
}

class Home extends StatelessWidget {
  const Home({super.key});

  @override
  Widget build(BuildContext context) {
    return  Scaffold(
      appBar: AppBar(
        title: const Text("Nandani"),
        backgroundColor: Colors.indigoAccent,
        centerTitle: true,
      ),
      body: Center(
        child: Container(

          child: Column(
            children: <Widget>[Padding(padding: const EdgeInsets.all(15.0),child:Container(
              width: 200,

              color: Colors.red,
              child:
            TextButton(
                onPressed: (){
                  Navigator.pushNamed(context, '/Camera');
                },

              style: ButtonStyle(backgroundColor: MaterialStateProperty.all(Colors.red)),

                child: const Text("Lumpy Detector",

                style: TextStyle(color: Colors.white,fontSize: 20,height: 2,),),  ),),),Padding(padding: const EdgeInsets.all(15.0),child:Container(
              width: 200,

              color: Colors.red,
              child:
              TextButton(
                onPressed: (){ Navigator.pushNamed(context, '/Comman'); },

                style: ButtonStyle(backgroundColor: MaterialStateProperty.all(Colors.green)),

                child: const Text("Comman Diseases",

                  style: TextStyle(color: Colors.white,fontSize: 20,height: 2,),),  ),),),Padding(padding: const EdgeInsets.all(15.0),child:Container(
              width: 200,

              color: Colors.red,
              child:
              TextButton(
                onPressed: (){print("ok");},

                style: ButtonStyle(backgroundColor: MaterialStateProperty.all(Colors.deepPurple)),

                child: const Text("Video Call A Vet",

                  style: TextStyle(color: Colors.white,fontSize: 20,height: 2,),),  ),),)],
          ),
        ),
      ),
    );
  }
}
