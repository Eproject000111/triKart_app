const userModel = require("../../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken")
const randomstring = require('randomstring')
const twofactor = require('node-2fa');
const payloadHandler = require("../../helpers/payloadHandler");
const JWT_SECRET_KEY = process.env.TOKEN_KEY;

/* function generateAuthToken(data){
  const token = jwt.sign(data, JWT_SECRET_KEY, { expiresIn: '10h' })
  return token
} */

module.exports.login = async (req, res) => {
  try {

	let fieldHandle = {
		'mobile_number': req.body['mobile_number']
	}

	let isPayloadEmpty = payloadHandler(fieldHandle);

	if(isPayloadEmpty['isNull']){

		delete isPayloadEmpty['isNull'];
		
		return res.json({
			success: false,
			msg: 'Something went wrong',
			data: null,
			errorDesc: isPayloadEmpty
		})
	}

	const Name = randomstring.generate({
		length: 5,
		charset: 'alphabetic'
	});

	const SecretCode = twofactor.generateSecret({ name: Name, mobile_number : mobile_number });

	const newSecret = twofactor.generateToken(SecretCode.secret);

    let user = await userModel.findOne({ mobile_number : mobile_number });

    if (!user) {
      return res.json({
        success: true,
        status: 400,
        message: "user does not exist",
      });
    }

		if (user.user_type == "Block") {
			return res.json({
				msg: "You are Blocked. Please contact to admin.",
				status: 101, // Custom Status for Inbuild Use Says That 2fa Authentication is required
			});
		}

		if (user.mobile_number === 1111111111) {
				user.otp = newSecret.token;
				user.save();

				console.log("send otp to Test");

				return res.json({
					status: 200, // Custom Status for Inbuild Use Says That 2fa Authentication is required
					msg: "Authentication Required",
					secret: SecretCode.secret,
					myToken: newSecret.token
				});
		}

		user.otp = newSecret.token;
		user.save();

		//https.get(`https://www.fast2sms.com/dev/bulkV2?authorization=YzwWibBm3yLudgfAGl2nqKXekrtS57Hph8cVaM46oRT9QDvJUIS23HipxvhzIYM7sEVGCb51LDWfKO68&route=v3&sender_id=WPISMS&message=Your Login OTP is ${newSecret.token} . Please enter this to verify your mobile. Thank you- WPSolutions&language=english&flash=0&numbers=${Phone}`, (resp) => {
		//    console.log("send");
		//})

	/* 	https.get(`https://www.fast2sms.com/dev/bulkV2?authorization=${fast2smsKey}&route=otp&sender_id=WPISMS&message=148262&variables_values=${newSecret.token}&flash=0&numbers=${Phone}`, (resp) => {
				console.log("send");
				// console.log(`https://www.fast2sms.com/dev/bulkV2?authorization=${fast2smsKey}&route=otp&sender_id=WPISMS&message=148262&variables_values=${newSecret.token}%7C&flash=0&numbers=${Phone}`);
				// console.log(resp);


		}) */

		return res.json({
				status: 200, // Custom Status for Inbuild Use Says That 2fa Authentication is required
				msg: "Authentication Required",
				secret: SecretCode.secret
		});

  } catch (error) {
	return res.send(error.message);
  }
};

module.exports.login_old = async (req, res) => {
	try {
	  const { email, password } = req.body;

	  let user = await userModel.findOne({ email:email });
	  if (!user) {
		return res.json({
		  success: true,
		  status: 400,
		  message: "user does not exist with this email and password",
		});
	  }
  
	  // bcrypting the password and comparing with the one in db
	  if (await bcrypt.compare(password, user.password)) {
  
		/* const token = generateAuthToken({_id : user?._id, email : email})
		user.token = token
		user.save() */

		req.session.userId = user?._id;
  
		return res.json({
		  success: true,
		  status: 200,
		  message: "user Logged in",
		  data: user,
		});
	  }
	  return res.json({
		  success: false,
		  status: 400,
		  message: "Either email or passeord incorrect!",
	  })
  
	} catch (error) {
	  return res.send(error.message);
	}
};

module.exports.loginToVerifyOtp = async(req,res) => {
	console.log('finish call ghaov 👍')

	let fieldHandle = {
		'mobile_number': req.body['mobile_number'],
		"twofactor_code": req.body['twofactor_code'],
		"secretCode": req.body['secretCode']
	}

	let isPayloadEmpty = payloadHandler(fieldHandle);

	if(isPayloadEmpty['isNull']){

		delete isPayloadEmpty['isNull'];
		
		return res.json({
			success: false,
			msg: 'Something went wrong',
			data: null,
			errorDesc: isPayloadEmpty
		})
	}

	try{
		let user = await userModel.findOne({ mobile_number: mobile_number }).lean();

		if(!user){
			console.log('user not exit byt');
			return res.status(200).send({ msg: "Invalid User", status: 101 })
		}

		if (user.otp != twofactor_code) {
			console.log('Invalid Two Factor Code')
			return res.send({ msg: "Invalid OTP", status: 101 });
	  	} 
		else if (user.user_type == "Block") {
				console.log('You are Blocked. Please contact to admin.')

				return res.json({
					msg: "You are Blocked. Please contact to admin.",
					status: 101
				});
		} 
		else {
			const matched = twofactor.verifyToken(secretCode, twofactor_code);
			console.log(matched,'matched')
			if (matched == null) {
				return res.json({ status: 101, msg: "Invalid OTP!" });
			} 
			else {
				console.log('match3d resuldt', matched.delta);

				//if(matched.delta==0){
				const token = await user.genAuthToken();

				res.status(200).send({
					status: 200,
					msg: "login successful",
					token,
					user,
				});
				// }
				//else {
				//    return res.json({ status:101, msg: "OTP Expired. Please try again!" });
				//}
			}
		}

	}
	catch(error){
		throw error;
	}
}

module.exports.register = async (req, res) => {
  try {
	let fieldHandle = {
		'email': req.body['email'],
		"password": req.body['password'],
		"name": req.body['name'],
		"mobile_number": req.body['mobile_number']
	}

	let isPayloadEmpty = payloadHandler(fieldHandle);

	if(isPayloadEmpty['isNull']){

		delete isPayloadEmpty['isNull'];
		
		return res.json({
			success: false,
			msg: 'Something went wrong',
			data: null,
			errorDesc: isPayloadEmpty
		})
	}
    req.body.password = await bcrypt.hash(password, 10);
	
    let user = new userModel(req.body);

    await user.save();

	// req.session.userId = user._id;

    return res.json({
      success: true,
      msg: "user registered successfully",
	  actcode: null,
      data: user,
    });

  } catch (error) {
	return res.status(500).json({
		success: false,
		msg: error.message
	});
  }
};

module.exports.updateUser = async (req, res) => {
	let fieldHandle = {
		'id': req.body['id']
	}
	const userDataToBeUpdated = req.body;

	let isPayloadEmpty = payloadHandler(fieldHandle);

	if(isPayloadEmpty['isNull']){

		delete isPayloadEmpty['isNull'];
		
		return res.json({
			success: false,
			msg: 'Something went wrong',
			data: null,
			errorDesc: isPayloadEmpty
		})
	}

  try {

	let {id} = req.body;

    const user = await userModel.findOne({ _id: id });

    if (!user) return res.send("user does not exist");

    await userModel.findOneAndUpdate({ _id: id },userDataToBeUpdated,{ new: true });

    return res.json({
      success: true,
      msg: "Data Update Successfully!",
	  actcode:null,
    //   data: updatedUser,
    });
  } catch (error) {
	return res.status(500).json({
		success: false,
		msg: error.message
	})
  }
};

module.exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.query;

    const user = await userModel.findOne({ _id: id });
    if (!user) return res.status(200).send("user does not exist");

    await userModel.findOneAndDelete({ _id: id });
    
    return res.json({
      success: true,
      message: "data Deleted Successfully!",
    });
  } 
  catch (error) {
	return res.status(500).json({
		success : false,
		msg: error.message,
	});
  }
};

module.exports.getUserById = async (req, res) => {
  try {
    const { id } = req.query;

    const user = await userModel.findOne({_id : id}).lean();
    if(!user) return res.send("user does not exist")

    return res.json({
        success : true,
        message : "user deleted successfully",
        data : user
    })

    }
	catch(error){
		return res.status(500).json({
			success : false,
			msg: error.message,
		});
    }
}

module.exports.resetPassword = async (req, res) => {

    try{
        const {password, newPassword} = req.body;
        const {id} = req.query
    
        if(!password || !newPassword || !id) return res.send("Fields are empty")
    
        let user = await userModel.findOne({_id : id})
    
        if(!user) return res.send("user does not exist")
    
        // comparing the password from the password in DB to allow changes
        if(bcrypt.compare(password, user?.password)){
            // encrypting new password 
            user.password = await bcrypt.hash(newPassword,10)
            user.save()
            return res.json({
                success : true,
                message : "password updated successfully"
            })
        }

        return res.json({
            success : false,
            message : "wrong password"
        })

    }catch(error){
        return res.send(error.message)
    }
    
}

module.exports.getAllUsers = async(req,res) => {
	try{
		let userDetails = await userModel.find({}).lean()

		return res.status(200).json({
			success : true,
			msg: 'Success',
			actCode: null,
			data : userDetails
		})

	}
	catch(error){
		return res.status(500).json({
			success : false,
			msg: error.message,
		});
	}
}
