import 'package:flutter/material.dart';

enum GenderTypeEnum {Male, Female}
enum PersonTypeEnum {Counsellor, Student}

class MyRegister extends StatefulWidget {
  const MyRegister({super.key});

  @override
  State<MyRegister> createState() => _MyRegisterState();
}

class _MyRegisterState extends State<MyRegister> {
  GenderTypeEnum? _genderTypeEnum;
  PersonTypeEnum? _personTypeEnum;

  List<String> day = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25","26", "27", "28", "29", "30", "31"];
  String selectDay = "1";
  List<String> month =["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];
  String selectMonth ="January";
  List<String> year = ["1990", "1991", "1992", "1993", "1994", "1995", "1996", "1997", "1998", "1999", "2000", "2001", "2002", "2003", "2004", "2005", "2006", "2007", "2008", "2009", "2010", "2011", "2012", "2013", "2014", "2015", "2016", "2017", "2018", "2019", "2020", "2021", "2022", "2023", "2024", "2025", "2026", "2027", "2028", "2029", "2030", "2031", "2032", "2033", "2034", "2035", "2036", "2037", "2038", "2039", "2040", "2041", "2042", "2043", "2044", "2045", "2046", "2047", "2048", "2049", "2050"];
  String selectYear = "2023";
  @override

  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Stack(
          children: [
            Container(
              alignment: Alignment.center,
              margin: EdgeInsets.only(top: 84,),
              child:Column(
                children: [
                  Text("COUNSELLOR", style: TextStyle(fontSize: 25, fontWeight: FontWeight.bold, fontFamily: 'OFL'),),
                  SizedBox(
                    height: 20,
                  ),
                  Container(
                    alignment: Alignment.center,
                    child: Column(
                      children: [
                        Text("Create a new account",
                        style: TextStyle(fontSize: 20,fontWeight: FontWeight.bold,fontFamily: 'OFL'),),
                        SizedBox(
                          height: 3,
                        ),
                        Text("It's quick and easy.", style: TextStyle(fontFamily: 'OFL'),),
                      ],
                    ),
                  ),
                ],
              ),
            ),
            Container(
              margin: EdgeInsets.only(top: 200,left: 30,right: 30,),
              child: Row(
                children: [
                  Expanded(
                    child: TextFormField(
                      decoration: InputDecoration(
                        labelText: 'First name',
                        border: OutlineInputBorder(
                          borderSide:
                            BorderSide(width: 2, color: Colors.grey),
                          borderRadius: BorderRadius.circular(10),
                        ),
                      ),
                    ),
                  ),
                  SizedBox(
                    width: 20,
                  ),
                  Expanded(
                    child: TextFormField(
                      decoration: InputDecoration(
                        labelText: 'Surname',
                        border: OutlineInputBorder(
                          borderSide:
                            BorderSide(width: 2,color: Colors.grey),
                          borderRadius: BorderRadius.circular(10),
                        ),
                      ),
                    ),
                  ),
                ],
              ),
            ),
            Container(
              margin: EdgeInsets.only(top: 270,left: 30,right: 30,),
              child: Column(
                children: [
                  TextFormField(
                    decoration: InputDecoration(
                      labelText: 'Mobile number or email address',
                      border: OutlineInputBorder(),
                    ),
                  ),
                  SizedBox(
                    height: 11,
                  ),
                  TextFormField(
                    decoration: InputDecoration(
                      labelText: 'New password',
                      border: OutlineInputBorder(),
                    ),
                  ),
                ],
              ),
            ),
            Container(
              margin: EdgeInsets.only(top:420, left: 30,),
              child: Text("Date of birth ?"),
            ),
            Container(
              margin: EdgeInsets.only(top: 445, left: 30,),
              child:Row(
                children: [
                  DropdownButton(
                    value: selectDay,
                    items: day.map((day){
                      return DropdownMenuItem(
                        child: Text(day),
                        value: day,
                      );
                    }).toList(),
                    onChanged: (value){
                      setState(() {
                        selectDay=value.toString();
                      });
                    },
                  ),
                  SizedBox(
                    width: 65,
                  ),
                  DropdownButton(
                    value: selectMonth,
                    items: month.map((month){
                      return DropdownMenuItem(
                        child: Text(month),
                        value: month,
                      );
                    }).toList(),
                    onChanged: (value){
                      setState(() {
                        selectMonth=value.toString();
                      });
                    },
                  ),
                  SizedBox(
                    width: 65,
                  ),
                  DropdownButton(
                    value: selectYear,
                    items: year.map((year){
                      return DropdownMenuItem(
                        child: Text(year),
                        value: year,
                      );
                    }).toList(),
                    onChanged: (value){
                      setState(() {
                        selectYear = value.toString();
                      });
                    },
                  ),

                ],
              ),
            ),

            Container(
              margin: EdgeInsets.only(top:500, left: 30,),
              child: Text("Gender ?"),
            ),
            SingleChildScrollView(
              child: Container(
                margin: EdgeInsets.only(top: 530,left: 30,right: 30,),
                child: Row(
                  children: [
                    Expanded(
                      child: RadioListTile(value: GenderTypeEnum.Male,
                        contentPadding: EdgeInsets.all(0.0),
                        groupValue: _genderTypeEnum,
                        title: Text(GenderTypeEnum.Male.name),
                        shape: RoundedRectangleBorder(
                          side: BorderSide(width: 2, color: Colors.grey),
                          borderRadius: BorderRadius.circular(10),
                        ),
                        onChanged: (val){
                          setState(() {
                            _genderTypeEnum =val;
                          });
                        },),
                    ),
                    SizedBox(
                      width: 20,
                    ),
                    Expanded(
                      child: RadioListTile(value: GenderTypeEnum.Female,
                        contentPadding: EdgeInsets.all(0.0),
                        groupValue: _genderTypeEnum ,
                        shape: RoundedRectangleBorder(
                          side: BorderSide(width: 2, color: Colors.grey),
                          borderRadius: BorderRadius.circular(10),
                        ),
                        title: Text(GenderTypeEnum.Female.name),
                        onChanged: (val){
                          setState(() {
                            _genderTypeEnum =val;
                          });
                        },),
                    ),
                  ],
                ),
              ),
            ),
            Container(
              margin: EdgeInsets.only(top:600, left: 30,),
              child: Text("Are you Student or Counsellor ?"),
            ),
            SingleChildScrollView(
              child: Container(
                margin: EdgeInsets.only(top: 625,left: 30,right: 30,),
                child: Row(
                  children: [
                    Expanded(
                      child: RadioListTile(value: PersonTypeEnum.Counsellor,
                        contentPadding: EdgeInsets.all(0.0),
                        groupValue: _personTypeEnum,
                        title: Text(PersonTypeEnum.Counsellor.name),
                        shape: RoundedRectangleBorder(
                          side: BorderSide(width: 2, color: Colors.grey),
                          borderRadius: BorderRadius.circular(10),
                        ),
                        onChanged: (val){
                          setState(() {
                            _personTypeEnum =val;
                          });
                        },),
                    ),
                    SizedBox(
                      width: 20,
                    ),
                    Expanded(
                      child: RadioListTile(value: PersonTypeEnum.Student,
                        contentPadding: EdgeInsets.all(0.0),
                        groupValue: _personTypeEnum ,
                        shape: RoundedRectangleBorder(
                          side: BorderSide(width: 2, color: Colors.grey),
                          borderRadius: BorderRadius.circular(10),
                        ),
                        title: Text(PersonTypeEnum.Student.name),
                        onChanged: (val){
                          setState(() {
                            _personTypeEnum =val;
                          });
                        },),
                    ),
                  ],
                ),
              ),
            ),
            Container(
              alignment: Alignment.center,
              margin: EdgeInsets.only(top: 700,),
              child: Column(
                children: [
                  // SizedBox(
                  //   width: 300,
                  //   // height: 40,
                  // ),
                  SizedBox(
                    width: 180,
                    height: 40,
                    child: ElevatedButton(onPressed: (){},
                      style: ElevatedButton.styleFrom(
                        shape: RoundedRectangleBorder(
                          borderRadius: BorderRadius.circular(10),
                        ),
                      ),
                      child: Text("Sign up",style: TextStyle(fontFamily: 'OFL'),
                      ),),
                  ),
                  SizedBox(
                    height: 7,
                  ),
                  Text('Already have an account?', style: TextStyle(color: Colors.blue, fontFamily: 'OFL', fontSize: 15,),),
                ],
              ),
            ),

          ],
        ),
      ),
    );
  }
}
