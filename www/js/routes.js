angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
    
  

      .state('principal', {
    url: '/principal',
    cache: false,
    templateUrl: 'templates/principal.html',
    controller: 'principalCtrl'
  })

  .state('registro', {
    url: '/registro:TipoCadastro1:TipoCadastro2:TipoCadastro3',
    templateUrl: 'templates/registro.html',
    controller: 'registroCtrl'
  })

  .state('endereco', {
    url: '/endereco:cep',
    templateUrl: 'templates/endereco.html',
    controller: 'enderecoCtrl'
  })

  .state('intro', {
    url: '/intro',
    templateUrl: 'templates/intro.html',
    controller: 'introCtrl'
  })

  .state('sucesso', {
    url: '/sucesso:mensagem',
    templateUrl: 'templates/sucesso.html',
    controller: 'sucessoCtrl'
  })

  .state('sincronizar', {
    url: '/sincronizar',
    templateUrl: 'templates/sincronizar.html',
    controller: 'principalCtrl'
  })

   .state('guia', {
    url: '/guia:id',
    cache: false,
    templateUrl: 'templates/guia.html',
    controller: 'guiaCtrl'
  })

$urlRouterProvider.otherwise('/intro')

  

});