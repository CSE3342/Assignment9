//Preston Tighe
//10-12-16
//CSE 3342 - Programming Languages
//Assignment 9

(function(){
    Function.prototype.extends = function(parent) {
        this.prototype = Object.create(parent.prototype);
        this.prototype.constructor = this;
    };

    function Observable(){
        this.obs = [];
        this.add_observer = function(observer){
            if(!this.contains_observer(observer)){
                this.obs.push(observer);
            }
        };
        this.remove_observer = function(observer){
            for(var i = this.obs.length; i--;) {
              if(this.obs[i] === observer) {
                  this.obs.splice(i, 1);
              }
            }
        };
        this.notify_observers = function(){
            for(let observer of this.obs){
                try{
                    observer.update(this);
                }catch(e){
                    console.log(observer.name + ' has no update method.');
                }
            }
        };
        this.contains_observer = function(obj) {
            var i;
            for (i = 0; i < this.obs.length; i++) {
                if (this.obs[i] === obj) {
                    return true;
                }
            }

            return false;
        }
    }

    function Reporter(name){
        this.name = name;
        this.update = function(obj){
            if(obj instanceof Politician){
                console.log('From reporter ' + obj.name + ': Politician ' + obj.name +
                      ' money is now at ' + obj.money + '.');
            }else{
                console.log('Not interested');
            }
        }
    }

    function Zombie(name){
        this.name = name;
    }

    function Politician(name, money){
        Observable.call(this);
        this.name = name;
        this.money = money;
        this.update = function(new_money){
            console.log('From politician ' + self.name + ': My money is now at ' + new_money);
            this.money = new_money;
            this.notify_observers();
        }
    }
    Politician.extends(Observable);


    var bob_reporter = new Reporter('Bob');
    var sally_politician = new Politician('Sally', 10);
    var zombie = new Zombie('JoeTheZombie');

    console.log('Test 1: Bob as a observer to the politician Sally, update politician money to 15,' +
          ' remove the reporter as an observer of the politician');
    sally_politician.add_observer(bob_reporter);
    sally_politician.update(15);
    sally_politician.remove_observer(bob_reporter);
    console.log('');

    console.log('Test 2: no observers, update politician money to 20');
    sally_politician.update(20);
    console.log('');

    console.log('Test 3: Zombie as an observer to the politician, update politician money to 25');
    sally_politician.add_observer(zombie);
    sally_politician.update(25);
    console.log('');

    console.log('Test 4: Zombie as an observer to the politician, update politician money to 25');
    sally_politician.add_observer(zombie);
    sally_politician.update(25);
})();

