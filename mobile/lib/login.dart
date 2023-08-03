import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';

class MyLogin extends StatefulWidget {
  const MyLogin({super.key});

  @override
  State<MyLogin> createState() => _MyLoginState();
}

class _MyLoginState extends State<MyLogin> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Stack(
          children: [
            Column(
              children: [
                Container(
                  alignment: Alignment.center,
                  margin: EdgeInsets.only(top: 84,),
                  child:Column(
                    children: [
                      Text("COUNSELLOR", style: TextStyle(fontSize: 25, fontWeight: FontWeight.bold, fontFamily: 'OFL'),),
                    ],
                  ),
                ),
                SizedBox(
                  height: 40,
                ),
                Container(
                  alignment: Alignment.center,
                  // padding: EdgeInsets.only(top: MediaQuery.of(context).size.height*0.5),
                  // margin: EdgeInsets.only(top: 105,),
                  //   top: MediaQuery.of(context).size.height * 0.5),
                  child: Column(
                    // crossAxisAlignment: CrossAxisAlignment.center,
                    // mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      Text('Log in to your account', style: TextStyle(fontSize: 20,fontWeight: FontWeight.bold,fontFamily: 'OFL'),),
                      SizedBox(
                        // height: 8,
                      ),
                      SizedBox(
                        width: 340,
                        child: ElevatedButton.icon(onPressed: (){},
                          icon: Icon(Icons.g_mobiledata_sharp),
                          label: Text('Login with Google',style: TextStyle(
                            color: Colors.blue,
                            fontFamily: 'OFL',
                          ),),
                          style: ElevatedButton.styleFrom(
                            backgroundColor: Color.fromRGBO(255, 255, 255, 1),
                            side: BorderSide(
                              color: Colors.blue,
                            ),
                          ),
                        ),
                      ),
                    ],
                  ),
                ),
              ],
            ),
            SingleChildScrollView(
              child:Stack(
                children:<Widget> [
                  Container(
                    margin: EdgeInsets.only(top: 250,left: 30,right: 30,),
                    child: Column(
                      // mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        TextFormField(
                          // initialValue: 'Input text',
                          decoration: InputDecoration(
                            labelText: 'E-Mail',
                            hintText: "Enter Email",
                            // errorText: 'Error message',
                            border: OutlineInputBorder(),
                          ),
                        ),
                        SizedBox(
                          height: 20,
                        ),
                        TextFormField(
                          // initialValue: 'Input text',
                          obscureText: true,
                          decoration: InputDecoration(
                            labelText: 'Password',
                            hintText: "Enter Password",
                            // errorText: 'Error message',
                            border: OutlineInputBorder(),
                          ),
                        ),
                      ],
                    ),
                  ),
                  Container(
                    margin: EdgeInsets.only(top: 390,left: 15,),
                    child: Row(
                      children:<Widget> [
                        IconButton(onPressed: (){}, icon: Icon(Icons.check_box_outline_blank)),
                        Text("Remember Me",style: (TextStyle(
                          fontSize: 17,
                          color: Colors.black87,
                          fontFamily: 'OFL',
                        )),),
                      ],
                    ),
                  ),
                  Container(
                    alignment: Alignment.center,
                    margin: EdgeInsets.only(top: 440,),
                    child: Column(
                      // mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        SizedBox(
                          width: 340,
                            height: 40,
                            child: ElevatedButton(onPressed: (){}, child: Text("Log In", style: TextStyle(fontFamily: 'OFL',),))),
                        SizedBox(
                          height: 10,
                        ),
                        Text(
                          'Forgot Your Password?',
                          style: TextStyle(
                            color: Colors.blue,
                            fontFamily: 'OFL',
                            fontSize: 15,
                          ),
                        ),
                        SizedBox(
                          height: 40,
                        ),
                        Text("Get the app",style: TextStyle(
                          fontSize: 15,
                          fontFamily: 'OFL',
                        ),),
                      ],
                    ),
                  ),
                  Container(
                    child: Row(
                      crossAxisAlignment: CrossAxisAlignment.center,
                      children: [
                        Container(
                          width: 180,
                          height: 100,
                          // alignment: Alignment.centerLeft,
                          margin: EdgeInsets.only(left: 34,top: 540),
                          // padding: EdgeInsets.only(right: 30, left: 30,),
                          decoration: BoxDecoration(
                              // shape: BoxShape.circle,
                              image: DecorationImage(
                                image: AssetImage('assets/img.png'),
                                // fit: BoxFit.cover,
                              )
                          ),
                        ),
                        Container(
                          width: 136,
                          height: 130,
                          // alignment: Alignment.centerLeft,
                          margin: EdgeInsets.only(top: 540,),
                          // padding: EdgeInsets.only(right: 30, left: 30,),
                          decoration: BoxDecoration(
                            // shape: BoxShape.circle,
                              image: DecorationImage(
                                image: AssetImage('assets/img_1.png'),
                                // fit: BoxFit.cover,
                              )
                          ),
                        ),
                      ],
                    ),
                  ),
                ],
              ),

            ),
          ],
        ),
      ),
    );
  }
}
