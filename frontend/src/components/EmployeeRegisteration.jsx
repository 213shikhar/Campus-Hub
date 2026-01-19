const EmployeeRegisteration = () => {
    return(
        
        <div>
            <h2>Employee Registration</h2><br/>
            <form action="#">
                <label htmlFor="position">Position: </label>
                <select name="position" id="position">
                  <option value=""> -- select position -- </option>
                  <option value="faculty">Faculty</option>
                  <option value="hod">HOD</option>
                  <option value="director">Director</option>
                </select>
                <br/>

                {/* Personal & Identification Details */}
                <br/><p style={{fontSize:'large'}}>Personal Details</p><br/>
                <label for="firstName">First Name:</label>
                <input type="text" id="firstName" name="firstName" />
                <br />

                <label for="middleName">Middle Name:</label>
                <input type="text" id="middleName" name="middleName" />
                <br />

                <label for="lastName">Last Name:</label>
                <input type="text" id="lastName" name="lastName" />
                <br />

                <label for="dob">Date of Birth:</label>
                <input type="date" id="dob" name="dob" />
                <br />

                <label htmlFor="gender">Gender</label>
                <select name="gender" id="gender">
                  <option value=""> -- select gender -- </option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                  <option value="preferNotToSay">Prefer not to say</option>
                </select>
                <br/>

                <label for="adhaar">Aadhaar Number:</label>
                <input type="text" id="adhaar" name="adhaar" />
                <br />

                <label for="bloodGroup">Blood Group:</label>
                <input type="text" id="bloodGroup" name="bloodGroup" />
                <br />

                <label for="nationality">Nationality:</label>
                <input type="text" id="nationality" name="nationality" />
                <br />

                <label for="religion">Religion: </label>
                <input type="text" id="religion" name="religion" />
                <br />

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
                
                <label for="maritalStatus">Marital Status:</label>
                <select id="maritalStatus" name="maritalStatus">
                  <option value="single">Single</option>
                  <option value="married">Married</option>
                  <option value="other">Other</option>
                </select>
                <br />

                {/* Academic Details */}
                <br/><p style={{fontSize:'large'}}>Academic Details</p><br/>
                <label for="qualification">Highest Qualification:</label>
                <select name="qualification" id="qualification">
                  <option value=""> -- select qualification --</option>
                  <option value="ug">UG</option>
                  <option value="pg">PG</option>
                  <option value="phd">Ph. D</option>
                </select>
                <br />
                
                <label for="institute">Institute / University:</label>
                <select name="institute" id="institute">
                  <option value=""> -- select institute --</option>
                  <option value="ipec">IPEC</option>
                  <option value="abes">ABES</option>
                  <option value="iit bombay">IIT Bombay</option>
                </select>
                <br />
                
                <label for="degree">Degree: </label>
                <select name="degree" id="degree">
                  <option value=""> -- select degree --</option>
                  <option value="btech">B. Tech</option>
                  <option value="mtech">B. Tech</option>
                  <option value="bcom">B. Com</option>
                  <option value="mcom">M. Com</option>
                </select>
                <br />

                <label for="yearOfPassing">Year of Passing:</label>
                <input type="number" id="yearOfPassing" name="yearOfPassing" />
                <br />

                <label for="degreeupload">Upload Degree: </label>
                <input type="file" id="degreeupload" name="degreeupload" />
                <br />
                
                <label>Specialization:</label><br/>
                <label htmlFor="spec-cse">
                  <input type="checkbox" id="spec-cse" name="specialization" value="cse"/>CSE
                </label><br/>
                <label htmlFor="spec-ds">
                  <input type="checkbox" id="spec-ds" name="specialization" value="ds"/>DS
                </label><br/>
                <label htmlFor="spec-aiml">
                  <input type="checkbox" id="spec-aiml" name="specialization" value="aiml"/>AIML
                </label><br/>

                <label for="certifications">Professional Certifications (if any): </label>
                <input type="file" id="certifications" name="certifications" multiple />
                <br />

                {/* Professional Details */}
                <br/><p style={{fontSize:'large'}}>Professional Details</p><br/>
                <label htmlFor="workExperience">Work Experience</label>
                <select name="workExperience" id="workExperience">
                  <option value=""> -- select option -- </option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
                <br/>

                <label htmlFor="companyName">Company / Institute Name</label>
                <input type="text" name="companyName" id="companyName" />
                <br/>

                <label htmlFor="designation">Designation</label>
                <input type="text" name="designation" id="designation" />
                <br/>

                <label htmlFor="employmentType">Employment Type</label>
                <select name="employmentType" id="employmentType">
                  <option value=""> -- select employment type -- </option>
                  <option value="fullTime">Full Time</option>
                  <option value="partTime">Part Time</option>
                  <option value="contractual">Contractual</option>
                </select>
                <br/>

                <label htmlFor="resume">Resume</label>
                <input type="file" name="resume" id="resume" />
                <br/>


                {/* Contact & Address Details */}
                <br/><p style={{fontSize:'large'}}>Contact & Address Details</p><br/>

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

                <label htmlFor="employeeMobile">Mobile Number: </label>
                <input type="number" name="employeeMobile" id="employeeMobile" />
                <br/>

                {/* Bank Details */}
                <br/><p style={{fontSize:'large'}}>Contact & Address Details</p><br/>

                <label htmlFor="bankName">Bank Name: </label>
                <input type="text" id="bankName" name="bankName" />
                <br />

                <label htmlFor="accountHolder">Account Holder Name: </label>
                <input type="text" id="accountHolder" name="accountHolder" />
                <br />

                <label htmlFor="accountNumber">Account Number: </label>
                <input type="text" id="accountNumber" name="accountNumber" />
                <br />

                <label htmlFor="ifsc">IFSC Code: </label>
                <input type="text" id="ifsc" name="ifsc" />
                <br />

                {/* 🛡️ Emergency & Documentation */}
                <br/><p style={{fontSize:'large'}}>Emergency Contact Details</p><br/>
                <label for="emergencyName">Emergency Contact Name: </label>
                <input type="text" id="emergencyName" name="emergencyName" />
                <br />

                <label for="emergencyRelation">Emergency Contact Relationship: </label>
                <input type="text" id="emergencyRelation" name="emergencyRelation" />
                <br />

                <label for="emergencyPhone">Emergency Contact Phone: </label>
                <input type="tel" id="emergencyPhone" name="emergencyPhone" />
                <br />
                
                {/* Documents Upload */}
                <br/><p style={{fontSize:'large'}}>Documents Upload</p><br/>

                <label for="offerletter">Upload Offer Letter: </label>
                <input type="file" id="offerletter" name="offerletter" />
                <br />

                <label for="photo">Passport Size Photo: </label>
                <input type="file" id="photo" name="photo" />
                <br />

                <label for="signature">Upload Signature: </label>
                <input type="file" id="signature" name="signature" />
                <br />

                <label for="employeeAdhaar">Adhaar Card Upload: </label>
                <input type="file" id="employeeAdhaar" name="employeeAdhaar" />
                <br/><br/>

                <input type="submit"/>
                <br />
            </form>
        </div>
    )
}

export default EmployeeRegisteration;