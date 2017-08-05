angular.module('roll20macromaker').controller('MacroMakerController',
	function($scope,Authent){
		$scope.geraAttack = function(){

			var template = $scope.attack.onlygm ? "/w gm ":"";
			template += "&{template:DnD35Attack} {{name= @{character_name}}}"
				+ "{{subtags=" + $scope.attack.name
				+ "}} {{npcflag=true}} {{fullattackflag= [[ d1 ]] }}"

			for (var i = 0; i < $scope.num_atttacks; i++){
				if ($scope.attacks[i].name.length > 0 && $scope.attacks[i].hit.length > 0 && $scope.attacks[i].damage.length > 0) {
				template+= " {{attack" + (i+1) + "=" +  $scope.attacks[i].name + ": [[ {d20cs>" + $scope.attacks[i].crithit +
				"}" + $scope.attacks[i].hit + " ]] }} {{fumbleroll=Fumble: [[ d20 ]] }} {{damage"+ (i+1) +
				"=[[ " +$scope.attacks[i].damage+ " ]]}} {{critconfirm"+(i+1)+"=Crit!:[[1d20"+
				$scope.attacks[i].hit +"]]}} {{critdmg"+(i+1)+"=+[[" + $scope.attacks[i].critdamage + "]] crit dmg }} "
				}
			}

			if ($scope.attack.notes.length > 0){
				template+=" {{notes=" + $scope.attack.notes.replace(/(\r\n|\n|\r)/gm," ") +"}} "
			}

			$scope.attacktemplate = {
				texto: template.trim()
			}
		}

		$scope.addAttack = function(){
			$scope.num_atttacks++;
			$scope.attacks.push({'id':$scope.num_atttacks ,'name': "", 'hit':"",'damage':""});
		}

		$scope.removeAttack = function(){
			if ($scope.num_atttacks>1) {
				$scope.num_atttacks--;
				$scope.attacks.pop();
			}
		}

		$scope.attackClear = function(){
			$scope.num_atttacks = 1;
			$scope.attacks = [{id:$scope.num_atttacks ,name: "", hit:"",damage:""}];
			$scope.attack= {
				name:"",
				notes:"",
				onlygm:true
			};
			$scope.attacktemplate = {texto:""};
		}
		$scope.attackClear();

		function isAuthenticated(){
			Authent.query();
		}
		isAuthenticated();

		$scope.spellClear = function(){
			$scope.spell = {
				name:"",
				onlygm:true,
				school:"",
				level:"",
				compV:false,
				compS:false,
				compM:false,
				compF:false,
				compFD:false,
				compXP:false,
				casttime:"",
				range:"",
				target:"",
				duration:"",
				savingthrow:"",
				resistence:"",
				damage:"",
				notes:"",
				template:""
			}
		}
		$scope.spellClear();

		$scope.generateSpell = function(){
			var template = $scope.spell.onlygm?"/w gm ":"";

			template+="&{template:DnD35StdRoll} {{spellflag=true}} {{name= @{character_name} casts "
			+ $scope.spell.name +" }}{{School:=" + $scope.spell.school +
			"}} {{Level: =" + $scope.spell.level + "}}{{Comp'nts:=";
			if ($scope.spell.compV) template += " V ";
			if ($scope.spell.compS) template += " S ";
			if ($scope.spell.compM) template += " M ";
			if ($scope.spell.compF) template += " F ";
			if ($scope.spell.compFD) template += " FD ";
			if ($scope.spell.compXP) template += " XP ";

			template+="}} {{Casting Time:= " + $scope.spell.casttime +
			"}} {{Range:= " + $scope.spell.range + "}} {{Target:= " +
			$scope.spell.target + "}} {{Duration:= " + $scope.spell.duration + "}} {{Saving Throw:= "
			+ $scope.spell.savingthrow + " }} {{Spell Resist.:="
			+ $scope.spell.resistence + "}} {{damage=[["+ $scope.spell.damage +"]]}} {{notes=" +
			$scope.spell.notes.replace(/(\r\n|\n|\r)/gm," ") +"}}";

			$scope.spell.template = template.trim()

		}


	});
