function getMongoConnection(key) {
  switch (key) {
    case "Health":
      return healthdb;
      break;
    case "Health_Regional":
      return healthdb;
      break;
    case "Health_Renewal":
      return healthdb;
      break;
    case "Health_Retention":
      return healthdb;
      break;
    case "Health_Service":
      return commondb;
      break;
    case "InternationalCar":
      return commondb;
      break;
    case "InternationalTravel":
      return commondb;
      break;
    case "Investments":
      return commondb;
      break;
    case "Investments_Nri":
      return commondb;
      break;
    case "Investments_Service":
      return commondb;
      break;
    case "NewCar":
      return motordb;
      break;
    case "NewCar_Renewal":
      return motordb;
      break;
    case "NewCar_Service":
      return commondb;
      break;
    case "Retainers":
      return motordb;
      break;
    case "TermLife":
      return commondb;
      break;
    case "TermLife_Nri":
      return commondb;
      break;
    case "TermLife_Service":
      return commondb;
      break;
    case "Travel":
      return commondb;
      break;
    case "Travel_Service":
      return commondb;
      break;
    case "Twowheeler":
      return commondb;
      break;
    case "Twowheeler_Service":
      return commondb;
      break;
    case "WhatsApp":
      return commondb;
      break;
  }
  return commondb;
}

module.exports = getMongoConnection;
