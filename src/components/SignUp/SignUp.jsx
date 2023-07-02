import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import meeting from "../../assets/meeting.png";
import "./Signup.css";
import {
  HStack,
  VStack,
  Grid,
  GridItem,
  Stack,
  Heading,
  Input,
  FormControl,
  FormLabel,
  FormHelperText,
  RadioGroup,
  Radio,
  Button,
  Text,
} from "@chakra-ui/react";

const SignUpForm = () => {
  const [firstName, setFirstName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [error, seterror] = useState("");

  let navigate = useNavigate();
  function handleSubmit(e) {
    e.preventDefault();

    if (firstName === "") {
      seterror("**First Name is Required!");
    } else if (surname === "") {
      seterror("**Surname is Required!");
    } else if (email === "") {
      seterror("**Email is Required!");
    } else if (password === "") {
      seterror("**Password is Required!");
    } else if (dob === "") {
      seterror("**D.O.B is Required!");
    } else if (gender === "") {
      seterror("**Select Gender!");
    } else {
      console.log("First name:", firstName);
      console.log("Surname:", surname);
      console.log("Email address:", email);
      console.log("Password:", password);
      console.log("DOB:", dob);
      console.log("Gender:", gender);
      seterror("");
      PostData();
      navigate("/");
    }
  }

  const PostData = () => {
    if (
      !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        email
      )
    ) {
      console.log({ html: "Invalid Email", classes: "#d32f2f red darken-2" });
      return;
    }
    fetch("http://localhost:4000/signup", {
      method: "post",
      "Access-Control-Allow-Origin": "http://localhost:4000/signup",
      headers: {
        "Content-Type": "application/json",
        // 'Access-Control-Allow-Origin': '/api/signup',
        "Access-Control-Allow-Origin": "http://localhost:4000/signup",
      },
      body: JSON.stringify({
        fname: firstName,
        lname: surname,
        email,
        date: dob,
        gender,
        sc,
        password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          console.log({ html: data.error, classes: "#d32f2f red darken-2" });
        } else {
          // console.log({html: data.message, classes:"#43a047 green darken-1"})
          console.log(data);
          navigate("/signin");
        }
      });
  };

  return (
    // <div className="signup-container">
    //   <div className="parent">
    //     <div className="left">
    //       <img src={meeting} alt="meeting" />
    //       <p className="left-text">Still Confused with College Choice?</p>
    //     </div>
    //     <div className="right">
    //     <h1 className="counsellor">Counsellor</h1>
    //       <div className="signuptxt">Create a new account</div>
    //       <div className="signuptxt2">It's quick and easy.</div>

    //       <form className="form-container" onSubmit={handleSubmit}>
    //         <div className="errorShow"> {error && <p>{error}</p>}</div>

    //         <div className="name">
    //           <input
    //             type="text"
    //             value={firstName}
    //             onChange={(e) => setFirstName(e.target.value)}
    //             placeholder="First name"
    //             className={`firstname-text  ${
    //               error === "**First Name is Required!" && "inputField"
    //             }`}
    //           />

    //           <input
    //             type="text"
    //             value={surname}
    //             onChange={(e) => setSurname(e.target.value)}
    //             placeholder="Surname"
    //             className={`surname-text  ${
    //               error === "**Surname is Required!" && "inputField"
    //             }`}
    //           />
    //         </div>

    //         <input
    //           type="email"
    //           value={email}
    //           onChange={(e) => setEmail(e.target.value)}
    //           placeholder="Email address"
    //           className={error === "**Email is Required!" && "inputField"}
    //         />

    //         <input
    //           type="password"
    //           value={password}
    //           onChange={(e) => setPassword(e.target.value)}
    //           placeholder="New password"
    //           className={`password-text  ${
    //             error === "**Password is Required!" && "inputField"
    //           }`}
    //         />

    //         <label htmlFor="date-of-birth">Date of birth</label>
    //         <input
    //           type="date"
    //           value={dob}
    //           onChange={(e) => setDob(e.target.value)}
    //           className={`dob  ${
    //             error === "**D.O.B is Required!" && "inputField"
    //           }`}
    //         />

    //         <select
    //           type="gender"
    //           value={gender}
    //           onChange={(e) => setGender(e.target.value)}
    //           className={error === "**Select Gender!" && "inputField"}
    //         >
    //           <option value="">Select Gender</option>
    //           <option value="Male">Male</option>
    //           <option value="Female">Female</option>
    //           <option value="Other">Other</option>
    //         </select>

    //         <label htmlFor="student-or-counsellor">
    //           Are you Student or Counsellor ?{" "}
    //         </label>
    //         <div className="name soc">
    //           <span htmlFor="student-option">
    //             Student
    //             <input
    //               type="radio"
    //               class="student-option"
    //               name="student"
    //               value="1"
    //               id=""
    //             ></input>
    //           </span>

    //           <span htmlFor="counsellor-option">
    //             Counsellor
    //             <input
    //               type="radio"
    //               class="counsellor-option"
    //               name="Counsellor"
    //               value="2"
    //               id=""
    //             ></input>
    //           </span>
    //         </div>
    //         <div className="btn">
    //           <button type="submit" className="submit-button">
    //             Sign Up
    //           </button>
    //           <div className="already-account">
    //             <Link to="/login">Already have an account?</Link>
    //           </div>
    //         </div>
    //       </form>
    //     </div>
    //   </div>
    // </div>

    // -----------------------------------CHANGES-----------------------------------

    <>
      <Grid
        templateColumns="repeat(2, 1fr)"
        className="wrapper signup-container"
      >
        <GridItem
          w="100%"
          h="100vh"
          bg="blue.500"
          overflow={"hidden"}
          className="wrapper__one"
        >
          <VStack h={"full"} overflow={"hidden"} justifyContent={"center"}>
            <img src={meeting} width={"350px"} />
            <Heading as="h2" size="2xl" color={"white"}>
              Still Confused with College Choice?
            </Heading>
          </VStack>
        </GridItem>
        <GridItem w="100%" h="100vh" bg="white" className="wrapper__two">
          <VStack
            h={"full"}
            overflow={"hidden"}
            justifyContent={"start"}
            py={"19.5"}
          >
            <Heading
              as="h2"
              size="2xl"
              color={"black"}
              textTransform={"uppercase"}
            >
              Counsellor
            </Heading>
            <Heading as="h2" size="lg" color={"black"} pt={"5"}>
              Create a new account
            </Heading>
            <Heading as="h2" size="md" color={"gray.400"}>
              It's quick and easy
            </Heading>

            <VStack h={"full"} overflow={"hidden"} w={"full"}>
              <form
                style={{
                  width: "100%",
                  height: "100%",
                  justifyContent: "center",
                }}
              >
                <Stack rowGap={"5"}>
                  <Stack flexDirection={"row"}>
                    <FormControl>
                      <FormLabel>First name</FormLabel>
                      <Input
                        type="text"
                        size={"lg"}
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                      />
                    </FormControl>
                    <FormControl>
                      <FormLabel>Surname</FormLabel>
                      <Input
                        type="text"
                        size={"lg"}
                        value={surname}
                        onChange={(e) => setSurname(e.target.value)}
                      />
                    </FormControl>
                  </Stack>

                  <Stack>
                    <FormControl>
                      <FormLabel>Email</FormLabel>
                      <Input
                        type="email"
                        size={"lg"}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </FormControl>
                  </Stack>

                  <Stack>
                    <FormControl>
                      <FormLabel>Password</FormLabel>
                      <Input
                        type="password"
                        size={"lg"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </FormControl>
                  </Stack>
                  <Stack>
                    <FormControl>
                      <FormLabel>Date of birth</FormLabel>
                      <Input
                        type="date"
                        size={"lg"}
                        value={dob}
                        onChange={(e) => setDob(e.target.value)}
                      />
                    </FormControl>
                  </Stack>

                  <Stack>
                    <FormControl>
                      <FormLabel as="legend">Gender?</FormLabel>
                      <RadioGroup
                        defaultValue="Itachi"
                        value={gender}
                        onChange={(e) => setGender(e.target.value)}
                      >
                        <HStack overflow={"hidden"} columnGap={"5"}>
                          <Radio value="Male" size={"lg"}>
                            Male
                          </Radio>
                          <Radio value="Female" size={"lg"}>
                            Female
                          </Radio>
                        </HStack>
                      </RadioGroup>
                    </FormControl>
                  </Stack>

                  <Stack>
                    <FormControl>
                      <FormLabel as="legend">
                        Are you a Student or Counsellor?
                      </FormLabel>
                      <RadioGroup defaultValue="Itachi">
                        <HStack overflow={"hidden"} columnGap={"5"}>
                          <Radio value="1" name="Student" size={"lg"}>
                            Student
                          </Radio>
                          <Radio value="2" size={"lg"} name="Counsellor">
                            Counsellor
                          </Radio>
                        </HStack>
                      </RadioGroup>
                    </FormControl>
                  </Stack>

                  <Stack textAlign={"center"}>
                    <Button colorScheme="blue" size="lg" type="button">
                      Sign up
                    </Button>

                    <Button
                      colorScheme="blue"
                      size="lg"
                      variant={"unstyled"}
                      fontWeight={"thin"}
                      color={"blue"}
                      type="button"
                    >
                      <Link to={"/login"}>Already have an account?</Link>
                    </Button>
                  </Stack>
                </Stack>
              </form>
            </VStack>
          </VStack>
        </GridItem>
      </Grid>
    </>
  );
};

export default SignUpForm;
