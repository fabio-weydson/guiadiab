angular.module('app.services', [])

.factory('BlankFactory', [function(){

}])

.service('BlankService', [function(){

}]).service('registroService', function() {
  var registroService = this;
  registroService.sharedObject = {};

  registroService.getRegistro = function(){
     return registroService.sharedObject.Registro;
  }

  registroService.setRegistro = function(value){
    registroService.sharedObject.Registro = value;
  }
});

