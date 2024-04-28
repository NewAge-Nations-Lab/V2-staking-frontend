// import React from 'react';
// import emailjs from 'emailjs-com';

// function Register() {
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const templateParams = {
//       fname: e.target.fname.value,
//       lname: e.target.lname.value,
//       email: e.target.email.value,
//       number: e.target.number.value,
//       applying: e.target.applying.value,
//       available: e.target.available.value,
//       cv: e.target.cv.files[0],
//     };

//     try {
//       await emailjs.send(
//         'service_w6mm8ko',
//         'template_k8pogbf',
//         templateParams,
//         'princeleepraise@gmail.com'
//       );

//       alert('Form submitted successfully!');
//     } catch (error) {
//       console.error('Error submitting form:', error);
//       alert('Failed to submit form. Please try again.');
//     }
//   };
//   return (
//     <div className="container d-flex align-items-center justify-content-center" style={{ height: '100vh' }}>
    
//       <form className="col-12 col-md-6">
//       <h3 className='website-red'>Register</h3>
//         <div className="mb-3">
//           <input type="text" className="form-control" name="fname" placeholder="First Name" required="" />
//         </div>
//         <div className="mb-3">
//           <input type="text" className="form-control" name="lname" placeholder="Last Name" required="" />
//         </div>
//         <div className="mb-3">
//           <input type="text" className="form-control" name="email" placeholder="Email" required="" />
//         </div>
//         <div className="mb-3">
//           <input type="text" className="form-control" name="number" placeholder="Mobile Number" required="" />
//         </div>
//         <div className="mb-3">
//           <input type="text" className="form-control" name="applying" placeholder="Applying For" required="" />
//         </div>
//         <div className="mb-3">
//           <input type="text" className="form-control" name="available" placeholder="Availability" required="" />
//         </div>
//         <div className="mb-3">
//           <label htmlFor="exampleFormControlFile1" className="form-label">
//             Upload CV:
//             <input type="file" className="form-control" name="cv" required="" accept=".doc, .docx, .pdf" />
//           </label>
//         </div>
//         <div className="mb-3">
//           <input type="submit" className="btn btn-danger" value="Submit" onClick={handleSubmit} />
//         </div>
//       </form>
//     </div>
//   );
// }

// export default Register;
