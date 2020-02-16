const { Station } = require("../../model/Station");
const {NOTIFY} = require("../../lang/index");
const {validationResult} = require("express-validator");

const createStations = (req, res, next) => {
  const listErrorValidations = [];
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    errors
      .array()
      .map(err => listErrorValidations.push({ [err.param]: err.msg }));
    return res.status(422).json({ errors: listErrorValidations});
  }

  const errorNotification = [];
  const successNotification = [];
  const { name, address, province, phone } = req.body;
  if(!name) {
    errorNotification.push({status: 442, name: NOTIFY.station_name_require})
    return res.status(442).json(errorNotification);
  }
  Station.findOne({ name })
  .then(station => {
      if (station) {
        errorNotification.push({ status: 201, message: NOTIFY.station_name_exits });
        return Promise.reject(errorNotification);
      }
      let newStation = new Station({
        name,
        address,
        province,
        phone
      });
      newStation.save();
      successNotification.push({
        status: 200,
        message: NOTIFY.station_create_success,
        newStation: newStation
      });
      return res.status(200).json(successNotification);
    })
    .catch(err => {
      if (err.status) return res.status(err.status).json(errorNotification);
      return res.status(500).json(err);
    });
};

const findStations = (req, res, next) => {
  const successNotification = [];
  Station.find()
    .then(stations => {
      successNotification.push({
        status: 200,
        message: NOTIFY.station_find_success,
        stations: stations
      });
      res.status(200).json(successNotification);
    })
    .catch(err => {
      return res.status(500).json(err);
    });
};

const findByIdStation = (req, res, next) => {
  const errorNotification = [];
  const successNotification = [];
  const { id } = req.params;
  Station.findById(id)
    .then(station => {
      if (!station) {
        errorNotification.push({ status: 404, message: NOTIFY.station_not_found + `${id}` });
        return Promise.reject(errorNotification);
      }
      successNotification.push({
        status: 200,
        message: NOTIFY.station_findById_success,
        station: station
      });
      res.status(200).json(successNotification);
    })
    .catch(err => {
      if (err.status) return res.status(err.status).json(errorNotification);
      return res.status(500).json(err);
    });
};

const updateStation = (req, res, next) => {
  const errorNotification = [];
  const successNotification = [];
  const { id } = req.params;
  const { name, address, phone, province } = req.body;
  Station.findById(id)
    .then(station => {
      if (!station) {
        errorNotification.push({ status: 404, message: NOTIFY.station_not_found });
        return Promise.reject(errorNotification);
      } else {
        if (!address) {
          errorNotification.push({
            status: 500,
            message: NOTIFY.station_address_require
          });
          return Promise.reject(errorNotification);
        }
      }
      station.name = name;
      station.address = address;
      station.phone = phone;
      station.province = province;
      station.createdAt = Date.now();
      station.save()
      .then(station => {
        successNotification.push({status: 200, message: NOTIFY.notify_update_station_success, station_update: station})
          return res.status(200).json(successNotification);
      })
    })
    .catch(err => {
      if (err.status) return res.status(err.status).json(errorNotification);
      return res.status(500).json(err);
    });
};

const deleteStation = async (req, res, next) => {
  const errorNotification = [];
  const successNotification = [];
  const { id } = req.params;
  Station.findById(id)
    .then(station => {
      if (!station) {
        errorNotification.push({ status: 404, message: NOTIFY.station_not_found });
        return Promise.reject(errorNotification);
      }
      station.deleteOne();
      successNotification.push({
        status: 200,
        message: NOTIFY.station_delete_success,
        station: station
      });
      return res.status(200).json(successNotification);
    })
    .catch(err => {
      if (err.status) return res.status(err.status).json(errorNotification);
      return res.status(500).json(err);
    });
};

module.exports = {
  createStations,
  findStations,
  findByIdStation,
  updateStation,
  deleteStation
};
