//validation email
export const checkEmail = (stringEmail) => (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(stringEmail));

//validation phone
export const checkPhone = (stringPhone) => /(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/.test(stringPhone);

//validation pass
export const checkPass = (stringPass) =>/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/.test(stringPass);