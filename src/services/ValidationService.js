export default class ValidationService {
  static isValid(valueArray) {
    let isValid = true;
    let errorMessage = "Please enter the value in ";

    for (var key in valueArray) {
      if (valueArray.hasOwnProperty(key)) {
        var value = valueArray[key];
        if (value === "" || value == null) {
          errorMessage += key;
          isValid = false;
          return [isValid, errorMessage];
        }
      }
    }

    return [isValid, errorMessage];
  }
}
