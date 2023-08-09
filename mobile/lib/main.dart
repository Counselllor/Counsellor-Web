// import 'dart:js';
// import 'dart:js';

import 'package:app_os/login.dart';
import 'package:app_os/register.dart';
import 'package:flutter/material.dart';
void main() {
  runApp(MaterialApp(
      debugShowCheckedModeBanner: false,
      initialRoute: 'register',
    routes: {
        'register': (context)=>MyRegister(),
        'login': (context)=>MyLogin()
    },
  ));
}

