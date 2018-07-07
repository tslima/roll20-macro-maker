angular.module('roll20macromaker').controller('MacroMakerController',
  function($scope, Authent) {
    $scope.geraAttack = function() {

      var template = $scope.attack.onlygm ? "/w gm " : "";
      template += "&{template:DnD35Attack} {{name= @{character_name}}}" +
        "{{subtags=" + $scope.attack.name +
        "}} {{npcflag=true}} {{fullattackflag= [[ d1 ]] }}"

      for (var i = 0; i < $scope.attack.num_attacks; i++) {
        if ($scope.attack.attacks[i].name.length > 0 &&
          $scope.attack.attacks[i].hit.length > 0 &&
          $scope.attack.attacks[i].damage.length > 0) {

          template += " {{attack" + (i + 1) + "=" + $scope.attack.attacks[i].name + ": [[ {d20cs>" + $scope.attack.attacks[i].crithit +
            "}" + $scope.attack.attacks[i].hit

          if ($scope.attack.flank) {
            template += " + ?{Flank (1=yes)|0}*2[Flank] "
          }

          if ($scope.attack.pwattack) {
            template += " +?{Power Attack? (put in penalty with negative sign ie -3)|0}[Pwr Attk] "
          }

          template += " ]] }} {{fumbleroll=Fumble: [[ d20 ]] }} {{damage" + (i + 1) +
            "=[[ " + $scope.attack.attacks[i].damage

          if ($scope.attack.pwattack) {
            template += " +?{Power Attack Bonus?|0}[Pwr Attk]"
          }

          template += "]]}} {{critconfirm" + (i + 1) + "=Crit!:[[1d20" +
            $scope.attack.attacks[i].hit + "]]}} {{critdmg" + (i + 1) + "=+[[" + $scope.attack.attacks[i].critdamage + "]] crit dmg }} "
        }
      }

      if ($scope.attack.notes.length > 0) {
        template += " {{notes=" + $scope.attack.notes.replace(/(\r\n|\n|\r)/gm, " ") + "}} "
      }
      $scope.attack.template = template.trim()

    }

    $scope.addAttack = function() {
      $scope.attack.num_attacks++;
      $scope.attack.attacks.push({
        'id': $scope.attack.num_attacks,
        'name': "",
        'hit': "",
        'damage': ""
      });
    }

    $scope.removeAttack = function() {
      if ($scope.attack.num_attacks > 1) {
        $scope.attack.num_attacks--;
        $scope.attack.attacks.pop();
      }
    }

    $scope.attackClear = function() {
      $scope.attack = {
        onlygm: true,
        flank: false,
        pwattack: false,
        num_attacks: 1,
        name: "",
        notes: "",
        onlygm: true,
        attacks: [{
          id: 1,
          name: "",
          hit: "",
          damage: ""
        }],
        template: ""
      };
    }
    $scope.attackClear();

    function isAuthenticated() {
      Authent.query();
    }
    isAuthenticated();

    $scope.spellClear = function() {
      $scope.spell = {
        name: "",
        onlygm: true,
        school: "",
        level: "",
        compV: false,
        compS: false,
        compM: false,
        compF: false,
        compFD: false,
        compXP: false,
        casttime: "",
        range: "",
        target: "",
        duration: "",
        savingthrow: "",
        resistence: false,
        damage: "",
        notes: "",
        template: "",
        concentration: "",
        casterlevel: "",
        hit: ""
      }
    }
    $scope.spellClear();

    $scope.generateSpell = function() {
      var template = $scope.spell.onlygm ? "/w gm " : "";

      template += "&{template:DnD35StdRoll} {{spellflag=true}} {{name= @{character_name} casts " +
        $scope.spell.name + " }}{{School:=" + $scope.spell.school +
        "}} {{Level: =" + $scope.spell.level + "}}{{Comp'nts:=";
      if ($scope.spell.compV) template += " V ";
      if ($scope.spell.compS) template += " S ";
      if ($scope.spell.compM) template += " M ";
      if ($scope.spell.compF) template += " F ";
      if ($scope.spell.compFD) template += " FD ";
      if ($scope.spell.compXP) template += " XP ";

      template += "}} {{Casting Time:= " + $scope.spell.casttime +
        "}} {{Range:= " + $scope.spell.range + "}} {{Target:= " +
        $scope.spell.target + "}} {{Duration:= " + $scope.spell.duration + "}} {{Saving Throw:= " +
        $scope.spell.savingthrow + " }} "

      if ($scope.spell.resistence) {
        template += " {{Spell Resist.:= Yes}} "
        template += " {{ Caster level check: = [[ 1d20+" + $scope.spell.casterlevel + "]] vs spell resistance.}} "
      }

      if ($scope.spell.concentration.length > 0) {
        template += " {{Concentration: = [[ {1d20 + " + $scope.spell.concentration + "} ]] }} "
      } else {
        template += " {{Concentration: = [[ {1d20 + [[ @{concentration} ]]} ]] }} "
      }

      if ($scope.spell.hit.length > 0)
        template += " {{attack=[[1d20+" + $scope.spell.hit + "]]}} "

      if ($scope.spell.damage.length > 0)
        template += " {{damage=[[" + $scope.spell.damage + "]]}} ";

      template += " {{notes=" + $scope.spell.notes.replace(/(\r\n|\n|\r)/gm, " ") + "}} ";

      $scope.spell.template = template.trim()

    }


  });
