/* eslint-disable no-useless-escape */
import axios from "axios";

export function validateName(name) {
  var regEx = /^[A-Za-z\s]+$/;
  if (name.match(regEx)) return "";
  else return "*Name should only contain alphabets.";
}

export async function validateNumber(number) {
  var regEx = /^\d+$/;
  var msg = "";
  if (number.length != 10) msg += "*Number should be of 10 digits <br/>";
  if (!number.match(regEx)) msg += "*Number should only contain digits";

  if (number.length > 0) {
    try {
      const result = await axios.get("http://localhost:4000/api/duplicate", {
        params: { contact: number },
      });

      msg += result.data.message.length > 0 ? "*" : "";
      msg += result.data.message;
    } catch (error) {
      console.log(error);
    }
  }

  if (msg.length != 0) return msg;
  else return "";
}

export async function validateEmail(email) {
  var regEx = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  let msg = "";
  if (email.match(regEx)) msg = "";
  else msg = "*Please provide a valid email.";

  if (email.length > 0) {
    try {
      const result = await axios.get("http://localhost:4000/api/duplicate", {
        params: { email: email },
      });
      msg += result.data.message.length > 0 ? "*" : "";
      msg += result.data.message;
    } catch (error) {
      console.log(error);
    }
  }

  return msg;
}

export function validatePassword(password) {
  var regExLength = /^.{8,}$/;
  var regExSpecial = /[!@#$%^&*]+/;
  var regExUpper = /[A-Z]/g;
  var regExLower = /[a-z]/g;
  var regExNumber = /[0-9]/g;
  let msg = "";

  if (!password.match(regExLength)) msg += "*At least of 8 characters<br>";
  if (!password.match(regExSpecial)) msg += "*Special Characters<br>";
  if (!password.match(regExUpper)) msg += "*Upper case characters<br>";
  if (!password.match(regExLower)) msg += "*Lower case characters<br>";
  if (!password.match(regExNumber)) msg += "*Numbers<br>";

  if (msg.length != 0) {
    msg = "Password must contain:<br>" + msg;
    return msg;
  } else return "";
}
