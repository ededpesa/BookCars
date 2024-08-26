import React, { useCallback, useState } from "react";
import Layout from "../components/Layout";
import { Button, FormControl, FormControlLabel, Paper, Switch, TextField } from "@mui/material";
import { strings } from "../lang/create-car";
import { strings as commonStrings } from "../lang/common";
import { strings as blStrings } from "../lang/booking-list";
import { strings as csStrings } from "../lang/cars";
import * as bookcarsTypes from ":bookcars-types";
import * as SupplierService from "../services/SupplierService";
import * as helper from "../common/helper";
import * as CarService from "../services/CarService";
import SimpleBackdrop from "../components/SimpleBackdrop";
import Error from "../components/Error";
import ErrorGlobal from "./Error";
import NoMatch from "./NoMatch";
import { Info as InfoIcon } from "@mui/icons-material";

import "../assets/css/create-car.css";
import SupplierSelectList from "../components/SupplierSelectList";
import CarModelSelectList from "../components/CarModelSelectList";
import LocationSelectList from "../components/LocationSelectList";
import FuelPolicyList from "../components/FuelPolicyList";
import { useNavigate } from "react-router-dom";
import Car from "./Car";

const UpdateAssignCar = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState<bookcarsTypes.User>();
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [noMatch, setNoMatch] = useState(false);
  const [error, setError] = useState(false);
  //   const [supplier, setSupplier] = useState<bookcarsTypes.User>();
  const [supplier, setSupplier] = useState<bookcarsTypes.Option>();
  const [car, setCar] = useState<bookcarsTypes.Car>();
  const [carSupplier, setCarSupplier] = useState<bookcarsTypes.CarSupplier>();
  const [isSupplier, setIsSupplier] = useState(false);

  const [price, setPrice] = useState("");
  const [locations, setLocations] = useState<bookcarsTypes.Option[]>([]);
  const [available, setAvailable] = useState(false);
  const [mileage, setMileage] = useState("");
  const [fuelPolicy, setFuelPolicy] = useState("");
  const [cancellation, setCancellation] = useState("");
  const [gps, setGps] = useState("");
  const [theftProtection, setTheftProtection] = useState("");
  const [collisionDamageWaiver, setCollisionDamageWaiver] = useState("");
  const [fullInsurance, setFullInsurance] = useState("");
  const [additionalDriver, setAdditionalDriver] = useState("");
  const [homeDelivery, setHomeDelivery] = useState("");
  const [babyChair, setBabyChair] = useState("");
  const [deposit, setDeposit] = useState("");
  const [inventory, setInventory] = useState("");

  const [formError, setFormError] = useState(false);

  const onLoad = async (_user?: bookcarsTypes.User) => {
    if (_user && _user.verified) {
      //setVisible(true);
      setLoading(true);
      setUser(_user);

      const params = new URLSearchParams(window.location.search);
      if (params.has("cr")) {
        const id = params.get("cr");
        if (id && id !== "") {
          try {
            const _carSupplier = await CarService.getCarSupplier(id);
            if (_carSupplier) {
              if (_user.type === bookcarsTypes.RecordType.Supplier && _user._id !== _carSupplier.supplier._id) {
                setLoading(false);
                setNoMatch(true);
                return;
              }

              const _supplier = {
                _id: _carSupplier.supplier._id as string,
                name: _carSupplier.supplier.fullName,
                image: _carSupplier.supplier.avatar,
              };

              setCarSupplier(_carSupplier);
              setCar(_carSupplier.car);
              setSupplier(_supplier);

              const lcs: bookcarsTypes.Option[] = [];
              for (const loc of _carSupplier.locations) {
                const { _id, name: _name } = loc;
                const lc: bookcarsTypes.Option = { _id, name: _name ?? "" };
                lcs.push(lc);
              }
              setLocations(lcs);
              setPrice(_carSupplier.price.toString());
              setDeposit(_carSupplier.deposit.toString());
              setInventory(_carSupplier.inventory?.toString());
              setAvailable(_carSupplier.available);
              setFuelPolicy(_carSupplier.fuelPolicy);
              setMileage(extraToString(_carSupplier.mileage));
              setCancellation(extraToString(_carSupplier.cancellation));
              setGps(extraToString(_carSupplier.gps ?? ""));
              setHomeDelivery(extraToString(_carSupplier.homeDelivery ?? ""));
              setBabyChair(extraToString(_carSupplier.babyChair ?? ""));
              setTheftProtection(extraToString(_carSupplier.theftProtection));
              setCollisionDamageWaiver(extraToString(_carSupplier.collisionDamageWaiver));
              setFullInsurance(extraToString(_carSupplier.fullInsurance));
              setAdditionalDriver(extraToString(_carSupplier.additionalDriver));

              if (_user.type === bookcarsTypes.RecordType.Supplier) {
                setIsSupplier(true);
              }

              setVisible(true);
              setLoading(false);
            } else {
              setLoading(false);
              setNoMatch(true);
            }
          } catch (err) {
            helper.error(err);
            setLoading(false);
            setError(true);
            setVisible(false);
          }
        } else {
          setLoading(false);
          setNoMatch(true);
        }
      } else {
        setLoading(false);
        setNoMatch(true);
      }
    }
  };

  const handleSupplierChange = (values: bookcarsTypes.Option[]) => {
    setSupplier(values.length > 0 ? values[0] : undefined);
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPrice(e.target.value);
  };

  const handleDepositChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDeposit(e.target.value);
  };

  const handleLocationsChange = (_locations: bookcarsTypes.Option[]) => {
    setLocations(_locations);
  };

  const handleAvailableChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAvailable(e.target.checked);
  };

  const handleMileageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMileage(e.target.value);
  };

  const handleFuelPolicyChange = (value: string) => {
    setFuelPolicy(value);
  };

  const handleCancellationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCancellation(e.target.value);
  };

  // const handleAmendmentsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setAmendments(e.target.value);
  // };

  const handleGpsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGps(e.target.value);
  };

  const handleHomeDeliveryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHomeDelivery(e.target.value);
  };

  const handleBabyChairChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBabyChair(e.target.value);
  };

  const handleTheftProtectionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTheftProtection(e.target.value);
  };

  const handleCollisionDamageWaiverChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCollisionDamageWaiver(e.target.value);
  };

  const handleFullinsuranceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFullInsurance(e.target.value);
  };

  const handleAdditionalDriverChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAdditionalDriver(e.target.value);
  };

  const handleInventoryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInventory(e.target.value);
  };

  const handleCarSelectListChange = useCallback((values: bookcarsTypes.Car[]) => {
    if (Array.isArray(values) && values.length > 0) {
      const _car = values[0];
      if (_car) {
        setCar(_car);
      } else {
        helper.error();
      }
    }
  }, []);

  const validateAssign = async (car: string, supplier: string, carSupplier: string) => {
    try {
      const status = await CarService.validateAssign({ car, supplier, carSupplier });

      if (status === 200) {
        return true;
      }
      helper.error(null, csStrings.CAR_ALREADY_ASSIGNED);
      return false;
    } catch (err) {
      helper.error(err);
      return true;
    }
  };

  const extraToNumber = (extra: string) => (extra === "" ? -1 : Number(extra));
  const extraToString = (extra: number) => (extra === -1 ? "" : String(extra));

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();

      if (!car || !supplier || !carSupplier) {
        helper.error();
        return;
      }

      const validAssign = await validateAssign(car._id, supplier._id, carSupplier._id);

      if (!validAssign) {
        return;
      }

      const data = {
        _id: carSupplier._id,
        car: car._id,
        supplier: supplier._id,
        locations: locations.map((l) => l._id),
        price: Number(price),
        deposit: Number(deposit),
        available,
        fuelPolicy,
        mileage: extraToNumber(mileage),
        cancellation: extraToNumber(cancellation),
        gps: extraToNumber(gps),
        homeDelivery: extraToNumber(homeDelivery),
        babyChair: extraToNumber(babyChair),
        theftProtection: extraToNumber(theftProtection),
        collisionDamageWaiver: extraToNumber(collisionDamageWaiver),
        fullInsurance: extraToNumber(fullInsurance),
        additionalDriver: extraToNumber(additionalDriver),
        inventory: Number(inventory),
      };

      const status = await CarService.updateAssign(data);

      if (status === 200) {
        helper.info(commonStrings.UPDATED);
      } else {
        helper.error();
      }
    } catch (err) {
      helper.error(err);
    }
  };

  return (
    <Layout onLoad={onLoad} strict>
      {visible && (
        <div className="create-car">
          <Paper className="car-form car-form-wrapper" elevation={10} style={visible ? {} : { display: "none" }}>
            <h1 className="car-form-title"> {strings.EDIT} </h1>
            <form onSubmit={handleSubmit}>
              <FormControl fullWidth margin="dense">
                <SupplierSelectList readOnly label={blStrings.SUPPLIER} value={supplier} required variant="standard" />
              </FormControl>

              <CarModelSelectList readOnly label={blStrings.CAR} required value={car} />

              <FormControl fullWidth margin="dense">
                <LocationSelectList label={strings.LOCATIONS} multiple required variant="standard" onChange={handleLocationsChange} value={locations} />
              </FormControl>

              <FormControl fullWidth margin="dense">
                <TextField
                  label={`${strings.PRICE} (${csStrings.CAR_CURRENCY})`}
                  inputProps={{ inputMode: "numeric", pattern: "^\\d+(.\\d+)?$" }}
                  onChange={handlePriceChange}
                  required
                  variant="standard"
                  autoComplete="off"
                  value={price}
                />
              </FormControl>

              <FormControl fullWidth margin="dense">
                <TextField
                  label={`${csStrings.DEPOSIT} (${commonStrings.CURRENCY})`}
                  inputProps={{ inputMode: "numeric", pattern: "^\\d+(.\\d+)?$" }}
                  onChange={handleDepositChange}
                  required
                  variant="standard"
                  autoComplete="off"
                  value={deposit}
                />
              </FormControl>

              <FormControl fullWidth margin="dense">
                <TextField
                  label={strings.INVENTORY}
                  inputProps={{ inputMode: "numeric", pattern: "^\\d+(.\\d+)?$" }}
                  onChange={handleInventoryChange}
                  required
                  variant="standard"
                  autoComplete="off"
                  value={inventory}
                />
              </FormControl>

              <FormControl fullWidth margin="dense" className="checkbox-fc">
                <FormControlLabel
                  control={<Switch checked={available} onChange={handleAvailableChange} color="primary" />}
                  label={strings.AVAILABLE}
                  className="checkbox-fcl"
                />
              </FormControl>

              <FormControl fullWidth margin="dense">
                <FuelPolicyList label={csStrings.FUEL_POLICY} variant="standard" required onChange={handleFuelPolicyChange} value={fuelPolicy} />
              </FormControl>

              <div className="info">
                <InfoIcon />
                <span>{commonStrings.OPTIONAL}</span>
              </div>

              <FormControl fullWidth margin="dense">
                <TextField
                  label={`${csStrings.MILEAGE} (${csStrings.MILEAGE_UNIT})`}
                  inputProps={{ inputMode: "numeric", pattern: "^\\d+(.\\d+)?$" }}
                  onChange={handleMileageChange}
                  variant="standard"
                  autoComplete="off"
                  value={mileage}
                />
              </FormControl>

              <FormControl fullWidth margin="dense">
                <TextField
                  label={`${csStrings.CANCELLATION} (${commonStrings.CURRENCY})`}
                  inputProps={{ inputMode: "numeric", pattern: "^\\d+(.\\d+)?$" }}
                  onChange={handleCancellationChange}
                  variant="standard"
                  autoComplete="off"
                  value={cancellation}
                />
              </FormControl>

              {/* <FormControl fullWidth margin="dense">
              <TextField
                label={`${csStrings.AMENDMENTS} (${commonStrings.CURRENCY})`}
                inputProps={{ inputMode: "numeric", pattern: "^\\d+(.\\d+)?$" }}
                onChange={handleAmendmentsChange}
                variant="standard"
                autoComplete="off"
                value={amendments}
              />
            </FormControl> */}
              <FormControl fullWidth margin="dense">
                <TextField
                  label={`${csStrings.GPS} (${csStrings.CAR_CURRENCY})`}
                  inputProps={{ inputMode: "numeric", pattern: "^\\d+(.\\d+)?$" }}
                  onChange={handleGpsChange}
                  variant="standard"
                  autoComplete="off"
                  value={gps}
                />
              </FormControl>

              <FormControl fullWidth margin="dense">
                <TextField
                  label={`${csStrings.THEFT_PROTECTION} (${csStrings.CAR_CURRENCY})`}
                  inputProps={{ inputMode: "numeric", pattern: "^\\d+(.\\d+)?$" }}
                  onChange={handleTheftProtectionChange}
                  variant="standard"
                  autoComplete="off"
                  value={theftProtection}
                />
              </FormControl>

              <FormControl fullWidth margin="dense">
                <TextField
                  label={`${csStrings.COLLISION_DAMAGE_WAVER} (${csStrings.CAR_CURRENCY})`}
                  inputProps={{ inputMode: "numeric", pattern: "^\\d+(.\\d+)?$" }}
                  onChange={handleCollisionDamageWaiverChange}
                  variant="standard"
                  autoComplete="off"
                  value={collisionDamageWaiver}
                />
              </FormControl>

              <FormControl fullWidth margin="dense">
                <TextField
                  label={`${csStrings.FULL_INSURANCE} (${csStrings.CAR_CURRENCY})`}
                  inputProps={{ inputMode: "numeric", pattern: "^\\d+(.\\d+)?$" }}
                  onChange={handleFullinsuranceChange}
                  variant="standard"
                  autoComplete="off"
                  value={fullInsurance}
                />
              </FormControl>

              <FormControl fullWidth margin="dense">
                <TextField
                  label={`${csStrings.ADDITIONAL_DRIVER} (${csStrings.CAR_CURRENCY})`}
                  inputProps={{ inputMode: "numeric", pattern: "^\\d+(.\\d+)?$" }}
                  onChange={handleAdditionalDriverChange}
                  variant="standard"
                  autoComplete="off"
                  value={additionalDriver}
                />
              </FormControl>

              <FormControl fullWidth margin="dense">
                <TextField
                  label={`${csStrings.HOME_DELIVERY} (${csStrings.CAR_CURRENCY})`}
                  inputProps={{ inputMode: "numeric", pattern: "^\\d+(.\\d+)?$" }}
                  onChange={handleHomeDeliveryChange}
                  variant="standard"
                  autoComplete="off"
                  value={homeDelivery}
                />
              </FormControl>

              <FormControl fullWidth margin="dense">
                <TextField
                  label={`${csStrings.BABY_CHAIR} (${csStrings.CAR_CURRENCY})`}
                  inputProps={{ inputMode: "numeric", pattern: "^\\d+(.\\d+)?$" }}
                  onChange={handleBabyChairChange}
                  variant="standard"
                  autoComplete="off"
                  value={babyChair}
                />
              </FormControl>

              <div className="buttons">
                <Button type="submit" variant="contained" className="btn-primary btn-margin-bottom" size="small">
                  {commonStrings.SAVE}
                </Button>
                <Button
                  variant="contained"
                  className="btn-secondary btn-margin-bottom"
                  size="small"
                  onClick={async () => {
                    navigate("/supplier" + (isSupplier ? "" : "?c=" + supplier?._id));
                  }}
                >
                  {commonStrings.CANCEL}
                </Button>
              </div>

              <div className="form-error">{formError && <Error message={commonStrings.FORM_ERROR} />}</div>
            </form>
          </Paper>
        </div>
      )}
      {loading && <SimpleBackdrop text={commonStrings.LOADING} />}
      {error && <ErrorGlobal />}
      {noMatch && <NoMatch hideHeader />}
    </Layout>
  );
};

export default UpdateAssignCar;
