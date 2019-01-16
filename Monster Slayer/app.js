new Vue({
  el: '#app',
  data: {
    playerHealth: 100,
    monsterHealth: 100,
    gameInProgress: false,
    turns: []
  },
  methods: {
    startGame: function() {
      this.gameInProgress = true;
      //this is incase a game was in progress so it resets the health
      this.playerHealth = 100;
      this.monsterHealth = 100;
      this.turns = [];
    },
    basicAttack: function() {
      var damage = this.calculateDamage(3, 10)
      this.monsterHealth -= damage;
      this.turns.unshift({
        isPlayer: true,
        text: 'Player hits monster for ' + damage
      });
      if(this.winLose()){
        return;  
      }
      this.monsterAttacks();
    },
    specialAttack: function() {
      var damage = this.calculateDamage(10, 20);
      this.monsterHealth -= damage;
      this.turns.unshift({
        isPlayer: true,
        text: 'Player hits monster with a speical attack for ' + damage
      });
      if(this.winLose()) {
        return;
      }
      this.monsterAttacks();
    },
    healing: function() {
      if(this.playerHealth <= 90){
        this.playerHealth += 10;
      } else {
        this.playerHealth = 100;  
      }
      this.turns.unshift({
        isPlayer: true,
        text: 'Player heals for 10'
      });
      this.monsterAttacks();
    },
    giveUp: function() {
      this.gameInProgress = false;
    },
    monsterAttacks: function() {
      var damage = this.calculateDamage(5, 12);
      this.playerHealth -= damage;
      this.turns.unshift({
        isPlayer: false,
        text: 'Monster hits player for ' + damage
      });
      this.winLose();
    },
    winLose: function() {
      if(this.monsterHealth <= 0) {
        if(confirm('You Won! New Game?')){
          this.startGame();
        } else {
          this.gameInProgress = false;
        }
        return true;
      } else if (this.playerHealth <= 0) {
        if(confirm('You Lost! New Game?')){
            this.startGame();
          } else {
            this.gameInProgress = false;
          } 
        return true; 
      }
      return false;
    },
    calculateDamage: function(min, max){
      return Math.max(Math.floor(Math.random() * max) + 1, min);   
    },
  }
});
