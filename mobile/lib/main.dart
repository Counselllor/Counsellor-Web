// import 'dart:js';
import 'package:app_os/login.dart';
import 'package:flutter/material.dart';
void main() {
  runApp(MaterialApp(
      debugShowCheckedModeBanner: false,
      initialRoute: 'login',
    routes: {
        'login': (context)=>MyLogin()
    },
  ));
}

