angular.module('main.controllers', [])

.controller('notesCtrl', function($scope, $location, $ionicPlatform) {

  Parse.initialize("RWloF9oL2otMstQCm2d0h8fguPuTzvR64vTbGQD2", "qHFWs9o9Y9SMHfLFyLHs8LtPDFvzK3VZqYj9w2LA");

  var uuid = "1";
  var objNotes = Parse.Object.extend("notes");


  $ionicPlatform.ready(function() {
    uuid = device.uuid;
    var query = new Parse.Query(objNotes);
    query.equalTo("uuid", uuid);
    query.descending("createdAt");
    query.find({
      success: function(results) {
          $scope.$apply(function() {
            $scope.notes = results.map(function(obj) {
              if(obj.get("victory") == true) {
                $scope.stats.wins++;
              } else {
                $scope.stats.losses++;
              }
              return {name: obj.get("name"), descript: obj.get("descript"), victory: obj.get("victory")};
            });
       });
      }
    });
  });

  $scope.notes = [];
  $scope.stats = {wins: 0, losses: 0};


  $scope.newNote = {name: '', descript: '', victory: false};

  $scope.addNote = function() {
    $scope.notes.unshift($scope.newNote);
        
    $location.path('/view'); 


    var Note = new objNotes();

    Note.save({
      uuid: uuid,
      name: $scope.newNote.name,
      descript: $scope.newNote.descript,
      victory: $scope.newNote.victory
    }, {
      success: function() {

        if ($scope.newNote.victory == true) {
          $scope.stats.wins++;
        }
        else {
          $scope.stats.losses++;
        }
        $scope.newNote = {name: '', descript: '', victory: false} 
      },
      error: function(error) {
        alert("Error: " + error.code + " " + error.message);
      }
    });

  }

});