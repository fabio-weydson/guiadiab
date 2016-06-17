angular.module('app.controllers', [])
  
.controller('principalCtrl', function($scope,$state,  $ionicPopup, $ionicActionSheet,  $timeout, $interval) {


  localStorage.removeItem('ContinuaRegistro');
  $scope.graph = {};
  $scope.graph.data = [
    //Awake
     [120,120,120,120,120,120],
    [115, 120, 100, 90, 145, 90],
    [120, 100, 150, 145, 110, 82]
   
  ];
  $scope.graph.labels = ['06:00', '10:00', '14:00', '18:00', '22:00', '00:00'];
  $scope.graph.series = ['Recomendado', 'Hoje', 'Ontem'];
  $scope.graph.options = {
        scaleShowHorizontalLines: true,
        scaleShowVerticalLines: true,
        tooltipTemplate: '<%= value %> mmG',
        responsive: true,
        lineTension: 0.1,
        Tension: 0.1,
        pointRadius: 10,
        label: "My First dataset",
    };
    $scope.goRegistro = function(){
        if($scope.prosseguir){
		      $state.go('registro', {TipoCadastro1: $scope.registro.tipo1,TipoCadastro2: $scope.registro.tipo2,TipoCadastro3: $scope.registro.tipo3});
        } else {
          $scope.showAlert('Erro','Selecione um ou mais tipos de cadastro'); 
        }
	}   

  $scope.dicas = ['Evitar pular as refeições é fundamental para manter a glicemia do sangue estável, sem picos.', 
  ' Coma diariamente pelo menos três porções de legumes e verduras nas refeições e o mesmo para frutas.', 
'Dê preferência ao consumo de água nos intervalos das refeições.', 
  ' Beba pelo menos dois litros (seis a oito copos) de água por dia para manter o corpo hidratado. ', 
'Evitar pular as refeições é fundamental para manter a glicemia do sangue estável, sem picos.', 
  'O sobrepeso ou obesidade levam a piora do quadro de Diabetes.', 
  'Pratique pelo menos 30 minutos de atividade física todos os dias.', 
'Saiba a diferença entre carboidratos complexos e simples para fazer melhores escolhas.', 
  'Troque bebidas açucaradas por bebidas feitas com frutas naturais e adoce com o adoçante de sua preferência.', 
  'Dê preferência às preparações assadas, cozidas, grelhadas ou refogadas'];
$scope.dica = $scope.dicas[0];
  $interval(function() {

     $scope.dica = false;
        $timeout(function() {
          var randomico = Math.floor((Math.random() * 9) + 1);
          $scope.dica = $scope.dicas[randomico];
            }, 500);
          }, 5000);


    $scope.goConsultar = function(){
            $state.go('consultar');
    }  
 $scope.toggleGroup = function(group) {
    if ($scope.isGroupShown(group)) {
      $scope.shownGroup = null;
    } else {
      $scope.shownGroup = group;
    }
  };
  $scope.isGroupShown = function(group) {
    return $scope.shownGroup === group;
  };
   
})
   
.controller('registroCtrl', function($scope,$stateParams,$state, $http,registroService,ionicDatePicker) {
   $scope.getFormattedDate = function(date,type) {
      var year = date.getFullYear();
      var month = (1 + date.getMonth()).toString();
      month = month.length > 1 ? month : '0' + month;
      var day = date.getDate().toString();
      day = day.length > 1 ? day : '0' + day;
      if(type=='human'){
        return day + '/' + month + '/' + year;
      } else {
        return year + '-' + month + '-' + day;
      }
    }
    $scope.minutos = [];
    for (var i = 0; i <= 59; i++) {
      if(i<10){
        v='0'+i;
      } else {
        v = i;
      }
      $scope.minutos[i] = v;
    };
    $scope.horas = [];
    for (var i = 0; i <= 23; i++) {
      if(i<10){
        v='0'+i;
      } else {
        v = i;
      }
      $scope.horas[i] = v;
    };
    var d = new Date();
    var minutos = d.getMinutes();
    var horas = d.getHours();

    if(minutos<10){
      minutos = '0'+minutos;
    }
     if(horas<10){
      horas = '0'+horas;
    }
    $scope.horaAtual = horas;
    $scope.minutoAtual = minutos;
    $scope.data_human =  $scope.getFormattedDate(d,'human');
    $scope.data = $scope.getFormattedDate(new Date(),'machine');
    $scope.hora = '';
    $scope.minuto = '';
    console.log($scope.minutoAtual)


  var ipObj1 = {
      callback: function (val) {  //Mandatory
       $scope.data = $scope.getFormattedDate(new Date(val));
       $scope.data_human = $scope.getFormattedDate(new Date(val),'human');
       console.log($scope.data,$scope.data_human)
      },
      disabledDates: [            //Optional
        new Date(2016, 2, 16),
        new Date(2015, 3, 16),
        new Date(2015, 4, 16),
        new Date(2015, 5, 16),
        new Date('Wednesday, August 12, 2015'),
        new Date("08-16-2016"),
        new Date(1439676000000)
      ],
      from: new Date(2012, 1, 1), //Optional
      to: new Date(2016, 10, 30), //Optional
      inputDate: new Date(),      //Optional
      mondayFirst: true,          //Optional
      disableWeekdays: [0],       //Optional
      closeOnSelect: false,       //Optional
      templateType: 'popup',       //Optional,
      escChar: 'mmHg',
      clearOnBlur: false
    };

   $scope.ContinuaRegistro = function(){
        $scope.resultado = "Registro gravado com sucesso!<p>&nbsp;</p>";
   }
    $scope.openDatePicker = function(){
      ionicDatePicker.openDatePicker(ipObj1);
    };



})
   
.controller('enderecoCtrl', function($scope,$stateParams,$state, $http,registroService,  $ionicLoading,$ionicPopup) {

    $scope.registro = registroService.getRegistro();

      $scope.showAlert = function(title,msg) {
         $ionicLoading.hide();
           var alertPopup = $ionicPopup.alert({
             title: title,
             template: msg
           },
           $('#end_numero').trigger('focus')
           );
    };


    $scope.BuscaCEP = function(form) {
        $ionicLoading.show({
          template: 'Aguarde...'
        });
           $.ajax({
              type: "GET",
              dataType: 'json',
              url: "https://viacep.com.br/ws/"+$scope.registro.cep+"/json/",
               statusCode: {
                400: function(msg) { $scope.showAlert('CEP não encontrado','Confira o cep ou preencha manualmente o endereço.'); $ionicLoading.hide(); } // Bad Request
                ,404: function(msg) { $scope.showAlert('CEP não encontrado','Confira o cep ou preencha manualmente o endereço.'); $ionicLoading.hide(); } // Not Found
              },
                success: function( data ) {
                        $scope.$apply(function () {
                        $scope.registro.endereco = data.logradouro;
                        $scope.registro.numero = '';
                        $scope.registro.numero = data.numero;
                        $scope.registro.complemento = '';
                        $scope.registro.bairro = data.bairro;
                        $scope.registro.cidade = data.localidade;
                        $scope.registro.uf = data.uf;
                        $ionicLoading.hide()
                });
                },
                error: function( data ) {
                     $scope.showAlert('CEP não encontrado','Confira o cep ou preencha manualmente o endereço.'); $ionicLoading.hide()
                }

            });
      };
    $scope.getFormattedDate = function(date) {
      var year = date.getFullYear();
      var month = (1 + date.getMonth()).toString();
      month = month.length > 1 ? month : '0' + month;
      var day = date.getDate().toString();
      day = day.length > 1 ? day : '0' + day;
      return year + '-' + month + '-' + day;
    }
     $scope.ToCommaJson = function(json){
       var res = $.map(json,function(data){ return data.toString().replace(',', '<br/>'); });
       return res;
    }



    $scope.GuardaOffline = function(){
       $scope.registros_offline_local = localStorage.getItem('registros');
    if(!$scope.registros_offline_local){
     $scope.registros_offline = {};
    } else {
      $scope.registros_offline = JSON.parse($scope.registros_offline_local );
    }
     
        $scope.registros_offline[$scope.registro.id] = $scope.registro;
        localStorage.setItem('registros', JSON.stringify($scope.registros_offline));
        $state.go('sincronizar');
        $ionicLoading.hide();
    }
    $scope.AtualizaOffline = function(id,res){
      console.log(id+res);
        $scope.registros_offline_local = localStorage.getItem('registros');
        $scope.registros_offline = JSON.parse($scope.registros_offline_local);

      if(res=='excluir'){
          delete $scope.registros_offline[id];
          localStorage.setItem('registros', JSON.stringify($scope.registros_offline));

      } 
    }

    $scope.efetuaRegistro = function(form) {

        $ionicLoading.show({
          template: 'Aguarde...'
        });
         $.ajax({
            type: "POST",
            data: {
                'tipo[0]': $scope.registro.tipo1,
                'tipo[1]': $scope.registro.tipo2,
                'tipo[2]': $scope.registro.tipo3,
                nome: $scope.registro.nome,
                email : $scope.registro.email,
                cpf : $scope.registro.cpf,
                ip: $scope.registro.ip,
                cep: $scope.registro.cep,
                data_nascimento:  $scope.registro.data_nascimento,
                celular_ddd: $scope.registro.ddd,
                celular_numero: $scope.registro.celular,
                endereco: $scope.registro.endereco,
                numero: $scope.registro.numero,
                complemento: $scope.registro.complemento,
                bairro: $scope.registro.bairro,
                cidade: $scope.registro.cidade,
                uf: $scope.registro.uf,
            },
            dataType: 'json',
            url: "http://www.hunchway.com.br/api/client",
            statusCode: {
                400: function(msg) { $scope.showAlert('Falha na conexao','Tente novamente');  $scope.GuardaOffline(); },
                503: function(msg) { $scope.showAlert('Falha na conexao','Tente novamente');  $scope.GuardaOffline(); },
                500: function(msg) { $scope.showAlert('Falha na conexao','Tente novamente');  $scope.GuardaOffline(); },
                404: function(msg) { $scope.showAlert('Falha na conexao','Tente novamente');  $scope.GuardaOffline(); },
                412: function(msg) {  $scope.showAlert('Falha na operação',$scope.ToCommaJson(msg)); $ionicLoading.hide(); }
              },
            success: function( data ) {
                $scope.registros_offline_local = localStorage.getItem('registros');
                if($scope.registros_offline_local){
                    $scope.AtualizaOffline($scope.registro.id,'sucesso');
                }
                $ionicLoading.hide();
                 $state.go('sucesso');
                
            },
            timeout: 10000,
            error: function(jqXHR, textStatus, errorThrown) {

              console.log(textStatus)
              if(textStatus=='timeout'){
                $scope.showAlert('Tempo excedido','Esgotado o tempo limite, tente novamente mais tarde.');  $scope.GuardaOffline();
              } else {
                $scope.showAlert('Sem conexão','Os dados serão armazenados e poderão ser sincronizados quando houver conexão');  $scope.GuardaOffline();
              }
            }

        });
    }
    if(!$scope.registro.endereco){
      $scope.BuscaCEP();
    }
})
   
.controller('consultarCtrl', function($scope,$stateParams,$state, $http, $ionicLoading, $ionicPopup) {

     $scope.showAlert = function(title,msg) {
      $ionicLoading.hide()
           var alertPopup = $ionicPopup.alert({
             title: title,
             template: msg
           });
    };

    document.addEventListener("offline", onOffline, false);
      function onOffline() {
         $scope.showAlert('Sem conexão com a internet', 'A consulta só está disponível quando há conexão com a internet.');
         $scope.desativado = true;
    }

    $scope.rand = Math.floor((Math.random() * 999999999999) + 1);

    $scope.registro = {
        email : '',
        cpf : '',
        ip: '',
    };  

    $scope.resultado = 'vazio';

    $scope.ToCommaJson = function(json){
       var res = $.map(json,function(data){ return data.toString().replace(',', '<br/>'); });
       return res;
    }

    $scope.consultarCadastro = function(form) {
          $ionicLoading.show({
          template: 'Consultando...'
        });

         $.ajax({
              type: "GET",
              dataType: 'json',
              url: "http://ipv4.myexternalip.com/json",
              success: function( data ) {
                        $scope.$apply(function () {
                        $scope.registro.ip = data.ip;
                        });
                        $.ajax({
                            type: "POST",
                            data: {
                                email : $scope.registro.email,
                                cpf : $scope.registro.cpf,
                                ip: $scope.registro.ip
                            },
                            dataType: 'json',
                            url: "http://www.hunchway.com.br/api/login",
                            statusCode: {
                                400: function(msg) { $scope.showAlert('Falha na conexao','Tente novamente'); },
                                503: function(msg) { $scope.showAlert('Falha na conexao','Tente novamente'); },
                                500: function(msg) { $scope.showAlert('Falha na conexao','Tente novamente'); },
                                404: function(msg) { $scope.showAlert('Falha na conexao','Tente novamente'); },
                                412: function(msg) {  var msg = JSON.parse(msg.responseText); $scope.showAlert('Falha na operação',$scope.ToCommaJson(msg)); }
                              },
                            success: function( data ) {
                                $ionicLoading.hide();
                                if(data.sucesso_login){
                                    $state.go('sucesso', {mensagem: data.sucesso_login.mensagem});
                                }
                            }
                        });
                },
            error: function(data){

            }
        });

        $http.post("http://www.hunchway.com.br/api/login", {
            'email': $scope.registro.email,
            'cpf': $scope.registro.cpf,
            'ip': $scope.registro.ip
        }).then(function(response){
            $scope.resultado = JSON.stringify(response);
            $scope.goConsultar = function(){
                    $state.go('sucesso');
            }  
        }, function(response){
            $scope.resultado = JSON.stringify(response);
        });
    };  

     $scope.goHome = function(){
            $state.go('principal');
    }  
})
   
.controller('introCtrl', function($scope, $stateParams, $state,$ionicHistory) {
    $scope.NoShow = function(){
    localStorage.setItem('recurrings',1);
    $state.go('principal');
  }


  $scope.startApp = function() {
    $state.go('principal');
  };
  $scope.recurring = localStorage.getItem('recurrings');
  $scope.exibe = false;
  if($scope.recurring==1) {
     $scope.startApp();
     $scope.exibe = false;
  } else {
    $scope.exibe = true;
  }

     $ionicHistory.nextViewOptions({
    disableBack: true
  });
  // Called to navigate to the main app

  $scope.next = function() {
    $ionicSlideBoxDelegate.next();
  };
  $scope.previous = function() {
    $ionicSlideBoxDelegate.previous();
  };

  // Called each time the slide changes
  $scope.slideChanged = function(index) {
    $scope.slideIndex = index;
  };


})

.controller('duvidasCtrl', function($scope, $stateParams, $state,$http,$ionicLoading,$ionicModal) {
      
      $scope.contato = {
        email : '',
        nome : '',
        telefone: '',
      };  

})
.controller('guiaCtrl', function($scope, $stateParams, $state,$http,$ionicLoading,$ionicModal) {

  $scope.txtid = $stateParams.id;


    $ionicModal.fromTemplateUrl('templates/image-modal.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.modal = modal;
    });


 $scope.openModal = function() {
      $scope.modal.show();
    };

    $scope.closeModal = function() {
      $scope.modal.hide();
    };
   $scope.showImage = function(index) {
      $scope.imageSrc = 'http://helloradio.com.br/apps/diabetes/img/aplicacao.jpg';
      $scope.openModal();
    }
  

     $ionicLoading.show({
          template: 'Aguarde...'
        });

    $.ajax({
              type: "GET",
              dataType: 'html',
              url: "http://helloradio.com.br/apps/diabetes/service.php?get=texto&id="+$scope.txtid,
              success: function( data ) {
                $ionicLoading.hide()
                        $scope.$apply(function () {
                        $scope.texto = data;
              });
              },
              error: function(data){
                $ionicLoading.hide()
                  $scope.$apply(function () {
                        $scope.texto = "Falha na conexão.";
              });
              }     
    })
})