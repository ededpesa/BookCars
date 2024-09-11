import React, { useState } from "react";
import {
  Input,
  InputLabel,
  FormControl,
  FormHelperText,
  Button,
  Paper,
  Select,
  MenuItem,
  FormControlLabel,
  Switch,
  SelectChangeEvent,
  TextField,
  FormGroup,
} from "@mui/material";
import { Info as InfoIcon } from "@mui/icons-material";
import { useMask } from "@react-input/mask";
import validator from "validator";
import { intervalToDuration } from "date-fns";
import { useNavigate } from "react-router-dom";
import * as bookcarsTypes from ":bookcars-types";
import * as bookcarsHelper from ":bookcars-helper";
import Layout from "../components/Layout";
import env from "../config/env.config";
import { strings as commonStrings } from "../lang/common";
import { strings as ccStrings } from "../lang/create-supplier";
import { strings } from "../lang/create-user";
import * as helper from "../common/helper";
import * as UserService from "../services/UserService";
import * as SupplierService from "../services/SupplierService";
import * as EnterpriseService from "../services/EnterpriseService";
import Error from "../components/Error";
import Backdrop from "../components/SimpleBackdrop";
import Avatar from "../components/Avatar";
import DatePicker from "../components/DatePicker";

import "../assets/css/create-user.css";

const CreateUser = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<bookcarsTypes.User>();
  const [admin, setAdmin] = useState(false);
  const [fullName, setFullName] = useState("");
  const [enterpriseName, setEnterpriseName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");
  const [bio, setBio] = useState("");
  const [error, setError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fullNameError, setFullNameError] = useState(false);
  const [enterpriseNameError, setEnterpriseNameError] = useState(false);
  const [avatar, setAvatar] = useState("");
  const [avatarError, setAvatarError] = useState(false);
  const [type, setType] = useState("");
  const [emailValid, setEmailValid] = useState(true);
  const [phoneValid, setPhoneValid] = useState(true);
  const [payLater, setPayLater] = useState(true);
  const [birthDate, setBirthDate] = useState<Date>();
  const [birthDateValid, setBirthDateValid] = useState(true);
  const [commercialActivity, setCommercialActivity] = useState("");
  const [webPage, setWebPage] = useState("");
  const [enterpriseEmail, setEnterpriseEmail] = useState("");
  const [rif, setRif] = useState("");
  // const [rifType, setRifType] = useState("V");
  const [address, setAddress] = useState("");
  const [documentType, setDocumentType] = useState(`${bookcarsTypes.DocumentType.IdentityCard}`);
  const [documentNumber, setDocumentNumber] = useState("");

  const maskCedRef = useMask({ mask: "T___________", replacement: { _: /\d/, T: /[vVeE]/ } });
  const maskRifRef = useMask({ mask: "T___________", replacement: { _: /\d/, T: /[vVjJ]/ } });

  const handleFullNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFullName(e.target.value);

    if (!e.target.value) {
      setFullNameError(false);
    }
  };

  const handleEnterpriseNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEnterpriseName(e.target.value);

    if (!e.target.value) {
      setEnterpriseNameError(false);
    }
  };

  const validateFullName = async (_fullName: string) => {
    if (_fullName) {
      try {
        const status = await SupplierService.validate({ fullName: _fullName });

        if (status === 200) {
          setFullNameError(false);
          setError(false);
          return true;
        }
        setFullNameError(true);
        setAvatarError(false);
        setError(false);
        return false;
      } catch (err) {
        helper.error(err);
        return true;
      }
    } else {
      setFullNameError(false);
      return true;
    }
  };

  const handleUserTypeChange = async (e: SelectChangeEvent<string>) => {
    const _type = e.target.value;

    setType(_type);

    if (_type === bookcarsTypes.RecordType.Supplier) {
      await validateFullName(fullName);
    } else {
      setFullNameError(false);
    }
  };

  const handleDocumentTypeChange = (e: SelectChangeEvent<string>) => {
    setDocumentType(e.target.value);
  };

  const handleFullNameBlur = async (e: React.FocusEvent<HTMLInputElement>) => {
    if (type === bookcarsTypes.RecordType.Supplier) {
      await validateFullName(e.target.value);
    } else {
      setFullNameError(false);
    }
  };

  const handleEnterpriseNameBlur = async (e: React.FocusEvent<HTMLInputElement>) => {
    await validateFullName(e.target.value);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);

    if (!e.target.value) {
      setEmailError(false);
      setEmailValid(true);
    }
  };

  const validateEmail = async (_email?: string) => {
    if (_email) {
      if (validator.isEmail(_email)) {
        try {
          const status = await UserService.validateEmail({ email: _email });
          if (status === 200) {
            setEmailError(false);
            setEmailValid(true);
            return true;
          }
          setEmailError(true);
          setEmailValid(true);
          setAvatarError(false);
          setError(false);
          return false;
        } catch (err) {
          helper.error(err);
          return true;
        }
      } else {
        setEmailError(false);
        setEmailValid(false);
        return false;
      }
    } else {
      setEmailError(false);
      setEmailValid(true);
      return false;
    }
  };

  const handleEmailBlur = async (e: React.FocusEvent<HTMLInputElement>) => {
    await validateEmail(e.target.value);
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(e.target.value);

    if (!e.target.value) {
      setPhoneValid(true);
    }
  };

  const validatePhone = (_phone?: string) => {
    if (_phone) {
      const _phoneValid = validator.isMobilePhone(_phone);
      setPhoneValid(_phoneValid);

      return _phoneValid;
    }
    setPhoneValid(true);

    return true;
  };

  const handlePhoneBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    validatePhone(e.target.value);
  };

  const validateBirthDate = (date?: Date) => {
    if (date && bookcarsHelper.isDate(date) && type === bookcarsTypes.RecordType.User) {
      const now = new Date();
      const sub = intervalToDuration({ start: date, end: now }).years ?? 0;
      const _birthDateValid = sub >= env.MINIMUM_AGE;

      setBirthDateValid(_birthDateValid);
      return _birthDateValid;
    }
    setBirthDateValid(true);
    return true;
  };

  const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocation(e.target.value);
  };

  const handleBioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBio(e.target.value);
  };

  const handleCommercialActivityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCommercialActivity(e.target.value);
  };

  const handleEnterpriseEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEnterpriseEmail(e.target.value);
  };

  const handleWebPageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWebPage(e.target.value);
  };

  const handleRifChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRif(e.target.value);
  };

  const handleDocumentNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDocumentNumber(e.target.value);
  };

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddress(e.target.value);
  };

  const onBeforeUpload = () => {
    setLoading(true);
  };

  const onAvatarChange = (_avatar: string) => {
    setLoading(false);
    setAvatar(_avatar);

    if (_avatar !== null && type === bookcarsTypes.RecordType.Supplier) {
      setAvatarError(false);
    }
  };

  const handleCancel = async () => {
    try {
      if (avatar) {
        await UserService.deleteTempAvatar(avatar);
        navigate("/users");
      } else {
        navigate("/users");
      }
    } catch {
      navigate("/users");
    }
  };

  const onLoad = (_user?: bookcarsTypes.User) => {
    if (_user && _user.verified) {
      const _admin = helper.admin(_user);
      setUser(_user);
      setAdmin(_admin);
      setType(_admin ? "" : bookcarsTypes.RecordType.User);
      setVisible(true);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();

      if (!user) {
        helper.error();
        return;
      }

      if (type === bookcarsTypes.RecordType.Supplier) {
        const fullNameValid = await validateFullName(fullName);

        if (!fullNameValid) {
          return;
        }
      } else {
        setFullNameError(false);
      }

      const _emailValid = await validateEmail(email);
      if (!_emailValid) {
        return;
      }

      const _phoneValid = validatePhone(phone);
      if (!_phoneValid) {
        return;
      }

      const _birthDateValid = validateBirthDate(birthDate);
      if (!_birthDateValid) {
        return;
      }

      if (type === bookcarsTypes.RecordType.Supplier && !avatar) {
        setAvatarError(true);
        setError(false);
        return;
      }

      const language = UserService.getLanguage();
      const supplier = admin ? undefined : user._id;

      const data: bookcarsTypes.CreateUserPayload = {
        email,
        phone,
        location,
        bio,
        fullName,
        type,
        avatar,
        birthDate,
        language,
        supplier,
        documentType,
        documentNumber,
      };

      if (type === bookcarsTypes.RecordType.Supplier) {
        data.payLater = payLater;
      }

      if (type === bookcarsTypes.RecordType.Enterprise) {
        data.enterprise = {
          name: enterpriseName,
          commercialActivity,
          web: webPage,
          email: enterpriseEmail,
          rif,
          address,
        };
      }

      const status = await UserService.create(data);

      if (status === 200) {
        navigate("/users");
      } else {
        setError(true);
      }
    } catch (err) {
      helper.error(err);
    }
  };

  const supplier = type === bookcarsTypes.RecordType.Supplier;
  const driver = type === bookcarsTypes.RecordType.User;
  const enterprise = type === bookcarsTypes.RecordType.Enterprise;

  return (
    <Layout onLoad={onLoad} strict>
      {user && (
        <div className="create-user">
          <Paper className="user-form user-form-wrapper" elevation={10} style={visible ? {} : { display: "none" }}>
            <h1 className="user-form-title"> {strings.CREATE_USER_HEADING}</h1>
            <form onSubmit={handleSubmit}>
              <Avatar
                type={type}
                mode="create"
                record={null}
                size="large"
                readonly={false}
                onBeforeUpload={onBeforeUpload}
                onChange={onAvatarChange}
                color="disabled"
                className="avatar-ctn"
              />

              {supplier && (
                <div className="info">
                  <InfoIcon />
                  <span>{ccStrings.RECOMMENDED_IMAGE_SIZE}</span>
                </div>
              )}

              {admin && (
                <FormControl fullWidth margin="dense" variant="standard" style={{ marginTop: supplier ? 0 : 39 }}>
                  <InputLabel className="required">{commonStrings.TYPE}</InputLabel>
                  <Select label={commonStrings.TYPE} value={type} onChange={handleUserTypeChange} required fullWidth>
                    <MenuItem value={bookcarsTypes.RecordType.Admin}>{helper.getUserType(bookcarsTypes.UserType.Admin)}</MenuItem>
                    <MenuItem value={bookcarsTypes.RecordType.Supplier}>{helper.getUserType(bookcarsTypes.UserType.Supplier)}</MenuItem>
                    <MenuItem value={bookcarsTypes.RecordType.Enterprise}>{helper.getUserType(bookcarsTypes.UserType.Enterprise)}</MenuItem>
                    <MenuItem value={bookcarsTypes.RecordType.User}>{helper.getUserType(bookcarsTypes.UserType.User)}</MenuItem>
                  </Select>
                </FormControl>
                // <FormControl fullWidth margin="dense" variant="standard" style={{ marginTop: supplier ? 0 : 39 }}>
                //   <InputLabel id="demo-simple-select-standard-label">Age</InputLabel>
                //   <Select labelId="demo-simple-select-standard-label" id="demo-simple-select-standard" value={type} onChange={handleUserTypeChange} label="Age">
                //     <MenuItem value="">
                //       <em>None</em>
                //     </MenuItem>
                //     <MenuItem value={10}>Ten</MenuItem>
                //     <MenuItem value={20}>Twenty</MenuItem>
                //     <MenuItem value={30}>Thirty</MenuItem>
                //   </Select>
                // </FormControl>
              )}

              {enterprise && (
                <>
                  <h3 className="user-form-title mb-0"> {commonStrings.ENTERPRISE_DATA}</h3>
                  <FormControl fullWidth margin="dense">
                    <TextField
                      id="enterprise-name"
                      type="text"
                      //error={!emailValid || emailError}
                      onBlur={handleEnterpriseNameBlur}
                      onChange={handleEnterpriseNameChange}
                      autoComplete="off"
                      required
                      variant="standard"
                      label={commonStrings.ENTERPRISE_NAME}
                    />
                    {/* <FormHelperText error={!emailValid || emailError}>
                  {(!emailValid && commonStrings.EMAIL_NOT_VALID) || ""}
                  {(emailError && commonStrings.EMAIL_ALREADY_REGISTERED) || ""}
                </FormHelperText> */}
                  </FormControl>

                  <FormControl fullWidth margin="dense">
                    <TextField
                      id="commercial-activity"
                      type="text"
                      onChange={handleCommercialActivityChange}
                      autoComplete="off"
                      required
                      variant="standard"
                      label={commonStrings.COMMERCIAL_ACTIVITY}
                    />
                  </FormControl>

                  <FormControl fullWidth margin="dense">
                    <TextField id="web" type="text" onChange={handleWebPageChange} autoComplete="off" variant="standard" label={commonStrings.WEB} />
                  </FormControl>

                  <FormControl fullWidth margin="dense">
                    <TextField
                      id="enterprise-email"
                      type="text"
                      //error={!emailValid || emailError}
                      //onBlur={handleEmailBlur}
                      onChange={handleEnterpriseEmailChange}
                      autoComplete="off"
                      required
                      variant="standard"
                      label={commonStrings.ENTERPRISE_EMAIL}
                    />
                    {/* <FormHelperText error={!emailValid || emailError}>
                  {(!emailValid && commonStrings.EMAIL_NOT_VALID) || ""}
                  {(emailError && commonStrings.EMAIL_ALREADY_REGISTERED) || ""}
                </FormHelperText> */}
                  </FormControl>

                  <FormControl fullWidth margin="dense" variant="standard" style={{ flexDirection: "row" }}>
                    {/* <InputLabel>RIF *</InputLabel>
                    <Select label={" "} value={rifType} onChange={(e) => setRifType(e.target.value)} style={{ minWidth: 50, textAlign: "center" }}>
                      <MenuItem value="V">V</MenuItem>
                      <MenuItem value="E">E</MenuItem>
                    </Select> */}
                    <TextField
                      id="rif"
                      type="text"
                      //error={!emailValid || emailError}
                      //onBlur={handleEmailBlur}
                      onChange={handleRifChange}
                      autoComplete="off"
                      variant="standard"
                      label={"RIF (J1234567)"}
                      style={{ flexGrow: 1 }}
                      inputProps={{ style: { textTransform: "uppercase" } }}
                      inputRef={maskRifRef}
                      required
                      fullWidth
                    />

                    {/* <FormHelperText error={!emailValid || emailError}>
                  {(!emailValid && commonStrings.EMAIL_NOT_VALID) || ""}
                  {(emailError && commonStrings.EMAIL_ALREADY_REGISTERED) || ""}
                </FormHelperText> */}
                  </FormControl>

                  <FormControl fullWidth margin="dense">
                    <TextField
                      id="address"
                      type="text"
                      onChange={handleAddressChange}
                      autoComplete="off"
                      required
                      variant="standard"
                      label={commonStrings.ADDRESS}
                    />
                  </FormControl>

                  <h3 className="user-form-title mb-0"> {commonStrings.CONTACT_DATA}</h3>
                </>
              )}

              <FormControl fullWidth margin="dense">
                {/* <InputLabel className="required">{commonStrings.FULL_NAME}</InputLabel>
                <Input
                  id="full-name"
                  type="text"
                  error={fullNameError}
                  required
                  onBlur={handleFullNameBlur}
                  onChange={handleFullNameChange}
                  autoComplete="off"
                /> */}
                <TextField
                  id="full-name"
                  type="text"
                  error={fullNameError}
                  required
                  onBlur={handleFullNameBlur}
                  onChange={handleFullNameChange}
                  autoComplete="off"
                  variant="standard"
                  label={commonStrings.FULL_NAME}
                />
                <FormHelperText error={fullNameError}>{(fullNameError && ccStrings.INVALID_SUPPLIER_NAME) || ""}</FormHelperText>
              </FormControl>
              <FormControl fullWidth margin="dense">
                <TextField
                  id="email"
                  type="text"
                  error={!emailValid || emailError}
                  onBlur={handleEmailBlur}
                  onChange={handleEmailChange}
                  autoComplete="off"
                  required
                  variant="standard"
                  label={commonStrings.EMAIL}
                />
                <FormHelperText error={!emailValid || emailError}>
                  {(!emailValid && commonStrings.EMAIL_NOT_VALID) || ""}
                  {(emailError && commonStrings.EMAIL_ALREADY_REGISTERED) || ""}
                </FormHelperText>
              </FormControl>

              <FormControl fullWidth margin="dense" variant="standard">
                <InputLabel className="required">{commonStrings.DOCUMENT_TYPE}</InputLabel>
                <Select label={commonStrings.TYPE} value={documentType} onChange={handleDocumentTypeChange} required fullWidth>
                  <MenuItem value={bookcarsTypes.DocumentType.IdentityCard}>{helper.getDocumentType(bookcarsTypes.DocumentType.IdentityCard)}</MenuItem>
                  <MenuItem value={bookcarsTypes.DocumentType.Passport}>{helper.getDocumentType(bookcarsTypes.DocumentType.Passport)}</MenuItem>
                </Select>
              </FormControl>

              <FormControl fullWidth margin="dense" variant="standard" style={{ flexDirection: "row" }}>
                {/* <InputLabel>RIF *</InputLabel>
                    <Select label={" "} value={rifType} onChange={(e) => setRifType(e.target.value)} style={{ minWidth: 50, textAlign: "center" }}>
                      <MenuItem value="V">V</MenuItem>
                      <MenuItem value="E">E</MenuItem>
                    </Select> */}
                <TextField
                  id="document-number"
                  type="text"
                  //error={!emailValid || emailError}
                  //onBlur={handleEmailBlur}
                  onChange={handleDocumentNumberChange}
                  autoComplete="off"
                  variant="standard"
                  label={commonStrings.DOCUMENT_NUMBER}
                  style={{ flexGrow: 1 }}
                  inputProps={{ style: { textTransform: "uppercase" } }}
                  inputRef={maskCedRef}
                  required
                  fullWidth
                />

                {/* <FormHelperText error={!emailValid || emailError}>
                  {(!emailValid && commonStrings.EMAIL_NOT_VALID) || ""}
                  {(emailError && commonStrings.EMAIL_ALREADY_REGISTERED) || ""}
                </FormHelperText> */}
              </FormControl>

              {driver && (
                <FormControl fullWidth margin="dense">
                  <DatePicker
                    label={strings.BIRTH_DATE}
                    value={birthDate}
                    required
                    onChange={(_birthDate) => {
                      if (_birthDate) {
                        const _birthDateValid = validateBirthDate(_birthDate);

                        setBirthDate(_birthDate);
                        setBirthDateValid(_birthDateValid);
                      }
                    }}
                    language={(user && user.language) || env.DEFAULT_LANGUAGE}
                  />
                  <FormHelperText error={!birthDateValid}>{(!birthDateValid && commonStrings.BIRTH_DATE_NOT_VALID) || ""}</FormHelperText>
                </FormControl>
              )}

              <FormControl fullWidth margin="dense">
                <TextField
                  id="phone"
                  type="text"
                  onBlur={handlePhoneBlur}
                  onChange={handlePhoneChange}
                  error={!phoneValid}
                  required={!!driver}
                  autoComplete="off"
                  variant="standard"
                  label={commonStrings.PHONE}
                />
                <FormHelperText error={!phoneValid}>{(!phoneValid && commonStrings.PHONE_NOT_VALID) || ""}</FormHelperText>
              </FormControl>
              {/* <input ref={inputRef} /> */}
              {/* <FormControl fullWidth margin="dense">
                <TextField id="location" type="text" onChange={handleLocationChange} autoComplete="off" variant="standard" label={commonStrings.LOCATION} />
              </FormControl>

              <FormControl fullWidth margin="dense">
                <TextField id="bio" type="text" onChange={handleBioChange} autoComplete="off" variant="standard" label={commonStrings.BIO} />
              </FormControl> */}

              {supplier && (
                <FormControl component="fieldset" style={{ marginTop: 15 }}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={payLater}
                        onChange={(e) => {
                          setPayLater(e.target.checked);
                        }}
                        color="primary"
                      />
                    }
                    label={commonStrings.PAY_LATER}
                  />
                </FormControl>
              )}

              <div className="buttons">
                <Button type="submit" variant="contained" className="btn-primary btn-margin-bottom" size="small">
                  {commonStrings.CREATE}
                </Button>
                <Button variant="contained" className="btn-secondary btn-margin-bottom" size="small" onClick={handleCancel}>
                  {commonStrings.CANCEL}
                </Button>
              </div>

              <div className="form-error">
                {error && <Error message={commonStrings.GENERIC_ERROR} />}
                {avatarError && <Error message={commonStrings.IMAGE_REQUIRED} />}
              </div>
            </form>
          </Paper>
        </div>
      )}
      {loading && <Backdrop text={commonStrings.PLEASE_WAIT} />}
    </Layout>
  );
};

export default CreateUser;
