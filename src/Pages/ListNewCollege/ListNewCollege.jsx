import React, { useState, useEffect } from "react";
import { auth } from "../../firebase/auth";
import { FaUser } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { ref, set, push, get } from "firebase/database";
import {
  ref as refStorage,
  uploadBytes,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { database, storage } from "../../firebase/auth";

const ListNewCollege = () => {
  const [image, setImage] = useState(null);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const [collegeInfo, setCollegeInfo] = useState({
    collegeName: "",
    collegeLocation: "",
    collegeCity: "",
    collegeState: "",
    totalNumberOfStudents: "",
    highestPackage: "",
    averagePackage: "",
    imageUrl: "",
  });

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  const [error, setError] = useState({});

  const handleCollegeInfo = (e) => {
    const { name, value } = e.target;
    setCollegeInfo((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleAddCollege = async (e) => {
    e.preventDefault();
    // Check if all fields are filled
    const {
      collegeName,
      collegeLocation,
      collegeCity,
      collegeState,
      totalNumberOfStudents,
      highestPackage,
      averagePackage,
    } = collegeInfo;
    if (
      !collegeName ||
      !collegeLocation ||
      !collegeCity ||
      !collegeState ||
      !totalNumberOfStudents ||
      !highestPackage ||
      !averagePackage
    ) {
      setError({ message: "All fields are required" });
      return;
    }
    try {
      var imageUrl_ = "";
      if (image === null) {
        console.log(collegeInfo);
        if (collegeInfo.imageUrl === "") {
          setError({ message: "Please upload an image" });
          return;
        } else {
          imageUrl_ = collegeInfo.imageUrl;
        }
      }
      if (image) {
        const imageRef = refStorage(storage, `collegeImages/${image.name}`);
        await uploadBytes(imageRef, image);
        imageUrl_ = await getDownloadURL(imageRef);
      }

      // Add college with image URL
      const userId = user.uid;
      await addCollege(userId, {
        ...collegeInfo,
        imageUrl: imageUrl_,
        id: userId,
      });

      setError({});
      alert("College added/Updated successfully!");
      navigate("/dashboard");
    } catch (error) {
      console.error("Error uploading image:", error.message);
    }
  };

  async function addCollege(userId, collegeData) {
    try {
      const userSnapshot = await get(ref(database, "users/" + userId));
      if (userSnapshot.exists()) {
        const userType = userSnapshot.val().user_type;
        console.log(userType);
        if (userType === "counsellor") {
          await set(ref(database, "colleges/" + userId), collegeData);
          console.log("College added successfully!");
        } else {
          console.log("Only counselors can add colleges.");
        }
      } else {
        console.log("User not found.");
      }
    } catch (error) {
      console.error("Error adding college:", error.message);
    }
  }

  async function readCollege(userId) {
    try {
      const collegesRef = ref(database, "colleges/" + userId);
      const collegeSnapshot = await get(collegesRef);
      if (collegeSnapshot.exists()) {
        const collegeData = collegeSnapshot.val();
        setCollegeInfo(collegeData);
        console.log("College data:", collegeData);
      } else {
        console.log("No colleges found for this user.");
      }
    } catch (error) {
      console.error("Error reading college data:", error.message);
    }
  }

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        // read
        setUser(user);
        readCollege(user.uid);
      } else if (!user) {
        navigate("/");
      }
    });
  }, []);

  return (
    <form
      className="form-container"
      onSubmit={handleAddCollege}
      style={{ height: "80vh", marginTop: "50px" }}
    >
      <div className="iconContainer">
        <input
          type="text"
          name="collegeName"
          value={collegeInfo.collegeName}
          onChange={handleCollegeInfo}
          placeholder="College Name"
          className={`firstname-text  ${error.collegeError && "inputField"}`}
          required
        />
        <FaUser className="icons" />
      </div>

      <div className="iconContainer">
        <input
          type="text"
          name="collegeLocation"
          value={collegeInfo.collegeLocation}
          onChange={handleCollegeInfo}
          placeholder="Location"
          className={`firstname-text  ${error.collegeError && "inputField"}`}
          required
        />
        <FaUser className="icons" />
      </div>

      <div className="iconContainer">
        <input
          type="text"
          name="collegeCity"
          value={collegeInfo.collegeCity}
          onChange={handleCollegeInfo}
          placeholder="City"
          className={`firstname-text  ${error.collegeError && "inputField"}`}
          required
        />
        <FaUser className="icons" />
      </div>

      <div className="iconContainer">
        <input
          type="text"
          name="collegeState"
          value={collegeInfo.collegeState}
          onChange={handleCollegeInfo}
          placeholder="State"
          className={`firstname-text  ${error.collegeError && "inputField"}`}
          required
        />
        <FaUser className="icons" />
      </div>

      <div className="iconContainer">
        <input
          type="number"
          name="totalNumberOfStudents"
          value={collegeInfo.totalNumberOfStudents}
          onChange={handleCollegeInfo}
          placeholder="Total Number of Students"
          className={`firstname-text  ${error.collegeError && "inputField"}`}
          required
        />
        <FaUser className="icons" />
      </div>

      <div className="iconContainer">
        <input
          type="number"
          name="highestPackage"
          value={collegeInfo.highestPackage}
          onChange={handleCollegeInfo}
          placeholder="Highest Package"
          className={`firstname-text  ${error.collegeError && "inputField"}`}
          required
        />
        <FaUser className="icons" />
      </div>

      <div className="iconContainer">
        <input
          type="number"
          name="averagePackage"
          value={collegeInfo.averagePackage}
          onChange={handleCollegeInfo}
          placeholder="Average Package"
          className={`firstname-text  ${error.collegeError && "inputField"}`}
          required
        />
        <FaUser className="icons" />
      </div>

      <img
        style={{ height: "120px", margin: "20px" }}
        src={collegeInfo?.imageUrl}
        alt=""
      />

      <div className="iconContainer">
        <input type="file" accept="image/*" onChange={handleImageUpload} />
      </div>

      {error.message && <p className="errorShow">{error.message}</p>}
      <button className="submit-button" type="submit">
        Add/Update College
      </button>
    </form>
  );
};

export default ListNewCollege;
