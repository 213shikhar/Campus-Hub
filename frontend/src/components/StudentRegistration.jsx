import React from 'react'

const StudentRegistration = () => {
  return (
    <div>
      <h3>Student Registration</h3><br/>
    <form>
        {/* ================= PERSONAL DETAILS ================= */}
        
        <p style={{fontSize:'large'}}>Personal Details</p><br/>

        <label htmlFor="firstName">First Name</label>
        <input type="text" name="firstName" id="firstName" />
        <br/>
          
        <label htmlFor="middleName">Middle Name</label>
        <input type="text" name="middleName" id="middleName" />
        <br/>
          
        <label htmlFor="lastName">Last Name</label>
        <input type="text" name="lastName" id="lastName" />
        <br/>
          
        <label htmlFor="dob">Date of Birth</label>
        <input type="date" name="dob" id="dob" />
        <br/>
          
        <label htmlFor="gender">Gender</label>
        <select name="gender" id="gender">
          <option value=""> -- select gender -- </option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
          <option value="preferNotToSay">Prefer not to say</option>
        </select>
        <br/>
          
        <label htmlFor="bloodGroup">Blood Group</label>
        <input type="text" name="bloodGroup" id="bloodGroup" />
        <br/>
          
        <label htmlFor="nationality">Nationality</label>
        <input type="text" name="nationality" id="nationality" />
        <br/>
          
        <label htmlFor="religion">Religion</label>
        <input type="text" name="religion" id="religion" />
        <br/>
          
        <label htmlFor="category">Category</label>
        <select name="category" id="category">
          <option value=""> -- select category -- </option>
          <option value="general">General</option>
          <option value="sc/st">SC/ST</option>
          <option value="obc">OBC</option>
          <option value="other">Other</option>
          <option value="preferNotToSay">Prefer Not To Say</option>
        </select>
        <br/>
          
        <label htmlFor="motherTongue">Mother Tongue: </label>
        <input type="text" name="motherTongue" id="motherTongue" />
        <br/>
          
        <label htmlFor="adhaar">Aadhaar ID: </label>
        <input type="text" name="adhaar" id="adhaar" />
        <br/>
          
        <label htmlFor="disabilityStatus">Disability: </label>
        <select name="disabilityStatus" id="disabilityStatus">
          <option value=""> -- select option -- </option>
          <option value="no">No</option>
          <option value="yes">Yes</option>
        </select>
        <br/>

        <label htmlFor="disabilityType">Type of Disability (if yes): </label>
        <input type="text" name="disabilityType" id="disabilityType" />
        <br/>

        {/* ================= ACADEMIC DETAILS ================= */}
        <br/>
        
        <p style={{fontSize:'large'}}>Academic Details</p><br/>

        <p>Class 10th</p><br/>
        <label htmlFor="passout_10th">Passout Year: </label>
        <input type="number" name="passout_10th" id="passout_10th" />
        <br/>
        
        <label htmlFor="board10th">Board: </label>
        <select name="board10th" id="board10th">
          <option value=""> -- select board -- </option>
          <option value="cbse">CBSE</option>
          <option value="icse">ICSE</option>
          <option value="ssc">SSC</option>
          <option value="state_board_up">State Board: UP</option>
          <option value="state_board_uk">State Board: UK</option>
        </select>
        <br/>
        
        <label htmlFor="max_marks10th">Max Marks: </label>
        <input type="number" name="max_marks10th" id="max_marks10th" />
        <br/>

        <label htmlFor="score10th">Marks Obtained: </label>
        <input type="number" name="score10th" id="score10th" />
        <br/>

        <label htmlFor="perc10th">Percentage Obtained: </label>
        <input type="number" name="perc10th" id="perc10th" />
        <br/>
        
        <label htmlFor="result10th">Result: </label>
          <select name="result10th" id='result10th' >
            <option value=""> -- select result -- </option>
            <option value="passed">Passed</option>
            <option value="failed">Failed</option>
            <option value="promoted">Promoted</option>
          </select>
        <br/><br/>
        
        <p>Class 12th</p><br/>
        <label htmlFor="passout_12th">Passout Year: </label>
        <input type="number" name="passout_12th" id="passout_12th" />
        <br/>
        
        <label htmlFor="board12th">Board: </label>
        <select name="board12th" id="board12th">
          <option value=""> -- select board -- </option>
          <option value="cbse">CBSE</option>
          <option value="icse">ICSE</option>
          <option value="ssc">SSC</option>
          <option value="state_board_up">State Board: UP</option>
          <option value="state_board_uk">State Board: UK</option>
        </select>
        <br/>
        
        <label htmlFor="max_marks12th">Max Marks: </label>
        <input type="number" name="max_marks12th" id="max_marks12th" />
        <br/>

        <label htmlFor="score12th">Marks Obtained: </label>
        <input type="number" name="score12th" id="score12th" />
        <br/>

        <label htmlFor="perc12th">Percentage Obtained: </label>
        <input type="number" name="perc12th" id="perc12th" />
        <br/>
        
        <label htmlFor="result12th">Result: </label>
          <select name="result12th" id='result12th' >
            <option value=""> -- select result -- </option>
            <option value="passed">Passed</option>
            <option value="failed">Failed</option>
            <option value="promoted">Promoted</option>
          </select>
        <br/>

        <br/>
        {/* ================= CONTACT DETAILS ================= */}
        <br/>
        
        <p style={{fontSize:'large'}}>Contact & Address Details</p><br/>

        <label htmlFor="addressLine1">Address Line 1: </label>
        <input type="text" name="addressLine1" id="addressLine1" />
        <br/>

        <label htmlFor="addressLine2">Address Line 2: </label>
        <input type="text" name="addressLine2" id="addressLine2" />
        <br/>

        <label htmlFor="state">State: </label>
        <select name="state" id="state">
          <option value=""> -- select an option -- </option>
          <option value="UP">UP</option>
          <option value="UP">UP</option>
          <option value="UP">UP</option>
          <option value="UP">UP</option>
          <option value="UP">UP</option>
        </select>
        <br/>

        <label htmlFor="city">City: </label>
        <select name="city" id="city">
          <option value=""> -- select an option -- </option>
          <option value="ghaziabad">Ghaziabad</option>
          <option value="ghaziabad">Ghaziabad</option>
          <option value="ghaziabad">Ghaziabad</option>
          <option value="ghaziabad">Ghaziabad</option>
          <option value="ghaziabad">Ghaziabad</option>
        </select>
        <br/>

        <label htmlFor="zip">Postal Code: </label>
        <input type="text" name="zip" id="zip" />
        <br/>

        <label htmlFor="studentMobile">Student's Mobile Number: </label>
        <input type="number" name="studentMobile" id="studentMobile" />
        <br/>

        {/* ================= PARENT DETAILS ================= */}
        
        <br/><p style={{fontSize:'large'}}>Father's Details</p><br/>
        
        <label htmlFor="fatherName">Father's Name: </label>
        <input type="text" name="fatherName" id="fatherName" />
        <br/>

        <label htmlFor="fatherOccupation">Occupation: </label>
        <select name="fatherOccupation" id="fatherOccupation">
          <option value=""> -- select an occupation -- </option>
          <option value="private job">Private Job</option>
          <option value="government job">Government Job</option>
          <option value="self employed">Self Employed Job</option>
        </select>
        <br/>

        <label htmlFor="fatherMobile">Mobile Number: </label>
        <input type="number" name="fatherMobile" id="fatherMobile" />
        <br/>

        <label htmlFor="fatherEmail">Email: </label>
        <input type="email" name="fatherEmail" id="fatherEmail" />
        <br/>

        <br/><p style={{ fontSize: 'large' }}>Mother's Details</p><br/>

        <label htmlFor="motherName">Mother's Name: </label>
        <input type="text" name="motherName" id="motherName" />
        <br/>

        <label htmlFor="motherOccupation">Occupation: </label>
        <select name="motherOccupation" id="motherOccupation">
          <option value=""> -- select an occupation -- </option>
          <option value="private job">Private Job</option>
          <option value="government job">Government Job</option>
          <option value="self employed">Self Employed Job</option>
        </select><br/>

        <label htmlFor="motherMobile">Mobile Number: </label>
        <input type="number" name="motherMobile" id="motherMobile" />
        <br/>

        <label htmlFor="motherEmail">Email: </label>
        <input type="email" name="motherEmail" id="motherEmail" />
        <br/>

        <label htmlFor="gaurdianMobile">Gaurdian's Mobile Number: </label>
        <input type="number" name="gaurdianMobile" id="gaurdianMobile" />
        <br/>

        {/* ================= DOCUMENT UPLOADS ================= */}
        
        <br/><p style={{fontSize:'large'}}>Document Upload</p><br/>

        <label htmlFor="photo">Student Photograph: </label>
        <input type="file" name="photo" id="photo" />
        <br/>

        <label htmlFor="markSheet10th">Mark Sheet (10th): </label>
        <input type="file" name="markSheet10th" id="markSheet10th" />
        <br/>
        
        <label htmlFor="markSheet12th">Mark Sheet (12th): </label>
        <input type="file" name="markSheet12th" id="markSheet12th" />
        <br/>

        <label htmlFor="tcFile">Transfer Certificate: </label>
        <input type="file" name="tcFile" id="tcFile" />
        <br/>

        <label htmlFor="addressProof">Address Proof: </label>
        <input type="file" name="addressProof" id="addressProof" />
        <br/>

        <label htmlFor="fatherAdhaar">Father's Adhaar Card: </label>
        <input type="file" name="fatherAdhaar" id="fatherAdhaar" />
        <br/>

        <label htmlFor="motherAdhaar">Mother's Adhaar Card: </label>
        <input type="file" name="motherAdhaar" id="motherAdhaar" />
        <br/><br/>

        <button type="submit">Register Student</button>
    </form>
    </div>
  )
}
export default StudentRegistration;