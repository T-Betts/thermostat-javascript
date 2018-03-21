describe('Thermostat', function(){

  beforeEach(function(){
    thermostat = new Thermostat
  });

  describe('currentTemp', function(){
    it('should be instantiated with a default temoerature of 20 degrees', function(){
      expect(thermostat.currentTemp).toBe(20)});
  });

  describe('#up', function(){
    it('should increase currentTemp by a specified amount',function(){
      thermostat.up(3)
      expect(thermostat.currentTemp).toBe(23)
    });

    it('should raise error if requested temp exceeds 25 when PowerSM is on', function(){
      expect(function() { thermostat.up(6) })
      .toThrow('Error. Max temp is 25 degrees in PSM. Please select another temp')
    })

    it('should raise error if requested temp exceeds 32 when PowerSM is off', function(){
      thermostat.powerSavingModeOn = false
      expect(function() { thermostat.up(13) })
      .toThrow('Error. Max temp is 32 degrees when not in PSM. Please select another temp')
    })
  });

  describe('#down', function(){
    it('should decrease currentTemp by a specified amount',function(){
      thermostat.down(1)
      expect(thermostat.currentTemp).toBe(19)
    });

    it('should raise error if temperature lower than 10 is requested', function(){
      expect(function() { thermostat.down(11) })
      .toThrow('Error. Minimum temp is 10 degrees. Please select another temp')
    });
  });

  describe('#resetTemp', function(){
    it('shoud reset the currentTemp to 20', function(){
      thermostat.up(3)
      thermostat.resetTemp()
      expect(thermostat.currentTemp).toEqual(20)
    })
  });

  describe('currentEnergyUsage', function(){
    it('should return low-usage when currentTemp is less than 18', function(){
      thermostat.down(3)
      expect(thermostat.currentEnergyUsage).toEqual('low-usage')
    })

    it('should return medium-usage when currentTemp is between 18 and 25', function(){
      expect(thermostat.currentEnergyUsage).toEqual('medium-usage')
    })

    it('should return high-usage when currentTemp is greater than or equal to 25', function(){
      thermostat.powerSavingModeOn = false
      thermostat.up(6)
      expect(thermostat.currentEnergyUsage).toEqual('high-usage')
    })
  })
});
