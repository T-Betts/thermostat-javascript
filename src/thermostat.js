function Thermostat(currentTemp = 20){
  this.currentTemp = currentTemp
  this.powerSavingModeOn = true
  this.currentEnergyUsage = 'medium-usage'
}

Thermostat.prototype.energyUsage = function() {
  if (this.currentTemp < 18){
    this.currentEnergyUsage = 'low-usage'
  } else if (this.currentTemp >= 25){
      this.currentEnergyUsage = 'high-usage'
  } else {
    this.currentEnergyUsage = 'medium-usage'
  }
};

Thermostat.prototype.up = function(number) {
  if (this.powerSavingModeOn === true){
    if (this.currentTemp + number > 25){
      throw('Error. Max temp is 25 degrees in PSM. Please select another temp')
    } else {
      this.currentTemp += number
      this.energyUsage()
    }
  }
  else {
    if (this.currentTemp + number > 32){
      throw('Error. Max temp is 32 degrees when not in PSM. Please select another temp')
    } else {
      this.currentTemp += number
      this.energyUsage()
    }
  }
};

Thermostat.prototype.down = function(number) {
  if (this.currentTemp - number >= 10 ){
    this.currentTemp -= number
    this.energyUsage()
  } else {
    throw('Error. Minimum temp is 10 degrees. Please select another temp')
  }
};

Thermostat.prototype.resetTemp = function() {
  this.currentTemp = 20
  this.energyUsage()
};
