const transValidation = {
  email_require: "Please! This is required email field! ",
  email_exist: "Email is exist! Please enter another email! ",
  email_incorrect:
    "Email is incorrect! Please enter email formatted: example@gmail.com",
  email_login_fail: "Email or Password wrong!",
  email_not_update: "No email update allowed!",
  account_not_found: "Account is not found!",
  account_find_success: "Find account successfuly!",
  account_find_list_success: "Find list accounts successfuly!",
  account_delete_success: "OK! Delete account successfuly!",
  account_login_fail: "Password or Email is not incorrect!",
  account_login_success: "OK! Login account successfuly!",
  //
  password_require: "Please! This is required password field!",
  passwordConfirm_require: "Please! This is required confirm password field!",
  password_incorrect:
    "Password must contain at least 8 characters that contain lowercase letters, uppercase letters, characters and numbers",
  password_match: "Sorry! Password not match!",
  password_update: "Password change must be different from the old password",
  //
  full_name_require: "Please! This is required full name field!",
  full_name_invalid:
    "Full name are limited to 3 - 7 characters and can't contain special characters",
  // phone
  phone_require: "Please! This is required phone field!",
  phone_invalid: "Phone numbers start with 0 and contain 3 - 12 characters!",
  // station
  station_create_success: "Create station successfuly!",
  station_findById_success: "Find station successfuly!",
  station_delete_success: "Delete station successfuly!",
  station_not_found: "Station is not found!",
  station_name_exits: "Station is exits!",
  station_name_require: "Please! This is required name station field!",
  station_name_invalid:
    "Name station are limited to 3 - 20 characters and can't contain special characters",
  station_find_success: "Find stations successfuly!",
  station_address_require: "Please! This is required address station field!",
  station_province_invalid:
    "Name province station are limited to 3 - 20 characters and can't contain special characters",
  notify_update_station_success: "Update station successfuly!",
  // trips
  trip_not_found: " Trip is not found! " ,
  trip_create_success: "Create Trip successfuly!",
  trip_exist: "Trip is exist!",
  trip_find_success: "Find trips successfuly!",
  trip_update_success: "Update trip successfuly!",
  trip_codeTrip_require: "Please! This is required code trip field!",
  trip_name_require: "Please! This is required name trip field!",
  trip_from_station_require: "Please! This is required from station field!",
  trip_to_station_require: "Please! This is required to station field!",
  trip_price_require: "Please! This is required price field!",
  trip_price_invalid: "Price invalid! - Example: 500,000,000",
  // message server
  nofify_update_password:
    "Password change must be different from the old password!",
  notify_update_successfuly: "Ok! Change passowrd successfuly!",
  token_delete_verify: "Token account has been deleted!"
};

const transEmail = {
  accountNotify: (account) => {
    `Email ${account} register successfuly! Please check email!`
  },
  subject: (email) => {
    `Car Manufacturer: Please active email ${email} !`
  } ,
  tempale: (linkVerify) => {
    return `
    <h2>Register account successfuly!</h2>
    <h3>Please click link verify below your account</h3>
    <h3><a href="${linkVerify}" target="blank"></a>${linkVerify}</h3>
    <h4>Thank!!!</h4>
    `
  },
  activeEmailSuccess: (email) => {
    `Active email ${email} successfuly! Have nice a day ^^`
  }
}

module.exports = {
  transValidation,
  transEmail
};
